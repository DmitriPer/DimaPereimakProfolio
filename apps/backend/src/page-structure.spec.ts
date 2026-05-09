import { readFileSync } from 'fs';
import { join } from 'path';

const frontendRoot = join(__dirname, '../../../apps/frontend');
const layoutSource = () => readFileSync(join(frontendRoot, 'app/layout.tsx'), 'utf-8');
const pageSource = () => readFileSync(join(frontendRoot, 'app/page.tsx'), 'utf-8');
const globalsCss = () => readFileSync(join(frontendRoot, 'app/globals.css'), 'utf-8');

describe('Story 2.1 — Page Structure and Skip Link', () => {
  describe('skip link in layout', () => {
    it('layout contains skip link pointing to #main-content', () => {
      expect(layoutSource()).toContain('href="#main-content"');
    });

    it('skip link has class "skip-link"', () => {
      expect(layoutSource()).toContain('className="skip-link"');
    });

    it('skip link text is "Skip to main content"', () => {
      expect(layoutSource()).toContain('Skip to main content');
    });

    it('skip link appears before {children} in body', () => {
      const src = layoutSource();
      const skipIdx = src.indexOf('skip-link');
      const childrenIdx = src.indexOf('{children}');
      expect(skipIdx).toBeGreaterThan(0);
      expect(skipIdx).toBeLessThan(childrenIdx);
    });
  });

  describe('skip link CSS', () => {
    it('globals.css defines .skip-link rule', () => {
      expect(globalsCss()).toContain('.skip-link');
    });

    it('.skip-link is visually hidden by default (clip + overflow)', () => {
      expect(globalsCss()).toMatch(/\.skip-link\s*\{[^}]*overflow:\s*hidden/s);
      expect(globalsCss()).toMatch(/\.skip-link\s*\{[^}]*clip:/s);
    });

    it('.skip-link:focus removes clip and makes element visible', () => {
      expect(globalsCss()).toMatch(/\.skip-link:focus\s*\{[^}]*clip:\s*auto/s);
      expect(globalsCss()).toMatch(/\.skip-link:focus\s*\{[^}]*position:\s*fixed/s);
    });
  });

  describe('semantic page structure', () => {
    it('page has <main> with id="main-content"', () => {
      expect(pageSource()).toMatch(/<main\s[^>]*id="main-content"/);
    });

    it('page has <header> landmark', () => {
      expect(pageSource()).toMatch(/<header/);
    });

    it('page has <section> elements', () => {
      expect(pageSource()).toMatch(/<section/);
    });

    it('page has section id="projects"', () => {
      expect(pageSource()).toContain('id="projects"');
    });

    it('page has section id="contact"', () => {
      expect(pageSource()).toContain('id="contact"');
    });
  });

  describe('dark theme default', () => {
    it('layout sets data-theme="dark" on <html> server-side', () => {
      expect(layoutSource()).toContain('data-theme="dark"');
    });
  });
});
