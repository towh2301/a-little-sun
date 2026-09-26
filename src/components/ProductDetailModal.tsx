import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Heart, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { COLOR_OPTIONS, PRODUCTS, formatVND } from '../data/products';
import { useCart } from '../context/CartContext';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForDetail, closeProductDetail, addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>('Xanh Sage');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (selectedProductForDetail) {
      setCurrentProduct(selectedProductForDetail);
      setSelectedColor(selectedProductForDetail.color);
      setQuantity(1);
      setJustAdded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProductForDetail]);

  if (!selectedProductForDetail || !currentProduct) return null;

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    const matchingProd = PRODUCTS.find((p) => p.color === colorName);
    if (matchingProd) {
      setCurrentProduct(matchingProd);
    }
  };

  const handleAddToCart = () => {
    addToCart(currentProduct, selectedColor, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      closeProductDetail();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 bg-black/50 backdrop-blur-xs transition-opacity duration-300">
      {/* Click outside backdrop */}
      <div
        className="absolute inset-0"
        onClick={closeProductDetail}
        aria-hidden="true"
      />

      {/* Modal Container: Bottom sheet on mobile, centered card on desktop */}
      <div className="relative w-full max-w-md md:max-w-3xl max-h-[92vh] bg-[#FFF9EF] rounded-t-3xl md:rounded-[32px] border-t md:border border-[#987456]/20 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom md:zoom-in-95 duration-300">
        {/* Mobile Grab Handle */}
        <div className="md:hidden w-12 h-1.5 bg-[#987456]/25 rounded-full mx-auto mt-3 shrink-0" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 md:px-8 pt-3 pb-3 border-b border-[#987456]/15 shrink-0 bg-[#F5EEDF]/40">
          <div className="flex items-center gap-2">
            <span className="text-base select-none">🌱</span>
            <span className="text-xs font-semibold text-[#7A8B70] tracking-wider uppercase">
              Một Chút Nắng · Đồ len thủ công
            </span>
          </div>
          <button
            onClick={closeProductDetail}
            aria-label="Đóng chi tiết"
            className="w-8 h-8 rounded-full bg-[#FFF9EF] hover:bg-white flex items-center justify-center text-[#4D4A3F] border border-[#987456]/15 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: 1 Column on Mobile, 2 Columns on Desktop */}
        <div className="overflow-y-auto px-5 md:px-8 py-5 md:py-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Left Column: Product Image Gallery */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#F5EEDF] border border-[#987456]/20 shadow-sm">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-[#FFF9EF]/90 backdrop-blur-xs px-3 py-1 rounded-full border border-[#987456]/15 text-xs font-medium text-[#4D4A3F] flex items-center gap-2 shadow-2xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/10"
                    style={{ backgroundColor: currentProduct.colorHex }}
                  />
                  <span>{selectedColor}</span>
                </div>
              </div>

              {/* Color thumbnails strip */}
              <div className="grid grid-cols-4 gap-2">
                {PRODUCTS.map((p) => {
                  const isMatch = p.color === selectedColor;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleColorChange(p.color)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        isMatch
                          ? 'border-[#7A8B70] ring-2 ring-[#7A8B70]/30 shadow-xs'
                          : 'border-[#987456]/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Details & Customization */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <h2 className="font-serif-soft text-2xl md:text-3xl font-bold text-[#4D4A3F] leading-snug">
                  {currentProduct.name}
                </h2>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-xl md:text-2xl font-bold text-[#53634E] tabular-nums">
                    {formatVND(currentProduct.price)}
                  </span>
                  <span className="text-xs text-[#7A8B70] bg-[#7A8B70]/10 px-2.5 py-0.5 rounded-full font-semibold">
                    Móc thủ công từng chiếc
                  </span>
                </div>
              </div>

              {/* Story Quote Card */}
              <div className="p-3.5 rounded-2xl bg-[#F5EEDF]/80 border border-[#987456]/15 text-xs md:text-sm text-[#987456] leading-relaxed italic">
                “{currentProduct.description}”
              </div>

              {/* Handmade Specifications */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-[#FBF6EC] border border-[#987456]/15 flex items-center gap-2.5">
                  <span className="text-lg">🧶</span>
                  <div>
                    <p className="text-[10px] text-[#987456]">Chất liệu</p>
                    <p className="font-semibold text-[#4D4A3F]">Len sợi mềm mịn</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FBF6EC] border border-[#987456]/15 flex items-center gap-2.5">
                  <span className="text-lg">☀️</span>
                  <div>
                    <p className="text-[10px] text-[#987456]">Phương thức</p>
                    <p className="font-semibold text-[#4D4A3F]">Móc thủ công 100%</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FBF6EC] border border-[#987456]/15 flex items-center gap-2.5">
                  <span className="text-lg">📏</span>
                  <div>
                    <p className="text-[10px] text-[#987456]">Kích thước</p>
                    <p className="font-semibold text-[#4D4A3F]">{currentProduct.size}</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FBF6EC] border border-[#987456]/15 flex items-center gap-2.5">
                  <span className="text-lg">🎁</span>
                  <div>
                    <p className="text-[10px] text-[#987456]">Bao bì quà tặng</p>
                    <p className="font-semibold text-[#4D4A3F]">Card kraft & hoa khô</p>
                  </div>
                </div>
              </div>

              {/* Color Selector Swatches */}
              <div>
                <label className="block text-xs font-bold text-[#4D4A3F] mb-2">
                  Chọn màu len: <span className="font-normal text-[#987456]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {COLOR_OPTIONS.map((col) => {
                    const isCurrent = selectedColor === col.name;
                    return (
                      <button
                        key={col.id}
                        onClick={() => handleColorChange(col.name)}
                        className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          isCurrent
                            ? 'border-[#7A8B70] bg-[#7A8B70]/10 text-[#4D4A3F] shadow-xs'
                            : 'border-[#987456]/25 bg-[#FFF9EF] text-[#4D4A3F]/80 hover:bg-[#F5EEDF]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold text-[#4D4A3F]">Số lượng:</span>
                <div className="flex items-center gap-3 bg-[#F5EEDF] px-2.5 py-1 rounded-full border border-[#987456]/15">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Giảm số lượng"
                    className="w-7 h-7 rounded-full bg-[#FFF9EF] hover:bg-white flex items-center justify-center text-[#4D4A3F] disabled:opacity-40 transition-colors shadow-2xs cursor-pointer"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-[#4D4A3F] tabular-nums min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(currentProduct.stock, q + 1))}
                    aria-label="Tăng số lượng"
                    className="w-7 h-7 rounded-full bg-[#FFF9EF] hover:bg-white flex items-center justify-center text-[#4D4A3F] transition-colors shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full min-h-[50px] rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-98 cursor-pointer ${
                    justAdded
                      ? 'bg-[#53634E] text-white'
                      : 'bg-[#7A8B70] hover:bg-[#53634E] text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 animate-bounce" />
                      <span>Đã vào giỏ rồi nè! ♡</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-white/20" />
                      <span>Thêm vào giỏ ♡ · {formatVND(currentProduct.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
