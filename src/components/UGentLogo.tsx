import React, { useState } from 'react';
import ugentLogoImg from '../assets/images/Ugent1.png';
import facultyLogoImg from '../assets/images/icon_UGent_WE_EN_RGB_2400_color.png';

export const UGentLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [ugentErr, setUgentErr] = useState(false);
  const [facultyErr, setFacultyErr] = useState(false);

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {/* Ghent University Main Logo */}
      <div className="flex items-center shrink-0">
        {!ugentErr ? (
          <img
            src={ugentLogoImg}
            alt="Ghent University Logo"
            className="h-8 sm:h-10 w-auto object-contain max-w-[140px]"
            onError={() => setUgentErr(true)}
          />
        ) : (
          <div className="flex items-center gap-1.5 bg-[#00306c] text-white px-2.5 py-1 rounded font-serif font-bold text-xs shadow-xs">
            <span className="text-[#FFD200]">UGent</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-7 w-px bg-slate-300 hidden sm:block" />

      {/* Faculty of Sciences Logo */}
      <div className="flex items-center shrink-0">
        {!facultyErr ? (
          <img
            src={facultyLogoImg}
            alt="Faculty of Sciences Logo"
            className="h-8 sm:h-10 w-auto object-contain max-w-[150px]"
            onError={() => setFacultyErr(true)}
          />
        ) : (
          <div className="flex flex-col text-[10px] leading-tight text-[#00306c] font-semibold">
            <span>Faculty of</span>
            <span className="font-bold">Sciences</span>
          </div>
        )}
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
