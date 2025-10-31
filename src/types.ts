export interface Product {
  id: string;
  name: string;
  cantidad?: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}
