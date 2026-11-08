// Life Skills & Values ("Kỹ năng sống & Công dân"): worlds, values, regions.
// Pure data — no DOM — so it loads in Node tests too.

export const LIFE_WORLDS = [
  { id: 'kind', icon: '❤️', name: 'Kind Heart', vi: 'Trái tim nhân hậu', color: '#e11d48', blurb: 'Honesty, kindness, sharing, saying sorry', blurbVi: 'Trung thực, tử tế, chia sẻ, biết xin lỗi, biết ơn' },
  { id: 'feelings', icon: '😊', name: 'My Feelings', vi: 'Cảm xúc của con', color: '#d97706', blurb: 'Name your feelings and calm down', blurbVi: 'Gọi tên cảm xúc, tự bình tĩnh, kiên cường khi gặp khó' },
  { id: 'school', icon: '🏫', name: 'Ready for P1', vi: 'Sẵn sàng vào lớp 1', color: '#2563eb', blurb: 'Canteen, recess, friends, teachers', blurbVi: 'Căn-tin, giờ ra chơi, kết bạn, nhờ thầy cô giúp' },
  { id: 'safe', icon: '🛡️', name: 'Stay Safe', vi: 'An toàn cho bản thân', color: '#7c3aed', blurb: 'Getting lost, tricky people, my body', blurbVi: 'Khi bị lạc, người lạ, bảo vệ cơ thể, an toàn ở nhà' },
  { id: 'sos', icon: '🚒', name: 'Emergency!', vi: 'Xử lý khẩn cấp', color: '#dc2626', blurb: 'Fire, getting hurt, calling for help', blurbVi: 'Cháy, bị thương, gọi cấp cứu, nước, thời tiết' },
  { id: 'road', icon: '🚦', name: 'On the Road', vi: 'An toàn giao thông', color: '#ea580c', blurb: 'Crossing roads, cars, buses, escalators', blurbVi: 'Qua đường, ngồi xe, xe buýt, thang cuốn, thang máy' },
  { id: 'healthy', icon: '🧼', name: 'Healthy Me', vi: 'Sống khoẻ', color: '#059669', blurb: 'Clean hands, good food, sleep, screens', blurbVi: 'Vệ sinh, ăn uống, ngủ, vận động, thuốc, màn hình' },
  { id: 'citizen', icon: '🌏', name: 'Good Citizen', vi: 'Công dân tốt', color: '#0891b2', blurb: 'Manners, our planet, living together', blurbVi: 'Nơi công cộng, môi trường, tôn trọng khác biệt, việc nhà' },
  { id: 'online', icon: '💻', name: 'Smart Online', vi: 'An toàn trên mạng', color: '#4f46e5', blurb: 'Screens, games and the internet', blurbVi: 'Thông tin cá nhân, trò chơi, mua hàng, người lạ trên mạng' }
];
export const LIFE_WORLD_MAP = Object.fromEntries(LIFE_WORLDS.map((w) => [w.id, w]));

// Singapore MOE Character & Citizenship Education core values (R3ICH).
export const VALUES = {
  respect: { en: 'Respect', vi: 'Tôn trọng' },
  responsibility: { en: 'Responsibility', vi: 'Trách nhiệm' },
  resilience: { en: 'Resilience', vi: 'Kiên cường' },
  integrity: { en: 'Integrity', vi: 'Chính trực' },
  care: { en: 'Care', vi: 'Quan tâm' },
  harmony: { en: 'Harmony', vi: 'Hoà hợp' }
};

// Emergency numbers. Content never writes a number directly — it uses {POLICE} / {FIRE} / {AMBULANCE}.
export const REGIONS = {
  SG: { name: 'Singapore', vi: 'Singapore', POLICE: '999', FIRE: '995', AMBULANCE: '995' },
  VN: { name: 'Vietnam', vi: 'Việt Nam', POLICE: '113', FIRE: '114', AMBULANCE: '115' }
};

export const VERDICTS = ['best', 'ok', 'no'];
export const PLACEHOLDERS = ['name', 'friend', 'POLICE', 'FIRE', 'AMBULANCE'];
