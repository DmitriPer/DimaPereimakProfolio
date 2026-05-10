'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

type Theme = 'dark' | 'light';

// Only safe to call in browser context (localStorage + window.matchMedia).
function resolveTheme(): Theme {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const resolved = resolveTheme();
    setTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);
    setMounted(true);
  }, []);

  function handleToggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  // Render a same-size empty button until localStorage is read.
  // Both server and client render this — no hydration mismatch, no wrong icon.
  if (!mounted) {
    return <button type="button" className={styles.toggle} aria-label="Toggle theme" />;
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className={styles.toggle}
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
