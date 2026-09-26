import React from 'react';
import artisanImg from '../assets/images/artisan_hands_crochet_1790410303011.jpg';
import { Heart, Sparkles } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story-section" className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto w-full">
      <div className="relative rounded-3xl md:rounded-[36px] p-6 sm:p-8 md:p-12 bg-[#F5EEDF] border border-[#987456]/20 paper-shadow overflow-hidden">
        {/* Decorative subtle washi tape at top */}
        <div className="w-16 h-3.5 bg-[#E8B85C]/50 border border-[#987456]/25 mx-auto -mt-8 sm:-mt-10 mb-6 rounded-xs transform -rotate-1 shadow-2xs" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: Story Photo with Polaroid/Craft Frame */}
          <div className="md:col-span-5 relative">
            <div className="p-3 pb-6 bg-[#FFF9EF] rounded-3xl shadow-md border border-[#987456]/15 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#F5EEDF]">
                <img
                  src={artisanImg}
                  alt="Đôi bàn tay thợ móc len tỉ mẩn từng mũi chỉ"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="pt-3 text-center">
                <span className="font-handwriting text-base text-[#53634E]">
                  “từng mũi móc chậm rãi, từng nhịp thở bình yên”
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Prose */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#7A8B70] tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E8B85C]" />
                <span>Chuyện của tiệm</span>
              </span>
              <h2 className="font-serif-soft text-3xl sm:text-4xl font-bold text-[#4D4A3F] tracking-tight">
                Một chút nắng là gì?
              </h2>
            </div>

            {/* Narrative Quotes */}
            <div className="space-y-3 font-serif-soft text-lg sm:text-xl text-[#4D4A3F] leading-relaxed border-l-2 border-[#7A8B70]/30 pl-4 py-1">
              <p className="italic text-[#987456]">
                “Có những ngày mình chẳng cần điều gì quá lớn lao.
              </p>
              <p className="italic text-[#987456]">
                Chỉ cần một chút dịu dàng để thấy hôm nay cũng đáng yêu.”
              </p>
            </div>

            <p className="text-xs sm:text-sm font-sans text-[#4D4A3F] leading-relaxed">
              Vì thế, <strong className="text-[#53634E] font-semibold">Một Chút Nắng</strong> ra đời — từ những cuộn len nhỏ, những mũi móc chậm rãi và mong muốn tạo ra những người bạn bé xíu để ở bên bạn mỗi ngày. Dù cuộc sống ngoài kia có hối hả, hy vọng khi nhìn thấy mầm nắng nhỏ cài trên áo hay chiếc móc khoá đung đưa, bạn sẽ mỉm cười và cho phép mình thở phào một cái thật nhẹ.
            </p>

            {/* Signature & Tag */}
            <div className="pt-4 border-t border-[#987456]/15 flex items-center justify-between text-xs text-[#987456]">
              <span className="font-handwriting text-xl text-[#53634E]">
                từ xưởng nhỏ của chúng mình ♡
              </span>
              <span className="font-semibold text-[#7A8B70] px-3 py-1 bg-[#FFF9EF] rounded-full border border-[#987456]/15">
                #slowliving #handcrafted
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
