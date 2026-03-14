import { navigateTo } from '../router';

export function render() {
  return `
    <div class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div class="layout-container flex h-full grow flex-col">
        <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 py-4 sticky top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-50">
          <div class="flex items-center gap-4 cursor-pointer" id="nav-home">
            <div class="p-1 bg-white rounded-lg shadow-sm border border-primary/10">
              <div class="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">A</div>
            </div>
            <h2 class="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Antrix</h2>
          </div>
          <button class="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <span class="material-symbols-outlined">settings</span>
          </button>
        </header>

        <main class="px-4 md:px-20 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <!-- Progress Stepper -->
            <div class="flex flex-col gap-4 p-6 mt-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/10">
              <div class="flex gap-6 justify-between items-center">
                <p class="text-primary text-base font-bold leading-normal">Interview Configuration</p>
                <p class="text-primary text-sm font-medium leading-normal bg-primary/10 px-3 py-1 rounded-full">Step 3 of 5</p>
              </div>
              <div class="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
                <div class="h-full rounded-full bg-primary" style="width: 60%;"></div>
              </div>
              <div class="flex flex-wrap justify-between gap-2">
                <span class="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Resume</span>
                <span class="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Role</span>
                <span class="text-primary text-xs font-bold uppercase tracking-wider border-b-2 border-primary">Mode</span>
                <span class="text-slate-400 dark:text-slate-600 text-xs font-medium uppercase tracking-wider">Interview</span>
                <span class="text-slate-400 dark:text-slate-600 text-xs font-medium uppercase tracking-wider">Feedback</span>
              </div>
            </div>

            <!-- Title Section -->
            <div class="text-center py-10">
              <h2 class="text-slate-900 dark:text-slate-100 text-3xl md:text-4xl font-bold leading-tight px-4">Choose your interview mode</h2>
              <p class="mt-3 text-slate-600 dark:text-slate-400 text-lg">Select the method that best fits your practice goals today.</p>
            </div>

            <!-- Mode Selection Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              <!-- Voice Based Card -->
              <div class="mode-card group flex flex-col items-center justify-between rounded-xl border-2 border-transparent bg-white dark:bg-slate-900 p-8 shadow-sm hover:border-primary transition-all cursor-pointer relative overflow-hidden" data-mode="voice">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20">
                  <span class="material-symbols-outlined text-8xl text-primary">mic</span>
                </div>
                <div class="z-10 flex flex-col items-center text-center">
                  <div class="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <span class="material-symbols-outlined text-4xl text-primary">record_voice_over</span>
                  </div>
                  <h3 class="text-slate-900 dark:text-slate-100 text-2xl font-bold mb-3">Voice Based Interview</h3>
                  <p class="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8">
                    Realistic speech-to-text simulation. Perfect for practicing verbal communication, tone of voice, confidence, and delivery pace.
                  </p>
                </div>
                <button class="w-full py-4 px-6 bg-slate-100 dark:bg-slate-800 group-hover:bg-primary text-slate-900 dark:text-slate-100 group-hover:text-white rounded-xl font-bold transition-colors">
                  Select Voice Mode
                </button>
              </div>

              <!-- Video Based Card -->
              <div class="mode-card group flex flex-col items-center justify-between rounded-xl border-2 border-transparent bg-white dark:bg-slate-900 p-8 shadow-sm hover:border-primary transition-all cursor-pointer relative overflow-hidden" data-mode="video">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20">
                  <span class="material-symbols-outlined text-8xl text-primary">videocam</span>
                </div>
                <div class="z-10 flex flex-col items-center text-center">
                  <div class="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <span class="material-symbols-outlined text-4xl text-primary">videocam</span>
                  </div>
                  <h3 class="text-slate-900 dark:text-slate-100 text-2xl font-bold mb-3">Video Based Interview</h3>
                  <p class="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8">
                    Practice with a realistic video simulation to improve body language and eye contact.
                  </p>
                </div>
                <button class="w-full py-4 px-6 bg-slate-100 dark:bg-slate-800 group-hover:bg-primary text-slate-900 dark:text-slate-100 group-hover:text-white rounded-xl font-bold transition-colors">
                  Select Video Mode
                </button>
              </div>
            </div>

            <!-- Pro Tip -->
            <div class="mt-12 p-8 rounded-xl bg-primary/5 dark:bg-slate-800/50 flex flex-col md:flex-row items-center gap-6 border border-primary/10">
              <div class="w-full md:w-1/3 aspect-video bg-primary/10 rounded-lg flex items-center justify-center overflow-hidden">
                 <div class="text-primary text-4xl font-bold">A</div>
              </div>
              <div class="flex-1">
                <h4 class="text-primary font-bold text-lg mb-2">Pro Tip</h4>
                <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  We recommend Voice Mode if you have an upcoming in-person or video interview. It helps reduce verbal fillers like "um" and "uh" by providing real-time feedback on your speech patterns.
                </p>
              </div>
            </div>

            <!-- Footer Navigation -->
            <div class="flex justify-between items-center mt-12 mb-20">
              <button id="back-btn" class="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold hover:text-primary transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
                Back to Role
              </button>
              <div class="text-slate-400 text-sm italic">
                Select a mode to continue
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;
}

export function init() {
  const modeCards = document.querySelectorAll('.mode-card');
  const backBtn = document.getElementById('back-btn');
  const navHome = document.getElementById('nav-home');

  navHome?.addEventListener('click', () => navigateTo('/'));
  
  modeCards.forEach(card => {
    card.addEventListener('click', () => {
      const mode = card.dataset.mode;
      // Here we could save the mode to state
      navigateTo('/interview');
    });
  });

  backBtn?.addEventListener('click', () => {
    navigateTo('/role-selection');
  });
}
