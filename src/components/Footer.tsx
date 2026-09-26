import React from 'react';
import { Heart, Instagram, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
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
    <footer className="pt-12 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8 bg-[#F5EEDF]/90 border-t border-[#987456]/20 mt-8">
      <div className="max-w-6xl mx-auto">
        {/* Desktop 4-Column Layout / Mobile Stacked */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#987456]/15">
          {/* Column 1: Brand Intro (col-span-5) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="font-serif-soft text-2xl font-bold tracking-tight text-[#4D4A3F] lowercase">
                một chút nắng
              </span>
              <span className="text-xl">☀️</span>
            </div>
            <p className="text-xs sm:text-sm text-[#987456] italic">
              “giữ lại một chút dịu dàng cho mỗi ngày”
            </p>
            <p className="text-xs text-[#4D4A3F]/85 leading-relaxed max-w-sm pt-1">
              Thương hiệu đồ len mini handmade từ xưởng nhỏ Việt Nam. Chúng mình tin rằng những điều nhỏ bé, được làm nên từ sự kiên nhẫn và tình yêu thương, có thể xoa dịu tâm hồn và thắp sáng những ngày bạn cần thêm chút ấm áp.
            </p>
          </div>

          {/* Column 2: Navigation Links (col-span-2) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif-soft text-base font-bold text-[#4D4A3F]">
              Khám phá
            </h4>
            <ul className="space-y-2 text-xs text-[#987456]">
              <li>
                <a
                  href="#top"
                  onClick={scrollTo('top')}
                  className="hover:text-[#53634E] transition-colors"
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href="#products-section"
                  onClick={scrollTo('products-section')}
                  className="hover:text-[#53634E] transition-colors"
                >
                  Những bạn nhỏ
                </a>
              </li>
              <li>
                <a
                  href="#story-section"
                  onClick={scrollTo('story-section')}
                  className="hover:text-[#53634E] transition-colors"
                >
                  Chuyện của tiệm
                </a>
              </li>
              <li>
                <a
                  href="#packaging-section"
                  onClick={scrollTo('packaging-section')}
                  className="hover:text-[#53634E] transition-colors"
                >
                  Cách đóng gói
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Handmade Promise (col-span-2) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif-soft text-base font-bold text-[#4D4A3F]">
              Cam kết của tiệm
            </h4>
            <ul className="space-y-2 text-xs text-[#987456]">
              <li>🧶 Len sợi cotton an toàn</li>
              <li>☀️ 100% móc thủ công</li>
              <li>🎁 Bao bì kraft thân thiện</li>
              <li>💌 Thiệp viết tay theo yêu cầu</li>
            </ul>
          </div>

          {/* Column 4: Contact & Social (col-span-3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif-soft text-base font-bold text-[#4D4A3F]">
              Kết nối cùng tiệm
            </h4>
            <div className="space-y-2 text-xs text-[#987456]">
              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#B87559]" />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#53634E] transition-colors"
                >
                  @motchutnang
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#7A8B70]" />
                <span>Xưởng handmade tại Việt Nam</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-[#E8B85C]" />
                <span>Nhận đặt sỉ & quà tặng sự kiện</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#987456]/80 gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <p>© {new Date().getFullYear()} Một Chút Nắng. Giữ lại một chút nắng cho những ngày chậm lớn.</p>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[#987456] hover:text-[#53634E] underline underline-offset-2 ml-2 cursor-pointer text-[10px]"
              >
                (Góc chủ tiệm)
              </button>
            )}
          </div>
          <p className="font-handwriting text-base text-[#53634E]">
            Handmade with love in Vietnam ♡
          </p>
        </div>
      </div>
    </footer>
  );
};
