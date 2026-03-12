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

// Interactive Timeline Progress Animation
function updateTimelineProgress() {
  const timeline = document.querySelector('.timeline');
  const timelineProgress = document.querySelector('.timeline-progress');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (!timeline || !timelineProgress) return;
  
  const timelineRect = timeline.getBoundingClientRect();
  const timelineTop = timelineRect.top + window.pageYOffset;
  const timelineHeight = timelineRect.height;
  const scrollPosition = window.pageYOffset + window.innerHeight / 2;
  
  // Calculate progress percentage
  const progress = Math.max(0, Math.min(1, (scrollPosition - timelineTop) / timelineHeight));
  timelineProgress.style.height = `${progress * 100}%`;
  
  // Animate timeline items as they come into view
  timelineItems.forEach((item, index) => {
    const itemRect = item.getBoundingClientRect();
    const itemTop = itemRect.top + window.pageYOffset;
    const itemTrigger = window.innerHeight * 0.8;
    
    if (window.pageYOffset + itemTrigger >= itemTop) {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 150); // Stagger animation
    }
  });
}

// Throttle timeline updates
let timelineTicking = false;
function requestTimelineUpdate() {
  if (!timelineTicking) {
    window.requestAnimationFrame(() => {
      updateTimelineProgress();
      timelineTicking = false;
    });
    timelineTicking = true;
  }
}

window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
window.addEventListener('resize', requestTimelineUpdate, { passive: true });
window.addEventListener('load', updateTimelineProgress);

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000, suffix = '+') {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

// Observe stat numbers for counting animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const target = parseInt(element.getAttribute('data-target'));
      const label = element.nextElementSibling.textContent;
      
      // Determine suffix based on label
      let suffix = '+';
      if (label === 'Companies') {
        suffix = '';
      }
      
      // Start counting animation
      animateCounter(element, target, 1000, suffix);
      
      // Unobserve after animation
      statsObserver.unobserve(element);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ══════════════════════════════════════════════════════════════
// TERMINAL MODE
// ══════════════════════════════════════════════════════════════

let commandHistory = [];
let historyIndex = -1;
let terminalInput;
let terminalOutput;

// Initialize terminal after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  terminalInput = document.getElementById('terminalInput');
  terminalOutput = document.getElementById('terminalOutput');
  
  console.log('Terminal initialized:', { 
    input: terminalInput ? 'found' : 'NOT FOUND',
    output: terminalOutput ? 'found' : 'NOT FOUND'
  });
  
  if (terminalInput) {
    terminalInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const command = this.value.trim();
        if (command) {
          executeCommand(command);
          commandHistory.push(command);
          historyIndex = commandHistory.length;
          this.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          this.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          this.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          this.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        autoComplete(this);
      }
    });
  }
});

function toggleTerminal() {
  const overlay = document.getElementById('terminalOverlay');
  const input = document.getElementById('terminalInput');
  
  if (!overlay) {
    console.error('Terminal overlay not found');
    return;
  }
  
  if (overlay.classList.contains('active')) {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300);
  } else {
    overlay.style.display = 'flex';
    setTimeout(() => {
      overlay.classList.add('active');
      if (input) {
        input.focus();
      }
    }, 10);
  }
}

function executeCommand(cmd) {
  const args = cmd.toLowerCase().split(' ');
  const command = args[0];
  const param = args.slice(1).join(' ');
  
  addToTerminal(`<div class="terminal-line"><span class="terminal-prompt">philip@portfolio:~$</span> <span class="terminal-command">${escapeHtml(cmd)}</span></div>`);
  
  switch(command) {
    case 'help':
      showHelp();
      break;
    case 'ls':
    case 'list':
      listSections();
      break;
    case 'cat':
    case 'view':
      if (param) {
        viewSection(param);
      } else {
        addToTerminal('<div class="terminal-line terminal-error">Usage: cat [section]</div>');
        addToTerminal('<div class="terminal-line terminal-muted">Example: cat about</div>');
      }
      break;
    case 'clear':
    case 'cls':
      clearTerminal();
      break;
    case 'exit':
    case 'quit':
      toggleTerminal();
      break;
    case 'whoami':
      showWhoami();
      break;
    case 'contact':
      showContact();
      break;
    case 'skills':
      viewSection('skills');
      break;
    case 'projects':
      viewSection('projects');
      break;
    case 'experience':
    case 'work':
      viewSection('experience');
      break;
    case 'education':
    case 'edu':
      viewSection('education');
      break;
    case 'social':
      showSocial();
      break;
    case 'download':
    case 'cv':
    case 'resume':
      downloadCV();
      break;
    default:
      addToTerminal(`<div class="terminal-line terminal-error">Command not found: ${escapeHtml(command)}</div>`);
      addToTerminal('<div class="terminal-line terminal-muted">Type \'help\' to see available commands</div>');
  }
  
  addToTerminal('<br>');
  scrollToBottom();
}

function showHelp() {
  addToTerminal('<div class="terminal-section-title">Available Commands:</div>');
  addToTerminal('<div class="terminal-line"><span class="terminal-highlight">help</span>          <span class="terminal-muted">- Show this help message</span></div>');
  addToTerminal('<div class="terminal-line"><span class="terminal-highlight">ls/list</span>       <span class="terminal-muted">- List all available sections</span></div>');
  addToTerminal('<div class="terminal-line"><span class="terminal-highlight">cat [section]</span> <span class="terminal-muted">- View content of a section</span></div>');
  addToTerminal('<div class="terminal-line"><span class="terminal-highlight">whoami</span>        <span class="terminal-muted">- Display brief information about me</span></div>');
  addToTerminal('<div class="terminal-line"><span class="terminal-highlight">contact</span>       <span class="terminal-muted">- Show contact information</span></div>');
  addToTerminal('<div class="terminal-line"><span class="terminal-highlight">social</span>        <span class="terminal-muted">- Show social media links</span></div>');
  addToTerminal('<div class="terminal-line"><span class="terminal-highlight">cv/resume</span>     <span class="terminal-muted">- Download CV</span></div>');
  addToTerminal('<div class="terminal-line"><span class="terminal-highlight">clear/cls</span>     <span class="terminal-muted">- Clear the terminal</span></div>');
  addToTerminal('<div class="terminal-line"><span class="terminal-highlight">exit/quit</span>     <span class="terminal-muted">- Exit terminal mode</span></div>');
  addToTerminal('<br>');
  addToTerminal('<div class="terminal-line terminal-muted">Tip: Use Tab for auto-completion, ↑/↓ for command history</div>');
}

function listSections() {
  addToTerminal('<div class="terminal-section-title">Available Sections:</div>');
  addToTerminal('<div class="terminal-item">about</div>');
  addToTerminal('<div class="terminal-item">skills</div>');
  addToTerminal('<div class="terminal-item">projects</div>');
  addToTerminal('<div class="terminal-item">experience</div>');
  addToTerminal('<div class="terminal-item">education</div>');
  addToTerminal('<div class="terminal-item">contact</div>');
}

function viewSection(section) {
  switch(section) {
    case 'about':
    case 'about.txt':
      addToTerminal('<div class="terminal-section-title">→ About Me</div>');
      addToTerminal('<div class="terminal-text">Software Engineer with 4 years of industry experience delivering production-grade software across enterprise, cloud, and full-stack environments.</div>');
      addToTerminal('<br>');
      addToTerminal('<div class="terminal-text">My work has spanned sectors including aviation and telecommunications, where I\'ve contributed to complex, client-facing systems that serve real users at scale.</div>');
      addToTerminal('<br>');
      addToTerminal('<div class="terminal-text">Years Experience: 4+</div>');
      addToTerminal('<div class="terminal-text">Companies: 2</div>');
      addToTerminal('<div class="terminal-text">Industrial Projects Delivered: 4</div>');
      break;
      
    case 'skills':
    case 'skills.txt':
      addToTerminal('<div class="terminal-section-title">→ Technical Skills</div>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Languages:</span> Java, Python, JavaScript</div>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Backend:</span> Spring Boot, Flask, REST APIs, GraphQL</div>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Frontend:</span> React, HTML5/CSS3</div>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Databases:</span> MySQL, PostgreSQL</div>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Cloud / DevOps:</span> AWS, Docker, CI/CD</div>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Testing / QA:</span> Selenium, Cucumber, Mockito, REST Assured, JUnit</div>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Tools:</span> VS Code, GIT, Jira, Confluence, IntelliJ IDEA, Eclipse</div>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Data Analytics:</span> Power BI, Python</div>');
      break;
      
    case 'projects':
    case 'projects.txt':
      addToTerminal('<div class="terminal-section-title">→ Featured Projects</div>');
      addToTerminal('<br>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">1. Care N Cure</span> (Healthcare · AI)</div>');
      addToTerminal('<div class="terminal-text">   AI-powered medical analysis application leveraging machine learning</div>');
      addToTerminal('<div class="terminal-text">   Tech: Flask, React, MySQL, GCP, Python, RAG, Gemini LLM</div>');
      addToTerminal('<br>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">2. IFS Maintenix</span> (Aviation - Oct 2023 – Jul 2025)</div>');
      addToTerminal('<div class="terminal-text">   Aviation maintenance software for USA-based client @ IFS</div>');
      addToTerminal('<div class="terminal-text">   Tech: Java, Spring Boot, Enterprise</div>');
      addToTerminal('<br>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">3. Intelligent Virtual Assistant</span> (Telephony - Sep 2022 – Jun 2023)</div>');
      addToTerminal('<div class="terminal-text">   Omnichannel IVA for USA-based client @ Virtusa</div>');
      addToTerminal('<div class="terminal-text">   Tech: JavaScript, GraphQL, Java, Spring Boot, PostgreSQL, CCXML, VXML</div>');
      addToTerminal('<br>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">4. Capture Corn</span> (Computer Vision · Agriculture)</div>');
      addToTerminal('<div class="terminal-text">   CNN-based Fall Army Worm detection Android app</div>');
      addToTerminal('<div class="terminal-text">   Tech: Android, CNN, Machine Learning, Python</div>');
      break;
      
    case 'experience':
    case 'experience.txt':
    case 'work':
      addToTerminal('<div class="terminal-section-title">→ Work Experience</div>');
      addToTerminal('<br>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">IFS</span> - Software Engineer</div>');
      addToTerminal('<div class="terminal-text">Oct 2023 – Jul 2025 | Aerospace & Defense Domain</div>');
      addToTerminal('<div class="terminal-item">Developed aviation maintenance platform for USA-based client</div>');
      addToTerminal('<div class="terminal-item">Worked on asset airworthiness and quality management systems</div>');
      addToTerminal('<div class="terminal-item">Collaborated with international stakeholders</div>');
      addToTerminal('<br>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Virtusa</span> - Associate Engineer - Technology (Java)</div>');
      addToTerminal('<div class="terminal-text">Sep 2022 – Jun 2023 | Telephony Domain</div>');
      addToTerminal('<div class="terminal-item">Built omnichannel Intelligent Virtual Assistants</div>');
      addToTerminal('<div class="terminal-item">Integrated Twilio and LiveVox platforms</div>');
      addToTerminal('<div class="terminal-item">Engineered scalable telephony solutions</div>');
      break;
      
    case 'education':
    case 'education.txt':
    case 'edu':
      addToTerminal('<div class="terminal-section-title">→ Education</div>');
      addToTerminal('<br>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Master of Software Engineering</span></div>');
      addToTerminal('<div class="terminal-text">Yoobee College of Creative Innovation</div>');
      addToTerminal('<div class="terminal-text">July 2025 – July 2026 | Auckland, New Zealand</div>');
      addToTerminal('<br>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Bachelor of Science in Computer Science and Software Engineering</span></div>');
      addToTerminal('<div class="terminal-text">University of Bedfordshire</div>');
      addToTerminal('<div class="terminal-text">January 2021 – October 2021 | SLIIT Academy, Sri Lanka</div>');
      addToTerminal('<br>');
      addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Higher Diploma in Information Technology</span></div>');
      addToTerminal('<div class="terminal-text">SLIIT Academy</div>');
      addToTerminal('<div class="terminal-text">January 2018 – December 2020 | Colombo, Sri Lanka</div>');
      break;
      
    case 'contact':
    case 'contact.txt':
      showContact();
      break;
      
    default:
      addToTerminal(`<div class="terminal-line terminal-error">Section '${escapeHtml(section)}' not found</div>`);
      addToTerminal('<div class="terminal-line terminal-muted">Available sections: about, skills, projects, experience, education, contact</div>');
  }
}

function showWhoami() {
  addToTerminal('<div class="terminal-section-title">→ Philip Niron Nithianandan</div>');
  addToTerminal('<div class="terminal-text">Role: Software Engineer</div>');
  addToTerminal('<div class="terminal-text">Experience: 4 years in industry</div>');
  addToTerminal('<div class="terminal-text">Domains: Aerospace & Defense, Telephony, Healthcare AI</div>');
  addToTerminal('<div class="terminal-text">Location: Blockhouse Bay, Auckland</div>');
  addToTerminal('<div class="terminal-text">Status: Available for opportunities</div>');
}

function showContact() {
  addToTerminal('<div class="terminal-section-title">→ Contact Information</div>');
  addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Email:</span> philip.niron@gmail.com</div>');
  addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Phone:</span> +64 22 184 2644</div>');
  addToTerminal('<div class="terminal-text"><span class="terminal-highlight">Location:</span> Blockhouse Bay, Auckland</div>');
  addToTerminal('<br>');
  addToTerminal('<div class="terminal-text terminal-muted">Type \'social\' to see social media links</div>');
}

function showSocial() {
  addToTerminal('<div class="terminal-section-title">→ Social Media</div>');
  addToTerminal('<div class="terminal-text"><span class="terminal-highlight">LinkedIn:</span> https://www.linkedin.com/in/philip-niron/</div>');
  addToTerminal('<div class="terminal-text"><span class="terminal-highlight">GitHub:</span> https://github.com/Niron-code</div>');
}

function downloadCV() {
  addToTerminal('<div class="terminal-success">Initiating CV download...</div>');
  setTimeout(() => {
    window.location.href = 'Philip Niron_CV.pdf';
  }, 500);
}

function clearTerminal() {
  if (terminalOutput) {
    terminalOutput.innerHTML = '';
  }
}

function addToTerminal(html) {
  if (terminalOutput) {
    terminalOutput.innerHTML += html;
  }
}

function scrollToBottom() {
  const terminalBody = document.getElementById('terminalBody');
  if (terminalBody) {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function autoComplete(input) {
  const commands = ['help', 'ls', 'list', 'cat', 'view', 'clear', 'cls', 'exit', 'quit', 
                   'whoami', 'contact', 'skills', 'projects', 'experience', 'work', 
                   'education', 'edu', 'social', 'download', 'cv', 'resume'];
  const sections = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];
  
  const currentValue = input.value.toLowerCase();
  const words = currentValue.split(' ');
  const lastWord = words[words.length - 1];
  
  let suggestions;
  if (words.length === 1) {
    suggestions = commands.filter(cmd => cmd.startsWith(lastWord));
  } else if ((words[0] === 'cat' || words[0] === 'view') && words.length === 2) {
    suggestions = sections.filter(sec => sec.startsWith(lastWord));
  }
  
  if (suggestions && suggestions.length === 1) {
    words[words.length - 1] = suggestions[0];
    input.value = words.join(' ');
  } else if (suggestions && suggestions.length > 1 && terminalOutput) {
    addToTerminal(`<div class="terminal-line terminal-muted">Suggestions: ${suggestions.join(', ')}</div>`);
    scrollToBottom();
  }
}

// Close terminal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('terminalOverlay');
    if (overlay && overlay.classList.contains('active')) {
      toggleTerminal();
    }
  }
});
