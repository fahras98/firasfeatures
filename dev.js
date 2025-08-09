// Navigation
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);

        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));

        // Show the clicked section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.add('active');
        }

        // Update active link
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');

        // Optional: scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
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

        sections.forEach(section => {
            observer.observe(section);
        });

        // Gestion du formulaire de contact
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé ! ✓';
                submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(45deg, #d4af37, #b8941f)';
                    this.reset();
                }, 2000);
            }, 2000);
        });

        // Effet parallaxe léger pour les cartes
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.project-card, .skill-category');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            cards.forEach(card => {
                const moveX = (x - 0.5) * 10;
                const moveY = (y - 0.5) * 10;
                card.style.transform = `perspective(1000px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
            });
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
            if (document.getElementById('competences').classList.contains('active')) {
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
    