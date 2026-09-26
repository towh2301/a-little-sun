export interface Product {
  id: string;
  name: string;
  price: number;
  color: string;
  colorHex: string;
  category: 'sage' | 'vang' | 'xanhla' | 'camdat';
  description: string;
  image: string;
  size: string;
  material: string;
  stock: number;
  highlightText?: string;
  packagingNote: string;
  storyQuote?: string;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  quantity: number;
}

export interface OrderInfo {
  orderId: string;
  fullName: string;
  phone: string;
  address: string;
  note: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
}
