// ── CUSTOM CURSOR ──
const cursor = document.querySelector('.cursor');
const ring = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

(function animateRing() {
  ringX += (mouseX - ringX - 17) * 0.1;
  ringY += (mouseY - ringY - 17) * 0.1;
  ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .project-card, .skill-card, .activity-card, .stat-box, .contact-link').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); ring.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); ring.classList.remove('hovered'); });
});

// ── NAV SCROLL ──
const nav = document.querySelector('nav');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 }).observe && sections.forEach(s =>
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 }).observe(s)
);

// ── HAMBURGER ──
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});
navLinks.forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
}));

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.08 }).observe && reveals.forEach(el =>
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 }).observe(el)
);

// ── CONTACT FORM ──
const form = document.querySelector('.contact-form');
const sendBtn = form?.querySelector('button');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const msg = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !msg) {
      sendBtn.textContent = 'Please fill all fields ✕';
      sendBtn.style.background = '#7f1d1d';
      sendBtn.style.color = '#fca5a5';
      setTimeout(() => {
        sendBtn.textContent = 'Send Message';
        sendBtn.style.background = '';
        sendBtn.style.color = '';
      }, 2200);
      return;
    }

    sendBtn.textContent = 'Sending...';
    sendBtn.disabled = true;

    setTimeout(() => {
      sendBtn.textContent = 'Message Sent ✓';
      sendBtn.style.background = '#14532d';
      sendBtn.style.color = '#86efac';
      form.querySelectorAll('input, textarea').forEach(el => el.value = '');
      setTimeout(() => {
        sendBtn.textContent = 'Send Message';
        sendBtn.style.background = '';
        sendBtn.style.color = '';
        sendBtn.disabled = false;
      }, 3000);
    }, 1200);
  });
}