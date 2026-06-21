type Predicate<T> = (value: T) => boolean;
type Transform<T, U> = (value: T) => U;
type EventHandler = (eventName: string, payload: unknown) => void;

function filter<T>(items: T[], predicate: Predicate<T>): T[] {
  return items.filter(predicate);
}

function transform<T, U>(
  items: T[],fn: Transform<T, U>): U[] {
  return items.map(fn);
}

const numberArray = [1, 2, 3, 4, 5];
const even = filter(numberArray, (num) => num % 2 === 0);
console.log(even); 
const stringNumbers = transform(numberArray,(num) => `Number: ${num}`);
console.log(stringNumbers);

const handleEvent: EventHandler = (eventName, payload) => {
  console.log(`Event: ${eventName}`, payload);
};

handleEvent("login", { userId: "USR101" });