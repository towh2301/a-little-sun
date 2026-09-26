import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatVND } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    openCheckout,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 150000;
  const remainingForFreeship = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs transition-opacity duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={closeCart} aria-hidden="true" />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md h-full bg-[#FFF9EF] shadow-2xl flex flex-col border-l border-[#987456]/20 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#987456]/15 bg-[#F5EEDF]/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#53634E]" />
            <h2 className="font-serif-soft text-lg font-bold text-[#4D4A3F]">
              Giỏ hàng của bạn
            </h2>
            <span className="text-xs text-[#987456]">
              ({items.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Đóng giỏ hàng"
            className="w-8 h-8 rounded-full bg-[#FFF9EF] hover:bg-white flex items-center justify-center text-[#4D4A3F] border border-[#987456]/15 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Hint */}
        {items.length > 0 && (
          <div className="px-5 py-2.5 bg-[#F5EEDF]/40 border-b border-[#987456]/10 text-xs text-[#53634E]">
            {remainingForFreeship > 0 ? (
              <p>
                Mua thêm <span className="font-bold">{formatVND(remainingForFreeship)}</span> để được{' '}
                <span className="font-semibold underline">Freeship toàn quốc</span> ✨
              </p>
            ) : (
              <p className="font-medium text-[#7A8B70]">
                🌱 Tuyệt vời! Đơn hàng của bạn đã đủ điều kiện Freeship
              </p>
            )}
          </div>
        )}

        {/* Body: Items or Empty State */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-[#F5EEDF] flex items-center justify-center text-2xl mb-4 border border-[#987456]/20">
                🌱
              </div>
              <p className="font-serif-soft text-lg font-bold text-[#4D4A3F]">
                Chiếc giỏ đang trống.
              </p>
              <p className="text-xs text-[#987456] mt-1.5 max-w-[220px] leading-relaxed">
                Có lẽ một chút nắng đang chờ bạn 🌱
              </p>
              <button
                onClick={closeCart}
                className="mt-6 px-5 py-2 rounded-full bg-[#7A8B70] text-white text-xs font-medium hover:bg-[#53634E] transition-colors"
              >
                Khám phá những bạn nhỏ →
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#FBF6EC] border border-[#987456]/15 shadow-2xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#987456]/10 shrink-0 bg-[#F5EEDF]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif-soft text-sm font-semibold text-[#4D4A3F] truncate">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] text-[#987456]">Màu:</span>
                      <span className="text-[11px] font-medium text-[#4D4A3F]">
                        {item.selectedColor}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-[#53634E] mt-1 tabular-nums">
                      {formatVND(item.product.price)}
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      aria-label="Xoá sản phẩm"
                      className="text-[#987456]/60 hover:text-[#B87559] p-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-[#FFF9EF] px-1.5 py-0.5 rounded-full border border-[#987456]/20">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                        className="w-5 h-5 rounded-full hover:bg-[#F5EEDF] flex items-center justify-center text-xs text-[#4D4A3F]"
                        aria-label="Giảm"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-medium tabular-nums min-w-[14px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                        className="w-5 h-5 rounded-full hover:bg-[#F5EEDF] flex items-center justify-center text-xs text-[#4D4A3F]"
                        aria-label="Tăng"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#987456]/15 bg-[#F5EEDF]/40 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#987456]">Tạm tính:</span>
              <span className="font-bold text-base text-[#53634E] tabular-nums">
                {formatVND(subtotal)}
              </span>
            </div>
            <p className="text-[11px] text-[#987456]/80 text-center">
              Chưa bao gồm phí vận chuyển (sẽ tính ở bước đặt hàng)
            </p>

            <button
              onClick={openCheckout}
              className="w-full min-h-[48px] rounded-2xl bg-[#7A8B70] hover:bg-[#53634E] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors active:scale-98"
            >
              <span>Tiếp tục đặt hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
