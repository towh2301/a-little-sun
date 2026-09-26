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
  { id: 'sage', label: 'Xanh Sage' },
  { id: 'vang', label: 'Vàng Nắng' },
  { id: 'xanhla', label: 'Xanh Lá' },
  { id: 'camdat', label: 'Cam Đất' },
];

export const ProductFilter: React.FC<ProductFilterProps> = ({
  currentFilter,
  onSelectFilter,
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-1.5 px-4 max-w-xl mx-auto flex md:justify-center">
      <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap min-w-max">
        {FILTER_ITEMS.map((item) => {
          const isActive = currentFilter === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectFilter(item.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 select-none cursor-pointer ${
                isActive
                  ? 'bg-[#7A8B70] text-white shadow-xs'
                  : 'bg-[#F5EEDF] text-[#4D4A3F] hover:bg-[#E8DCB8]/60 border border-[#987456]/20'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
