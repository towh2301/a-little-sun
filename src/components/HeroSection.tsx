import React from 'react';
import heroImg from '../assets/images/hero_crochet_warmth_1790410332528.jpg';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-3 pb-8 max-w-6xl mx-auto w-full">
      {/* Mobile-first layout (< 768px) */}
      <div className="md:hidden relative rounded-3xl overflow-hidden paper-shadow border border-[#987456]/15 bg-[#F5EEDF]">
        <div className="relative aspect-4/3 w-full overflow-hidden">
          <img
            src={heroImg}
            alt="Đồ len handmade Một Chút Nắng trong nắng chiều"
            className="w-full h-full object-cover object-center transform scale-102 hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4D4A3F]/35 via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-3 right-3 bg-[#FFF9EF]/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#987456]/20 shadow-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B85C] animate-pulse" />
            <span className="text-[11px] font-medium text-[#4D4A3F]">Móc tay 100%</span>
          </div>
        </div>

        <div className="relative -mt-6 mx-3 mb-3 p-5 rounded-2xl bg-[#FFF9EF]/95 backdrop-blur-md border border-[#987456]/15 shadow-sm">
          <div className="w-12 h-2.5 bg-[#E8B85C]/35 rounded-xs mx-auto -mt-6 mb-3 border border-[#987456]/20" />

          <div className="text-center">
            <h1 className="font-serif-soft text-2xl font-bold tracking-tight text-[#4D4A3F] leading-snug">
              Giữ lại một chút nắng.
            </h1>
            <p className="mt-2 text-[13px] text-[#987456] leading-relaxed max-w-xs mx-auto">
              Những món len nhỏ được móc bằng tay, để bạn mang theo một chút dịu dàng mỗi ngày.
            </p>

            <div className="mt-4 flex justify-center">
              <a
                href="#products-section"
                onClick={scrollTo('products-section')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7A8B70] text-white text-[13px] font-medium shadow-xs hover:bg-[#53634E] active:scale-97 transition-all duration-200"
              >
                <span>Xem những bạn nhỏ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Expansive Scrapbook Layout (>= 768px) */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-10 lg:gap-14 md:items-center bg-[#FBF6EC] rounded-[32px] p-8 lg:p-12 border border-[#987456]/15 paper-shadow relative overflow-hidden">
        {/* Background sunbeam / warm tint */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#E8B85C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#7A8B70]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Column: Brand Typography & Story Brief */}
        <div className="md:col-span-7 space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9EF] border border-[#987456]/20 text-xs font-semibold text-[#53634E] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#E8B85C]" />
            <span>Tiệm đồ len thủ công nhỏ · Một Chút Nắng</span>
          </div>

          <div className="space-y-3">
            <h1 className="font-serif-soft text-4xl lg:text-5xl font-bold tracking-tight text-[#4D4A3F] leading-[1.18]">
              Giữ lại một chút nắng cho những ngày chậm lớn.
            </h1>
            <p className="text-base text-[#987456] leading-relaxed max-w-xl font-normal">
              Những món len nhỏ được móc bằng tay, để bạn mang theo một chút dịu dàng mỗi ngày. Từng cuộn sợi cotton tự nhiên, từng mũi móc kiên nhẫn đều mang theo lời nhắn gửi ấm áp cho góc bàn, chiếc balo hay chiếc túi thân thuộc.
            </p>
          </div>

          {/* Handcrafted Badges */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-[#FFF9EF] border border-[#987456]/15 text-center">
              <span className="text-xl block mb-1">🧶</span>
              <p className="text-xs font-bold text-[#4D4A3F]">Len sợi mềm mịn</p>
              <p className="text-[10px] text-[#987456]">Cotton an toàn, êm ái</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#FFF9EF] border border-[#987456]/15 text-center">
              <span className="text-xl block mb-1">☀️</span>
              <p className="text-xs font-bold text-[#4D4A3F]">100% Móc tay</p>
              <p className="text-[10px] text-[#987456]">Từng mũi chỉ tỉ mỉ</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#FFF9EF] border border-[#987456]/15 text-center">
              <span className="text-xl block mb-1">🎁</span>
              <p className="text-xs font-bold text-[#4D4A3F]">Gói như quà tặng</p>
              <p className="text-[10px] text-[#987456]">Card kraft & hoa khô</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex items-center gap-4">
            <a
              href="#products-section"
              onClick={scrollTo('products-section')}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#7A8B70] text-white text-sm font-semibold shadow-md hover:bg-[#53634E] active:scale-97 transition-all cursor-pointer"
            >
              <span>Xem những bạn nhỏ</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#story-section"
              onClick={scrollTo('story-section')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FFF9EF] hover:bg-[#F5EEDF] text-[#4D4A3F] border border-[#987456]/20 text-sm font-medium transition-all"
            >
              <span>Chuyện của tiệm</span>
              <Heart className="w-3.5 h-3.5 text-[#B87559]" />
            </a>
          </div>
        </div>

        {/* Right Column: Hero Photo Polaroid with Washi Tape */}
        <div className="md:col-span-5 relative z-10">
          <div className="relative p-3 pb-8 bg-[#FFF9EF] rounded-3xl shadow-xl border border-[#987456]/20 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* Washi tape at top */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#E8B85C]/60 backdrop-blur-xs border border-[#987456]/25 rounded-xs transform -rotate-2 z-20" />

            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#F5EEDF]">
              <img
                src={heroImg}
                alt="Đồ len handmade Một Chút Nắng trong nắng chiều"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="pt-4 px-2 text-center">
              <p className="font-handwriting text-lg text-[#53634E] leading-snug">
                “mỗi mầm nhỏ, một ngày xanh bình yên 🌱”
              </p>
              <p className="text-[11px] text-[#987456] mt-0.5">
                Chụp trong ánh nắng buổi chiều tại xưởng
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
