interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface Product {
  readonly id: string;
  name: string;
  price: number;
  category: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  readonly id: string;
  customer: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: "pending" | "shipped" | "delivered";
  createdAt: Date;
}

function calculateTotal(order: Order): number {
  return order.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
}

const order: Order = {
  id: "ORD105",
  customer: "Ananya",
  items: [
    {
      product: {
        id: "P101",
        name: "Notebook",
        price: 120,
        category: "Stationery",
      },
      quantity: 5,
    },
    {
      product: {
        id: "P102",
        name: "Water Bottle",
        price: 350,
        category: "Accessories",
      },
      quantity: 2,
    },
  ],
  shippingAddress: {
    street: "45 Park Avenue",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    postalCode: "560001",
  },
  status: "shipped",
  createdAt: new Date("2026-06-21"),
};

console.log(calculateTotal(order));

/*
A recursive type is an interface that refers to itself.
It is useful for representing nested structures like trees.

interface Tree{
  value: string;
  child: Tree[];
}
*/