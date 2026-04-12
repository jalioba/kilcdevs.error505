import styles from './Orbs.module.css';

export function Orbs() {
  return (
    <>
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
    </>
  );
}
