import { readFileSync } from 'fs';
import { join } from 'path';

const frontendRoot = join(__dirname, '../../../apps/frontend');
const read = (rel: string) => readFileSync(join(frontendRoot, rel), 'utf-8');

describe('Story 2.4 — HeroSection', () => {
  let heroSrc: string;
  let heroCss: string;
  let pageSrc: string;

  beforeAll(() => {
    heroSrc = read('app/components/HeroSection.tsx');
    heroCss = read('app/components/HeroSection.module.css');
    pageSrc = read('app/page.tsx');
  });

  describe('server component', () => {
    it('HeroSection has no "use client" directive', () => {
      expect(heroSrc).not.toContain("'use client'");
      expect(heroSrc).not.toContain('"use client"');
    });
  });

  describe('structure — required elements', () => {
    it('renders <section id="hero">', () => {
      expect(heroSrc).toContain('id="hero"');
    });

    it('renders an eyebrow label', () => {
      expect(heroSrc).toContain('eyebrow');
    });

    it('renders an <h1> headline', () => {
      expect(heroSrc).toMatch(/<h1/);
    });

    it('renders a subtitle paragraph', () => {
      expect(heroSrc).toContain('subtitle');
    });

    it('renders a CTA group', () => {
      expect(heroSrc).toContain('ctaGroup');
    });

    it('"Let\'s talk" CTA links to #contact', () => {
      expect(heroSrc).toContain('href="#contact"');
    });

    it('CV download CTA links to /cv.pdf', () => {
      expect(heroSrc).toContain('href="/cv.pdf"');
    });

    it('CV download has aria-label', () => {
      expect(heroSrc).toContain('aria-label="Download CV as PDF"');
    });
  });

  // Scroll indicator (UX-DR5) deferred — only meaningful once page has real
  // content below the hero. Will be added when sections are populated.

  describe('CSS — fluid typography', () => {
    it('H1 font-size uses clamp()', () => {
      expect(heroCss).toMatch(/\.headline\s*\{[^}]*font-size:\s*clamp\(/s);
    });

    it('eyebrow uses --font-mono custom property', () => {
      expect(heroCss).toContain('var(--font-mono)');
    });
  });

  describe('CSS — responsive CTAs', () => {
    it('CTAs stack full-width at mobile breakpoint (max-width: 639px)', () => {
      expect(heroCss).toContain('max-width: 639px');
      expect(heroCss).toMatch(/width:\s*100%/);
    });

    it('CTA flex-direction column on mobile', () => {
      expect(heroCss).toContain('flex-direction: column');
    });
  });

  describe('CSS — focus states', () => {
    it('CTAs have :focus-visible outline', () => {
      expect(heroCss).toContain(':focus-visible');
      expect(heroCss).toContain('outline:');
    });
  });

  describe('page integration', () => {
    it('page.tsx imports HeroSection', () => {
      expect(pageSrc).toContain("from './components/HeroSection'");
    });

    it('page.tsx renders <HeroSection />', () => {
      expect(pageSrc).toContain('<HeroSection');
    });

    it('page.tsx no longer has an empty <section id="hero">', () => {
      expect(pageSrc).not.toContain('<section id="hero">');
    });
  });
});
