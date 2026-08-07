/*
Behavioral Pattern Audit

File reviewed: useInternForm.ts

1. Is there any object that directly calls methods on multiple other objects
   in response to a state change?
   → Possible Observer problem? No — Reason: The hook mainly manages form state
   and validation. It does not notify multiple independent objects when data changes.

2. Is there any function or method with a growing if/else block that selects
   different behaviour based on a type, mode, or string value?
   → Possible Strategy problem? No — Reason: The hook performs a single form
   workflow and does not contain multiple interchangeable algorithms.

3. Rule of three check:
   - Observer: No repeated direct-calling pattern was found.
   - Strategy: No growing if/else behaviour-selection logic was found.

4. If a pattern fits: Not applicable.

5. If no pattern fits: The current implementation is simple and focused on a
   single responsibility, so introducing Observer or Strategy would add
   unnecessary complexity without improving the design.
*/
type PriceChangeEvent = {
  product: string
  oldPrice: number
  newPrice: number
}

interface Observer {
  update(data: unknown): void
}

class Subject {
  private observers: Observer[] = []

  subscribe(observer: Observer): void {
    this.observers.push(observer)
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer)
  }

  protected notify(data: unknown): void {
    this.observers.forEach(observer => observer.update(data))
  }
}

class PricingEngine extends Subject {
  updatePrice(
    product: string,
    oldPrice: number,
    newPrice: number
  ): void {
    this.notify({ product, oldPrice, newPrice })
  }
}

class DiscountAlertObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent

    const percentage =
      ((event.oldPrice - event.newPrice) / event.oldPrice) * 100

    if (percentage > 10) {
      console.log(
        `[Discount] ${event.product} dropped by ${percentage.toFixed(2)}% — alert sent`
      )
    }
  }
}

class PriceHistoryObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent

    console.log(
      `[History] ${event.product}: ${event.oldPrice} -> ${event.newPrice}`
    )
  }
}

class BudgetTrackerObserver implements Observer {
  private readonly threshold = 2000

  update(data: unknown): void {
    const event = data as PriceChangeEvent

    if (event.newPrice < this.threshold) {
      console.log(
        `[Budget] ${event.product} is now under budget at ${event.newPrice}`
      )
    }
  }
}

const engine = new PricingEngine()

engine.subscribe(new DiscountAlertObserver())
engine.subscribe(new PriceHistoryObserver())
engine.subscribe(new BudgetTrackerObserver())

engine.updatePrice('Monitor', 18999, 14999)
engine.updatePrice('Keyboard', 2499, 1999)
engine.updatePrice('Mouse', 899, 849)

/*
Monitor (18999 -> 14999):
- DiscountAlertObserver fires because the price dropped by more than 10%.
- PriceHistoryObserver fires because it records every price change.
- BudgetTrackerObserver does not fire because the new price (14999) is still above 2000.

Keyboard (2499 -> 1999):
- DiscountAlertObserver fires because the price dropped by more than 10%.
- PriceHistoryObserver fires because it records every price change.
- BudgetTrackerObserver fires because the new price crossed below the 2000 threshold.

Mouse (899 -> 849):
- DiscountAlertObserver does not fire because the price drop is less than 10%.
- PriceHistoryObserver fires because it records every price change.
- BudgetTrackerObserver fires because the new price is under the 2000 threshold.
*/