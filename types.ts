
export type Language = 'en' | 'ko' | 'ja' | 'zh';

export interface ScheduleCell {
  id: string;
  className: string;
  color?: string;
}

export interface ScheduleRow {
  timeSlot: string;
  days: {
    [key: string]: ScheduleCell;
  };
}

export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export const DAYS: DayOfWeek[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const DAY_LABELS: Record<Language, Record<DayOfWeek, string>> = {
  en: { MON: 'MON', TUE: 'TUE', WED: 'WED', THU: 'THU', FRI: 'FRI', SAT: 'SAT', SUN: 'SUN' },
  ko: { MON: '월', TUE: '화', WED: '수', THU: '목', FRI: '금', SAT: '토', SUN: '일' },
  ja: { MON: '月', TUE: '火', WED: '水', THU: '木', FRI: '金', SAT: '土', SUN: '日' },
  zh: { MON: '一', TUE: '二', WED: '三', THU: '四', FRI: '五', SAT: '六', SUN: '日' }
};
