/* TaktForge — main.js */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initContactForm();
  initCheckoutFlow();
  initScrollAnimations();
  markActivePage();
});

/* ── Mobile navigation ─────────────────────────────── */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav.classList.toggle('is-open');
    toggle.setAttribute('aria-label', expanded ? 'Menü öffnen' : 'Menü schließen');
  });

  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
      toggle.setAttribute('aria-label', 'Menü öffnen');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
      toggle.focus();
    }
  });
}

/* ── Active page nav link ──────────────────────────── */
function markActivePage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });
}

/* ── Contact form ──────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors(form);

    let valid = true;

    const name = form.querySelector('#contact-name');
    if (!name.value.trim()) {
      setError(name, 'contact-name-error', 'Bitte geben Sie Ihren Namen ein.');
      valid = false;
    }

    const email = form.querySelector('#contact-email');
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setError(email, 'contact-email-error', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      valid = false;
    }

    const subject = form.querySelector('#contact-subject');
    if (subject && !subject.value) {
      setError(subject, 'contact-subject-error', 'Bitte wählen Sie ein Betreff aus.');
      valid = false;
    }

    const message = form.querySelector('#contact-message');
    if (!message.value.trim() || message.value.trim().length < 10) {
      setError(message, 'contact-message-error', 'Ihre Nachricht muss mindestens 10 Zeichen lang sein.');
      valid = false;
    }

    if (!valid) {
      const firstError = form.querySelector('[aria-invalid="true"]');
      if (firstError) firstError.focus();
      return;
    }

    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Wird gesendet …';

    setTimeout(() => {
      const success = document.getElementById('form-success');
      if (success) {
        form.hidden = true;
        success.hidden = false;
        success.focus();
      }
    }, 1200);
  });
}

function setError(input, errorId, msg) {
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', errorId);
  const el = document.getElementById(errorId);
  if (el) { el.textContent = msg; el.classList.add('visible'); }
}

function clearErrors(form) {
  form.querySelectorAll('.form-error').forEach(el => {
    el.classList.remove('visible');
    el.textContent = '';
  });
  form.querySelectorAll('[aria-invalid]').forEach(el => {
    el.removeAttribute('aria-invalid');
    el.removeAttribute('aria-describedby');
  });
}

/* ── Checkout flow (preise.html) ───────────────────── */
function initCheckoutFlow() {
  const btns = document.querySelectorAll('[data-checkout-trigger]');
  const section = document.getElementById('checkout-section');
  if (!btns.length || !section) return;

  const planLabel = document.getElementById('checkout-plan-label');
  const planPrice = document.getElementById('checkout-plan-price');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.checkoutTrigger;
      if (planLabel) planLabel.textContent = plan === 'yearly' ? 'TaktForge Pro — Jährlich' : 'TaktForge Pro — Monatlich';
      if (planPrice) planPrice.textContent = plan === 'yearly' ? '€39,00 / Jahr' : '€4,99 / Monat';
      section.hidden = false;
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => section.querySelector('h2').focus(), 400);
    });
  });

  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const checkbox = document.getElementById('widerruf-checkbox');
    const errEl = document.getElementById('widerruf-error');

    if (!checkbox.checked) {
      errEl.classList.add('visible');
      checkbox.focus();
      return;
    }
    errEl.classList.remove('visible');
    window.location.href = 'checkout-success.html';
  });

  const widerrufCheck = document.getElementById('widerruf-checkbox');
  if (widerrufCheck) {
    widerrufCheck.addEventListener('change', () => {
      const errEl = document.getElementById('widerruf-error');
      if (widerrufCheck.checked && errEl) errEl.classList.remove('visible');
    });
  }
}

/* ── Scroll-triggered fade-up animations ─────────────── */
function initScrollAnimations() {
  if (!window.IntersectionObserver) return;

  const els = document.querySelectorAll('.scroll-fade');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => obs.observe(el));
}
