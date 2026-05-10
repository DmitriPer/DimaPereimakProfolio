import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import NavObserver from './NavObserver';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <Link href="/" className={styles.logo} aria-label="Dima Pereimak — home">
        DP
      </Link>
      <ul className={styles.navLinks}>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className={styles.actions}>
        <a
          href="/cv.pdf"
          className={styles.cvLink}
          aria-label="Download CV as PDF"
          download
        >
          Download CV
        </a>
        <ThemeToggle />
      </div>
      <NavObserver />
    </nav>
  );
}
