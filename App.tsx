import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ScheduleRow, DAYS, DAY_LABELS, Language } from './types';
import { INITIAL_SCHEDULE, STATIC_CONTENT_TRANSLATIONS } from './constants';
import { TimetableCell } from './components/TimetableCell';
import { EditableText } from './components/EditableText';
import { UI_TRANSLATIONS } from './i18n';

const App: React.FC = () => {
  const [studioName, setStudioName] = useState('THEART DANCE STUDIO');
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('theart_lang');
      return (saved as Language) || 'ko';
    } catch {
      return 'ko';
    }
  });
  
  const [schedule, setSchedule] = useState<ScheduleRow[]>(() => {
    try {
      const saved = localStorage.getItem('theart_dance_schedule');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SCHEDULE;
      }
    } catch (e) {
      console.error("Failed to load schedule from localStorage", e);
    }
    return INITIAL_SCHEDULE;
  });

  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  const handleSecretToggle = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 500) {
      clickCountRef.current += 1;
    } else {
      clickCountRef.current = 1;
    }
    lastClickTimeRef.current = now;

    if (clickCountRef.current >= 5) {
      setIsReadOnly(prev => !prev);
      clickCountRef.current = 0;
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('theart_dance_schedule', JSON.stringify(schedule));
    } catch (e) {
      console.warn("Storage quota exceeded or error", e);
    }
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('theart_lang', lang);
  }, [lang]);

  const displaySchedule = useMemo(() => {
    return schedule.map(row => ({
      ...row,
      days: Object.fromEntries(
        Object.entries(row.days).map(([day, cell]) => {
          let translatedText = cell.className;
          for (const mapping of Object.values(STATIC_CONTENT_TRANSLATIONS)) {
            const versions = Object.values(mapping);
            if (versions.includes(cell.className)) {
              translatedText = mapping[lang];
              break;
            }
          }
          return [day, { ...cell, className: translatedText }];
        })
      )
    }));
  }, [schedule, lang]);

  const t = UI_TRANSLATIONS[lang];

  const updateCell = (rowIndex: number, day: string, updatedCell: any) => {
    if (isReadOnly) return;
    const newSchedule = [...schedule];
    newSchedule[rowIndex].days[day] = updatedCell;
    setSchedule(newSchedule);
  };

  const updateTimeSlot = (rowIndex: number, newTime: string) => {
    if (isReadOnly) return;
    const newSchedule = [...schedule];
    newSchedule[rowIndex].timeSlot = newTime;
    setSchedule(newSchedule);
  };

  const removeRow = (index: number) => {
    if (isReadOnly) return;
    if (confirm(t.deleteConfirm)) {
      const newSchedule = [...schedule];
      newSchedule.splice(index, 1);
      setSchedule(newSchedule);
    }
  };

  const addRow = () => {
    if (isReadOnly) return;
    const newRow: ScheduleRow = {
      timeSlot: '00:00 - 00:00',
      days: Object.fromEntries(DAYS.map(day => [day, { id: Math.random().toString(36).substr(2, 9), className: '' }])) as any
    };
    setSchedule([...schedule, newRow]);
  };

  const resetToDefault = () => {
    if (confirm(t.resetConfirm || '초기화 하시겠습니까?')) {
      setSchedule(INITIAL_SCHEDULE);
      localStorage.removeItem('theart_dance_schedule');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 selection:bg-pink-500/30">
      <div className="max-w-[1600px] mx-auto mb-8 flex items-center justify-between no-print">
        <div className="flex gap-2 min-h-[36px]">
            {!isReadOnly && (
              <div className="flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <button
                    onClick={() => setIsReadOnly(true)}
                    className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded bg-pink-600 hover:bg-pink-500 text-white shadow-lg transition-all"
                >
                    FINISH EDITING
                </button>
                <button
                    onClick={addRow}
                    className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded border border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 transition-all"
                >
                    + ADD SLOT
                </button>
                <button
                    onClick={resetToDefault}
                    className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded border border-red-900/30 bg-red-950/20 text-red-500 hover:bg-red-950/40 transition-all"
                >
                    {t.reset}
                </button>
              </div>
            )}
        </div>
        
        <div className="flex gap-1 bg-zinc-900/50 p-1 rounded-lg backdrop-blur-md border border-zinc-800">
            {(['en', 'ko', 'ja', 'zh'] as Language[]).map((l) => (
            <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${
                lang === l ? 'bg-zinc-100 text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
                }`}
            >
                {l}
            </button>
            ))}
        </div>
      </div>

      <header className="max-w-[1600px] mx-auto mb-16 flex flex-col items-center justify-center text-center">
        <div className="mb-6 flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-700">
          <span className="text-zinc-400 font-black tracking-[1.2em] text-xl uppercase pl-[1.2em] mb-4">2 0 2 6</span>
          <div className="h-[1px] w-48 bg-zinc-800"></div>
        </div>
        
        <EditableText
          value={studioName}
          onChange={setStudioName}
          className="text-5xl md:text-9xl font-black tracking-tighter uppercase italic text-white leading-none text-center mb-6"
          readOnly={isReadOnly}
        />
        
        <div className="flex items-center gap-6">
          <div className="h-[2px] w-12 bg-pink-600 rounded-full"></div>
          <span className="text-zinc-500 font-bold tracking-[0.8em] text-[10px] uppercase pl-[0.8em]">
            {t.schedule}
          </span>
          <div className="h-[2px] w-12 bg-pink-600 rounded-full"></div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto overflow-x-auto border border-zinc-800 rounded-2xl bg-zinc-950/50 backdrop-blur-xl shadow-2xl overflow-hidden mb-12">
        <div className="min-w-[1400px]">
          <div className="grid grid-cols-[140px_repeat(7,1fr)] border-b border-zinc-800 bg-zinc-900/40">
            <div className="p-8 border-r border-zinc-800 flex items-center justify-center">
              <span className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">{t.time}</span>
            </div>
            {DAYS.map(day => (
              <div key={day} className="p-8 border-r last:border-r-0 border-zinc-800 flex flex-col items-center justify-center">
                <span className="text-[11px] font-black text-pink-500 mb-1 tracking-widest">{day}</span>
                <span className="text-3xl font-black tracking-tight">{DAY_LABELS[lang][day]}</span>
              </div>
            ))}
          </div>

          {displaySchedule.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-[140px_repeat(7,1fr)] border-b last:border-b-0 border-zinc-800 group/row min-h-[160px]">
              <div className="p-8 bg-zinc-900/30 border-r border-zinc-800 flex flex-col items-center justify-center text-center relative">
                <EditableText
                  value={row.timeSlot}
                  onChange={(val) => updateTimeSlot(rowIndex, val)}
                  className="text-[12px] font-bold tracking-tighter text-zinc-400 leading-tight text-center justify-center"
                  readOnly={isReadOnly}
                />
                {!isReadOnly && (
                    <button 
                      onClick={() => removeRow(rowIndex)}
                      className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 p-1.5 bg-red-600 rounded-full text-white text-[8px] hover:scale-110 transition-all no-print z-10"
                    >
                      ✕
                    </button>
                )}
              </div>

              {DAYS.map(day => (
                <div key={`${rowIndex}-${day}`} className="border-r last:border-r-0 border-zinc-800 flex items-stretch justify-center transition-colors hover:bg-white/[0.02]">
                  <TimetableCell
                    cell={row.days[day]}
                    lang={lang}
                    onChange={(updatedCell) => updateCell(rowIndex, day, updatedCell)}
                    readOnly={isReadOnly}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <footer className="max-w-[1600px] mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-zinc-900 text-zinc-600 uppercase text-[10px] tracking-[0.2em] font-bold pb-16">
        <div className="flex flex-col gap-2">
          <h4 className="text-zinc-400 text-xs mb-1 tracking-[0.3em]">{t.location}</h4>
          <p className="font-medium">3F, K-Building, 50 Giji-ro, Wanju-gun, Jeonbuk State Korea</p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-zinc-400 text-xs mb-1 tracking-[0.3em]">{t.contact}</h4>
          <p className="font-medium">+82 10 9584 9901<br/>info@theartdance.com</p>
        </div>
        <div className="text-right flex flex-col justify-end gap-1">
          <p className="text-zinc-500">© 2017 {studioName}</p>
          <div 
            onClick={handleSecretToggle}
            className="text-pink-600/60 font-black cursor-pointer select-none active:scale-95 transition-transform"
          >
            {t.allRights}
          </div>
        </div>
      </footer>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-in {
          animation: fadeIn 0.5s ease-out;
        }
        @media print {
          .no-print { display: none !important; }
          body { background-color: white !important; color: black !important; padding: 0 !important; }
          .bg-black { background-color: white !important; }
          .bg-zinc-950 { background-color: white !important; }
          .bg-zinc-900 { background-color: #f4f4f5 !important; }
          .border-zinc-800 { border-color: #e4e4e7 !important; }
          .text-white { color: black !important; }
          .text-zinc-400, .text-zinc-500, .text-zinc-600 { color: #52525b !important; }
          .text-pink-500 { color: #db2777 !important; }
          .min-h-screen { min-height: auto !important; }
          .overflow-x-auto { overflow-x: visible !important; }
          .min-w-[1400px] { min-width: auto !important; width: 100% !important; }
          header { margin-bottom: 3rem !important; }
        }
      `}</style>
    </div>
  );
};

export default App;