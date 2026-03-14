import { navigateTo } from '../router';

export function render() {
  return `
    <div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <div class="layout-container flex h-full grow flex-col">
        <!-- Top Navigation Bar -->
        <header class="flex items-center justify-between whitespace-nowrap border-b border-primary/10 px-6 md:px-20 py-4 bg-white/50 backdrop-blur-md sticky top-0 z-50">
          <div class="flex items-center gap-3 text-primary cursor-pointer" id="nav-home">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">A</div>
            <h2 class="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Antrix</h2>
          </div>
          <div class="flex flex-1 justify-end gap-4 items-center">
            <nav class="hidden md:flex gap-6 mr-6">
              <a class="text-sm font-semibold text-primary" href="#">Dashboard</a>
              <a class="text-sm font-medium text-slate-600 hover:text-primary" href="#">Interviews</a>
              <a class="text-sm font-medium text-slate-600 hover:text-primary" href="#">Resources</a>
            </nav>
            <button class="flex items-center justify-center rounded-full size-10 bg-primary/10 text-primary">
              <span class="material-symbols-outlined">notifications</span>
            </button>
            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" style='background-image: url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100");'></div>
          </div>
        </header>

        <main class="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
          <div class="layout-content-container flex flex-col max-w-[1000px] w-full gap-8">
            <!-- Stepper Section -->
            <div class="w-full flex justify-between items-center px-2 py-4 overflow-x-auto">
              <div class="flex items-center gap-2 min-w-fit">
                <div class="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                <span class="font-bold text-primary">Resume</span>
              </div>
              <div class="h-px bg-primary/20 flex-1 mx-4 min-w-[20px]"></div>
              <div class="flex items-center gap-2 min-w-fit opacity-50">
                <div class="size-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">2</div>
                <span class="font-medium text-slate-600">Role</span>
              </div>
              <div class="h-px bg-primary/20 flex-1 mx-4 min-w-[20px]"></div>
              <div class="flex items-center gap-2 min-w-fit opacity-50">
                <div class="size-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">3</div>
                <span class="font-medium text-slate-600">Mode</span>
              </div>
              <div class="h-px bg-primary/20 flex-1 mx-4 min-w-[20px]"></div>
              <div class="flex items-center gap-2 min-w-fit opacity-50">
                <div class="size-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">4</div>
                <span class="font-medium text-slate-600">Interview</span>
              </div>
              <div class="h-px bg-primary/20 flex-1 mx-4 min-w-[20px]"></div>
              <div class="flex items-center gap-2 min-w-fit opacity-50">
                <div class="size-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">5</div>
                <span class="font-medium text-slate-600">Feedback</span>
              </div>
            </div>

            <!-- Hero & Upload Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                  <h1 class="text-slate-900 dark:text-slate-100 text-4xl md:text-5xl font-black leading-tight tracking-tight">
                    Upload your resume to <span class="text-primary">get started</span>
                  </h1>
                  <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    Our AI will analyze your professional profile, skills, and experience to tailor a realistic mock interview experience specifically for you.
                  </p>
                </div>
                <!-- Drag & Drop Area -->
                <div id="drop-area" class="border-2 border-dashed border-primary/30 rounded-xl p-10 bg-white/50 flex flex-col items-center justify-center gap-4 hover:border-primary transition-colors cursor-pointer group">
                  <div class="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined text-4xl">cloud_upload</span>
                  </div>
                  <div class="text-center">
                    <p class="text-slate-900 font-bold text-lg">Click to upload or drag and drop</p>
                    <p class="text-slate-500 text-sm">PDF or DOCX (max. 10MB)</p>
                  </div>
                  <input class="hidden" id="resume-upload" type="file" accept=".pdf,.docx"/>
                </div>
                <button id="analyze-btn" class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                  <span class="material-symbols-outlined">analytics</span>
                  Analyze Resume
                </button>
              </div>

              <!-- Preview Section (Post-Upload State - Initially Hidden or Placeholder) -->
              <div id="preview-panel" class="flex flex-col gap-6 bg-white p-6 rounded-xl shadow-sm border border-primary/5">
                <div class="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h3 class="font-bold text-xl text-slate-900 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">quick_reference_all</span>
                    Analysis Preview
                  </h3>
                  <span id="level-badge" class="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Ready to Upload
                  </span>
                </div>
                <!-- Placeholder when no file -->
                <div id="no-preview" class="py-10 text-center text-slate-400">
                  <span class="material-symbols-outlined text-5xl mb-2 opacity-20">description</span>
                  <p>Upload a resume to see AI insights</p>
                </div>
                <!-- Dynamic Content (Initially Hidden) -->
                <div id="analysis-content" class="hidden flex flex-col gap-6">
                    <div class="flex flex-col gap-3">
                      <h4 class="text-sm font-bold text-slate-500 uppercase tracking-widest">Detected Skills</h4>
                      <div id="skills-list" class="flex flex-wrap gap-2"></div>
                    </div>
                    <div class="flex flex-col gap-3">
                      <h4 class="text-sm font-bold text-slate-500 uppercase tracking-widest">Key Projects</h4>
                      <ul id="projects-list" class="space-y-3"></ul>
                    </div>
                </div>
                <div class="bg-primary/5 p-4 rounded-lg flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary">info</span>
                  <p class="text-xs text-slate-600 leading-tight italic">
                    This information is extracted from your resume to help our AI understand your technical background. You can refine these in the next step.
                  </p>
                </div>
              </div>
            </div>

            <!-- Additional Resources Section -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div class="bg-white p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-3">
                <span class="material-symbols-outlined text-primary">tips_and_updates</span>
                <h4 class="font-bold text-slate-900">Resume Tips</h4>
                <p class="text-sm text-slate-600">Learn how to optimize your resume for ATS and AI analysis tools.</p>
                <a class="text-primary text-sm font-bold hover:underline" href="#">Read more →</a>
              </div>
              <div class="bg-white p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-3">
                <span class="material-symbols-outlined text-primary">history</span>
                <h4 class="font-bold text-slate-900">Recent History</h4>
                <p class="text-sm text-slate-600">Access your previously uploaded resumes and generated interviews.</p>
                <a class="text-primary text-sm font-bold hover:underline" href="#">View history →</a>
              </div>
              <div class="bg-white p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col gap-3">
                <span class="material-symbols-outlined text-primary">shield_person</span>
                <h4 class="font-bold text-slate-900">Privacy First</h4>
                <p class="text-sm text-slate-600">Your data is encrypted and used only for your interview session.</p>
                <a class="text-primary text-sm font-bold hover:underline" href="#">Privacy policy →</a>
              </div>
            </div>
          </div>
        </main>
        
        <footer class="mt-auto py-10 px-6 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-3 opacity-60">
            <span class="material-symbols-outlined text-primary">psychology</span>
            <span class="text-sm font-bold">Antrix AI Assistant © 2024</span>
          </div>
          <div class="flex gap-8">
            <a class="text-xs font-medium text-slate-500 hover:text-primary uppercase tracking-widest" href="#">Support</a>
            <a class="text-xs font-medium text-slate-500 hover:text-primary uppercase tracking-widest" href="#">API</a>
            <a class="text-xs font-medium text-slate-500 hover:text-primary uppercase tracking-widest" href="#">Community</a>
          </div>
        </footer>
      </div>
    </div>
  `;
}

export function init() {
  const dropArea = document.getElementById('drop-area');
  const fileInput = document.getElementById('resume-upload');
  const analyzeBtn = document.getElementById('analyze-btn');
  const navHome = document.getElementById('nav-home');
  const analysisContent = document.getElementById('analysis-content');
  const noPreview = document.getElementById('no-preview');
  const levelBadge = document.getElementById('level-badge');
  const skillsList = document.getElementById('skills-list');
  const projectsList = document.getElementById('projects-list');

  navHome?.addEventListener('click', () => navigateTo('/'));

  dropArea?.addEventListener('click', () => fileInput?.click());

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  });

  function handleUpload(file) {
    // Mock upload success and analysis
    levelBadge.textContent = 'Senior Level';
    levelBadge.classList.replace('bg-primary/10', 'bg-green-100');
    levelBadge.classList.replace('text-primary', 'text-green-700');
    
    noPreview.classList.add('hidden');
    analysisContent.classList.remove('hidden');

    const mockSkills = ['React.js', 'TypeScript', 'Node.js', 'AWS Cloud', 'System Design'];
    skillsList.innerHTML = mockSkills.map(skill => `
        <span class="px-3 py-1 bg-slate-100 rounded-lg text-sm font-medium text-slate-700">${skill}</span>
    `).join('');

    const mockProjects = [
        { title: 'E-commerce Platform Migration', desc: 'Led the transition from monolithic to microservices architecture.' },
        { title: 'Real-time Analytics Dashboard', desc: 'Developed a custom charting engine using D3.js.' }
    ];
    projectsList.innerHTML = mockProjects.map(p => `
        <li class="flex gap-3 items-start">
            <div class="mt-1.5 size-1.5 rounded-full bg-primary flex-shrink-0"></div>
            <p class="text-slate-700 text-sm leading-relaxed">
                <span class="font-bold">${p.title}:</span> ${p.desc}
            </p>
        </li>
    `).join('');
  }

  analyzeBtn?.addEventListener('click', () => {
    // Add a loading state if needed, then navigate
    analyzeBtn.innerHTML = '<span class="animate-spin material-symbols-outlined">autofps_select</span> Analyzing...';
    setTimeout(() => {
        navigateTo('/role-selection');
    }, 1500);
  });
}
