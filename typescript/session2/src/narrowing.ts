function describe(value: string | number | boolean | null): string {
  if (value === null) {
    return "No value provided";
  }
  if (typeof value === "string") {
    return `String of length ${value.length}: ${value}`;
  }
  if (typeof value === "number") {
    return `Number: ${value.toFixed(2)}`;
  }
  return `Boolean: ${value}`;
}

interface Cat {
  meow(): void;
}
interface Dog {
  bark(): void;
}
function makeSound(animal: Cat | Dog): void {
  if ("meow" in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
}

function summarise(input: string | number[] | { label: string }): string {
  if (typeof input === "string") {
    return `Text: ${input}`;
  }
  if (Array.isArray(input)) {
    return `Array with ${input.length} numbers`;
  }
  return `Label: ${input.label}`;
}

interface PetCat {
  kind: "cat";
  meow(): void;
}
interface PetDog {
  kind: "dog";
  bark(): void;
}
type Pet = PetCat | PetDog;
function makePetSound(pet: Pet): void {
  if (pet.kind === "cat") {
    pet.meow();
  } else {
    pet.bark();
  }
}

/*
Discriminated unions use a common property like 'kind' to identify
the exact type. They are more reliable than the 'in' operator because
the type is decided using a fixed value instead of checking whether
a property exists, which makes the code easier to understand and safer
to maintain.
*/