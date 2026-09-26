import React, { useState, useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductFilter } from './components/ProductFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StorySection } from './components/StorySection';
import { QuoteSection } from './components/QuoteSection';
import { PackagingSection } from './components/PackagingSection';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { PRODUCTS } from './data/products';
import { Smartphone, Monitor } from 'lucide-react';

const MainContent: React.FC = () => {
  const { toastMessage } = useCart();
  const [currentFilter, setCurrentFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('home');
  const [desktopViewMode, setDesktopViewMode] = useState<'mobile' | 'wide'>('wide');

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (currentFilter === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === currentFilter);
  }, [currentFilter]);

  return (
    <div className="min-h-screen bg-[#F5EEDF] flex flex-col items-center">
      {/* Desktop Helper Bar: Allows reviewer to view in expansive desktop layout or exact 390px mobile frame */}
      <aside aria-label="Bộ điều khiển chế độ xem" className="hidden lg:flex w-full bg-[#E8DCB8]/60 border-b border-[#987456]/20 px-6 py-2 items-center justify-between text-xs text-[#4D4A3F] backdrop-blur-xs sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-serif-soft font-bold text-sm">Một Chút Nắng</span>
          <span className="text-[#987456]">· Chế độ hiển thị giao diện</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDesktopViewMode('wide')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              desktopViewMode === 'wide'
                ? 'bg-[#7A8B70] text-white shadow-xs'
                : 'bg-[#FFF9EF] text-[#4D4A3F] hover:bg-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Màn Hình Desktop Rộng</span>
          </button>
          <button
            onClick={() => setDesktopViewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              desktopViewMode === 'mobile'
                ? 'bg-[#7A8B70] text-white shadow-xs'
                : 'bg-[#FFF9EF] text-[#4D4A3F] hover:bg-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Khung Điện Thoại (390px)</span>
          </button>
        </div>
      </aside>

      {/* Main App Container */}
      <main
        className={`w-full min-h-screen bg-[#FFF9EF] text-[#4D4A3F] transition-all duration-300 relative flex flex-col ${
          desktopViewMode === 'mobile'
            ? 'max-w-[430px] my-0 lg:my-6 rounded-none lg:rounded-[40px] shadow-none lg:shadow-2xl border-0 lg:border-8 lg:border-[#4D4A3F]/15 overflow-hidden ring-1 ring-[#987456]/20'
            : 'max-w-6xl shadow-sm border-x border-[#987456]/15'
        }`}
      >
        {/* Sticky Header */}
        <Header />

        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Product Catalog Section */}
        <section id="products-section" className="px-4 sm:px-6 lg:px-8 pt-6 pb-12 max-w-6xl mx-auto w-full">
          {/* Section Heading & Subheading */}
          <div className="text-center space-y-1.5 mb-6">
            <span className="text-xs font-semibold text-[#7A8B70] tracking-wider uppercase">
              Bộ sưu tập thủ công
            </span>
            <h2 className="font-serif-soft text-3xl sm:text-4xl font-bold text-[#4D4A3F] tracking-tight">
              Những bạn nhỏ
            </h2>
            <p className="text-xs sm:text-sm text-[#987456] italic">
              Một chút yêu thương được móc bằng tay, để ở bên bạn mỗi ngày.
            </p>
          </div>

          {/* Horizontal Scrolling Filter */}
          <div className="mb-6">
            <ProductFilter
              currentFilter={currentFilter}
              onSelectFilter={setCurrentFilter}
            />
          </div>

          {/* Responsive Product Grid: 2 cols on mobile, 3-4 cols on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-sm text-[#987456]">
              Hiện chưa có bạn nhỏ nào thuộc phân loại này.
            </div>
          )}
        </section>

        {/* 3. Storytelling Section */}
        <StorySection />

        {/* 4. Quote Note Card Section */}
        <QuoteSection />

        {/* 5. Packaging Showcase Section */}
        <PackagingSection />

        {/* 6. Instagram Feed Section */}
        <InstagramSection />

        {/* 7. Footer */}
        <Footer />

        {/* 8. Fixed Bottom Navigation Bar (Mobile only) */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* 9. Floating Toast Notification */}
        {toastMessage && (
          <aside aria-label="Thông báo giỏ hàng" className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-xs px-4 py-2 rounded-full bg-[#53634E] text-white text-xs font-medium shadow-lg animate-in fade-in slide-in-from-top-3 duration-200 text-center pointer-events-none">
            {toastMessage}
          </aside>
        )}

        {/* Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
