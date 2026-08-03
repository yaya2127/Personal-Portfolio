/* ==========================================================================
   Yared Kinetibeb Tesfaye Portfolio - Main Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Navbar & Back-to-Top Button
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      if (backToTopBtn) backToTopBtn.style.opacity = '1';
    } else {
      if (backToTopBtn) backToTopBtn.style.opacity = '0';
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Active Navigation Link Indicator on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // 3. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // 4. Project Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 5. Project Detail Modals
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  const projectDetailsMap = {
    p1: {
      title: 'AASTU Academic Management Portal',
      category: 'Full-Stack Web Application',
      tags: ['JavaScript', 'Python', 'HTML/CSS', 'PostgreSQL'],
      description: 'A centralized web portal engineered for Addis Ababa Science and Technology University students and faculty to manage course registrations, grades, and campus notices.',
      features: [
        'Student course registration & grade tracking modules',
        'Backend data management with PostgreSQL databases',
        'Responsive client layout built with modern HTML5 & CSS3',
        'Clean modular code architecture and REST API services'
      ]
    },
    p2: {
      title: 'Agentic AI & Sensor Automation System',
      category: 'Embedded Systems & AI',
      tags: ['C++', 'Python', 'Agentic AI', 'Sensors'],
      description: 'An intelligent hardware-software system developed to process sensor data streams and deploy agentic artificial intelligence solutions for automated monitoring.',
      features: [
        'Real-time sensor data reading and anomaly detection',
        'Agentic AI decision workflows for automated control',
        'Optimized firmware built using C/C++ microcontrollers',
        'Circuit simulation and hardware validation'
      ]
    },
    p3: {
      title: 'Modern E-Commerce Storefront',
      category: 'Full-Stack Web Application',
      tags: ['JavaScript', 'HTML5/CSS3', 'REST API'],
      description: 'A responsive online storefront featuring dynamic product catalog browsing, persistent shopping cart management, user authentication, and checkout simulation.',
      features: [
        'Interactive product catalog with live filtering',
        'Shopping cart state management with LocalStorage',
        'Modular RESTful API integration for product listings',
        'Clean responsive dark mode UI layout'
      ]
    },
    p4: {
      title: 'Personal Developer Portfolio',
      category: 'Web Application',
      tags: ['HTML5', 'CSS3', 'ES6 JS', 'Canvas'],
      description: 'A custom luxury dark-themed developer portfolio created for Yared Kinetibeb Tesfaye. Features glassmorphism UI cards, gold accent gradients, background sparkle canvas animations, and responsive breakpoints.',
      features: [
        'Vanilla CSS implementation with zero framework overhead',
        'Gold particle canvas background animation',
        'SEO-optimized semantic HTML structure',
        'Smooth scroll navigation and modal views'
      ]
    },
    p5: {
      title: 'Microcontroller Controller System',
      category: 'Embedded Systems',
      tags: ['C', 'Microcontrollers', 'Circuit Design'],
      description: 'Hardware circuit and C firmware engineered for remote appliance control, timer interrupts, and low-level microcontroller system optimization.',
      features: [
        'Bare-metal C programming for microcontrollers',
        'Relay driver circuits and sensor interfacing',
        'Modular hardware schematic simulation'
      ]
    },
    p6: {
      title: 'Interactive Task Scheduler',
      category: 'Web Application',
      tags: ['JavaScript', 'LocalStorage', 'DOM API'],
      description: 'A sleek productivity web app enabling users to manage daily programming tasks, set countdown timers, organize priorities, and view completion metrics.',
      features: [
        'Priority queue sorting & status filters',
        'Persistent LocalStorage state saving',
        'Micro-animations and theme customization'
      ]
    }
  };

  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = btn.getAttribute('data-modal');
      const data = projectDetailsMap[modalKey];

      if (data) {
        modalBody.innerHTML = `
          <div class="modal-category" style="color:var(--gold-primary); font-size:0.8rem; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">${data.category}</div>
          <h2 style="font-size:1.8rem; margin-bottom:16px;">${data.title}</h2>
          <p style="color:var(--text-muted); line-height:1.7; margin-bottom:24px;">${data.description}</p>

          <h4 style="font-size:1rem; margin-bottom:12px; color:var(--text-main);">Key Features & Capabilities:</h4>
          <ul style="list-style:disc; margin-left:20px; color:var(--text-muted); line-height:1.8; margin-bottom:24px;">
            ${data.features.map(f => `<li>${f}</li>`).join('')}
          </ul>

          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">
            ${data.tags.map(t => `<span style="background:rgba(229,183,105,0.1); border:1px solid rgba(229,183,105,0.3); color:var(--gold-primary); padding:4px 12px; border-radius:4px; font-size:0.8rem; font-weight:500;">${t}</span>`).join('')}
          </div>

          <div style="display:flex; gap:16px; margin-top:24px;">
            <a href="https://github.com/yaya2127" target="_blank" rel="noopener" class="btn btn-primary" style="padding:10px 20px; font-size:0.9rem;">
              <i class="fab fa-github"></i> View GitHub Repo
            </a>
            <button class="btn btn-outline close-modal-btn" style="padding:10px 20px; font-size:0.9rem;">Close</button>
          </div>
        `;

        modalOverlay.classList.add('active');

        modalBody.querySelector('.close-modal-btn')?.addEventListener('click', closeModal);
      }
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // 6. Contact Form Submission Handler
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value;

      formStatus.className = 'form-status success';
      formStatus.innerHTML = `<i class="fas fa-check-circle"></i> Thank you, <strong>${name}</strong>! Your message has been sent successfully. Yared will respond to your email shortly.`;
      formStatus.style.display = 'block';

      contactForm.reset();

      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 6000);
    });
  }

});
