// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Parallax Scrolling Effect
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach(element => {
    const speed = parseFloat(element.dataset.speed) || 0.5;
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + scrolled;
    
    // Only apply parallax when element is in viewport or near it
    if (scrolled + window.innerHeight > elementTop - 200 && scrolled < elementTop + rect.height + 200) {
      const yPos = -(scrolled - elementTop) * speed;
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
  });
  
  ticking = false;
}

function requestParallaxUpdate() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
window.addEventListener('resize', requestParallaxUpdate, { passive: true });

// Initial parallax update after page load
window.addEventListener('load', updateParallax);

// Hamburger menu
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

// Theme Toggle
function toggleTheme() {
  const html = document.documentElement;
  const themeIcon = document.getElementById('themeIcon');
  const currentTheme = html.classList.contains('light-theme') ? 'light' : 'dark';
  
  if (currentTheme === 'dark') {
    html.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
    // Sun icon for light mode
    themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  } else {
    html.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
    // Moon icon for dark mode
    themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
  }
}

// Load saved theme on page load
(function() {
  const savedTheme = localStorage.getItem('theme');
  const html = document.documentElement;
  const themeIcon = document.getElementById('themeIcon');
  
  if (savedTheme === 'light') {
    html.classList.add('light-theme');
    // Sun icon for light mode
    themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  }
})();

// Typing Animation
const roles = [
  'Software Engineer',
  'Backend Developer',
  'Full-Stack Developer',
  'Cloud Engineer',
  'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
  const typedTextElement = document.getElementById('typedText');
  if (!typedTextElement) return;
  
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentRole.length) {
    // Pause at end of word
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500;
  }
  
  setTimeout(typeRole, typingSpeed);
}

// Start typing animation after a short delay
setTimeout(typeRole, 1000);

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// Hero content shows immediately
document.querySelectorAll('.hero-content .reveal, .hero-photo-wrap .reveal').forEach(el => {
  el.classList.add('visible');
});
// Also immediately show hero elements
setTimeout(() => {
  document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('visible'));
}, 100);
