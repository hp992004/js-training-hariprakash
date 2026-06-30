#  Task Tracker

A simple and interactive Task Tracker web application built using **HTML**, **CSS**, **JavaScript**, and **TypeScript**. It allows users to manage daily tasks with features like filtering, sorting, editing, dark mode, drag-and-drop reordering, and local storage.

---

##  Features

-  Add new tasks
-  Edit task names using a custom popup
-  Mark tasks as Done / Undo
-  Clear all tasks
-  Filter tasks (All, Pending, Done)
-  Sort tasks by Priority or Due Date
-  Live task counter
-  Task summary grouped by priority
-  Save tasks using Local Storage
-  Export tasks as JSON
-  Dark / Light mode toggle
-  Drag and Drop task reordering
-  Responsive and modern user interface

---

##  Technologies Used

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- TypeScript
- Local Storage API
- HTML Drag and Drop API
- Blob API
- URL.createObjectURL()

---

##  Project Structure

```
Task-Tracker/
│
├── index.html
├── style.css
├── main.js
├── tasks.ts
├── tasks.js
├── tsconfig.json
└── README.md
```

---

##  Features in Detail

### Add Task

Users can add a task by providing:

- Task Name
- Priority
- Due Date

---

### Edit Task

Click on any task name to open a custom popup where the task name can be edited.

---

### Task Status

Each task can be marked as **Done** or reverted back using the Done/Undo button.

---

### Filter Tasks

Tasks can be filtered by:

- All
- Pending
- Done

---

### Sort Tasks

Tasks can be sorted by:

- Priority
- Due Date

---

### Dark Mode

Users can switch between Light Mode and Dark Mode using the toggle button in the header.

---

### Export Tasks

The application allows users to download all tasks as a JSON file.

---

### Drag & Drop

Tasks can be reordered using the HTML Drag and Drop API.

---

### Local Storage

All tasks are automatically saved in the browser's Local Storage and restored after refreshing the page.

---

##  Summary Table

The application groups tasks by priority using a generic TypeScript `groupBy()` function and displays the number of tasks under:

- High
- Medium
- Low

---

## Learning Objectives

This project demonstrates:

- Semantic HTML
- Responsive CSS
- DOM Manipulation
- Event Handling
- Local Storage
- TypeScript Interfaces
- TypeScript Classes
- TypeScript Generics
- ES6 Modules
- HTML Drag and Drop API
- Blob and File Download APIs

---
