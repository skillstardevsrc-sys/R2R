import React from 'react';

export default function PreviewFooter({
  brandName = 'Acme Inc',
  accentColor = '#D4AF37',
  headingFont = 'Manrope',
  bodyFont = 'Inter'
}) {
  const brand = brandName || 'Acme Inc';

  return (
    <footer className="border-t border-white/10 bg-black/40 py-8 px-6 mt-8 text-xs text-text-muted">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-black font-bold text-[10px]"
            style={{ backgroundColor: accentColor }}
          >
            {brand.charAt(0)}
          </div>
          <span className="font-semibold text-white tracking-tight" style={{ fontFamily: headingFont }}>
            {brand}
          </span>
        </div>

        <div className="flex items-center gap-6 text-[11px]" style={{ fontFamily: bodyFont }}>
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">Security Overview</span>
        </div>

        <div className="text-[11px] text-text-muted/60">
          © {new Date().getFullYear()} {brand}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
