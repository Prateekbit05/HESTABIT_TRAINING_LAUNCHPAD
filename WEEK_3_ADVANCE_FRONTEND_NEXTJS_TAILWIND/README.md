# Week 3: Advanced Frontend (Next.js + TailwindCSS)

## Objective

Train interns to build modern, production-grade frontends using:
- Next.js fundamentals (App Router / Pages / Routing / Layouts / Image optimization / SSR vs CSR basics)
- TailwindCSS (utility-first design + responsive components + reusable design system)

## Topics (Week 3)

### Next.js Fundamentals

- File-based routing
- app/ directory structure (Next 15+)
- Layouts & nested layouts
- Page navigation (Link, useRouter)
- Static vs client components ("use client")
- Image optimization (next/image)
- Fonts optimization (next/font)
- Metadata & SEO tags (Head or metadata config)

### TailwindCSS Fundamentals + Design System

- Utility-first styling
- Responsive design (sm, md, lg, xl)
- Flexbox + Grid using Tailwind
- Spacing system (p-x, m-x, gap-x)
- Typography system
- Custom theme config in tailwind.config.js
- Component composition mindset (atoms to molecules to sections to pages)

### Component Architecture + UI Thinking (in Next.js + Tailwind)

- Reusable component system
- Folder structure:
  - /components
  - /app
  - /styles

## Week 3 Exercises (Hands-on Deliverables)

| Area | Exercise |
|------|----------|
| Tailwind Setup | Convert Figma/screenshot into Tailwind components |
| Component System Design | Build Button, Card, Modal, Avatar, Badge |
| Next.js Routing | Multi-page project with shared layout |
| UI Challenge | Replicate a SaaS landing page |
| Reusable Component Library | Create ui/ library folder with export index |
| SEO | Metadata config + Image optimization |

## Daily Breakdown

### Day 1: TailwindCSS + UI System Basics

#### Topics
- Install Tailwind in Next.js
- Utility classes, spacing, colors, fonts
- Custom theme configuration

#### Exercise
Build a Dashboard Layout skeleton (header + sidebar)

Image for reference (Create header and Sidebar only):
https://assets.startbootstrap.com/img/meta/products/twitter/twitter-image-sb-admin.png

#### Output
- /app/layout.jsx
- /components/ui/Navbar.jsx
- /components/ui/Sidebar.jsx

### Day 2: Tailwind Advanced + Component Library

#### Topics
- Flex + Grid with Tailwind
- Components mindset (atomic design)
- Reusable components with props

#### Exercise
Build a component library in /components/ui/:
- Button.jsx
- Input.jsx
- Card.jsx
- Badge.jsx
- Modal.jsx

Image for reference (Build the full layout using reusable components, reusing the Day 1 UI component sidebar and header):
https://assets.startbootstrap.com/img/meta/products/twitter/twitter-image-sb-admin.png

#### Output
- /components/ui/*
- UI-COMPONENT-DOCS.md (Usage examples)

### Day 3: Next.js Routing + Layout System

#### Topics
- Next.js routing (app/page.js, /about/page.js, /dashboard/page.js)
- Nested layouts
- Shared navigation across pages
- Difference: Client Component vs Server Component

#### Exercise
Build a multi-page structure:
- / (landing page)
- /about
- /dashboard
- /dashboard/profile

Image for reference (Use the day 2 complete UI and create static page to achieve routing and layout system):
https://assets.startbootstrap.com/img/meta/products/twitter/twitter-image-sb-admin.png

#### Output
- Folder structure working with nested layouts

### Day 4: Dynamic UI + Image Optimization

#### Topics
- next/image (optimized image rendering)
- Responsive images + optimization
- Typography & SEO improvements
- Animations using Tailwind + Framer Motion (optional)

#### Exercise
Build a responsive landing page (like SaaS product page)

Sections:
- Hero section
- Features grid
- Testimonials (cards)
- Footer

Image for reference (Use the code completed up to Day 3 and make it responsive with Tailwind classes. Also, implement on-page SEO tags):
https://assets.startbootstrap.com/img/meta/products/twitter/twitter-image-sb-admin.png

#### Output
- /app/page.jsx
- screenshots/landing-page.png

### Day 5: Capstone Mini Project (No backend)

#### Project
Build a Full Multi-Page UI in Next.js + Tailwind, no backend.

Pages:
- /login (static form)
- /dashboard (cards and widgets UI)
- /dashboard/users (table listing mocked data)
- /dashboard/profile

Design references:
- Login Page: https://img.freepik.com/free-vector/simple-white-login-form_1017-7984.jpg
- Dashboard: Use the day 4 exercise for dashboard page
- Users Listing: https://demos.themeselection.com/jetship-laravel-starter-kit/documentation/image/guide/user-table.png
- Profile page: https://www.gravitykit.com/wp-content/uploads/2023/10/CleanShot-2025-06-26-at-12.53.16@2x-1024x503.png.webp

Mandatory:
- Component reuse from /components/ui
- Clean routing structure
- Mobile responsive UI

#### Output
- Project repo: week3-next-tailwind-frontend
- README.md must include:
  - Screenshots
  - Folder structure
  - Components list
  - Lessons learned

