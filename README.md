# Một Chút Nắng ☀️

> *"Giữ lại một chút nắng cho những ngày chậm lớn."*

**Một Chút Nắng** là một mini e-commerce website mobile-first dành riêng cho thương hiệu đồ len thủ công Việt Nam. Khác biệt với các sàn thương mại điện tử đại trà, website được thiết kế như một **tiệm len thủ công nhỏ trên điện thoại kết hợp với phong cách scrapbook / nhật ký**, gợi cảm giác ấm áp của giấy kraft, vải linen, hoa khô và ánh nắng buổi chiều.

---

## 🌿 Điểm nổi bật & Triết lý thiết kế

- **Trải nghiệm Responsive Đa Nền Tảng (Mobile-First & Desktop):** 
  - *Trên Mobile (375px - 430px):* Công thái học thao tác một tay với nút bấm rộng rãi, khay vuốt từ đáy (Bottom Sheet) và thanh điều hướng Bottom Navigation.
  - *Trên Desktop & Tablet:* Tự động mở rộng giao diện thành trang nhật ký scrapbook rộng lớn (2 cột Hero, 4 cột sản phẩm, modal popup trung tâm 2 cột, thanh điều hướng desktop đầy đủ và footer 4 cột phong phú).
  - Có thanh công cụ xem trước chế độ (Màn hình Desktop rộng / Khung điện thoại 390px) giúp dễ dàng kiểm tra trải nghiệm trên mọi thiết bị.
- **Hệ màu mộc mạc (Earthy & Warm Palette):**
  - Kem (Cream): `#FFF9EF`
  - Giấy kraft (Paper): `#F5EEDF`
  - Sage green: `#7A8B70`
  - Xanh rêu trầm: `#53634E`
  - Vàng nắng: `#E8B85C`
  - Nâu ấm: `#987456`
  - Cam đất terracotta: `#B87559`
- **Typography thủ công:** Kết hợp phông chữ serif mềm mại (*Cormorant Garamond*), phông viết tay (*Patrick Hand*) và phông chữ nội dung dễ đọc (*Plus Jakarta Sans*).
- **Chi tiết Scrapbook:** Điểm xuyết các hiệu ứng băng keo washi, giấy note viết tay, tem nhãn mộc mạc, tạo cảm giác như đang lật giở một cuốn sổ lưu niệm nhỏ.

---

## ✨ Tính năng chính

1. **Header Sticky:** Hiển thị thương hiệu cùng câu chuyện nhỏ, hiệu ứng mờ kính (glassmorphism/blur) khi cuộn và giỏ hàng cập nhật số lượng tức thì.
2. **Hero Journal:** Khung ảnh sản phẩm trong nắng chiều kèm thẻ mờ và nút chuyển nhanh đến danh mục sản phẩm.
3. **Danh mục "Những bạn nhỏ":**
   - Lưới sản phẩm 2 cột chuẩn mobile với các phân loại màu sắc: *Xanh Sage*, *Vàng Nắng*, *Xanh Lá*, *Cam Đất*.
   - Bộ lọc dạng cuộn ngang (Horizontal scroll filter) mượt mà.
4. **Chi tiết sản phẩm (Bottom Sheet Modal):** 
   - Mở mượt từ đáy màn hình, hiển thị ảnh lớn, bảng chất liệu handmade (🧶 Len mềm cotton, ☀️ Móc thủ công, 📏 5–6cm, 🎁 Kèm thiệp).
   - Cho phép chọn màu sắc, tăng giảm số lượng và thêm vào giỏ hàng với hiệu ứng phản hồi nhẹ nhàng.
5. **Giỏ hàng trực quan (Cart Drawer):**
   - Quản lý danh sách món, chỉnh số lượng, xoá sản phẩm, lưu trữ tự động trong `localStorage`.
   - Hiển thị thanh nhắc ưu đãi Freeship khi đạt ngưỡng đơn hàng.
6. **Đặt hàng tinh giản (Quick Checkout):**
   - Form thông tin nhận hàng nhanh (Tên, SĐT, Địa chỉ, Lời nhắn riêng cho tiệm).
   - Tính toán tạm tính và phí vận chuyển.
   - Màn hình xác nhận đơn hàng ấm cúng: *"☀️ Cảm ơn bạn đã mang một chút nắng về nhà"* cùng mã đơn hàng ngẫu nhiên.
7. **Khu vực Storytelling & Cảm xúc:**
   - *"Một chút nắng là gì?"*: Kể câu chuyện về tình yêu với những mũi len chậm rãi.
   - Thẻ note viết tay: *"Hôm nay chưa nở thì mai mình nở."*
   - Khám phá đóng gói quà tặng mộc mạc (*"Xem cách mình đóng gói"*).
   - Feed ảnh Instagram mini `@motchutnang`.

---

## 🛠️ Công nghệ sử dụng

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React
- **Build tool:** Vite 8
- **Lưu trữ dữ liệu giỏ hàng:** Client-side `localStorage`

---

## 🚀 Hướng dẫn cài đặt và chạy thử

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi chạy môi trường phát triển
npm run dev

# 3. Biên dịch cho môi trường production
npm run build
```

---

*Một Chút Nắng — Được tạo nên bằng tình yêu dành cho những điều nhỏ bé và dịu dàng.* ☀️🌱
