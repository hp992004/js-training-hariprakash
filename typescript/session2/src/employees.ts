
interface Person {
  firstName: string;
  lastName: string;
  email: string;
}

interface Employee extends Person {
  readonly employeeId: string;
  department: string;
  startDate: Date;
}

interface Manager extends Employee {
  teamSize: number;
  directReports: string[];
}

function getFullName(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

function introduceEmployee(employee: Employee): string {
  return `Hi, I am ${getFullName(employee)} from ${
    employee.department
  }, joined on ${employee.startDate.toLocaleDateString()}`;
}

const person: Person = {
  firstName: "Hari",
  lastName: "Prakash",
  email: "hari@example.com",
};

const employee: Employee = {
  firstName: "Ram",
  lastName: "Kumar",
  email: "ram@example.com",
  employeeId: "EMP001",
  department: "Engineering",
  startDate: new Date("2024-07-14"),
};

const manager: Manager = {
  firstName: "Anu",
  lastName: "Sharma",
  email: "anu@example.com",
  employeeId: "EMP002",
  department: "Engineering",
  startDate: new Date("2023-06-15"),
  teamSize: 7,
  directReports: ["EMP003", "EMP004", "EMP005", "EMP006", "EMP007"],
};

console.log(getFullName(person));
console.log(getFullName(employee));
console.log(getFullName(manager));

console.log(introduceEmployee(employee));
console.log(introduceEmployee(manager));

/*
getFullName() accepts Person, Employee, and Manager because
Employee extends Person and Manager extends Employee. This means
Employee and Manager automatically contain all the properties of
Person, so they can be used wherever a Person is expected.
*/