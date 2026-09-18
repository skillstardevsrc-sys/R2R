import React, { useState, useEffect } from 'react';
import { validateHex } from '../../utils/validation';

export default function ColorPicker({
  label,
  value = '#000000',
  onChange,
  helperText,
  className = ''
}) {
  const [hexInput, setHexInput] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setHexInput(value);
    setIsValid(validateHex(value));
  }, [value]);

  const handleHexChange = (e) => {
    let input = e.target.value.trim();
    if (input && !input.startsWith('#')) {
      input = '#' + input;
    }
    setHexInput(input);
    if (validateHex(input)) {
      setIsValid(true);
      onChange(input);
    } else {
      setIsValid(false);
    }
  };

  const handleNativePickerChange = (e) => {
    const val = e.target.value;
    setHexInput(val);
    setIsValid(true);
    onChange(val);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          {label}
        </label>
      )}

      <div className="flex items-center gap-2.5 p-2 bg-surface/80 rounded-xl border border-white/10 hover:border-white/20 transition-all">
        {/* Color preview + native hidden input trigger */}
        <label className="relative w-10 h-10 rounded-lg shrink-0 cursor-pointer overflow-hidden border border-white/20 shadow-inner flex items-center justify-center group">
          <input
            type="color"
            value={isValid ? hexInput : '#000000'}
            onChange={handleNativePickerChange}
            className="absolute -top-4 -left-4 w-20 h-20 opacity-0 cursor-pointer"
          />
          <div
            className="w-full h-full rounded-lg transition-transform group-hover:scale-105"
            style={{ backgroundColor: isValid ? hexInput : '#333333' }}
          />
        </label>

        {/* HEX Input */}
        <div className="flex-1">
          <input
            type="text"
            value={hexInput}
            onChange={handleHexChange}
            maxLength={7}
            placeholder="#000000"
            className={`w-full bg-[#141414] text-white placeholder:text-white/40 font-mono uppercase text-sm rounded-lg px-3 py-2 border outline-none transition-colors
              ${isValid ? 'border-white/10 focus:border-accent' : 'border-rose-500 text-rose-300'}`}
          />
        </div>
      </div>

      {helperText && !isValid && (
        <span className="text-[11px] text-rose-400">Please enter a valid HEX code (e.g. #D4AF37)</span>
      )}
      {helperText && isValid && (
        <span className="text-[11px] text-text-muted/60">{helperText}</span>
      )}
    </div>
  );
}
