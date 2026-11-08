// Curriculum metadata: levels, strands ("worlds") and units (textbook-style chapters).
// Aligned to Singapore MOE: NEL numeracy (K1–K2) and the 2021 Primary Mathematics syllabus (P1–P3).
export const LEVELS = [
  { id: 'K', name: 'Kindergarten', age: 6, vi: 'Mẫu giáo (K1–K2)', color: '#f59e0b' },
  { id: 'P1', name: 'Primary 1', age: 7, vi: 'Lớp 1 (P1)', color: '#22c55e' },
  { id: 'P2', name: 'Primary 2', age: 8, vi: 'Lớp 2 (P2)', color: '#3b82f6' },
  { id: 'P3', name: 'Primary 3', age: 9, vi: 'Lớp 3 (P3)', color: '#a855f7' }
];
export const LEVEL_IDS = LEVELS.map((l) => l.id);

export const STRANDS = [
  { id: 'numbers', name: 'Number Town', icon: '🔢', color: '#2563eb', vi: 'Số & giá trị hàng' },
  { id: 'addsub', name: 'Plus & Minus Bay', icon: '➕', color: '#16a34a', vi: 'Cộng & trừ' },
  { id: 'muldiv', name: 'Times Tower', icon: '✖️', color: '#db2777', vi: 'Nhân & chia' },
  { id: 'fractions', name: 'Fraction Feast', icon: '🍕', color: '#ea580c', vi: 'Phân số' },
  { id: 'money', name: 'Money Market', icon: '💰', color: '#ca8a04', vi: 'Tiền Singapore' },
  { id: 'time', name: 'Clock Tower', icon: '⏰', color: '#0891b2', vi: 'Thời gian' },
  { id: 'measure', name: 'Measure Lab', icon: '📏', color: '#7c3aed', vi: 'Đo lường' },
  { id: 'geometry', name: 'Shape Island', icon: '🔷', color: '#0d9488', vi: 'Hình học & quy luật' },
  { id: 'data', name: 'Graph Garden', icon: '📊', color: '#65a30d', vi: 'Biểu đồ & thống kê' },
  { id: 'thinking', name: 'Thinking Cap', icon: '🧠', color: '#9333ea', vi: 'Tư duy (heuristics)' }
];
export const STRAND_MAP = Object.fromEntries(STRANDS.map((s) => [s.id, s]));

// Units = recommended learning order inside a level (like textbook chapters).
// Unit 0 = "Thinking Cap" challenge pool (mixed into missions, not part of the main path).
export const UNITS = {
  K: {
    0: 'Thinking Cap',
    1: 'Counting to 10',
    2: 'More, fewer, same',
    3: 'Numbers to 10',
    4: 'Shapes',
    5: 'Patterns',
    6: 'Adding with pictures',
    7: 'Taking away with pictures',
    8: 'Numbers to 20',
    9: 'Big, small, long, short',
    10: 'Positions',
    11: 'Sorting',
    12: 'Coins, days & time'
  },
  P1: {
    0: 'Thinking Cap',
    1: 'Numbers to 10',
    2: 'Number bonds',
    3: 'Addition within 10',
    4: 'Subtraction within 10',
    5: 'Shapes and patterns',
    6: 'Ordinal numbers',
    7: 'Numbers to 20',
    8: 'Addition and subtraction within 20',
    9: 'Length',
    10: 'Picture graphs',
    11: 'Numbers to 100',
    12: 'Addition and subtraction within 100',
    13: 'Multiplication',
    14: 'Division',
    15: 'Time',
    16: 'Money'
  },
  P2: {
    0: 'Thinking Cap',
    1: 'Numbers to 1000',
    2: 'Addition and subtraction within 1000',
    3: 'Multiplication and division (2, 5, 10)',
    4: 'Multiplication and division (3, 4)',
    5: 'Length (m, cm)',
    6: 'Mass (kg, g)',
    7: 'Volume (litres)',
    8: 'Picture graphs with scales',
    9: 'Money',
    10: 'Fractions',
    11: 'Time',
    12: 'Shapes and patterns'
  },
  P3: {
    0: 'Thinking Cap',
    1: 'Numbers to 10 000',
    2: 'Addition and subtraction within 10 000',
    3: 'Multiplication tables (6, 7, 8, 9)',
    4: 'Multiplication and division',
    5: 'Money',
    6: 'Length, mass and volume',
    7: 'Bar graphs',
    8: 'Fractions',
    9: 'Time',
    10: 'Angles',
    11: 'Perpendicular and parallel lines',
    12: 'Area and perimeter'
  }
};

/** Singapore school level for a birth year: a child enters P1 in the year they turn 7. */
export function schoolLevelForBirthYear(birthYear, now = new Date()) {
  const age = now.getFullYear() - Number(birthYear);
  if (!Number.isFinite(age)) return 'P1';
  if (age <= 6) return 'K';
  if (age === 7) return 'P1';
  if (age === 8) return 'P2';
  return 'P3';
}

/** Human label of a child's school year, e.g. "K2", "P1", "P4". */
export function schoolYearLabel(birthYear, now = new Date()) {
  const age = now.getFullYear() - Number(birthYear);
  if (!Number.isFinite(age)) return '';
  if (age <= 4) return 'N2';
  if (age === 5) return 'K1';
  if (age === 6) return 'K2';
  if (age <= 12) return `P${age - 6}`;
  return 'Sec';
}
