import type { Project } from '@portfolio/types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, techStack, githubUrl, liveUrl, architectureNotes, category } =
    project;

  return (
    <article className={styles.card}>
      <span className={styles.category}>{category}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.techStack} aria-label="Tech stack">
        {techStack.map((tech) => (
          <li key={tech} className={styles.tech}>
            {tech}
          </li>
        ))}
      </ul>
      <details className={styles.accordion}>
        <summary className={styles.accordionSummary}>Architecture notes</summary>
        <p className={styles.accordionBody}>{architectureNotes}</p>
      </details>
      <div className={styles.links}>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${title} on GitHub`}
          className={styles.link}
        >
          GitHub
        </a>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} live demo`}
            className={styles.link}
          >
            Live demo
          </a>
        )}
      </div>
    </article>
  );
}
