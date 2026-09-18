import React from 'react';

export default function OptionGrid({
  children,
  columns = 3,
  className = ''
}) {
  const colStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${colStyles[columns] || colStyles[3]} gap-4 sm:gap-5 ${className}`}>
      {children}
    </div>
  );
}
