import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, HRFlowable

pdf_path = r'c:\yared-portfolio\assets\docs\Yared_Kinetibeb_CV.pdf'
img_path = r'c:\yared-portfolio\assets\images\profile.png'

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
MUTED_TEXT = colors.HexColor('#4a5568')

title_style = ParagraphStyle(
    'TitleStyle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=20,
    leading=24,
    textColor=GOLD,
    spaceAfter=4
)

section_heading = ParagraphStyle(
    'SectionHeading',
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    textColor=GOLD,
    spaceBefore=10,
    spaceAfter=4
)

body_dark_style = ParagraphStyle(
    'BodyDarkStyle',
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=DARK_TEXT
)

# Header Table with Image & Info
img_flowable = Image(img_path, width=70, height=88) if os.path.exists(img_path) else Paragraph('<b>YK</b>', title_style)

info_text = (
    '<b><font size="16" color="#b8860b">Yared Kinetibeb Tesfaye</font></b><br/>'
    '<b><font size="9.5" color="#1a202c">5th-Year Computer Engineering Senior | Full-Stack & Embedded Developer</font></b><br/><br/>'
    '<font size="8.5" color="#4a5568">'
    'Email: kinetibebyared@gmail.com &nbsp;|&nbsp; Phone: +251 945 123 586 &nbsp;|&nbsp; Location: Addis Ababa, Ethiopia<br/>'
    'LinkedIn: linkedin.com/in/yared-kinetibeb-3b788b350 &nbsp;|&nbsp; GitHub: github.com/yaya2127<br/>'
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
story.append(HRFlowable(width='100%', thickness=1.5, color=GOLD, spaceBefore=4, spaceAfter=8))

# Profile Section
story.append(Paragraph('<b>PROFILE SUMMARY</b>', section_heading))
profile_p = (
    'Dedicated 5th-year Computer Engineering senior student at Addis Ababa Science and Technology University (AASTU) '
    'with a strong technical foundation in software engineering, full-stack web development, and Arduino embedded hardware systems. '
    'Experienced in building practical web applications and microcontroller hardware-software solutions. '
    'Committed to continuous learning, multidisciplinary teamwork, and delivering reliable engineering solutions.'
)
story.append(Paragraph(profile_p, body_dark_style))
story.append(Spacer(1, 6))

# Education Section
story.append(Paragraph('<b>EDUCATION</b>', section_heading))
edu_text = (
    '<b>Bachelor of Science in Computer Engineering (5th Year Senior)</b> &nbsp;—&nbsp; <font color="#b8860b">09/2022 – 07/2027</font><br/>'
    '<b>Addis Ababa Science and Technology University (AASTU)</b> — Addis Ababa, Ethiopia<br/>'
    '<font color="#4a5568"><i>Relevant Focus:</i> Software Engineering, Web Technologies (HTML5, CSS3, JS), Arduino Programming, Microcontrollers (AVR/PIC), Embedded C/C++, Database Systems, Data Structures & Algorithms.</font>'
)
story.append(Paragraph(edu_text, body_dark_style))
story.append(Spacer(1, 6))

# Technical Skills
story.append(Paragraph('<b>TECHNICAL SKILLS</b>', section_heading))
skills_text = (
    '• <b>Frontend Web:</b> HTML5, CSS3, JavaScript (ES6+), Responsive Web Design, Flexbox/Grid<br/>'
    '• <b>Backend & Languages:</b> Python, C / C++, Node.js, RESTful APIs, PostgreSQL<br/>'
    '• <b>Arduino & Embedded Systems:</b> Arduino Programming, Microcontrollers (AVR/PIC), Circuit Design, Proteus Simulation, IoT Sensors, Embedded C/C++<br/>'
    '• <b>Developer Tools:</b> Git, GitHub, VS Code, Linux Environment<br/>'
    '• <b>Professional Strengths:</b> Problem Solving, Teamwork & Collaboration, Continuous Learning, English Proficiency'
)
story.append(Paragraph(skills_text, body_dark_style))
story.append(Spacer(1, 6))

# Verified Certifications
story.append(Paragraph('<b>VERIFIED CERTIFICATIONS & ACADEMIES</b>', section_heading))
cert_text = (
    '• <b>Engineering Agentic Artificial Intelligence Solutions</b> &nbsp;|&nbsp; <i>The Udara Project & NSK AI</i> (Issued July 13, 2026)<br/>'
    '&nbsp;&nbsp;<font color="#4a5568">Verified by Ifeanyi Okala (Founder) &nbsp;|&nbsp; Certificate ID: cmriv64ws08331417au085co0</font><br/>'
    '• <b>M-Academy Training: Gig-101, Business, Legal and Finance</b> &nbsp;|&nbsp; <i>Mesirat & Mastercard Foundation</i> (Issued March 23, 2025)<br/>'
    '&nbsp;&nbsp;<font color="#4a5568">Verified by Menna Tafesse (Program Director) &nbsp;|&nbsp; In Partnership with Gebeya & Shega</font><br/>'
    '• <b>English Professional Language Certification</b> &nbsp;|&nbsp; <i>Sest American English Academy</i>'
)
story.append(Paragraph(cert_text, body_dark_style))
story.append(Spacer(1, 6))

# Projects
story.append(Paragraph('<b>FEATURED ENGINEERING PROJECTS</b>', section_heading))
proj_text = (
    '• <b>AASTU Academic Management Portal:</b> Centralized web application for student course management, grade tracking, and campus notices built with JavaScript, Python, and PostgreSQL.<br/>'
    '• <b>Arduino Smart Environmental Monitor:</b> Microcontroller-based IoT system using Arduino UNO, C++, gas/temperature sensors, and Proteus simulation for real-time alerts.<br/>'
    '• <b>Arduino Home Automation System:</b> Hardware relay control system designed with embedded C firmware, optocouplers, and Proteus circuit simulation.<br/>'
    '• <b>Modern E-Commerce Storefront:</b> Scalable web application featuring catalog search, shopping cart state management, and user authentication.'
)
story.append(Paragraph(proj_text, body_dark_style))

doc.build(story)
print('PDF CV built successfully at:', pdf_path)
