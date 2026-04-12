import { useRef } from 'react';
import styles from './ParticlesCanvas.module.css';
import { useParticles } from '../../hooks/useParticles';

export function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);
  return <canvas ref={canvasRef} className={styles.canvas} />;
}
