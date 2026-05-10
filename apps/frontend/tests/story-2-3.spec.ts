import { readFileSync } from 'fs';
import { join } from 'path';

const frontendRoot = join(__dirname, '../');
const read = (rel: string) => readFileSync(join(frontendRoot, rel), 'utf-8');

describe('Story 2.3 — ThemeToggle and NavObserver', () => {
  let toggleSrc: string;
  let observerSrc: string;
  let navbarSrc: string;
  let navbarCss: string;
  let layoutSrc: string;
  let sunIconSrc: string;
  let moonIconSrc: string;

  beforeAll(() => {
    toggleSrc = read('app/components/ThemeToggle.tsx');
    observerSrc = read('app/components/NavObserver.tsx');
    navbarSrc = read('app/components/NavBar.tsx');
    navbarCss = read('app/components/NavBar.module.css');
    layoutSrc = read('app/layout.tsx');
    sunIconSrc = read('app/components/icons/SunIcon.tsx');
    moonIconSrc = read('app/components/icons/MoonIcon.tsx');
  });

  describe('layout — flash prevention', () => {
    it('html element has suppressHydrationWarning', () => {
      expect(layoutSrc).toContain('suppressHydrationWarning');
    });

    it('inline script reads localStorage theme', () => {
      expect(layoutSrc).toContain("localStorage.getItem('theme')");
    });

    it('inline script sets data-theme on documentElement', () => {
      expect(layoutSrc).toContain("setAttribute('data-theme'");
    });
  });

  describe('ThemeToggle — client directive', () => {
    it('has "use client" directive', () => {
      expect(toggleSrc).toContain("'use client'");
    });
  });

  describe('ThemeToggle — theme toggle', () => {
    it('sets data-theme attribute on documentElement', () => {
      expect(toggleSrc).toContain('setAttribute');
      expect(toggleSrc).toContain('data-theme');
    });

    it('persists theme to localStorage', () => {
      expect(toggleSrc).toContain('localStorage.setItem');
    });

    it('reads theme from localStorage on mount', () => {
      expect(toggleSrc).toContain('localStorage.getItem');
    });

    it('falls back to prefers-color-scheme', () => {
      expect(toggleSrc).toContain('prefers-color-scheme');
    });
  });

  describe('ThemeToggle — accessibility', () => {
    it('has aria-label "Switch to dark mode" branch', () => {
      expect(toggleSrc).toContain('Switch to dark mode');
    });

    it('has aria-label "Switch to light mode" branch', () => {
      expect(toggleSrc).toContain('Switch to light mode');
    });

    it('imports SunIcon and MoonIcon from icons/', () => {
      expect(toggleSrc).toContain("from './icons/SunIcon'");
      expect(toggleSrc).toContain("from './icons/MoonIcon'");
    });

    it('SunIcon has aria-hidden="true" on svg', () => {
      expect(sunIconSrc).toContain('aria-hidden="true"');
      expect(sunIconSrc).toContain('<svg');
    });

    it('MoonIcon has aria-hidden="true" on svg', () => {
      expect(moonIconSrc).toContain('aria-hidden="true"');
      expect(moonIconSrc).toContain('<svg');
    });
  });

  describe('NavObserver — client directive', () => {
    it('has "use client" directive', () => {
      expect(observerSrc).toContain("'use client'");
    });
  });

  describe('NavObserver — IntersectionObserver', () => {
    it('creates IntersectionObserver inside useEffect', () => {
      expect(observerSrc).toContain('useEffect');
      expect(observerSrc).toContain('IntersectionObserver');
    });

    it('calls observer.disconnect() on cleanup', () => {
      expect(observerSrc).toContain('observer.disconnect()');
    });

    it('tracks intersecting sections with a Set', () => {
      expect(observerSrc).toContain('new Set');
    });

    it('adds active class to matching nav link', () => {
      expect(observerSrc).toContain("'active'");
    });

    it('renders null', () => {
      expect(observerSrc).toContain('return null');
    });
  });

  describe('NavBar — still a server component', () => {
    it('NavBar has no "use client" directive', () => {
      expect(navbarSrc).not.toContain("'use client'");
      expect(navbarSrc).not.toContain('"use client"');
    });

    it('NavBar imports ThemeToggle', () => {
      expect(navbarSrc).toContain("from './ThemeToggle'");
    });

    it('NavBar imports NavObserver', () => {
      expect(navbarSrc).toContain("from './NavObserver'");
    });

    it('NavBar renders ThemeToggle', () => {
      expect(navbarSrc).toContain('<ThemeToggle');
    });

    it('NavBar renders NavObserver', () => {
      expect(navbarSrc).toContain('<NavObserver');
    });
  });

  describe('NavBar.module.css — active link style', () => {
    it('has :global(a.active) rule for active nav links', () => {
      expect(navbarCss).toContain('a.active');
    });
  });
});
