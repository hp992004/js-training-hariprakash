interface Product {
  id: string;
  name: string;
  price: number;
  tags: string[];
  discount?: number;
}

function applyDiscount(product: Product): number {
  const discount = product.discount ?? 0;
  return product.price - discount;
}
/*
If discount is undefined, subtracting it from price would
result in NaN, producing an incorrect final price.
*/

function getTagSummary(product: Product): string {
  return product.tags.join(", ").toUpperCase();
}
/*
There is no runtime bug with the tags data itself.
The issue is a typo: toUppercase() does not exist.
Calling it would throw:
"product.tags.join(...).toUppercase is not a function".
*/

function createProduct(name: string, price: number): Product {
  return {
    id: Math.random().toString(),
    name,
    price,
    tags: [],
  };
}
/*
Without parameter types, TypeScript would treat name and price
as implicit any values. A caller could pass incorrect values,
such as a string for price, leading to invalid Product objects.
*/

function findCheapest(products: Product[]): Product | undefined {
  const sorted = [...products].sort((a, b) => a.price - b.price);
  return sorted[0];
}
/*
If the products array is empty, sorted[0] will be undefined.
Returning it as a Product could cause errors later when code
tries to access properties like name or price.
*/

function printProduct(product: Product): void {
  console.log(`${product.name} costs ${product.price}`);
}
/*
This function is declared to return void, so returning
product.name is misleading. The return value would be ignored,
which could confuse developers into thinking the function
returns a string.
*/


/*
Task 3.4
I purposely added three type errors and ran:

npm run typecheck

TypeScript immediately showed all the errors before the code could run.
I fixed them one at a time and ran the command again after each change to
make sure the fixes worked. When there were no more type errors, the command
finished silently with no output.

The "typecheck" script is helpful because it lets us catch mistakes early,
giving us confidence that the code is safe before committing, pushing, or
deploying the project.
*/