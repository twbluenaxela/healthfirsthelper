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
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
  observer.observe(el);
});

// Add visible class handling
const style = document.createElement('style');
style.textContent = `.gallery-item.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);
