import { readFileSync } from 'fs';
import { join } from 'path';

const frontendRoot = join(__dirname, '../');
const read = (rel: string) => readFileSync(join(frontendRoot, rel), 'utf-8');

describe('Story 2.1 — Page Structure and Skip Link', () => {
  let layoutSource: string;
  let pageSource: string;
  let globalsCss: string;
  let variablesScss: string;

  beforeAll(() => {
    layoutSource = read('app/layout.tsx');
    pageSource = read('app/page.tsx');
    globalsCss = read('app/globals.css');
    variablesScss = read('styles/_variables.scss');
  });

  describe('skip link in layout', () => {
    it('layout contains skip link pointing to #main-content', () => {
      expect(layoutSource).toContain('href="#main-content"');
    });

    it('skip link has class "skip-link"', () => {
      expect(layoutSource).toContain('className="skip-link"');
    });

    it('skip link text is "Skip to main content"', () => {
      expect(layoutSource).toContain('Skip to main content');
    });

    it('skip link appears before {children} in body', () => {
      const src = layoutSource;
      const skipIdx = src.indexOf('skip-link');
      const childrenIdx = src.indexOf('{children}');
      expect(skipIdx).toBeGreaterThan(0);
      expect(skipIdx).toBeLessThan(childrenIdx);
    });
  });

  describe('skip link CSS', () => {
    it('globals.css defines .skip-link rule', () => {
      expect(globalsCss).toContain('.skip-link');
    });

    it('.skip-link is visually hidden by default (clip + overflow)', () => {
      expect(globalsCss).toMatch(/\.skip-link\s*\{[^}]*overflow:\s*hidden/s);
      expect(globalsCss).toMatch(/\.skip-link\s*\{[^}]*clip:/s);
    });

    it('.skip-link:focus removes clip and makes element visible', () => {
      expect(globalsCss).toMatch(/\.skip-link:focus\s*\{[^}]*clip:\s*auto/s);
      expect(globalsCss).toMatch(/\.skip-link:focus\s*\{[^}]*position:\s*fixed/s);
    });
  });

  describe('semantic page structure', () => {
    it('page has <main> with id="main-content"', () => {
      expect(pageSource).toMatch(/<main\s[^>]*id="main-content"/);
    });

    it('page has <header> landmark', () => {
      expect(pageSource).toMatch(/<header/);
    });

    it('page has <section> elements', () => {
      expect(pageSource).toMatch(/<section/);
    });

    it('page has section id="projects"', () => {
      expect(pageSource).toContain('id="projects"');
    });

    it('page has section id="contact"', () => {
      expect(pageSource).toContain('id="contact"');
    });
  });

  describe('dark theme default', () => {
    it('_variables.scss defines dark tokens via @media (prefers-color-scheme: dark)', () => {
      expect(variablesScss).toContain('prefers-color-scheme: dark');
    });

    it('_variables.scss defines dark tokens via [data-theme="dark"] attribute selector', () => {
      expect(variablesScss).toContain('[data-theme="dark"]');
    });

    it('layout has suppressHydrationWarning on <html> for theme flash prevention', () => {
      expect(layoutSource).toContain('suppressHydrationWarning');
    });

    it('layout runs inline script to restore stored theme before hydration', () => {
      expect(layoutSource).toContain("localStorage.getItem('theme')");
      expect(layoutSource).toContain("setAttribute('data-theme'");
    });
  });
});
