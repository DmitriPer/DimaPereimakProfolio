# Portfolio Project — Discovery Session

## Who is Dima

- Fullstack developer, 2 years hands-on experience at one company
- Started as customer service rep → interviewed for QA → self-pushed into dev role by showing daily initiative
- When a major project landed, the team pulled him in because he'd proven he wanted it
- Company had financial problems and let people go — his departure is external circumstance, not performance
- Actively job hunting now
- Targeting: **Fullstack roles** (frontend-heavy with full-stack capability)

**The narrative (not "2 years, one company"):**
> "I started in customer service. I taught myself to code. They pulled me onto the dev team anyway."

---

## Target Audience

| Persona | Need | Time |
|---------|------|------|
| Maya (HR / Recruiter) | Outcomes in plain language, visible contact button | 30 seconds |
| Ran (Hiring Manager) | Decision-making evidence, GitHub link, code they can read | 2 minutes |
| Tal (Tech Lead) | Code quality, architectural thinking, why behind each project | 5 minutes |

---

## Tech Stack

### Portfolio Site Stack
| Layer | Tech | Reason |
|-------|------|--------|
| Frontend | Next.js 14 (App Router) | SSR + SEO + modern React, signals fullstack thinking |
| Styling | SCSS + CSS Modules | Matches enterprise background, shows real CSS depth, aligns with design system work |
| Backend | NestJS | Already shipped in production at work — reusing it is a strength signal |
| Language | TypeScript throughout | Non-negotiable quality signal |
| Deploy | Vercel (frontend) + Railway (backend) | Free tiers, professional |

### Dima's Professional Stack (to display on site)
- Angular (primary, most experienced)
- React / Next.js
- NestJS
- Node.js
- BFF pattern
- TypeScript
- SCSS
- NPM package development
- RESTful APIs / Microservices
- AI tooling (Cursor, Claude Code, BMAD method)

---

## What the Backend Will Actually Do

Not decoration — a real backend with purpose:
1. Contact form → stores submission in DB + sends email notification
2. Serves project data as a real API (not hardcoded in frontend)
3. GitHub API integration → live repo stats on project cards

---

## Site Structure

### Sections (no blog — pure portfolio)
1. **Hero** — hook sentence + name + role + CTA ("Let's talk" button visible immediately)
2. **Projects** — 6 cards (see below)
3. **About** — full story (CS → QA → dev) + stack in context (not badges)
4. **Contact** — form (real backend) + email + GitHub + LinkedIn
5. **CV download** — prominent, not buried at the bottom

### Design Principles
- Hook stops the scroll in the first 5 seconds
- Stack shown in project context, not as floating icon badges
- Each project card answers: problem → what I built → result → stack + GitHub link
- Numbers and outcomes in plain language for non-technical readers
- "Let's talk" CTA visible from the first screen

---

## Projects

### 1. Self-Service Platform + Design System NPM Package *(work)*
- **Problem:** Old site had no accessibility, poor UI/UX flow, messy design, slow performance, written in .NET (both BFF and client side)
- **What Dima built:** Planned and designed the rebuild, built all features, coordinated with the Design System team to sequence dependencies (what to build first vs last), solved a code review bottleneck using AI tooling + tech lead collaboration
- **Stack:** React + NestJS BFF (replacing .NET)
- **Result:** Full production site launched (minor issues fixed same night), happy customer base, new features now being added that were impossible on the old site, accessible, with a proper design language
- **Scale:** 3 devs, 3 months — scoped for 5-6 devs and 5 months
- **Note:** The Design System was written as an NPM package in parallel by the same small team

### 2. Broker Portal *(work)*
- **Type:** 2-environment broker portal
- **Stack:** Angular only (client side), existing BFF, large monorepo
- **Scope:** Enterprise scale, first major project at the company

### 3. Legacy Code Maintenance *(work)*
- Maintained both old-and-bad and old-and-good legacy code
- Signals: real-world experience, not just greenfield projects

### 4. Interactive DND Map *(side project)*
- **Origin:** Built from scratch to play with friends
- **Status:** Currently being refactored and extended with new features
- **Signal:** Builds for fun → genuine passion for the craft

### 5. Backend User API *(side project)*
- **Type:** RESTful API split into microservices
- **Structure:** Index (app loader + routing) → users route → user controller → user interface
- **Status:** GitHub public repo
- **Signal:** Shows intentional backend architecture, not just tutorial copy-paste

### 6. This Portfolio Site *(side project)*
- **Signal:** The portfolio itself is a fullstack project — Next.js + NestJS + TypeScript
- **Action:** Link to repo, show the stack, make this explicit on the site

### 7. Frontend Mentor Challenges × 2 *(training)*
- Signal: Discipline, continuous learning

---

## Content Checklist

- [ ] Professional photo (Dima to find)
- [ ] Downloadable CV/resume PDF
- [ ] GitHub profile with public repos (confirmed: all projects public)
- [ ] GitHub links on every project card
- [ ] Live demo links where possible
- [ ] LinkedIn URL
- [ ] Domain (not purchased yet)

---

## What NOT to Do

- No "Hello, I'm Dima, a Fullstack Developer" hero — that's forgettable
- No floating skill badge sections — show stack in project context instead
- No "coming soon" placeholder project cards
- No contact form buried at the bottom as the only CTA
- No Tailwind CSS (most enterprise jobs don't use it)
- Stack jargon in project headlines — lead with outcome, put stack in detail

---

## Key Messages Per Audience

**For Maya (recruiter):** Numbers. Outcomes. One click to contact.

**For Ran (hiring manager):** I planned and coordinated, not just coded. Here's the GitHub.

**For Tal (tech lead):** I designed the architecture on my side projects. The DND Map was scratch-built. The API has intentional service separation. I built a shared NPM package under production constraints.
