type Product = {
  name: string
  price: number
  rating: number
  salesCount: number
}

interface SortStrategy {
  sort(products: Product[]): Product[]
}

class SortByName implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.name.localeCompare(b.name))
  }
}

class SortByPrice implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.price - b.price)
  }
}

class SortByRating implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.rating - a.rating)
  }
}

class SortByPopularity implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.salesCount - a.salesCount)
  }
}

/*
`sort()` should return a new array so the original product list
remains unchanged. If it sorted in place, every part of the program
using the same array would see its order change unexpectedly.

Example:
const products = [{ name: 'B' }, { name: 'A' }]
const sorted = strategy.sort(products)

If `sort()` modifies `products` in place, both `products` and
`sorted` become [{ name: 'A' }, { name: 'B' }]. Code that expected
`products` to stay in its original order would now behave incorrectly.
*/

class ProductCatalogue {
  private strategy: SortStrategy
  constructor(strategy: SortStrategy) { this.strategy = strategy }
  setStrategy(strategy: SortStrategy): void { this.strategy = strategy }
  sort(products: Product[]): Product[] { return this.strategy.sort(products) }
}


const products: Product[] = [
  { name: 'Keyboard', price: 2499, rating: 4.3, salesCount: 1200 },
  { name: 'Monitor',  price: 18999, rating: 4.7, salesCount: 340 },
  { name: 'Headset',  price: 3499, rating: 4.1, salesCount: 870 },
  { name: 'Webcam',   price: 1999, rating: 3.9, salesCount: 2100 },
  { name: 'Mouse',    price: 899, rating: 4.5, salesCount: 3400 },
]

const catalogue = new ProductCatalogue(new SortByName())
console.log('By name:', catalogue.sort(products).map(p => p.name))

catalogue.setStrategy(new SortByPrice())
console.log('By price:', catalogue.sort(products).map(p => p.name))

catalogue.setStrategy(new SortByRating())
console.log('By rating:', catalogue.sort(products).map(p => p.name))

catalogue.setStrategy(new SortByPopularity())
console.log('By popularity:', catalogue.sort(products).map(p => p.name))

/*
The `sort()` call is the same for every strategy because each strategy
implements the same `SortStrategy` interface. The catalogue only depends
on the interface, not on the specific sorting algorithm.

Compared to an `if/else` implementation, new sorting methods can be
added by creating another strategy class without modifying
`ProductCatalogue`. This keeps the code simpler, easier to extend,
and follows the Open/Closed Principle.
*/

class SortByPriceDesc implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.price - a.price)
  }
}

catalogue.setStrategy(new SortByPriceDesc())
console.log(
  'By price desc:',
  catalogue.sort(products).map(p => p.name)
)

/*
No existing lines of the strategy classes or `ProductCatalogue`
needed to change. Only a new `SortByPriceDesc` class was added and
used in the test.

If the sorting logic had been implemented with a large `if/else`
statement, the existing method would have to be modified by adding
another condition. As more strategies are added, the method becomes
larger, harder to maintain, and more likely to introduce bugs.
*/

type SortFn = (products: Product[]) => Product[]

const sortByName:  SortFn = p => [...p].sort((a, b) => a.name.localeCompare(b.name))
const sortByPrice: SortFn = p => [...p].sort((a, b) => a.price - b.price)

function applySort(products: Product[], fn: SortFn): Product[] {
  return fn(products)
}

console.log('\nFunction-based strategies:')
console.log('By name:', applySort(products, sortByName).map(p => p.name))
console.log('By price:', applySort(products, sortByPrice).map(p => p.name))


console.log('By rating inline:', applySort(products, p => [...p].sort((a, b) => b.rating - a.rating)).map(p => p.name))

/*
A class-based strategy is preferable when the strategy needs its own
state, configuration, or helper methods in addition to the sorting logic.

For example, a sorting strategy that caches previous results or reads
configuration values (such as user preferences or locale-specific rules)
is better implemented as a class. A simple function is not sufficient
because it cannot easily encapsulate state and related behavior in a
structured, reusable way.
*/