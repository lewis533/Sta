// ---- Mobile nav toggle (animates hamburger into an X) ----
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

// ---- Scroll reveal: fade/slide elements in as they enter view ----
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => observer.observe(el));
}

// ---- Contact form: submit without leaving the page ----
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (contactForm.action.includes('YOUR_FORM_ID')) {
      formStatus.textContent = 'Form not connected yet — set up Formspree first (see comment in contact.html).';
      formStatus.className = 'form-status error';
      return;
    }

    formStatus.textContent = 'Sending...';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = 'Message sent — we\'ll reply within 24 hours.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        formStatus.textContent = 'Something went wrong. Please try again or email us directly.';
        formStatus.className = 'form-status error';
      }
    } catch (err) {
      formStatus.textContent = 'Network error. Please check your connection and try again.';
      formStatus.className = 'form-status error';
    }
  });
}
