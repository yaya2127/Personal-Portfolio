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
    fontSize=11,
    leading=14,
    textColor=GOLD,
    spaceBefore=8,
    spaceAfter=3
)

body_dark_style = ParagraphStyle(
    'BodyDarkStyle',
    fontName='Helvetica',
    fontSize=8.5,
    leading=12,
    textColor=DARK_TEXT
)

# Header Table with Image & Info
img_flowable = Image(img_path, width=70, height=88) if os.path.exists(img_path) else Paragraph('<b>YK</b>', section_heading)

info_text = (
    '<b><font size="16" color="#b8860b">Yared Kinetibeb Tesfaye</font></b><br/>'
    '<b><font size="9.5" color="#1a202c">5th-Year Computer Engineering Senior | Full-Stack, HFT & Embedded Systems Architect</font></b><br/><br/>'
    '<font size="8.5" color="#4a5568">'
    'Email: <a href="mailto:kinetibebyared@gmail.com" color="#b8860b">kinetibebyared@gmail.com</a> &nbsp;|&nbsp; Location: Addis Ababa, Ethiopia<br/>'
    'LinkedIn: <a href="https://www.linkedin.com/in/yared-kinetibeb-704077301/" color="#b8860b">linkedin.com/in/yared-kinetibeb-704077301</a> &nbsp;|&nbsp; GitHub: <a href="https://github.com/yaya2127" color="#b8860b">github.com/yaya2127</a><br/>'
    'University: Addis Ababa Science and Technology University (AASTU)'
    '</font>'
)

header_table = Table([[img_flowable, Paragraph(info_text, body_dark_style)]], colWidths=[80, 460])
header_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('ALIGN', (0,0), (0,0), 'CENTER'),
]))

story.append(header_table)
story.append(Spacer(1, 6))
story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceAfter=8))

# Profile Summary
story.append(Paragraph('EXECUTIVE SUMMARY', section_heading))
summary_p = Paragraph(
    'Highly accomplished 5th-Year Computer Engineering Senior student at Addis Ababa Science and Technology University (AASTU) '
    'specializing in high-frequency algorithmic trading systems, distributed Go microservices, AST code security auditors, and bare-metal IoT firmware. '
    'Proven track record of architecting sub-microsecond trading engines, 3D WebGL Digital Twins, and OWASP security scanners.',
    body_dark_style
)
story.append(summary_p)
story.append(Spacer(1, 6))

# Featured Enterprise Engineering Projects
story.append(Paragraph('FEATURED ENTERPRISE ENGINEERING PROJECTS', section_heading))

projects_data = [
    [
        Paragraph('<b>FinPulse Engine — High-Frequency Algorithmic Trading & Risk Engine</b><br/><i>Go 1.22 | Python 3.11 | Black-Scholes Options | Monte Carlo VaR | TradingView WebGL UI</i>', body_dark_style),
        Paragraph('Architected sub-microsecond atomic lock-free ring buffer order queue and price-time priority L2 order book. Developed VWAP/TWAP institutional order slicer, Black-Scholes Options Greeks (Delta, Gamma, Vega, Theta), and 95% Monte Carlo VaR simulation engine.', body_dark_style)
    ],
    [
        Paragraph('<b>NexusIoT Edge — Distributed Industrial IoT Telemetry Platform</b><br/><i>Go 1.22 | WebSockets | Redis Pub/Sub | Three.js 3D WebGL | PostGIS | Docker</i>', body_dark_style),
        Paragraph('Engineered high-throughput telemetry ingestion microservice handling 100,000+ metric msgs/sec. Built 3D WebGL Three.js industrial turbine Digital Twin, multi-node comparative oscilloscope, and Web Audio siren warning annunciator.', body_dark_style)
    ],
    [
        Paragraph('<b>SentinelAI — Autonomous Agentic AI Code Security & AST Auditor</b><br/><i>Python 3.11 | AST Compiler | OWASP Top 10 | ISO 27001 | DevSecOps CI/CD</i>', body_dark_style),
        Paragraph('Built multi-language AST parser detecting SQL Injection, API secrets, C++ buffer overflows, and Go panics. Integrated 6-axis security radar chart, live sandbox presets, and 1-click printable PDF ISO 27001 security certificate generator.', body_dark_style)
    ],
    [
        Paragraph('<b>AASTU Academic Portal — University Management System</b><br/><i>Go 1.22 | RESTful API | JWT Auth Middleware | Weighted GPA Engine | PostgreSQL</i>', body_dark_style),
        Paragraph('Developed student profile API microservices featuring ECTS weighted cumulative GPA calculation algorithms, JWT auth middleware, and automated transcript PDF generation.', body_dark_style)
    ]
]

proj_table = Table(projects_data, colWidths=[200, 340])
proj_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('LINEBELOW', (0,0), (-1,-2), 0.5, colors.HexColor('#e2e8f0')),
]))
story.append(proj_table)
story.append(Spacer(1, 6))

# Technical Skills
story.append(Paragraph('TECHNICAL SKILLS & COMPETENCIES', section_heading))
skills_data = [
    [Paragraph('<b>Languages & Core:</b>', body_dark_style), Paragraph('Go (Golang), Python 3.11, C / C++, TypeScript, JavaScript (ES6+), SQL, Embedded C, Dart', body_dark_style)],
    [Paragraph('<b>Backend & Cloud:</b>', body_dark_style), Paragraph('REST APIs, WebSockets, Redis Pub/Sub, Docker, PostgreSQL, Microservices, PlatformIO, FreeRTOS', body_dark_style)],
    [Paragraph('<b>Frontend & UI:</b>', body_dark_style), Paragraph('React 18, Three.js 3D WebGL, HTML5 Canvas API, TradingView Terminal Styling, Tailwind CSS', body_dark_style)]
]
skills_table = Table(skills_data, colWidths=[120, 420])
skills_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
story.append(skills_table)
story.append(Spacer(1, 6))

# Education
story.append(Paragraph('EDUCATION & CERTIFICATIONS', section_heading))
edu_text = (
    '<b>B.Sc. in Computer Engineering (5th-Year Senior)</b> &nbsp;|&nbsp; <b>AASTU</b> (Cumulative GPA: 3.78/4.00)<br/>'
    '<b>Certifications:</b> Simplilearn Generative AI Literacy &nbsp;•&nbsp; Udacity Full-Stack Web Developer &nbsp;•&nbsp; FreeCodeCamp Responsive Web Design'
)
story.append(Paragraph(edu_text, body_dark_style))

doc.build(story)
print(f'Successfully rebuilt PDF CV at {pdf_path}!')
