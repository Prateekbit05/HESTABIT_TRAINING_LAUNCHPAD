// ================================
// LOAD TODOS FROM LOCALSTORAGE
// ================================
let todos = []

const savedTodos = localStorage.getItem("todos")

if (savedTodos) {
  try {
    todos = JSON.parse(savedTodos)
  } catch (e) {
    todos = []
  }
}

// ================================
// DOM ELEMENTS
// ================================
const todoList = document.getElementById("todo-list")
const form = document.getElementById("todo-form")
const input = document.getElementById("todo-input")

// ================================
// SAVE TODOS
// ================================
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos))
}

// ================================
// RENDER TODOS
// ================================
const renderTodos = () => {
  todoList.innerHTML = ""

  if (todos.length === 0) {
    todoList.innerHTML = "<li>No todos yet</li>"
    return
  }

  todos.forEach((todo, index) => {
    const li = document.createElement("li")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = todo.completed

    checkbox.addEventListener("change", () => {
      toggleComplete(index)
    })

    const span = document.createElement("span")
    span.textContent = todo.text
    if (todo.completed) span.classList.add("completed")

    const editBtn = document.createElement("button")
    editBtn.textContent = "Edit"
    editBtn.addEventListener("click", () => editTodo(index))

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "X"
    deleteBtn.addEventListener("click", () => deleteTodo(index))

    li.append(checkbox, span, editBtn, deleteBtn)
    todoList.appendChild(li)
  })
}

// ================================
// ADD TODO
// ================================
form.addEventListener("submit", (e) => {
  e.preventDefault()

  const value = input.value.trim()
  if (!value) return

  todos.push({
    text: value,
    completed: false
  })

  saveTodos()
  renderTodos()
  input.value = ""
})

// ================================
// DELETE TODO
// ================================
const deleteTodo = (index) => {
  todos.splice(index, 1)
  saveTodos()
  renderTodos()
}

// ================================
// EDIT TODO
// ================================
const editTodo = (index) => {
  const newText = prompt("Edit todo", todos[index].text)
  if (!newText) return

  const trimmed = newText.trim()
  if (!trimmed) return

  todos[index].text = trimmed
  saveTodos()
  renderTodos()
}

// ================================
// TOGGLE COMPLETE
// ================================
const toggleComplete = (index) => {
  todos[index].completed = !todos[index].completed
  saveTodos()
  renderTodos()
}

// ================================
// INITIAL RENDER
// ================================
renderTodos()
