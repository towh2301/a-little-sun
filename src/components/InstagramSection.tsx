import React from 'react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

import img1 from '../assets/images/hero_crochet_warmth_1790410332528.jpg';
import img2 from '../assets/images/product_mam_sage_1790410347830.jpg';
import img3 from '../assets/images/product_mam_vang_1790410359991.jpg';
import img4 from '../assets/images/craft_packaging_gift_1790410382266.jpg';
import img5 from '../assets/images/product_mam_camdat_1790410370599.jpg';
import img6 from '../assets/images/product_mam_xanhla_1790410398098.jpg';

const INSTA_POSTS = [
  { img: img1, caption: 'Nắng chiều rót mật trên cuộn len nhỏ ☀️', likes: '1.4k' },
  { img: img2, caption: 'Mầm Xanh Sage cho góc bàn làm việc thêm an yên 🌱', likes: '920' },
  { img: img3, caption: 'Hôm nay chưa nở thì mai mình nở nha! 🌼', likes: '2.1k' },
  { img: img4, caption: 'Từng gói quà nhỏ gửi đi mang theo bao thương mến 🎁', likes: '840' },
  { img: img5, caption: 'Tone cam đất mộc mạc cho ngày se gió 🍂', likes: '1.2k' },
  { img: img6, caption: 'Mầm xanh cỏ non sau cơn mưa sớm 🌿', likes: '760' },
];

export const InstagramSection: React.FC = () => {
  return (
    <section id="instagram-section" className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto w-full">
      <div className="space-y-6">
        {/* Heading */}
        <div className="text-center space-y-1.5">
          <span className="text-xs font-semibold text-[#7A8B70] tracking-wider uppercase">
            Góc ảnh nhỏ · Nhật ký tiệm
          </span>
          <h2 className="font-serif-soft text-3xl sm:text-4xl font-bold text-[#4D4A3F]">
            Gặp Một Chút Nắng trên Instagram
          </h2>
          <p className="text-xs sm:text-sm text-[#987456] max-w-md mx-auto">
            Cùng ngắm nhìn những góc len nhỏ ấm áp, hậu trường làm việc và những món quà chuẩn bị lên đường mỗi ngày
          </p>
        </div>

        {/* Responsive Grid: 3 cols on mobile, 6 cols on desktop */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3.5">
          {INSTA_POSTS.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F5EEDF] border border-[#987456]/15 cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <img
                src={post.img}
                alt={post.caption}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white p-2 text-center">
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-[10px] mt-1 line-clamp-2 text-white/90 font-serif-soft">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Handle CTA */}
        <div className="pt-2 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFF9EF] hover:bg-[#F5EEDF] text-[#4D4A3F] border border-[#987456]/20 text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-[#B87559]" />
            <span>Theo dõi @motchutnang trên Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};
