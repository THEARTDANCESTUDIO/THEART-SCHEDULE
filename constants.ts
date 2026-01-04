
import { ScheduleRow, DAYS, Language } from './types';

const createCell = (text: string) => ({
  id: Math.random().toString(36).substr(2, 9),
  className: text,
});

export const INITIAL_SCHEDULE: ScheduleRow[] = [
  {
    timeSlot: '17:30 - 18:20',
    days: {
      MON: createCell('키즈댄스\n(5・6・7세)'),
      TUE: createCell('초등저 K-POP'),
      WED: createCell('키즈댄스\n(5・6・7세)'),
      THU: createCell('초등저 K-POP'),
      FRI: createCell('키즈댄스\n(5・6・7세)'),
      SAT: createCell(''),
      SUN: createCell(''),
    }
  },
  {
    timeSlot: '18:30 - 19:20',
    days: {
      MON: createCell('예비전문반\n(코레오그래피)'),
      TUE: createCell(''),
      WED: createCell('예비전문반\n(소울)'),
      THU: createCell(''),
      FRI: createCell('예비전문반\n(K-POP)'),
      SAT: createCell(''),
      SUN: createCell(''),
    }
  },
  {
    timeSlot: '19:30 - 20:20',
    days: {
      MON: createCell('전문반\n(코레오그래피)'),
      TUE: createCell('초등고 K-POP\n(A)\n보이그룹 K-POP\n(B)'),
      WED: createCell('전문반\n(소울)'),
      THU: createCell('초등고 K-POP\n(A)\n보이그룹 K-POP\n(B)'),
      FRI: createCell('전문반\n(K-POP)'),
      SAT: createCell(''),
      SUN: createCell(''),
    }
  },
  {
    timeSlot: '20:30 - 21:20',
    days: {
      MON: createCell('중・고등반\n(코레오그래피)'),
      TUE: createCell('성인취미 K-POP'),
      WED: createCell('중・고등반\n(소울)'),
      THU: createCell('성인취미 K-POP'),
      FRI: createCell('중・고등반\n(K-POP)'),
      SAT: createCell(''),
      SUN: createCell(''),
    }
  },
  {
    timeSlot: '21:30 - 22:20',
    days: {
      MON: createCell('전문반\n(트레이닝)'),
      TUE: createCell(''),
      WED: createCell('전문반\n(트레이닝)'),
      THU: createCell(''),
      FRI: createCell('전문반\n(트레이닝)'),
      SAT: createCell(''),
      SUN: createCell(''),
    }
  }
];

export const STATIC_CONTENT_TRANSLATIONS: Record<string, Record<Language, string>> = {
  '키즈댄스\n(5・6・7세)': {
    ko: '키즈댄스\n(5・6・7세)',
    en: 'Kids Dance\n(Age 5-7)',
    ja: 'キッズダンス\n(5・6・7歳)',
    zh: '儿童舞蹈\n(5・6・7岁)'
  },
  '초등저 K-POP': {
    ko: '초등저 K-POP',
    en: 'Elementary K-POP (Lower)',
    ja: '初等部低学年 K-POP',
    zh: '小学低年级 K-POP'
  },
  '예비전문반\n(코레오그래피)': {
    ko: '예비전문반\n(코레오그래피)',
    en: 'Pre-Professional\n(Choreography)',
    ja: '専門予備クラス\n(コレオグラフィー)',
    zh: '预备专业班\n(编舞)'
  },
  '예비전문반\n(소울)': {
    ko: '예비전문반\n(소울)',
    en: 'Pre-Professional\n(Soul)',
    ja: '専門予備クラス\n(ソウル)',
    zh: '预备专业班\n(Soul)'
  },
  '예비전문반\n(K-POP)': {
    ko: '예비전문반\n(K-POP)',
    en: 'Pre-Professional\n(K-POP)',
    ja: '専門予備クラス\n(K-POP)',
    zh: '预备专业班\n(K-POP)'
  },
  '전문반\n(코레오그래피)': {
    ko: '전문반\n(코레오그래피)',
    en: 'Professional\n(Choreography)',
    ja: '専門クラス\n(コレオグラフィー)',
    zh: '专业班\n(编舞)'
  },
  '초등고 K-POP\n(A)\n보이그룹 K-POP\n(B)': {
    ko: '초등고 K-POP\n(A)\n보이그룹 K-POP\n(B)',
    en: 'Elementary K-POP (Upper)\n(A)\nBoy Group K-POP\n(B)',
    ja: '初等部高学年 K-POP\n(A)\nボーイズグループ K-POP\n(B)',
    zh: '小学高年级 K-POP\n(A)\n男团 K-POP\n(B)'
  },
  '전문반\n(소울)': {
    ko: '전문반\n(소울)',
    en: 'Professional\n(Soul)',
    ja: '専門クラス\n(ソウル)',
    zh: '专业班\n(Soul)'
  },
  '전문반\n(K-POP)': {
    ko: '전문반\n(K-POP)',
    en: 'Professional\n(K-POP)',
    ja: '専門クラス\n(K-POP)',
    zh: '专业班\n(K-POP)'
  },
  '전문반\n(트레이닝)': {
    ko: '전문반\n(트레이닝)',
    en: 'Professional\n(Training)',
    ja: '専門クラス\n(トレーニング)',
    zh: '专业班\n(训练)'
  },
  '중・고등반\n(코레오그래피)': {
    ko: '중・고등반\n(코레오그래피)',
    en: 'Middle & High School\n(Choreography)',
    ja: '中・高校生クラス\n(コレオグラフィー)',
    zh: '中学生・高中生班\n(编舞)'
  },
  '성인취미 K-POP': {
    ko: '성인취미 K-POP',
    en: 'Adult Hobby K-POP',
    ja: '成人趣味 K-POP',
    zh: '成人兴趣 K-POP'
  },
  '중・고등반\n(소울)': {
    ko: '중・고등반\n(소울)',
    en: 'Middle & High School\n(Soul)',
    ja: '中・高校生クラス\n(ソウル)',
    zh: '中学生・高中生班\n(Soul)'
  },
  '중・고등반\n(K-POP)': {
    ko: '중・고등반\n(K-POP)',
    en: 'Middle & High School\n(K-POP)',
    ja: '中・高校生クラス\n(K-POP)',
    zh: '中学生・高中生班\n(K-POP)'
  }
};

export const ACCENT_COLORS = [
  '#ec4899', '#3b82f6', '#eab308', '#22c55e', '#a855f7', '#ffffff',
];
