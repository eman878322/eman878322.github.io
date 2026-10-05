const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

const savedTheme = localStorage.getItem('eman-theme');
if (savedTheme === 'light') {
  root.classList.add('light');
  themeToggle.textContent = '☀';
}
themeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  const light = root.classList.contains('light');
  localStorage.setItem('eman-theme', light ? 'light' : 'dark');
  themeToggle.textContent = light ? '☀' : '☾';
});

menuToggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

const navLinks = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s => observer.observe(s));

const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      reveal.unobserve(entry.target);
    }
  });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
