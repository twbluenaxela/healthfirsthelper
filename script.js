/* =============================================
   書法藝廊 — Script
   ============================================= */

// --- Year ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Nav scroll shadow ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// --- Mobile nav toggle ---
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- Gallery data ---
const items = Array.from(document.querySelectorAll('.gallery-item'));
const data = items.map(el => ({
  src:   el.querySelector('img').src,
  alt:   el.querySelector('img').alt,
  title: el.querySelector('h3').textContent,
  style: el.querySelector('.work-style').textContent,
  date:  el.querySelector('.work-date').textContent,
  desc:  el.querySelector('.work-desc').textContent,
}));

// --- Lightbox ---
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbTitle  = document.getElementById('lbTitle');
const lbStyle  = document.getElementById('lbStyle');
const lbDate   = document.getElementById('lbDate');
const lbDesc   = document.getElementById('lbDesc');
const lbClose  = document.getElementById('lbClose');
const lbPrev   = document.getElementById('lbPrev');
const lbNext   = document.getElementById('lbNext');

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  renderLightbox();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function renderLightbox() {
  const d = data[currentIndex];
  lbImg.src   = d.src;
  lbImg.alt   = d.alt;
  lbTitle.textContent = d.title;
  lbStyle.textContent = d.style;
  lbDate.textContent  = d.date;
  lbDesc.textContent  = d.desc;
}

function prevItem() {
  currentIndex = (currentIndex - 1 + data.length) % data.length;
  renderLightbox();
}

function nextItem() {
  currentIndex = (currentIndex + 1) % data.length;
  renderLightbox();
}

// Attach gallery click
items.forEach((el, i) => {
  el.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevItem);
lbNext.addEventListener('click', nextItem);

// Click backdrop to close
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   prevItem();
  if (e.key === 'ArrowRight')  nextItem();
});

// --- Contact form (client-side feedback only) ---
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formNote.textContent = '請填寫所有欄位。';
    formNote.style.color = '#c0392b';
    return;
  }

  // Replace this section with your actual backend / email service
  formNote.textContent = `謝謝您的留言，${name}！我將盡快回覆。`;
  formNote.style.color = '#5a8a5a';
  form.reset();
});

// --- Scroll reveal animation ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Apply stagger delay for gallery items
      const delay = entry.target.dataset.revealDelay;
      if (delay) {
        entry.target.style.transitionDelay = delay;
      }
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Gallery items — staggered reveal
document.querySelectorAll('.gallery-item').forEach((el, i) => {
  el.dataset.revealDelay = (i % 3) * 0.12 + 's';
  revealObserver.observe(el);
});

// Section headers
document.querySelectorAll('.section-header').forEach(el => {
  revealObserver.observe(el);
});

// Brush-lines (reveal after their parent header)
document.querySelectorAll('.brush-line').forEach(el => {
  el.dataset.revealDelay = '0.35s';
  revealObserver.observe(el);
});

// About seal stamp
const aboutSeal = document.querySelector('.about-seal');
if (aboutSeal) {
  aboutSeal.dataset.revealDelay = '0.25s';
  revealObserver.observe(aboutSeal);
}

// About text paragraphs — staggered
document.querySelectorAll('.about-text p, .about-text blockquote').forEach((el, i) => {
  el.classList.add('reveal-line');
  el.dataset.revealDelay = (0.15 + i * 0.12) + 's';
  revealObserver.observe(el);
});

// Contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  revealObserver.observe(contactForm);
}

// --- Floating ink particles ---
(function createInkParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const count = 12;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'ink-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.animationDuration = (6 + Math.random() * 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    hero.appendChild(p);
  }
})();

// --- Hero parallax on scroll ---
const inkSplash = document.querySelector('.ink-splash');
const heroContent = document.querySelector('.hero-content');
if (inkSplash && heroContent) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      inkSplash.style.transform =
        `translate(-50%, calc(-50% + ${y * 0.15}px))`;
      heroContent.style.transform =
        `translateY(${y * 0.08}px)`;
      heroContent.style.opacity = 1 - y / (window.innerHeight * 0.9);
    }
  }, { passive: true });
}
