import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}) {
  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 rounded',
    sm: 'text-xs px-2.5 py-1 rounded-md',
    md: 'text-sm px-3 py-1.5 rounded-lg'
  };

  const variants = {
    default: 'bg-white/10 text-white/80 border border-white/10',
    accent: 'bg-accent/15 text-accent border border-accent/30 font-medium',
    success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    outline: 'bg-transparent text-white/70 border border-white/20'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium tracking-wide uppercase ${sizeStyles[size] || sizeStyles.sm} ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
}
