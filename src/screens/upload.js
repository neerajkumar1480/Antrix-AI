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
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="flex flex-col gap-8">
                <div class="flex flex-col gap-4">
                  <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary w-fit rounded-full text-xs font-bold uppercase tracking-wider">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Step 1: AI Analysis
                  </div>
                  <h1 class="text-slate-900 dark:text-slate-100 text-4xl md:text-5xl font-black leading-tight tracking-tight">
                    Upload your resume to <span class="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">get started</span>
                  </h1>
                  <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    Our AI will analyze your professional profile, skills, and experience to tailor a realistic mock interview experience specifically for you.
                  </p>
                </div>
                
                <!-- Drag & Drop Area -->
                <div id="drop-area" class="relative group">
                  <div class="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div class="relative border-2 border-dashed border-primary/30 rounded-xl p-10 bg-white dark:bg-slate-800 flex flex-col items-center justify-center gap-4 hover:border-primary transition-all cursor-pointer">
                    <div class="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                      <span class="material-symbols-outlined text-4xl">cloud_upload</span>
                    </div>
                    <div class="text-center">
                      <p class="text-slate-900 dark:text-slate-100 font-bold text-lg">Click to upload or drag and drop</p>
                      <p class="text-slate-500 text-sm">PDF or DOCX (max. 10MB)</p>
                    </div>
                    <input class="hidden" id="resume-upload" type="file" accept=".pdf,.docx"/>
                  </div>
                </div>

                <div id="file-info" class="hidden flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary">description</span>
                    <div>
                      <p id="filename" class="text-sm font-bold text-slate-900 dark:text-slate-100">resume.pdf</p>
                      <p id="filesize" class="text-xs text-slate-500">1.2 MB</p>
                    </div>
                  </div>
                  <button id="remove-file" class="text-slate-400 hover:text-red-500 transition-colors">
                    <span class="material-symbols-outlined">close</span>
                  </button>
                </div>

                <button id="analyze-btn" class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                  <span class="material-symbols-outlined">analytics</span>
                  Start AI Analysis
                </button>
              </div>

              <!-- Illustration & Preview Section -->
              <div class="relative">
                <!-- Initial Illustration -->
                <div id="hero-illustration" class="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700">
                   <img alt="AI Resume Analysis" class="w-full aspect-square object-cover" src="C:/Users/neera/.gemini/antigravity/brain/57d7e73d-0320-47c7-ab7d-94b02a16fb0b/antrix_resume_analysis_illustration_1773523362562.png" />
                   <div class="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                </div>

                <!-- Analysis Preview (Initially Hidden) -->
                <div id="preview-panel" class="hidden absolute inset-0 flex flex-col gap-6 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-primary/10 animate-in fade-in zoom-in duration-500">
                  <div class="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-4">
                    <h3 class="font-bold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span class="material-symbols-outlined text-primary">quick_reference_all</span>
                      AI Insights
                    </h3>
                    <span id="level-badge" class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Ready
                    </span>
                  </div>
                  
                  <div id="analysis-content" class="flex flex-col gap-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                      <div class="flex flex-col gap-3">
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <span class="size-1 bg-primary rounded-full"></span>
                           Extracted Skills
                        </h4>
                        <div id="skills-list" class="flex flex-wrap gap-2"></div>
                      </div>
                      <div class="flex flex-col gap-3">
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <span class="size-1 bg-primary rounded-full"></span>
                           Experience Highlights
                        </h4>
                        <ul id="projects-list" class="space-y-3"></ul>
                      </div>
                  </div>

                  <div class="mt-auto bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl flex items-start gap-3 border border-slate-100 dark:border-slate-800">
                    <span class="material-symbols-outlined text-primary text-sm mt-0.5">verified_user</span>
                    <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      AI analysis is complete. We've optimized your profile for <strong>Full Stack Engineering</strong> roles.
                    </p>
                  </div>
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
  const removeFileBtn = document.getElementById('remove-file');
  const fileInfo = document.getElementById('file-info');
  const filenameText = document.getElementById('filename');
  const filesizeText = document.getElementById('filesize');
  
  const navHome = document.getElementById('nav-home');
  const previewPanel = document.getElementById('preview-panel');
  const heroIllustration = document.getElementById('hero-illustration');
  const levelBadge = document.getElementById('level-badge');
  const skillsList = document.getElementById('skills-list');
  const projectsList = document.getElementById('projects-list');

  navHome?.addEventListener('click', () => navigateTo('/'));

  dropArea?.addEventListener('click', () => fileInput?.click());

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      showFileInfo(file);
    }
  });

  removeFileBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.value = '';
    fileInfo.classList.add('hidden');
    dropArea.classList.remove('hidden');
    analyzeBtn.disabled = true;
    previewPanel.classList.add('hidden');
    heroIllustration.classList.remove('hidden');
  });

  function showFileInfo(file) {
    filenameText.textContent = file.name;
    filesizeText.textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    fileInfo.classList.remove('hidden');
    dropArea.classList.add('hidden');
    analyzeBtn.disabled = false;
  }

  analyzeBtn?.addEventListener('click', () => {
    // Start Analysis Animation
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span class="animate-spin material-symbols-outlined">sync</span> Analyzing Experience...';
    
    // Switch Visuals after a delay
    setTimeout(() => {
        heroIllustration.classList.add('opacity-0', 'scale-95');
        
        setTimeout(() => {
            heroIllustration.classList.add('hidden');
            previewPanel.classList.remove('hidden');
            handleMockAnalysis();
            
            // Final transition
            setTimeout(() => {
                analyzeBtn.innerHTML = 'Analysis Complete! Proceeding...';
                analyzeBtn.classList.replace('bg-primary', 'bg-green-600');
                
                setTimeout(() => {
                    navigateTo('/role-selection');
                }, 1500);
            }, 2000);
        }, 500);
    }, 800);
  });

  function handleMockAnalysis() {
    const mockSkills = ['React.js', 'TypeScript', 'Node.js', 'AWS VPC', 'Redis', 'Docker'];
    skillsList.innerHTML = mockSkills.map(skill => `
        <span class="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 transition-all hover:scale-105 cursor-default hover:border-primary">
          ${skill}
        </span>
    `).join('');

    const mockProjects = [
        { title: 'Global SaaS Scalability', desc: 'Optimized PostgreSQL queries reducing latency by 70% for 5M+ users.' },
        { title: 'Distributed Systems Architecture', desc: 'Designed a message queue system using RabbitMQ and Go.' }
    ];
    projectsList.innerHTML = mockProjects.map(p => `
        <li class="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all hover:border-primary/30 group">
            <div class="mt-1 size-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform"></div>
            <div class="flex flex-col gap-1">
                <p class="text-slate-900 dark:text-slate-100 text-sm font-bold">${p.title}</p>
                <p class="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">${p.desc}</p>
            </div>
        </li>
    `).join('');
  }
}
