import { useEffect } from 'react';
import { Orbs } from '../../components/Orbs/Orbs';
import { ParticlesCanvas } from '../../components/ParticlesCanvas/ParticlesCanvas';
import { Navbar } from '../../components/Navbar/Navbar';
import { RobotSVG } from '../../components/RobotSVG/RobotSVG';
import { Terminal } from '../../components/Terminal/Terminal';
import { Footer } from '../../components/Footer/Footer';
import styles from './Error500.module.css';

export function Error500Page() {
  // Press R to reload
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
        location.reload();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <Orbs />
      <ParticlesCanvas />
      <Navbar />

      <main className={styles.wrapper}>
        <RobotSVG />

        <div className={styles.code500}>500</div>
        <div className={styles.errorTag}>Internal Server Error</div>

        <h1 className={styles.errorTitle}>/* - - Наш сервер немного сломался - - */</h1>
        <p className={styles.errorSub}>
          document.querySelector('.class-name').innerHTML = <br />
          "Что-то пошло не так на нашей стороне — не на вашей<br />
          Команда уже занимается этим. Попробуйте снова через ERROR"
        </p>

        <Terminal />

        {/* Buttons */}
        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => location.reload()}
            aria-label="Попробовать снова"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Попробовать снова
          </button>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => history.back()}
            aria-label="Вернуться назад"
          >
            ← Вернуться назад
          </button>
          <a href="/" className={`${styles.btn} ${styles.btnSecondary}`} aria-label="На главную">
            На главную
          </a>
        </div>

        {/* Status strip */}
        <div className={styles.statusStrip} aria-label="Статус систем">
          <div className={styles.statusItem}>
            <div className={`${styles.statusDot} ${styles.dotRed}`} />
            API — нету
          </div>
          <div className={styles.statusItem}>
            <div className={`${styles.statusDot} ${styles.dotGreen}`} />
            CDN — работает
          </div>
          <div className={styles.statusItem}>
            <div className={`${styles.statusDot} ${styles.dotAmber}`} />
            База данных — не куплена
          </div>
        </div>

        <div className={styles.divider} />
      </main>

      <Footer />
    </>
  );
}
