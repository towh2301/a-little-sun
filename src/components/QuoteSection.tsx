import React from 'react';

export const QuoteSection: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-3xl mx-auto w-full">
      {/* Handwritten Kraft Note Card */}
      <div className="relative mx-auto p-8 sm:p-12 rounded-3xl bg-[#FBF6EC] border border-[#987456]/25 paper-shadow transform -rotate-1 hover:rotate-0 transition-transform duration-300">
        {/* Washi tapes at top left and right on desktop */}
        <div className="absolute -top-3 left-10 w-20 h-5 bg-[#E8B85C]/50 backdrop-blur-xs border border-[#987456]/20 rounded-xs shadow-2xs rotate-3 hidden sm:block" />
        <div className="absolute -top-3 right-10 w-20 h-5 bg-[#7A8B70]/40 backdrop-blur-xs border border-[#987456]/20 rounded-xs shadow-2xs -rotate-2 hidden sm:block" />
        {/* Center tape for mobile */}
        <div className="sm:hidden absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#E8B85C]/50 backdrop-blur-xs border border-[#987456]/20 rounded-xs shadow-2xs rotate-1" />

        <div className="text-center space-y-4 py-2">
          {/* Sun icon */}
          <div className="text-4xl sm:text-5xl select-none">☀️</div>

          {/* Quote text */}
          <blockquote className="font-serif-soft italic text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4D4A3F] leading-snug">
            “Hôm nay chưa nở<br />
            thì mai mình nở.”
          </blockquote>

          {/* Author credit */}
          <p className="font-handwriting text-xl sm:text-2xl text-[#987456] pt-1">
            — Một Chút Nắng
          </p>
        </div>

        {/* Corner leaf doodle */}
        <div className="absolute bottom-3 right-5 text-[#7A8B70]/80 text-xs sm:text-sm select-none font-medium">
          🌱 một mầm nhỏ, một ngày xanh
        </div>
      </div>
    </section>
  );
};
