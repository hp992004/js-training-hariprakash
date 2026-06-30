export class TaskManager {
    constructor() {
        this.tasks = [];
        this.load();
    }
    add(data) {
        const task = {
            id: Date.now(),
            name: data.name,
            priority: data.priority,
            dueDate: data.dueDate,
            done: false
        };
        this.tasks.push(task);
        this.save();
        return task;
    }
    edit(id, newName) {
        const task = this.tasks.find(function (task) {
            return task.id === id;
        });
        if (task) {
            task.name = newName;
            this.save();
        }
    }
    getAll() {
        return [...this.tasks];
    }
    toggle(id) {
        const task = this.tasks.find(function (task) {
            return task.id === id;
        });
        if (task) {
            task.done = !task.done;
            this.save();
        }
    }
    filter(status) {
        if (status === "done") {
            return this.tasks.filter(function (task) {
                return task.done;
            });
        }
        if (status === "pending") {
            return this.tasks.filter(function (task) {
                return !task.done;
            });
        }
        return [...this.tasks];
    }
    sortBy(field) {
        const sorted = [...this.tasks];
        if (field === "priority") {
            const order = {
                High: 1,
                Medium: 2,
                Low: 3
            };
            sorted.sort(function (a, b) {
                return order[a.priority] - order[b.priority];
            });
        }
        else {
            sorted.sort(function (a, b) {
                return (new Date(a.dueDate).getTime() -
                    new Date(b.dueDate).getTime());
            });
        }
        return sorted;
    }
    clear() {
        this.tasks = [];
        this.save();
    }
    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    load() {
        const stored = localStorage.getItem("tasks");
        if (stored) {
            this.tasks = JSON.parse(stored);
        }
    }
    reorder(fromId, toId) {
        const fromIndex = this.tasks.findIndex(function (task) {
            return task.id === fromId;
        });
        const toIndex = this.tasks.findIndex(function (task) {
            return task.id === toId;
        });
        if (fromIndex === -1 || toIndex === -1) {
            return;
        }
        const movedTask = this.tasks.splice(fromIndex, 1)[0];
        if (!movedTask) {
            return;
        }
        this.tasks.splice(toIndex, 0, movedTask);
        this.save();
    }
}
export function groupBy(items, key) {
    const groups = {};
    items.forEach(function (item) {
        const value = String(item[key]);
        if (!groups[value]) {
            groups[value] = [];
        }
        groups[value].push(item);
    });
    return groups;
}
//# sourceMappingURL=tasks.js.map