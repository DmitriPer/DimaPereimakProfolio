'use client';

import { useEffect } from 'react';

const SECTION_IDS = ['projects', 'about', 'contact'];

export default function NavObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const link = document.querySelector(`a[href="#${entry.target.id}"]`);
          if (link) link.classList.toggle('active', entry.isIntersecting);
        }
      },
      { rootMargin: '-40% 0px -40% 0px' },
    );

    const sections = SECTION_IDS
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return null;
}
