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

  // 5. 6-Axis Engineering Skill Radar Chart Canvas Renderer
  const radarCanvas = document.getElementById('skill-radar-canvas');
  if (radarCanvas) {
    const ctx = radarCanvas.getContext('2d');
    const labels = ['Go Microservices', 'AST Security/DevSecOps', 'HFT & Derivatives', 'Embedded C/FreeRTOS', '3D WebGL / React', 'Distributed Systems'];
    const values = [0.95, 0.92, 0.90, 0.88, 0.94, 0.96]; // Scale 0-1
    const centerX = 210, centerY = 160, radius = 110;
    const sides = labels.length;

    // Draw background web polygons
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
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

    // Draw axes & labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px "Inter", sans-serif';
    ctx.textAlign = 'center';

    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      const labelX = centerX + (radius + 24) * Math.cos(angle);
      const labelY = centerY + (radius + 20) * Math.sin(angle);
      ctx.fillText(labels[i], labelX, labelY);
    }

    // Draw Filled Data Polygon
    ctx.beginPath();
    ctx.fillStyle = 'rgba(223, 169, 81, 0.35)';
    ctx.strokeStyle = '#dfa951';
    ctx.lineWidth = 2.5;

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
  }

  // 6. Floating AI Assistant Chatbot Engine
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

      // Add user message
      const userDiv = document.createElement('div');
      userDiv.className = 'user-msg';
      userDiv.textContent = query;
      chatMessages.appendChild(userDiv);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Generate AI Response
      setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-msg';
        const q = query.toLowerCase();

        if (q.includes('finpulse') || q.includes('trading') || q.includes('hft')) {
          botDiv.innerHTML = "📈 <strong>FinPulse Engine</strong> is Yared's high-frequency trading platform built in Go & Python featuring a sub-microsecond lock-free ring buffer, L2 matching engine, VWAP/TWAP order slicer, Black-Scholes Greeks, and 95% Monte Carlo VaR! <a href='https://yaya2127.github.io/finpulse-trading-engine/' target='_blank' style='color:#60a5fa;'>Launch Live App 🚀</a>";
        } else if (q.includes('education') || q.includes('aastu') || q.includes('degree') || q.includes('gpa')) {
          botDiv.innerHTML = "🎓 Yared is a <strong>5th-Year Computer Engineering Senior</strong> at Addis Ababa Science and Technology University (AASTU) with a Cumulative GPA of <strong>3.78 / 4.00</strong>!";
        } else if (q.includes('cv') || q.includes('resume') || q.includes('download')) {
          botDiv.innerHTML = "📄 You can download Yared's official 2026 PDF Resume here: <a href='assets/docs/Yared_Kinetibeb_CV.pdf' download style='color:#dfa951; font-weight:700;'>Download CV (PDF) 📥</a>";
        } else if (q.includes('skill') || q.includes('stack') || q.includes('language')) {
          botDiv.innerHTML = "💻 Yared specializes in <strong>Go (Golang)</strong>, <strong>Python</strong>, <strong>C/C++</strong>, <strong>TypeScript/React</strong>, <strong>Next.js</strong>, <strong>PostgreSQL</strong>, <strong>Redis</strong>, and <strong>Embedded C / FreeRTOS</strong>!";
        } else {
          botDiv.innerHTML = "🤖 Yared is a Senior Computer Engineering Student at AASTU specializing in Go microservices, HFT engines, AST code security auditors, and embedded systems. Feel free to explore his projects or download his CV!";
        }

        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 400);
    };

    if (chatSendBtn) chatSendBtn.addEventListener('click', () => handleSendMessage());
    if (chatInput) chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSendMessage(); });
    suggestionPills.forEach(pill => pill.addEventListener('click', () => handleSendMessage(pill.getAttribute('data-query'))));
  }

  // 7. Interactive CLI Terminal Drawer Engine
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
            printLine("Available CLI Commands:");
            printLine("  <span class='cmd-highlight'>help</span>       - Display command list");
            printLine("  <span class='cmd-highlight'>whoami</span>     - View developer profile summary");
            printLine("  <span class='cmd-highlight'>skills</span>     - Output technical stack breakdown");
            printLine("  <span class='cmd-highlight'>projects</span>   - List featured enterprise platforms");
            printLine("  <span class='cmd-highlight'>cv</span>         - Download official PDF resume");
            printLine("  <span class='cmd-highlight'>contact</span>    - Show email & social profiles");
            printLine("  <span class='cmd-highlight'>clear</span>      - Clear terminal screen");
            printLine("  <span class='cmd-highlight'>sudo hire-yared</span> - Execute instant hiring protocol!");
          } else if (cmd === 'whoami') {
            printLine("Yared Kinetibeb Tesfaye — 5th-Year Computer Engineering Senior @ AASTU (GPA: 3.78/4.00)");
            printLine("Architect of FinPulse HFT Engine, NexusIoT Edge Platform, and SentinelAI Auditor.");
          } else if (cmd === 'skills') {
            printLine("Languages : Go (Golang), Python 3.11, C/C++, TypeScript, JavaScript, Embedded C, Dart");
            printLine("Backend   : REST APIs, WebSockets, Redis Pub/Sub, Docker, PostgreSQL 15, gRPC, NestJS");
            printLine("Frontend  : React 18, Next.js, Three.js 3D WebGL, TradingView UI, Tailwind CSS");
          } else if (cmd === 'projects') {
            printLine("1. FinPulse Engine    -> [https://yaya2127.github.io/finpulse-trading-engine/]");
            printLine("2. NexusIoT Edge      -> [https://yaya2127.github.io/nexus-iot-edge-platform/]");
            printLine("3. SentinelAI Auditor -> [https://yaya2127.github.io/sentinel-ai-code-auditor/]");
          } else if (cmd === 'cv') {
            printLine("Initiating 2026 PDF Resume download...", '#dfa951');
            const link = document.createElement('a');
            link.href = 'assets/docs/Yared_Kinetibeb_CV.pdf';
            link.download = 'Yared_Kinetibeb_CV.pdf';
            link.click();
          } else if (cmd === 'contact') {
            printLine("Email   : kinetibebyared@gmail.com");
            printLine("LinkedIn: https://www.linkedin.com/in/yared-kinetibeb-3b788b350/");
            printLine("GitHub  : https://github.com/yaya2127");
          } else if (cmd === 'clear') {
            termOutput.innerHTML = '';
          } else if (cmd.includes('sudo') || cmd.includes('hire')) {
            printLine("🚀 HIRING PROTOCOL INITIATED! Direct Email: kinetibebyared@gmail.com", '#dfa951');
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
