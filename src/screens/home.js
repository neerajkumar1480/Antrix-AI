import { navigateTo } from '../router';

export function render() {
  return `
    <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <header class="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 backdrop-blur-md px-6 md:px-20 py-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a class="flex items-center gap-2.5" href="/">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span class="text-xl font-bold tracking-tight text-primary">Antrix</span>
          </a>
          <nav class="hidden md:flex items-center gap-10">
            <a class="text-primary/80 hover:text-primary text-sm font-semibold transition-colors" href="#features">Features</a>
            <a class="text-primary/80 hover:text-primary text-sm font-semibold transition-colors" href="#pricing">Pricing</a>
            <a class="text-primary/80 hover:text-primary text-sm font-semibold transition-colors" href="#testimonials">Testimonials</a>
          </nav>
          <div class="flex items-center gap-3">
            <button class="hidden sm:flex px-5 py-2 text-primary text-sm font-bold hover:bg-primary/5 rounded-lg transition-all">
              Login
            </button>
            <button class="flex px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1">
        <section class="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-24">
          <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div class="flex flex-col gap-8 flex-1 text-center lg:text-left">
              <div class="flex flex-col gap-4">
                <span class="inline-block mx-auto lg:mx-0 w-fit px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full">
                  AI-Powered Career Growth
                </span>
                <h1 class="text-primary text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                  Master Your Next Interview<br/>with <span style="color: rgba(95, 74, 139, 0.6); font-style: italic;">Antrix</span>
                </h1>
                <p class="text-slate-700 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Personalized practice sessions, real-time feedback, and industry-specific coaching to help you land your dream job.
                </p>
              </div>
              <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button id="cta-start" class="w-full sm:w-auto px-8 py-4 bg-primary text-white text-lg font-bold rounded-xl shadow-xl shadow-primary/25 hover:translate-y-[-2px] transition-all">
                  Start Your Preparation
                </button>
                <button class="w-full sm:w-auto px-8 py-4 bg-white border-2 border-primary/10 text-primary text-lg font-bold rounded-xl hover:bg-white/50 transition-all flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined">play_circle</span>
                  Watch Demo
                </button>
              </div>
              <!-- Social Proof Section -->
              <div class="flex items-center justify-center lg:justify-start gap-4 pt-4">
                <div class="flex -space-x-3">
                  <img class="w-10 h-10 rounded-full border-2 border-background-light object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" />
                  <img class="w-10 h-10 rounded-full border-2 border-background-light object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" />
                  <img class="w-10 h-10 rounded-full border-2 border-background-light object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" />
                </div>
                <p class="text-sm font-medium text-slate-600">
                  Join <span class="text-primary font-bold">10,000+</span> candidates
                </p>
              </div>
            </div>
            <div class="flex-1 w-full max-w-[600px] lg:max-w-none">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-8 border-white/50">
                <img alt="AI Interview Interface mockup" class="w-full aspect-[4/3] object-cover" src="C:/Users/neera/.gemini/antigravity/brain/57d7e73d-0320-47c7-ab7d-94b02a16fb0b/antrix_hero_image_1773523289630.png" />
                <div class="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <section class="max-w-7xl mx-auto px-6 md:px-20 py-20" id="features">
          <div class="flex flex-col items-center text-center gap-4 mb-16">
            <h2 class="text-primary text-3xl md:text-5xl font-bold tracking-tight">Powerful Features for Your Success</h2>
            <p class="text-slate-600 text-lg max-w-2xl">Our platform leverages cutting-edge AI to simulate the pressure of a real interview while providing the safety of a practice environment.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="group bg-white/60 p-8 rounded-xl border border-primary/5 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div class="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-3xl">description</span>
              </div>
              <h3 class="text-primary text-xl font-bold mb-3">Resume Analysis</h3>
              <p class="text-slate-600 leading-relaxed">Upload your CV for tailored question generation based on your actual experience and target role requirements.</p>
            </div>
            <div class="group bg-white/60 p-8 rounded-xl border border-primary/5 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div class="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-3xl">videocam</span>
              </div>
              <h3 class="text-primary text-xl font-bold mb-3">Mock Interviews</h3>
              <p class="text-slate-600 leading-relaxed">Practice in a realistic environment with our advanced video and voice recognition system that captures body language and tone.</p>
            </div>
            <div class="group bg-white/60 p-8 rounded-xl border border-primary/5 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div class="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-3xl">insights</span>
              </div>
              <h3 class="text-primary text-xl font-bold mb-3">AI-Powered Feedback</h3>
              <p class="text-slate-600 leading-relaxed">Get detailed analytics on your communication style, pace, sentiment, and the technical accuracy of your responses.</p>
            </div>
          </div>
        </section>

        <section class="max-w-7xl mx-auto px-6 md:px-20 py-24 text-center">
          <div class="bg-primary rounded-3xl p-12 md:p-20 relative overflow-hidden">
            <div class="relative z-10 max-w-2xl mx-auto flex flex-col gap-8">
              <h2 class="text-white text-4xl md:text-6xl font-bold tracking-tight">Ready to ace your next role?</h2>
              <p class="text-white/80 text-lg md:text-xl font-medium">Join thousands of successful candidates who used Antrix to land their dream jobs.</p>
              <div class="flex flex-col sm:flex-row justify-center gap-4">
                <button class="px-10 py-5 bg-background-light text-primary text-lg font-bold rounded-xl shadow-2xl hover:scale-105 transition-all">
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `;
}

export function init() {
  const ctaBtn = document.getElementById('cta-start');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      navigateTo('/upload');
    });
  }

  // Header buttons and CTA buttons
  document.querySelectorAll('button').forEach(btn => {
    const text = btn.textContent.trim().toLowerCase();
    if (text === 'login') {
      btn.addEventListener('click', () => navigateTo('/login'));
    } else if (text === 'sign up' || text === 'get started now') {
      btn.addEventListener('click', () => navigateTo('/signup'));
    }
  });
}
