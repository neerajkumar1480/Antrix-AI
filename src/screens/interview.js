import { navigateTo } from '../router';

let timerInterval;
let seconds = 0;

export function render() {
  return `
    <div class="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 font-display">
      <div class="flex flex-col h-screen overflow-hidden">
        <!-- Top Navigation Bar -->
        <header class="flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50">
          <div class="flex items-center gap-4 cursor-pointer" id="nav-home">
             <div class="p-1 bg-white rounded-lg shadow-sm border border-primary/10">
              <div class="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">A</div>
            </div>
            <div>
              <h2 class="text-primary text-xl font-bold leading-tight tracking-tight">Antrix</h2>
              <p class="text-primary/60 text-xs font-medium">Session: Senior Product Designer</p>
            </div>
          </div>
          <div class="flex items-center gap-8">
            <div class="flex flex-col items-center">
              <div class="flex items-center gap-2 text-primary font-bold">
                <span class="material-symbols-outlined text-xl">timer</span>
                <span class="text-lg" id="timer">00:00</span>
              </div>
              <span class="text-[10px] uppercase tracking-wider text-primary/60">Duration</span>
            </div>
            <div class="h-10 w-px bg-primary/10"></div>
            <div class="flex flex-col items-center">
              <div class="flex items-center gap-2 text-primary font-bold">
                <span class="text-lg" id="question-count">03 / 10</span>
              </div>
              <span class="text-[10px] uppercase tracking-wider text-primary/60">Question</span>
            </div>
            <div class="h-10 w-px bg-primary/10"></div>
            <div class="flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span class="text-sm font-medium text-primary">AI is listening...</span>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button class="p-2 hover:bg-primary/10 rounded-full text-primary transition-colors">
              <span class="material-symbols-outlined">settings</span>
            </button>
            <div class="h-10 w-10 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden">
               <div class="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-primary font-bold">U</div>
            </div>
          </div>
        </header>

        <!-- Main Content Area -->
        <main class="flex flex-1 overflow-hidden p-6 gap-6 bg-slate-50/50 dark:bg-background-dark/50">
          <!-- Left Side: Transcript -->
          <div class="flex-1 flex flex-col gap-6 relative">
            <div class="flex-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-primary/10 flex flex-col overflow-hidden">
              <div class="p-6 border-b border-primary/10 flex justify-between items-center bg-primary/5">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary">receipt_long</span>
                  <h3 class="font-bold text-primary text-lg">Real-time Analysis</h3>
                </div>
                <div class="flex items-center gap-2">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span class="text-[10px] text-primary px-2 py-1 rounded font-bold uppercase tracking-wider">Processing</span>
                </div>
              </div>
              
              <div class="flex-1 p-8 overflow-y-auto space-y-8" id="transcript-container">
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-primary uppercase">Antrix AI</span>
                    <span class="text-[10px] text-slate-400 font-medium whitespace-nowrap">00:05</span>
                  </div>
                  <p class="text-lg text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border-l-4 border-primary/30">
                    Welcome to your technical interview today. We'll be focusing on your experiences as a Senior Product Designer. Let's start with a behavioral question to get things warmed up.
                  </p>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-primary uppercase">Antrix AI</span>
                    <span class="text-[10px] text-slate-400 font-medium whitespace-nowrap">00:45</span>
                  </div>
                  <p class="text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-semibold bg-primary/5 p-4 rounded-xl border-l-4 border-primary">
                    Can you describe a time when you had to manage a difficult stakeholder? What was the situation and how did you resolve it?
                  </p>
                </div>
                <div class="space-y-2 border-l-4 border-emerald-500 pl-6 py-2 bg-emerald-500/5 rounded-r-lg" id="user-speaking-indicator">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-emerald-600 uppercase">You</span>
                    <span class="text-[10px] text-emerald-600/60 font-medium tracking-tighter animate-pulse">RECORDING...</span>
                  </div>
                  <p class="text-lg text-slate-800 dark:text-slate-100 italic leading-relaxed" id="live-transcription-text">
                    "That's a great question. In my previous role at a fintech startup, I was leading the redesign of our core dashboard. One of our primary stakeholders, the Head of Sales, was very resistant to..."
                  </p>
                </div>
              </div>

              <div class="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-primary/5 text-center">
                <p class="text-xs text-slate-400">Speak naturally. AI is analyzing your response for STAR method adherence and confidence.</p>
              </div>
            </div>
          </div>

          <!-- Right Side: Sidebar -->
          <div class="w-96 flex flex-col gap-6">
            <!-- Confidence Meter -->
            <div class="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-primary/10">
               <h3 class="font-bold text-primary flex items-center gap-2 mb-4">
                <span class="material-symbols-outlined">trending_up</span>
                Live Confidence
              </h3>
              <div class="flex flex-col gap-4">
                <div class="flex justify-between items-end">
                   <span class="text-slate-500 text-xs font-bold uppercase">Steady</span>
                   <span class="text-primary text-2xl font-bold">84%</span>
                </div>
                <div class="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div class="h-full bg-primary rounded-full transition-all duration-500" style="width: 84%;"></div>
                </div>
                <p class="text-slate-400 text-[10px] italic text-center">Your pace and volume are optimal.</p>
              </div>
            </div>

            <!-- Private Notes Section -->
            <div class="flex-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-primary/10 flex flex-col overflow-hidden">
              <div class="p-4 border-b border-primary/10 bg-slate-50 dark:bg-slate-800/50">
                <h3 class="font-bold text-primary flex items-center gap-2">
                  <span class="material-symbols-outlined">edit_note</span>
                  Private Notes
                </h3>
              </div>
              <textarea class="flex-1 p-4 text-sm bg-transparent border-none focus:ring-0 resize-none text-slate-600 dark:text-slate-300 placeholder:text-slate-400" placeholder="Use STAR method:
- Situation
- Task
- Action
- Result"></textarea>
              <div class="p-3 bg-primary/5 text-[10px] text-primary/70 italic text-center border-t border-primary/5">
                Notes are private and not visible to the interviewer.
              </div>
            </div>
          </div>
        </main>

        <!-- Bottom Controls -->
        <footer class="bg-white dark:bg-background-dark border-t border-primary/10 px-8 py-4 flex justify-between items-center z-50">
          <div class="flex items-center gap-4">
            <button class="control-btn flex flex-col items-center gap-1 group" id="mic-toggle">
              <div class="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
                <span class="material-symbols-outlined">mic</span>
              </div>
              <span class="text-[10px] font-medium text-slate-500 uppercase">Mute</span>
            </button>
            <button class="control-btn flex flex-col items-center gap-1 group" id="video-toggle">
              <div class="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
                <span class="material-symbols-outlined">videocam</span>
              </div>
              <span class="text-[10px] font-medium text-slate-500 uppercase">Video</span>
            </button>
          </div>

          <div class="flex items-center gap-4">
            <button id="next-q-btn" class="px-10 py-4 bg-primary text-white rounded-xl font-bold flex items-center gap-3 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1">
              Next Question
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <button id="end-btn" class="px-6 py-4 border-2 border-red-500/20 text-red-500 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all">
            End Session
          </button>
        </footer>
      </div>
    </div>
  `;
}

function startTimer() {
  const timerElement = document.getElementById('timer');
  seconds = 0;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    if (timerElement) timerElement.textContent = `${mins}:${secs}`;
  }, 1000);
}

export function init() {
  startTimer();

  const nextBtn = document.getElementById('next-q-btn');
  const endBtn = document.getElementById('end-btn');
  const navHome = document.getElementById('nav-home');
  const micToggle = document.getElementById('mic-toggle');
  const videoToggle = document.getElementById('video-toggle');

  navHome?.addEventListener('click', () => {
    clearInterval(timerInterval);
    navigateTo('/');
  });

  nextBtn?.addEventListener('click', () => {
    // In a real app, logic for next question
    alert("Moving to next question. AI is analyzing current response...");
  });

  endBtn?.addEventListener('click', () => {
    clearInterval(timerInterval);
    navigateTo('/feedback');
  });

  // Toggle visual states for controls
  [micToggle, videoToggle].forEach(btn => {
    btn?.addEventListener('click', () => {
      const icon = btn.querySelector('.material-symbols-outlined');
      const text = btn.querySelector('span:last-child');
      const circle = btn.querySelector('div');
      
      if (circle.classList.contains('bg-red-500')) {
        circle.classList.replace('bg-red-500', 'bg-slate-100');
        circle.classList.replace('text-white', 'text-slate-600');
        if (icon.textContent.includes('_off')) {
          icon.textContent = icon.textContent.replace('_off', '');
        }
      } else {
        circle.classList.replace('bg-slate-100', 'bg-red-500');
        circle.classList.replace('text-slate-600', 'text-white');
        icon.textContent += '_off';
      }
    });
  });
}
