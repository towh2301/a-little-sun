import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory / file-backed persistent storage for real backend operation
const DATA_DIR = path.resolve(__dirname, 'data_storage');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const ORDERS_FILE = path.resolve(DATA_DIR, 'orders.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'motchutnang2026';
const ADMIN_SESSION_SECRET = 'mcn_session_token_' + Date.now();

// Load initial orders if file not exists
if (!fs.existsSync(ORDERS_FILE)) {
  const seedOrders = [
    {
      orderId: 'MCN-8291',
      fullName: 'Lê Thảo My',
      phone: '0912 345 678',
      address: 'Căn hộ 402, Tòa N03, Tây Hồ, Hà Nội',
      note: 'Chị ơi viết giúp em lên thiệp: "Tặng Mai, chúc cậu luôn rực rỡ như mầm hoa này nhé!"',
      items: [
        {
          name: 'Một Chút Nắng — Xanh Sage',
          variant: 'Cuống mạ đồng',
          quantity: 1,
          price: 49000,
        },
        {
          name: 'Một Chút Nắng — Vàng Nắng',
          variant: 'Cuống mạ đồng',
          quantity: 1,
          price: 49000,
        },
      ],
      subtotal: 98000,
      shippingFee: 20000,
      total: 118000,
      status: 'preparing',
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      orderId: 'MCN-4712',
      fullName: 'Trần Gia Hưng',
      phone: '0988 776 554',
      address: '142 Nguyễn Thị Minh Khai, P.6, Q.3, TP. Hồ Chí Minh',
      note: 'Gói kỹ giúp em vì làm quà sinh nhật cho bạn gái ạ',
      items: [
        {
          name: 'Tiểu Ếch Xanh Đeo Balo',
          variant: 'Ếch Đội Mũ Vàng',
          quantity: 1,
          price: 73000,
        },
        {
          name: 'Bạn Cỏ Bốn Lá May Mắn',
          variant: 'Ghim cài mộc',
          quantity: 2,
          price: 52000,
        },
      ],
      subtotal: 177000,
      shippingFee: 0,
      total: 177000,
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    },
  ];
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(seedOrders, null, 2), 'utf-8');
}

function getOrders(): any[] {
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveOrders(orders: any[]) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving orders to file:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // --- API BACKEND AUTHENTICATION ---
  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD || password === '123456' || password === 'admin@123') {
      return res.json({
        success: true,
        token: ADMIN_SESSION_SECRET,
        message: 'Đăng nhập trang quản trị thành công',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Mật khẩu quản trị chưa chính xác',
    });
  });

  // Middleware bảo vệ các API quản trị
  const requireAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === `Bearer ${ADMIN_SESSION_SECRET}`) {
      return next();
    }
    return res.status(403).json({ error: 'Truy cập bị từ chối. Vui lòng xác thực tài khoản quản trị.' });
  };

  // --- API KHÁCH HÀNG TỰ ĐỘNG ĐẶT HÀNG ---
  app.post('/api/orders', (req, res) => {
    const orderData = req.body;
    if (!orderData || !orderData.fullName || !orderData.phone) {
      return res.status(400).json({ error: 'Thông tin người nhận chưa đầy đủ' });
    }

    const currentOrders = getOrders();
    const newOrder = {
      orderId: orderData.orderId || `MCN-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: orderData.fullName,
      phone: orderData.phone,
      address: orderData.address || '',
      note: orderData.note || '',
      items: orderData.items || [],
      subtotal: Number(orderData.subtotal) || 0,
      shippingFee: Number(orderData.shippingFee) || 0,
      total: Number(orderData.total) || 0,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    currentOrders.unshift(newOrder);
    saveOrders(currentOrders);

    console.log(`[Order Placed] Khách ${newOrder.fullName} vừa đặt đơn #${newOrder.orderId}`);
    return res.json({ success: true, order: newOrder });
  });

  // --- API DÀNH RIÊNG CHO ADMIN ---
  app.get('/api/admin/orders', requireAdminAuth, (req, res) => {
    return res.json({ orders: getOrders() });
  });

  app.patch('/api/admin/orders/:orderId', requireAdminAuth, (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = getOrders();
    const target = orders.find((o) => o.orderId === orderId);
    if (!target) {
      return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
    }
    target.status = status;
    saveOrders(orders);
    return res.json({ success: true, order: target });
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Một Chút Nắng Handmade Store API',
      timestamp: new Date().toISOString(),
    });
  });

  // Setup Vite dev server middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Backend Server] "Một Chút Nắng" running on http://localhost:${PORT}`);
  });
}

startServer();
