const app = document.getElementById('app');

const routes = {
  '/': 'home',
  '/login': 'login',
  '/signup': 'signup',
  '/upload': 'upload',
  '/role-selection': 'role-selection',
  '/mode-selection': 'mode-selection',
  '/interview': 'interview',
  '/feedback': 'feedback'
};

export function navigateTo(path) {
  window.history.pushState({}, '', path);
  handleLocation();
}

async function handleLocation() {
  const path = window.location.pathname;
  const route = routes[path] || routes['/'];
  
  try {
    const module = await import(`./screens/${route}.js`);
    app.innerHTML = module.render();
    if (module.init) module.init();
    window.scrollTo(0, 0);
  } catch (err) {
    console.error('Failed to load route:', err);
    app.innerHTML = '<div class="p-20 text-center"><h1>404 - Page Not Found</h1></div>';
  }
}

export function initRouter() {
  window.addEventListener('popstate', handleLocation);
  
  // Intercept all link clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href.startsWith(window.location.origin)) {
      e.preventDefault();
      navigateTo(new URL(link.href).pathname);
    }
  });

  handleLocation();
}
