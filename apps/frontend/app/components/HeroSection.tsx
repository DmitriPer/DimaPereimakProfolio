import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>&gt; Full Stack Developer · Available</p>
        <h1 className={styles.headline}>
          I got into a dev team through QA.
          <br />
          Then I shipped production code.
        </h1>
        <p className={styles.subtitle}>
          Dima Pereimak — Next.js, NestJS, TypeScript.
          Four years building real features in a live dev environment.
        </p>
        <div className={styles.ctaGroup}>
          <a href="#contact" className={styles.ctaPrimary}>
            Let&apos;s talk
          </a>
          <a
            href="/cv.pdf"
            className={styles.ctaSecondary}
            aria-label="Download CV as PDF"
            download
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
