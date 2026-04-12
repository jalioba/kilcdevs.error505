import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  da: number;
}

const COLORS = [
  'rgba(83,74,63,',
  'rgba(175,169,236,',
  'rgba(29,158,117,',
  'rgba(216,90,48,',
  'rgba(255,255,255,',
];

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    const particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function mkP(): Particle {
      return {
        x: rand(0, W), y: rand(0, H),
        r: rand(0.8, 2.8),
        vx: rand(-0.6, 0.6), vy: rand(-0.6, 0.6),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: rand(0.2, 0.65),
        da: rand(-0.003, 0.003),
      };
    }

    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 55; i++) particles.push(mkP());

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.alpha = Math.max(0.08, Math.min(0.7, p.alpha + p.da));
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [canvasRef]);
}
