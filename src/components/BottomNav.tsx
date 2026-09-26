import React from 'react';
import { Home, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { totalQuantity, openCart } = useCart();

  const handleNav = (id: string, scrollTarget?: string) => {
    setActiveTab(id);
    if (scrollTarget) {
      if (scrollTarget === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF9EF]/95 backdrop-blur-md border-t border-[#987456]/15 shadow-lg max-w-md mx-auto">
      <div className="grid grid-cols-4 items-center h-16 px-2">
        {/* Tab 1: Trang chủ */}
        <button
          onClick={() => handleNav('home', 'top')}
          className="min-h-[44px] flex flex-col items-center justify-center py-1 group focus-visible:outline-hidden"
          aria-label="Trang chủ"
        >
          <Home
            className={`w-5 h-5 transition-colors ${
              activeTab === 'home'
                ? 'text-[#53634E] stroke-[2.2]'
                : 'text-[#987456]/70 group-hover:text-[#53634E]'
            }`}
          />
          <span
            className={`text-[10px] font-medium tracking-tight mt-1 ${
              activeTab === 'home' ? 'text-[#53634E] font-semibold' : 'text-[#987456]/80'
            }`}
          >
            Trang chủ
          </span>
        </button>

        {/* Tab 2: Bạn nhỏ (Sản phẩm) */}
        <button
          onClick={() => handleNav('products', 'products-section')}
          className="min-h-[44px] flex flex-col items-center justify-center py-1 group focus-visible:outline-hidden"
          aria-label="Những bạn nhỏ"
        >
          <Sparkles
            className={`w-5 h-5 transition-colors ${
              activeTab === 'products'
                ? 'text-[#53634E] stroke-[2.2]'
                : 'text-[#987456]/70 group-hover:text-[#53634E]'
            }`}
          />
          <span
            className={`text-[10px] font-medium tracking-tight mt-1 ${
              activeTab === 'products' ? 'text-[#53634E] font-semibold' : 'text-[#987456]/80'
            }`}
          >
            Bạn nhỏ
          </span>
        </button>

        {/* Tab 3: Chuyện tiệm */}
        <button
          onClick={() => handleNav('story', 'story-section')}
          className="min-h-[44px] flex flex-col items-center justify-center py-1 group focus-visible:outline-hidden"
          aria-label="Chuyện tiệm"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              activeTab === 'story'
                ? 'text-[#53634E] stroke-[2.2]'
                : 'text-[#987456]/70 group-hover:text-[#53634E]'
            }`}
          />
          <span
            className={`text-[10px] font-medium tracking-tight mt-1 ${
              activeTab === 'story' ? 'text-[#53634E] font-semibold' : 'text-[#987456]/80'
            }`}
          >
            Chuyện tiệm
          </span>
        </button>

        {/* Tab 4: Giỏ hàng */}
        <button
          onClick={openCart}
          className="min-h-[44px] flex flex-col items-center justify-center py-1 group relative focus-visible:outline-hidden"
          aria-label={`Giỏ hàng (${totalQuantity})`}
        >
          <div className="relative">
            <ShoppingBag
              className={`w-5 h-5 transition-colors ${
                totalQuantity > 0
                  ? 'text-[#53634E] stroke-[2.2]'
                  : 'text-[#987456]/70 group-hover:text-[#53634E]'
              }`}
            />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-1 bg-[#E8B85C] text-[#4D4A3F] text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#FFF9EF]">
                {totalQuantity}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-1 text-[#987456]/80">
            Giỏ ({totalQuantity})
          </span>
        </button>
      </div>
    </nav>
  );
};
