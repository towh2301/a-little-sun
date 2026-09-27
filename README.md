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

## 🔐 Đường dẫn & Hướng dẫn Cổng Quản Trị Chủ Tiệm (Admin Portal)

Hệ thống được thiết kế **tách biệt hoàn toàn** giữa Website khách hàng và Trang quản trị của chủ tiệm. Khách hàng thông thường sẽ không nhìn thấy bất kỳ nút truy cập hay thông tin quản trị nào.

### 1. Đường dẫn truy cập trang Admin:
* **Cách 1 (Trực tiếp qua URL):** Thêm `#admin` vào cuối link website:
  * Ví dụ Local: `http://localhost:3000/#admin`
  * Hoặc trên link triển khai: `https://[dia-chi-web-cua-ban]/#admin`
* **Cách 2 (Lối đi bí mật):** Nhấp vào dòng chữ nhỏ kín đáo `(Góc chủ tiệm)` ở cuối chân trang Footer.

### 2. Thông tin xác thực (Admin Credentials):
Khi vào `#admin`, hệ thống sẽ yêu cầu mật khẩu quản trị bảo mật:
* **Mật khẩu quản trị mặc định:** `123456` hoặc `motchutnang2026`
* Có nút **"Khóa trang"** (Đăng xuất) để bảo vệ dữ liệu khi rời máy.

### 3. Các tính năng quản trị:
* **Quản lý Đơn hàng:** Xem thông tin khách, số điện thoại, địa chỉ nhận hàng, số lượng và màu sắc bạn nhỏ đã đặt.
* **Đọc lời nhắn thiệp viết tay (💌):** Xem lời nhắn khách gửi gắm để chép vào thiệp giấy kraft kèm theo đơn.
* **Cập nhật trạng thái đơn:** `Chờ xử lý` $\rightarrow$ `Đang gói quà` $\rightarrow$ `Đang giao bưu cục` $\rightarrow$ `Đã xong` $\rightarrow$ `Huỷ đơn`.
* **Quản lý kho nhanh:** Nút `Kho` để cập nhật số lượng móc sẵn ngay tại bảng danh sách.
* **Tạo & Chỉnh sửa sản phẩm ĐẦY ĐỦ (Full Scrapbook Form):**
  * **Tab 1 — Cơ bản & Giá:** Tên bạn nhỏ, phụ đề (subtitle), giá tiền, phân loại, tem nổi bật, màu sắc chủ đạo, kích thước đo bằng thước kẻ (cao x ngang).
  * **Tab 2 — Hình ảnh & 6 Góc nhìn (Angles):** Tải ảnh trực tiếp từ máy tính lên hoặc dán URL cho ảnh đại diện chính và từng góc chụp (Mặt trước, Mặt sau, Bên trái, Bên phải, Mặt trên, Mặt dưới).
  * **Tab 3 — Bảng màu & Các phiên bản (Variants):** Bảng chấm màu chi tiết (Da, má hồng, balo, mắt, hoa...) và các biến thể phụ kiện (Đội mũ, Cầm hoa, Áo mưa, Ngủ ôm gối...).
  * **Tab 4 — Câu chuyện & Ứng dụng:** Câu chuyện tự sự ấm áp (Storytelling), trích dẫn câu nói (Story quote), lưu ý đóng gói quà, ý tưởng sử dụng (móc khóa, bàn học...) và nhãn cảm xúc.
* **Xoá sản phẩm:** Nút xoá kèm hộp thoại xác nhận an toàn.

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
