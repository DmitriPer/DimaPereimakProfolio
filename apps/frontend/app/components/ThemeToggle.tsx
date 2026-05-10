'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

type Theme = 'dark' | 'light';

// Only safe to call in browser context (localStorage + window.matchMedia).
function resolveTheme(): Theme {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function ThemeToggle() {
  // Lazy initializer: reads localStorage immediately on the client so the
  // correct icon is rendered on React's first pass — no useEffect flash.
  // Returns 'dark' on the server where localStorage is unavailable.
  const [theme, setTheme] = useState<Theme>(() =>
    typeof window === 'undefined' ? 'dark' : resolveTheme()
  );

  // Keep data-theme on <html> in sync with state. The inline script in
  // layout.tsx already seeds the correct value before hydration; this
  // effect handles post-toggle updates.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function handleToggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
  }

  return (
    // suppressHydrationWarning: server renders 'dark' default; client may
    // immediately resolve a different stored preference — mismatch is expected.
    <button
      type="button"
      onClick={handleToggle}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className={styles.toggle}
      suppressHydrationWarning
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
