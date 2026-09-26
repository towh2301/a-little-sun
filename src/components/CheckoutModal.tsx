import React, { useState } from 'react';
import { X, CheckCircle, Package, ArrowLeft, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatVND } from '../data/products';
import { BackendStore } from '../services/backendStore';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, closeCheckout, items, subtotal, clearCart } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  if (!isCheckoutOpen) return null;

  const shippingFee = subtotal >= 150000 ? 0 : 20000;
  const total = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên của bạn';
    if (!phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9+() -]{9,15}$/.test(phone.trim())) {
      newErrors.phone = 'Số điện thoại chưa hợp lệ';
    }
    if (!address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ nhận hàng';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate cute order code
    const randomCode = `MCN-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderCode(randomCode);

    // Save to Backend Store database
    BackendStore.createOrder({
      orderId: randomCode,
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      note: note.trim(),
      items: [...items],
      subtotal,
      shippingFee,
      total,
    });

    setOrderSuccess(true);
    clearCart();
  };

  const handleClose = () => {
    setOrderSuccess(false);
    setFullName('');
    setPhone('');
    setAddress('');
    setNote('');
    setErrors({});
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs transition-opacity">
      {/* Container */}
      <div className="relative w-full max-w-md md:max-w-2xl max-h-[92vh] bg-[#FFF9EF] rounded-3xl border border-[#987456]/20 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#987456]/15 bg-[#F5EEDF]/60">
          <div className="flex items-center gap-2">
            <span className="text-base select-none">🎁</span>
            <h2 className="font-serif-soft text-xl font-bold text-[#4D4A3F]">
              {orderSuccess ? 'Hoàn tất đơn hàng' : 'Thông tin nhận một chút nắng'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Đóng"
            className="w-8 h-8 rounded-full bg-[#FFF9EF] hover:bg-white flex items-center justify-center text-[#4D4A3F] border border-[#987456]/15 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-5">
          {orderSuccess ? (
            /* Order Success View */
            <div className="text-center py-6 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#7A8B70]/15 text-[#7A8B70] flex items-center justify-center mx-auto text-3xl">
                ☀️
              </div>

              <div>
                <h3 className="font-serif-soft text-2xl font-bold text-[#4D4A3F]">
                  Cảm ơn bạn đã mang một chút nắng về nhà.
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#987456] leading-relaxed">
                  Mỗi món đồ len đều được tiệm móc bằng tay với nhiều tình thương. Tiệm sẽ sớm chuẩn bị và gửi đến bạn.
                </p>
              </div>

              {/* Order Code Card */}
              <div className="p-5 rounded-2xl bg-[#F5EEDF] border border-[#987456]/20 text-center">
                <span className="text-xs text-[#987456] block uppercase tracking-wider font-semibold">
                  Mã đơn hàng của bạn
                </span>
                <span className="font-serif-soft text-3xl font-bold text-[#53634E] tracking-wider mt-1 block">
                  #{orderCode}
                </span>
                <span className="text-xs text-[#7A8B70] block mt-1.5 font-medium">
                  Đã ghi nhận · Thanh toán khi nhận hàng (COD)
                </span>
              </div>

              <div className="text-xs text-[#987456] text-left p-4 rounded-2xl bg-[#FBF6EC] border border-[#987456]/15 space-y-1.5">
                <p>📍 Người nhận: <span className="font-semibold text-[#4D4A3F]">{fullName}</span> ({phone})</p>
                <p>🏡 Địa chỉ: <span className="font-semibold text-[#4D4A3F]">{address}</span></p>
                {note && <p>💌 Lời nhắn: <span className="italic text-[#4D4A3F]">"{note}"</span></p>}
              </div>

              <button
                onClick={handleClose}
                className="w-full min-h-[48px] rounded-2xl bg-[#7A8B70] hover:bg-[#53634E] text-white text-sm font-semibold transition-colors mt-4 cursor-pointer"
              >
                Về trang chủ khám phá thêm
              </button>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Column: Form Inputs (col-span-7) */}
              <div className="md:col-span-7 space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-[#4D4A3F] mb-1">
                    Họ và tên của bạn <span className="text-[#B87559]">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="VD: Nguyễn Mai An"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF6EC] border border-[#987456]/25 focus:border-[#7A8B70] focus:ring-1 focus:ring-[#7A8B70] outline-hidden text-xs text-[#4D4A3F]"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-[#B87559] mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-[#4D4A3F] mb-1">
                    Số điện thoại nhận hàng <span className="text-[#B87559]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="VD: 0912 345 678"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF6EC] border border-[#987456]/25 focus:border-[#7A8B70] focus:ring-1 focus:ring-[#7A8B70] outline-hidden text-xs text-[#4D4A3F]"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-[#B87559] mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-[#4D4A3F] mb-1">
                    Địa chỉ nhận hàng chi tiết <span className="text-[#B87559]">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors({ ...errors, address: '' });
                    }}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FBF6EC] border border-[#987456]/25 focus:border-[#7A8B70] focus:ring-1 focus:ring-[#7A8B70] outline-hidden text-xs text-[#4D4A3F] resize-none"
                  />
                  {errors.address && (
                    <p className="text-[11px] text-[#B87559] mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-[#4D4A3F] mb-1">
                    Ghi chú / Lời nhắn viết tay riêng (tuỳ chọn)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="VD: Gói làm quà sinh nhật, viết thiệp chúc mừng..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF6EC] border border-[#987456]/25 focus:border-[#7A8B70] focus:ring-1 focus:ring-[#7A8B70] outline-hidden text-xs text-[#4D4A3F]"
                  />
                </div>
              </div>

              {/* Right Column: Order Summary & Total (col-span-5) */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-[#F5EEDF]/70 border border-[#987456]/15 space-y-3">
                  <span className="text-xs font-bold text-[#53634E] uppercase tracking-wide block">
                    Đơn hàng ({items.length} món)
                  </span>
                  <div className="max-h-36 overflow-y-auto space-y-2 pr-1 text-xs">
                    {items.map((i) => (
                      <div
                        key={`${i.product.id}-${i.selectedColor}`}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="truncate max-w-[150px] text-[#4D4A3F]">
                          {i.product.name} ({i.selectedColor}) × {i.quantity}
                        </span>
                        <span className="font-semibold text-[#53634E] tabular-nums shrink-0">
                          {formatVND(i.product.price * i.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#987456]/15 space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#987456]">
                      <span>Tạm tính tiền hàng:</span>
                      <span className="tabular-nums font-semibold">{formatVND(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#987456]">
                      <span>Phí vận chuyển:</span>
                      <span className="tabular-nums font-semibold">
                        {shippingFee === 0 ? (
                          <span className="text-[#7A8B70] font-bold">Miễn phí</span>
                        ) : (
                          formatVND(shippingFee)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#4D4A3F] pt-2 border-t border-[#987456]/15">
                      <span>Tổng thanh toán:</span>
                      <span className="text-[#53634E] tabular-nums text-base">{formatVND(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full min-h-[48px] rounded-2xl bg-[#7A8B70] hover:bg-[#53634E] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors active:scale-98 cursor-pointer"
                >
                  <span>Đặt đơn ngay · {formatVND(total)}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>

                <p className="text-[10px] text-center text-[#987456]/80">
                  🌱 Thanh toán khi nhận hàng (COD) · Mở gói kiểm tra an tâm
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
