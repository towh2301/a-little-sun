import { Product } from '../types';

// Real generated high-fidelity assets matching user specs
import imgSage from '../assets/images/product_mam_sage_1790410347830.jpg';
import imgVang from '../assets/images/product_mam_vang_1790410359991.jpg';
import imgXanhLa from '../assets/images/product_mam_xanhla_1790410398098.jpg';
import imgCamDat from '../assets/images/product_mam_camdat_1790410370599.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'mcn-sage',
    name: 'Một Chút Nắng — Xanh Sage',
    price: 49000,
    color: 'Xanh Sage',
    colorHex: '#7A8B70',
    category: 'sage',
    description: 'Đây là một bông hoa len nhỏ được móc thủ công với tán lá xanh sage dịu mát, mang theo một chút nắng cho những ngày cần dịu dàng hơn.',
    image: imgSage,
    size: 'Khoảng 5–6cm',
    material: 'Len mềm cotton cao cấp, gài kim cài kim loại hoặc móc khoá',
    stock: 12,
    highlightText: 'Bán chạy nhất',
    packagingNote: 'Đóng gói cùng card kraft Một Chút Nắng & hoa khô nhỏ nhắn',
    storyQuote: 'Một mầm nhỏ, một ngày xanh bình yên',
  },
  {
    id: 'mcn-vang',
    name: 'Một Chút Nắng — Vàng Nắng',
    price: 49000,
    color: 'Vàng Nắng',
    colorHex: '#E8B85C',
    category: 'vang',
    description: 'Mầm hoa mang sắc vàng của ánh nắng ban mai, rực rỡ nhưng dịu êm, giúp bạn thắp sáng một góc nhỏ trong lòng mỗi khi ngắm nhìn.',
    image: imgVang,
    size: 'Khoảng 5–6cm',
    material: 'Len mềm cotton cao cấp, móc thủ công tỉ mỉ',
    stock: 15,
    highlightText: 'Ấm áp',
    packagingNote: 'Đóng gói cùng card kraft Một Chút Nắng: "Hôm nay chưa nở thì mai mình nở."',
    storyQuote: 'Giữ lại một chút nắng cho những ngày chậm lớn',
  },
  {
    id: 'mcn-xanhla',
    name: 'Một Chút Nắng — Xanh Lá',
    price: 49000,
    color: 'Xanh Lá',
    colorHex: '#53634E',
    category: 'xanhla',
    description: 'Chiếc mầm nhỏ đượm màu xanh cỏ non sau cơn mưa rào, tiếp thêm năng lượng thuần khiết và tươi mới cho những ngày làm việc hối hả.',
    image: imgXanhLa,
    size: 'Khoảng 5–6cm',
    material: 'Len mềm cotton cao cấp, móc tay từng cánh tỉ mỉ',
    stock: 9,
    highlightText: 'Tươi mới',
    packagingNote: 'Đóng gói cùng card kraft Một Chút Nắng & bao bì giấy bảo vệ môi trường',
    storyQuote: 'Nhẹ nhàng lớn lên theo cách của riêng mình',
  },
  {
    id: 'mcn-camdat',
    name: 'Một Chút Nắng — Cam Đất',
    price: 49000,
    color: 'Cam Đất',
    colorHex: '#B87559',
    category: 'camdat',
    description: 'Tone cam đất terracotta ấm nồng như chiếc tách gốm ấm áp giữa ngày thu se lạnh, vừa vintage hoài niệm vừa ngọt ngào mộc mạc.',
    image: imgCamDat,
    size: 'Khoảng 5–6cm',
    material: 'Len mềm cotton cao cấp, móc thủ công',
    stock: 8,
    highlightText: 'Mộc mạc',
    packagingNote: 'Đóng gói cùng card kraft Một Chút Nắng & thông điệp viết tay',
    storyQuote: 'Mỗi mũi móc là một chút thương gửi trao',
  },
];

export const COLOR_OPTIONS = [
  { name: 'Xanh Sage', hex: '#7A8B70', id: 'sage' },
  { name: 'Vàng Nắng', hex: '#E8B85C', id: 'vang' },
  { name: 'Xanh Lá', hex: '#53634E', id: 'xanhla' },
  { name: 'Cam Đất', hex: '#B87559', id: 'camdat' },
];

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}
