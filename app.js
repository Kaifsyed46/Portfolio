/* =============================================
   APP.JS — PORTFOLIO INTERACTIONS
   ============================================= */

/* ---- Navbar Scroll Effect ---- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

/* ---- Active Nav Link on Scroll ---- */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinksContainer.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile nav on link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

/* ---- Typewriter Effect ---- */
const typewriterEl = document.getElementById('typewriter');
const words = [
  'AI Solutions',
  'ML Models',
  'Python Apps',
  'Data Pipelines',
  'Neural Networks',
  'Smart Systems'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout;

function type() {
  const currentWord = words[wordIndex];
  
  if (!isDeleting) {
    typewriterEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      typewriterTimeout = setTimeout(type, 2000);
      return;
    }
  } else {
    typewriterEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  
  const speed = isDeleting ? 60 : 100;
  typewriterTimeout = setTimeout(type, speed);
}

type();

/* ---- Particle Canvas ---- */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

let particles = [];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '108, 99, 255' : '34, 211, 238';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  const count = Math.min(Math.floor(window.innerWidth * 0.06), 100);
  particles = Array.from({ length: count }, () => new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  // Draw connections
  particles.forEach((p1, i) => {
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(108, 99, 255, ${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* ---- Scroll Reveal Animation ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

function setupReveal() {
  const elements = document.querySelectorAll(
    '.info-card, .skill-category, .project-card, .contact-card, .stat-item, .tech-badge'
  );
  elements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    revealObserver.observe(el);
  });
}

setupReveal();

/* ---- Skill Bar Animation ---- */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => {
  skillObserver.observe(cat);
});

/* ---- Contact Form ---- */
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const btnText = submitBtn.querySelector('span');
  btnText.textContent = 'Sending...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  // Simulate send (replace with actual form backend like Formspree/EmailJS)
  setTimeout(() => {
    formSuccess.style.display = 'block';
    contactForm.reset();
    btnText.textContent = 'Send Message';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '';
    
    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1500);
});

/* ---- Smooth Scroll for Nav Links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Mouse parallax on hero visual ---- */
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && window.matchMedia('(min-width: 1024px)').matches) {
  document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (clientX - cx) / cx;
    const dy = (clientY - cy) / cy;
    heroVisual.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`;
  });

  document.querySelector('.hero').addEventListener('mouseleave', () => {
    heroVisual.style.transform = 'translate(0, 0)';
  });
}

/* ---- Cursor Glow Effect ---- */
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  will-change: left, top;
`;
document.body.appendChild(cursorGlow);

let cursorX = 0, cursorY = 0;
let rafId;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  
  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      cursorGlow.style.left = cursorX + 'px';
      cursorGlow.style.top = cursorY + 'px';
      rafId = null;
    });
  }
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursorGlow.style.opacity = '1';
});

/* ---- Page Load Animation ---- */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

console.log('%c Mohammad Kaif — Portfolio', 
  'color: #6c63ff; font-size: 18px; font-weight: bold; padding: 10px;');
console.log('%c AI/ML Developer | github.com/Kaifsyed46', 
  'color: #94a3b8; font-size: 12px;');
