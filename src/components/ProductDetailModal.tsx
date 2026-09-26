import React, { useState } from 'react';
import { 
  X, 
  Minus, 
  Plus, 
  Sparkles, 
  Check, 
  Ruler, 
  Palette, 
  Lightbulb, 
  Layers, 
  BookOpen, 
  Smile, 
  Heart,
  Share2
} from 'lucide-react';
import { Product, ProductVariantEdition } from '../types';
import { COLOR_OPTIONS, PRODUCTS, formatVND } from '../data/products';
import { useCart } from '../context/CartContext';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForDetail, closeProductDetail, addToCart } = useCart();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantEdition | null>(null);
  const [activeAngleIndex, setActiveAngleIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'materials' | 'variants' | 'usage'>('story');

  React.useEffect(() => {
    if (selectedProductForDetail) {
      setCurrentProduct(selectedProductForDetail);
      setSelectedColor(selectedProductForDetail.color);
      setActiveAngleIndex(0);
      if (selectedProductForDetail.variants && selectedProductForDetail.variants.length > 0) {
        setSelectedVariant(selectedProductForDetail.variants[0]);
      } else {
        setSelectedVariant(null);
      }
      setQuantity(1);
      setJustAdded(false);
      setActiveTab('story');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProductForDetail]);

  if (!selectedProductForDetail || !currentProduct) return null;

  const currentPrice = currentProduct.price + (selectedVariant?.priceDelta || 0);

  const handleSelectProduct = (prod: Product) => {
    setCurrentProduct(prod);
    setSelectedColor(prod.color);
    setActiveAngleIndex(0);
    if (prod.variants && prod.variants.length > 0) {
      setSelectedVariant(prod.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  };

  const handleAddToCart = () => {
    addToCart(
      currentProduct, 
      selectedColor || currentProduct.color, 
      quantity
    );
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      closeProductDetail();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      {/* Click outside backdrop */}
      <div
        className="absolute inset-0"
        onClick={closeProductDetail}
        aria-hidden="true"
      />

      {/* Main Scrapbook Sheet Container */}
      <div className="relative w-full max-w-4xl max-h-[94vh] bg-[#FFF9EF] rounded-t-3xl md:rounded-[32px] border-t md:border border-[#987456]/20 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom md:zoom-in-95 duration-300">
        
        {/* Mobile Grab Handle */}
        <div className="md:hidden w-12 h-1.5 bg-[#987456]/25 rounded-full mx-auto mt-3 shrink-0" />

        {/* Scrapbook Sheet Header */}
        <div className="flex items-center justify-between px-5 md:px-8 py-3.5 border-b border-[#987456]/15 shrink-0 bg-[#F5EEDF]/60">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🐸</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-soft font-bold text-base md:text-lg text-[#4D4A3F]">
                  {currentProduct.name}
                </span>
                {currentProduct.highlightText && (
                  <span className="text-[10px] font-semibold bg-[#7A8B70]/15 text-[#53634E] px-2 py-0.5 rounded-full">
                    {currentProduct.highlightText}
                  </span>
                )}
              </div>
              {currentProduct.subtitle && (
                <p className="text-xs text-[#987456] italic -mt-0.5">
                  {currentProduct.subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={closeProductDetail}
            aria-label="Đóng chi tiết"
            className="w-8 h-8 rounded-full bg-[#FFF9EF] hover:bg-white flex items-center justify-center text-[#4D4A3F] border border-[#987456]/15 transition-colors cursor-pointer shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-5 md:px-8 py-5 md:py-6 flex-1 space-y-6">
          
          {/* Top Section: Visual & Key Specs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left: Product Hero Photo & Badge */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#F5EEDF] border-2 border-[#987456]/20 shadow-md group">
                <img
                  src={
                    currentProduct.angles && currentProduct.angles[activeAngleIndex]
                      ? currentProduct.angles[activeAngleIndex].image
                      : selectedVariant?.image || currentProduct.image
                  }
                  alt={
                    currentProduct.angles && currentProduct.angles[activeAngleIndex]
                      ? `${currentProduct.name} - ${currentProduct.angles[activeAngleIndex].label}`
                      : currentProduct.name
                  }
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                
                {/* Vintage Scrapbook Stamp Tag */}
                <div className="absolute top-3 left-3 bg-[#FFF9EF]/95 backdrop-blur-xs px-3 py-1 rounded-full border border-[#987456]/20 text-xs font-semibold text-[#4D4A3F] flex items-center gap-1.5 shadow-2xs">
                  <span>🍃</span>
                  <span>
                    {currentProduct.angles && currentProduct.angles[activeAngleIndex]
                      ? currentProduct.angles[activeAngleIndex].label
                      : 'Móc thủ công 100%'}
                  </span>
                </div>

                {/* Subtitle tag */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#4D4A3F]/85 backdrop-blur-xs px-3 py-1.5 rounded-xl text-white text-[11px] text-center italic">
                  “{currentProduct.storyQuote || 'Nhỏ xinh, dễ thương, mang theo cả niềm vui'}”
                </div>
              </div>

              {/* Angle thumbnails if available */}
              {currentProduct.angles && currentProduct.angles.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[11px] font-bold text-[#987456] uppercase tracking-wider">
                      Các góc nhìn thành phẩm:
                    </p>
                    <span className="text-[10px] text-[#7A8B70] italic">
                      (Bấm góc để xem ảnh lớn)
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5 text-center">
                    {currentProduct.angles.map((ang, i) => {
                      const isAngleActive = activeAngleIndex === i;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveAngleIndex(i)}
                          className={`flex flex-col items-center group cursor-pointer focus:outline-none transition-all ${
                            isAngleActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          <div
                            className={`w-full aspect-square rounded-lg border overflow-hidden p-0.5 transition-all ${
                              isAngleActive
                                ? 'border-[#7A8B70] ring-2 ring-[#7A8B70]/40 shadow-xs bg-[#7A8B70]/10'
                                : 'border-[#987456]/20 bg-white group-hover:border-[#7A8B70]/50'
                            }`}
                          >
                            <img
                              src={ang.image}
                              alt={ang.label}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <span
                            className={`text-[9px] mt-1 font-medium truncate w-full leading-tight transition-colors ${
                              isAngleActive
                                ? 'text-[#53634E] font-bold'
                                : 'text-[#4D4A3F] group-hover:text-[#53634E]'
                            }`}
                          >
                            {ang.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Key Info, Pricing, Variant Selection */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Price & Stock Badge */}
              <div className="flex items-baseline justify-between border-b border-[#987456]/15 pb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-[#53634E] font-serif-soft tabular-nums">
                    {formatVND(currentPrice)}
                  </span>
                  {selectedVariant?.priceDelta ? (
                    <span className="text-xs text-[#987456]">
                      (Đã bao gồm phụ kiện phiên bản)
                    </span>
                  ) : null}
                </div>
                <div className="text-xs font-semibold text-[#7A8B70] bg-[#7A8B70]/10 px-3 py-1 rounded-full">
                  Còn {currentProduct.stock} bạn sẵn sàng về nhà mới
                </div>
              </div>

              {/* Tags Strip (Nhỏ xinh, Thân thiện, Năng lượng...) */}
              {currentProduct.tags && (
                <div className="flex flex-wrap gap-2">
                  {currentProduct.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#EFE7D5] text-[#4D4A3F] border border-[#987456]/15"
                    >
                      <Sparkles className="w-3 h-3 text-[#E8B85C]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Choose Variant Edition if product has multiple styles */}
              {currentProduct.variants && currentProduct.variants.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#4D4A3F] uppercase tracking-wide">
                    Chọn phiên bản: <span className="text-[#53634E] font-semibold">{selectedVariant?.name}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentProduct.variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#7A8B70]/10 border-[#7A8B70] ring-1 ring-[#7A8B70] shadow-xs'
                              : 'bg-white/80 border-[#987456]/20 hover:bg-[#F5EEDF]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#4D4A3F]">{v.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#53634E]" />}
                          </div>
                          <p className="text-[11px] text-[#987456] italic mt-0.5 line-clamp-1">
                            {v.tagline}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size & Dimension Banner */}
              <div className="p-3 rounded-2xl bg-[#F5EEDF]/80 border border-[#987456]/15 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#7A8B70]" />
                  <div>
                    <span className="font-bold text-[#4D4A3F]">Kích thước thật: </span>
                    <span className="text-[#53634E] font-semibold">
                      {currentProduct.sizeDimension 
                        ? `Cao ~${currentProduct.sizeDimension.height} × Ngang ~${currentProduct.sizeDimension.width}` 
                        : currentProduct.size}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#987456] italic">Cầm vừa lòng bàn tay</span>
              </div>

              {/* Quantity Selector & Add to Cart Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center justify-between sm:justify-start gap-3 bg-[#EFE7D5] px-3 py-2 rounded-full border border-[#987456]/15">
                  <span className="text-xs font-bold text-[#4D4A3F]">Số lượng:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="w-7 h-7 rounded-full bg-[#FFF9EF] hover:bg-white flex items-center justify-center text-[#4D4A3F] disabled:opacity-40 transition-colors shadow-2xs cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-[#4D4A3F] tabular-nums min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(currentProduct.stock, q + 1))}
                      className="w-7 h-7 rounded-full bg-[#FFF9EF] hover:bg-white flex items-center justify-center text-[#4D4A3F] transition-colors shadow-2xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-full font-serif-soft font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                    justAdded
                      ? 'bg-[#53634E] text-white ring-2 ring-[#53634E]/30'
                      : 'bg-[#7A8B70] hover:bg-[#687860] text-white hover:shadow-lg'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đã thêm vào giỏ ♡</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Đón bạn này về nhà ({formatVND(currentPrice * quantity)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Infographic Scrapbook Tabs (Story, Materials, Usage Ideas) */}
          <div className="pt-2 border-t border-[#987456]/15">
            <div className="flex items-center gap-2 border-b border-[#987456]/15 pb-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('story')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'story'
                    ? 'bg-[#7A8B70] text-white shadow-xs'
                    : 'bg-[#EFE7D5]/70 text-[#4D4A3F] hover:bg-[#EFE7D5]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Câu chuyện của bạn</span>
              </button>

              <button
                onClick={() => setActiveTab('materials')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'materials'
                    ? 'bg-[#7A8B70] text-white shadow-xs'
                    : 'bg-[#EFE7D5]/70 text-[#4D4A3F] hover:bg-[#EFE7D5]'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Nguyên liệu & Màu sắc</span>
              </button>

              <button
                onClick={() => setActiveTab('usage')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'usage'
                    ? 'bg-[#7A8B70] text-white shadow-xs'
                    : 'bg-[#EFE7D5]/70 text-[#4D4A3F] hover:bg-[#EFE7D5]'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Ý tưởng sử dụng</span>
              </button>
            </div>

            {/* TAB CONTENT: 1. STORY */}
            {activeTab === 'story' && (
              <div className="py-4 space-y-3">
                <div className="p-4 rounded-2xl bg-[#FBF6EC] border border-[#987456]/15 text-xs sm:text-sm text-[#4D4A3F] leading-relaxed whitespace-pre-line shadow-2xs">
                  {currentProduct.story || currentProduct.description}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#987456] italic">
                  <span>💌</span>
                  <span>Đóng gói: {currentProduct.packagingNote}</span>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. MATERIALS & COLOR PALETTE */}
            {activeTab === 'materials' && (
              <div className="py-4 space-y-4">
                <p className="text-xs text-[#987456]">
                  Chất liệu: <strong className="text-[#4D4A3F]">{currentProduct.material}</strong>
                </p>

                {currentProduct.materialsList ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                    {currentProduct.materialsList.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-[#FBF6EC] border border-[#987456]/15 flex flex-col items-center text-center space-y-1.5 shadow-2xs"
                      >
                        <span
                          className="w-7 h-7 rounded-full border border-black/15 shadow-2xs"
                          style={{ backgroundColor: m.hex }}
                        />
                        <span className="text-[11px] font-bold text-[#4D4A3F]">{m.part}</span>
                        <span className="text-[10px] text-[#987456]">({m.colorName})</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-[#FBF6EC] text-xs text-[#4D4A3F]">
                    Sợi len cotton tự nhiên mềm mại, móc tay tỉ mỉ từng chi tiết nhỏ.
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: 3. USAGE IDEAS */}
            {activeTab === 'usage' && (
              <div className="py-4 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(currentProduct.usageIdeas || [
                    'Làm móc khóa, treo balo, túi xách',
                    'Trang trí góc bàn học, bàn làm việc',
                    'Làm quà tặng bạn bè, người thương',
                  ]).map((idea, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#FBF6EC] border border-[#987456]/15 flex items-center gap-2.5 text-xs text-[#4D4A3F]"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#7A8B70]/15 text-[#53634E] flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </span>
                      <span>{idea}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dải xem các bạn nhỏ khác trong tiệm */}
          <div className="pt-2 border-t border-[#987456]/15">
            <span className="text-[11px] font-bold text-[#987456] block mb-2 uppercase tracking-wide">
              Các bạn nhỏ khác trong tiệm:
            </span>
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
              {PRODUCTS.map((p) => {
                const isMatch = p.id === currentProduct.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    title={p.name}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isMatch
                        ? 'border-[#7A8B70] ring-2 ring-[#7A8B70]/30 shadow-xs scale-105'
                        : 'border-[#987456]/20 opacity-70 hover:opacity-100 hover:border-[#7A8B70]/50'
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

        </div>
      </div>
    </div>
  );
};
