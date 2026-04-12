import styles from './Navbar.module.css';

export function Navbar() {
  return (
    <>
      <div className={styles.brandBadge}>
        KILC<span className={styles.brandAccent}>devs</span>
      </div>
      <div className={styles.liveBadge}>Incident live</div>
    </>
  );
}
