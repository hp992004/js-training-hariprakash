export interface Task {
    id: number;
    name: string;
    priority: "Low" | "Medium" | "High";
    dueDate: string;
    done: boolean;
}

export class TaskManager {
    private tasks: Task[] = [];
    constructor() {
        this.load();
    }
    add(data: Omit<Task, "id" | "done">): Task {
        const task: Task = {
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
    edit(id: number, newName: string): void {
    const task = this.tasks.find(function (task) {
        return task.id === id;
    });
    if (task) {
        task.name = newName;
        this.save();
    }
}
    getAll(): Task[] {
        return [...this.tasks];
    }
    toggle(id: number): void {
        const task = this.tasks.find(function (task) {
            return task.id === id;
        });
        if (task) {
            task.done = !task.done;
            this.save();
        }
    }
    filter(status: "all" | "done" | "pending"): Task[] {
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
    sortBy(field: keyof Pick<Task, "priority" | "dueDate">): Task[] {
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
        } else {
            sorted.sort(function (a, b) {
                return (
                    new Date(a.dueDate).getTime() -
                    new Date(b.dueDate).getTime()
                );
            });
        }
        return sorted;
    }
    clear(): void {
        this.tasks = [];
        this.save();
    }
    private save(): void {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    load(): void {
        const stored = localStorage.getItem("tasks");
        if (stored) {
            this.tasks = JSON.parse(stored);
        }
    }

    reorder(fromId: number, toId: number): void {
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
export function groupBy<T>(
    items: T[],
    key: keyof T
): Record<string, T[]> {
    const groups: Record<string, T[]> = {};
    items.forEach(function (item) {
        const value = String(item[key]);
        if (!groups[value]) {
            groups[value] = [];
        }
        groups[value].push(item);
    });
    return groups;
}