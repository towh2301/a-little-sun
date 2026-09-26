import React, { useState, useEffect, useMemo } from 'react';
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
import { AdminDashboard } from './components/AdminDashboard';
import { BackendStore } from './services/backendStore';
import { Product } from './types';

const MainContent: React.FC = () => {
  const { toastMessage } = useCart();
  const [currentFilter, setCurrentFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('home');
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.hash === '#admin' || window.location.search.includes('admin');
  });
  const [productsList, setProductsList] = useState<Product[]>([]);

  // Listen to hash change for #admin route
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin' || window.location.search.includes('admin'));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Load products dynamically from BackendStore
  useEffect(() => {
    setProductsList(BackendStore.getProducts());
  }, [isAdminView]);

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (currentFilter === 'all') return productsList;
    return productsList.filter((p) => p.category === currentFilter);
  }, [currentFilter, productsList]);

  // If viewing admin dashboard
  if (isAdminView) {
    return (
      <AdminDashboard
        onBackToShop={() => {
          window.location.hash = '';
          setIsAdminView(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#4D4A3F] flex flex-col w-full selection:bg-[#E8B85C]/30 selection:text-[#4D4A3F]">
      {/* Sticky Header spanning 100% width with max-w inner container */}
      <Header onOpenAdmin={() => setIsAdminView(true)} />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
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

          {/* Responsive Product Grid: 2 cols on mobile, 2 cols on small tablet, 3 cols on tablet, 4 cols on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
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
      </main>

      {/* 7. Footer spanning full width with full-bleed background */}
      <Footer onOpenAdmin={() => setIsAdminView(true)} />

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
