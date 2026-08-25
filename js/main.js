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

  // 5. Refined 6-Axis Engineering Skill Radar Chart Canvas Renderer
  const radarCanvas = document.getElementById('skill-radar-canvas');
  if (radarCanvas) {
    const ctx = radarCanvas.getContext('2d');
    const labels = [
      'Go Microservices (96%)',
      'AST Security/DevSecOps (94%)',
      'HFT & Derivatives (92%)',
      'Embedded C/FreeRTOS (90%)',
      '3D WebGL / React (95%)',
      'Distributed Systems (96%)'
    ];
    const values = [0.96, 0.94, 0.92, 0.90, 0.95, 0.96]; // Scale 0-1
    const centerX = 210, centerY = 160, radius = 105;
    const sides = labels.length;

    // Background web polygons
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.22)';
    ctx.lineWidth = 1;

    for (let level = 1; level <= 4; level++) {
      const r = (radius / 4) * level;
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Axes & Labels
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '600 11px "Inter", sans-serif';
    ctx.textAlign = 'center';

    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      const labelX = centerX + (radius + 26) * Math.cos(angle);
      const labelY = centerY + (radius + 20) * Math.sin(angle);
      ctx.fillText(labels[i], labelX, labelY);
    }

    // Filled Data Polygon with Gradient & Glow
    const polyGradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
    polyGradient.addColorStop(0, 'rgba(223, 169, 81, 0.55)');
    polyGradient.addColorStop(1, 'rgba(223, 169, 81, 0.15)');

    ctx.beginPath();
    ctx.fillStyle = polyGradient;
    ctx.strokeStyle = '#dfa951';
    ctx.lineWidth = 2.8;

    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
      const r = radius * values[i];
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glowing Node Points at Vertices
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
      const r = radius * values[i];
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#60a5fa';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
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
    botTrigger.addEventListener('click', () => botChatbox.classList.toggle('open'));
    if (botClose) botClose.addEventListener('click', () => botChatbox.classList.remove('open'));

    const handleSendMessage = (text) => {
      const query = text || chatInput.value.trim();
      if (!query) return;

      const userDiv = document.createElement('div');
      userDiv.className = 'user-msg';
      userDiv.textContent = query;
      chatMessages.appendChild(userDiv);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-msg';
        const q = query.toLowerCase();

        if (q.includes('finpulse') || q.includes('trading') || q.includes('hft') || q.includes('black-scholes') || q.includes('var')) {
          botDiv.innerHTML = "📈 <strong>FinPulse Engine</strong>: Institutional-grade high-frequency trading platform built in <strong>Go 1.22 & Python 3.11</strong>. Features atomic lock-free SPSC ring buffer, L2 matching engine, VWAP/TWAP order slicer, Black-Scholes Options Greeks (Δ, Γ, V, Θ), and 95% Monte Carlo VaR!<br/><a href='https://yaya2127.github.io/finpulse-trading-engine/' target='_blank' style='color:#60a5fa; font-weight:700;'>🌐 Launch Live App</a> | <a href='https://github.com/yaya2127/finpulse-trading-engine' target='_blank' style='color:#dfa951;'>💻 GitHub Code</a>";
        } else if (q.includes('nexus') || q.includes('iot') || q.includes('scada') || q.includes('turbine') || q.includes('3d')) {
          botDiv.innerHTML = "⚡ <strong>NexusIoT Edge</strong>: Distributed Industrial IoT platform with <strong>Go 1.22</strong> telemetry microservices handling 100,000+ msgs/sec, Redis Pub/Sub, WebSockets, 3D WebGL Three.js Digital Twin turbine, and Web Audio siren warning annunciator!<br/><a href='https://yaya2127.github.io/nexus-iot-edge-platform/' target='_blank' style='color:#60a5fa; font-weight:700;'>🌐 Launch Live App</a> | <a href='https://github.com/yaya2127/nexus-iot-edge-platform' target='_blank' style='color:#dfa951;'>💻 GitHub Code</a>";
        } else if (q.includes('sentinel') || q.includes('security') || q.includes('ast') || q.includes('owasp') || q.includes('vulnerability')) {
          botDiv.innerHTML = "🛡️ <strong>SentinelAI Auditor</strong>: Autonomous Agentic AI code security auditor built with Python AST static parser detecting SQLi, Secrets, Buffer Overflows & Go Panics. Features 6-axis OWASP radar chart, 1-click Git diff patch synthesizer, and printable ISO 27001 audit certificate exporter!<br/><a href='https://yaya2127.github.io/sentinel-ai-code-auditor/' target='_blank' style='color:#60a5fa; font-weight:700;'>🌐 Launch Live App</a> | <a href='https://github.com/yaya2127/sentinel-ai-code-auditor' target='_blank' style='color:#dfa951;'>💻 GitHub Code</a>";
        } else if (q.includes('portal') || q.includes('academic') || q.includes('aastu portal')) {
          botDiv.innerHTML = "🎓 <strong>AASTU Academic Portal</strong>: High-throughput university management system built with Go 1.22 REST APIs, React 18, PostgreSQL, ECTS weighted GPA calculator, JWT auth, and Docker containerization!<br/><a href='https://github.com/yaya2127/aastu-academic-portal' target='_blank' style='color:#dfa951; font-weight:700;'>💻 GitHub Code Repository</a>";
        } else if (q.includes('ecommerce') || q.includes('storefront') || q.includes('shop')) {
          botDiv.innerHTML = "🛒 <strong>Modern E-Commerce Storefront</strong>: Developer hardware storefront built with NestJS, TypeScript, Prisma ORM, live search, price sliders, promo code engine (TECH10), and cyber cart drawer!<br/><a href='https://github.com/yaya2127/modern-ecommerce-storefront' target='_blank' style='color:#dfa951; font-weight:700;'>💻 GitHub Code Repository</a>";
        } else if (q.includes('education') || q.includes('aastu') || q.includes('degree') || q.includes('gpa') || q.includes('university') || q.includes('study')) {
          botDiv.innerHTML = "🎓 Yared is a <strong>5th-Year Computer Engineering Senior</strong> at <strong>Addis Ababa Science and Technology University (AASTU)</strong> in Addis Ababa, Ethiopia, with a Cumulative GPA of <strong>3.78 / 4.00</strong>. Core coursework: Distributed Systems, Operating Systems, Computer Architecture, Embedded C/FreeRTOS, Data Structures & Algorithms.";
        } else if (q.includes('certif') || q.includes('simplilearn') || q.includes('udacity') || q.includes('freecodecamp')) {
          botDiv.innerHTML = "🏆 Yared holds 3 verified industry credentials:<br/>1. <strong>Simplilearn Generative AI Literacy</strong> (LLMs & Prompt Engineering)<br/>2. <strong>Udacity Full-Stack Web Developer Nanodegree</strong> (Cloud APIs & SQL)<br/>3. <strong>FreeCodeCamp Responsive Web Design</strong>";
        } else if (q.includes('cv') || q.includes('resume') || q.includes('download') || q.includes('pdf')) {
          botDiv.innerHTML = "📄 You can download Yared's official 2026 PDF Resume here: <a href='assets/docs/Yared_Kinetibeb_CV.pdf' download style='color:#dfa951; font-weight:700;'>Download CV (PDF) 📥</a>";
        } else if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('github') || q.includes('reach')) {
          botDiv.innerHTML = "📫 Connect with Yared:<br/>• <strong>Email</strong>: <a href='mailto:kinetibebyared@gmail.com' style='color:#dfa951;'>kinetibebyared@gmail.com</a><br/>• <strong>LinkedIn</strong>: <a href='https://www.linkedin.com/in/yared-kinetibeb-3b788b350/' target='_blank' style='color:#60a5fa;'>linkedin.com/in/yared-kinetibeb-3b788b350</a><br/>• <strong>GitHub</strong>: <a href='https://github.com/yaya2127' target='_blank' style='color:#60a5fa;'>github.com/yaya2127</a>";
        } else if (q.includes('hire') || q.includes('job') || q.includes('work') || q.includes('role') || q.includes('available') || q.includes('intern')) {
          botDiv.innerHTML = "💼 Yared is actively open for Full-Stack, Go Microservice, Systems Architecture, and DevSecOps engineering roles! Reach out directly via <a href='mailto:kinetibebyared@gmail.com' style='color:#dfa951; font-weight:700;'>kinetibebyared@gmail.com</a>.";
        } else if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('greetings')) {
          botDiv.innerHTML = "👋 Hello! How can I assist you today? Feel free to ask about Yared's projects, AASTU degree, tech stack, or hiring availability!";
        } else {
          botDiv.innerHTML = "🤖 Yared Kinetibeb Tesfaye is a 5th-Year Senior Computer Engineering Student at AASTU (GPA 3.78) specializing in Go microservices, HFT trading engines, AST code security auditors, and bare-metal embedded C firmware. Feel free to ask about any specific project or download his CV!";
        }

        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 350);
    };

    if (chatSendBtn) chatSendBtn.addEventListener('click', () => handleSendMessage());
    if (chatInput) chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSendMessage(); });
    suggestionPills.forEach(pill => pill.addEventListener('click', () => handleSendMessage(pill.getAttribute('data-query'))));
  }

  // 7. Interactive CLI Terminal Drawer Engine with Active HTML Hyperlinks
  const termToggleBtn = document.getElementById('terminal-toggle-btn');
  const termDrawer = document.getElementById('terminal-drawer');
  const termCloseBtn = document.getElementById('terminal-close-btn');
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output');

  if (termDrawer) {
    const toggleTerminal = () => {
      termDrawer.classList.toggle('open');
      if (termDrawer.classList.contains('open') && termInput) termInput.focus();
    };

    if (termToggleBtn) termToggleBtn.addEventListener('click', toggleTerminal);
    if (termCloseBtn) termCloseBtn.addEventListener('click', toggleTerminal);

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        toggleTerminal();
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
            printLine("⚡ YARED'S FEATURED ENTERPRISE PLATFORMS & REPOSITORIES (ALL 9 PROJECTS)", '#dfa951');
            printLine("==========================================================================", '#60a5fa');
            printLine("1. 📈 <strong>FinPulse Engine</strong> (HFT & Risk Engine)");
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
            printLine("GPA: 3.78 / 4.00 | Location: Addis Ababa, Ethiopia");
            printLine("Architect of FinPulse HFT Engine, NexusIoT Edge Platform, and SentinelAI Auditor.");
          } else if (cmd === 'skills') {
            printLine("Languages : Go (Golang 1.22), Python 3.11, C/C++, TypeScript, JavaScript, SQL, Embedded C, Dart");
            printLine("Backend   : RESTful APIs, WebSockets, Redis Pub/Sub, Docker, PostgreSQL 15, gRPC, NestJS, Django");
            printLine("Frontend  : React 18, Next.js, Three.js 3D WebGL, TradingView UI, Tailwind CSS, HTML5/CSS3");
            printLine("Embedded  : ATmega328P AVR Microcontrollers, Bare-Metal C, FreeRTOS, Proteus VSM");
          } else if (cmd === 'education') {
            printLine("🎓 <strong>B.Sc. in Computer Engineering (5th-Year Senior)</strong>");
            printLine("Institution : Addis Ababa Science and Technology University (AASTU)");
            printLine("Cumulative GPA: 3.78 / 4.00");
            printLine("Key Coursework: Operating Systems, Distributed Systems, Computer Architecture, Embedded C/FreeRTOS, Data Structures & Algorithms, Software Engineering.");
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
            printLine("LinkedIn: <a href='https://www.linkedin.com/in/yared-kinetibeb-3b788b350/' target='_blank' style='color:#60a5fa;'>linkedin.com/in/yared-kinetibeb-3b788b350</a>");
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
});

// Active section tracking optimization
