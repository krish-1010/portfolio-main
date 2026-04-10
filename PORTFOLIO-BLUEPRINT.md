# Krishna M — Portfolio Website Blueprint
## Ready for Claude Code / Local Development

---

## 1. PROJECT OVERVIEW

Multi-theme portfolio website with 3 distinct visual experiences sharing one content layer.

- **Default theme:** Space (dark, atmospheric, scroll-based)
- **Toggle theme:** Retro 90s (fun, nostalgic, scroll-based)
- **Separate route:** macOS Desktop (`/desktop` — OS-inspired, window-based)

**Live URL:** mkrishna.dev
**Deployment:** Vercel (static export)
**Framework:** Next.js 14+ (App Router, static export via `output: 'export'`)
**Styling:** TailwindCSS
**Content:** JSON data files (single source of truth)
**Animations:** CSS only (no GSAP, no Framer Motion on the portfolio itself)

---

## 2. ARCHITECTURE

```
krishna-portfolio/
├── app/
│   ├── layout.tsx              # Root layout, ThemeProvider, fonts
│   ├── page.tsx                # Main site (Space default, Retro toggle)
│   ├── desktop/
│   │   └── page.tsx            # macOS experience (separate route)
│   └── globals.css             # Tailwind imports + CSS variables
│
├── data/
│   ├── profile.json            # Name, bio, links, tagline
│   ├── experience.json         # Work history
│   ├── projects.json           # All projects (production, personal, research)
│   ├── testimonials.json       # 5 testimonials
│   ├── speaking.json           # Guest lectures, panels, workshops
│   ├── skills.json             # Categorized tech skills
│   └── education.json          # Degrees
│
├── components/
│   ├── shared/                 # Theme-agnostic data renderers
│   │   ├── ProjectList.tsx
│   │   ├── ExperienceTimeline.tsx
│   │   ├── TestimonialQuote.tsx
│   │   ├── SpeakingList.tsx
│   │   ├── SkillsGrid.tsx
│   │   └── EducationList.tsx
│   │
│   ├── space/                  # Space theme components
│   │   ├── SpaceLayout.tsx
│   │   ├── StarField.tsx       # CSS-only star background
│   │   ├── SpaceHero.tsx
│   │   ├── SpaceNav.tsx
│   │   ├── SpaceProjectCard.tsx
│   │   ├── SpaceSection.tsx
│   │   └── SpaceFooter.tsx
│   │
│   ├── retro/                  # Retro 90s theme components
│   │   ├── RetroLayout.tsx
│   │   ├── RetroHero.tsx
│   │   ├── RetroNav.tsx
│   │   ├── RetroProjectCard.tsx
│   │   ├── RetroWindow.tsx     # Beveled window container
│   │   ├── VisitorCounter.tsx
│   │   ├── MarqueeBar.tsx
│   │   └── RetroFooter.tsx
│   │
│   └── macos/                  # macOS theme components
│       ├── Desktop.tsx         # Main container + wallpaper
│       ├── MenuBar.tsx         # Top bar with functional dropdowns
│       ├── Dock.tsx            # Bottom dock with magnification
│       ├── DockIcon.tsx
│       ├── Window.tsx          # Window chrome (variable sizing)
│       ├── FinderSidebar.tsx
│       ├── DesktopFolder.tsx
│       ├── DesktopStickers.tsx # Scattered decorative elements
│       ├── Toast.tsx           # macOS notification toast
│       └── views/              # Content views for each "app"
│           ├── AboutView.tsx
│           ├── ProjectsView.tsx
│           ├── ExperienceView.tsx
│           ├── SkillsView.tsx
│           ├── SpeakingView.tsx
│           ├── TestimonialsView.tsx
│           └── EducationView.tsx
│
├── context/
│   └── ThemeContext.tsx         # Space/Retro toggle (localStorage)
│
├── public/
│   ├── images/
│   │   └── krishna.jpg         # Your photo
│   ├── krishna-resume.pdf      # Downloadable resume
│   └── og-image.png            # Open Graph preview image
│
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 3. CONTENT DATA

### profile.json
```json
{
  "name": "Krishna M",
  "title": "Software Engineer",
  "email": "krishna@mkrishna.dev",
  "phone": "7358368972",
  "website": "mkrishna.dev",
  "location": "Chennai, India",
  "github": "https://github.com/krish-1010",
  "linkedin": "https://linkedin.com/in/mkrishna10",
  "bio": "Full Stack Engineer building real-world tech solutions. I write code, mentor students, give guest lectures, and occasionally point telescopes at the sky.",
  "tagline": "i write code,\nmentor students,\n& point telescopes\nat the sky.",
  "roles": [
    "Junior Software Engineer @ iCover India",
    "Co-founder, Veloit AI",
    "Guest Lecturer, Anna University"
  ],
  "iLove": [
    "building tools", "mentoring", "guest lectures",
    "observational astronomy", "theater", "clean code",
    "Next.js", "open source", "teaching kids", "space"
  ]
}
```

### experience.json
```json
[
  {
    "role": "Junior Software Engineer",
    "company": "iCover India",
    "period": "2025 — Present",
    "type": "current",
    "bullets": [
      "Built iCover App Links — full-stack internal tool (Next.js, Node.js, Express, MongoDB, Redis) with RBAC, 2FA, health monitoring for 100+ endpoints. Replaced company-wide spreadsheet and bookmark workflows.",
      "Fixed PDF generation crashes — replaced Puppeteer with Playwright + generic pooling, eliminating browser-close errors under concurrent sessions."
    ]
  },
  {
    "role": "Co-Founder & Developer",
    "company": "Veloit AI",
    "period": "2022 — 2024",
    "type": "cofounded",
    "bullets": [
      "Co-built a no-code ML platform with pretrained XGBoost models, real-time ML APIs, payment integration, and full-stack interface (Flutter frontend, Flask + Firebase backend) serving 50+ clients."
    ]
  },
  {
    "role": "CTO / SDE Lead",
    "company": "Space Kidz India",
    "period": "2022 — 2024",
    "type": "internship",
    "bullets": [
      "Developed platforms for global STEM competitions (YSI Challenge — 2,500+ participants, 10+ countries). Assisted in software systems used in satellite programs."
    ]
  },
  {
    "role": "CTO",
    "company": "Sharanya Spots Talent",
    "period": "2023 — 2024",
    "type": "internship",
    "bullets": [
      "Set up complete tech infrastructure — business website with real-time slot booking and payment integration. Boosted digital presence."
    ]
  }
]
```

### projects.json
```json
{
  "production": [
    {
      "name": "iCover App Links",
      "tech": "Next.js, Node.js, Express, MongoDB, Redis",
      "year": "2025",
      "desc": "Full-stack internal tool with RBAC, 2FA, health monitoring for 100+ endpoints, dark mode UI. Replaced company-wide spreadsheet and bookmark workflows.",
      "github": null,
      "live": null
    },
    {
      "name": "DoMS Nexus Webfolio & AI Chatbot",
      "tech": "Next.js, GSAP, Python, Cloudinary",
      "year": "2024",
      "desc": "Digital placement brochure for Anna University MBA department with GSAP animations. Integrated AI chatbot with custom training for placement queries, achieving 99% data accuracy.",
      "github": null,
      "live": "https://domsauconnect.com"
    },
    {
      "name": "IGNITA — Event Platform",
      "tech": "Next.js, Payment Gateway, QR Check-in",
      "year": "2024",
      "desc": "Complete event website and software for a two-day media entrepreneurship conclave at Anna University. Registration, QR check-in, payment gateway for 250+ students.",
      "github": null,
      "live": null
    },
    {
      "name": "YSI Challenge Website",
      "tech": "Wix, Wix Velo",
      "year": "2023",
      "desc": "International STEM competition platform with registration flow and personal dashboards — 2,500+ participants from 10+ countries.",
      "github": null,
      "live": "https://www.ysichallenge.com"
    },
    {
      "name": "Sharanya Spots Talent Website",
      "tech": "Wix Studio, Wix Velo",
      "year": "2023",
      "desc": "Business website with real-time slot booking features and payment integration for a casting company.",
      "github": null,
      "live": null
    },
    {
      "name": "Space Kidz India Website",
      "tech": "Wix Studio, Wix Velo",
      "year": "2023",
      "desc": "Business website for a nano satellite production and aerospace education company.",
      "github": null,
      "live": null
    }
  ],
  "personal": [
    {
      "name": "Gasgo UserHub",
      "tech": "Java, Spring Boot, PostgreSQL, Docker, Kafka",
      "year": "2025",
      "desc": "Production-ready microservice platform with RESTful APIs, Swagger documentation, Kafka + Zookeeper for async messaging, Docker Compose deployment.",
      "github": "https://github.com/krish-1010/springboot-gasgo",
      "live": null
    },
    {
      "name": "ReviseIt",
      "tech": "React, Supabase, Whisper AI",
      "year": "2024",
      "desc": "Audio-based study platform that converts recordings to structured revision notes.",
      "github": null,
      "live": "https://reviseit.vercel.app"
    },
    {
      "name": "Space Board Game",
      "tech": "Next.js, PostgreSQL, Docker, GSAP, Framer Motion",
      "year": "2024",
      "desc": "Animated browser-based board game with real-time multiplayer and space theme.",
      "github": "https://github.com/krish-1010/dynamic-board-game",
      "live": null
    },
    {
      "name": "Whisper AI Backend",
      "tech": "Python, OpenAI Whisper",
      "year": "2024",
      "desc": "German pronunciation evaluator using OpenAI Whisper for audio analysis.",
      "github": "https://github.com/krish-1010/whisper-backend",
      "live": null
    },
    {
      "name": "Langflow AI Chatbot",
      "tech": "Next.js 15, TypeScript, Langflow, OpenAI",
      "year": "2024",
      "desc": "AI chatbot for Loyola College with Langflow backend and OpenAI integration.",
      "github": null,
      "live": null
    },
    {
      "name": "Pen-to-Text",
      "tech": "React.js, OCR",
      "year": "2024",
      "desc": "Handwriting to digital text converter using optical character recognition.",
      "github": null,
      "live": null
    },
    {
      "name": "Real-Time Chat App",
      "tech": "React, Firebase",
      "year": "2024",
      "desc": "Real-time messaging application with Firebase backend.",
      "github": null,
      "live": null
    },
    {
      "name": "AR Product Preview",
      "tech": "C#, Unity Engine",
      "year": "2024",
      "desc": "Augmented reality product visualization tool built in Unity.",
      "github": "https://github.com/krish-1010/ar-product-preview",
      "live": null
    },
    {
      "name": "Spotify Clone",
      "tech": "TypeScript",
      "year": "2024",
      "desc": "Spotify UI clone with playback functionality.",
      "github": "https://github.com/krish-1010/spotify-clone",
      "live": null
    },
    {
      "name": "Least Squares Line Fitting Tool",
      "tech": "Python, PyQt5, Matplotlib",
      "year": "2023",
      "desc": "Desktop application for linear regression visualization.",
      "github": null,
      "live": null
    },
    {
      "name": "Dynamic Event Calendar",
      "tech": "TypeScript, TailwindCSS",
      "year": "2024",
      "desc": "Interactive calendar component with event management.",
      "github": null,
      "live": null
    },
    {
      "name": "Invoice Generation Tool",
      "tech": "EJS, Node.js",
      "year": "2024",
      "desc": "Template-based invoice generator.",
      "github": null,
      "live": null
    }
  ],
  "research": [
    {
      "name": "EEG Brainwave Research",
      "tech": "Python, Signal Processing, ML",
      "year": "2023",
      "desc": "Research on EEG brainwave data interpretation, exploring use in healthcare and behavioral science. Funded by Loyola College.",
      "github": null,
      "live": null
    }
  ]
}
```

### testimonials.json
```json
[
  {
    "quote": "Krishna has been the most reliable tech partner I've had across all my projects: from chatbots to complex product builds. He's equally strong in both frontend and backend which makes execution smoother and faster. No matter how tough the idea he finds a way to make it work. If I had to trust anyone with everything technical it would be him without second thought. On time, trustworthy and all-in — all you'd want in a teammate.",
    "name": "Praveen Thirumurugan",
    "role": "Associate Product Manager",
    "company": "Oracle"
  },
  {
    "quote": "Working with Krishna has been such a smooth and reassuring experience. He just gets what we're trying to say — and even better he brings it to life exactly how we imagine it. From our website to forms to behind-the-scenes tech fixes he's been a huge support. What we love most? His patience, his curiosity, and the fact that he's always one step ahead.",
    "name": "Sharanya Subramaniam",
    "role": "CEO & Casting Director",
    "company": "Sharanya Spots Talent"
  },
  {
    "quote": "Krishna and I share a long history of solving complex problems through innovative solutions! I strongly believe in Krishna's ability to take ownership and get a project to completion. I have seen him invest his time thoroughly to ensure we go over all aspects of our engineering issues. I can entrust Krishna any day to build the next big thing!",
    "name": "Roshan SK",
    "role": "AI Engineer",
    "company": "DevRev"
  },
  {
    "quote": "I started as a complete beginner but Krishna's teaching style made all the difference. His visual explanations especially using OneNote live hand drawings really broke down complex concepts and showed how things work behind the scenes. Real life examples made it easy to connect the basics of Python and data visualization to hands on applications for my MSc project. I went from absolutely zero coding knowledge to being confident with the fundamentals.",
    "name": "Surya Jayaseelan",
    "role": "MSc Student, Business Analytics",
    "company": "Aston University"
  },
  {
    "quote": "Krishna has always been there for me since college from helping with my project work to teaching me Java, SQL and Python. I got placed in a great company. He's been a true friend and guide through both my professional and personal lows. I am really grateful.",
    "name": "Rithi Delani Seles",
    "role": "Business Analyst",
    "company": "Dedalus"
  }
]
```

### speaking.json
```json
[
  { "event": "AI in Quality Management", "venue": "Anna University (AU TVS Centre)", "year": "2026", "type": "Guest Lecture" },
  { "event": "Values, Power & Responsibility in the Digital Era", "venue": "Loyola College — AgNite '26", "year": "2026", "type": "Panel Speaker" },
  { "event": "MERN Stack Workshop", "venue": "SDNB Vaishnav College, Chennai", "year": "2026", "type": "Workshop" },
  { "event": "National Space Day — Chief Guest", "venue": "Stella Maris College, Chennai", "year": "2025", "type": "Chief Guest" },
  { "event": "Low Code / No Code", "venue": "Anna University — MBA Dept.", "year": "2024", "type": "Guest Lecture" },
  { "event": "Tech and Business", "venue": "Anna University — MBA Dept.", "year": "2024", "type": "Guest Lecture" },
  { "event": "Webfolio Release Event", "venue": "Anna University — MBA Dept.", "year": "2024", "type": "Developer" },
  { "event": "MERN Projects Judge", "venue": "DG Vaishnav College, Chennai", "year": "2025", "type": "Judge" },
  { "event": "Mock Interviews & Placement Training", "venue": "DG Vaishnav College, Chennai", "year": "2024", "type": "Mentor" },
  { "event": "Computational Biology", "venue": "IIT Madras — Bioconclave '23", "year": "2023", "type": "Guest Speaker" },
  { "event": "Space Technology Workshop", "venue": "RSR International CBSE School, Sivakasi", "year": "2023", "type": "Workshop" },
  { "event": "Teaching Session", "venue": "New Hope and New Life Children Home", "year": "2024", "type": "Volunteer" },
  { "event": "Cultural Event Judge", "venue": "Omega International School — Jaagiti '23", "year": "2023", "type": "Judge" }
]
```

### skills.json
```json
{
  "Languages": ["JavaScript", "TypeScript", "Java", "Python", "SQL", "C++", "C#"],
  "Frontend": ["React.js", "Next.js", "Angular", "Flutter", "TailwindCSS", "GSAP", "Framer Motion", "EJS", "Zod", "Formik"],
  "Backend": ["Node.js", "Express.js", "Spring Boot", "Flask", "Prisma", "Mongoose", "REST APIs", "JWT", "RBAC"],
  "Databases": ["MongoDB (DocumentDB)", "PostgreSQL", "Redis", "MySQL", "Supabase", "Firebase"],
  "DevOps & Tools": ["Docker", "AWS (SES)", "Git", "Vercel", "Postman", "Playwright", "Kafka", "Wix Velo"],
  "AI & ML": ["OpenAI (Whisper, GPT)", "Langflow", "XGBoost", "EEG Signal Processing"],
  "Integrations": ["DocuSign API", "SEP Payment Gateway", "Cloudinary", "Howler.js"],
  "Other": ["Unity Engine", "PyQt5", "Observational Astronomy", "Technical Writing"]
}
```

### education.json
```json
[
  {
    "degree": "Master of Computer Application",
    "school": "University of Madras",
    "period": "2023 — 2025",
    "notes": "Completed alongside professional work at Space Kidz India and iCover."
  },
  {
    "degree": "Bachelor of Science in Physics",
    "school": "Loyola College, Chennai",
    "period": "2020 — 2023",
    "notes": "Studied under Prof. Joseph Prabagar. Started EEG brainwave research. Chief Technician for drama that won Best Play."
  }
]
```

---

## 4. THEME SPECIFICATIONS

### Theme 1: SPACE (Default)

**Concept:** Dark, atmospheric, content-first scroll site. Your physics/observatory background as the design language.

**Colors:**
- Background: #0B1120 (deep navy)
- Text primary: #E5E7EB (off-white)
- Text secondary: rgba(255,255,255,0.5)
- Accent primary: #4F9CF7 (soft blue)
- Accent secondary: #2B6777 (teal — from your resume)
- Card bg: rgba(255,255,255,0.04)
- Card border: rgba(255,255,255,0.08)

**Typography:**
- Headings: Space Grotesk (Google Fonts) — 700/800 weight
- Body: Inter — 400/500 weight
- Mono (code snippets): JetBrains Mono

**Layout:** Single-column scroll. Sections: Hero → About → Experience → Projects → Testimonials → Speaking → Contact. Generous whitespace. CSS-only star field background (radial gradients + positioned dots).

**Special elements:**
- Constellation-style dot connectors between section headers
- Subtle glow on cards on hover
- Glass-morphism panels (backdrop-filter blur)
- Section transitions with CSS scroll-triggered reveals (IntersectionObserver + CSS classes)

---

### Theme 2: RETRO 90s (Toggle)

**Concept:** Genuine retro aesthetic (not ironic meme). Chunky borders, system fonts, dithered gradients. Content stays professional.

**Colors:**
- Background: #008080 (teal) with checkerboard pattern
- Window bg: #C0C0C0 (silver)
- Text: #000000
- Link: #0000FF
- Accent: #FF00FF (magenta), #FFFF00 (yellow)
- Border: #808080 (inset/outset 3D bevels)

**Typography:**
- Headings: VT323 (Google Fonts) — pixel style
- Body: IBM Plex Mono — readable!
- Min body size: 14px (readability non-negotiable)

**Layout:** Same scroll sections but wrapped in beveled "window" containers. Chunky 2px borders with 3D inset/outset effects. Content inside windows.

**Special elements:**
- Visitor counter (real, using localStorage or a simple API)
- Scrolling marquee for testimonial snippets (CSS animation, not <marquee>)
- "Under construction" GIF equivalent (but tasteful — maybe a spinning globe)
- Guestbook-style contact form
- Status bar at bottom: "Krishna M — Online — Chennai, India — [visitor count] visitors"

---

### Theme 3: macOS Desktop (Separate route: /desktop)

**Concept:** Annie-style macOS desktop. NOT a full simulation. Static page styled to look like macOS. Clickable folders open Finder-style windows.

**Reference:** annunjaya.vercel.app (Annie's site)

**Colors:**
- Wallpaper: Dark gradient (#0f0c29 → #1a1a3e → #0f3460 → #533483)
- Menu bar: rgba(30,30,30,0.75) + backdrop-filter blur
- Window bg: rgba(246,246,246,0.94) + backdrop-filter blur
- Dock: rgba(255,255,255,0.1) + backdrop-filter blur
- Accent: #007AFF (macOS blue)
- Traffic lights: #FF5F57, #FEBC2E, #28C840

**Typography:**
- System: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif
- All weights from 400-700

**Layout:** Full viewport. Menu bar top. Desktop icons right column. Welcome text left. Dock bottom center. Windows centered when open.

**Components built in prototype (krishna-macos-v2.jsx):**
- MenuBar with functional File/Edit/View/Go dropdowns
- Window chrome with traffic light dots, sidebar, variable sizing per section
- Desktop folder icons with colored folder SVGs
- Dock with hover magnification + tooltip labels
- Toast notifications for clipboard actions
- Decorative stickers (code symbols, stars, telescope)
- All 7 content views (About, Projects, Experience, Skills, Speaking, Testimonials, Education)

**Key behaviors:**
- Different window sizes: Projects = 900px wide, About = 680px, Education = 540px, etc.
- File > Download Resume actually triggers PDF download
- Edit > Copy Email actually copies to clipboard + shows toast
- Sidebar navigation lets you switch sections without closing window
- Red dot closes window back to desktop

---

## 5. THEME SWITCHING MECHANISM

**Space ↔ Retro:** CSS variable swap + component swap. Stored in localStorage. Toggle button in the nav corner — two small icons.

**macOS:** Separate route (/desktop). Link in Space/Retro nav: small macOS icon or "Desktop version" text link. The /desktop page has a "Back to site" link too.

**All three themes** import from the same `/data/*.json` files.

---

## 6. SEO & META

```html
<title>Krishna M — Software Engineer</title>
<meta name="description" content="Full Stack Engineer. I build web apps, mentor students, and give guest lectures. Next.js, Node.js, React, Java, Python." />
<meta property="og:title" content="Krishna M — Software Engineer" />
<meta property="og:description" content="Portfolio of Krishna M — Software Engineer, Guest Lecturer, Mentor" />
<meta property="og:image" content="/og-image.png" />
<meta property="og:url" content="https://mkrishna.dev" />
<link rel="canonical" href="https://mkrishna.dev" />
```

---

## 7. PERFORMANCE TARGETS

- First Contentful Paint: < 1.5s
- Total page weight: < 300KB (initial load)
- Lighthouse score: > 90 across all categories
- No JS framework animations (CSS only)
- Images: lazy-loaded, WebP format, served via Next.js Image component
- Fonts: preloaded, display: swap

---

## 8. BUILD ORDER

1. **Phase 1:** Next.js scaffold + data layer + Space theme → ship, replace current site
2. **Phase 2:** Retro theme + toggle mechanism → add to deployed site
3. **Phase 3:** macOS /desktop route → add to deployed site

---

## 9. PROTOTYPE FILES

The macOS theme prototype (React JSX, fully interactive) is available as:
- `krishna-macos-v2.jsx` — Latest version with functional menus, toasts, variable window sizes, desktop stickers

This prototype's component structure maps directly to the `/components/macos/` directory in the final build.

---

## 10. KEY DESIGN DECISIONS (from brainstorming)

- No explicit "3+ years experience" claim on resume/CV — uses "hands-on experience" framing
- Resume summary = identity + intent only (no tech lists in summary)
- Two-tone color scheme: dark navy #1A3C5E for headings, teal #2B6777 for accent lines (from resume/CV)
- Outcome-focused language in all professional content
- Veloit AI stack is Flutter + Flask + Firebase (not React)
- ReviseIt uses Supabase (not Firebase)
- Speaking section is a major differentiator — 13 events across 8+ venues
- Testimonials from 5 different contexts: colleague (Oracle), client (SST), co-founder (DevRev), international mentee (Aston), student (Dedalus)
