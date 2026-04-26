"use client";

import GlassCard from "@/components/chrome/GlassCard";

const experiences = [
  {
    company: "Link Ventures",
    role: "Software Engineer",
    period: "Cambridge, MA · Jul 2025 – Dec 2025",
    bullets: [
      "Architected AI-accelerated full-stack project for venture accelerator, collaborating with and learning from both technical and entrepreneurial industry veterans.",
      "Mastered context engineering, Git workflows, and deployment pipelines for multiple concurrent projects.",
      "Built and maintained 5+ microservices on Kubernetes/GCP handling 1000+ daily requests with 99.9% uptime.",
    ],
  },
  {
    company: "Speekr",
    role: "Software Engineer",
    period: "Cypress, TX · Oct 2024 – Feb 2025",
    bullets: [
      "Engineered real-time subtitle generation by integrating the Agentic RAG framework with an STT service.",
      "Model refinement boosted caption accuracy by 7% and reduced transcription delays by 11%.",
      "Assisted in deploying scalable cloud solutions with Docker and AWS, improving reliability.",
      "Collaborated with cross-functional teams using Flask, Node.js, and REST APIs to optimize subtitle workflows.",
    ],
  },
  {
    company: "Northeastern Electric Racing",
    role: "Software Developer",
    period: "January 2025 – Present",
    bullets: [
      "Developed and maintained FinishLine, a full-stack project management dashboard utilizing TypeScript, React, Express, and Node.js.",
      "Implemented containerization with Docker for scalable, consistent development and production environments.",
      "Managed version control and CI/CD pipelines using Git, reducing merge conflicts by 20%.",
    ],
  },
  {
    company: "Light Co.",
    role: "Founder, e-Commerce Business",
    period: "May 2022 – February 2023",
    bullets: [
      "Achieved $9,000 in revenue with strong profit margins.",
      "Successfully managed global supply chain relationships.",
      "Optimized online storefront for enhanced user experience.",
    ],
  },
];

const skills: Record<string, string[]> = {
  "Languages & Frameworks": ["Java", "C++", "Python", "TypeScript", "React", "Next.js", "Node.js", "SQL"],
  "Tools & Platforms": ["VSC", "IntelliJ", "Linux", "Git", "Figma", "Docker", "AWS", "GCP"],
  "Soft Skills": ["Leadership", "Public Speaking", "Problem Solving", "Team Collaboration", "Agile"],
};

const coursework = [
  "Object-Oriented Design",
  "Foundations of Data Science",
  "Cybersecurity",
  "Algorithms & Data Structures",
  "Financial Accounting",
  "Financial Management",
  "CS Research",
];

const clubs = [
  "AI Club",
  "Quant Club",
  "CTF Cybersecurity Club",
  "Northeastern Electric Racing",
  "Disrupt",
  "Data Science Club",
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "46vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "rgba(7,7,6,.44)", zIndex: 1 }} />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 24px",
            opacity: 0,
            animation: "fadeUp .6s ease both",
            animationDelay: ".1s",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.4rem,5.5vw,4rem)",
              fontWeight: 700,
              color: "#faf9f5",
              letterSpacing: "-.02em",
              marginBottom: 10,
            }}
          >
            Rohan Nagpure
          </h1>
          <p
            style={{
              color: "rgba(176,174,165,.78)",
              fontFamily: "var(--font-lora), Georgia, serif",
              fontSize: "1rem",
              marginBottom: 30,
            }}
          >
            CS &amp; Business Administration · Fintech Focus · Northeastern University
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn btn-p" href="mailto:nagpure.r@northeastern.edu">
              Email Me
            </a>
            <a
              className="btn btn-o"
              href="https://linkedin.com/in/rohan-nagpure/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="btn btn-o"
              href="https://github.com/rohannagpure45"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "0 28px 80px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {/* Education */}
        <GlassCard style={{ padding: "30px 34px" }}>
          <p className="eyebrow" style={{ marginBottom: 10 }}>
            Education
          </p>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#faf9f5", marginBottom: 4 }}>
            Northeastern University
          </h3>
          <p
            style={{
              color: "rgba(176,174,165,.8)",
              fontFamily: "var(--font-lora), Georgia, serif",
            }}
          >
            B.S. Computer Science &amp; Business Administration
          </p>
          <p style={{ color: "rgba(176,174,165,.5)", fontSize: ".82rem", marginBottom: 14 }}>
            Expected December 2026 · Fintech Concentration
          </p>
          <p
            style={{
              color: "rgba(176,174,165,.75)",
              fontFamily: "var(--font-lora), Georgia, serif",
              fontSize: ".9rem",
              lineHeight: 1.72,
            }}
          >
            Passionate about applying computer science skills to solve complex financial problems.
            Building at the intersection of technology and markets.
          </p>
        </GlassCard>

        {/* Skills */}
        <GlassCard style={{ padding: "30px 34px" }}>
          <p className="eyebrow" style={{ marginBottom: 10 }}>
            Technical Skills
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
              gap: 20,
              marginTop: 6,
            }}
          >
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat}>
                <p
                  style={{
                    fontSize: ".68rem",
                    color: "#d97757",
                    fontWeight: 500,
                    marginBottom: 10,
                    letterSpacing: ".06em",
                  }}
                >
                  {cat}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {items.map((s) => (
                    <span key={s} className="bn">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Coursework */}
        <GlassCard style={{ padding: "28px 34px" }}>
          <p className="eyebrow" style={{ marginBottom: 10 }}>
            Relevant Coursework
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
            {coursework.map((c) => (
              <span key={c} className="bn">
                {c}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Experience timeline */}
        <div>
          <p className="eyebrow" style={{ marginBottom: 10 }}>
            Experience
          </p>
          <div
            style={{
              position: "relative",
              paddingLeft: 28,
              borderLeft: "1.5px solid rgba(176,174,165,.14)",
              marginTop: 14,
            }}
          >
            {experiences.map((exp, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 20 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -36,
                    top: 7,
                    width: 14,
                    height: 14,
                    background: "#d97757",
                    borderRadius: "50%",
                    border: "3px solid #080807",
                    boxShadow: "0 0 0 3px rgba(217,119,87,.15)",
                  }}
                />
                <GlassCard style={{ marginLeft: 14, padding: "22px 26px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <div>
                      <h3 style={{ fontWeight: 600, color: "#faf9f5", marginBottom: 2 }}>
                        {exp.company}
                      </h3>
                      <p style={{ fontSize: ".85rem", color: "#d97757", fontWeight: 500 }}>
                        {exp.role}
                      </p>
                    </div>
                    <span className="bd" style={{ alignSelf: "flex-start" }}>
                      {exp.period}
                    </span>
                  </div>
                  {exp.bullets.map((b, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        gap: 8,
                        color: "rgba(176,174,165,.74)",
                        fontSize: ".84rem",
                        lineHeight: 1.65,
                        marginBottom: 5,
                        fontFamily: "var(--font-lora), Georgia, serif",
                      }}
                    >
                      <span style={{ color: "#d97757", flexShrink: 0, fontFamily: "inherit" }}>→</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <GlassCard style={{ padding: "28px 34px" }}>
          <p className="eyebrow" style={{ marginBottom: 10 }}>
            Activities &amp; Clubs
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
            {clubs.map((c) => (
              <span key={c} className="bn">
                {c}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
