import { navigateTo } from '../router';

export function render() {
  return `
    <div class="flex min-h-screen w-full bg-white overflow-hidden">
      <!-- Left Side: Promo/Illustration -->
      <div class="hidden lg:flex lg:w-1/2 relative bg-[#f2f4d9] items-center justify-center p-12 overflow-hidden">
        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#000 0.5px, transparent 0.5px); background-size: 20px 20px;"></div>
        <div class="absolute inset-0" style="background-image: 
            linear-gradient(30deg, #e5e7bc 12%, transparent 12.5%, transparent 87%, #e5e7bc 87.5%, #e5e7bc),
            linear-gradient(150deg, #e5e7bc 12%, transparent 12.5%, transparent 87%, #e5e7bc 87.5%, #e5e7bc),
            linear-gradient(30deg, #e5e7bc 12%, transparent 12.5%, transparent 87%, #e5e7bc 87.5%, #e5e7bc),
            linear-gradient(150deg, #e5e7bc 12%, transparent 12.5%, transparent 87%, #e5e7bc 87.5%, #e5e7bc),
            linear-gradient(60deg, #d8db9c 25%, transparent 25.5%, transparent 75%, #d8db9c 75%, #d8db9c),
            linear-gradient(60deg, #d8db9c 25%, transparent 25.5%, transparent 75%, #d8db9c 75%, #d8db9c);
          background-size: 80px 140px;
          background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;">
        </div>
        
        <div class="relative z-10 max-w-lg">
          <h2 class="text-[#1a1a1a] text-6xl font-bold leading-tight mb-6">
            Join Our Global Community.
          </h2>
          <p class="text-[#4a4a4a] text-xl leading-relaxed">
            Start your journey today and unlock the full potential of AI-powered interview preparation.
          </p>
        </div>
      </div>

      <!-- Right Side: Signup Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div class="w-full max-w-[400px] flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <h1 class="text-[#1a1a1a] text-4xl font-bold tracking-tight">Create account</h1>
            <p class="text-slate-500 font-medium">Please enter your details to get started.</p>
          </div>

          <form id="signup-form" class="flex flex-col gap-5">
            <div class="flex flex-col gap-1">
              <label for="name" class="text-sm font-bold text-[#1a1a1a]">Full Name</label>
              <input type="text" id="name" placeholder="John Doe" required
                class="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400" />
            </div>

            <div class="flex flex-col gap-1">
              <label for="email" class="text-sm font-bold text-[#1a1a1a]">Email Address</label>
              <input type="email" id="email" placeholder="name@company.com" required
                class="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400" />
            </div>

            <div class="flex flex-col gap-1">
              <label for="password" class="text-sm font-bold text-[#1a1a1a]">Password</label>
              <input type="password" id="password" placeholder="••••••••" required
                class="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400" />
            </div>

            <div class="flex items-start gap-2 pt-1">
              <input type="checkbox" id="terms" required class="mt-1 w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-teal-500" />
              <label for="terms" class="text-xs text-slate-500 font-medium leading-normal">
                I agree to the <a href="#" class="text-[#7b9894] font-bold hover:underline">Terms of Service</a> and <a href="#" class="text-[#7b9894] font-bold hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" class="w-full py-3.5 bg-[#7b9894] hover:bg-[#6a8581] text-white font-bold rounded-lg transition-colors shadow-sm mt-2">
              Get Started
            </button>

            <div class="relative py-2">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-slate-100"></div>
              </div>
              <div class="relative flex justify-center text-xs">
                <span class="bg-white px-4 text-slate-400 font-medium italic">Or sign up with</span>
              </div>
            </div>

            <button type="button" class="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google" />
              <span class="text-sm font-bold text-[#1a1a1a]">Sign up with Google</span>
            </button>
          </form>

          <p class="text-center text-sm font-medium text-slate-500">
            Already have an account? 
            <a href="/login" class="text-[#7b9894] font-bold hover:underline ml-1">Log in</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  const form = document.getElementById('signup-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      navigateTo('/upload');
    });
  }
}
