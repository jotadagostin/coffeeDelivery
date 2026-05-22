export type CoffeeCategory =
  | "TRADITIONAL"
  | "ICED"
  | "WITH MILK"
  | "SPECIAL"
  | "ALCOHOLIC";

export interface Coffee {
  id: string;
  name: string;
  description: string;
  categories: CoffeeCategory[];
  price: number;
  image: string;
}

export interface CartItem {
  coffee: Coffee;
  quantity: number;
}

export interface Order {
  items: CartItem[];
  address: {
    zip: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  paymentMethod: "credit" | "debit" | "cash";
}
