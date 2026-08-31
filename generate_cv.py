import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, HRFlowable

pdf_path = r'c:\yared-portfolio\assets\docs\Yared_Kinetibeb_CV.pdf'
img_path = r'c:\yared-portfolio\assets\images\profile_original_cv.jpg'

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=36,
    leftMargin=36,
    topMargin=36,
    bottomMargin=36
)

story = []
styles = getSampleStyleSheet()

GOLD = colors.HexColor('#b8860b')
DARK_TEXT = colors.HexColor('#1a202c')

section_heading = ParagraphStyle(
    'SectionHeading',
    fontName='Helvetica-Bold',
    fontSize=10.5,
    leading=13,
    textColor=GOLD,
    spaceBefore=7,
    spaceAfter=3
)

body_dark_style = ParagraphStyle(
    'BodyDarkStyle',
    fontName='Helvetica',
    fontSize=8,
    leading=11,
    textColor=DARK_TEXT
)

img_flowable = Image(img_path, width=70, height=88) if os.path.exists(img_path) else Paragraph('<b>YK</b>', section_heading)

info_text = (
    '<b><font size="15" color="#b8860b">Yared Kinetibeb Tesfaye</font></b><br/>'
    '<b><font size="9" color="#1a202c">5th-Year Computer Engineering Senior | Full-Stack Software Engineer & AI Systems Developer</font></b><br/><br/>'
    '<font size="8" color="#4a5568">'
    'Email: <a href="mailto:kinetibebyared@gmail.com" color="#b8860b">kinetibebyared@gmail.com</a> &nbsp;|&nbsp; Location: Addis Ababa, Ethiopia<br/>'
    'GitHub: <a href="https://github.com/yaya2127" color="#b8860b">github.com/yaya2127</a> &nbsp;|&nbsp; LinkedIn: <a href="https://www.linkedin.com/in/yared-kinetibeb-704077301/" color="#b8860b">linkedin.com/in/yared-kinetibeb-704077301</a><br/>'
    'X (Twitter): <a href="https://x.com/Yared_kin212" color="#b8860b">x.com/Yared_kin212</a> &nbsp;|&nbsp; Instagram: <a href="https://www.instagram.com/yared_kinetibeb" color="#b8860b">instagram.com/yared_kinetibeb</a><br/>'
    'University: Addis Ababa Science and Technology University (AASTU)'
    '</font>'
)

header_table = Table([[img_flowable, Paragraph(info_text, body_dark_style)]], colWidths=[80, 460])
header_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('ALIGN', (0,0), (0,0), 'CENTER'),
]))

story.append(header_table)
story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceAfter=6))

# Profile Summary
story.append(Paragraph('EXECUTIVE SUMMARY', section_heading))
summary_p = Paragraph(
    'Highly passionate 5th-Year Computer Engineering Senior student at Addis Ababa Science and Technology University (AASTU) '
    'specializing in Full-Stack Software Engineering, Cloud-Native Systems, AI Code Security & AST Parsers, and High-Performance Applications. '
    'Proven track record of architecting cloud-native Kubernetes chaos resilience meshes, agentic AI security auditors, real-time medical oscilloscopes, '
    'and lock-free high-frequency trading queues. Seeking an engineering internship opportunity to contribute hands-on expertise in '
    'Advanced Computer Science, Artificial Intelligence, and Full-Stack Systems Development.',
    body_dark_style
)
story.append(summary_p)
story.append(Spacer(1, 4))

# Technical Stack & Domain Proficiency
story.append(Paragraph('TECHNICAL SKILLS & DOMAIN PROFICIENCY', section_heading))
skills_data = [
    [
        Paragraph('<b>Languages & Core</b>', body_dark_style),
        Paragraph('Go (Golang 1.22), Python 3.11, C/C++, TypeScript, JavaScript (ES6+), Dart, Embedded C, SQL', body_dark_style)
    ],
    [
        Paragraph('<b>Web & Frameworks</b>', body_dark_style),
        Paragraph('React 18, Next.js, Three.js 3D WebGL, Flutter, HTML5 Canvas 60FPS, Web Audio API, Tailwind CSS, Node.js, Express', body_dark_style)
    ],
    [
        Paragraph('<b>Cloud & Databases</b>', body_dark_style),
        Paragraph('Kubernetes v1.30, Docker, eBPF Telemetry, Istio Service Mesh, Linux/Bash, Redis Pub/Sub, PostgreSQL 15, MongoDB, Git', body_dark_style)
    ],
    [
        Paragraph('<b>AI & Hardware</b>', body_dark_style),
        Paragraph('Python AST Compiler Parsers, SentinelAI Code Auditor, OWASP Security Rules, ATmega328P Bare-Metal, FreeRTOS, Proteus VSM', body_dark_style)
    ]
]
skills_table = Table(skills_data, colWidths=[130, 410])
skills_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ('TOPPADDING', (0,0), (-1,-1), 2),
]))
story.append(skills_table)
story.append(Spacer(1, 4))

# Featured Enterprise Engineering Projects
story.append(Paragraph('FEATURED ENGINEERING PROJECTS', section_heading))

projects_data = [
    [
        Paragraph('<b>KUBE-Sentinel — Autonomous Kubernetes Mesh & Chaos Resilience Engine</b><br/><i>Go 1.22 | Kubernetes | eBPF | Istio | Docker</i>', body_dark_style),
        Paragraph('Engineered an autonomous cloud-native K8s resilience platform featuring 60 FPS HTML5 Canvas DAG topology visualizer, eBPF sub-millisecond network span tracing, automated Chaos Monkey fault injection (pod kill, latency spikes, packet loss), and self-healing watchdog.', body_dark_style)
    ],
    [
        Paragraph('<b>SentinelAI — Agentic AI Code Security & AST Vulnerability Auditor</b><br/><i>Python 3.11 | AST Compiler | OWASP Top 10 | DevSecOps</i>', body_dark_style),
        Paragraph('Built an autonomous static vulnerability parser analyzing code ASTs to detect SQL Injections, API secret leaks, buffer overflows, and panic loops. Integrated 6-axis OWASP risk radar chart and 1-click unified Git Diff auto-remediation patch synthesizer.', body_dark_style)
    ],
    [
        Paragraph('<b>SYNAPSE-Med — Emergency ICU Vital Telemetry & NEWS2 Evaluator</b><br/><i>Go 1.22 | Python | Web Audio API | HTML5 Canvas</i>', body_dark_style),
        Paragraph('Architected an ICU patient telemetry console with 60 FPS 12-lead ECG and SpO2 waveform oscilloscope, automated NEWS2 clinical sepsis warning evaluator, 8-bed ICU ward matrix, QRS sound synthesizer, and thermal ECG rhythm strip PDF exporter.', body_dark_style)
    ],
    [
        Paragraph('<b>FinPulse Engine — Sub-Microsecond High-Frequency Trading Platform</b><br/><i>Go 1.22 | Lock-Free Ring Buffer | Black-Scholes | VaR</i>', body_dark_style),
        Paragraph('Developed a sub-microsecond atomic lock-free SPSC ring buffer order queue, L2 price-time priority matching engine, VWAP/TWAP order slicer, Black-Scholes options Greeks calculator, and 95% Monte Carlo Value-at-Risk simulator.', body_dark_style)
    ],
    [
        Paragraph('<b>NexusIoT Edge — Industrial SCADA & 3D WebGL Digital Twin</b><br/><i>Go | Redis Pub/Sub | Three.js WebGL | PostgreSQL</i>', body_dark_style),
        Paragraph('Engineered high-throughput telemetry ingestion microservices handling 100,000+ msgs/sec with Three.js 3D WebGL wind turbine Digital Twin, fault injection SCADA controls, and real-time sensor anomaly warning alerts.', body_dark_style)
    ]
]

proj_table = Table(projects_data, colWidths=[190, 350])
proj_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ('TOPPADDING', (0,0), (-1,-1), 2),
]))
story.append(proj_table)
story.append(Spacer(1, 4))

# Education & Certifications
story.append(Paragraph('EDUCATION & VERIFIED CERTIFICATIONS', section_heading))
edu_data = [
    [
        Paragraph('<b>B.Sc. in Computer Engineering (5th-Year Senior)</b><br/>Addis Ababa Science and Technology University (AASTU)', body_dark_style),
        Paragraph('<b>Key Coursework:</b> Operating Systems, Distributed Systems, Computer Architecture, Embedded C/FreeRTOS, Data Structures & Algorithms, Software Engineering, Database Systems.', body_dark_style)
    ],
    [
        Paragraph('<b>Verified Professional Certifications</b>', body_dark_style),
        Paragraph('• Simplilearn Generative AI Literacy (LLMs & Prompt Engineering)<br/>• Udacity Full-Stack Web Developer Nanodegree (Cloud APIs & PostgreSQL)<br/>• FreeCodeCamp Responsive Web Design Certification', body_dark_style)
    ]
]
edu_table = Table(edu_data, colWidths=[200, 340])
edu_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ('TOPPADDING', (0,0), (-1,-1), 2),
]))
story.append(edu_table)

doc.build(story)
print(f"Successfully regenerated PDF CV at: {pdf_path}")
