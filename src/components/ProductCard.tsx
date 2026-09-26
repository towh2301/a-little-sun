import React from 'react';
import { Product } from '../types';
import { formatVND } from '../data/products';
import { useCart } from '../context/CartContext';
import { Plus, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail, addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.color, 1);
  };

  return (
    <div
      onClick={() => openProductDetail(product)}
      className="group relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FBF6EC] border border-[#987456]/15 paper-shadow hover:border-[#7A8B70]/50 hover:shadow-md transition-all duration-300 cursor-pointer active:scale-[0.98]"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-[#F5EEDF] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Color indicator dot & label on image */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF9EF]/90 backdrop-blur-xs border border-[#987456]/15 shadow-2xs">
          <span
            className="w-2 h-2 rounded-full border border-black/10"
            style={{ backgroundColor: product.colorHex }}
          />
          <span className="text-[10px] sm:text-xs text-[#4D4A3F] font-medium leading-none">
            {product.color}
          </span>
        </div>

        {/* Highlight Tag Badge */}
        {product.highlightText && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#7A8B70] text-white text-[10px] font-bold shadow-xs">
            {product.highlightText}
          </div>
        )}

        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          aria-label={`Thêm ${product.name} vào giỏ`}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#FFF9EF]/95 hover:bg-[#7A8B70] text-[#53634E] hover:text-white shadow-xs border border-[#987456]/20 flex items-center justify-center transition-all active:scale-90"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-serif-soft text-sm sm:text-base font-semibold text-[#4D4A3F] leading-tight line-clamp-2 group-hover:text-[#53634E] transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-[11px] sm:text-xs text-[#987456] line-clamp-1 italic">
            {product.storyQuote || 'Móc tay tỉ mỉ từng cánh'}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#987456]/10 flex items-baseline justify-between">
          <span className="text-xs sm:text-sm font-bold text-[#53634E] tabular-nums">
            {formatVND(product.price)}
          </span>
          <span className="text-[10px] sm:text-xs text-[#7A8B70] font-medium">
            Còn {product.stock} bạn
          </span>
        </div>
      </div>
    </div>
  );
};
