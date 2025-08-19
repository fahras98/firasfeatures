// Navigation avec mise à jour du hash dans l'URL
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  function showSectionById(id) {
    sections.forEach(section => section.classList.remove('active'));
    const targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    navLinks.forEach(nav => nav.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (activeLink) activeLink.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      window.location.hash = targetId;
      showSectionById(targetId);
    });
  });

  const initialHash = window.location.hash.substring(1);
  if (initialHash && document.getElementById(initialHash)) {
    showSectionById(initialHash);
  } else {
    showSectionById(sections[0].id);
  }
});

// Animation des barres de compétences
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.progress');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

// Observer pour les animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.id === 'competences') {
      animateSkillBars();
    }
  });
});

const allSections = document.querySelectorAll('section');
allSections.forEach(section => {
  observer.observe(section);
});

// Menu hamburger
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li a');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  if (navLinks.length > 0 && navMenu) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }
});

// Particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 8 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
}
document.addEventListener('DOMContentLoaded', createParticles);

// Gestion du formulaire de contact avec EmailJS
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  const contactForm = document.getElementById('contactForm');
  console.log('Form found:', contactForm);

  if (!contactForm) {
    console.error('Contact form not found!');
    return;
  }

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submission prevented');

    if (typeof emailjs === 'undefined') {
      console.error('EmailJS not loaded!');
      alert('Service de messagerie indisponible. Veuillez réessayer plus tard.');
      return false;
    }

    const submitBtn = this.querySelector('.submit-btn');
    if (!submitBtn) {
      console.error('Bouton submit non trouvé');
      return false;
    }
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;

    emailjs.sendForm('service_80p873w', 'template_pzr3kgo', this)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        submitBtn.textContent = 'Message envoyé ! ✓';
        submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = 'linear-gradient(45deg, #d4af37, #b8941f)';
          contactForm.reset();
        }, 2000);
      })
      .catch(function(error) {
        console.log('FAILED...', error);
        submitBtn.textContent = 'Erreur lors de l\'envoi. Réessayez.';
        submitBtn.disabled = false;
        submitBtn.style.background = 'linear-gradient(45deg, #d32f2f, #b71c1c)';

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'linear-gradient(45deg, #d4af37, #b8941f)';
        }, 3000);
      });

    return false;
  });
});

// LinkedIn badge hover
document.addEventListener('DOMContentLoaded', function() {
  const badge = document.querySelector('.linkedin-badge');
  const pulseAnimation = document.querySelector('.pulse-animation');

  if (badge && pulseAnimation) {
    badge.addEventListener('mouseenter', function() {
      pulseAnimation.style.animation = 'pulse 1s infinite';
    });

    badge.addEventListener('mouseleave', function() {
      pulseAnimation.style.animation = 'pulse 2s infinite';
    });
  }
});

// LinkedIn ripple click
const linkedinBadgeClick = document.querySelector('.linkedin-badge');
if (linkedinBadgeClick) {
  linkedinBadgeClick.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    const rect = this.getBoundingClientRect();
    const size = 100;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(0, 119, 181, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
    `;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(3);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Effet parallaxe
let ticking = false;
document.addEventListener('mousemove', (e) => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const cards = document.querySelectorAll('.project-card, .skill-category');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      cards.forEach(card => {
        const moveX = (x - 0.5) * 10;
        const moveY = (y - 0.5) * 10;
        card.style.transform = `perspective(1000px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
      });
      ticking = false;
    });
    ticking = true;
  }
});

// Animation d'entrée
function addFadeInAnimation() {
  const elements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-item');
  elements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    element.style.transitionDelay = `${index * 0.1}s`;

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  addFadeInAnimation();
  if (document.getElementById('competences')?.classList.contains('active')) {
    animateSkillBars();
  }
});

// Effet typing
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    typeWriter(heroTitle, 'Younes Fartmis', 150);
  }
});

// Scroll to hash
function scrollToHash() {
  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
window.addEventListener('load', scrollToHash);
window.addEventListener('hashchange', scrollToHash);


