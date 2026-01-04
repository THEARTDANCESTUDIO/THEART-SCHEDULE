
import React from 'react';
import { ScheduleCell, Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n';
import { EditableText } from './EditableText';

interface TimetableCellProps {
  cell: ScheduleCell;
  lang: Language;
  onChange: (updatedCell: ScheduleCell) => void;
  readOnly?: boolean;
}

export const TimetableCell: React.FC<TimetableCellProps> = ({ cell, lang, onChange, readOnly }) => {
  const t = UI_TRANSLATIONS[lang];
  const hasContent = cell.className.trim().length > 0;
  
  if (readOnly && !hasContent) return <div className="min-h-[140px] w-full"></div>;

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[140px] w-full group animate-in fade-in duration-500">
      <EditableText
        value={cell.className}
        onChange={(val) => onChange({ ...cell, className: val })}
        className="font-black text-sm md:text-[15px] uppercase tracking-tight text-white leading-[1.2] text-center w-full justify-center"
        placeholder={t.className}
        multiline
        readOnly={readOnly}
      />
      {hasContent && (
        <div className="mt-3 h-[3px] w-8 bg-pink-600 rounded-full"></div>
      )}
    </div>
  );
};
