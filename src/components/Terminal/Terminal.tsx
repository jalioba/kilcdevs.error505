import { useTerminalAnimation } from '../../hooks/useScramble';
import styles from './Terminal.module.css';

export function Terminal() {
  const lines = useTerminalAnimation();

  return (
    <div className={styles.terminal} role="region" aria-label="Лог сервера">
      <div className={styles.tBar}>
        <div className={`${styles.tDot} ${styles.tDotR}`} />
        <div className={`${styles.tDot} ${styles.tDotY}`} />
        <div className={`${styles.tDot} ${styles.tDotG}`} />
        <span className={styles.tTitle}>server.log — bash</span>
      </div>

      {lines.map(line => {
        if (!line.visible) return null;

        if (line.type === 'cursor') {
          return (
            <div key={line.id} className={styles.tLine} style={{ display: 'flex' }}>
              <span className={styles.tPrompt}>$</span>
              <span className={styles.cursor} />
            </div>
          );
        }

        const isCmd = line.type === 'cmd';

        return (
          <div key={line.id} className={styles.tLine}>
            {isCmd && <span className={styles.tPrompt}>$</span>}
            <span className={styles[`t-${line.type}` as keyof typeof styles] || styles.tCmd}>
              {line.text ?? line.final}
            </span>
          </div>
        );
      })}
    </div>
  );
}
