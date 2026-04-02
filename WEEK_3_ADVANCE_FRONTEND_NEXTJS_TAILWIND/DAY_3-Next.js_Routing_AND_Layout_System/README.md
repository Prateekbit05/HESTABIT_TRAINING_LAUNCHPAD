# Week 3 — Day 3: Next.js Routing + Layout System

## 🎯 Objective
Build a multi-page Next.js application using the App Router with nested layouts, shared navigation, and an understanding of Client vs Server Components.

---

## 📚 Topics Covered

- File-based routing in Next.js App Router (`app/page.js`, `/about/page.js`, `/dashboard/page.js`)
- Nested layouts and shared layout wrappers
- Shared navigation across all pages using Day 2 Navbar + Sidebar
- Client Component (`"use client"`) vs Server Component (default)

---

## 🧪 Exercise

Built a multi-page structure using Next.js App Router routing conventions, reusing the Day 2 component library (Navbar, Sidebar, Cards) as the layout shell for all pages.

**Reference UI:** [SB Admin Dashboard](https://assets.startbootstrap.com/img/meta/products/twitter/twitter-image-sb-admin.png)

---

## 📁 Folder Structure

```
DAY_3-Next.js_Routing_AND_Layout_System/
├── about/
│   └── layout.js
├── dashboard/
│   └── profile/
│       └── page.js
└── screenshots/
    └── ui_components.png
```

### Routes Built

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.js` | Landing page |
| `/about` | `about/layout.js` | About page with nested layout |
| `/dashboard` | `dashboard/page.js` | Dashboard main page |
| `/dashboard/profile` | `dashboard/profile/page.js` | Nested profile page under dashboard |

---

## 📸 Screenshots

### 🖥️ Routing & Layout System
![UI Components](./screenshots/ui_components.png)

---

## ✅ Deliverables

- [x] `/about/layout.js` — About page with nested layout
- [x] `/dashboard/profile/page.js` — Nested profile route under dashboard
- [x] Shared Navbar + Sidebar across all pages (from Day 2)
- [x] Working nested layout system using App Router conventions

---

## 🔑 Client vs Server Components

| | Server Component | Client Component |
|--|-----------------|-----------------|
| **Default** | ✅ Yes | ❌ No |
| **Directive** | None needed | `"use client"` at top |
| **Can use hooks** | ❌ No | ✅ Yes |
| **Can fetch data** | ✅ Yes (async) | ✅ Yes (useEffect) |
| **Rendered on** | Server | Browser |
| **Use for** | Layouts, static pages, data fetching | Interactive UI, event listeners, state |

---

## 💡 Key Learnings

- **File-based routing:** Every `page.js` inside `app/` automatically becomes a route — no manual router config needed
- **Nested layouts:** `layout.js` wraps all child routes — perfect for shared Navbar/Sidebar without re-rendering
- **Server Components by default:** Next.js renders components on the server unless `"use client"` is declared
- **Nested routes:** `/dashboard/profile` is achieved simply by nesting folders — `dashboard/profile/page.js`
- **Component reuse:** Day 2 UI components (Navbar, Sidebar, Card) plugged directly into the layout shell

