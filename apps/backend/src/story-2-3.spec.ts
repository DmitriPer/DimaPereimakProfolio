import { readFileSync } from 'fs';
import { join } from 'path';

const frontendRoot = join(__dirname, '../../../apps/frontend');
const read = (rel: string) => readFileSync(join(frontendRoot, rel), 'utf-8');

describe('Story 2.3 — ThemeToggle and NavObserver', () => {
  describe('ThemeToggle — client directive', () => {
    it('has "use client" directive', () => {
      expect(read('app/components/ThemeToggle.tsx')).toContain("'use client'");
    });
  });

  describe('ThemeToggle — theme toggle', () => {
    it('sets data-theme attribute on documentElement', () => {
      expect(read('app/components/ThemeToggle.tsx')).toContain('setAttribute');
      expect(read('app/components/ThemeToggle.tsx')).toContain('data-theme');
    });

    it('persists theme to localStorage', () => {
      expect(read('app/components/ThemeToggle.tsx')).toContain('localStorage.setItem');
    });

    it('reads theme from localStorage on mount', () => {
      expect(read('app/components/ThemeToggle.tsx')).toContain('localStorage.getItem');
    });

    it('falls back to prefers-color-scheme', () => {
      expect(read('app/components/ThemeToggle.tsx')).toContain('prefers-color-scheme');
    });
  });

  describe('ThemeToggle — accessibility', () => {
    it('has aria-label "Switch to dark mode" branch', () => {
      expect(read('app/components/ThemeToggle.tsx')).toContain('Switch to dark mode');
    });

    it('has aria-label "Switch to light mode" branch', () => {
      expect(read('app/components/ThemeToggle.tsx')).toContain('Switch to light mode');
    });

    it('icon span has aria-hidden="true"', () => {
      expect(read('app/components/ThemeToggle.tsx')).toContain('aria-hidden="true"');
    });
  });

  describe('NavObserver — client directive', () => {
    it('has "use client" directive', () => {
      expect(read('app/components/NavObserver.tsx')).toContain("'use client'");
    });
  });

  describe('NavObserver — IntersectionObserver', () => {
    it('creates IntersectionObserver', () => {
      expect(read('app/components/NavObserver.tsx')).toContain('IntersectionObserver');
    });

    it('sets up observer inside useEffect', () => {
      const src = read('app/components/NavObserver.tsx');
      expect(src).toContain('useEffect');
      expect(src).toContain('IntersectionObserver');
    });

    it('calls observer.disconnect() on cleanup', () => {
      expect(read('app/components/NavObserver.tsx')).toContain('observer.disconnect()');
    });

    it('adds active class to matching nav link', () => {
      expect(read('app/components/NavObserver.tsx')).toContain("'active'");
    });

    it('renders null', () => {
      expect(read('app/components/NavObserver.tsx')).toContain('return null');
    });
  });

  describe('NavBar — still a server component', () => {
    it('NavBar has no "use client" directive', () => {
      const src = read('app/components/NavBar.tsx');
      expect(src).not.toContain("'use client'");
      expect(src).not.toContain('"use client"');
    });

    it('NavBar imports ThemeToggle', () => {
      expect(read('app/components/NavBar.tsx')).toContain("from './ThemeToggle'");
    });

    it('NavBar imports NavObserver', () => {
      expect(read('app/components/NavBar.tsx')).toContain("from './NavObserver'");
    });

    it('NavBar renders ThemeToggle', () => {
      expect(read('app/components/NavBar.tsx')).toContain('<ThemeToggle');
    });

    it('NavBar renders NavObserver', () => {
      expect(read('app/components/NavBar.tsx')).toContain('<NavObserver');
    });
  });

  describe('NavBar.module.css — active link style', () => {
    it('has :global(a.active) rule for active nav links', () => {
      expect(read('app/components/NavBar.module.css')).toContain('a.active');
    });
  });
});
