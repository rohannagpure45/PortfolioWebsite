interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  minH?: string;
}

export default function PageHero({ eyebrow, title, subtitle, minH = "40vh" }: PageHeroProps) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: minH,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(7,7,6,.42)", zIndex: 1 }} />
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
        <p className="eyebrow" style={{ marginBottom: 10 }}>
          {eyebrow}
        </p>
        <h1
          style={{
            fontSize: "clamp(2.2rem,5vw,3.6rem)",
            fontWeight: 700,
            color: "#faf9f5",
            letterSpacing: "-.02em",
            marginBottom: 12,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              color: "rgba(176,174,165,.78)",
              fontFamily: "var(--font-lora), Georgia, serif",
              fontSize: "1rem",
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
