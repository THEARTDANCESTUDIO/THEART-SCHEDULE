
import { Language } from './types';

export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    schedule: 'Schedule',
    time: 'TIME',
    className: 'CLASS NAME',
    location: 'Location',
    contact: 'Contact',
    allRights: 'ALL RIGHTS RESERVED',
    deleteConfirm: 'Delete this time slot?',
    lock: 'LOCK',
    unlock: 'EDIT',
    reset: 'RESET'
  },
  ko: {
    schedule: '시간표',
    time: '시간',
    className: '클래스명',
    location: '위치',
    contact: '연락처',
    allRights: '모든 권리 보유',
    deleteConfirm: '이 타임 슬롯을 삭제하시겠습니까?',
    lock: '잠금',
    unlock: '수정',
    reset: '초기화'
  },
  ja: {
    schedule: 'タイムテーブル',
    time: '時間',
    className: 'クラス名',
    location: '場所',
    contact: '連絡先',
    allRights: '全著作権所有',
    deleteConfirm: 'このスロットを削除しますか？',
    lock: 'ロック',
    unlock: '編集',
    reset: 'リセット'
  },
  zh: {
    schedule: '课程表',
    time: '时间',
    className: '课程名称',
    location: '地点',
    contact: '联系方式',
    allRights: '保留所有权利',
    deleteConfirm: '删除此时间段？',
    lock: '锁定',
    unlock: '编辑',
    reset: '重置'
  }
};
