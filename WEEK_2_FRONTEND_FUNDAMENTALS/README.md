# Week 2 - Frontend Fundamentals

## Overview
This week focused on mastering the core frontend technologies: HTML5, CSS3, and modern JavaScript (ES6+). The goal was to build responsive, accessible, and interactive web applications from scratch.

---

## Learning Objectives
- Build semantic HTML5 structures
- Create responsive layouts using Flexbox and CSS Grid
- Manipulate the DOM with vanilla JavaScript
- Implement modern ES6+ features
- Build interactive, data-driven web applications

---

## Project Structure
```
WEEK_2-FRONTEND_FUNDAMENTALS_HTML_CSS_JAVASCRIPT/
│
├── DAY_1-HTML5_SEMANTIC-LAYOUT/
│   ├── blog.html              # Semantic HTML blog page
│   └── README.md              # Day 1 learnings
│
├── DAY_2-CSS_LAYOUT_MASTERY/
│   ├── index.html             # UI replication exercise
│   ├── style.css              # Flexbox/Grid styling
│   ├── style.css1             # Additional styles
│   └── screenshots/
│       ├── DESKTOP_UI.png     # Desktop view
│       ├── MOBILE_UI.png      # Mobile view
│       └── RESPONSIVE_UI.png  # Responsive design
│
├── DAY_3-JS_DOM_MANIPULATION/
│   ├── index.html             # Interactive FAQ & counter
│   ├── script.js              # DOM manipulation logic
│   ├── style.css              # Component styling
│   └── screenshots/
│       ├── closed_state.png
│       ├── opened_state.png
│       ├── counter(arrow_down).png
│       ├── counter(arrow_up).png
│       ├── counter_dropdown_and_keyevents.png
│       ├── dropdown_opened_state.png
│       └── dropdown_opened_state.png
│
├── DAY_4-JS_UTILS_LOCALSTORAGE/
│   └── todo-app/
│       ├── index.html         # Todo app HTML
│       ├── css/
│       │   └── style.css      # Todo styling
│       ├── js/
│       │   └── app.js         # LocalStorage logic
│       ├── logs/
│       │   └── errors.md      # Error tracking
│       └── Screenshots/
│           ├── ADD_TODO/
│           │   ├── debugging_paused.png
│           │   ├── step_in_function.png
│           │   ├── step_out_function.png
│           │   ├── step_over_function.png
│           │   └── text_added_into_function.png
│           ├── COMPLETION_TODO/
│           │   ├── Debugging_paused.png
│           │   ├── step_in_function.png
│           │   ├── step_out_function.png
│           │   ├── step_over_function.png
│           │   └── task_complete_todo.png
│           ├── DELETE_TODO/
│           │   ├── deletion_debugging_paused.png
│           │   ├── event_deletion.png
│           │   ├── step_into_function.png
│           │   ├── step_out_function.png
│           │   ├── step_over_function.png
│           │   └── task_deleted.png
│           └── EDIT_TODO/
│               ├── debugging_paused.png
│               ├── edit_task_name.png
│               ├── step_in.png
│               ├── step_out.png
│               ├── step_over.png
│               └── task_edit_prompt.png
│
└── DAY_5-CAPSTONE_UI_AND_JS_PROJECT/
    ├── index.html             # Main landing page
    ├── products.html          # E-commerce product listing
    ├── css/
    │   └── style.css          # Main stylesheet
    ├── js/
    │   └── products.js        # Product fetching & filtering
    └── screenshots/
```

---

## Daily Breakdown

### DAY 1 - HTML5 + Semantic Layout

#### What I Learned:
- Proper use of semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- Form elements and HTML5 validation attributes
- Accessibility basics (ARIA labels, alt text, tabindex)
- Embedding media (video, audio, canvas)

#### Deliverable:
- `blog.html` - A fully semantic blog page structure without any CSS styling

#### Key Takeaways:
> "Semantic HTML isn't just about clean code—it's about accessibility, SEO, and maintainability."

---

### DAY 2 - CSS Layout Mastery (Flexbox + Grid)

#### What I Learned:
- CSS specificity and selector types (attribute, sibling, nth-child)
- Box model deep dive (margin, padding, border, content)
- Flexbox for one-dimensional layouts
- CSS Grid for two-dimensional layouts
- Mobile-first responsive design approach
- Media queries for breakpoints

#### Deliverable:
- UI replication using Flexbox and Grid
- Fully responsive layout (desktop → tablet → mobile)

#### Key Takeaways:
> "CSS Grid excels at page-level layouts, while Flexbox shines for component-level alignment."

---

### DAY 3 - JavaScript ES6 + DOM Manipulation

#### What I Learned:
- Modern variable declarations (`let`, `const`)
- Arrow functions and their scope
- Array methods (`map`, `filter`, `reduce`)
- Object destructuring and spread operator
- DOM selection and manipulation
- Event listeners and event handling

#### Deliverable:
- Interactive FAQ accordion (click to expand/collapse)
- Counter with arrow up/down functionality
- Dropdown menu with key events

#### Code Example:
```javascript
// FAQ Accordion Toggle
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    answer.classList.toggle('active');
  });
});
```

#### Key Takeaways:
> "Modern JavaScript's array methods make data transformation clean and readable."

---

### DAY 4 - JS Utilities + LocalStorage

#### What I Learned:
- Browser DevTools debugging (breakpoints, watch expressions)
- Custom utility functions (debounce, throttle)
- LocalStorage API for data persistence
- Error handling with try/catch
- Modular JavaScript organization

#### Deliverable:
- Todo App with LocalStorage persistence
  - Add new todos
  - Edit existing todos
  - Delete todos
  - Mark todos as complete
  - Data persists after page refresh
- Comprehensive debugging screenshots for each operation

#### Code Example:
```javascript
// Save to LocalStorage
function saveTodos(todos) {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos:', error);
  }
}

// Load from LocalStorage
function loadTodos() {
  try {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load todos:', error);
    return [];
  }
}
```

#### Key Takeaways:
> "LocalStorage is perfect for simple client-side persistence, but always wrap it in error handling."

---

### DAY 5 - Capstone: E-commerce Product Listing

#### What I Learned:
- Fetch API for retrieving external data
- Asynchronous JavaScript (async/await)
- Dynamic DOM rendering from API data
- Client-side search/filter functionality
- Client-side sorting algorithms
- Responsive product grid layout

#### Features Implemented:
- Fetch products from API (https://dummyjson.com/products)
- Display product cards with image, title, and price
- Search bar (real-time filtering)
- Sort by price (high to low / low to high)
- Fully responsive layout
- Loading states and error handling

#### Code Example:
```javascript
// Fetch and display products
async function fetchProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    displayProducts(data.products);
  } catch (error) {
    console.error('Error fetching products:', error);
    showError('Failed to load products. Please try again.');
  }
}

// Filter products by search term
function filterProducts(searchTerm) {
  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayProducts(filtered);
}

// Sort products by price
function sortByPrice(order) {
  const sorted = [...filteredProducts].sort((a, b) =>
    order === 'high' ? b.price - a.price : a.price - b.price
  );
  displayProducts(sorted);
}
```

## Key Learnings & Insights

### HTML
- Semantic markup improves accessibility and SEO
- Proper form validation reduces client-side errors
- ARIA attributes enhance screen reader support

### CSS
- Mobile-first approach simplifies responsive design
- CSS Grid is better than Flexbox for complex 2D layouts
- CSS custom properties (variables) improve maintainability
- Understanding specificity prevents style conflicts

### JavaScript
- Arrow functions provide cleaner syntax and lexical `this`
- Array methods (`map`, `filter`, `reduce`) are more readable than loops
- Destructuring and spread operators reduce boilerplate
- Event delegation improves performance for dynamic content
- LocalStorage is synchronous—use it wisely
- Always handle async errors with try/catch

### Debugging
- DevTools breakpoints are essential for understanding code flow
- Step in/out/over functions help trace execution
- Watch expressions monitor variable changes in real-time
- Console logging is useful but strategic breakpoints are better

---

## Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Animations
- **JavaScript (ES6+)** - Modern syntax, DOM manipulation
- **Fetch API** - Asynchronous data retrieval
- **LocalStorage API** - Client-side persistence
- **Chrome DevTools** - Debugging and performance analysis

---

## Challenges Faced & Solutions

### Challenge 1: CSS Specificity Conflicts
**Problem:** Styles weren't applying as expected

**Solution:** Used browser DevTools to inspect specificity, reorganized CSS with proper cascade order

### Challenge 2: Asynchronous Data Loading
**Problem:** Products weren't displaying immediately

**Solution:** Added loading indicators and proper async/await error handling

### Challenge 3: LocalStorage Data Corruption
**Problem:** Invalid JSON breaking the todo app

**Solution:** Wrapped all localStorage operations in try/catch blocks with error logging to `logs/errors.md`

### Challenge 4: Event Listener Memory Leaks
**Problem:** Multiple event listeners being added on re-renders

**Solution:** Implemented proper event listener cleanup and delegation patterns

---

## Next Steps
- Explore CSS preprocessors (SASS/SCSS)
- Learn CSS-in-JS approaches
- Dive deeper into JavaScript design patterns
- Study browser performance optimization
- Explore Web APIs (Geolocation, Notifications, etc.)
- Implement IndexedDB for more complex client-side storage
- Add unit testing with Jest

---

## Resources Used
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks - A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Tricks - A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [JavaScript.info](https://javascript.info/)
- [DummyJSON API](https://dummyjson.com/)
- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/)

---

## Conclusion
Week 2 solidified my understanding of frontend fundamentals. I now feel confident building responsive, interactive web applications using vanilla HTML, CSS, and JavaScript. The hands-on projects helped bridge the gap between theory and practical application.

