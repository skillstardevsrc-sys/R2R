import React from 'react';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}) {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-lg gap-2',
    lg: 'text-base px-6 py-3 rounded-xl gap-2.5',
    xl: 'text-lg px-8 py-3.5 rounded-xl gap-3 font-semibold'
  };

  const variants = {
    primary: 'bg-accent text-black font-semibold hover:brightness-110 shadow-accent-sm hover:shadow-accent-lg',
    secondary: 'bg-white/10 text-white hover:bg-white/15 border border-white/10 backdrop-blur-sm',
    outline: 'border border-white/20 text-white hover:border-accent hover:text-accent bg-transparent',
    ghost: 'text-text-muted hover:text-white hover:bg-white/5 bg-transparent',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
    accentGhost: 'text-accent bg-accent-soft hover:bg-accent/20 border border-accent/30',
    glass: 'bg-white/5 backdrop-blur-md border border-white/15 text-white hover:bg-white/10'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variants[variant] || variants.primary} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
