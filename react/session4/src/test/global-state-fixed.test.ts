import { test, expect } from 'vitest'

function addItem(cart: string[], item: string): string[] {
  return [...cart, item]
}

function removeItem(cart: string[], item: string): string[] {
  return cart.filter(i => i !== item)
}

test('cart starts empty', () => {
    const cart: string[] = []
  expect(cart).toHaveLength(0)
})

test('can add an item', () => {
    const cart: string[] = []
  const result = addItem(cart,'Rahul')
  expect(result).toHaveLength(1)
})

test('can add two items', () => {
  let cart: string[] = []
  cart = addItem(cart,'Rahul')
  cart = addItem(cart,'Priya')
  expect(cart).toHaveLength(2)
})

test('cart is empty again', () => {
    const cart: string[] = []
  expect(cart).toHaveLength(0) 
})

/*
FIRST principles:

- Fast: No shared state cleanup is needed between tests.
- Independent: Each test uses its own cart, so tests do not affect each other.
- Repeatable: Tests produce the same result regardless of execution order.

The broken version violated the Independent and Repeatable principles because all tests shared a global cart.
*/