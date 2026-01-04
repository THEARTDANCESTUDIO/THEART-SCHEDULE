
import React, { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  onBlur?: () => void;
  readOnly?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  className = '',
  placeholder = '입력...',
  multiline = false,
  onBlur,
  readOnly = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(tempValue);
    if (onBlur) onBlur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing && !readOnly) {
    return multiline ? (
      <textarea
        ref={inputRef as any}
        className={`w-full bg-zinc-900 text-white p-1 rounded border border-zinc-700 outline-none resize-none whitespace-pre-wrap ${className}`}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        rows={3}
      />
    ) : (
      <input
        ref={inputRef as any}
        className={`w-full bg-zinc-900 text-white p-1 rounded border border-zinc-700 outline-none ${className}`}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        placeholder={placeholder}
      />
    );
  }

  return (
    <div
      onClick={() => !readOnly && setIsEditing(true)}
      className={`${!readOnly ? 'cursor-pointer hover:bg-zinc-800/50' : ''} transition-colors rounded px-1 min-h-[1.5em] flex ${multiline ? 'items-start pt-1' : 'items-center'} whitespace-pre-wrap break-words ${!value && !readOnly ? 'text-zinc-600 italic' : ''} ${className}`}
    >
      {(value || (!readOnly ? placeholder : ''))}
    </div>
  );
};
