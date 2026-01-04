
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
  
  // Split content by segments (double newlines or distinct blocks) to match image style
  const segments = cell.className.split('\n\n').filter(s => s.trim().length > 0);

  if (readOnly && !hasContent) return <div className="min-h-[160px] w-full"></div>;

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-[160px] w-full group animate-in fade-in duration-500">
      {readOnly ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          {segments.length > 0 ? (
            segments.map((segment, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="font-black text-sm md:text-[16px] uppercase tracking-tight text-white leading-[1.3] text-center whitespace-pre-wrap break-keep">
                  {segment}
                </div>
                <div className="mt-3 h-[3px] w-8 bg-pink-600 rounded-full"></div>
              </div>
            ))
          ) : (
             <div className="flex flex-col items-center">
                <div className="font-black text-sm md:text-[16px] uppercase tracking-tight text-white leading-[1.3] text-center whitespace-pre-wrap break-keep">
                  {cell.className}
                </div>
                {hasContent && <div className="mt-3 h-[3px] w-8 bg-pink-600 rounded-full"></div>}
              </div>
          )}
        </div>
      ) : (
        <>
          <EditableText
            value={cell.className}
            onChange={(val) => onChange({ ...cell, className: val })}
            className="font-black text-sm md:text-[16px] uppercase tracking-tight text-white leading-[1.3] text-center w-full justify-center break-keep"
            placeholder={t.className}
            multiline
            readOnly={readOnly}
          />
          {hasContent && (
            <div className="mt-3 h-[3px] w-8 bg-pink-600 rounded-full"></div>
          )}
        </>
      )}
    </div>
  );
};
