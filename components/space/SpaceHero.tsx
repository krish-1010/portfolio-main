"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Profile } from "@/types";

interface Props {
  profile: Profile;
}

export default function SpaceHero({ profile }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      el.style.opacity = `${1 - window.scrollY / 600}`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "clamp(80px, 12vh, 140px) clamp(16px, 6vw, 80px) 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div ref={ref} style={{ maxWidth: 740, position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#4F9CF7",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 16,
            fontFamily: "var(--font-jetbrains)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4F9CF7",
              boxShadow: "0 0 8px #4F9CF7",
              animation: "pulse 2s infinite",
            }}
          />
          Hello! I'm
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(52px, 9vw, 96px)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "white",
            margin: "0 0 8px",
          }}
        >
          {profile.name.split(" ")[0]}
          <span>&nbsp;</span>
          <span
            style={{
              background:
                "linear-gradient(135deg, #4F9CF7 0%, #9B70F9 60%, #FF6482 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {profile.name.split(" ")[1]}
          </span>
        </h1>

        {/* Title */}
        <div
          style={{
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "var(--font-inter)",
            marginBottom: 28,
            letterSpacing: "0.02em",
          }}
        >
          {profile.title} · {profile.location}
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "clamp(20px, 3.5vw, 32px)",
            fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.4,
            whiteSpace: "pre-line",
            fontFamily: "var(--font-space-grotesk)",
            marginBottom: 36,
            letterSpacing: "-0.01em",
          }}
        >
          {profile.tagline}
        </p>

        {/* Role chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 40,
          }}
        >
          {profile.roles.map((r, i) => (
            <span
              key={i}
              style={{
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 20,
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {r}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
          }}
        >
          <a
            href="#projects"
            className="btn-primary"
            style={{ textDecoration: "none" }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="btn-glow"
            style={{ textDecoration: "none" }}
          >
            Get in Touch
          </a>
          <Link
            href="/desktop"
            style={{
              padding: "10px 18px",
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "color 0.15s",
              fontFamily: "var(--font-inter)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.85)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.5)")
            }
          >
            <span style={{ fontSize: 14 }}>🖥</span> macOS Desktop
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: 0.35,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "var(--font-jetbrains)",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
