import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  Palette, 
  Sparkles, 
  Layers, 
  BookOpen, 
  Ruler, 
  Image as ImageIcon 
} from 'lucide-react';
import { Product, ProductAngle, MaterialColorItem, ProductVariantEdition } from '../types';
import { BackendStore } from '../services/backendStore';
import { COLOR_OPTIONS } from '../data/products';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  productToEdit?: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  productToEdit,
}) => {
  const isEditMode = !!productToEdit;

  // Basic Info
  const [name, setName] = useState(productToEdit?.name || '');
  const [subtitle, setSubtitle] = useState(productToEdit?.subtitle || '');
  const [price, setPrice] = useState<number>(productToEdit?.price || 49000);
  const [stock, setStock] = useState<number>(productToEdit?.stock || 12);
  const [category, setCategory] = useState<string>(productToEdit?.category || 'mam');
  const [highlightText, setHighlightText] = useState(productToEdit?.highlightText || '');
  
  // Colors & Material
  const [color, setColor] = useState(productToEdit?.color || 'Xanh Lá Mạ');
  const [colorHex, setColorHex] = useState(productToEdit?.colorHex || '#88B868');
  const [material, setMaterial] = useState(
    productToEdit?.material || 'Len sợi cotton mềm mịn tự nhiên không xù lông'
  );

  // Story & Description
  const [description, setDescription] = useState(productToEdit?.description || '');
  const [story, setStory] = useState(productToEdit?.story || '');
  const [storyQuote, setStoryQuote] = useState(productToEdit?.storyQuote || '');
  const [packagingNote, setPackagingNote] = useState(
    productToEdit?.packagingNote || 'Đóng gói trong hộp kraft thắt nơ & thiệp viết tay'
  );

  // Dimensions
  const [height, setHeight] = useState(productToEdit?.sizeDimension?.height || '4 ~ 5 cm');
  const [width, setWidth] = useState(productToEdit?.sizeDimension?.width || '3 ~ 4 cm');
  const [sizeNote, setSizeNote] = useState(productToEdit?.sizeDimension?.note || '(Chưa tính móc khoá)');

  // Main Image (URL or uploaded file)
  const [mainImage, setMainImage] = useState<string>(productToEdit?.image || '');

  // Scrapbook Angles (Mặt trước, mặt sau...)
  const [angles, setAngles] = useState<ProductAngle[]>(
    productToEdit?.angles || [
      { label: 'Mặt trước', image: '' },
      { label: 'Mặt sau', image: '' },
      { label: 'Bên trái', image: '' },
      { label: 'Bên phải', image: '' },
    ]
  );

  // Materials & Colors breakdown (e.g. Da ếch, Balo...)
  const [materialsList, setMaterialsList] = useState<MaterialColorItem[]>(
    productToEdit?.materialsList || [
      { part: 'Màu chính', colorName: 'Xanh Lá', hex: '#88B868' },
      { part: 'Màu phụ', colorName: 'Trắng Kem', hex: '#F4EFEA' },
    ]
  );

  // Variant editions (Ếch đội mũ, Ếch cầm hoa...)
  const [variants, setVariants] = useState<ProductVariantEdition[]>(
    productToEdit?.variants || []
  );

  // Usage Ideas
  const [usageIdeas, setUsageIdeas] = useState<string[]>(
    productToEdit?.usageIdeas || [
      'Làm móc khóa, treo balo, túi xách',
      'Trang trí góc bàn học, bàn làm việc',
      'Làm quà tặng người thân, bạn bè',
    ]
  );

  // Tags
  const [tagInput, setTagInput] = useState(
    productToEdit?.tags ? productToEdit.tags.join(', ') : 'Nhỏ xinh nhẹ nhàng, Thân thiện dễ thương, Năng lượng tích cực'
  );

  // Form tab navigation for organized input
  const [activeTab, setActiveTab] = useState<'basic' | 'images_angles' | 'details_variants' | 'story'>('basic');

  if (!isOpen) return null;

  // Handle local image upload preview
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'main' | number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (target === 'main') {
          setMainImage(result);
        } else {
          setAngles((prev) => {
            const next = [...prev];
            next[target] = { ...next[target], image: result };
            return next;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Angle
  const addAngle = () => {
    setAngles([...angles, { label: `Góc mới #${angles.length + 1}`, image: '' }]);
  };

  const removeAngle = (idx: number) => {
    setAngles(angles.filter((_, i) => i !== idx));
  };

  // Add Material item
  const addMaterialItem = () => {
    setMaterialsList([...materialsList, { part: 'Bộ phận mới', colorName: 'Màu', hex: '#7A8B70' }]);
  };

  const removeMaterialItem = (idx: number) => {
    setMaterialsList(materialsList.filter((_, i) => i !== idx));
  };

  // Add Variant edition
  const addVariantEdition = () => {
    setVariants([
      ...variants,
      {
        id: `var-${Date.now()}`,
        name: 'Phiên bản mới',
        tagline: 'Nhỏ xinh và độc đáo',
        priceDelta: 0,
      },
    ]);
  };

  const removeVariantEdition = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id));
  };

  // Add Usage Idea
  const addUsageIdea = () => {
    setUsageIdeas([...usageIdeas, '']);
  };

  const removeUsageIdea = (idx: number) => {
    setUsageIdeas(usageIdeas.filter((_, i) => i !== idx));
  };

  // Save product
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Use default preview image if none provided
    const finalMainImage = mainImage || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600';

    const tagsArray = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    // Fill valid angles
    const validAngles = angles
      .filter((a) => a.label.trim())
      .map((a) => ({
        label: a.label.trim(),
        image: a.image.trim() || finalMainImage,
      }));

    const productData: Product = {
      id: productToEdit ? productToEdit.id : `mcn-${Date.now()}`,
      name: name.trim(),
      subtitle: subtitle.trim() || undefined,
      price: Number(price),
      stock: Number(stock),
      category,
      type: category as any,
      color,
      colorHex,
      highlightText: highlightText.trim() || undefined,
      description: description.trim() || 'Sản phẩm len móc thủ công đong đầy sự tỉ mỉ và ấm áp.',
      story: story.trim() || description.trim(),
      storyQuote: storyQuote.trim() || 'Mỗi mũi móc là một chút thương gửi trao',
      packagingNote,
      image: finalMainImage,
      size: `${height} × ${width}`,
      sizeDimension: {
        height,
        width,
        note: sizeNote,
      },
      material,
      materialsList: materialsList.length > 0 ? materialsList : undefined,
      angles: validAngles.length > 0 ? validAngles : undefined,
      variants: variants.length > 0 ? variants : undefined,
      usageIdeas: usageIdeas.filter((u) => u.trim().length > 0),
      tags: tagsArray.length > 0 ? tagsArray : undefined,
    };

    if (isEditMode) {
      BackendStore.updateProduct(productData);
    } else {
      BackendStore.addProduct(productData);
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FFF9EF] w-full max-w-3xl rounded-[28px] border border-[#987456]/20 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#987456]/15 bg-[#F5EEDF]/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">✨</span>
            <div>
              <h3 className="font-serif-soft font-bold text-base sm:text-lg text-[#4D4A3F]">
                {isEditMode ? `Chỉnh sửa thông tin: ${productToEdit?.name}` : 'Thêm bạn nhỏ mới (Đầy đủ thông tin Scrapbook)'}
              </h3>
              <p className="text-[11px] text-[#987456]">
                Đầy đủ ảnh, các góc nhìn, phiên bản, bảng màu, kích thước & câu chuyện
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFF9EF] hover:bg-white flex items-center justify-center text-[#4D4A3F] border border-[#987456]/15 cursor-pointer shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-6 pt-3 pb-2 border-b border-[#987456]/15 bg-[#FFF9EF] overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'basic'
                ? 'bg-[#7A8B70] text-white shadow-xs'
                : 'bg-[#EFE7D5]/70 text-[#4D4A3F] hover:bg-[#EFE7D5]'
            }`}
          >
            1. Cơ bản & Giá
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('images_angles')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'images_angles'
                ? 'bg-[#7A8B70] text-white shadow-xs'
                : 'bg-[#EFE7D5]/70 text-[#4D4A3F] hover:bg-[#EFE7D5]'
            }`}
          >
            2. Ảnh chính & 6 Góc nhìn
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('details_variants')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'details_variants'
                ? 'bg-[#7A8B70] text-white shadow-xs'
                : 'bg-[#EFE7D5]/70 text-[#4D4A3F] hover:bg-[#EFE7D5]'
            }`}
          >
            3. Bảng màu & Các phiên bản
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('story')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'story'
                ? 'bg-[#7A8B70] text-white shadow-xs'
                : 'bg-[#EFE7D5]/70 text-[#4D4A3F] hover:bg-[#EFE7D5]'
            }`}
          >
            4. Kể chuyện & Ứng dụng
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-[#4D4A3F]">
          
          {/* TAB 1: BASIC INFO & PRICING */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Tên bạn nhỏ *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Tiểu Ếch Xanh Đeo Balo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:border-[#7A8B70] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Dòng chữ phụ (Subtitle)</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: - Nhỏ bé nhưng mang cả bầu trời đáng yêu -"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:border-[#7A8B70] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">Giá bán (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={1000}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:border-[#7A8B70] focus:outline-none font-bold text-[#53634E]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Tồn kho sẵn có *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:border-[#7A8B70] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Danh mục</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:outline-none cursor-pointer"
                  >
                    <option value="linhvat">Tiểu Ếch & Linh vật</option>
                    <option value="mam">Mầm cây</option>
                    <option value="hoa">Hoa cỏ</option>
                    <option value="qua">Quả ngọt & Nấm</option>
                    <option value="phukien">Phụ kiện & Túi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Tem nổi bật (Tagline nhỏ)</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Được yêu thích nhất, Bán chạy, May mắn..."
                    value={highlightText}
                    onChange={(e) => setHighlightText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Màu len chủ đạo & Mã màu</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Tên màu: Xanh Lá Mạ"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:outline-none"
                    />
                    <input
                      type="color"
                      value={colorHex}
                      onChange={(e) => setColorHex(e.target.value)}
                      className="w-9 h-9 p-0.5 rounded-lg border border-[#987456]/20 bg-white cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F5EEDF]/70 border border-[#987456]/15 space-y-2">
                <span className="font-bold text-[#53634E] block">Kích thước thật đo bằng thước kẻ:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Chiều cao: 4 ~ 5 cm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#987456]/20"
                  />
                  <input
                    type="text"
                    placeholder="Chiều ngang: 3 ~ 4 cm"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#987456]/20"
                  />
                  <input
                    type="text"
                    placeholder="Ghi chú: (Chưa tính móc kim loại)"
                    value={sizeNote}
                    onChange={(e) => setSizeNote(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#987456]/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MAIN IMAGE & 6 VIEW ANGLES */}
          {activeTab === 'images_angles' && (
            <div className="space-y-4">
              {/* Main Product Image */}
              <div className="p-4 rounded-2xl bg-[#F5EEDF]/60 border border-[#987456]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#4D4A3F]">Ảnh đại diện chính của sản phẩm:</span>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A8B70] text-white font-medium cursor-pointer shadow-2xs hover:bg-[#687860]">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Tải ảnh lên từ máy</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'main')}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt="Ảnh chính"
                      className="w-20 h-20 rounded-2xl object-cover border border-[#987456]/20 shadow-2xs"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-white border border-dashed border-[#987456]/30 flex items-center justify-center text-[#987456]">
                      <ImageIcon className="w-6 h-6 opacity-40" />
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <label className="text-[11px] text-[#987456]">Hoặc dán URL hình ảnh trực tiếp:</label>
                    <input
                      type="text"
                      placeholder="https://... ảnh sản phẩm"
                      value={mainImage}
                      onChange={(e) => setMainImage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Angles Showcase (Mặt trước, mặt sau, trên, dưới...) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#4D4A3F] block">
                      Các góc nhìn thành phẩm (Scrapbook Angles):
                    </span>
                    <span className="text-[11px] text-[#987456]">
                      Khách hàng sẽ bấm vào các góc này để xem ảnh lớn chi tiết
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={addAngle}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EFE7D5] hover:bg-[#E2D8C0] text-[#4D4A3F] border border-[#987456]/20 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm góc nhìn</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {angles.map((ang, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white border border-[#987456]/15 flex items-start gap-3 shadow-2xs"
                    >
                      <div className="relative group shrink-0">
                        {ang.image ? (
                          <img
                            src={ang.image}
                            alt={ang.label}
                            className="w-14 h-14 rounded-xl object-cover border border-[#987456]/20"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-[#F5EEDF] border border-dashed border-[#987456]/30 flex items-center justify-center text-[#987456]">
                            <ImageIcon className="w-5 h-5 opacity-40" />
                          </div>
                        )}
                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white cursor-pointer">
                          <Upload className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, idx)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            placeholder="Tên góc (Mặt trước, Bên trái...)"
                            value={ang.label}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAngles((prev) => {
                                const n = [...prev];
                                n[idx] = { ...n[idx], label: val };
                                return n;
                              });
                            }}
                            className="font-bold text-xs px-2 py-1 rounded-lg bg-[#F5EEDF]/50 border border-[#987456]/15 w-32"
                          />
                          <button
                            type="button"
                            onClick={() => removeAngle(idx)}
                            className="text-[#987456] hover:text-rose-500 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Dán link ảnh góc này..."
                          value={ang.image}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAngles((prev) => {
                              const n = [...prev];
                              n[idx] = { ...n[idx], image: val };
                              return n;
                            });
                          }}
                          className="w-full text-[11px] px-2 py-1 rounded-lg bg-white border border-[#987456]/15"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MATERIALS LIST & VARIANT EDITIONS */}
          {activeTab === 'details_variants' && (
            <div className="space-y-5">
              {/* Materials Breakdown Palette */}
              <div className="p-4 rounded-2xl bg-[#F5EEDF]/60 border border-[#987456]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#4D4A3F] block">
                      Chi tiết bảng màu & nguyên liệu:
                    </span>
                    <span className="text-[11px] text-[#987456]">
                      Bảng chấm màu trực quan hiển thị trong modal (vd: Da ếch, Balo, Má...)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={addMaterialItem}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EFE7D5] hover:bg-[#E2D8C0] text-[#4D4A3F] border border-[#987456]/20 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm bộ phận màu</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {materialsList.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-[#987456]/15 flex items-center gap-2"
                    >
                      <input
                        type="color"
                        value={item.hex}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMaterialsList((prev) => {
                            const n = [...prev];
                            n[idx] = { ...n[idx], hex: val };
                            return n;
                          });
                        }}
                        className="w-7 h-7 p-0.5 rounded-lg border border-black/15 cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        placeholder="Bộ phận (vd: Balo)"
                        value={item.part}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMaterialsList((prev) => {
                            const n = [...prev];
                            n[idx] = { ...n[idx], part: val };
                            return n;
                          });
                        }}
                        className="flex-1 px-2 py-1 rounded-lg bg-[#F5EEDF]/40 border border-[#987456]/15 text-xs font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="Tên màu (vd: Nâu dẻ)"
                        value={item.colorName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMaterialsList((prev) => {
                            const n = [...prev];
                            n[idx] = { ...n[idx], colorName: val };
                            return n;
                          });
                        }}
                        className="w-24 px-2 py-1 rounded-lg bg-[#F5EEDF]/40 border border-[#987456]/15 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => removeMaterialItem(idx)}
                        className="text-[#987456] hover:text-rose-500 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Variants (Ếch áo mưa, ếch cầm hoa...) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#4D4A3F] block">
                      Các phiên bản sưu tầm (Variant Editions):
                    </span>
                    <span className="text-[11px] text-[#987456]">
                      Cho phép khách bấm chọn phiên bản khi đặt hàng (vd: Ếch đội mũ, Ếch cầm hoa...)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={addVariantEdition}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EFE7D5] hover:bg-[#E2D8C0] text-[#4D4A3F] border border-[#987456]/20 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm phiên bản</span>
                  </button>
                </div>

                {variants.length === 0 ? (
                  <p className="text-xs text-[#987456] italic p-3 bg-white rounded-xl border border-dashed border-[#987456]/20">
                    Sản phẩm này chưa có phiên bản phụ. Bạn có thể bấm nút trên để thêm các biến thể phụ kiện.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {variants.map((v, idx) => (
                      <div
                        key={v.id}
                        className="p-3 rounded-2xl bg-white border border-[#987456]/15 flex items-center gap-3 shadow-2xs"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#7A8B70]/15 text-[#53634E] flex items-center justify-center font-bold text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="Tên bản: Ếch Đội Mũ Vàng"
                            value={v.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              setVariants((prev) =>
                                prev.map((item) =>
                                  item.id === v.id ? { ...item, name: val } : item
                                )
                              );
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-[#F5EEDF]/40 border border-[#987456]/15 font-semibold text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Khẩu hiệu: Bé du lịch..."
                            value={v.tagline}
                            onChange={(e) => {
                              const val = e.target.value;
                              setVariants((prev) =>
                                prev.map((item) =>
                                  item.id === v.id ? { ...item, tagline: val } : item
                                )
                              );
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-[#F5EEDF]/40 border border-[#987456]/15 text-xs italic"
                          />
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-[#987456] whitespace-nowrap">+ Giá:</span>
                            <input
                              type="number"
                              step={1000}
                              placeholder="0"
                              value={v.priceDelta || 0}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setVariants((prev) =>
                                  prev.map((item) =>
                                    item.id === v.id ? { ...item, priceDelta: val } : item
                                  )
                                );
                              }}
                              className="w-20 px-2 py-1.5 rounded-lg bg-[#F5EEDF]/40 border border-[#987456]/15 text-xs font-bold"
                            />
                            <span className="text-[11px]">đ</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVariantEdition(v.id)}
                          className="text-[#987456] hover:text-rose-500 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: STORY, USAGE IDEAS & TAGS */}
          {activeTab === 'story' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-1">
                  Câu chuyện của bạn nhỏ (Storytelling)
                </label>
                <textarea
                  rows={4}
                  placeholder="Kể lại câu chuyện ấm áp về bạn nhỏ, nơi sinh ra, ước mơ và ý nghĩa gửi gắm..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:border-[#7A8B70] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Mô tả ngắn gọn</label>
                  <textarea
                    rows={2}
                    placeholder="Mô tả tóm tắt..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Lời trích dẫn (Story quote)</label>
                  <input
                    type="text"
                    placeholder="“Mỗi chú Ếch là một câu chuyện nhỏ và một niềm vui lớn!”"
                    value={storyQuote}
                    onChange={(e) => setStoryQuote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:outline-none"
                  />
                  <label className="block font-bold mt-2 mb-1">Ghi chú đóng gói quà</label>
                  <input
                    type="text"
                    value={packagingNote}
                    onChange={(e) => setPackagingNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Usage Ideas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-bold">Ý tưởng sử dụng thực tế:</label>
                  <button
                    type="button"
                    onClick={addUsageIdea}
                    className="text-xs text-[#53634E] font-semibold hover:underline cursor-pointer"
                  >
                    + Thêm ý tưởng
                  </button>
                </div>
                <div className="space-y-1.5">
                  {usageIdeas.map((idea, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[#7A8B70] font-bold">✓</span>
                      <input
                        type="text"
                        placeholder="Ví dụ: Làm móc khóa treo balo, túi xách..."
                        value={idea}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUsageIdeas((prev) => {
                            const n = [...prev];
                            n[idx] = val;
                            return n;
                          });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-[#987456]/15"
                      />
                      <button
                        type="button"
                        onClick={() => removeUsageIdea(idx)}
                        className="text-[#987456] hover:text-rose-500 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block font-bold mb-1">
                  Nhãn cảm xúc (Tags, cách nhau bằng dấu phẩy)
                </label>
                <input
                  type="text"
                  placeholder="Nhỏ xinh nhẹ nhàng, Thân thiện dễ thương, Năng lượng tích cực"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#987456]/20 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Footer Submit Bar */}
          <div className="pt-4 border-t border-[#987456]/15 flex items-center justify-between">
            <span className="text-[11px] text-[#987456] italic">
              * Dữ liệu lưu vào kho và hiển thị ngay tức thì trên cửa hàng
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#EFE7D5] hover:bg-[#E2D8C0] text-[#4D4A3F] font-semibold cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#7A8B70] hover:bg-[#687860] text-white font-bold shadow-md cursor-pointer"
              >
                {isEditMode ? 'Lưu cập nhật' : 'Hoàn tất & Thêm vào tiệm'}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
