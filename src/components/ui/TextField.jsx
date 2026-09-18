import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function TextField({
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
  type = 'text',
  icon: Icon,
  disabled = false,
  className = '',
  autoComplete = 'off',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center justify-between">
          <span>
            {label}
            {required && <span className="text-accent ml-1">*</span>}
          </span>
          {helperText && !error && (
            <span className="text-[11px] text-text-muted/60 normal-case">{helperText}</span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-text-muted">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={id}
          name={name || id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full bg-[#141414] text-white placeholder:text-white/40 text-sm rounded-xl px-4 py-3 border transition-all duration-200 outline-none
            ${Icon ? 'pl-10' : ''}
            ${error 
              ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30' 
              : 'border-white/10 hover:border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20'}
            disabled:opacity-40 disabled:cursor-not-allowed`}
          {...props}
        />
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
