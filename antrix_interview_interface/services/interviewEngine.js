import { SpeechToTextService } from './speechToText.js';
import { TextToSpeechService } from './textToSpeech.js';
import { ChatUI } from '../components/chatUI.js';
import { VoiceRecorder } from '../components/voiceRecorder.js';
import { AIOrb } from '../components/aiOrb.js';

// ── Gemma 3 27B via Google AI Studio ────────────────────────────────────────
// ⭐ REPLACE THIS WITH YOUR KEY: https://aistudio.google.com/app/apikey
const GEMINI_API_KEY = window.ENV?.GEMINI_API_KEY || 'YOUR_GOOGLE_AI_STUDIO_API_KEY';
const GEMMA_MODEL = 'gemini-2.5-flash';

async function askGemmaWithHistory(history, maxTokens = 400) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GOOGLE_AI_STUDIO_API_KEY') {
    throw new Error('API key not set. Open services/interviewEngine.js and replace YOUR_GOOGLE_AI_STUDIO_API_KEY with your key from aistudio.google.com');
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMMA_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: history,
      generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7, topP: 0.9 }
    })
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    const msg = e?.error?.message || `API error ${res.status}`;
    if (res.status === 429) throw new Error('Rate limit hit — please wait a moment and try again.');
    if (res.status === 403 || (res.status === 400 && msg.toLowerCase().includes('api'))) throw new Error('Invalid or missing API key — check GEMINI_API_KEY in interviewEngine.js');
    throw new Error(msg);
  }
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

// ─────────────────────────────────────────────────────────────────────────────

export class InterviewEngine {
  constructor() {
    this.stt = new SpeechToTextService();
    this.tts = new TextToSpeechService();
    this.chatUI = new ChatUI('chat-container', 'transcript');
    this.orb = new AIOrb('ai-orb-canvas');
    this.recorder = new VoiceRecorder(
      'mic-button', 'mic-status',
      () => this.handleRecordStart(),
      () => this.handleRecordStop()
    );

    // Pull session state (set by your landing page)
    this.difficulty = this._ss('antrix_difficulty') || 'adaptive';
    this.resumeText = this._ss('antrix_resume') || '';
    this.roleText = this._ss('antrix_role') || 'Software Engineer';

    this.TOTAL_QUESTIONS = 5;
    this.currentQuestion = 0;
    this.transcriptLog = [];
    this.chatHistory = [];   // Gemma format: [{role:'user'|'model', parts:[{text}]}]
    this.interviewActive = false;
    this.interviewEnded = false;

    this.startBtn = document.getElementById('btn-start');
    this.endBtn = document.getElementById('btn-end');
    this.downloadBtn = document.getElementById('btn-download');

    this.startBtn.addEventListener('click', () => this.startInterview());
    this.endBtn.addEventListener('click', () => this.endInterviewEarly());
    this.downloadBtn.addEventListener('click', () => this.downloadTranscript());

    // Mic starts disabled — enabled only after interview starts
    this.recorder.disable('Click Start to begin');

    // Warn if API key missing
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GOOGLE_AI_STUDIO_API_KEY') {
      setTimeout(() => {
        this.chatUI.addMessage('ai',
          '⚠️ <strong>API key missing.</strong> Open <code>services/interviewEngine.js</code> and set your <code>GEMINI_API_KEY</code>. ' +
          'Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:#5F4A8B;text-decoration:underline">aistudio.google.com</a>.'
        );
      }, 400);
    }
  }

  _ss(key) { try { return sessionStorage.getItem(key); } catch (e) { return null; } }

  // ── Persona seed — injected at the top of every Gemma call ────────────────
  _personaSeed() {
    const diffMap = {
      beginner: 'Ask friendly, simple questions. Focus on communication and confidence. Keep technical depth minimal.',
      intermediate: 'Mix technical accuracy, behavioural questions, and delivery. Moderate challenge level.',
      advanced: 'Ask deep, critical, probing questions. Challenge edge cases, logic, and technical depth. Be demanding.',
      adaptive: 'Dynamically adapt difficulty based on answer quality. Start moderate, scale up or down accordingly.'
    };
    const resumeSection = this.resumeText
      ? `\n\nCANDIDATE RESUME:\n"""\n${this.resumeText}\n"""\nUse this resume to tailor every question.`
      : '\n\nNo resume provided — ask general questions for the role.';

    const persona = `You are Antrix, an expert AI mock interviewer for the role of ${this.roleText}.
DIFFICULTY: ${this.difficulty.toUpperCase()} — ${diffMap[this.difficulty] || diffMap.adaptive}
${resumeSection}
RULES: Ask exactly ONE question per turn (1-3 sentences). Build on the previous answer naturally.
Cover: background, technical skills, behavioural (STAR), problem-solving. Never give feedback mid-interview.
IMPORTANT: Reply in plain spoken sentences only — no markdown, no asterisks, no bullet points. Your words will be spoken aloud.`;

    return [
      { role: 'user', parts: [{ text: persona + '\n\nAcknowledge your role in one sentence.' }] },
      { role: 'model', parts: [{ text: `Understood — I am Antrix, your AI interviewer for the ${this.roleText} role. Ready to begin.` }] }
    ];
  }

  _buildMessages(extraUserMsg = null) {
    const msgs = [...this._personaSeed(), ...this.chatHistory];
    if (extraUserMsg) msgs.push({ role: 'user', parts: [{ text: extraUserMsg }] });
    return msgs;
  }

  // ── Start interview ────────────────────────────────────────────────────────
  async startInterview() {
    // Immediately update UI so user sees feedback
    this.startBtn.classList.add('hidden');
    this.endBtn.classList.remove('hidden');
    this.currentQuestion = 1;
    this.chatUI.updateQuestionCounter(this.currentQuestion, this.TOTAL_QUESTIONS);
    this.interviewActive = true;

    // Speak welcome (local — no API needed)
    const welcome = `Welcome to your AI mock interview for the ${this.roleText} role, powered by Gemma 3. I will ask you ${this.TOTAL_QUESTIONS} questions. Press the mic button to start speaking, then press it again when you are done. Ready? Let us begin!`;
    await this.aiSpeakAndLog(welcome);

    // Now fetch first question from Gemma
    await this.generateAndAskQuestion(
      'Start the interview now. Ask the first warm-up question — something like "Tell me about yourself and your background."'
    );
  }

  // ── Speak + log AI message ─────────────────────────────────────────────────
  async aiSpeakAndLog(text) {
    this.transcriptLog.push({ role: 'ai', message: text });
    this.chatHistory.push({ role: 'model', parts: [{ text }] });
    this.chatUI.addMessage('ai', text);
    this.orb.setState('speaking');
    this.chatUI.updateAiStatus('speaking');
    try { await this.tts.speak(text); } catch (e) { console.warn('TTS error (non-fatal):', e); }
    this.orb.setState('idle');
    this.chatUI.updateAiStatus('idle');
  }

  // ── Ask Gemma for next question ────────────────────────────────────────────
  async generateAndAskQuestion(context) {
    this.chatUI.showTypingIndicator();
    this.orb.setState('thinking');
    this.chatUI.updateAiStatus('thinking');
    // Disable mic while AI is thinking
    this.recorder.disable('AI is thinking…');

    try {
      const messages = this._buildMessages(context);
      const question = await askGemmaWithHistory(messages, 300);
      this.chatUI.hideTypingIndicator();
      await this.aiSpeakAndLog(question);
    } catch (err) {
      this.chatUI.hideTypingIndicator();
      console.error('Gemma error:', err);
      this.chatUI.addMessage('ai', `⚠️ ${err.message}`);
      this.orb.setState('idle');
      this.chatUI.updateAiStatus('idle');
    } finally {
      // ✅ ALWAYS re-enable the mic — whether API succeeded or failed
      this.recorder.enable();
    }
  }

  // ── Mic: start recording ───────────────────────────────────────────────────
  async handleRecordStart() {
    this.orb.setState('listening');
    this.chatUI.updateAiStatus('listening');
    this.tts.stop(); // stop AI speaking if still going
    return await this.stt.startRecording();
  }

  // ── Mic: stop recording + submit answer ───────────────────────────────────
  async handleRecordStop() {
    this.orb.setState('thinking');
    this.chatUI.updateAiStatus('thinking');

    try {
      const userText = await this.stt.stopRecording();
      this.chatUI.removeInterimMessage();

      if (!userText || userText.trim() === '') {
        this.chatUI.addMessage('ai', "I didn't catch that — please tap the mic and try again.");
        this.orb.setState('idle');
        this.chatUI.updateAiStatus('idle');
        this.recorder.enable(); // re-enable so user can retry
        return;
      }

      // Log answer
      this.transcriptLog.push({ role: 'user', message: userText });
      this.chatHistory.push({ role: 'user', parts: [{ text: userText }] });
      this.chatUI.addMessage('user', userText);

      if (this.currentQuestion >= this.TOTAL_QUESTIONS) {
        await this._generateFullReport();
      } else {
        this.currentQuestion++;
        this.chatUI.updateQuestionCounter(this.currentQuestion, this.TOTAL_QUESTIONS);
        await this.generateAndAskQuestion(
          `The candidate answered question ${this.currentQuestion - 1}. Ask question ${this.currentQuestion} of ${this.TOTAL_QUESTIONS}. Flow naturally from their answer.`
        );
      }
    } catch (err) {
      console.error('Record stop error:', err);
      this.orb.setState('idle');
      this.chatUI.updateAiStatus('idle');
      this.recorder.enable(); // ✅ always recover
    }
  }

  // ── Generate final report ──────────────────────────────────────────────────
  async _generateFullReport() {
    this.recorder.disable('Generating report…');
    this.endBtn.classList.add('hidden');
    this.chatUI.showTypingIndicator();
    this.orb.setState('thinking');
    this.chatUI.updateAiStatus('analysing');

    await this.aiSpeakAndLog("That concludes the interview. I am now analysing your performance and generating a detailed report. Give me a moment.");

    const transcriptText = this.transcriptLog
      .map(t => `${t.role === 'ai' ? 'INTERVIEWER' : 'CANDIDATE'}: ${t.message}`)
      .join('\n\n');

    const reportPrompt = `You are Antrix, an expert interview coach. Analyse this mock interview transcript and generate a detailed structured report.

${this.resumeText ? `RESUME:\n"""\n${this.resumeText}\n"""\n` : ''}ROLE: ${this.roleText} | DIFFICULTY: ${this.difficulty}

TRANSCRIPT:
"""
${transcriptText}
"""

Write the report with EXACTLY these headings:

## Overall Performance Score
Score out of 10 and a one-line verdict.

## What You Did Well
3-4 specific strengths with examples from their actual answers.

## Key Mistakes and Weaknesses
3-5 specific weaknesses. Be direct. Reference actual answers.

## Resume Issues Found
Gaps, vague language, missing metrics, ATS issues, missing keywords. If no resume, list common issues for this role.

## How to Improve
4-5 concrete actionable tips. Mention STAR method where relevant.

## Category Scores
Rate each out of 10:
- Communication and Clarity: X/10
- Technical Knowledge: X/10
- Problem-Solving Ability: X/10
- Confidence and Presence: X/10
- Resume Quality: X/10

## Next Steps
3 specific actions for the next 7 days.

Be honest, specific, and helpful. No generic advice.`;

    const reportMessages = [
      ...this._personaSeed(),
      { role: 'user', parts: [{ text: reportPrompt }] }
    ];

    try {
      const report = await askGemmaWithHistory(reportMessages, 1200);
      this.chatUI.hideTypingIndicator();

      try { sessionStorage.setItem('antrix_report', report); } catch (e) { }
      try { sessionStorage.setItem('antrix_transcript', JSON.stringify(this.transcriptLog)); } catch (e) { }

      this._renderReportCard(report);
      this.downloadBtn.classList.remove('hidden');
      this.downloadBtn.style.display = 'flex';
      this.orb.setState('idle');
      this.chatUI.updateAiStatus('idle');

    } catch (err) {
      this.chatUI.hideTypingIndicator();
      this.chatUI.addMessage('ai', `⚠️ Could not generate report: ${err.message}`);
      this.orb.setState('idle');
      this.chatUI.updateAiStatus('idle');
    }
  }

  // ── Render report card in chat ─────────────────────────────────────────────
  _renderReportCard(markdownReport) {
    const transcript = document.getElementById('transcript');

    const html = markdownReport
      .replace(/^## (.+)$/gm, '<h3 class="report-heading">$1</h3>')
      .replace(/^### (.+)$/gm, '<h4 class="report-subheading">$1</h4>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul class="report-list">$&</ul>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .trim();

    const card = document.createElement('div');
    card.className = 'w-full mt-4';
    card.innerHTML = `
      <div class="report-card bg-white border-2 border-[#5F4A8B]/20 rounded-3xl overflow-hidden shadow-xl">
        <div class="bg-gradient-to-r from-[#5F4A8B] to-[#7A62A5] px-6 py-5 flex items-center gap-3">
          <span class="text-white text-2xl">📋</span>
          <div>
            <h2 class="text-white font-bold text-lg">Interview Report</h2>
            <p class="text-white/70 text-xs">${this.roleText} · ${this.difficulty} difficulty · Gemma 3 27B</p>
          </div>
        </div>
        <div class="report-body p-6 text-sm leading-relaxed text-gray-700 max-h-[600px] overflow-y-auto">
          <p>${html}</p>
        </div>
      </div>`;

    transcript.appendChild(card);

    if (!document.getElementById('report-styles')) {
      const style = document.createElement('style');
      style.id = 'report-styles';
      style.textContent = `
        .report-heading    { font-size:1rem; font-weight:700; color:#5F4A8B; margin:1.2rem 0 0.5rem; padding-bottom:.3rem; border-bottom:1px solid #ede9f7; }
        .report-subheading { font-size:.9rem; font-weight:600; color:#374151; margin:.8rem 0 .3rem; }
        .report-list       { padding-left:1.2rem; margin:.4rem 0 .8rem; }
        .report-list li    { margin-bottom:.35rem; list-style:disc; }
        .report-body p     { margin-bottom:.5rem; }
        .report-body strong{ color:#1f2937; }
        .report-card::-webkit-scrollbar      { width:5px; }
        .report-card::-webkit-scrollbar-thumb{ background:#c4b5e8; border-radius:8px; }
      `;
      document.head.appendChild(style);
    }
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── End early ──────────────────────────────────────────────────────────────
  async endInterviewEarly() {
    if (this.interviewEnded) return;
    this.interviewEnded = true;
    this.tts.stop();
    this.chatUI.addMessage('ai', "Interview ended early. Generating your report based on answers so far…");
    await this._generateFullReport();
  }

  // ── Download ───────────────────────────────────────────────────────────────
  downloadTranscript() {
    const report = (() => { try { return sessionStorage.getItem('antrix_report') || ''; } catch (e) { return ''; } })();
    const lines = this.transcriptLog
      .map(t => `[${t.role === 'ai' ? 'Interviewer' : 'You'}]:\n${t.message}`)
      .join('\n\n---\n\n');

    const full = `ANTRIX INTERVIEW TRANSCRIPT
Role: ${this.roleText} | Difficulty: ${this.difficulty} | Model: Gemma 3 27B
Date: ${new Date().toLocaleString()}

${'='.repeat(60)}
CONVERSATION
${'='.repeat(60)}

${lines}

${'='.repeat(60)}
AI PERFORMANCE REPORT
${'='.repeat(60)}

${report}`;

    const a = document.createElement('a');
    a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(full);
    a.download = `antrix_interview_${Date.now()}.txt`;
    a.click();
  }
}