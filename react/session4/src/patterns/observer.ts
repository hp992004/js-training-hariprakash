type Order = {
  id: string
  customerEmail: string
  total: number
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
    this.observers.forEach(o => o.update(data))
  }
}

class OrderStore extends Subject {
  private orders: Order[] = []

  placeOrder(order: Order): void {
    this.orders.push(order)
    this.notify(order)
  }

  cancelOrder(id: string): void {
    const index = this.orders.findIndex(order => order.id === id)

    if (index !== -1) {
      const [order] = this.orders.splice(index, 1)
      this.notify({ cancelled: true, order })
    }
  }

  getOrders(): Order[] {
    return [...this.orders]
  }
}

class ShipmentQueue implements Observer {
  update(data: unknown): void {
    const order = data as Order
    console.log(`[ShipmentQueue] scheduling delivery for ${order.id}`)
  }
}

class EmailService implements Observer {
  update(data: unknown): void {
    const order = data as Order
    console.log(
      `[EmailService] sending confirmation to ${order.customerEmail}`
    )
  }
}

class AuditLog implements Observer {
  update(data: unknown): void {
    const order = data as Order
    console.log(
      `[AuditLog] recorded order ${order.id} at ${new Date().toISOString()}`
    )
  }
}

const store = new OrderStore()
const shipment = new ShipmentQueue()
const email = new EmailService()
const audit = new AuditLog()

store.subscribe(shipment)
store.subscribe(email)
store.subscribe(audit)

store.placeOrder({
  id: 'ORD-001',
  customerEmail: 'alice@example.com',
  total: 1500,
})

store.placeOrder({
  id: 'ORD-002',
  customerEmail: 'bob@example.com',
  total: 800,
})

/*
`notify` is marked as `protected` so only the `Subject` class and its
subclasses can notify observers when the subject's state changes.

If it were `public`, external code could call `subject.notify(data)`
directly and send fake or premature updates. This would allow observers
to react to changes that never actually happened, breaking encapsulation
and causing inconsistent application state.
*/

/*
Adding `AuditLog` required no changes to `OrderStore`.
Only a new observer was created and subscribed.

This shows that the Observer pattern is open for extension but
closed for modification, allowing new behavior to be added
without changing the subject's implementation.
*/

console.log('\n--- Unsubscribe AuditLog ---')

store.unsubscribe(audit)

store.placeOrder({
  id: 'ORD-003',
  customerEmail: 'carol@example.com',
  total: 200,
})

console.log('\n--- Re-subscribe AuditLog ---')

store.subscribe(audit)

store.placeOrder({
  id: 'ORD-004',
  customerEmail: 'david@example.com',
  total: 500,
})

/*
Unsubscribing an observer at runtime is useful when it should no
longer receive updates.

Examples:
1. A user logs out, so their notification service is unsubscribed
   to stop receiving order updates.
2. A temporary analytics or monitoring component finishes its work
   and unsubscribes to avoid processing future events unnecessarily.
*/

class AnalyticsService implements Observer {
  update(data: unknown): void {
    const order = data as Order
    console.log(
      `[AnalyticsService] tracking purchase event for order ${order.id}, value: ${order.total}`
    )
  }
}

const analytics = new AnalyticsService()

store.subscribe(analytics)

store.placeOrder({
  id: 'ORD-005',
  customerEmail: 'eve@example.com',
  total: 1200,
})

/*
From `placeOrder` alone, you cannot tell that four different actions
occur because it only calls `this.notify(order)`.

This is not a problem when the observer list is small and well
documented. It can become a problem when many observers are added,
making the flow of execution harder to understand and debug.

If the observer chain becomes very long, every notification triggers
many updates, increasing processing time and making it more difficult
to track dependencies, failures, and performance issues.
*/