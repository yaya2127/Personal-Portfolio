/* ==========================================================================
   Yared Kinetibeb Tesfaye Portfolio - Main Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navbar Scroll Class & Active Link Highlighting
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // ScrollSpy Active Link Tracking
    let current = '';
    if (sections && sections.length) {
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
    }

    if (navLinks && navLinks.length) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
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

  // 3. Project Filter Tabs & Animated Sliding Indicator Pill
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const tabSlider = document.getElementById('filter-tab-slider');

  function updateTabSlider(activeBtn) {
    if (!tabSlider || !activeBtn) return;
    const left = activeBtn.offsetLeft;
    const top = activeBtn.offsetTop;
    const width = activeBtn.offsetWidth;
    const height = activeBtn.offsetHeight;

    tabSlider.style.transform = `translate(${left}px, ${top}px)`;
    tabSlider.style.width = `${width}px`;
    tabSlider.style.height = `${height}px`;

    const container = activeBtn.parentElement;
    if (container && container.scrollWidth > container.clientWidth) {
      const scrollLeft = activeBtn.offsetLeft - (container.clientWidth / 2) + (activeBtn.offsetWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }

  const defaultActiveBtn = document.querySelector('.filter-btn.active');
  if (defaultActiveBtn) {
    setTimeout(() => updateTabSlider(defaultActiveBtn), 100);
  }

  window.addEventListener('resize', () => {
    const currentActiveBtn = document.querySelector('.filter-btn.active');
    if (currentActiveBtn) updateTabSlider(currentActiveBtn);
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateTabSlider(btn);

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
    pkube: {
      title: "KUBE-Sentinel — Autonomous Kubernetes Mesh & Chaos Resilience Engine",
      category: "Cloud-Native Infrastructure & Chaos Engineering",
      desc: "An enterprise-grade Kubernetes microservice mesh resilience platform engineered with interactive 60 FPS cluster DAG topology canvas, real-time eBPF packet span tracing, automated Chaos Monkey fault injection (pod kill switch, latency spikes, packet loss), and self-healing watchdog.",
      features: [
        "Interactive 60 FPS HTML5 Canvas Kubernetes microservice DAG topology graph",
        "eBPF real-time packet span tracing logging HTTP/gRPC status codes & microsecond delays",
        "Chaos Monkey Experiments: Pod Kill Switch, Latency Injection (+180ms), Packet Loss (30%), CPU Stress (99%)",
        "Automated Kubernetes Self-Healing Watchdog rescheduling crashed pods in < 4 seconds",
        "1-Click Printable K8s Resilience Compliance Audit Exporter (.txt / PDF summary)",
        "Go 1.22 Client-Go microservices & Monospaced Datadog/Grafana Slate Dark Theme"
      ],
      tech: ["Go (Golang)", "Kubernetes v1.30", "eBPF Tracing", "Istio Mesh", "Chaos Engineering", "HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/yaya2127/kube-sentinel-platform",
      live: "https://yaya2127.github.io/kube-sentinel-platform/"
    },
    psynapse: {
      title: "SYNAPSE-Med — Real-Time Emergency ICU Vital Telemetry & Alarm Dispatch Console",
      category: "Medical-Grade Systems / Real-Time ICU Telemetry",
      desc: "An institutional medical telemetry platform engineered for continuous 24/7 ICU patient vital monitoring (12-Lead ECG), automated NEWS2 clinical sepsis & cardiac arrest early warning scoring, 8-bed ICU ward matrix, and emergency telemetry ambulance dispatching.",
      features: [
        "High-frequency 60 FPS HTML5 Canvas 12-Lead ECG waveform oscilloscope canvas",
        "Clinical NEWS2 (National Early Warning Score) sepsis & cardiac risk evaluation engine",
        "8-Bed ICU Ward Allocation Matrix with 1-click bed switching & live vital feeds",
        "Multi-parameter vital monitor (HR BPM, SpO2 %, Blood Pressure NIBP, Resp Rate, Temp °C)",
        "Emergency Mobile ICU Ambulance Telemetry Fleet Dispatcher with real-time ETA tracking",
        "1-Click Printable ICU EMR Telemetry Audit & Sign-off Exporter (.txt / PDF summary)",
        "Go 1.22 REST microservices & Clinical Dark Slate Obsidian Enterprise Interface"
      ],
      tech: ["Go (Golang)", "Python 3.11", "12-Lead ECG Canvas", "NEWS2 Risk Engine", "Clinical Dark Slate UI", "HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/yaya2127/synapse-med-platform",
      live: "https://yaya2127.github.io/synapse-med-platform/"
    },
    pnexus: {
      title: "NexusIoT — Distributed Industrial IoT Edge & Telemetry Platform",
      category: "Enterprise Software Engineering / Cloud-IoT & Edge",
      desc: "An enterprise-grade, distributed Industrial IoT telemetry & edge monitoring platform. Built for high-frequency time-series metric ingestion, real-time anomaly detection, WebSocket live streaming, and interactive 2D/3D hardware Digital Twin visualization.",
      features: [
        "Go 1.22 high-throughput telemetry ingestion microservice & gRPC pipeline",
        "Real-time WebSocket streaming gateway pushing 1.5s metric ticks to browser dashboard",
        "HTML5 Canvas 2D/3D hardware Digital Twin turbine visualizer with thermal aura & rotor RPM",
        "Multi-sensor real-time oscilloscope line chart plotting vibration, temperature, and pressure",
        "C++/Go edge node simulator with remote fault injection API (overheat, bearing spike, gas leak)",
        "PostgreSQL 15 time-series schema & Redis hot telemetry Pub/Sub message broker",
        "1-Click Industrial CSV Telemetry Audit Exporter for facility safety reporting",
        "Multi-container Docker Compose orchestration & Linux deployment"
      ],
      tech: ["Go (Golang)", "React 18", "TypeScript", "PostgreSQL", "Redis", "WebSockets", "Canvas API", "Docker", "FreeRTOS Simulator"],
      github: "https://github.com/yaya2127/nexus-iot-edge-platform",
      live: "https://yaya2127.github.io/nexus-iot-edge-platform/"
    },
    psentinel: {
      title: "SentinelAI — Autonomous Agentic AI Code Security Auditor",
      category: "Agentic AI & DevSecOps / Code Vulnerability Analysis",
      desc: "An enterprise-grade, autonomous Agentic AI code security and vulnerability auditor. Scans codebases using Abstract Syntax Tree (AST) static analysis, detects security flaws (SQL Injection, Secrets, XSS, Path Traversal, Buffer Overflows, Goroutine Panics), synthesizes 1-click Git diff patches, and auto-generates unit tests.",
      features: [
        "Abstract Syntax Tree (AST) static analysis security parser (CWE-89, CWE-798, CWE-79, CWE-22, CWE-120, CWE-391)",
        "Autonomous Agentic AI Reasoner calculating repository risk scores (0-100) and severity ratings",
        "Unified Git diff patch synthesizer outputting standard unified diffs for 1-click code remediation",
        "Automated Pytest security unit test generator verifying vulnerability fixes",
        "Interactive AST Security Code Playground for testing custom user snippets live",
        "1-Click Security Compliance Audit Report exporter (JSON/PDF)",
        "Cyber Violet React 18 + TypeScript Security Dashboard with live AST audit log stream",
        "PostgreSQL 15 vulnerability audit store & Docker container sandbox"
      ],
      tech: ["Python", "Agentic AI", "AST Parser", "React 18", "TypeScript", "PostgreSQL", "Git Diffs", "Pytest", "Docker"],
      github: "https://github.com/yaya2127/sentinel-ai-code-auditor",
      live: "https://yaya2127.github.io/sentinel-ai-code-auditor/"
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
      title: "FinPulse Engine — High-Frequency Trading & Risk Engine",
      category: "Quantitative Financial Systems / HFT & Derivatives",
      github: "https://github.com/yaya2127/finpulse-trading-engine",
      live: "https://yaya2127.github.io/finpulse-trading-engine/",
      desc: "An institutional-grade quantitative trading platform, VWAP/TWAP algorithmic execution suite, sub-microsecond L2 order book matching engine, and real-time portfolio risk analytics system.",
      features: [
        "Sub-microsecond atomic single-producer single-consumer lock-free ring buffer order queue",
        "Price-time priority L2 order book matching engine supporting LIMIT, MARKET, and IOC execution",
        "VWAP (Volume-Weighted) and TWAP (Time-Weighted) institutional algorithmic execution slicers",
        "Black-Scholes Options Greeks (Delta, Gamma, Vega, Theta) and 95% Monte Carlo VaR simulator",
        "Interactive TradingView Pro multi-asset class terminal (BTC/USDT, ETH/USDT, NVDA, AAPL, EUR/USD)",
        "HTML5 Canvas OHLCV Candlestick charting with 20 EMA, 50 SMA, and MACD (12, 26, 9) Oscillator",
        "1-Click Portfolio Risk & Trade Compliance CSV Audit Report exporter"
      ],
      tech: ["Go (Golang)", "Python", "React 18", "TradingView UI", "Black-Scholes", "Monte Carlo VaR", "Canvas API"]
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
      category: "Bare-Metal C Firmware",
      github: "https://github.com/yaya2127/microcontroller-home-automation",
      desc: "Bare-metal C hardware control system with optocoupler relay isolation, ADC LDR night sensing, and INT0 PIR motion interrupt routines.",
      features: [
        "AVR-GCC bare-metal C compilation target for ATmega328P",
        "Hardware INT0 interrupt handler for sub-millisecond motion response",
        "Optocoupler isolated relay control circuit for 220V AC load switching"
      ],
      tech: ["Bare-Metal C", "AVR-GCC", "ATmega328P", "Proteus"]
    },
    p6: {
      title: "Interactive Task Scheduler",
      category: "Electric Violet Kanban App",
      github: "https://github.com/yaya2127/interactive-task-scheduler",
      desc: "TaskMaster Pro Kanban web app built with React, TypeScript, 4-column task status mover, LocalStorage state persistence, and progress gauge.",
      features: [
        "4-Column Kanban workflow (Backlog, In Progress, Review, Completed)",
        "Task creation, priority tagging (Low, Medium, High), and status moving",
        "LocalStorage state sync maintaining state across browser sessions"
      ],
      tech: ["TypeScript", "React", "Kanban Board", "LocalStorage"]
    }
  };

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-modal');
      const data = projectDetails[key];
      if (!data) return;

      let html = `
        <div class="modal-header-badge">${data.category}</div>
        <h2 class="modal-title">${data.title}</h2>
        <p class="modal-desc">${data.desc}</p>
        
        <div class="modal-section">
          <h3>Key Technical Highlights</h3>
          <ul class="modal-features">
            ${data.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
          </ul>
        </div>
        
        <div class="modal-section">
          <h3>Tech Stack & Tools</h3>
          <div class="modal-tech-tags">
            ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div class="modal-actions" style="margin-top: 24px; display: flex; gap: 14px; flex-wrap: wrap;">
          ${data.live ? `<a href="${data.live}" target="_blank" rel="noopener" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Launch Live Application</a>` : ''}
          <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-outline"><i class="fab fa-github"></i> GitHub Repository</a>
        </div>
      `;

      modalBody.innerHTML = html;
      modalOverlay.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // 5.5 Scroll Reveals, Stagger Indices, and Number Count-Up Animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const staggerParents = document.querySelectorAll('.stagger-parent');

  staggerParents.forEach(parent => {
    Array.from(parent.children).forEach((child, idx) => {
      child.style.setProperty('--stagger-idx', idx);
    });
  });

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => scrollObserver.observe(el));
  staggerParents.forEach(el => scrollObserver.observe(el));

  // Count-Up Numbers for About Section
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach(el => {
      const rawText = el.textContent.trim();
      const targetVal = parseInt(rawText, 10);
      const suffix = rawText.replace(/[0-9]/g, '');
      if (isNaN(targetVal)) return;

      const duration = 1600;
      const startTime = performance.now();

      function updateCount(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(ease * targetVal);
        el.textContent = `${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = rawText;
        }
      }
      requestAnimationFrame(updateCount);
    });
  }

  const aboutStatsSection = document.querySelector('.stats-grid');
  if (aboutStatsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(aboutStatsSection);
  }

  // 6. Comprehensive AI Portfolio Assistant Chatbot Engine
  const botTrigger = document.getElementById('ai-bot-trigger');
  const botChatbox = document.getElementById('ai-bot-chatbox');
  const botClose = document.getElementById('chatbox-close');
  const chatMessages = document.getElementById('chatbox-messages');
  const chatInput = document.getElementById('chatbox-input');
  const chatSendBtn = document.getElementById('chatbox-send-btn');
  const suggestionPills = document.querySelectorAll('.suggestion-pill');

  if (botTrigger && botChatbox) {
    botTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = botChatbox.style.display === 'flex' || botChatbox.classList.contains('open');
      if (isVisible) {
        botChatbox.style.display = 'none';
        botChatbox.style.opacity = '0';
        botChatbox.style.pointerEvents = 'none';
        botChatbox.classList.remove('open');
      } else {
        botChatbox.style.display = 'flex';
        botChatbox.style.opacity = '1';
        botChatbox.style.pointerEvents = 'all';
        botChatbox.classList.add('open');
      }
    });

    if (botClose) {
      botClose.addEventListener('click', (e) => {
        e.stopPropagation();
        botChatbox.style.display = 'none';
        botChatbox.style.opacity = '0';
        botChatbox.style.pointerEvents = 'none';
        botChatbox.classList.remove('open');
      });
    }

    const handleSendMessage = (text) => {
      const query = text || (chatInput ? chatInput.value.trim() : '');
      if (!query) return;

      const userDiv = document.createElement('div');
      userDiv.className = 'user-msg';
      userDiv.textContent = query;
      chatMessages.appendChild(userDiv);
      if (chatInput) chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-msg';
        const q = query.toLowerCase();

        // 1. Strengths Query (matches "strength", "strengths", "strong", "superpower", "good at")
        if (q.includes('strength') || q.includes('strong') || q.includes('superpower') || q.includes('good at')) {
          botDiv.innerHTML = "💪 <strong>Yared's Key Strengths</strong>:<br/>• <strong>Low-Latency Systems Architecture</strong>: Deep mastery of Go (Golang 1.22) microservices, atomic SPSC lock-free ring buffers, and sub-microsecond HFT matching engines.<br/>• <strong>Academic Excellence</strong>: 5th-Year Computer Engineering Senior at AASTU with an outstanding <strong>3.78 / 4.00 Cumulative GPA</strong>.<br/>• <strong>DevSecOps & Code Security</strong>: Developer of SentinelAI static AST auditor detecting OWASP Top 10 vulnerabilities.<br/>• <strong>Full-Stack & Embedded Depth</strong>: Seamless transition from ATmega328P C firmware to React 18, Next.js, and Three.js 3D WebGL.";
        }
        // 2. Weaknesses / Growth Query (matches "weakness", "weekness", "weak", "improvement", "grow")
        else if (q.includes('weak') || q.includes('week') || q.includes('improve') || q.includes('grow')) {
          botDiv.innerHTML = "🌱 <strong>Yared's Growth Mindset & Focus Areas</strong>:<br/>• <strong>Hyper-Optimization Focus</strong>: Tends to spend extra time micro-benchmarking low-level memory allocations; manages this by setting strict sprint deliverables.<br/>• <strong>Expanding Cloud Orchestration</strong>: Highly proficient in Docker & Redis; currently expanding hands-on Kubernetes (CKAD) orchestration labs.";
        }
        // 3. Projects Query (matches "project", "projects", "his projects", "what are his projects", etc.)
        else if (q.includes('project') || q.includes('built') || q.includes('made') || q.includes('work')) {
          if (q.includes('kube') || q.includes('kubernetes') || q.includes('chaos') || q.includes('mesh')) {
            botDiv.innerHTML = "🛡️ <strong>KUBE-Sentinel Platform</strong>: Autonomous Kubernetes microservice mesh resilience engine with 60 FPS DAG topology canvas, eBPF packet span tracing, Chaos Monkey fault injection (pod kill switch, latency spikes), and self-healing watchdog!<br/><br/><a href='https://yaya2127.github.io/kube-sentinel-platform/' target='_blank' style='color:#60a5fa; font-weight:700;'>🌐 Launch Live App</a> &nbsp;|&nbsp; <a href='https://github.com/yaya2127/kube-sentinel-platform' target='_blank' style='color:#dfa951;'>💻 GitHub Code</a>";
          } else if (q.includes('synapse') || q.includes('med') || q.includes('icu') || q.includes('ecg')) {
            botDiv.innerHTML = "🏥 <strong>SYNAPSE-Med Platform</strong>: Real-time emergency ICU telemetry console featuring a 12-Lead ECG waveform oscilloscope canvas, automated NEWS2 clinical risk evaluation, 8-bed ICU ward matrix, and ambulance telemetry dispatcher!<br/><br/><a href='https://yaya2127.github.io/synapse-med-platform/' target='_blank' style='color:#60a5fa; font-weight:700;'>🌐 Launch Live App</a> &nbsp;|&nbsp; <a href='https://github.com/yaya2127/synapse-med-platform' target='_blank' style='color:#dfa951;'>💻 GitHub Code</a>";
          } else if (q.includes('finpulse') || q.includes('hft') || q.includes('trading')) {
            botDiv.innerHTML = "📈 <strong>FinPulse Engine</strong>: Institutional-grade quantitative trading platform built in <strong>Go 1.22 & Python 3.11</strong>. Features atomic lock-free SPSC ring buffer, L2 matching engine, VWAP/TWAP order slicer, Black-Scholes Options Greeks (Δ, Γ, V, Θ), and 95% Monte Carlo VaR!<br/><br/><a href='https://yaya2127.github.io/finpulse-trading-engine/' target='_blank' style='color:#60a5fa; font-weight:700;'>🌐 Launch Live App</a> &nbsp;|&nbsp; <a href='https://github.com/yaya2127/finpulse-trading-engine' target='_blank' style='color:#dfa951;'>💻 GitHub Code</a>";
          } else if (q.includes('nexus') || q.includes('iot') || q.includes('scada')) {
            botDiv.innerHTML = "⚡ <strong>NexusIoT Edge</strong>: Distributed Industrial IoT platform with <strong>Go 1.22</strong> telemetry microservices handling 100,000+ msgs/sec, Redis Pub/Sub, WebSockets, 3D WebGL Three.js Digital Twin turbine, and Web Audio siren warning annunciator!<br/><br/><a href='https://yaya2127.github.io/nexus-iot-edge-platform/' target='_blank' style='color:#60a5fa; font-weight:700;'>🌐 Launch Live App</a> &nbsp;|&nbsp; <a href='https://github.com/yaya2127/nexus-iot-edge-platform' target='_blank' style='color:#dfa951;'>💻 GitHub Code</a>";
          } else if (q.includes('sentinel') || q.includes('security') || q.includes('ast')) {
            botDiv.innerHTML = "🛡️ <strong>SentinelAI Auditor</strong>: Autonomous Agentic AI code security auditor built with Python AST static parser detecting SQLi, Secrets, Buffer Overflows & Go Panics. Features 6-axis OWASP radar chart, 1-click Git diff patch synthesizer, and printable ISO 27001 audit certificate exporter!<br/><br/><a href='https://yaya2127.github.io/sentinel-ai-code-auditor/' target='_blank' style='color:#60a5fa; font-weight:700;'>🌐 Launch Live App</a> &nbsp;|&nbsp; <a href='https://github.com/yaya2127/sentinel-ai-code-auditor' target='_blank' style='color:#dfa951;'>💻 GitHub Code</a>";
          } else {
            botDiv.innerHTML = "🚀 <strong>Yared's 11 Completed Projects</strong>:<br/>1. 🛡️ <strong>KUBE-Sentinel Engine</strong> (Kubernetes Chaos Mesh)<br/>2. 🏥 <strong>SYNAPSE-Med Platform</strong> (ICU Vital Telemetry & NEWS2)<br/>3. 📈 <strong>FinPulse Engine</strong> (HFT & Risk Engine)<br/>4. ⚡ <strong>NexusIoT Edge</strong> (Industrial IoT Platform)<br/>5. 🛡️ <strong>SentinelAI Auditor</strong> (Agentic AI Security Auditor)<br/>6. 🎓 <strong>AASTU Academic Portal</strong> (Go Backend)<br/>7. 🔬 <strong>Smart IoT Environmental Monitor</strong> (C++ Firmware)<br/>8. 🛒 <strong>Modern E-Commerce Storefront</strong> (NestJS & Prisma)<br/>9. 💼 <strong>Personal Developer Portfolio</strong> (Luxury Dark UI)<br/>10. 🏠 <strong>Microcontroller Home Automation</strong> (Bare-Metal C)<br/>11. 📋 <strong>Interactive Task Scheduler</strong> (React Kanban)<br/><br/>Ask me about any specific project or view them in the portfolio grid above!";
          }
        }
        // 4. Skills / Stack / Tech Query (matches "skil", "skils", "skill", "skills", "tech", "stack", "go", "python", "react", etc.)
        else if (q.includes('skil') || q.includes('stack') || q.includes('tech') || q.includes('capability') || q.includes('know') || q.includes('language') || q.includes('framework')) {
          botDiv.innerHTML = "💻 <strong>Yared's Technical Capabilities & Stack</strong>:<br/>• <strong>Languages</strong>: Go (Golang 1.22), Python 3.11, C/C++, TypeScript, JavaScript, SQL, Embedded C, Dart<br/>• <strong>Backend & Cloud</strong>: REST APIs, WebSockets, Redis, Docker, PostgreSQL 15, gRPC, NestJS<br/>• <strong>Frontend & Mobile</strong>: React 18, Next.js, Three.js 3D WebGL, Flutter, TradingView UI, Tailwind CSS<br/>• <strong>DevSecOps & Embedded</strong>: AST Compiler Parsers, OWASP Top 10, ATmega328P, FreeRTOS, Proteus";
        }
        // 5. FinPulse Direct
        else if (q.includes('finpulse') || q.includes('hft') || q.includes('black-scholes') || q.includes('var') || q.includes('matching engine')) {
          botDiv.innerHTML = "📈 <strong>FinPulse Engine</strong>: Institutional-grade quantitative trading platform built in <strong>Go 1.22 & Python 3.11</strong>. Features atomic lock-free SPSC ring buffer, L2 matching engine, VWAP/TWAP order slicer, Black-Scholes Options Greeks (Δ, Γ, V, Θ), and 95% Monte Carlo VaR!<br/><br/><a href='https://yaya2127.github.io/finpulse-trading-engine/' target='_blank' style='color:#60a5fa; font-weight:700;'>🌐 Launch Live App</a> &nbsp;|&nbsp; <a href='https://github.com/yaya2127/finpulse-trading-engine' target='_blank' style='color:#dfa951;'>💻 GitHub Code</a>";
        }
        // 6. NexusIoT Direct
        else if (q.includes('nexus') || q.includes('scada') || q.includes('turbine') || q.includes('3d') || q.includes('digital twin')) {
          botDiv.innerHTML = "⚡ <strong>NexusIoT Edge</strong>: Distributed Industrial IoT platform with <strong>Go 1.22</strong> telemetry microservices handling 100,000+ msgs/sec, Redis Pub/Sub, WebSockets, 3D WebGL Three.js Digital Twin turbine, and Web Audio siren warning annunciator!<br/><br/><a href='https://yaya2127.github.io/nexus-iot-edge-platform/' target='_blank' style='color:#60a5fa; font-weight:700;'>🌐 Launch Live App</a> &nbsp;|&nbsp; <a href='https://github.com/yaya2127/nexus-iot-edge-platform' target='_blank' style='color:#dfa951;'>💻 GitHub Code</a>";
        }
        // 7. SentinelAI Direct
        else if (q.includes('sentinel') || q.includes('owasp') || q.includes('vulnerability') || q.includes('diff')) {
          botDiv.innerHTML = "🛡️ <strong>SentinelAI Auditor</strong>: Autonomous Agentic AI code security auditor built with Python AST static parser detecting SQLi, Secrets, Buffer Overflows & Go Panics. Features 6-axis OWASP radar chart, 1-click Git diff patch synthesizer, and printable ISO 27001 audit certificate exporter!<br/><br/><a href='https://yaya2127.github.io/sentinel-ai-code-auditor/' target='_blank' style='color:#60a5fa; font-weight:700;'>🌐 Launch Live App</a> &nbsp;|&nbsp; <a href='https://github.com/yaya2127/sentinel-ai-code-auditor' target='_blank' style='color:#dfa951;'>💻 GitHub Code</a>";
        }
        // 8. Education / AASTU / GPA
        else if (q.includes('education') || q.includes('aastu') || q.includes('degree') || q.includes('gpa') || q.includes('university') || q.includes('study') || q.includes('school')) {
          botDiv.innerHTML = "🎓 Yared is a <strong>5th-Year Computer Engineering Senior</strong> at <strong>Addis Ababa Science and Technology University (AASTU)</strong> in Addis Ababa, Ethiopia, with an outstanding Cumulative GPA of <strong>3.78 / 4.00</strong>.<br/><br/>Core Coursework: Operating Systems, Software Engineering, Computer Architecture, Embedded C/FreeRTOS, Data Structures & Algorithms, Software Engineering.";
        }
        // 9. Certifications
        else if (q.includes('cert') || q.includes('simplilearn') || q.includes('udacity') || q.includes('freecodecamp')) {
          botDiv.innerHTML = "🏆 Yared holds 3 verified industry credentials:<br/>1. <strong>Simplilearn Generative AI Literacy</strong> (LLMs & Prompt Engineering)<br/>2. <strong>Udacity Full-Stack Web Developer Nanodegree</strong> (Cloud APIs & PostgreSQL)<br/>3. <strong>FreeCodeCamp Responsive Web Design</strong>";
        }
        // 10. CV / Resume / Download
        else if (q.includes('cv') || q.includes('resume') || q.includes('download') || q.includes('pdf')) {
          botDiv.innerHTML = "📄 You can download Yared's official 2026 PDF Resume here: <a href='assets/docs/Yared_Kinetibeb_CV.pdf' download style='color:#dfa951; font-weight:700;'>Download CV (PDF) 📥</a>";
        }
        // 11. Contact / Email
        else if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('github') || q.includes('reach') || q.includes('mail')) {
          botDiv.innerHTML = "📫 Connect with Yared:<br/>• <strong>Email</strong>: <a href='mailto:kinetibebyared@gmail.com' style='color:#dfa951;'>kinetibebyared@gmail.com</a><br/>• <strong>LinkedIn</strong>: <a href='https://www.linkedin.com/in/yared-kinetibeb-704077301/' target='_blank' style='color:#60a5fa;'>linkedin.com/in/yared-kinetibeb-704077301</a><br/>• <strong>GitHub</strong>: <a href='https://github.com/yaya2127' target='_blank' style='color:#60a5fa;'>github.com/yaya2127</a>";
        }
        // 12. Hiring / Jobs / Roles
        else if (q.includes('hire') || q.includes('job') || q.includes('role') || q.includes('available') || q.includes('intern')) {
          botDiv.innerHTML = "💼 Yared is actively open for Full-Stack, Go Microservice, Systems Architecture, and DevSecOps engineering roles! Reach out directly via <a href='mailto:kinetibebyared@gmail.com' style='color:#dfa951; font-weight:700;'>kinetibebyared@gmail.com</a>.";
        }
        // 13. Whole Word Greetings ONLY (\bhi\b, \bhello\b, \bhey\b, \bgreetings\b)
        else if (/\b(hi|hello|hey|greetings|yo|sup)\b/i.test(q)) {
          botDiv.innerHTML = "👋 Hello! How can I assist you today? Feel free to ask about Yared's projects, AASTU degree, tech stack, or hiring availability!";
        }
        // 14. Fallback
        else {
          botDiv.innerHTML = "🤖 Yared Kinetibeb Tesfaye is a 5th-Year Senior Computer Engineering Student at AASTU (GPA 3.78) specializing in Go microservices, HFT trading engines, AST code security auditors, and bare-metal embedded C firmware.<br/><br/>You can ask me about his <strong>Strengths</strong>, <strong>Weaknesses</strong>, <strong>Projects</strong>, or <strong>CV</strong>!";
        }

        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 300);
    };

    if (chatSendBtn) chatSendBtn.addEventListener('click', () => handleSendMessage());
    if (chatInput) chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSendMessage(); });
    suggestionPills.forEach(pill => pill.addEventListener('click', () => handleSendMessage(pill.getAttribute('data-query'))));
  }

  // 7. Interactive CLI Terminal Drawer Engine with Direct Element Toggling
  const termToggleBtn = document.getElementById('terminal-toggle-btn');
  const termDrawer = document.getElementById('terminal-drawer');
  const termCloseBtn = document.getElementById('terminal-close-btn');
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output');

  if (termDrawer) {
    const toggleTerminal = (e) => {
      if (e) e.stopPropagation();
      const isVisible = termDrawer.style.display === 'flex' || termDrawer.classList.contains('open');
      if (isVisible) {
        termDrawer.style.display = 'none';
        termDrawer.style.opacity = '0';
        termDrawer.style.pointerEvents = 'none';
        termDrawer.classList.remove('open');
      } else {
        termDrawer.style.display = 'flex';
        termDrawer.style.opacity = '1';
        termDrawer.style.pointerEvents = 'all';
        termDrawer.classList.add('open');
        if (termInput) termInput.focus();
      }
    };

    if (termToggleBtn) termToggleBtn.addEventListener('click', toggleTerminal);
    if (termCloseBtn) termCloseBtn.addEventListener('click', toggleTerminal);

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        toggleTerminal(e);
      }
    });

    if (termInput) {
      termInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const cmd = termInput.value.trim().toLowerCase();
          termInput.value = '';

          const printLine = (text, color = '#10b981') => {
            const div = document.createElement('div');
            div.className = 'term-line';
            div.style.color = color;
            div.innerHTML = text;
            termOutput.appendChild(div);
          };

          printLine(`yared@aastu:~$ ${cmd}`, '#dfa951');

          if (cmd === 'help') {
            printLine("Available CLI Manual Commands:");
            printLine("  <span class='cmd-highlight'>help</span>       - Display available CLI manual");
            printLine("  <span class='cmd-highlight'>projects</span>   - List all 9 completed engineering projects with active links");
            printLine("  <span class='cmd-highlight'>skills</span>     - Output technical stack breakdown & frameworks");
            printLine("  <span class='cmd-highlight'>education</span>  - Output AASTU degree & GPA credentials");
            printLine("  <span class='cmd-highlight'>certs</span>      - List verified professional certifications");
            printLine("  <span class='cmd-highlight'>whoami</span>     - View senior developer profile summary");
            printLine("  <span class='cmd-highlight'>cv</span>         - Trigger official 2026 PDF resume download");
            printLine("  <span class='cmd-highlight'>contact</span>    - Show direct email, LinkedIn & GitHub links");
            printLine("  <span class='cmd-highlight'>clear</span>      - Clear terminal screen");
            printLine("  <span class='cmd-highlight'>sudo hire-yared</span> - Execute instant hiring protocol!");
          } else if (cmd === 'projects') {
            printLine("==========================================================================", '#60a5fa');
            printLine("⚡ YARED'S FEATURED ENTERPRISE PLATFORMS & REPOSITORIES (ALL 11 PROJECTS)", '#dfa951');
            printLine("==========================================================================", '#60a5fa');
            printLine("1. 🛡️ <strong>KUBE-Sentinel Engine</strong> (Kubernetes Microservice Mesh & Chaos Engine)");
            printLine("   🌐 Live App: <a href='https://yaya2127.github.io/kube-sentinel-platform/' target='_blank' style='color:#60a5fa; text-decoration:underline;'>yaya2127.github.io/kube-sentinel-platform/</a>");
            printLine("   💻 GitHub  : <a href='https://github.com/yaya2127/kube-sentinel-platform' target='_blank' style='color:#dfa951; text-decoration:underline;'>github.com/yaya2127/kube-sentinel-platform</a>");
            printLine("--------------------------------------------------------------------------", '#334155');
            printLine("2. 🏥 <strong>SYNAPSE-Med Platform</strong> (ICU Vital Telemetry & NEWS2 Risk Evaluation)");
            printLine("   🌐 Live App: <a href='https://yaya2127.github.io/synapse-med-platform/' target='_blank' style='color:#60a5fa; text-decoration:underline;'>yaya2127.github.io/synapse-med-platform/</a>");
            printLine("   💻 GitHub  : <a href='https://github.com/yaya2127/synapse-med-platform' target='_blank' style='color:#dfa951; text-decoration:underline;'>github.com/yaya2127/synapse-med-platform</a>");
            printLine("--------------------------------------------------------------------------", '#334155');
            printLine("2. 📈 <strong>FinPulse Engine</strong> (HFT & Risk Engine)");
            printLine("   🌐 Live App: <a href='https://yaya2127.github.io/finpulse-trading-engine/' target='_blank' style='color:#60a5fa; text-decoration:underline;'>yaya2127.github.io/finpulse-trading-engine/</a>");
            printLine("   💻 GitHub  : <a href='https://github.com/yaya2127/finpulse-trading-engine' target='_blank' style='color:#dfa951; text-decoration:underline;'>github.com/yaya2127/finpulse-trading-engine</a>");
            printLine("--------------------------------------------------------------------------", '#334155');
            printLine("2. ⚡ <strong>NexusIoT Edge</strong> (Distributed Industrial IoT Edge Platform)");
            printLine("   🌐 Live App: <a href='https://yaya2127.github.io/nexus-iot-edge-platform/' target='_blank' style='color:#60a5fa; text-decoration:underline;'>yaya2127.github.io/nexus-iot-edge-platform/</a>");
            printLine("   💻 GitHub  : <a href='https://github.com/yaya2127/nexus-iot-edge-platform' target='_blank' style='color:#dfa951; text-decoration:underline;'>github.com/yaya2127/nexus-iot-edge-platform</a>");
            printLine("--------------------------------------------------------------------------", '#334155');
            printLine("3. 🛡️ <strong>SentinelAI Auditor</strong> (Autonomous Agentic AI Security Auditor)");
            printLine("   🌐 Live App: <a href='https://yaya2127.github.io/sentinel-ai-code-auditor/' target='_blank' style='color:#60a5fa; text-decoration:underline;'>yaya2127.github.io/sentinel-ai-code-auditor/</a>");
            printLine("   💻 GitHub  : <a href='https://github.com/yaya2127/sentinel-ai-code-auditor' target='_blank' style='color:#dfa951; text-decoration:underline;'>github.com/yaya2127/sentinel-ai-code-auditor</a>");
            printLine("--------------------------------------------------------------------------", '#334155');
            printLine("4. 🎓 <strong>AASTU Academic Portal</strong> (University Management Backend)");
            printLine("   💻 GitHub  : <a href='https://github.com/yaya2127/aastu-academic-portal' target='_blank' style='color:#dfa951; text-decoration:underline;'>github.com/yaya2127/aastu-academic-portal</a>");
            printLine("--------------------------------------------------------------------------", '#334155');
            printLine("5. 🔬 <strong>Smart IoT Environmental Monitor</strong> (ATmega328P Firmware)");
            printLine("   💻 GitHub  : <a href='https://github.com/yaya2127/smart-iot-environmental-monitor' target='_blank' style='color:#dfa951; text-decoration:underline;'>github.com/yaya2127/smart-iot-environmental-monitor</a>");
            printLine("--------------------------------------------------------------------------", '#334155');
            printLine("6. 🛒 <strong>Modern E-Commerce Storefront</strong> (NestJS & Prisma Storefront)");
            printLine("   💻 GitHub  : <a href='https://github.com/yaya2127/modern-ecommerce-storefront' target='_blank' style='color:#dfa951; text-decoration:underline;'>github.com/yaya2127/modern-ecommerce-storefront</a>");
            printLine("--------------------------------------------------------------------------", '#334155');
            printLine("7. 💼 <strong>Personal Developer Portfolio</strong> (Luxury Dark UI & Canvas Particles)");
            printLine("   🌐 Live App: <a href='https://yaya2127.github.io/Personal-Portfolio/' target='_blank' style='color:#60a5fa; text-decoration:underline;'>yaya2127.github.io/Personal-Portfolio/</a>");
            printLine("   💻 GitHub  : <a href='https://github.com/yaya2127/Personal-Portfolio' target='_blank' style='color:#dfa951; text-decoration:underline;'>github.com/yaya2127/Personal-Portfolio</a>");
            printLine("--------------------------------------------------------------------------", '#334155');
            printLine("8. 🏠 <strong>Microcontroller Home Automation</strong> (Bare-Metal Optocoupler Relays)");
            printLine("   💻 GitHub  : <a href='https://github.com/yaya2127/microcontroller-home-automation' target='_blank' style='color:#dfa951; text-decoration:underline;'>github.com/yaya2127/microcontroller-home-automation</a>");
            printLine("--------------------------------------------------------------------------", '#334155');
            printLine("9. 📋 <strong>Interactive Task Scheduler</strong> (TaskMaster Pro Kanban React)");
            printLine("   💻 GitHub  : <a href='https://github.com/yaya2127/interactive-task-scheduler' target='_blank' style='color:#dfa951; text-decoration:underline;'>github.com/yaya2127/interactive-task-scheduler</a>");
          } else if (cmd === 'whoami') {
            printLine("Yared Kinetibeb Tesfaye — 5th-Year Senior Computer Engineering Student @ AASTU");
            printLine("Degree: B.Sc. Computer Engineering Senior | Location: Addis Ababa, Ethiopia");
            printLine("Architect of FinPulse HFT Engine, NexusIoT Edge Platform, and SentinelAI Auditor.");
          } else if (cmd === 'skills') {
            printLine("Languages : Go (Golang 1.22), Python 3.11, C/C++, TypeScript, JavaScript, SQL, Embedded C, Dart");
            printLine("Backend   : RESTful APIs, WebSockets, Redis Pub/Sub, Docker, PostgreSQL 15, gRPC, NestJS, Django");
            printLine("Frontend  : React 18, Next.js, Three.js 3D WebGL, TradingView UI, Tailwind CSS, HTML5/CSS3");
            printLine("Embedded  : ATmega328P AVR Microcontrollers, Bare-Metal C, FreeRTOS, Proteus VSM");
          } else if (cmd === 'education') {
            printLine("🎓 <strong>B.Sc. in Computer Engineering (5th-Year Senior)</strong>");
            printLine("Institution : Addis Ababa Science and Technology University (AASTU)");
            printLine("Cumulative Degree: B.Sc. Computer Engineering Senior");
            printLine("Key Coursework: Operating Systems, Software Engineering, Computer Architecture, Embedded C/FreeRTOS, Data Structures & Algorithms, Software Engineering.");
          } else if (cmd === 'certs') {
            printLine("🏆 VERIFIED PROFESSIONAL CERTIFICATIONS:");
            printLine("1. Simplilearn Generative AI Literacy (LLMs & Prompt Engineering)");
            printLine("2. Udacity Full-Stack Web Developer Nanodegree (Cloud APIs & PostgreSQL)");
            printLine("3. FreeCodeCamp Responsive Web Design");
          } else if (cmd === 'cv') {
            printLine("Initiating 2026 PDF Resume download...", '#dfa951');
            const link = document.createElement('a');
            link.href = 'assets/docs/Yared_Kinetibeb_CV.pdf';
            link.download = 'Yared_Kinetibeb_CV.pdf';
            link.click();
          } else if (cmd === 'contact') {
            printLine("Email   : <a href='mailto:kinetibebyared@gmail.com' style='color:#dfa951;'>kinetibebyared@gmail.com</a>");
            printLine("LinkedIn: <a href='https://www.linkedin.com/in/yared-kinetibeb-704077301/' target='_blank' style='color:#60a5fa;'>linkedin.com/in/yared-kinetibeb-704077301</a>");
            printLine("GitHub  : <a href='https://github.com/yaya2127' target='_blank' style='color:#60a5fa;'>github.com/yaya2127</a>");
          } else if (cmd === 'clear') {
            termOutput.innerHTML = '';
          } else if (cmd.includes('sudo') || cmd.includes('hire')) {
            printLine("🚀 HIRING PROTOCOL INITIATED! Reach out directly: <a href='mailto:kinetibebyared@gmail.com' style='color:#dfa951; font-weight:700;'>kinetibebyared@gmail.com</a>", '#dfa951');
          } else if (cmd !== '') {
            printLine(`Command not found: '${cmd}'. Type 'help' for available commands.`, '#ef4444');
          }

          const termBody = document.getElementById('terminal-body');
          if (termBody) termBody.scrollTop = termBody.scrollHeight;
        }
      });
    }
  }

  // 5.8 Standalone 3D Tech Stack Constellation Graph Controller (60 FPS Fast Render)
  const constellationCanvas = document.getElementById('constellation-canvas');
  if (constellationCanvas) {
    const ctx = constellationCanvas.getContext('2d');
    let isVisible = true;
    let hoveredNodeId = null;

    const rot = { x: 0.2, y: 0.3, velX: 0, velY: 0.003 };
    const drag = { isDragging: false, lastMouseX: 0, lastMouseY: 0 };
    let animFrameId = null;

    const nodes = [
      { id: 'ts', label: 'TS', color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.8)', category: 'web', x: 0, y: 0, z: 0, connections: ['dj', 'git', 'sql', 'n'] },
      { id: 'n', label: 'N', color: '#ffffff', glow: 'rgba(255, 255, 255, 0.9)', category: 'web', x: 0, y: 0, z: 0, connections: ['ts', 'css', 'c++', 'dj', 'lv'] },
      { id: 'dj', label: 'dj', color: '#10b981', glow: 'rgba(16, 185, 129, 0.8)', category: 'cloud', x: 0, y: 0, z: 0, connections: ['ts', 'lv', 'sql', 'c++'] },
      { id: 'lv', label: 'LV', color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.8)', category: 'cloud', x: 0, y: 0, z: 0, connections: ['dj', 'git', 'n'] },
      { id: 'git', label: 'Git', color: '#f97316', glow: 'rgba(249, 115, 22, 0.8)', category: 'web', x: 0, y: 0, z: 0, connections: ['lv', 'css', 'ts'] },
      { id: 'sql', label: 'SQL', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.8)', category: 'cloud', x: 0, y: 0, z: 0, connections: ['ts', 'c++', 'py', 'php'] },
      { id: 'c++', label: 'C++', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.8)', category: 'embedded', x: 0, y: 0, z: 0, connections: ['sql', 'py', 'php', 'n', 'dj'] },
      { id: 'py', label: 'Py', color: '#f5b942', glow: 'rgba(245, 185, 66, 0.8)', category: 'cloud', x: 0, y: 0, z: 0, connections: ['sql', 'c++', 'php'] },
      { id: 'php', label: 'PHP', color: '#6366f1', glow: 'rgba(99, 102, 241, 0.8)', category: 'web', x: 0, y: 0, z: 0, connections: ['c++', 'py', 'css', 'sql'] },
      { id: 'css', label: 'CSS', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.8)', category: 'web', x: 0, y: 0, z: 0, connections: ['php', 'n', 'git'] },
      { id: 'go', label: 'Go', color: '#f5b942', glow: 'rgba(245, 185, 66, 0.8)', category: 'cloud', x: 0, y: 0, z: 0, connections: ['n', 'sql', 'k8s'] },
      { id: 'k8s', label: 'K8s', color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.8)', category: 'cloud', x: 0, y: 0, z: 0, connections: ['go', 'css'] }
    ];

    // Wide 3D Sphere Distribution
    const radius = 210;
    const phi = Math.PI * (3 - Math.sqrt(5));
    nodes.forEach((node, i) => {
      const y = 1 - (i / (nodes.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      node.x = Math.cos(theta) * radiusAtY * radius;
      node.y = y * radius;
      node.z = Math.sin(theta) * radiusAtY * radius;
    });

    function drawConstellation() {
      if (!isVisible) return;

      const width = constellationCanvas.width;
      const height = constellationCanvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Background Subtle Grid
      ctx.strokeStyle = 'rgba(245, 185, 66, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (!drag.isDragging && !hoveredNodeId) {
        rot.x += rot.velX;
        rot.y += rot.velY;
        rot.velX *= 0.95;
        rot.velY = rot.velY * 0.95 + 0.0025 * 0.05;
      }

      const sinX = Math.sin(rot.x);
      const cosX = Math.cos(rot.x);
      const sinY = Math.sin(rot.y);
      const cosY = Math.cos(rot.y);

      const focalLength = 420;
      const sphereRadius = 210;

      const projected = nodes.map((node) => {
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const scale = focalLength / (focalLength + z2 + sphereRadius);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;
        const alpha = Math.max(0.2, Math.min(1.0, (z2 + sphereRadius) / (2 * sphereRadius)));

        return { ...node, projX, projY, projZ: z2, scale, alpha };
      });

      projected.sort((a, b) => a.projZ - b.projZ);

      // 1. Draw Thick Multi-Color Wireframe Edges (Fast 2-pass rendering, zero shadowBlur)
      projected.forEach((node) => {
        node.connections.forEach((targetId) => {
          const target = projected.find((n) => n.id === targetId);
          if (!target) return;

          const isEdgeHighlighted = hoveredNodeId && (hoveredNodeId === node.id || hoveredNodeId === target.id);
          const avgAlpha = (node.alpha + target.alpha) / 2;

          ctx.beginPath();
          ctx.moveTo(node.projX, node.projY);
          ctx.lineTo(target.projX, target.projY);

          if (isEdgeHighlighted) {
            ctx.strokeStyle = 'rgba(249, 115, 22, 0.4)';
            ctx.lineWidth = 6 * Math.max(node.scale, target.scale);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(node.projX, node.projY);
            ctx.lineTo(target.projX, target.projY);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2.5 * Math.max(node.scale, target.scale);
            ctx.stroke();
          } else {
            ctx.strokeStyle = `rgba(249, 115, 22, ${avgAlpha * 0.35})`;
            ctx.lineWidth = 2.2 * Math.min(node.scale, target.scale);
            ctx.stroke();
          }
        });
      });

      // 2. Draw Vector-Quality Glowing Circular Badges (Matching Image 2)
      projected.forEach((node) => {
        const isHovered = hoveredNodeId === node.id;
        const baseRadius = 24;
        const radiusVal = baseRadius * node.scale * (isHovered ? 1.3 : 1.0);
        const opacity = isHovered ? 1.0 : node.alpha;

        ctx.save();
        ctx.translate(node.projX, node.projY);

        // Glow Ring Pass
        ctx.beginPath();
        ctx.arc(0, 0, radiusVal + 4, 0, Math.PI * 2);
        ctx.fillStyle = node.glow.replace(/[\d\.]+\)$/, `${opacity * 0.25})`);
        ctx.fill();

        // Core Badge Base
        ctx.beginPath();
        ctx.arc(0, 0, radiusVal, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(18, 18, 24, ${opacity * 0.95})`;
        ctx.strokeStyle = isHovered ? '#ffffff' : node.color;
        ctx.lineWidth = (isHovered ? 3.0 : 2.2) * node.scale;
        ctx.fill();
        ctx.stroke();

        // Node Text
        ctx.fillStyle = isHovered ? '#ffffff' : node.color;
        ctx.font = `800 ${Math.max(11, Math.round(13 * node.scale * (isHovered ? 1.15 : 1.0)))}px "Outfit", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, 0, 0);

        ctx.restore();
      });

      animFrameId = requestAnimationFrame(drawConstellation);
    }

    // Drag & Touch Handlers
    function onPointerDown(e) {
      drag.isDragging = true;
      const point = e.touches ? e.touches[0] : e;
      drag.lastMouseX = point.clientX;
      drag.lastMouseY = point.clientY;
    }

    function onPointerMove(e) {
      const rect = constellationCanvas.getBoundingClientRect();
      const point = e.touches ? e.touches[0] : e;
      const mouseX = point.clientX - rect.left;
      const mouseY = point.clientY - rect.top;

      if (drag.isDragging) {
        const deltaX = point.clientX - drag.lastMouseX;
        const deltaY = point.clientY - drag.lastMouseY;

        rot.velY = deltaX * 0.004;
        rot.velX = -deltaY * 0.004;
        rot.x += rot.velX;
        rot.y += rot.velY;

        drag.lastMouseX = point.clientX;
        drag.lastMouseY = point.clientY;
      }

      // Hit testing for hover
      let hoveredId = null;
      let minDistance = Infinity;

      const sinX = Math.sin(rot.x);
      const cosX = Math.cos(rot.x);
      const sinY = Math.sin(rot.y);
      const cosY = Math.cos(rot.y);

      const focalLength = 420;
      const sphereRadius = 210;
      const centerX = constellationCanvas.width / 2;
      const centerY = constellationCanvas.height / 2;

      nodes.forEach((node) => {
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const scale = focalLength / (focalLength + z2 + sphereRadius);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;
        const hitRadius = 28 * scale;

        const dist = Math.hypot(mouseX - projX, mouseY - projY);
        if (dist < hitRadius && dist < minDistance) {
          minDistance = dist;
          hoveredId = node.id;
        }
      });

      hoveredNodeId = hoveredId;
      constellationCanvas.style.cursor = drag.isDragging ? 'grabbing' : (hoveredId ? 'pointer' : 'grab');
    }

    function onPointerUp() {
      drag.isDragging = false;
      constellationCanvas.style.cursor = 'grab';
    }

    constellationCanvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    constellationCanvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    // IntersectionObserver to pause offscreen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animFrameId);
          animFrameId = requestAnimationFrame(drawConstellation);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(constellationCanvas);
    animFrameId = requestAnimationFrame(drawConstellation);
  }
});

// Active section tracking optimization

<!-- aug31_surge_commit_1 -->
<!-- aug31_surge_commit_2 -->
<!-- aug31_surge_commit_3 -->
<!-- aug31_surge_commit_4 -->
<!-- aug31_surge_commit_5 -->
<!-- sep01_surge_commit_1 -->
<!-- sep01_surge_commit_2 -->
<!-- sep01_surge_commit_3 -->
<!-- sep01_surge_commit_4 -->
<!-- sep01_surge_commit_5 -->
<!-- sep04_surge_commit_1 -->
<!-- sep04_surge_commit_2 -->
<!-- sep04_surge_commit_3 -->
<!-- sep04_surge_commit_4 -->
<!-- sep04_surge_commit_5 -->