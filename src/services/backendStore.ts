import { Product, OrderInfo } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

const ORDERS_KEY = 'mot_chut_nang_orders_db_v1';
const PRODUCTS_KEY = 'mot_chut_nang_products_db_v1';

// Seed sample realistic orders for demo
const SEED_ORDERS: OrderInfo[] = [
  {
    orderId: 'MCN-8291',
    fullName: 'Lê Thảo My',
    phone: '0912 345 678',
    address: 'Căn hộ 402, Tòa N03, Tây Hồ, Hà Nội',
    note: 'Chị ơi viết giúp em lên thiệp: "Tặng Mai, chúc cậu luôn nở nụ cười rực rỡ như mầm hoa này nhé!"',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        selectedColor: 'Xanh Sage',
        quantity: 1,
      },
      {
        product: INITIAL_PRODUCTS[1],
        selectedColor: 'Vàng Nắng',
        quantity: 1,
      },
    ],
    subtotal: 98000,
    shippingFee: 20000,
    total: 118000,
    status: 'preparing',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    orderId: 'MCN-4712',
    fullName: 'Trần Gia Hưng',
    phone: '0988 776 554',
    address: '142 Nguyễn Thị Minh Khai, P.6, Q.3, TP. Hồ Chí Minh',
    note: 'Gói kỹ giúp em vì làm quà sinh nhật cho bạn gái ạ',
    items: [
      {
        product: INITIAL_PRODUCTS[2], // Bạn Cỏ Bốn Lá
        selectedColor: 'Xanh Lục Bảo',
        quantity: 2,
      },
      {
        product: INITIAL_PRODUCTS[7], // Túi Mini
        selectedColor: 'Kem Mộc',
        quantity: 1,
      },
    ],
    subtotal: 183000,
    shippingFee: 0,
    total: 183000,
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    orderId: 'MCN-3095',
    fullName: 'Nguyễn Phương Anh',
    phone: '0905 123 987',
    address: '89 Phan Châu Trinh, Hải Châu, Đà Nẵng',
    note: 'Cho em xin thêm 1 thiệp trắng nhé tiệm',
    items: [
      {
        product: INITIAL_PRODUCTS[3], // Cúc hoạ mi
        selectedColor: 'Trắng Ngà',
        quantity: 1,
      },
    ],
    subtotal: 55000,
    shippingFee: 20000,
    total: 75000,
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
  },
];

export const BackendStore = {
  getProducts(): Product[] {
    try {
      const stored = localStorage.getItem(PRODUCTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  },

  saveProducts(products: Product[]) {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  },

  updateProductStock(productId: string, newStock: number) {
    const list = this.getProducts().map((p) =>
      p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p
    );
    this.saveProducts(list);
    return list;
  },

  updateProduct(updated: Product) {
    const list = this.getProducts().map((p) => (p.id === updated.id ? updated : p));
    this.saveProducts(list);
    return list;
  },

  addProduct(newProd: Product) {
    const list = [newProd, ...this.getProducts()];
    this.saveProducts(list);
    return list;
  },

  deleteProduct(productId: string) {
    const list = this.getProducts().filter((p) => p.id !== productId);
    this.saveProducts(list);
    return list;
  },

  getOrders(): OrderInfo[] {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    // Seed initial orders if empty
    this.saveOrders(SEED_ORDERS);
    return SEED_ORDERS;
  },

  saveOrders(orders: OrderInfo[]) {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  },

  createOrder(order: Omit<OrderInfo, 'status' | 'createdAt'>): OrderInfo {
    const newOrder: OrderInfo = {
      ...order,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const orders = [newOrder, ...this.getOrders()];
    this.saveOrders(orders);

    // Call backend API in background to persist on server
    try {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      }).catch((err) => console.log('Backend sync offline:', err));
    } catch (e) {
      // Local storage continues to function
    }

    // Decrement stock for ordered items
    const products = this.getProducts();
    order.items.forEach((item) => {
      const p = products.find((prod) => prod.id === item.product.id);
      if (p) {
        p.stock = Math.max(0, p.stock - item.quantity);
      }
    });
    this.saveProducts(products);

    return newOrder;
  },

  updateOrderStatus(orderId: string, status: OrderInfo['status']) {
    const orders = this.getOrders().map((o) =>
      o.orderId === orderId ? { ...o, status } : o
    );
    this.saveOrders(orders);
    return orders;
  },
};
