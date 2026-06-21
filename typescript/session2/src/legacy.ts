interface InvoiceItem {
  price: number;
  quantity: number;
}

function calculateInvoiceTotal(items: InvoiceItem[],taxRate: number): number {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total + total * taxRate;
}

function formatCurrency(amount: number,currencyCode: string): string {
  return currencyCode + amount.toFixed(2);
}

interface User {
  title?: string;
  firstName: string;
  lastName: string;
}

function getUserDisplayName(user: User): string {
  if (user.title) {
    return `${user.title} ${user.firstName} ${user.lastName}`;
  }
  return `${user.firstName} ${user.lastName}`;
}

interface Product {
  category: string;
  [key: string]: unknown;
}

function findProductByCategory(products: Product[],category: string): Product[] {
  return products.filter((p) => p.category === category);
}