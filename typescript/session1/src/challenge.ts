// Challenge 1

function stopExecution(reason: string): never {
  throw new Error(reason);
}

function calculateDiscount(
  amount: number,
  reductionRate?: number
): number {
  if (reductionRate === undefined) {
    return amount;
  }

  if (reductionRate >= 100) {
    return stopExecution("Discount cannot be 100% or more.");
  }

  return amount - (amount * reductionRate) / 100;
}
console.log(calculateDiscount(300));
console.log(calculateDiscount(580, 40));

// Challenge 2

function formatUserList(records: [string, number][]): string[] {
  return records.map(
    ([fullName, years]: [string, number]): string =>
      `${fullName} (${years} years)`
  );
}
console.log(
  formatUserList([
    ["Alice",30],
    ["Jhon", 21],
    ["Martha", 22],
    ["jeremy", 25]
  ])
);

// Challenge 3

function findFirst(
  words: string[],
  keyword: string
): string | undefined {
  return words.find(
    (entry: string): boolean => entry === keyword
  );
}
console.log(findFirst(["apple", "banana", "orange"], "banana"));
console.log(findFirst(["apple", "banana", "orange"], "grape"));