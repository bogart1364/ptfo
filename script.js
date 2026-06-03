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

// custom interactive cursor
const initCustomCursor = () => {
  if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(hover: none)').matches) {
    return;
  }

  const cursorRing = document.createElement('div');
  const cursorDot = document.createElement('div');
  cursorRing.className = 'custom-cursor-ring';
  cursorDot.className = 'custom-cursor-dot';
  document.body.append(cursorRing, cursorDot);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  const updateCursor = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(updateCursor);
  };

  updateCursor();

  document.addEventListener('pointermove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    document.body.classList.remove('cursor-hidden');
  });

  document.addEventListener('pointerleave', () => {
    document.body.classList.add('cursor-hidden');
  });

  const hoverTargets = document.querySelectorAll('a, button, .button, .social-icon, .main-nav a');
  hoverTargets.forEach((element) => {
    element.addEventListener('pointerenter', () => {
      document.body.classList.add('cursor-hover');
    });
    element.addEventListener('pointerleave', () => {
      document.body.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-active');
    });
  });

  document.addEventListener('pointerdown', () => {
    document.body.classList.add('cursor-active');
  });
  document.addEventListener('pointerup', () => {
    document.body.classList.remove('cursor-active');
  });

  const textInputs = document.querySelectorAll('input, textarea');
  textInputs.forEach((element) => {
    element.addEventListener('pointerenter', () => document.body.classList.add('cursor-hidden'));
    element.addEventListener('pointerleave', () => document.body.classList.remove('cursor-hidden'));
  });
};

initCustomCursor();
