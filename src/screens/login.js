import { navigateTo } from '../router';

export function render() {
  return `
    <div class="flex min-h-screen w-full bg-white overflow-hidden">
      <!-- Left Side: Promo/Illustration -->
      <div class="hidden lg:flex lg:w-1/2 relative bg-[#f2f4d9] items-center justify-center p-12 overflow-hidden">
        <!-- Geometric Pattern Background -->
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
            Elevate Your Journey With Us.
          </h2>
          <p class="text-[#4a4a4a] text-xl leading-relaxed">
            Experience the next generation of seamless connectivity and premium design.
          </p>
        </div>
      </div>

      <!-- Right Side: Login Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div class="w-full max-w-[400px] flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <h1 class="text-[#1a1a1a] text-4xl font-bold tracking-tight">Welcome back</h1>
            <p class="text-slate-500 font-medium">Please enter your details to sign in to your account.</p>
          </div>

          <form id="login-form" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <label for="email" class="text-sm font-bold text-[#1a1a1a]">Email Address</label>
              <input type="email" id="email" placeholder="name@company.com" required
                class="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400" />
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center">
                <label for="password" class="text-sm font-bold text-[#1a1a1a]">Password</label>
                <a href="#" class="text-xs text-slate-400 font-medium hover:text-slate-600">Forgot password?</a>
              </div>
              <input type="password" id="password" placeholder="••••••••" required
                class="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400" />
            </div>

            <div class="flex items-center gap-2">
              <input type="checkbox" id="remember" class="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-teal-500" />
              <label for="remember" class="text-sm text-slate-500 font-medium">Remember me for 30 days</label>
            </div>

            <button type="submit" class="w-full py-3.5 bg-[#7b9894] hover:bg-[#6a8581] text-white font-bold rounded-lg transition-colors shadow-sm mt-2">
              Sign in
            </button>

            <div class="relative py-2">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-slate-100"></div>
              </div>
              <div class="relative flex justify-center text-xs">
                <span class="bg-white px-4 text-slate-400 font-medium italic">Or continue with</span>
              </div>
            </div>

            <button type="button" class="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google" />
              <span class="text-sm font-bold text-[#1a1a1a]">Sign in with Google</span>
            </button>
          </form>

          <p class="text-center text-sm font-medium text-slate-500">
            Don't have an account? 
            <a href="/signup" class="text-[#7b9894] font-bold hover:underline ml-1">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      navigateTo('/upload');
    });
  }
}
