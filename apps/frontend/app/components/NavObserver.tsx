'use client';

import { useEffect } from 'react';

const SECTION_IDS = ['projects', 'about', 'contact'];

export default function NavObserver() {
  useEffect(() => {
    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        }
        // Activate only the topmost intersecting section in document order
        // so at most one nav link is active at any time.
        SECTION_IDS.forEach(id => {
          const link = document.querySelector(`a[href="#${id}"]`);
          const isActive = intersecting.has(id) && SECTION_IDS.find(s => intersecting.has(s)) === id;
          if (link) link.classList.toggle('active', isActive);
        });
      },
      // Section must occupy the middle 20% of the viewport to register as active;
      // prevents jitter when two sections are simultaneously near the boundary.
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
