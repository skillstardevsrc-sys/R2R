import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function TextArea({
  id,
  name,
  label,
  value = '',
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  required = false,
  maxLength = 2000,
  rows = 4,
  disabled = false,
  className = '',
  ...props
}) {
  const charCount = value ? value.length : 0;
  const isNearLimit = maxLength && charCount > maxLength * 0.9;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            {label}
            {required && <span className="text-accent ml-1">*</span>}
          </label>
        )}
        {maxLength && (
          <span className={`text-[11px] ${isNearLimit ? 'text-amber-400 font-medium' : 'text-text-muted/60'}`}>
            {charCount} / {maxLength}
          </span>
        )}
      </div>

      <textarea
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full bg-[#141414] text-white placeholder:text-white/40 text-sm rounded-xl px-4 py-3 border transition-all duration-200 outline-none resize-y min-h-[100px]
          ${error 
            ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30' 
            : 'border-white/10 hover:border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20'}
          disabled:opacity-40 disabled:cursor-not-allowed`}
        {...props}
      />

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && (
        <span className="text-xs text-text-muted/60">{helperText}</span>
      )}
    </div>
  );
}
