import { navigateTo } from '../router';

export function render() {
  return `
    <div class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div class="layout-container flex h-full grow flex-col">
        <!-- Navigation Bar -->
        <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-20 py-4 sticky top-0 z-50">
          <div class="flex items-center gap-4 cursor-pointer" id="nav-home">
             <div class="p-1 bg-white rounded-lg shadow-sm border border-primary/10">
              <div class="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">A</div>
            </div>
            <h2 class="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Antrix</h2>
          </div>
          <div class="flex gap-3">
            <button class="flex items-center justify-center rounded-xl h-10 bg-primary text-white px-4 text-sm font-bold transition-all hover:bg-primary/90">
              <span class="material-symbols-outlined mr-2 text-sm">person</span>
              Profile
            </button>
          </div>
        </header>

        <main class="flex flex-1 flex-col items-center px-4 md:px-20 py-8 bg-slate-50/30 dark:bg-background-dark">
          <div class="layout-content-container flex flex-col max-w-[1024px] w-full gap-8">
            <!-- Stepper -->
            <div class="flex flex-wrap items-center justify-center gap-2 md:gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-primary/5">
              <div class="flex items-center gap-2 text-slate-400">
                <span class="text-sm font-medium">Resume</span>
                <span class="material-symbols-outlined text-xs">chevron_right</span>
              </div>
              <div class="flex items-center gap-2 text-slate-400">
                <span class="text-sm font-medium">Role</span>
                <span class="material-symbols-outlined text-xs">chevron_right</span>
              </div>
              <div class="flex items-center gap-2 text-slate-400">
                <span class="text-sm font-medium">Mode</span>
                <span class="material-symbols-outlined text-xs">chevron_right</span>
              </div>
              <div class="flex items-center gap-2 text-slate-400">
                <span class="text-sm font-medium">Interview</span>
                <span class="material-symbols-outlined text-xs">chevron_right</span>
              </div>
              <div class="flex items-center gap-2 text-primary font-bold">
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-[10px]">5</span>
                <span class="text-sm">Feedback</span>
              </div>
            </div>

            <!-- Header Section -->
            <div class="text-center space-y-2">
              <h1 class="text-slate-900 dark:text-slate-100 text-4xl font-bold tracking-tight">Interview Readiness</h1>
              <p class="text-slate-500 dark:text-slate-400">Great job! You've completed your simulation for the Senior Product Designer role.</p>
            </div>

            <!-- Analytics Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Circular Score Gauge Card -->
              <div class="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-md border border-primary/5 flex flex-col items-center justify-center text-center">
                <h3 class="text-slate-500 dark:text-slate-400 text-lg font-medium mb-6">Overall Score</h3>
                <div class="relative flex items-center justify-center">
                  <svg class="w-48 h-48 transform -rotate-90">
                    <circle class="text-primary/10" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" stroke-width="12"></circle>
                    <circle class="text-primary" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" stroke-dasharray="552.92" stroke-dashoffset="82.93" stroke-width="12"></circle>
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-5xl font-bold text-slate-900 dark:text-slate-100">85%</span>
                    <span class="text-primary font-semibold text-sm">READY</span>
                  </div>
                </div>
                <p class="mt-6 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  You are in the <span class="text-primary font-bold">top 15%</span> of candidates for this specific role.
                </p>
              </div>

              <!-- Bar Chart Analytics Card -->
              <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-8 shadow-md border border-primary/5 flex flex-col">
                <div class="flex justify-between items-center mb-8">
                  <h3 class="text-slate-900 dark:text-slate-100 text-lg font-bold">Competency Breakdown</h3>
                  <div class="flex gap-2 items-center text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">
                    <span class="material-symbols-outlined text-sm">trending_up</span>
                    +5% vs last try
                  </div>
                </div>
                <div class="space-y-6 flex-1">
                  <!-- Confidence -->
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="font-medium text-slate-700 dark:text-slate-300">Confidence</span>
                      <span class="font-bold text-primary">92%</span>
                    </div>
                    <div class="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                      <div class="bg-primary h-full rounded-full" style="width: 92%"></div>
                    </div>
                  </div>
                  <!-- Communication -->
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="font-medium text-slate-700 dark:text-slate-300">Communication</span>
                      <span class="font-bold text-primary">78%</span>
                    </div>
                    <div class="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                      <div class="bg-primary h-full rounded-full" style="width: 78%"></div>
                    </div>
                  </div>
                  <!-- Technical Knowledge -->
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="font-medium text-slate-700 dark:text-slate-300">Technical Knowledge</span>
                      <span class="font-bold text-primary">88%</span>
                    </div>
                    <div class="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                      <div class="bg-primary h-full rounded-full" style="width: 88%"></div>
                    </div>
                  </div>
                  <!-- Clarity -->
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="font-medium text-slate-700 dark:text-slate-300">Clarity</span>
                      <span class="font-bold text-primary">82%</span>
                    </div>
                    <div class="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                      <div class="bg-primary h-full rounded-full" style="width: 82%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Strengths and Weaknesses -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Strengths -->
              <div class="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl p-6 border border-emerald-100 dark:border-emerald-900/30">
                <div class="flex items-center gap-3 mb-4 text-emerald-700 dark:text-emerald-400">
                  <span class="material-symbols-outlined">check_circle</span>
                  <h3 class="text-lg font-bold">Key Strengths</h3>
                </div>
                <ul class="space-y-3">
                  <li class="flex gap-3 text-slate-700 dark:text-slate-300">
                    <span class="material-symbols-outlined text-emerald-500 text-lg">check</span>
                    <p class="text-sm font-medium">Exhibited deep understanding of user-centric design principles during the technical round.</p>
                  </li>
                  <li class="flex gap-3 text-slate-700 dark:text-slate-300">
                    <span class="material-symbols-outlined text-emerald-500 text-lg">check</span>
                    <p class="text-sm font-medium">Strong vocal variety and enthusiastic tone throughout the interview.</p>
                  </li>
                  <li class="flex gap-3 text-slate-700 dark:text-slate-300">
                    <span class="material-symbols-outlined text-emerald-500 text-lg">check</span>
                    <p class="text-sm font-medium">Concise storytelling using the STAR method for behavioral questions.</p>
                  </li>
                </ul>
              </div>

              <!-- Areas for Improvement -->
              <div class="bg-amber-50/50 dark:bg-amber-900/10 rounded-xl p-6 border border-amber-100 dark:border-amber-900/30">
                <div class="flex items-center gap-3 mb-4 text-amber-700 dark:text-amber-400">
                  <span class="material-symbols-outlined">error</span>
                  <h3 class="text-lg font-bold">Areas for Improvement</h3>
                </div>
                <ul class="space-y-3">
                  <li class="flex gap-3 text-slate-700 dark:text-slate-300">
                    <span class="text-amber-500 font-bold text-xl leading-none">•</span>
                    <p class="text-sm font-medium">Try to reduce the use of filler words like "um" and "actually" when describing complex systems.</p>
                  </li>
                  <li class="flex gap-3 text-slate-700 dark:text-slate-300">
                    <span class="text-amber-500 font-bold text-xl leading-none">•</span>
                    <p class="text-sm font-medium">Elaborate more on the 'Result' phase of your second portfolio project example.</p>
                  </li>
                  <li class="flex gap-3 text-slate-700 dark:text-slate-300">
                    <span class="text-amber-500 font-bold text-xl leading-none">•</span>
                    <p class="text-sm font-medium">Focus on making more consistent eye contact with the camera rather than the screen.</p>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6 pb-12">
              <button id="retry-btn" class="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 rounded-xl h-14 bg-white dark:bg-slate-800 text-primary border-2 border-primary font-bold text-lg hover:bg-primary/5 transition-all">
                <span class="material-symbols-outlined">refresh</span>
                Try Again
              </button>
              <button class="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 rounded-xl h-14 bg-primary text-white font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                <span class="material-symbols-outlined">download</span>
                Download Report
              </button>
            </div>
          </div>
        </main>

        <footer class="py-6 px-10 border-t border-primary/10 flex justify-between items-center text-slate-400 text-xs bg-white dark:bg-background-dark">
          <p>© 2024 AI Interview Assistant. All analysis is private and secure.</p>
          <div class="flex gap-4">
            <a class="hover:text-primary transition-colors" href="#">Support</a>
            <a class="hover:text-primary transition-colors" href="#">Privacy</a>
          </div>
        </footer>
      </div>
    </div>
  `;
}

export function init() {
  const retryBtn = document.getElementById('retry-btn');
  const navHome = document.getElementById('nav-home');

  navHome?.addEventListener('click', () => navigateTo('/'));
  
  retryBtn?.addEventListener('click', () => {
    navigateTo('/upload');
  });
}
