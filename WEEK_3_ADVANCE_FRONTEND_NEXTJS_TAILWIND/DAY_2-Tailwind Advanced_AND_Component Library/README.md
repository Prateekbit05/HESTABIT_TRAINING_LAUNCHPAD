# Week 3 — Day 2: Tailwind Advanced + Component Library

## 🎯 Objective
Build a reusable UI component library using TailwindCSS with atomic design principles — components that can be composed across pages.

---

## 📚 Topics Covered

- Flexbox + Grid with TailwindCSS
- Atomic design mindset (atoms → molecules → sections → pages)
- Reusable components with props in React/Next.js
- Component composition and clean export structure

---

## 🧪 Exercise

Built a full component library inside `/components/ui/` using TailwindCSS utility classes, reusing the Day 1 Navbar and Sidebar for the overall layout.

**Reference UI:** [SB Admin Dashboard](https://assets.startbootstrap.com/img/meta/products/twitter/twitter-image-sb-admin.png)

---

## 📁 Folder Structure

```
DAY_2-Tailwind Advanced_AND_Component Library/
└── components/
    └── ui/
        ├── Badge.jsx
        ├── Button.jsx
        ├── Card.jsx
        ├── Input.jsx
        └── Modal.jsx
```

---

## 🧩 Components Built

| Component | Description |
|-----------|-------------|
| `Button.jsx` | Reusable button with variant props (primary, secondary, danger, outline) and size support |
| `Input.jsx` | Controlled input field with label, placeholder, error state and helper text |
| `Card.jsx` | Content card with header, body, footer slots and shadow/border variants |
| `Badge.jsx` | Status/label badge with color variants (success, warning, error, info, neutral) |
| `Modal.jsx` | Overlay modal with open/close state, title, body, and action buttons |

---

## 📸 Screenshots

### 🖥️ UI Components Overview
![UI Components](./screenshots/ui_components.png)

| View | Screenshot |
|------|------------|
| Component Library Overview | _coming soon_ |
| Button Variants | _coming soon_ |
| Card + Badge | _coming soon_ |
| Modal Open State | _coming soon_ |

---

## ✅ Deliverables

- [x] `Button.jsx` — with variant and size props
- [x] `Input.jsx` — with label, error, and helper text
- [x] `Card.jsx` — composable card layout
- [x] `Badge.jsx` — color-coded status labels
- [x] `Modal.jsx` — overlay modal with open/close toggle
- [x] `UI-COMPONENT-DOCS.md` — usage documentation for all components

---

## 💡 Key Learnings

- **Atomic Design:** Breaking UI into reusable atoms (Button, Badge) and molecules (Card, Modal) makes scaling much easier
- **Props-driven components:** Passing `variant`, `size`, `onClick` as props makes components flexible without duplicating code
- **Tailwind class composition:** Using template literals to conditionally apply Tailwind classes based on props
- **Component reuse:** Day 1's Navbar and Sidebar plugged in seamlessly as the layout shell

