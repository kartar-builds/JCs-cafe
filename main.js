/* ============================================================
   CAFÉ JC'S — main.js
   Modules: Navbar | Hamburger | Active Link | Scroll-reveal
            Parallax | Menu Tabs | Lightbox | Forms | Hours
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initActiveLink();
  initScrollReveal();
  initParallax();

  if (document.querySelector('.menu-tabs'))     initMenuTabs();
  if (document.querySelector('.lightbox-trigger')) initLightbox();
  if (document.getElementById('reservation-form'))  initReservationForm();
  if (document.getElementById('contact-form'))       initContactForm();
  if (document.querySelector('.hours-table'))        initHoursHighlight();
});

/* Navbar scroll shrink */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Hamburger + Drawer */
function initHamburger() {
  const btn     = document.querySelector('.hamburger');
  const drawer  = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.nav-overlay');
  if (!btn || !drawer) return;

  function open() {
    btn.classList.add('open');
    drawer.classList.add('open');
    overlay && overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    btn.classList.remove('open');
    drawer.classList.remove('open');
    overlay && overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  btn.addEventListener('click', () => btn.classList.contains('open') ? close() : open());
  overlay && overlay.addEventListener('click', close);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* Active nav link */
function initActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* Scroll-reveal */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* Parallax hero */
function initParallax() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  const maxShift = window.innerHeight;
  const onScroll = () => {
    const shift = Math.min(window.scrollY * 0.2, maxShift);
    bg.style.transform = `translateY(${shift}px)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Menu tabs */
function initMenuTabs() {
  const tabs   = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        if (p.classList.contains('active')) {
          p.style.opacity = '0';
          setTimeout(() => { p.classList.remove('active'); p.style.opacity = ''; }, 100);
        }
      });
      const next = document.getElementById('panel-' + target);
      if (next) {
        setTimeout(() => {
          next.classList.add('active');
          const cards = next.querySelectorAll('.card');
          cards.forEach((c, i) => {
            c.style.opacity = '0';
            c.style.transform = 'translateY(16px)';
            setTimeout(() => {
              c.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              c.style.opacity = '1';
              c.style.transform = '';
            }, i * 60);
          });
        }, 110);
      }
    });
  });
}

/* Lightbox */
function initLightbox() {
  const triggers = Array.from(document.querySelectorAll('.lightbox-trigger'));
  const box      = document.getElementById('lightbox');
  const img      = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lb-close');
  const prevBtn  = document.getElementById('lb-prev');
  const nextBtn  = document.getElementById('lb-next');
  if (!box || !img) return;

  let current = 0;

  function show(idx) {
    current = (idx + triggers.length) % triggers.length;
    img.src = triggers[current].dataset.full || triggers[current].querySelector('img').src;
    img.alt = triggers[current].dataset.caption || '';
  }
  function openBox(idx) {
    show(idx);
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeBox() {
    box.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggers.forEach((t, i) => t.addEventListener('click', () => openBox(i)));
  closeBtn && closeBtn.addEventListener('click', closeBox);
  prevBtn  && prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn  && nextBtn.addEventListener('click', () => show(current + 1));
  box.addEventListener('click', e => { if (e.target === box) closeBox(); });
  document.addEventListener('keydown', e => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape')      closeBox();
    if (e.key === 'ArrowLeft')   show(current - 1);
    if (e.key === 'ArrowRight')  show(current + 1);
  });
}

/* Reservation form */
function initReservationForm() {
  const form    = document.getElementById('reservation-form');
  const confirm = document.getElementById('reservation-confirm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.style.display = 'none';
    if (confirm) confirm.style.display = 'block';
  });
}

/* Contact form */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.style.display = 'none';
    if (success) success.style.display = 'block';
  });
}

/* Highlight today's hours */
function initHoursHighlight() {
  const rows = document.querySelectorAll('.hours-table tr[data-day]');
  const today = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'][new Date().getDay()];
  rows.forEach(row => {
    if (row.dataset.day === today) row.classList.add('today');
  });
}
