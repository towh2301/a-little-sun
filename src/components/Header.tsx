import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Sparkles, Instagram, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatVND } from '../data/products';

export const Header: React.FC = () => {
  const { totalQuantity, openCart, subtotal } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFF9EF]/95 backdrop-blur-md shadow-xs border-b border-[#987456]/15'
          : 'bg-[#FFF9EF]/85 backdrop-blur-xs'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Brand Logo & Subtitle */}
        <div className="flex flex-col">
          <a
            href="#"
            onClick={scrollToSection('top')}
            className="flex items-center gap-1.5 group select-none"
            aria-label="Một Chút Nắng - Trang chủ"
          >
            <span className="font-serif-soft text-xl sm:text-2xl font-bold tracking-tight text-[#4D4A3F] lowercase">
              một chút nắng
            </span>
            <span className="text-lg sm:text-xl transform transition-transform group-hover:rotate-12 duration-300">
              ☀️
            </span>
          </a>
          <span className="text-[11px] sm:text-xs text-[#987456] font-medium tracking-tight mt-0.5 select-none leading-none">
            những điều nhỏ bé, mang theo một chút ấm áp
          </span>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#4D4A3F]/85">
          <a
            href="#top"
            onClick={scrollToSection('top')}
            className="hover:text-[#53634E] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#7A8B70] after:transition-all"
          >
            Trang chủ
          </a>
          <a
            href="#products-section"
            onClick={scrollToSection('products-section')}
            className="hover:text-[#53634E] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#7A8B70] after:transition-all"
          >
            Những bạn nhỏ
          </a>
          <a
            href="#story-section"
            onClick={scrollToSection('story-section')}
            className="hover:text-[#53634E] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#7A8B70] after:transition-all"
          >
            Chuyện của tiệm
          </a>
          <a
            href="#packaging-section"
            onClick={scrollToSection('packaging-section')}
            className="hover:text-[#53634E] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#7A8B70] after:transition-all"
          >
            Đóng gói
          </a>
          <a
            href="#instagram-section"
            onClick={scrollToSection('instagram-section')}
            className="hover:text-[#53634E] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#7A8B70] after:transition-all"
          >
            Instagram
          </a>
        </nav>

        {/* Right: Hotline & Cart Button */}
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-xs text-[#987456] hover:text-[#53634E] transition-colors px-3 py-1.5 rounded-full bg-[#F5EEDF]/60 border border-[#987456]/15"
          >
            <Instagram className="w-3.5 h-3.5 text-[#B87559]" />
            <span>@motchutnang</span>
          </a>

          <button
            onClick={openCart}
            className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#F5EEDF] hover:bg-[#E8DCB8]/60 text-[#4D4A3F] border border-[#987456]/20 transition-all focus-visible:outline-2 focus-visible:outline-[#7A8B70] active:scale-97 cursor-pointer shadow-2xs"
            aria-label={`Giỏ hàng, hiện có ${totalQuantity} món`}
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#53634E]" strokeWidth={2} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2.5 min-w-[17px] h-[17px] px-1 bg-[#E8B85C] text-[#4D4A3F] text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#FFF9EF] shadow-xs">
                  {totalQuantity}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold hidden sm:inline text-[#53634E]">
              {totalQuantity > 0 ? formatVND(subtotal) : 'Giỏ hàng'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
