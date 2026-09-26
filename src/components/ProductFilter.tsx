import React from 'react';

export interface FilterOption {
  id: string;
  label: string;
}

interface ProductFilterProps {
  currentFilter: string;
  onSelectFilter: (filterId: string) => void;
}

const FILTER_ITEMS: FilterOption[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'linhvat', label: 'Tiểu Ếch & Linh vật' },
  { id: 'mam', label: 'Mầm cây' },
  { id: 'hoa', label: 'Hoa cỏ' },
  { id: 'qua', label: 'Quả ngọt & Nấm' },
  { id: 'phukien', label: 'Phụ kiện' },
];

export const ProductFilter: React.FC<ProductFilterProps> = ({
  currentFilter,
  onSelectFilter,
}) => {
  return (
    <div className="w-full flex justify-center px-4">
      {/* Refined, organic tab bar with subtle typography and warm underline / clean pill style */}
      <nav
        aria-label="Phân loại bạn nhỏ"
        className="inline-flex items-center gap-1 sm:gap-2 p-1 rounded-full bg-[#EFE7D5]/70 border border-[#987456]/15 backdrop-blur-xs shadow-2xs max-w-full overflow-x-auto no-scrollbar"
      >
        {FILTER_ITEMS.map((item) => {
          const isActive = currentFilter === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectFilter(item.id)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                isActive
                  ? 'bg-[#FFF9EF] text-[#4D4A3F] font-semibold shadow-xs border border-[#987456]/20'
                  : 'text-[#6B6658] hover:text-[#4D4A3F] hover:bg-[#FFF9EF]/40'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
