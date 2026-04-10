import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════

const P = {
  name: "Krishna M", title: "Software Engineer", email: "krishna@mkrishna.dev",
  phone: "7358368972", website: "mkrishna.dev", location: "Chennai",
  github: "https://github.com/krish-1010", linkedin: "https://linkedin.com/in/mkrishna10",
  resumeUrl: "#",
  tagline: "i write code,\nmentor students,\n& point telescopes\nat the sky.",
  roles: ["Junior Software Engineer @ iCover India", "Co-founder, Veloit AI", "Guest Lecturer, Anna University"],
};

const EXPERIENCE = [
  { role: "Junior Software Engineer", company: "iCover India", period: "2025 — Present", color: "#34C759",
    bullets: ["Built App Links — full-stack internal tool (Next.js, Node, MongoDB, Redis) with RBAC, 2FA, health monitoring for 100+ endpoints.", "Fixed PDF generation crashes — replaced Puppeteer with Playwright + generic pooling."] },
  { role: "Co-Founder & Developer", company: "Veloit AI", period: "2022 — 2024", color: "#AF52DE",
    bullets: ["No-code ML platform — XGBoost models, real-time APIs, payments. Flutter + Flask + Firebase. 50+ clients."] },
  { role: "CTO / SDE Lead", company: "Space Kidz India", period: "2022 — 2024", color: "#FF9500",
    bullets: ["Platforms for global STEM competitions (YSI Challenge — 2,500+ participants, 10+ countries). Software for satellite programs."] },
  { role: "CTO", company: "Sharanya Spots Talent", period: "2023 — 2024", color: "#FF2D55",
    bullets: ["Complete tech infrastructure — website with real-time booking & payment integration."] },
];

const PROJECTS = {
  production: [
    { name: "iCover App Links", tech: "Next.js · Node · MongoDB · Redis", year: "2025", desc: "Internal tool: RBAC, 2FA, health monitoring for 100+ endpoints.", color: "#FFD60A" },
    { name: "DoMS Nexus Webfolio", tech: "Next.js · GSAP · Python · Cloudinary", year: "2024", desc: "Anna University MBA digital brochure. AI chatbot with 99% accuracy.", link: "domsauconnect.com", color: "#30D158" },
    { name: "IGNITA Event Platform", tech: "Next.js · Payment · QR Check-in", year: "2024", desc: "Anna University event — registration, QR check-in, payments. 250+ students.", color: "#64D2FF" },
    { name: "YSI Challenge", tech: "Wix · Wix Velo", year: "2023", desc: "International STEM competition — 2,500+ participants, 10+ countries.", link: "ysichallenge.com", color: "#FF9F0A" },
  ],
  personal: [
    { name: "Gasgo UserHub", tech: "Java · Spring Boot · PostgreSQL · Docker · Kafka", year: "2025", desc: "Microservice platform — REST APIs, Swagger, Kafka, Docker Compose.", color: "#BF5AF2" },
    { name: "ReviseIt", tech: "React · Supabase · Whisper AI", year: "2024", desc: "Audio-based study platform — recordings to revision notes.", link: "reviseit.vercel.app", color: "#FF375F" },
    { name: "Space Board Game", tech: "Next.js · PostgreSQL · GSAP", year: "2024", desc: "Animated browser board game with space theme.", color: "#5E5CE6" },
    { name: "Whisper AI Backend", tech: "Python · OpenAI Whisper", year: "2024", desc: "German pronunciation evaluator.", color: "#AC8E68" },
  ],
  research: [
    { name: "EEG Brainwave Research", tech: "Python · Signal Processing · ML", year: "2023", desc: "EEG data interpretation for healthcare. Funded by Loyola College.", color: "#FF6482" },
  ],
};

const TESTIMONIALS = [
  { q: "Krishna has been the most reliable tech partner I've had. Equally strong in frontend and backend. On time, trustworthy and all-in.", n: "Praveen Thirumurugan", r: "Assoc. Product Manager", c: "Oracle" },
  { q: "He just gets what we're trying to say — and brings it to life exactly how we imagine. His patience, curiosity, and always being one step ahead.", n: "Sharanya Subramaniam", r: "CEO", c: "Sharanya Spots Talent" },
  { q: "I strongly believe in Krishna's ability to take ownership and get a project to completion. I can entrust him to build the next big thing!", n: "Roshan SK", r: "AI Engineer", c: "DevRev" },
  { q: "I went from zero coding knowledge to being confident with fundamentals. His visual explanations broke down complex concepts.", n: "Surya Jayaseelan", r: "MSc Student", c: "Aston University" },
  { q: "Krishna has always been there for me — from project work to teaching Java, SQL, Python. I got placed in a great company.", n: "Rithi Delani Seles", r: "Business Analyst", c: "Dedalus" },
];

const SPEAKING = [
  { event: "AI in Quality Management", venue: "Anna University", year: "2026", type: "Lecture", bg: "#007AFF" },
  { event: "Values, Power & Responsibility in Digital Era", venue: "Loyola College — AgNite '26", year: "2026", type: "Panel", bg: "#AF52DE" },
  { event: "MERN Stack Workshop", venue: "SDNB Vaishnav College", year: "2026", type: "Workshop", bg: "#30D158" },
  { event: "National Space Day — Chief Guest", venue: "Stella Maris College", year: "2025", type: "Chief Guest", bg: "#FF3B30" },
  { event: "Low Code / No Code", venue: "Anna University", year: "2024", type: "Lecture", bg: "#007AFF" },
  { event: "Tech and Business", venue: "Anna University", year: "2024", type: "Lecture", bg: "#007AFF" },
  { event: "MERN Projects Judge", venue: "DG Vaishnav College", year: "2025", type: "Judge", bg: "#FF9500" },
  { event: "Computational Biology", venue: "IIT Madras — Bioconclave '23", year: "2023", type: "Speaker", bg: "#5856D6" },
];

const SKILLS = {
  Languages: ["JavaScript", "TypeScript", "Java", "Python", "SQL", "C++"],
  Frontend: ["React.js", "Next.js", "Angular", "Flutter", "TailwindCSS", "GSAP"],
  Backend: ["Node.js", "Express", "Spring Boot", "Flask", "Prisma", "REST APIs"],
  Databases: ["MongoDB", "PostgreSQL", "Redis", "Supabase", "Firebase"],
  DevOps: ["Docker", "AWS", "Git", "Vercel", "Kafka", "Playwright"],
  "AI/ML": ["OpenAI Whisper", "Langflow", "XGBoost", "EEG Processing"],
};

// ═══════════════════════════════════════════════════════
// DECORATIVE ELEMENTS (Krishna's "stickers")
// ═══════════════════════════════════════════════════════

const Sticker = ({ children, style }) => (
  <div style={{ position: "absolute", pointerEvents: "none", opacity: 0.6, ...style }}>{children}</div>
);

const DesktopStickers = () => (
  <>
    <Sticker style={{ top: "8%", left: "3%", fontSize: 28, transform: "rotate(-15deg)" }}>⟨/⟩</Sticker>
    <Sticker style={{ top: "15%", left: "12%", fontSize: 18, opacity: 0.4 }}>★</Sticker>
    <Sticker style={{ top: "75%", left: "5%", fontSize: 22, transform: "rotate(10deg)" }}>🔭</Sticker>
    <Sticker style={{ top: "60%", left: "15%", fontSize: 14, opacity: 0.35 }}>✦</Sticker>
    <Sticker style={{ top: "85%", left: "20%", fontSize: 16, opacity: 0.3 }}>⚡</Sticker>
    <Sticker style={{ top: "25%", left: "55%", fontSize: 12, opacity: 0.25 }}>✧</Sticker>
    <Sticker style={{ top: "45%", right: "8%", fontSize: 14, opacity: 0.3 }}>✦</Sticker>
    <Sticker style={{ bottom: "18%", left: "40%", fontSize: 18, opacity: 0.3, transform: "rotate(25deg)" }}>{ }</Sticker>
    <Sticker style={{ top: "5%", right: "20%", fontSize: 14, opacity: 0.35 }}>★</Sticker>
    <Sticker style={{ top: "35%", left: "8%", fontSize: 20, opacity: 0.25, transform: "rotate(-8deg)" }}>$_</Sticker>
    <Sticker style={{ bottom: "25%", right: "15%", fontSize: 16, opacity: 0.3 }}>◈</Sticker>
    <Sticker style={{ top: "55%", left: "28%", fontSize: 10, opacity: 0.2 }}>●</Sticker>
    <Sticker style={{ top: "70%", left: "48%", fontSize: 12, opacity: 0.25 }}>✧</Sticker>
    <Sticker style={{ top: "12%", left: "38%", fontSize: 24, opacity: 0.15, transform: "rotate(45deg)" }}>⬡</Sticker>
  </>
);

// ═══════════════════════════════════════════════════════
// MENU BAR with functional dropdowns
// ═══════════════════════════════════════════════════════

const MenuBar = ({ onAction, time }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const menus = {
    File: [
      { label: "New Window", shortcut: "⌘N", action: null },
      { label: "New Tab", shortcut: "⌘T", action: null },
      "sep",
      { label: "Download Resume", shortcut: "⌘R", action: () => onAction("resume") },
      { label: "Share Portfolio", shortcut: "⇧⌘C", action: () => { navigator.clipboard?.writeText("https://mkrishna.dev"); onAction("copied"); } },
      "sep",
      { label: "Print...", shortcut: "⌘P", action: () => window.print() },
      { label: "Close Window", shortcut: "⌘W", action: null },
    ],
    Edit: [
      { label: "Copy Email", shortcut: "", action: () => { navigator.clipboard?.writeText(P.email); onAction("email-copied"); } },
      { label: "Copy Page URL", shortcut: "", action: () => { navigator.clipboard?.writeText(window.location.href); onAction("url-copied"); } },
      "sep",
      { label: "Find on Page", shortcut: "⌘F", action: null },
    ],
    View: [
      { label: "About Me", shortcut: "", action: () => onAction("open:about") },
      { label: "Projects", shortcut: "", action: () => onAction("open:projects") },
      { label: "Experience", shortcut: "", action: () => onAction("open:experience") },
      "sep",
      { label: "Testimonials", shortcut: "", action: () => onAction("open:testimonials") },
      { label: "Speaking", shortcut: "", action: () => onAction("open:speaking") },
    ],
    Go: [
      { label: "GitHub", shortcut: "", action: () => window.open(P.github, "_blank") },
      { label: "LinkedIn", shortcut: "", action: () => window.open(P.linkedin, "_blank") },
      { label: "Website", shortcut: "", action: () => window.open(`https://${P.website}`, "_blank") },
    ],
  };

  return (
    <>
      {openMenu && <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setOpenMenu(null)} />}
      <div style={{
        height: 25, background: "rgba(30,30,30,0.75)", backdropFilter: "blur(40px) saturate(200%)",
        WebkitBackdropFilter: "blur(40px) saturate(200%)", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 14px", fontSize: 13, color: "rgba(255,255,255,0.92)",
        fontWeight: 500, flexShrink: 0, zIndex: 200, position: "relative",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <span style={{ fontSize: 14, marginRight: 16, cursor: "default" }}>&#63743;</span>
          <span style={{ fontWeight: 700, marginRight: 20, cursor: "default" }}>{P.name}</span>
          {Object.keys(menus).map(key => (
            <div key={key} style={{ position: "relative" }}>
              <span
                onClick={() => setOpenMenu(openMenu === key ? null : key)}
                style={{
                  padding: "2px 10px", cursor: "default", borderRadius: 4,
                  background: openMenu === key ? "rgba(255,255,255,0.15)" : "transparent",
                  opacity: openMenu === key ? 1 : 0.8,
                }}
              >{key}</span>
              {openMenu === key && (
                <div style={{
                  position: "absolute", top: 22, left: 0, minWidth: 220,
                  background: "rgba(40,40,40,0.95)", backdropFilter: "blur(50px)",
                  borderRadius: 6, padding: "4px 0", boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.1)",
                  zIndex: 300, animation: "menuDrop 0.12s ease-out",
                }}>
                  {menus[key].map((item, i) => item === "sep" ? (
                    <div key={i} style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "4px 0" }} />
                  ) : (
                    <div key={i} onClick={() => { item.action?.(); setOpenMenu(null); }}
                      style={{
                        display: "flex", justifyContent: "space-between", padding: "4px 14px",
                        fontSize: 13, color: item.action ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.35)",
                        cursor: item.action ? "default" : "default", borderRadius: 4, margin: "0 4px",
                      }}
                      onMouseEnter={e => { if (item.action) e.currentTarget.style.background = "#0058D0"; }}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && <span style={{ opacity: 0.5, marginLeft: 30, fontSize: 12 }}>{item.shortcut}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12, opacity: 0.8 }}>
          <span>{time}</span>
        </div>
      </div>
    </>
  );
};

// ═══════════════════════════════════════════════════════
// TOAST NOTIFICATION
// ═══════════════════════════════════════════════════════

const Toast = ({ message, onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{
      position: "fixed", top: 40, right: 16, padding: "10px 18px", background: "rgba(40,40,40,0.95)",
      backdropFilter: "blur(20px)", borderRadius: 10, color: "white", fontSize: 13, fontWeight: 500,
      boxShadow: "0 8px 30px rgba(0,0,0,0.3)", zIndex: 500, animation: "slideIn 0.25s ease-out",
    }}>✓ {message}</div>
  );
};

// ═══════════════════════════════════════════════════════
// WINDOW CHROME — variable sizing
// ═══════════════════════════════════════════════════════

const WINDOW_SIZES = {
  about: { w: "min(680px, 92vw)", h: "min(520px, 75vh)" },
  projects: { w: "min(900px, 94vw)", h: "min(560px, 78vh)" },
  experience: { w: "min(720px, 93vw)", h: "min(500px, 75vh)" },
  skills: { w: "min(600px, 90vw)", h: "min(440px, 70vh)" },
  speaking: { w: "min(760px, 93vw)", h: "min(520px, 76vh)" },
  testimonials: { w: "min(640px, 91vw)", h: "min(500px, 75vh)" },
  education: { w: "min(540px, 88vw)", h: "min(380px, 60vh)" },
};

const Win = ({ id, title, onClose, children, sidebar }) => {
  const sz = WINDOW_SIZES[id] || { w: "min(700px, 92vw)", h: "min(500px, 75vh)" };
  return (
    <div style={{
      background: "rgba(246,246,246,0.94)", backdropFilter: "blur(50px) saturate(200%)",
      WebkitBackdropFilter: "blur(50px) saturate(200%)", borderRadius: 12,
      boxShadow: "0 24px 80px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(0,0,0,0.12)",
      width: sz.w, maxHeight: sz.h, display: "flex", flexDirection: "column", overflow: "hidden",
      animation: "winOpen 0.25s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", padding: "10px 14px",
        borderBottom: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.55)", flexShrink: 0,
      }}>
        <div style={{ display: "flex", gap: 7, marginRight: 14 }}>
          {[["#FF5F57", onClose], ["#FEBC2E", null], ["#28C840", null]].map(([c, fn], i) => (
            <div key={i} onClick={fn} style={{
              width: 12, height: 12, borderRadius: "50%", background: c,
              cursor: fn ? "pointer" : "default", boxShadow: `inset 0 -1px 1px rgba(0,0,0,0.1)`,
            }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, marginRight: 14 }}>
          <span style={{ fontSize: 12, color: "#999", cursor: "default" }}>‹</span>
          <span style={{ fontSize: 12, color: "#999", cursor: "default" }}>›</span>
        </div>
        <div style={{ flex: 1, textAlign: "center", fontSize: 13, fontWeight: 600, color: "#1D1D1F", letterSpacing: "-0.01em" }}>{title}</div>
        <div style={{ width: 70 }} />
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
        {sidebar && (
          <div style={{
            width: 170, borderRight: "1px solid rgba(0,0,0,0.06)", padding: "10px 0",
            background: "rgba(255,255,255,0.35)", overflowY: "auto", flexShrink: 0,
          }}>{sidebar}</div>
        )}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px" }}>{children}</div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════

const Sidebar = ({ active, onNav }) => {
  const items = [
    { id: "about", label: "About Me" }, { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" }, { id: "skills", label: "Skills" },
    { id: "speaking", label: "Speaking" }, { id: "testimonials", label: "Testimonials" },
    { id: "education", label: "Education" },
  ];
  return (
    <div>
      <div style={{ padding: "0 14px 6px", fontSize: 11, fontWeight: 700, color: "#86868B", letterSpacing: "0.05em", textTransform: "uppercase" }}>Documents</div>
      {items.map(f => (
        <div key={f.id} onClick={() => onNav(f.id)} style={{
          padding: "4px 14px", fontSize: 13, margin: "1px 6px", borderRadius: 5, cursor: "default",
          color: active === f.id ? "white" : "#1D1D1F", fontWeight: active === f.id ? 500 : 400,
          background: active === f.id ? "#007AFF" : "transparent", transition: "all 0.1s",
        }}>{f.label}</div>
      ))}
      <div style={{ padding: "10px 14px 6px", fontSize: 11, fontWeight: 700, color: "#86868B", letterSpacing: "0.05em", textTransform: "uppercase" }}>Links</div>
      {[{ l: "GitHub", u: P.github }, { l: "LinkedIn", u: P.linkedin }].map(x => (
        <a key={x.l} href={x.u} target="_blank" rel="noopener noreferrer" style={{
          display: "block", padding: "4px 14px", fontSize: 13, color: "#007AFF",
          textDecoration: "none", margin: "1px 6px", borderRadius: 5,
        }}>{x.l} ↗</a>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// CONTENT VIEWS
// ═══════════════════════════════════════════════════════

const AboutView = () => (
  <div>
    <div style={{ display: "flex", gap: 18, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
      <div style={{
        width: 72, height: 72, borderRadius: 18,
        background: "linear-gradient(135deg, #1a3c5e, #2b6777)", display: "flex",
        alignItems: "center", justifyContent: "center", fontSize: 28, color: "white", fontWeight: 700, flexShrink: 0,
      }}>K</div>
      <div>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1D1D1F" }}>{P.name}</h2>
        <div style={{ fontSize: 13, color: "#86868B", marginTop: 2 }}>{P.title} · {P.location}</div>
        <div style={{ fontSize: 12, color: "#86868B", marginTop: 3 }}>{P.email}</div>
      </div>
    </div>
    <div style={{ fontSize: 24, fontWeight: 800, color: "#1D1D1F", lineHeight: 1.3, marginBottom: 20, whiteSpace: "pre-line", letterSpacing: "-0.02em" }}>{P.tagline}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {P.roles.map((r, i) => (
        <div key={i} style={{ padding: "10px 14px", background: "rgba(0,0,0,0.03)", borderRadius: 8, fontSize: 13.5, color: "#333", borderLeft: "3px solid #007AFF" }}>{r}</div>
      ))}
    </div>
    <div style={{ marginTop: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#86868B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Things I love</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {["building tools", "mentoring", "guest lectures", "observational astronomy", "theater", "clean code", "Next.js", "open source", "teaching kids", "space"].map((t, i) => (
          <span key={i} style={{ padding: "5px 12px", fontSize: 12, background: "rgba(0,122,255,0.06)", color: "#007AFF", borderRadius: 20, fontWeight: 500 }}>{t}</span>
        ))}
      </div>
    </div>
  </div>
);

const ProjectsView = () => {
  const [tab, setTab] = useState("production");
  const tabs = [["production", "Production"], ["personal", "Personal"], ["research", "Research"]];
  return (
    <div>
      <div style={{ display: "flex", gap: 0, marginBottom: 16, background: "rgba(0,0,0,0.04)", borderRadius: 7, padding: 2, width: "fit-content" }}>
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: "5px 14px", fontSize: 12, fontWeight: 500, border: "none", borderRadius: 5, cursor: "default",
            background: tab === id ? "white" : "transparent", color: tab === id ? "#1D1D1F" : "#86868B",
            boxShadow: tab === id ? "0 1px 3px rgba(0,0,0,0.08)" : "none", fontFamily: "inherit",
          }}>{label}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
        {PROJECTS[tab].map((p, i) => (
          <div key={i} style={{
            padding: 14, background: "white", borderRadius: 10, border: "1px solid rgba(0,0,0,0.05)",
            transition: "transform 0.15s, box-shadow 0.15s", cursor: "default",
          }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)"; }}
             onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1D1D1F" }}>{p.name}</div>
            </div>
            <div style={{ fontSize: 11, color: "#007AFF", marginBottom: 5, fontWeight: 500 }}>{p.tech}</div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{p.desc}</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span style={{ fontSize: 11, color: "#aaa" }}>{p.year}</span>
              {p.link && <a href={`https://${p.link}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#007AFF", textDecoration: "none" }}>{p.link} ↗</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExperienceView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {EXPERIENCE.map((e, i) => (
      <div key={i} style={{ padding: 14, background: "white", borderRadius: 10, border: "1px solid rgba(0,0,0,0.05)", borderLeft: `3px solid ${e.color}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: "#1D1D1F" }}>{e.role}</div><div style={{ fontSize: 12, color: "#86868B", marginTop: 2 }}>{e.company}</div></div>
          <div style={{ fontSize: 11, color: "#aaa", fontWeight: 500 }}>{e.period}</div>
        </div>
        <div style={{ marginTop: 8 }}>{e.bullets.map((b, j) => <div key={j} style={{ fontSize: 12.5, color: "#444", lineHeight: 1.5, marginTop: 4 }}>· {b}</div>)}</div>
      </div>
    ))}
  </div>
);

const SkillsView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    {Object.entries(SKILLS).map(([cat, items]) => (
      <div key={cat}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#86868B", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>{cat}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{items.map((s, i) => (
          <span key={i} style={{ padding: "4px 10px", fontSize: 12, background: "rgba(0,122,255,0.06)", color: "#007AFF", borderRadius: 6, fontWeight: 500 }}>{s}</span>
        ))}</div>
      </div>
    ))}
  </div>
);

const SpeakingView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {SPEAKING.map((s, i) => (
      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 12px", background: i % 2 === 0 ? "rgba(0,0,0,0.02)" : "transparent", borderRadius: 7 }}>
        <div style={{ padding: "2px 8px", fontSize: 10, fontWeight: 600, background: s.bg, color: "white", borderRadius: 4, flexShrink: 0, marginTop: 2, minWidth: 50, textAlign: "center" }}>{s.type}</div>
        <div><div style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>{s.event}</div><div style={{ fontSize: 11, color: "#86868B", marginTop: 1 }}>{s.venue} · {s.year}</div></div>
      </div>
    ))}
  </div>
);

const TestimonialsView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {TESTIMONIALS.map((t, i) => (
      <div key={i} style={{ padding: 14, background: "white", borderRadius: 10, border: "1px solid rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 13, color: "#333", lineHeight: 1.6, fontStyle: "italic" }}>"{t.q}"</div>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: `hsl(${i * 67}, 55%, 60%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", fontWeight: 600 }}>{t.n[0]}</div>
          <div><div style={{ fontSize: 12, fontWeight: 600, color: "#1D1D1F" }}>{t.n}</div><div style={{ fontSize: 11, color: "#86868B" }}>{t.r}, {t.c}</div></div>
        </div>
      </div>
    ))}
  </div>
);

const EducationView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {[{ d: "Master of Computer Application", s: "University of Madras", p: "2023 — 2025" }, { d: "BSc Physics", s: "Loyola College, Chennai", p: "2020 — 2023" }].map((e, i) => (
      <div key={i} style={{ padding: 14, background: "white", borderRadius: 10, border: "1px solid rgba(0,0,0,0.05)", borderLeft: "3px solid #5856D6" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#1D1D1F" }}>{e.d}</div>
        <div style={{ fontSize: 12, color: "#86868B", marginTop: 3 }}>{e.s} · {e.p}</div>
      </div>
    ))}
  </div>
);

const VIEWS = {
  about: { C: AboutView, t: "About Me" }, projects: { C: ProjectsView, t: "Projects" },
  experience: { C: ExperienceView, t: "Experience" }, skills: { C: SkillsView, t: "Skills" },
  speaking: { C: SpeakingView, t: "Speaking & Mentoring" }, testimonials: { C: TestimonialsView, t: "Testimonials" },
  education: { C: EducationView, t: "Education" },
};

// ═══════════════════════════════════════════════════════
// DOCK
// ═══════════════════════════════════════════════════════

const DockIcon = ({ children, label, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", cursor: "default", transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)", transform: hov ? "translateY(-10px) scale(1.25)" : "" }}>
      {hov && <div style={{ position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)", padding: "3px 10px", background: "rgba(40,40,40,0.9)", borderRadius: 5, fontSize: 11, color: "white", whiteSpace: "nowrap", fontWeight: 500 }}>{label}</div>}
      {children}
    </div>
  );
};

const DockSvg = ({ bg, children, size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none"><rect width="44" height="44" rx="10" fill={bg} />{children}</svg>
);

// ═══════════════════════════════════════════════════════
// DESKTOP FOLDER ICONS
// ═══════════════════════════════════════════════════════

const DesktopFolder = ({ label, color, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 76, padding: 5, borderRadius: 8, cursor: "default", background: hov ? "rgba(255,255,255,0.08)" : "transparent", transition: "background 0.15s" }}>
      <svg width={52} height={52} viewBox="0 0 64 64" fill="none">
        <path d="M8 16C8 13.8 9.8 12 12 12H26L30 18H52C54.2 18 56 19.8 56 22V48C56 50.2 54.2 52 52 52H12C9.8 52 8 50.2 8 48V16Z" fill={color} />
        <path d="M8 24H56V48C56 50.2 54.2 52 52 52H12C9.8 52 8 50.2 8 48V24Z" fill={color} opacity="0.8" />
        <path d="M8 24H56V27H8Z" fill="white" opacity="0.12" />
      </svg>
      <span style={{ fontSize: 11, color: "white", textShadow: "0 1px 4px rgba(0,0,0,0.6)", textAlign: "center", marginTop: 3, lineHeight: 1.2 }}>{label}</span>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════

export default function App() {
  const [active, setActive] = useState(null);
  const [time, setTime] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const u = () => setTime(new Date().toLocaleTimeString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" }));
    u(); const id = setInterval(u, 30000); return () => clearInterval(id);
  }, []);

  const handleAction = useCallback((a) => {
    if (a.startsWith("open:")) setActive(a.slice(5));
    else if (a === "email-copied") setToast("Email copied!");
    else if (a === "url-copied") setToast("URL copied!");
    else if (a === "copied") setToast("Portfolio link copied!");
    else if (a === "resume") setToast("Resume download coming soon");
  }, []);

  const V = active && VIEWS[active];

  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
      background: "linear-gradient(140deg, #0f0c29 0%, #1a1a3e 30%, #24243e 50%, #0f3460 80%, #1a1a2e 100%)",
      display: "flex", flexDirection: "column", position: "relative", userSelect: "none",
    }}>
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      <MenuBar onAction={handleAction} time={time} />

      {/* Desktop */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <DesktopStickers />

        {/* Desktop folders — right column */}
        <div style={{ position: "absolute", right: 16, top: 16, display: "flex", flexDirection: "column", gap: 4, zIndex: 10 }}>
          {[
            { id: "about", label: "About Me", color: "#64ADEF" },
            { id: "projects", label: "Projects", color: "#30D158" },
            { id: "experience", label: "Experience", color: "#FF9500" },
            { id: "skills", label: "Skills", color: "#5856D6" },
            { id: "speaking", label: "Speaking", color: "#AF52DE" },
            { id: "testimonials", label: "Testimonials", color: "#FFCC02" },
            { id: "education", label: "Education", color: "#FF2D55" },
          ].map(f => <DesktopFolder key={f.id} {...f} onClick={() => setActive(f.id)} />)}
        </div>

        {/* Welcome — shown when no window open */}
        {!active && (
          <div style={{ position: "absolute", left: "6%", top: "50%", transform: "translateY(-50%)", maxWidth: 460, animation: "fadeUp 0.5s ease-out", zIndex: 5 }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>Welcome to</div>
            <h1 style={{
              fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800, color: "white", margin: 0,
              lineHeight: 1.0, letterSpacing: "-0.04em",
            }}>
              Krishna's<br />
              <span style={{
                background: "linear-gradient(90deg, #64ADEF 0%, #AF52DE 50%, #FF6482 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Desktop</span>
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginTop: 14, lineHeight: 1.65, whiteSpace: "pre-line" }}>
              {P.tagline}
            </p>
            <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {P.roles.map((r, i) => (
                <span key={i} style={{
                  padding: "5px 12px", fontSize: 12, borderRadius: 20, fontWeight: 500,
                  background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>{r}</span>
              ))}
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
              <button onClick={() => setActive("about")} style={{
                padding: "8px 20px", fontSize: 13, fontWeight: 600, background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "white",
                cursor: "default", fontFamily: "inherit", backdropFilter: "blur(10px)",
              }}>About Me</button>
              <button onClick={() => setActive("projects")} style={{
                padding: "8px 20px", fontSize: 13, fontWeight: 600, background: "#007AFF",
                border: "none", borderRadius: 8, color: "white", cursor: "default", fontFamily: "inherit",
              }}>View Projects</button>
            </div>
          </div>
        )}

        {/* Finder window */}
        {V && (
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-55%, -50%)", zIndex: 50 }}>
            <Win id={active} title={V.t} onClose={() => setActive(null)} sidebar={<Sidebar active={active} onNav={setActive} />}>
              <V.C />
            </Win>
          </div>
        )}
      </div>

      {/* Dock */}
      <div style={{
        position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)",
        display: "flex", alignItems: "flex-end", gap: 3, padding: "5px 8px",
        background: "rgba(255,255,255,0.1)", backdropFilter: "blur(30px) saturate(180%)",
        WebkitBackdropFilter: "blur(30px) saturate(180%)", borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)", zIndex: 100,
      }}>
        <DockIcon label="About Me" onClick={() => setActive("about")}>
          <DockSvg bg="#1D1D1F"><text x="22" y="27" textAnchor="middle" fontSize="20" fill="white" fontFamily="system-ui">K</text></DockSvg>
        </DockIcon>
        <DockIcon label="Projects" onClick={() => setActive("projects")}>
          <DockSvg bg="#007AFF"><path d="M12 14H32V30H12Z" fill="white" opacity="0.9" /><path d="M14 18H30M14 22H26" stroke="#007AFF" strokeWidth="1.5" /></DockSvg>
        </DockIcon>
        <DockIcon label="Terminal" onClick={() => setActive("skills")}>
          <DockSvg bg="#1E1E1E"><path d="M12 28L18 22L12 16" stroke="#30D158" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><line x1="22" y1="28" x2="32" y2="28" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" /></DockSvg>
        </DockIcon>
        <DockIcon label="Calendar" onClick={() => setActive("speaking")}>
          <DockSvg bg="white"><rect x="4" y="4" width="36" height="11" rx="5" fill="#FF3B30" /><text x="22" y="13" textAnchor="middle" fontSize="8" fill="white" fontWeight="700" fontFamily="system-ui">APR</text><text x="22" y="35" textAnchor="middle" fontSize="17" fill="#1D1D1F" fontWeight="300" fontFamily="system-ui">10</text></DockSvg>
        </DockIcon>
        <DockIcon label="Notes" onClick={() => setActive("testimonials")}>
          <DockSvg bg="#FFCC02"><rect x="8" y="8" width="28" height="28" rx="4" fill="white" /><rect x="12" y="14" width="18" height="1.5" rx="1" fill="#ddd" /><rect x="12" y="19" width="14" height="1.5" rx="1" fill="#ddd" /><rect x="12" y="24" width="16" height="1.5" rx="1" fill="#ddd" /></DockSvg>
        </DockIcon>
        <DockIcon label="Safari" onClick={() => window.open(`https://${P.website}`, "_blank")}>
          <DockSvg bg="#007AFF"><circle cx="22" cy="22" r="12" stroke="white" strokeWidth="1.5" fill="none" /><path d="M22 10L25 19L34 22L25 25L22 34L19 25L10 22L19 19Z" fill="white" opacity="0.8" /></DockSvg>
        </DockIcon>
        <DockIcon label="Mail" onClick={() => window.open(`mailto:${P.email}`)}>
          <DockSvg bg="#007AFF"><rect x="9" y="13" width="26" height="18" rx="3" fill="white" opacity="0.9" /><path d="M9 16L22 24L35 16" stroke="#007AFF" strokeWidth="2" fill="none" /></DockSvg>
        </DockIcon>
        <div style={{ width: 1, height: 30, background: "rgba(255,255,255,0.15)", margin: "0 3px" }} />
        <DockIcon label="GitHub" onClick={() => window.open(P.github, "_blank")}>
          <DockSvg bg="#1D1D1F"><path d="M22 10C15.4 10 10 15.4 10 22c0 5.3 3.4 9.8 8.2 11.2.6.1.8-.3.8-.6v-2.2c-3.3.7-4-.6-4-1.5-.5-1.2-1.3-1.5-1.3-1.5-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.7 2.9 1.2 3.6.9.1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.8 0-1.2.5-2.2 1.2-2.9-.1-.3-.6-1.5.1-3 0 0 1-.3 3.3 1.1.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.4 3.3-1.1 3.3-1.1.7 1.5.2 2.7.1 3 .7.7 1.1 1.7 1.1 2.9 0 4.5-2.8 5.5-5.5 5.8.5.4.9 1.1.9 2.3v3.1c0 .3.2.7.8.6C30.6 31.8 34 27.3 34 22c.2-6.6-5.2-12-11.8-12z" fill="white" /></DockSvg>
        </DockIcon>
        <DockIcon label="LinkedIn" onClick={() => window.open(P.linkedin, "_blank")}>
          <DockSvg bg="#0A66C2"><path d="M15 18h3v12h-3V18zm1.5-5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM20 18h3v1.5c.5-.8 1.7-1.8 3.5-1.8 3.5 0 4 2.3 4 5.3v7h-3v-6.5c0-1.5 0-3.5-2-3.5s-2.5 1.5-2.5 3v7h-3V18z" fill="white" /></DockSvg>
        </DockIcon>
      </div>

      <style>{`
        @keyframes winOpen { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes menuDrop { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(0,0,0,0.12); border-radius:3px; }
      `}</style>
    </div>
  );
}
