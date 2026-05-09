import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const frontendRoot = join(__dirname, '../../../apps/frontend');
const navbarSource = () => readFileSync(join(frontendRoot, 'app/components/NavBar.tsx'), 'utf-8');
const navbarCss = () => readFileSync(join(frontendRoot, 'app/components/NavBar.module.css'), 'utf-8');
const pageSource = () => readFileSync(join(frontendRoot, 'app/page.tsx'), 'utf-8');

describe('Story 2.2 — NavBar', () => {
  describe('server component', () => {
    it('NavBar has no "use client" directive', () => {
      expect(navbarSource()).not.toContain("'use client'");
      expect(navbarSource()).not.toContain('"use client"');
    });
  });

  describe('navigation links', () => {
    it('contains link to #projects', () => {
      expect(navbarSource()).toContain('href="#projects"');
    });

    it('contains link to #about', () => {
      expect(navbarSource()).toContain('href="#about"');
    });

    it('contains link to #contact', () => {
      expect(navbarSource()).toContain('href="#contact"');
    });
  });

  describe('CV download link', () => {
    it('cv link has aria-label="Download CV as PDF"', () => {
      expect(navbarSource()).toContain('aria-label="Download CV as PDF"');
    });

    it('cv link href is "/cv.pdf"', () => {
      expect(navbarSource()).toContain('href="/cv.pdf"');
    });

    it('public/cv.pdf file exists', () => {
      expect(existsSync(join(frontendRoot, 'public/cv.pdf'))).toBe(true);
    });
  });

  describe('logo', () => {
    it('logo links to "/"', () => {
      expect(navbarSource()).toContain('href="/"');
    });
  });

  describe('responsive CSS', () => {
    it('navLinks is hidden by default (display: none)', () => {
      expect(navbarCss()).toMatch(/\.navLinks\s*\{[^}]*display:\s*none/s);
    });

    it('navLinks is shown at 1024px breakpoint ($bp-lg)', () => {
      const css = navbarCss();
      expect(css).toMatch(/min-width:\s*1024px/);
      expect(css).toMatch(/\.navLinks\s*\{[^}]*display:\s*flex/s);
    });
  });

  describe('page integration', () => {
    it('page.tsx imports NavBar', () => {
      expect(pageSource()).toContain("from './components/NavBar'");
    });

    it('page.tsx renders NavBar inside <header>', () => {
      const src = pageSource();
      const headerIdx = src.indexOf('<header>');
      const navbarIdx = src.indexOf('<NavBar');
      expect(headerIdx).toBeGreaterThan(-1);
      expect(navbarIdx).toBeGreaterThan(headerIdx);
    });
  });
});
