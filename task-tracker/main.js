import { TaskManager, groupBy } from "./tasks.js";

const manager = new TaskManager();
const form = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const summaryTable = document.querySelector("#summary-table");
const clearAllBtn = document.querySelector("#clear-all");
const allBtn = document.querySelector("#all-btn");
const pendingBtn = document.querySelector("#pending-btn");
const doneBtn = document.querySelector("#done-btn");
const sortSelect = document.querySelector("#sort-select");
const counter = document.querySelector("#task-counter");
const themeBtn = document.querySelector("#theme-toggle");
const modal = document.querySelector("#edit-modal");
const editInput = document.querySelector("#edit-task-name");
const saveBtn = document.querySelector("#save-task");
const cancelBtn = document.querySelector("#cancel-edit");
const exportBtn = document.querySelector("#export-btn");
let editingId = null;
let currentFilter = "all";
let currentSort = "";
let draggedTaskId = null;
renderTasks();

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#task-name").value;
    const priority = document.querySelector("#priority").value;
    const dueDate = document.querySelector("#due-date").value;
    manager.add({name,priority,dueDate});
    renderTasks();
    form.reset();
});
allBtn.addEventListener("click", function () {
    currentFilter = "all";
    renderTasks();
});
pendingBtn.addEventListener("click", function () {
    currentFilter = "pending";
    renderTasks();
});
doneBtn.addEventListener("click", function () {
    currentFilter = "done";
    renderTasks();
});
sortSelect.addEventListener("change", function () {
    currentSort = this.value;
    renderTasks();
});
clearAllBtn.addEventListener("click", function () {
    manager.clear();
    renderTasks();
});
exportBtn.addEventListener("click", function () {
    const tasks = manager.getAll();
    const json = JSON.stringify(tasks, null, 2);
    const blob = new Blob(
        [json],
        {
            type: "application/json"
        }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});
themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "Light Mode";
    } else {
        themeBtn.textContent = "Dark Mode";
    }
});
saveBtn.addEventListener("click", function () {

    const newName = editInput.value.trim();

    if (newName === "") {
        return;
    }

    manager.edit(editingId, newName);

    modal.classList.remove("show");

    renderTasks();

});
cancelBtn.addEventListener("click", function () {
    modal.classList.remove("show");
});

function renderTasks() {

    let tasks = manager.filter(currentFilter);

    if (currentSort === "priority") {
        tasks = manager.sortBy("priority");
    } else if (currentSort === "date") {
        tasks = manager.sortBy("dueDate");
    } else {
        tasks = manager.getAll();
    }

    if (currentFilter === "done") {
        tasks = tasks.filter(function (task) {
            return task.done;
        });
    }

    if (currentFilter === "pending") {
        tasks = tasks.filter(function (task) {
            return !task.done;
        });
    }

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const li = document.createElement("li");
        li.draggable = true;
        li.addEventListener("dragstart", function () {

    draggedTaskId = task.id;

});

li.addEventListener("dragover", function (e) {

    e.preventDefault();

});

li.addEventListener("dragenter", function () {

    li.classList.add("drag-over");

});

li.addEventListener("dragleave", function () {

    li.classList.remove("drag-over");

});

li.addEventListener("drop", function () {

    li.classList.remove("drag-over");

    manager.reorder(draggedTaskId, task.id);

    renderTasks();

});
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);

        if (due <= today) {
            li.style.color = "red";
        }

        if (task.done) {
            li.classList.add("done");
        }

        const taskName = document.createElement("strong");

        taskName.textContent = task.name;
        taskName.style.cursor = "pointer";
        taskName.title = "Click to edit";

        taskName.addEventListener("click", function () {

            editingId = task.id;

            editInput.value = task.name;

            modal.classList.add("show");

        });

        li.appendChild(taskName);

        li.append(" | Priority: " + task.priority);
        li.append(" | Due: " + task.dueDate);

        const button = document.createElement("button");

        button.textContent = task.done ? "Undo" : "Done";

        button.addEventListener("click", function () {

            manager.toggle(task.id);

            renderTasks();

        });

        li.appendChild(document.createTextNode(" "));
        li.appendChild(button);

        taskList.appendChild(li);

    });

    counter.textContent =
        `Showing ${tasks.length} of ${manager.getAll().length} tasks`;

    const grouped = groupBy(manager.getAll(), "priority");

    summaryTable.innerHTML = `
        <tr>
            <th>Priority</th>
            <th>Number of Tasks</th>
        </tr>
    `;

    ["High", "Medium", "Low"].forEach(function (priority) {

        const row = document.createElement("tr");

        const count = grouped[priority] ? grouped[priority].length : 0;

        row.innerHTML = `
            <td>${priority}</td>
            <td>${count}</td>
        `;

        summaryTable.appendChild(row);


    });

}