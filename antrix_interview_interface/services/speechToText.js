/**
 * SpeechToTextService — Web Speech API (Chrome built-in)
 *
 * Fixes applied:
 *  1. Fires 'stt-auto-ended' so VoiceRecorder can auto-submit on Chrome silence timeout
 *  2. Handles the case where recognition.start() throws because it was already started
 *  3. Better error messages for each failure mode
 *  4. Resolves startRecording() with false (not hanging) on any error
 */
export class SpeechToTextService {
  constructor() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert(
        '❌ Voice recognition is not supported in this browser.\n\n' +
        'Please open this page in Google Chrome on a desktop or Android device.'
      );
      this._supported = false;
      return;
    }
    this._SR = SR;
    this._supported = true;
    this.recognition = null;
    this.finalTranscript = '';
    this._resolveStop = null;
    this._resolveStart = null;
    this._started = false;
  }

  // ── Build a fresh recognition instance each time ───────────────────────────
  _createRecognition() {
    const r = new this._SR();
    r.lang = 'en-US';
    r.interimResults = true;   // show live text as user speaks
    r.maxAlternatives = 1;
    r.continuous = true;   // keep open until we call stop()

    r.onstart = () => {
      console.log('[STT] Mic open — listening');
      this._started = true;
      if (this._resolveStart) {
        this._resolveStart(true);
        this._resolveStart = null;
      }
    };

    r.onresult = (e) => {
      let interim = '';
      let final = '';
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          final += e.results[i][0].transcript + ' ';
        } else {
          interim += e.results[i][0].transcript;
        }
      }
      this.finalTranscript = final.trim() || interim.trim();
      window.dispatchEvent(
        new CustomEvent('stt-interim', { detail: this.finalTranscript })
      );
    };

    r.onerror = (e) => {
      console.error('[STT] Error:', e.error);
      this._started = false;

      if (e.error === 'not-allowed') {
        alert(
          '❌ Microphone access was denied.\n\n' +
          'Click the 🔒 lock icon in Chrome\'s address bar → ' +
          'set Microphone to "Allow" → reload the page.'
        );
      } else if (e.error === 'network') {
        console.warn('[STT] Network error — Chrome STT needs internet access.');
      } else if (e.error === 'no-speech') {
        console.warn('[STT] No speech detected.');
      }

      // Resolve start promise as failed if we haven't started yet
      if (this._resolveStart) {
        this._resolveStart(false);
        this._resolveStart = null;
      }
      this._doResolveStop();
    };

    r.onend = () => {
      console.log('[STT] Recognition ended. Transcript:', this.finalTranscript);
      this._started = false;

      // Notify VoiceRecorder so it can auto-submit if needed
      window.dispatchEvent(new Event('stt-auto-ended'));

      // Resolve start if we haven't already (rare edge case)
      if (this._resolveStart) {
        this._resolveStart(false);
        this._resolveStart = null;
      }
      this._doResolveStop();
    };

    return r;
  }

  _doResolveStop() {
    if (this._resolveStop) {
      this._resolveStop(this.finalTranscript || null);
      this._resolveStop = null;
    }
  }

  // ── Start mic ──────────────────────────────────────────────────────────────
  startRecording() {
    if (!this._supported) return Promise.resolve(false);

    return new Promise((resolve) => {
      // Reset state
      this.finalTranscript = '';
      this._resolveStop = null;
      this._resolveStart = resolve;
      this._started = false;

      // Always create fresh instance — reusing causes issues in Chrome
      this.recognition = this._createRecognition();

      try {
        this.recognition.start();
      } catch (err) {
        console.error('[STT] Could not start recognition:', err);
        if (this._resolveStart) {
          this._resolveStart(false);
          this._resolveStart = null;
        }
      }
    });
  }

  // ── Stop mic and return final transcript ───────────────────────────────────
  stopRecording() {
    return new Promise((resolve) => {
      this._resolveStop = resolve;

      if (!this.recognition || !this._started) {
        // Already stopped — return whatever we have
        resolve(this.finalTranscript || null);
        this._resolveStop = null;
        return;
      }

      try {
        this.recognition.stop(); // triggers onend → _doResolveStop
      } catch (err) {
        console.error('[STT] stop() error:', err);
        resolve(this.finalTranscript || null);
        this._resolveStop = null;
      }
    });
  }
}