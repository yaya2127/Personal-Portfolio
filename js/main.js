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
    pnexus: {
      title: "NexusIoT — Distributed Industrial IoT Edge & Telemetry Platform",
      category: "Enterprise Distributed Systems / Cloud-IoT & Edge",
      desc: "An enterprise-grade, distributed Industrial IoT telemetry & edge monitoring platform. Built for high-frequency time-series metric ingestion, real-time anomaly detection, WebSocket live streaming, and interactive 2D/3D hardware Digital Twin visualization.",
      features: [
        "Go 1.22 high-throughput telemetry ingestion microservice & gRPC pipeline",
        "Real-time WebSocket streaming gateway pushing 1.5s metric ticks to browser dashboard",
        "HTML5 Canvas 2D/3D hardware Digital Twin turbine visualizer with thermal aura & rotor RPM",
        "Multi-sensor real-time oscilloscope line chart plotting vibration, temperature, and pressure",
        "C++/Go edge node simulator with remote fault injection API (overheat, bearing spike, gas leak)",
        "PostgreSQL 15 time-series schema & Redis hot telemetry Pub/Sub message broker",
        "Multi-container Docker Compose orchestration & Linux deployment"
      ],
      tech: ["Go (Golang)", "React 18", "TypeScript", "PostgreSQL", "Redis", "WebSockets", "Canvas API", "Docker", "FreeRTOS Simulator"],
      github: "https://github.com/yaya2127/nexus-iot-edge-platform"
    },
    p1: {
      title: "AASTU Academic Management Portal",
      category: "Go & React Microservice Backend",
      github: "https://github.com/yaya2127/aastu-academic-portal",
      desc: "A high-performance university student portal engineered with a Go (Golang 1.22) REST API backend, React 18 & TypeScript frontend, PostgreSQL schema, and Docker deployment.",
      features: [
        "Go (Golang 1.22) high-concurrency RESTful API endpoints",
        "React 18 + TypeScript interactive student dashboard & GPA calculator",
        "PostgreSQL relational database models & GORM ORM integration",
        "Multi-stage Dockerfile & docker-compose container deployment"
      ],
      tech: ["Go (Golang)", "React", "TypeScript", "PostgreSQL", "Docker"]
    },
    p2: {
      title: "Smart IoT Environmental Monitor",
      category: "C++ Firmware & Industrial Telemetry",
      github: "https://github.com/yaya2127/smart-iot-environmental-monitor",
      desc: "An industrial environmental sensing system powered by ATmega328P C++ firmware, SVG circular metric gauges, and real-time Canvas telemetry stream charts.",
      features: [
        "High-precision DHT22 temperature & MQ-2 methane gas sampling",
        "Real-Time SVG circular metric gauges & historical Canvas stream line graph",
        "Interactive Methane Hazard simulation alert toggle & active buzzer",
        "Proteus schematic circuit diagram & hardware wiring design"
      ],
      tech: ["C++", "Embedded C", "FreeRTOS", "Proteus", "SVG Telemetry"]
    },
    p3: {
      title: "Modern E-Commerce Storefront",
      category: "NestJS & Cyberpunk Storefront",
      github: "https://github.com/yaya2127/modern-ecommerce-storefront",
      desc: "A developer hardware marketplace featuring live product search, price range limit sliders ($10-$150), promo code discounts (TECH10), and quick-view modals.",
      features: [
        "Live instant search with auto-highlight filtering",
        "Price Range slider filter and stock status toggle",
        "Cyber Promo Code engine (TECH10 for 10% OFF discount)",
        "Slide-out Cyber Cart Drawer with tax, subtotal, and total calculations"
      ],
      tech: ["NestJS", "TypeScript", "Prisma", "Cyberpunk UI"]
    },
    p4: {
      title: "Personal Developer Portfolio",
      category: "Luxury UI Application",
      github: "https://github.com/yaya2127/Personal-Portfolio",
      desc: "A luxury dark-themed developer portfolio built for Yared Kinetibeb Tesfaye with gold particle background animations and glassmorphism UI.",
      features: [
        "HTML5 Canvas gold particle background system",
        "Frameless portrait hero layout and responsive navigation",
        "Filterable project showcase and verified credentials section",
        "Printable PDF & HTML resume downloads"
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Canvas API"]
    },
    p5: {
      title: "Microcontroller Home Automation",
      category: "Bare-Metal Embedded C System",
      github: "https://github.com/yaya2127/microcontroller-home-automation",
      desc: "Bare-metal Embedded C hardware automation system utilizing optocoupler relay isolation, ADC LDR night lighting, and INT0 PIR motion interrupt routines.",
      features: [
        "4-channel PC817 optocoupler relay hardware switching (PORTB)",
        "LDR analog-to-digital converter (ADC) ambient night light sampling",
        "INT0 hardware external interrupt routine for PIR motion detection",
        "Proteus 8 Professional circuit schematic validation"
      ],
      tech: ["Bare-Metal C", "AVR-GCC", "ATmega328P", "Proteus"]
    },
    p6: {
      title: "Interactive Task Scheduler",
      category: "Electric Violet Kanban Scheduler",
      github: "https://github.com/yaya2127/interactive-task-scheduler",
      desc: "TaskMaster Pro productivity Kanban web application featuring 4 status columns (To Do, In Progress, Review, Completed), priority queueing, and progress meters.",
      features: [
        "4-Column Kanban task board with interactive column mover",
        "Priority tagging (High, Medium, Low) and LocalStorage state caching",
        "Real-time completion percentage progress bar & analytics",
        "Sleek Electric Violet visual theme with responsive grid layout"
      ],
      tech: ["TypeScript", "React", "Kanban Board", "LocalStorage"]
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

  // 5. Contact Form Handler (Real Email Delivery to kinetibebyared@gmail.com)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

      formStatus.className = 'form-status loading';
      formStatus.style.display = 'block';
      formStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending your message to Yared...';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      const formData = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        _subject: document.getElementById('form-subject').value || "New Portfolio Inquiry from " + document.getElementById('form-name').value,
        message: document.getElementById('form-message').value
      };

      fetch('https://formsubmit.co/ajax/kinetibebyared@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent directly to kinetibebyared@gmail.com. Yared will respond shortly!';
        contactForm.reset();
      })
      .catch(error => {
        formStatus.className = 'form-status error';
        formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Could not send automatically. Please email directly to <a href="mailto:kinetibebyared@gmail.com" style="color:#ffffff; text-decoration:underline;">kinetibebyared@gmail.com</a>';
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
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
