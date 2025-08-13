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
      // Mise à jour du hash sans rechargement de la page
      window.location.hash = targetId;
      showSectionById(targetId);
    });
  });

  // Au chargement, afficher la section correspondant au hash (sinon première section)
  const initialHash = window.location.hash.substring(1);
  if (initialHash && document.getElementById(initialHash)) {
    showSectionById(initialHash);
  } else {
    // Si pas de hash valide, afficher la première section et activer premier lien
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

////////
   document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li a');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
    });
  });
});
//

   // Generate simple particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30; // Reduced count

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 8 + 10) + 's';
                
                particlesContainer.appendChild(particle);
            }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', createParticles);
// Gestion du formulaire de contact avec EmailJS integration
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded'); // Debug log

  const contactForm = document.getElementById('contactForm');
  console.log('Form found:', contactForm); // Debug log

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


// Effet parallaxe léger pour les cartes avec throttle pour meilleures performances
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


// Animation d'entrée pour les éléments
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

// Initialiser les animations
document.addEventListener('DOMContentLoaded', () => {
  addFadeInAnimation();

  // Animation initiale des compétences si la section est visible
  if (document.getElementById('competences')?.classList.contains('active')) {
    animateSkillBars();
  }
});


// Effet de typing pour le titre principal
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

// Lancer l'effet typing au chargement
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    typeWriter(heroTitle, 'Younes Fartmis', 150);
  }
});


 function scrollToHash() {
  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

window.addEventListener('load', scrollToHash);
window.addEventListener('hashchange', scrollToHash);











