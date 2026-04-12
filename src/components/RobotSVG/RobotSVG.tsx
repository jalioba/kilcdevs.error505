import styles from './RobotSVG.module.css';

export function RobotSVG() {
  return (
    <div className={styles.robotWrap}>
      <div className={styles.pulseRing} />
      <div className={styles.pulseRing} />
      <div className={styles.pulseRing} />

      <div className={styles.robotContainer}>
        <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="64" cy="64" r="60" fill="rgba(83,74,183,0.10)" stroke="rgba(175,169,236,0.2)" strokeWidth="0.5" />
          <rect x="34" y="38" width="60" height="44" rx="12" fill="rgba(83,74,183,0.28)" stroke="rgba(175,169,236,0.45)" strokeWidth="0.8" />
          {/* Screen glare */}
          <rect x="36" y="40" width="26" height="14" rx="3" fill="rgba(255,255,255,0.04)" />
          {/* Left eye socket */}
          <circle cx="50" cy="58" r="9" fill="#08080f" />
          {/* Right eye socket */}
          <circle cx="78" cy="58" r="9" fill="#08080f" />
          {/* Left eye glow */}
          <circle cx="50" cy="58" r="5.5" fill="#D85A30" />
          <circle cx="78" cy="58" r="5.5" fill="#D85A30" />
          {/* Eye highlights */}
          <circle cx="51.5" cy="56.5" r="2" fill="rgba(255,210,180,0.85)" />
          <circle cx="79.5" cy="56.5" r="2" fill="rgba(255,210,180,0.85)" />
          {/* Sad mouth */}
          <path d="M53 72 Q64 79 75 72" stroke="rgba(175,169,236,0.5)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Neck */}
          <rect x="57" y="30" width="14" height="10" rx="5" fill="rgba(83,74,183,0.35)" stroke="rgba(175,169,236,0.3)" strokeWidth="0.5" />
          {/* Head antenna */}
          <line x1="64" y1="30" x2="64" y2="23" stroke="rgba(175,169,236,0.5)" strokeWidth="1.2" />
          <circle cx="64" cy="21" r="3.5" fill="rgba(29,158,117,0.7)" stroke="rgba(29,158,117,0.3)" strokeWidth="0.5" />
          {/* Left arm */}
          <rect x="26" y="45" width="8" height="18" rx="4" fill="rgba(83,74,183,0.22)" stroke="rgba(175,169,236,0.28)" strokeWidth="0.5" />
          {/* Right arm */}
          <rect x="94" y="45" width="8" height="18" rx="4" fill="rgba(83,74,183,0.22)" stroke="rgba(175,169,236,0.28)" strokeWidth="0.5" />
          {/* Legs */}
          <rect x="45" y="82" width="13" height="16" rx="4" fill="rgba(83,74,183,0.22)" stroke="rgba(175,169,236,0.28)" strokeWidth="0.5" />
          <rect x="70" y="82" width="13" height="16" rx="4" fill="rgba(83,74,183,0.22)" stroke="rgba(175,169,236,0.28)" strokeWidth="0.5" />
          {/* Chest detail */}
          <rect x="56" y="52" width="16" height="6" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(175,169,236,0.15)" strokeWidth="0.5" />
          <rect x="58" y="54" width="4" height="2" rx="1" fill="rgba(216,90,48,0.6)" />
          <rect x="64" y="54" width="4" height="2" rx="1" fill="rgba(83,74,183,0.6)" />
          {/* Spark-error lines */}
          <path d="M38 40 L28 30" stroke="rgba(216,90,48,0.55)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M90 40 L100 30" stroke="rgba(216,90,48,0.55)" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="26" cy="28" r="4" fill="rgba(216,90,48,0.75)" />
          <circle cx="102" cy="28" r="4" fill="rgba(216,90,48,0.75)" />
        </svg>
      </div>
    </div>
  );
}
