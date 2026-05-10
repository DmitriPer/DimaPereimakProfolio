import { readFileSync } from 'fs';
import { join } from 'path';

const frontendRoot = join(__dirname, '../');
const read = (rel: string) => readFileSync(join(frontendRoot, rel), 'utf-8');

describe('Story 3.3 — ProjectCard Component', () => {
  let cardSrc: string;
  let cardCss: string;

  beforeAll(() => {
    cardSrc = read('app/components/ProjectCard.tsx');
    cardCss = read('app/components/ProjectCard.module.css');
  });

  describe('server component — no client directive', () => {
    it('has no "use client" directive', () => {
      expect(cardSrc).not.toContain("'use client'");
      expect(cardSrc).not.toContain('"use client"');
    });
  });

  describe('types and props', () => {
    it('imports Project type from @portfolio/types', () => {
      expect(cardSrc).toContain("from '@portfolio/types'");
      expect(cardSrc).toContain('Project');
    });

    it('accepts a project prop', () => {
      expect(cardSrc).toContain('project');
    });
  });

  describe('card content — FR8, FR9, FR10, FR13', () => {
    it('renders a category tag element', () => {
      expect(cardSrc).toContain('category');
    });

    it('renders a title heading', () => {
      expect(cardSrc).toContain('<h3');
      expect(cardSrc).toContain('title');
    });

    it('renders description text', () => {
      expect(cardSrc).toContain('description');
    });

    it('renders tech stack items in context (list, not isolated badges)', () => {
      expect(cardSrc).toContain('techStack');
      expect(cardSrc).toContain('.map(');
    });
  });

  describe('architecture accordion — FR12, UX-DR6', () => {
    it('uses native <details> element', () => {
      expect(cardSrc).toContain('<details');
    });

    it('uses native <summary> element', () => {
      expect(cardSrc).toContain('<summary');
    });

    it('<details> has no name attribute — multi-open allowed', () => {
      expect(cardSrc).not.toMatch(/<details[^>]+name=/);
    });

    it('renders architectureNotes inside the accordion', () => {
      expect(cardSrc).toContain('architectureNotes');
    });
  });

  describe('links — FR11, UX-DR14', () => {
    it('renders GitHub link with target="_blank"', () => {
      expect(cardSrc).toContain('githubUrl');
      expect(cardSrc).toContain('target="_blank"');
    });

    it('GitHub link has aria-label containing "on GitHub"', () => {
      expect(cardSrc).toContain('on GitHub');
      expect(cardSrc).toContain('aria-label');
    });

    it('GitHub link has rel="noopener noreferrer" for security', () => {
      expect(cardSrc).toContain('rel="noopener noreferrer"');
    });

    it('liveUrl link is conditionally rendered — not shown when absent', () => {
      expect(cardSrc).toContain('liveUrl');
      expect(cardSrc).toMatch(/liveUrl\s*&&/);
    });
  });

  describe('CSS — cross-browser details reset (UX-DR6)', () => {
    it('hides default disclosure triangle with -webkit-details-marker', () => {
      expect(cardCss).toContain('-webkit-details-marker');
      expect(cardCss).toContain('display: none');
    });

    it('hides default marker with ::marker pseudo-element', () => {
      expect(cardCss).toContain('::marker');
    });

    it('summary has list-style: none or equivalent reset', () => {
      const hasListStyleNone = cardCss.includes('list-style: none');
      const hasMarkerHidden = cardCss.includes('::marker');
      expect(hasListStyleNone || hasMarkerHidden).toBe(true);
    });
  });

  describe('CSS — design tokens', () => {
    it('uses --color-bg-subtle for card background', () => {
      expect(cardCss).toContain('--color-bg-subtle');
    });

    it('uses --color-accent for category and links', () => {
      expect(cardCss).toContain('--color-accent');
    });

    it('uses --color-border for card border', () => {
      expect(cardCss).toContain('--color-border');
    });

    it('wraps transitions in prefers-reduced-motion (UX-DR12)', () => {
      expect(cardCss).toContain('prefers-reduced-motion: no-preference');
    });

    it('ghost button hover uses color-mix (UX-DR17)', () => {
      expect(cardCss).toContain('color-mix');
    });
  });
});
