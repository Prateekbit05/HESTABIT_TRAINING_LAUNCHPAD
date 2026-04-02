# Day 4 – JS Utilities + LocalStorage Mini-Project

## 🎯 Objective
Build modular JavaScript utilities and a fully persistent Todo App using LocalStorage — with DevTools debugging practice throughout.

---

## 📚 Topics Covered

| Topic | Activity |
|---|---|
| Debugging DevTools | Breakpoints, watch, step in/over/out |
| Custom JS Utilities | `debounce`, `throttle`, `groupBy` |
| LocalStorage Project | Todo App (persist on refresh) |
| Error Handling | `try/catch` + error boundary (`logs/errors.md`) |

---

## 🧪 Exercise

Built a **Todo App** with full LocalStorage persistence:
- ➕ Add tasks
- ✏️ Edit tasks
- ✅ Mark as complete
- 🗑️ Delete tasks
- 🔄 Persists after page refresh

---

## ✅ Deliverables

- `todo-app/` — Full Todo App source code
- `todo-app/Screenshots/` — DevTools debugging screenshots for each operation

---

## 📸 Screenshots

### ➕ Add Todo

| Step | Screenshot |
|---|---|
| Text added into input | ![](./todo-app/Screenshots/ADD_TODO/text_added_into_function.png) |
| Debugging paused | ![](./todo-app/Screenshots/ADD_TODO/debugging_paused.png) |
| Step Over | ![](./todo-app/Screenshots/ADD_TODO/step_over_function.png) |
| Step In | ![](./todo-app/Screenshots/ADD_TODO/step_in_function.png) |
| Step Out | ![](./todo-app/Screenshots/ADD_TODO/step_out_function.png) |

---

### ✅ Complete Todo

| Step | Screenshot |
|---|---|
| Task marked complete | ![](./todo-app/Screenshots/COMPLETION_TODO/task_complete_todo.png) |
| Debugging paused | ![](./todo-app/Screenshots/COMPLETION_TODO/Debugging_paused.png) |
| Step Over | ![](./todo-app/Screenshots/COMPLETION_TODO/step_over_function.png) |
| Step In | ![](./todo-app/Screenshots/COMPLETION_TODO/step_in_function.png) |
| Step Out | ![](./todo-app/Screenshots/COMPLETION_TODO/step_out_function.png) |

---

### 🗑️ Delete Todo

| Step | Screenshot |
|---|---|
| Task deleted | ![](./todo-app/Screenshots/DELETE_TODO/task_deleted.png) |
| Event deletion | ![](./todo-app/Screenshots/DELETE_TODO/event_deletion.png) |
| Debugging paused | ![](./todo-app/Screenshots/DELETE_TODO/deletion_debugging_paused.png) |
| Step Over | ![](./todo-app/Screenshots/DELETE_TODO/step_over_function.png) |
| Step Into | ![](./todo-app/Screenshots/DELETE_TODO/step_into_function.png) |
| Step Out | ![](./todo-app/Screenshots/DELETE_TODO/step_out_function.png) |

---

### ✏️ Edit Todo

| Step | Screenshot |
|---|---|
| Edit prompt | ![](./todo-app/Screenshots/EDIT_TODO/task_edit_prompt.png) |
| Task name edited | ![](./todo-app/Screenshots/EDIT_TODO/edit_task_name.png) |
| Debugging paused | ![](./todo-app/Screenshots/EDIT_TODO/debugging_paused.png) |
| Step Over | ![](./todo-app/Screenshots/EDIT_TODO/step_over.png) |
| Step In | ![](./todo-app/Screenshots/EDIT_TODO/step_in.png) |
| Step Out | ![](./todo-app/Screenshots/EDIT_TODO/step_out.png) |

---

## 🧠 Key Learnings

### Debugging with DevTools
- Set **breakpoints** directly in the Sources tab to pause execution
- Used **Step Over** (`F10`) to execute line by line without entering functions
- Used **Step In** (`F11`) to dive inside a function call
- Used **Step Out** (`Shift+F11`) to exit the current function
- **Watch** panel to monitor variable values in real time

### Custom JS Utilities
- **debounce** — delays function execution until after a pause in events (e.g. search input)
- **throttle** — limits how often a function fires (e.g. scroll/resize handlers)
- **groupBy** — groups array items by a key using `reduce()`

### LocalStorage
- `localStorage.setItem(key, JSON.stringify(data))` — save data
- `localStorage.getItem(key)` — retrieve data
- `JSON.parse()` to convert string back to object/array
- Data persists across page refreshes and browser sessions

### Error Handling
- `try/catch` blocks to gracefully handle runtime errors
- Logged errors to `logs/errors.md` for traceability
- Wrapped LocalStorage reads in `try/catch` to handle corrupted data

---

## 📁 Folder Structure

```
DAY_4-JS_UTILS_LOCALSTORAGE/
└── todo-app/
    ├── index.html
    ├── style.css
    ├── script.js
    └── Screenshots/
        ├── ADD_TODO/
        │   ├── debugging_paused.png
        │   ├── step_in_function.png
        │   ├── step_out_function.png
        │   ├── step_over_function.png
        │   └── text_added_into_function.png
        ├── COMPLETION_TODO/
        │   ├── Debugging_paused.png
        │   ├── step_in_function.png
        │   ├── step_out_function.png
        │   ├── step_over_function.png
        │   └── task_complete_todo.png
        ├── DELETE_TODO/
        │   ├── deletion_debugging_paused.png
        │   ├── event_deletion.png
        │   ├── step_into_function.png
        │   ├── step_out_function.png
        │   ├── step_over_function.png
        │   └── task_deleted.png
        └── EDIT_TODO/
            ├── debugging_paused.png
            ├── edit_task_name.png
            ├── step_in.png
            ├── step_out.png
            ├── step_over.png
            └── task_edit_prompt.png
```
