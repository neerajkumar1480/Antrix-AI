import { navigateTo } from '../router';

export function render() {
  return `
    <div class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div class="layout-container flex h-full grow flex-col">
        <header class="flex items-center justify-between border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
          <div class="flex items-center gap-3 cursor-pointer" id="nav-home">
            <div class="p-1 bg-white rounded-lg shadow-sm border border-primary/10">
              <div class="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">A</div>
            </div>
            <h1 class="text-xl font-bold tracking-tight text-primary uppercase">Antrix</h1>
          </div>
          <button class="flex items-center justify-center rounded-full size-10 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <span class="material-symbols-outlined">account_circle</span>
          </button>
        </header>

        <main class="flex flex-1 flex-col items-center justify-start py-12 px-4 sm:px-6">
          <div class="w-full max-w-2xl">
            <nav class="mb-12">
              <ol class="flex items-center justify-between w-full relative">
                <div class="absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 -translate-y-1/2 z-0"></div>
                <li class="relative z-10 flex flex-col items-center gap-2 group">
                  <div class="size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                    <span class="material-symbols-outlined text-sm">check</span>
                  </div>
                  <span class="text-xs font-bold uppercase tracking-wider text-primary/60">Resume</span>
                </li>
                <li class="relative z-10 flex flex-col items-center gap-2">
                  <div class="size-10 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-white dark:ring-background-dark shadow-xl">
                    <span class="material-symbols-outlined text-sm">work</span>
                  </div>
                  <span class="text-xs font-bold uppercase tracking-wider text-primary">Role</span>
                </li>
                <li class="relative z-10 flex flex-col items-center gap-2">
                  <div class="size-10 rounded-full bg-white dark:bg-slate-800 border-2 border-primary/20 text-primary/40 flex items-center justify-center">
                    <span class="material-symbols-outlined text-sm">tune</span>
                  </div>
                  <span class="text-xs font-bold uppercase tracking-wider text-primary/40">Mode</span>
                </li>
                <li class="relative z-10 flex flex-col items-center gap-2">
                  <div class="size-10 rounded-full bg-white dark:bg-slate-800 border-2 border-primary/20 text-primary/40 flex items-center justify-center">
                    <span class="material-symbols-outlined text-sm">mic</span>
                  </div>
                  <span class="text-xs font-bold uppercase tracking-wider text-primary/40">Interview</span>
                </li>
                <li class="relative z-10 flex flex-col items-center gap-2">
                  <div class="size-10 rounded-full bg-white dark:bg-slate-800 border-2 border-primary/20 text-primary/40 flex items-center justify-center">
                    <span class="material-symbols-outlined text-sm">analytics</span>
                  </div>
                  <span class="text-xs font-bold uppercase tracking-wider text-primary/40">Feedback</span>
                </li>
              </ol>
            </nav>

            <div class="text-center mb-10">
              <h2 class="text-3xl font-bold mb-3">Define your target role</h2>
              <p class="text-slate-600 dark:text-slate-400">Tell us what you're preparing for so we can tailor the questions to your specific career path.</p>
            </div>

            <div class="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-2xl shadow-primary/5 border border-primary/5">
              <form id="role-form" class="space-y-8">
                <div class="space-y-6">
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1" for="industry">Industry</label>
                    <div class="relative">
                      <select required class="w-full bg-slate-50 dark:bg-slate-800 border-2 border-primary/10 rounded-lg p-4 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-0 appearance-none transition-all" id="industry">
                        <option disabled="" selected="" value="">Select Industry</option>
                        <option value="tech">Technology</option>
                        <option value="finance">Finance &amp; Banking</option>
                        <option value="marketing">Marketing &amp; Advertising</option>
                        <option value="healthcare">Healthcare</option>
                      </select>
                      <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">expand_more</span>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1" for="field">Field</label>
                    <div class="relative">
                      <select required class="w-full bg-slate-50 dark:bg-slate-800 border-2 border-primary/10 rounded-lg p-4 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-0 appearance-none transition-all" id="field">
                        <option disabled="" selected="" value="">Select Field</option>
                        <option value="sw-dev">Software Development</option>
                        <option value="data-sci">Data Science</option>
                        <option value="prod-mgmt">Product Management</option>
                        <option value="design">UI/UX Design</option>
                      </select>
                      <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">expand_more</span>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1" for="role">Job Role</label>
                    <div class="relative">
                      <select required class="w-full bg-slate-50 dark:bg-slate-800 border-2 border-primary/10 rounded-lg p-4 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-0 appearance-none transition-all" id="role">
                        <option disabled="" selected="" value="">Select Specific Role</option>
                        <option value="swe">Software Engineer</option>
                        <option value="mle">ML Engineer</option>
                        <option value="da">Data Analyst</option>
                        <option value="fs">Full Stack Developer</option>
                      </select>
                      <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">expand_more</span>
                    </div>
                  </div>
                </div>
                <div class="pt-4">
                  <button class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group" type="submit">
                    Continue
                    <span class="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                  <p class="text-center mt-4 text-xs text-slate-500 uppercase tracking-widest font-medium">Step 2 of 5</p>
                </div>
              </form>
            </div>
            <div class="mt-8 flex items-center justify-center gap-6 text-slate-500 dark:text-slate-400">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">shield</span>
                <span class="text-sm">Personalized Analysis</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">bolt</span>
                <span class="text-sm">Instant Setup</span>
              </div>
            </div>
          </div>
        </main>
        <footer class="py-8 px-6 text-center border-t border-primary/5 bg-white/40 dark:bg-background-dark/40">
          <p class="text-slate-500 text-sm">© 2024 Antrix AI Assistant. Level up your career.</p>
        </footer>
      </div>
    </div>
  `;
}

export function init() {
    const roleForm = document.getElementById('role-form');
    const navHome = document.getElementById('nav-home');

    navHome?.addEventListener('click', () => navigateTo('/'));

    roleForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here we could save the selection to state
        navigateTo('/mode-selection');
    });
}
