const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  mainNav?.classList.toggle('open');
});

const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mainNav?.classList.contains('open')) {
      mainNav.classList.remove('open');
    }
  });
});

// Social icon click: open link (in new tab for external), and scroll to contact form with a pulse
const socialIcons = document.querySelectorAll('.social-icon');
const contactForm = document.querySelector('.contact-form');

socialIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
    const href = icon.getAttribute('href');

    // open link appropriately
    if (href.startsWith('mailto:')) {
      // navigate to mail client
      window.location.href = href;
    } else {
      window.open(href, '_blank', 'noopener');
    }

    // scroll to contact form and pulse
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // focus the form for keyboard users / screen readers
      setTimeout(() => {
        contactForm.classList.add('focus-pulse');
        contactForm.focus({ preventScroll: true });
      }, 450);
      setTimeout(() => contactForm.classList.remove('focus-pulse'), 1500);
    }
  });
  // keyboard activation (Enter / Space)
  icon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      icon.click();
    }
  });
});
