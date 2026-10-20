import React from 'react';

export const UGentLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {/* Ghent University Main Logo */}
      <div className="flex items-center shrink-0">
        <img
          src="/images/Ugent1.png"
          alt="Ghent University Logo"
          className="h-8 sm:h-10 w-auto object-contain max-w-[140px]"
          onError={(e) => {
            // Fallback display if image cannot be rendered
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Divider */}
      <div className="h-7 w-px bg-slate-300 hidden sm:block" />

      {/* Faculty of Sciences Logo */}
      <div className="flex items-center shrink-0">
        <img
          src="/images/icon_UGent_WE_EN_RGB_2400_color.png"
          alt="Faculty of Sciences Logo"
          className="h-8 sm:h-10 w-auto object-contain max-w-[150px]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Divider */}
      <div className="h-7 w-px bg-slate-300 hidden sm:block" />

      {/* Department of Chemistry */}
      <div className="flex flex-col leading-tight">
        <span className="text-[9px] font-bold tracking-widest text-[#1E64C8] uppercase font-mono">
          Department of
        </span>
        <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight font-sans">
          Chemistry
        </span>
      </div>
    </div>
  );
};
