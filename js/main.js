/* ==========================================================================
   Yared Kinetibeb Tesfaye Portfolio - Main Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navbar Scroll Class & Active Link Highlighting
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy Active Link Tracking
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Mobile Drawer Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // 4. Modal Viewer for Detailed Project View
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');
  const viewDetailBtns = document.querySelectorAll('.view-details');

  const projectDetails = {
    p1: {
      title: "AASTU Academic Management Portal",
      category: "Full-Stack Web Application",
      github: "https://github.com/yaya2127/aastu-academic-portal",
      desc: "A centralized web portal engineered for Addis Ababa Science and Technology University students and faculty to manage course registrations, grades, and campus notices.",
      features: [
        "Student course registration & grade tracking modules",
        "Backend data management with PostgreSQL databases",
        "Responsive client layout built with modern HTML5 & CSS3",
        "Clean modular code architecture and REST API services"
      ],
      tech: ["JavaScript", "Python", "HTML/CSS", "PostgreSQL"]
    },
    p2: {
      title: "Smart IoT Environmental Monitor",
      category: "Arduino & Embedded Systems",
      github: "https://github.com/yaya2127/smart-iot-environmental-monitor",
      desc: "An IoT hardware-software system using microcontrollers to sense, process, and display real-time environmental metrics.",
      features: [
        "Temperature, humidity, and gas sensor calibration",
        "Proteus schematic simulation and PCB layout validation",
        "OLED display output and buzzer alert thresholds",
        "Bare-metal C/C++ firmware optimization"
      ],
      tech: ["Arduino", "Embedded C++", "Proteus", "Sensors"]
    },
    p3: {
      title: "Modern E-Commerce Storefront",
      category: "Full-Stack Web Application",
      github: "https://github.com/yaya2127/modern-ecommerce-storefront",
      desc: "A high-performance online shopping platform featuring real-time product search, interactive cart management, and user authentication.",
      features: [
        "Dynamic product catalog and category filters",
        "Shopping cart state persistence and checkout modal",
        "REST API integration for inventory management",
        "Responsive glassmorphism UI design"
      ],
      tech: ["JavaScript", "HTML/CSS", "REST API", "LocalStorage"]
    },
    p4: {
      title: "Personal Developer Portfolio",
      category: "Web Application",
      github: "https://github.com/yaya2127/Personal-Portfolio",
      desc: "A luxury dark-themed developer portfolio built for Yared Kinetibeb Tesfaye with gold particle background animations and glassmorphism UI.",
      features: [
        "HTML5 Canvas gold particle background system",
        "Frameless portrait hero layout and responsive navigation",
        "Filterable project showcase and verified credentials section",
        "Printable PDF & HTML resume downloads"
      ],
      tech: ["HTML5", "CSS3", "ES6 JS", "Canvas API"]
    },
    p5: {
      title: "Microcontroller Home Automation",
      category: "Arduino & Embedded Systems",
      github: "https://github.com/yaya2127/microcontroller-home-automation",
      desc: "A smart home control system enabling relay-based electrical appliance switching and power management via microcontrollers.",
      features: [
        "Multi-channel relay module optocoupler isolation",
        "Sensor-triggered automatic lighting and fan control",
        "Low-power sleep mode firmware logic",
        "Proteus circuit schematic and hardware verification"
      ],
      tech: ["Arduino", "Embedded C", "Proteus", "Relays"]
    },
    p6: {
      title: "Interactive Task Scheduler",
      category: "Web Application",
      github: "https://github.com/yaya2127/interactive-task-scheduler",
      desc: "A task management application featuring priority queues, deadline notifications, drag-and-drop ordering, and progress analytics.",
      features: [
        "Priority task tagging (High, Medium, Low)",
        "LocalStorage state caching across browser sessions",
        "Interactive completion progress bar",
        "Clean, minimalist dark interface"
      ],
      tech: ["JavaScript", "LocalStorage", "DOM API", "CSS3"]
    }
  };

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      const details = projectDetails[modalKey];

      if (details && modalBody) {
        modalBody.innerHTML = `
          <div class="modal-category">${details.category}</div>
          <h2 class="modal-title">${details.title}</h2>
          <p class="modal-desc">${details.desc}</p>

          <h4 style="color:#c99b42; margin-bottom:12px;">Key Features & Capabilities:</h4>
          <ul class="modal-features">
            ${details.features.map(f => `<li><i class="fas fa-check-circle" style="color:#c99b42; margin-right:8px;"></i> ${f}</li>`).join('')}
          </ul>

          <div class="modal-tech-stack" style="margin-top:20px; display:flex; gap:8px; flex-wrap:wrap;">
            ${details.tech.map(t => `<span class="skill-pill" style="font-size:0.8rem; padding:4px 12px;">${t}</span>`).join('')}
          </div>

          <div class="modal-actions" style="margin-top:28px; display:flex; gap:16px;">
            <a href="${details.github}" target="_blank" rel="noopener" class="btn btn-primary">
              <i class="fab fa-github"></i> View GitHub Repo
            </a>
            <button class="btn btn-outline" id="close-modal-btn">Close</button>
          </div>
        `;

        modalOverlay.classList.add('active');

        const innerCloseBtn = document.getElementById('close-modal-btn');
        if (innerCloseBtn) {
          innerCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
          });
        }
      }
    });
  });

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // 5. Contact Form Handler
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.className = 'form-status success';
      formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. Yared will respond shortly.';
      contactForm.reset();
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    });
  }

  // 6. Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
