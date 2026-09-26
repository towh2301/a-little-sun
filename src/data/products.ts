import { Product } from '../types';

import imgSage from '../assets/images/product_mam_sage_1790410347830.jpg';
import imgVang from '../assets/images/product_mam_vang_1790410359991.jpg';
import imgXanhLa from '../assets/images/product_mam_xanhla_1790410398098.jpg';
import imgCamDat from '../assets/images/product_mam_camdat_1790410370599.jpg';

import imgCucHoaMi from '../assets/images/product_cuc_hoa_mi_1790413497474.jpg';
import imgCoBonLa from '../assets/images/product_co_bon_la_1790413514289.jpg';
import imgNamNho from '../assets/images/product_nam_nho_1790413533532.jpg';
import imgDauTay from '../assets/images/product_dau_tay_1790413546666.jpg';
import imgTuiDungTai from '../assets/images/product_tui_dung_tai_1790413561044.jpg';
import imgHoaOaiHuong from '../assets/images/product_hoa_oai_huong_1790413575846.jpg';

// Newly generated hero & variant images for Tiểu Ếch Xanh
import imgEchHero from '../assets/images/tieu_ech_xanh_hero_1790415262412.jpg';
import imgEchVariants from '../assets/images/tieu_ech_variants_1790415280155.jpg';

export const PRODUCTS: Product[] = [
  // 1. TIỂU ẾCH XANH (Sản phẩm tiêu biểu đặc biệt với đầy đủ thông tin chuẩn infographic scrapbook)
  {
    id: 'mcn-tieu-ech-xanh',
    name: 'Tiểu Ếch Xanh Đeo Balo',
    subtitle: '- Nhỏ bé nhưng mang cả bầu trời đáng yêu -',
    price: 68000,
    color: 'Xanh Lá Mạ',
    colorHex: '#88B868',
    category: 'linhvat',
    type: 'linhvat',
    description: 'Bé Tiểu Ếch Xanh nhỏ nhắn mang theo chiếc balo hạt dẻ, đồng hành cùng bạn đi khắp thế gian và tưới mát tâm hồn mỗi ngày.',
    story: `Tiểu Ếch Xanh sinh ra trong một góc nhỏ bên bờ hồ, nơi có những chiếc lá sen và những giọt sương long lanh mỗi sáng.

Dù chỉ là một chú ếch nhỏ bé, nhưng Ếch luôn mơ ước được đi khắp thế giới, nhìn thấy nhiều màu sắc, gặp những người bạn mới và mang niềm vui đến cho mọi người.

Vì thế, Ếch luôn mang theo chiếc ba lô nhỏ, dù đi đâu cũng không quên nụ cười và lòng tốt của mình! Hãy cùng Ếch đi khắp thế giới nhé! ♡`,
    image: imgEchHero,
    size: '4 ~ 5 cm',
    sizeDimension: {
      height: '4 – 5 cm',
      width: '3 – 4 cm',
      note: '(Kích thước thực tế chưa tính phần móc kim loại)',
    },
    material: 'Len sợi cotton mềm mịn tự nhiên không xù lông, gài kim loại mạ đồng vintage',
    materialsList: [
      { part: 'Da ếch', colorName: 'Xanh lá mạ', hex: '#84B066' },
      { part: 'Bụng mềm', colorName: 'Trắng kem', hex: '#F4EFEA' },
      { part: 'Má ửng', colorName: 'Hồng phấn', hex: '#F3B1B1' },
      { part: 'Ba lô nhỏ', colorName: 'Nâu hạt dẻ', hex: '#8B5A3C' },
      { part: 'Hoa nhỏ đính', colorName: 'Vàng nắng', hex: '#E8B85C' },
      { part: 'Mắt hạt tròn', colorName: 'Đen láy', hex: '#2A2927' },
    ],
    angles: [
      { label: 'Mặt trước', image: imgEchHero },
      { label: 'Mặt sau (Ba lô)', image: imgEchHero },
      { label: 'Bên trái', image: imgEchHero },
      { label: 'Bên phải', image: imgEchHero },
      { label: 'Mặt trên', image: imgEchHero },
      { label: 'Mặt dưới', image: imgEchHero },
    ],
    usageIdeas: [
      'Làm móc khóa, treo balo, túi xách đồng hành',
      'Trang trí bàn học, góc làm việc truyền cảm hứng vui vẻ',
      'Làm quà tặng ấm áp cho bạn bè, người thương',
      'Sưu tầm đủ bộ các biểu cảm & trang phục nhân vật',
    ],
    variants: [
      {
        id: 'ech-co-ban',
        name: 'Tiểu Ếch Cơ Bản (Đeo Balo)',
        tagline: 'Nhỏ xinh, dễ thương, mang theo cả niềm vui',
        image: imgEchHero,
        priceDelta: 0,
      },
      {
        id: 'ech-doi-mu',
        name: 'Ếch Đội Mũ Vàng',
        tagline: 'Bé du lịch khám phá khắp thế giới',
        image: imgEchVariants,
        priceDelta: 5000,
      },
      {
        id: 'ech-cam-hoa',
        name: 'Ếch Cầm Nụ Hoa',
        tagline: 'Gửi tặng người thương những điều dịu dàng nhất',
        image: imgEchVariants,
        priceDelta: 5000,
      },
      {
        id: 'ech-ao-mua',
        name: 'Ếch Mặc Áo Mưa Vàng',
        tagline: 'Bảo bối cho những ngày mưa rào rả rích',
        image: imgEchVariants,
        priceDelta: 7000,
      },
      {
        id: 'ech-ngu',
        name: 'Ếch Ngủ Say (Ôm Gối Mây)',
        tagline: 'Nhắc nhở bạn nghỉ ngơi sau ngày dài mệt mỏi zzz',
        image: imgEchVariants,
        priceDelta: 5000,
      },
    ],
    stock: 16,
    highlightText: 'Được yêu thích nhất',
    packagingNote: 'Đóng gói trong hộp quà kraft kèm thiệp viết tay kể chuyện Tiểu Ếch & hoa khô',
    storyQuote: 'Mỗi chú Ếch là một câu chuyện nhỏ và một niềm vui lớn!',
    tags: ['Nhỏ xinh nhẹ nhàng', 'Thân thiện dễ thương', 'Mang năng lượng tích cực'],
  },

  // 2. Mầm hoa hướng dương - Xanh Sage
  {
    id: 'mcn-sage',
    name: 'Một Chút Nắng — Xanh Sage',
    subtitle: '- Nhành mầm nhỏ thắp sáng góc ban công -',
    price: 49000,
    color: 'Xanh Sage',
    colorHex: '#7A8B70',
    category: 'mam',
    type: 'mam',
    description: 'Đây là một bông hoa len nhỏ được móc thủ công với tán lá xanh sage dịu mát, mang theo một chút nắng cho những ngày cần dịu dàng hơn.',
    story: `Mầm hoa xanh sage lớn lên từ những sợi len mềm mại. Không vội vàng đua sắc, mầm chỉ lặng lẽ ở bên chiếc áo, túi xách hay quai cài mũ của bạn, như một lời nhắc nhở luôn giữ lấy sự bình yên nơi đáy lòng.`,
    image: imgSage,
    size: '5 ~ 6 cm',
    sizeDimension: {
      height: '5 – 6 cm',
      width: '3.5 cm',
      note: '(Đã bao gồm cuống cài kim loại)',
    },
    material: 'Len mềm cotton cao cấp, gài kim cài kim loại hoặc móc khoá',
    materialsList: [
      { part: 'Lá mầm', colorName: 'Xanh Sage', hex: '#7A8B70' },
      { part: 'Cánh hoa', colorName: 'Vàng Nắng', hex: '#E8B85C' },
      { part: 'Nhuỵ tròn', colorName: 'Nâu đất', hex: '#634A3A' },
    ],
    usageIdeas: [
      'Ghim cài áo len, áo khoác cardigan vintage',
      'Gắn quai túi vải canvas, balo đi học',
      'Quà tặng tốt nghiệp, sinh nhật ấm cúng',
    ],
    stock: 12,
    highlightText: 'Bán chạy nhất',
    packagingNote: 'Đóng gói cùng card kraft Một Chút Nắng & hoa khô nhỏ nhắn',
    storyQuote: 'Một mầm nhỏ, một ngày xanh bình yên',
    tags: ['Mộc mạc', 'Bình yên', 'Chữa lành'],
  },

  // 3. Mầm cỏ 4 lá may mắn
  {
    id: 'mcn-co-bon-la',
    name: 'Bạn Cỏ Bốn Lá May Mắn',
    subtitle: '- Lời chúc vạn sự an lành gửi đến bạn -',
    price: 52000,
    color: 'Xanh Lục Bảo',
    colorHex: '#4E7A58',
    category: 'mam',
    type: 'mam',
    description: 'Chiếc cỏ 4 lá len mộc xinh xắn, là lời chúc bình an, may mắn và những điều dịu dàng nhất gửi đến người nhận.',
    story: `Người ta bảo tìm thấy cỏ 4 lá giữa cánh đồng rộng lớn là điều kỳ diệu. Tiệm gom từng sợi len xanh mộc để kết thành cỏ 4 lá bền bỉ này, để may mắn luôn hiện diện bên bạn mỗi bước chân.`,
    image: imgCoBonLa,
    size: 'Khoảng 5 cm',
    material: 'Sợi cotton mộc, ghim cài đồng vintage',
    usageIdeas: [
      'Bùa may mắn trong các kỳ thi và phỏng vấn',
      'Đính sổ tay, bìa nhật ký lưu niệm',
      'Móc chìa khóa xe và cặp sách',
    ],
    stock: 10,
    highlightText: 'May mắn',
    packagingNote: 'Gắn trên thẻ giấy hoa ép handmade có lời chúc bình an',
    storyQuote: 'May mắn nhỏ bé luôn nở quanh bạn mỗi ngày',
    tags: ['May mắn', 'Tích cực', 'Xanh mộc'],
  },

  // 4. Hoa cúc hoạ mi trắng tinh khôi
  {
    id: 'mcn-cuc-hoa-mi',
    name: 'Bé Cúc Hoạ Mi Trắng Mộc',
    subtitle: '- Dịu dàng như những sớm mai chớm lạnh -',
    price: 55000,
    color: 'Trắng Ngà',
    colorHex: '#F0ECE1',
    category: 'hoa',
    type: 'hoa',
    description: 'Cánh cúc hoạ mi trắng muốt đan xen nhuỵ vàng ươm, gợi nhớ về những cơn gió đầu đông dịu mát và bình yên.',
    image: imgCucHoaMi,
    size: 'Khoảng 6 cm',
    material: 'Sợi cotton mềm mịn tự nhiên không xù lông',
    usageIdeas: [
      'Ghim áo sơ mi, áo dài hoặc đầm vintage',
      'Cài nón cói đi dạo biển, picnic',
      'Kèm thư tay gửi người bạn thân',
    ],
    stock: 14,
    highlightText: 'Tinh khôi',
    packagingNote: 'Tặng kèm card thông điệp chữ viết tay mộc mạc',
    storyQuote: 'Dịu dàng như nụ cúc nở vào sớm mai',
    tags: ['Tinh tế', 'Thanh lịch', 'Nhẹ nhàng'],
  },

  // 5. Cành oải hương tím mộc
  {
    id: 'mcn-oai-huong',
    name: 'Nhành Oải Hương Dịu Lòng',
    subtitle: '- Bình tâm và thư thái giữa đời hối hả -',
    price: 52000,
    color: 'Tím Pastel',
    colorHex: '#9E8FB2',
    category: 'hoa',
    type: 'hoa',
    description: 'Nhành hoa tím lavender được móc tỉ mỉ từng đốt hoa nhỏ, mang lại cảm giác bình tâm, thư thái mỗi khi ngắm nhìn.',
    image: imgHoaOaiHuong,
    size: 'Khoảng 7 cm',
    material: 'Len cotton đan thủ công, cuống buộc dây gai mộc',
    stock: 7,
    highlightText: 'Thư thái',
    packagingNote: 'Đóng gói trong phong bì giấy can trong suốt cùng hoa khô',
    storyQuote: 'Hít một hơi thật sâu, ngày mai mọi thứ sẽ ổn thôi',
    tags: ['Thư thái', 'Mộng mơ', 'Bình yên'],
  },

  // 6. Bé nấm nhỏ chấm bi đỏ
  {
    id: 'mcn-nam-nho',
    name: 'Bé Nấm Nhỏ Mùa Mưa',
    subtitle: '- Kiên cường vươn lên sau mọi cơn dông -',
    price: 49000,
    color: 'Đỏ San Hô',
    colorHex: '#C85A53',
    category: 'qua',
    type: 'qua',
    description: 'Một bé nấm xinh xắn mũ đỏ chấm bi trắng nhô lên từ thảm rêu ẩm ướt, biểu tượng của sự kiên cường và sức sống bền bỉ.',
    image: imgNamNho,
    size: 'Khoảng 4.5 cm',
    material: 'Len cotton dày dặn giữ phom tốt',
    stock: 11,
    highlightText: 'Đáng yêu',
    packagingNote: 'Gắn trên thẻ giấy kraft vân gỗ phong cách vintage',
    storyQuote: 'Cứ lặng lẽ lớn lên, rồi bạn sẽ trở nên rực rỡ',
    tags: ['Đáng yêu', 'Ngộ nghĩnh', 'Sức sống'],
  },

  // 7. Bé dâu tây ngọt ngào
  {
    id: 'mcn-dau-tay',
    name: 'Bạn Quả Dâu Tây Mọng Nắng',
    subtitle: '- Một chút ngọt lịm cho ngày nhiều việc -',
    price: 52000,
    color: 'Đỏ Dâu',
    colorHex: '#D64545',
    category: 'qua',
    type: 'qua',
    description: 'Quả dâu chín mọng ngọt ngào với đài hoa xanh non, thêm chút ngọt lịm và sắc màu rạng rỡ cho chiếc túi hay áo khoác của bạn.',
    image: imgDauTay,
    size: 'Khoảng 5 cm',
    material: 'Len cotton phối cúc gỗ mộc',
    stock: 9,
    highlightText: 'Ngọt ngào',
    packagingNote: 'Đựng trong túi giấy kraft nhỏ thắt nơ dây thừng mộc',
    storyQuote: 'Một chút ngọt ngào cho ngày làm việc chăm chỉ',
    tags: ['Ngọt ngào', 'Tươi tắn', 'Nổi bật'],
  },

  // 8. Túi len đựng tai nghe / xu cúc cười
  {
    id: 'mcn-tui-mini',
    name: 'Túi Len Mini Đựng Tai Nghe / Son',
    subtitle: '- Gói ghém những món đồ nhỏ xinh của bạn -',
    price: 79000,
    color: 'Kem Mộc',
    colorHex: '#EAE1CE',
    category: 'phukien',
    type: 'phukien',
    description: 'Chiếc túi dây rút nhỏ nhắn đính hoa cúc mặt cười, vừa vặn đựng hộp AirPods, thỏi son dưỡng hoặc đồng xu may mắn của bạn.',
    image: imgTuiDungTai,
    size: 'Khoảng 8 × 9 cm',
    material: 'Sợi dùi cotton dệt chắc tay, dây rút hạt gỗ mộc',
    stock: 6,
    highlightText: 'Đa năng',
    packagingNote: 'Gói hộp quà carton kraft nắp gài tinh tế',
    storyQuote: 'Giữ những thứ quý giá và nhỏ bé của riêng bạn',
    tags: ['Tiện dụng', 'Bền đẹp', 'Vintage'],
  },

  // 9. Mầm hoa hướng dương - Vàng Nắng
  {
    id: 'mcn-vang',
    name: 'Một Chút Nắng — Vàng Nắng',
    subtitle: '- Thắp sáng góc nhỏ trong lòng mỗi ngày -',
    price: 49000,
    color: 'Vàng Nắng',
    colorHex: '#E8B85C',
    category: 'mam',
    type: 'mam',
    description: 'Mầm hoa mang sắc vàng của ánh nắng ban mai, rực rỡ nhưng dịu êm, giúp bạn thắp sáng một góc nhỏ trong lòng mỗi khi ngắm nhìn.',
    image: imgVang,
    size: 'Khoảng 5–6 cm',
    material: 'Len mềm cotton cao cấp, móc thủ công tỉ mỉ',
    stock: 15,
    highlightText: 'Ấm áp',
    packagingNote: 'Đóng gói cùng card kraft Một Chút Nắng: "Hôm nay chưa nở thì mai mình nở."',
    storyQuote: 'Giữ lại một chút nắng cho những ngày chậm lớn',
    tags: ['Nắng ấm', 'Rạng rỡ', 'Tươi vui'],
  },

  // 10. Mầm hoa cam đất
  {
    id: 'mcn-camdat',
    name: 'Một Chút Nắng — Cam Đất',
    subtitle: '- Tone màu của chiếc tách gốm ấm áp -',
    price: 49000,
    color: 'Cam Đất',
    colorHex: '#B87559',
    category: 'mam',
    type: 'mam',
    description: 'Tone cam đất terracotta ấm nồng như chiếc tách gốm ấm áp giữa ngày thu se lạnh, vừa vintage hoài niệm vừa ngọt ngào mộc mạc.',
    image: imgCamDat,
    size: 'Khoảng 5–6 cm',
    material: 'Len mềm cotton cao cấp, móc thủ công',
    stock: 8,
    highlightText: 'Mộc mạc',
    packagingNote: 'Đóng gói cùng card kraft Một Chút Nắng & thông điệp viết tay',
    storyQuote: 'Mỗi mũi móc là một chút thương gửi trao',
    tags: ['Vintage', 'Mộc mạc', 'Mùa thu'],
  },
];

export const COLOR_OPTIONS = [
  { name: 'Xanh Lá Mạ', hex: '#88B868', id: 'la_ma' },
  { name: 'Xanh Sage', hex: '#7A8B70', id: 'sage' },
  { name: 'Vàng Nắng', hex: '#E8B85C', id: 'vang' },
  { name: 'Xanh Lá Non', hex: '#53634E', id: 'xanhla' },
  { name: 'Cam Đất', hex: '#B87559', id: 'camdat' },
  { name: 'Trắng Ngà', hex: '#F0ECE1', id: 'trang' },
  { name: 'Tím Pastel', hex: '#9E8FB2', id: 'tim' },
  { name: 'Đỏ San Hô', hex: '#C85A53', id: 'do' },
];

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}
