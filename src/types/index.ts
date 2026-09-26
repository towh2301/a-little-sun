export interface ProductAngle {
  label: string; // Mặt trước, Mặt sau, Bên trái, Bên phải, Mặt trên, Mặt dưới
  image: string;
}

export interface MaterialColorItem {
  part: string; // Da ếch, Bụng, Má, Balo, Hoa nhỏ...
  colorName: string;
  hex: string;
}

export interface ProductVariantEdition {
  id: string;
  name: string; // Ví dụ: Ếch đội mũ (du lịch), Ếch cầm hoa, Ếch áo mưa...
  tagline: string;
  image?: string;
  priceDelta?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  subtitle?: string; // Ví dụ: "- Nhỏ bé nhưng mang cả bầu trời đáng yêu -"
  story?: string; // Câu chuyện dài ấm áp (như trong ảnh mẫu)
  color: string;
  colorHex: string;
  category: string;
  type?: 'mam' | 'hoa' | 'qua' | 'phukien' | 'linhvat';
  description: string;
  image: string;
  size: string;
  sizeDimension?: {
    height: string;
    width: string;
    note?: string;
  };
  material: string;
  materialsList?: MaterialColorItem[];
  angles?: ProductAngle[];
  usageIdeas?: string[]; // Làm móc khóa, trang trí bàn học, làm quà tặng...
  variants?: ProductVariantEdition[];
  stock: number;
  highlightText?: string;
  packagingNote: string;
  storyQuote?: string;
  tags?: string[]; // Nhỏ xinh nhẹ nhàng, Thân thiện dễ thương, Mang năng lượng tích cực
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedVariant?: string;
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
  status: 'pending' | 'preparing' | 'shipping' | 'completed' | 'cancelled';
  createdAt: string;
  customerNoteAdmin?: string;
}
