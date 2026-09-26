import React, { useState } from 'react';
import packagingImg from '../assets/images/craft_packaging_gift_1790410382266.jpg';
import { Gift, ArrowRight, X, Heart, Sparkles, Check } from 'lucide-react';

export const PackagingSection: React.FC = () => {
  const [showPackagingModal, setShowPackagingModal] = useState(false);

  return (
    <section id="packaging-section" className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto w-full">
      <div className="rounded-3xl md:rounded-[36px] p-6 sm:p-8 md:p-12 bg-[#FBF6EC] border border-[#987456]/15 paper-shadow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: Packaging Photo */}
          <div className="md:col-span-5 relative">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-4/3 bg-[#F5EEDF] border border-[#987456]/20 shadow-sm">
              <img
                src={packagingImg}
                alt="Bao bì quà tặng Một Chút Nắng trên giấy kraft và hoa khô"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 right-3 bg-[#FFF9EF]/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[#987456]/15 text-xs text-[#4D4A3F] font-semibold flex items-center gap-1.5 shadow-xs">
                <Gift className="w-4 h-4 text-[#53634E]" />
                <span>Gói như quà tặng</span>
              </div>
            </div>
          </div>

          {/* Right Column: Packaging Story & Details */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#7A8B70] tracking-wider uppercase flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-[#7A8B70]" />
                <span>Sự chỉn chu & Trân quý</span>
              </span>
              <h2 className="font-serif-soft text-3xl sm:text-4xl font-bold text-[#4D4A3F]">
                Một chút nắng được gói lại
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#987456] leading-relaxed">
              “Mỗi món đồ đều được gói như một món quà nhỏ, kèm theo một lời nhắn để bạn có thể giữ lại không chỉ một món đồ len mà còn một chút cảm giác ấm áp.”
            </p>

            {/* 3 Step Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-[#FFF9EF] border border-[#987456]/15 space-y-1">
                <span className="text-base block">📜</span>
                <p className="font-bold text-xs text-[#4D4A3F]">Card kraft</p>
                <p className="text-[11px] text-[#987456] leading-snug">In thông điệp dịu dàng "Hôm nay chưa nở thì mai mình nở"</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#FFF9EF] border border-[#987456]/15 space-y-1">
                <span className="text-base block">🌾</span>
                <p className="font-bold text-xs text-[#4D4A3F]">Hoa khô tự nhiên</p>
                <p className="text-[11px] text-[#987456] leading-snug">Nhành baby hoặc hoa sao khô thơm thảo mộc mộc mạc</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#FFF9EF] border border-[#987456]/15 space-y-1">
                <span className="text-base block">💌</span>
                <p className="font-bold text-xs text-[#4D4A3F]">Lời nhắn viết tay</p>
                <p className="text-[11px] text-[#987456] leading-snug">Tiệm nắn nót viết tay giúp bạn nếu gửi tặng người thương</p>
              </div>
            </div>

            {/* Interactive CTA */}
            <div className="pt-2">
              <button
                onClick={() => setShowPackagingModal(true)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#53634E] hover:text-[#7A8B70] transition-colors group cursor-pointer"
              >
                <span>Xem quy trình đóng gói chi tiết</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Packaging Detail Modal */}
      {showPackagingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#FFF9EF] rounded-3xl p-6 border border-[#987456]/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-soft text-xl font-bold text-[#4D4A3F]">
                Gói ghém yêu thương 🎁
              </h3>
              <button
                onClick={() => setShowPackagingModal(false)}
                className="w-8 h-8 rounded-full bg-[#F5EEDF] flex items-center justify-center text-[#4D4A3F] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#4D4A3F]">
              <div className="p-3.5 rounded-2xl bg-[#F5EEDF] border border-[#987456]/10 flex gap-3 items-start">
                <span className="text-lg">📜</span>
                <div>
                  <p className="font-bold text-[#4D4A3F]">Card giấy kraft 'Mầm Nắng'</p>
                  <p className="text-[11px] text-[#987456] mt-0.5 leading-relaxed">
                    Mỗi mầm hoa được cài ngay ngắn lên chiếc card giấy kraft tái chế, có ghi thông điệp gửi gắm yêu thương cùng lời chúc an yên.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F5EEDF] border border-[#987456]/10 flex gap-3 items-start">
                <span className="text-lg">🌾</span>
                <div>
                  <p className="font-bold text-[#4D4A3F]">Hoa khô tự nhiên</p>
                  <p className="text-[11px] text-[#987456] mt-0.5 leading-relaxed">
                    Gài kèm một nhành hoa sao hoặc baby khô mộc mạc thơm mùi thảo mộc nhẹ dịu cho gói quà thêm phần trang nhã.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F5EEDF] border border-[#987456]/10 flex gap-3 items-start">
                <span className="text-lg">💌</span>
                <div>
                  <p className="font-bold text-[#4D4A3F]">Lời nhắn riêng nếu tặng bạn</p>
                  <p className="text-[11px] text-[#987456] mt-0.5 leading-relaxed">
                    Nếu bạn đặt để tặng bạn bè, người thương, chỉ cần ghi chú ở bước đặt hàng, tiệm sẽ nắn nót viết tay giúp bạn tấm thiệp nhỏ nhé!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPackagingModal(false)}
              className="w-full py-3 rounded-2xl bg-[#7A8B70] text-white text-xs font-semibold hover:bg-[#53634E] transition-colors cursor-pointer"
            >
              Đã hiểu ♡
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
