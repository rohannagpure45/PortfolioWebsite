"use client";

import { useEffect, useRef } from "react";

interface ChromeShaderProps {
  intensity?: number;
}

export default function ChromeShader({ intensity = 1.0 }: ChromeShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * Math.min(window.devicePixelRatio, 2);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (!canvas || !ctx) return;
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      const W = canvas.width;
      const H = canvas.height;
      const t = tRef.current;
      tRef.current += 0.003;

      ctx.fillStyle = "#070706";
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      const blobs = [
        { bx: 0.25 + 0.22 * Math.sin(t * 0.33), by: 0.35 + 0.22 * Math.cos(t * 0.27), r: 0.55, a: 0.16 * intensity },
        { bx: 0.72 + 0.16 * Math.cos(t * 0.37), by: 0.55 + 0.18 * Math.sin(t * 0.31), r: 0.5, a: 0.13 * intensity },
        { bx: 0.5 + 0.26 * Math.sin(t * 0.42 + 1), by: 0.22 + 0.26 * Math.cos(t * 0.36 + 1), r: 0.42, a: 0.11 * intensity },
        { bx: 0.12 + 0.1 * Math.cos(t * 0.28), by: 0.7 + 0.18 * Math.sin(t * 0.33), r: 0.38, a: 0.09 * intensity },
        { bx: 0.87 + 0.1 * Math.sin(t * 0.45 + 2), by: 0.42 + 0.2 * Math.cos(t * 0.37 + 2), r: 0.34, a: 0.09 * intensity },
      ];
      blobs.forEach((b) => {
        const x = b.bx * W;
        const y = b.by * H;
        const r = b.r * Math.min(W, H);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(225,220,210,${b.a})`);
        g.addColorStop(0.35, `rgba(185,180,170,${b.a * 0.38})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      const ax = 0.6 + 0.22 * Math.cos(t * 0.3 + 0.5);
      const ay = 0.72 + 0.14 * Math.sin(t * 0.35 + 0.5);
      const ag = ctx.createRadialGradient(ax * W, ay * H, 0, ax * W, ay * H, 0.38 * Math.min(W, H));
      ag.addColorStop(0, `rgba(217,119,87,${0.075 * intensity})`);
      ag.addColorStop(1, "transparent");
      ctx.fillStyle = ag;
      ctx.fillRect(0, 0, W, H);

      [
        { bx: 0.38 + 0.3 * Math.sin(t * 0.5), by: 0.3 + 0.28 * Math.cos(t * 0.44), r: 0.1, a: 0.42 },
        { bx: 0.64 + 0.22 * Math.cos(t * 0.54 + 1), by: 0.58 + 0.2 * Math.sin(t * 0.48 + 1), r: 0.07, a: 0.3 },
        { bx: 0.2 + 0.15 * Math.sin(t * 0.41 + 2), by: 0.48 + 0.28 * Math.cos(t * 0.37 + 2), r: 0.055, a: 0.2 },
      ].forEach((s) => {
        const x = s.bx * W;
        const y = s.by * H;
        const r = s.r * Math.min(W, H);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(255,255,255,${s.a * intensity})`);
        g.addColorStop(0.35, `rgba(255,255,255,${s.a * 0.1 * intensity})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      ctx.restore();

      const v = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.72);
      v.addColorStop(0, "transparent");
      v.addColorStop(1, "rgba(0,0,0,.58)");
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
