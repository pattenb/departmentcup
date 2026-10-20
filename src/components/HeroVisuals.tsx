import React from 'react';

/**
 * High-definition Foosball Players on rotating steel rods for the Foosball hero
 */
export const FoosballPlayersVisual: React.FC = () => {
  return (
    <div
      className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none flex items-center justify-end pr-2 sm:pr-6 lg:pr-14 opacity-30 sm:opacity-50 md:opacity-90 lg:opacity-100"
      aria-hidden="true"
    >
      <svg
        className="w-[360px] sm:w-[480px] md:w-[540px] lg:w-[620px] h-full object-contain drop-shadow-2xl"
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Chrome Rod Gradient */}
          <linearGradient id="chromeRod" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="25%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="75%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Yellow Player Gradient (Ghent Accent) */}
          <linearGradient id="yellowFoosPlayer" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="30%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Blue Player Gradient (UGent Blue) */}
          <linearGradient id="blueFoosPlayer" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="30%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          {/* White/Silver Player Gradient */}
          <linearGradient id="whiteFoosPlayer" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="35%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Head Radial Gradient */}
          <radialGradient id="playerHeadSkin" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </radialGradient>

          {/* Ball 3D Gradient */}
          <radialGradient id="kickerBall" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Backdrop Ambient Glow */}
        <circle cx="340" cy="250" r="180" fill="#1E64C8" opacity="0.35" filter="url(#softGlow)" />
        <circle cx="460" cy="220" r="140" fill="#FFD200" opacity="0.2" filter="url(#softGlow)" />

        {/* ---------------- STEEL ROD 1 (Back Rod) ---------------- */}
        <rect x="0" y="160" width="600" height="16" rx="2" fill="url(#chromeRod)" opacity="0.7" />
        {/* Rubber Stopper */}
        <rect x="180" y="156" width="14" height="24" rx="3" fill="#0f172a" opacity="0.8" />
        <rect x="480" y="156" width="14" height="24" rx="3" fill="#0f172a" opacity="0.8" />

        {/* PLAYER 1: Background Opponent (Blue Team) */}
        <g transform="translate(220, 80) scale(0.85)">
          <ellipse cx="25" cy="185" rx="30" ry="10" fill="rgba(0,0,0,0.3)" />
          {/* Head & Screw */}
          <circle cx="25" cy="20" r="18" fill="url(#playerHeadSkin)" />
          <circle cx="25" cy="20" r="4" fill="#334155" />
          {/* Neck / Mount */}
          <rect x="18" y="38" width="14" height="10" fill="#334155" />
          {/* Torso */}
          <path d="M 4 48 L 46 48 L 40 120 L 10 120 Z" fill="url(#blueFoosPlayer)" />
          {/* Team Stripe */}
          <rect x="8" y="70" width="34" height="8" fill="#ffffff" opacity="0.9" />
          {/* Foot Block */}
          <polygon points="12,120 38,120 44,165 6,165" fill="#1e3a8a" />
          <rect x="4" y="165" width="42" height="14" rx="3" fill="#0f172a" />
          {/* Stud grip lines */}
          <line x1="12" y1="172" x2="38" y2="172" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
        </g>

        {/* ---------------- STEEL ROD 2 (Foreground Main Rod) ---------------- */}
        <rect x="0" y="240" width="600" height="20" rx="3" fill="url(#chromeRod)" />
        {/* Rubber bumpers */}
        <rect x="100" y="234" width="16" height="32" rx="4" fill="#0f172a" />
        <rect x="440" y="234" width="16" height="32" rx="4" fill="#0f172a" />

        {/* PLAYER 2: Center Highlight Player (UGent Yellow Team) */}
        <g transform="translate(140, 130)">
          {/* Cast Shadow */}
          <ellipse cx="30" cy="235" rx="45" ry="14" fill="rgba(0,0,0,0.35)" />
          {/* Head */}
          <circle cx="30" cy="25" r="23" fill="url(#playerHeadSkin)" stroke="#78350f" strokeWidth="1.5" />
          {/* Top Bolt / Nut representing the foosball rod screw */}
          <circle cx="30" cy="25" r="5.5" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
          {/* Collar */}
          <rect x="22" y="47" width="16" height="12" fill="#1e293b" />
          {/* Torso with broad chest */}
          <path d="M 5 58 L 55 58 L 48 155 L 12 155 Z" fill="url(#yellowFoosPlayer)" />
          {/* Number 10 on Jersey */}
          <circle cx="30" cy="100" r="14" fill="#ffffff" />
          <text x="30" y="106" fontSize="15" fontWeight="900" fill="#0f172a" textAnchor="middle" fontFamily="sans-serif">
            10
          </text>
          {/* Kicker Foot Wedge (Beveled Foosball foot) */}
          <polygon points="14,155 46,155 54,215 6,215" fill="#b45309" stroke="#78350f" strokeWidth="1" />
          {/* Serrated striking face */}
          <rect x="4" y="215" width="52" height="16" rx="4" fill="#0f172a" />
          <line x1="10" y1="223" x2="50" y2="223" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 3" />
        </g>

        {/* PLAYER 3: Striker Player (UGent Blue Team, Right) */}
        <g transform="translate(320, 120)">
          <ellipse cx="30" cy="245" rx="42" ry="14" fill="rgba(0,0,0,0.35)" />
          <circle cx="30" cy="25" r="23" fill="url(#playerHeadSkin)" stroke="#1e3a8a" strokeWidth="1.5" />
          <circle cx="30" cy="25" r="5.5" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="22" y="47" width="16" height="12" fill="#1e293b" />
          <path d="M 5 58 L 55 58 L 48 155 L 12 155 Z" fill="url(#blueFoosPlayer)" />
          <circle cx="30" cy="100" r="14" fill="#ffffff" />
          <text x="30" y="106" fontSize="15" fontWeight="900" fill="#1e3a8a" textAnchor="middle" fontFamily="sans-serif">
            7
          </text>
          <polygon points="14,155 46,155 54,215 6,215" fill="#1e40af" />
          <rect x="4" y="215" width="52" height="16" rx="4" fill="#0f172a" />
          <line x1="10" y1="223" x2="50" y2="223" stroke="#60a5fa" strokeWidth="3" strokeDasharray="4 3" />
        </g>

        {/* PLAYER 4: Third Player (White/Silver Team, Far Right) */}
        <g transform="translate(480, 140)">
          <ellipse cx="30" cy="235" rx="38" ry="12" fill="rgba(0,0,0,0.3)" />
          <circle cx="30" cy="25" r="22" fill="url(#playerHeadSkin)" />
          <circle cx="30" cy="25" r="5" fill="#475569" />
          <rect x="22" y="47" width="16" height="12" fill="#1e293b" />
          <path d="M 5 58 L 55 58 L 48 155 L 12 155 Z" fill="url(#whiteFoosPlayer)" />
          <circle cx="30" cy="100" r="13" fill="#1e293b" />
          <text x="30" y="105" fontSize="14" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">
            9
          </text>
          <polygon points="14,155 46,155 54,215 6,215" fill="#64748b" />
          <rect x="4" y="215" width="52" height="16" rx="4" fill="#0f172a" />
        </g>

        {/* ---------------- THE TOURNAMENT SOCCER BALL ---------------- */}
        <g transform="translate(245, 300)">
          {/* Shadow */}
          <ellipse cx="35" cy="46" rx="30" ry="10" fill="rgba(0,0,0,0.5)" filter="url(#softGlow)" />
          {/* White Ball */}
          <circle cx="32" cy="26" r="26" fill="url(#kickerBall)" stroke="#cbd5e1" strokeWidth="1" />
          {/* Soccer Ball Classic Pentagon Pattern */}
          <polygon points="32,13 41,19 38,29 26,29 23,19" fill="#0f172a" />
          <polygon points="17,32 21,39 29,38 25,31 18,30" fill="#0f172a" />
          <polygon points="44,32 49,39 42,42 37,36 41,31" fill="#0f172a" />
          <polygon points="32,45 26,48 21,43 27,40 33,42" fill="#0f172a" />
          <line x1="32" y1="13" x2="32" y2="4" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="41" y1="19" x2="49" y2="15" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="38" y1="29" x2="44" y2="32" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="26" y1="29" x2="25" y2="31" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="23" y1="19" x2="16" y2="16" stroke="#0f172a" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};

/**
 * High-definition Tournament Dartboard and Arrows for the Darts hero
 */
export const DartsBoardArrowsVisual: React.FC = () => {
  return (
    <div
      className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none flex items-center justify-end pr-2 sm:pr-6 lg:pr-10 opacity-50 sm:opacity-75 md:opacity-95 lg:opacity-100"
      aria-hidden="true"
    >
      <svg
        className="w-[360px] sm:w-[480px] md:w-[560px] lg:w-[640px] h-full object-contain drop-shadow-2xl"
        viewBox="0 0 650 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Wire Gradient */}
          <linearGradient id="silverWire" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="40%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Tungsten Barrel Gradient */}
          <linearGradient id="tungstenBarrel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="30%" stopColor="#f8fafc" />
            <stop offset="70%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Gold Dart Shaft */}
          <linearGradient id="goldShaft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="40%" stopColor="#FFD200" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Royal Blue Flight */}
          <linearGradient id="blueFlight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#1E64C8" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>

          {/* Yellow/Amber Flight */}
          <linearGradient id="yellowFlight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="50%" stopColor="#FFD200" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Spotlight Beam Gradient */}
          <linearGradient id="spotlightBeam" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="40%" stopColor="#FFD200" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1E64C8" stopOpacity="0" />
          </linearGradient>

          {/* Surround Ring Gradient */}
          <linearGradient id="surroundRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="boardGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Intense Bullseye/T20 Glow */}
          <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ---------------- SPOTLIGHT ILLUMINATION BEAM ---------------- */}
        <polygon points="650,-50 250,-50 180,480 650,550" fill="url(#spotlightBeam)" />

        {/* Ambient Glow behind board */}
        <circle cx="390" cy="250" r="220" fill="#1E64C8" opacity="0.4" filter="url(#boardGlow)" />
        <circle cx="390" cy="250" r="120" fill="#FFD200" opacity="0.3" filter="url(#boardGlow)" />
        <circle cx="390" cy="144" r="50" fill="#FFD200" opacity="0.45" filter="url(#intenseGlow)" />

        {/* ---------------- THE TOURNAMENT DARTBOARD ---------------- */}
        <g transform="translate(390, 250)">
          {/* Heavy Rubber Surround Catch Ring */}
          <circle cx="0" cy="0" r="240" fill="url(#surroundRing)" stroke="#334155" strokeWidth="4" />
          <circle cx="0" cy="0" r="236" fill="none" stroke="#FFD200" strokeWidth="1.5" opacity="0.8" />
          
          {/* Surround Branding Text */}
          <path id="surroundTextArcTop" d="M -180,0 A 180,180 0 0,1 180,0" fill="none" />
          <text fill="#ffffff" opacity="0.6" fontSize="10" fontWeight="bold" letterSpacing="3" fontFamily="sans-serif">
            <textPath href="#surroundTextArcTop" startOffset="50%" textAnchor="middle">
              GHENT UNIVERSITY · DEPARTMENT CUP DARTS
            </textPath>
          </text>

          {/* Outer Black Cabinet Backing */}
          <circle cx="0" cy="0" r="220" fill="#09121d" stroke="#1e293b" strokeWidth="10" />
          
          {/* Wire Number Ring */}
          <circle cx="0" cy="0" r="208" stroke="url(#silverWire)" strokeWidth="2.5" fill="none" />

          {/* Segments (Black & Cream alternation) */}
          {[...Array(20)].map((_, i) => {
            const angleStart = (i * 18 - 9) * (Math.PI / 180);
            const angleEnd = (i * 18 + 9) * (Math.PI / 180);
            const x1 = Math.cos(angleStart) * 186;
            const y1 = Math.sin(angleStart) * 186;
            const x2 = Math.cos(angleEnd) * 186;
            const y2 = Math.sin(angleEnd) * 186;
            const isBlack = i % 2 === 0;

            return (
              <path
                key={i}
                d={`M 0 0 L ${x1} ${y1} A 186 186 0 0 1 ${x2} ${y2} Z`}
                fill={isBlack ? '#0b1320' : '#f8fafc'}
                opacity={isBlack ? '0.98' : '0.92'}
              />
            );
          })}

          {/* Double Wire Ring (Red & Green) */}
          <circle cx="0" cy="0" r="186" stroke="url(#silverWire)" strokeWidth="3" fill="none" />
          <circle cx="0" cy="0" r="168" stroke="url(#silverWire)" strokeWidth="3" fill="none" />
          {[...Array(20)].map((_, i) => {
            const angleStart = (i * 18 - 9) * (Math.PI / 180);
            const angleEnd = (i * 18 + 9) * (Math.PI / 180);
            const x1 = Math.cos(angleStart) * 186;
            const y1 = Math.sin(angleStart) * 186;
            const x2 = Math.cos(angleEnd) * 186;
            const y2 = Math.sin(angleEnd) * 186;
            const x3 = Math.cos(angleEnd) * 168;
            const y3 = Math.sin(angleEnd) * 168;
            const x4 = Math.cos(angleStart) * 168;
            const y4 = Math.sin(angleStart) * 168;
            const isRed = i % 2 === 0;

            return (
              <path
                key={`double-${i}`}
                d={`M ${x1} ${y1} A 186 186 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 168 168 0 0 0 ${x4} ${y4} Z`}
                fill={isRed ? '#dc2626' : '#16a34a'}
              />
            );
          })}

          {/* Treble Wire Ring (Red & Green) */}
          <circle cx="0" cy="0" r="112" stroke="url(#silverWire)" strokeWidth="3" fill="none" />
          <circle cx="0" cy="0" r="95" stroke="url(#silverWire)" strokeWidth="3" fill="none" />
          {[...Array(20)].map((_, i) => {
            const angleStart = (i * 18 - 9) * (Math.PI / 180);
            const angleEnd = (i * 18 + 9) * (Math.PI / 180);
            const x1 = Math.cos(angleStart) * 112;
            const y1 = Math.sin(angleStart) * 112;
            const x2 = Math.cos(angleEnd) * 112;
            const y2 = Math.sin(angleEnd) * 112;
            const x3 = Math.cos(angleEnd) * 95;
            const y3 = Math.sin(angleEnd) * 95;
            const x4 = Math.cos(angleStart) * 95;
            const y4 = Math.sin(angleStart) * 95;
            const isRed = i % 2 === 0;

            return (
              <path
                key={`treble-${i}`}
                d={`M ${x1} ${y1} A 112 112 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 95 95 0 0 0 ${x4} ${y4} Z`}
                fill={isRed ? '#dc2626' : '#16a34a'}
              />
            );
          })}

          {/* GOLD HIGHLIGHT RECTANGLE ON TREBLE 20 BED */}
          <path
            d="M -16,-106 A 112 112 0 0 1 16,-106 L 13.5,-90 A 95 95 0 0 0 -13.5,-90 Z"
            fill="#FFD200"
            opacity="0.8"
            filter="url(#intenseGlow)"
          />

          {/* Radial Spider Wires */}
          {[...Array(20)].map((_, i) => {
            const angle = (i * 18 - 9) * (Math.PI / 180);
            const x = Math.cos(angle) * 186;
            const y = Math.sin(angle) * 186;
            return <line key={`wire-${i}`} x1="0" y1="0" x2={x} y2={y} stroke="url(#silverWire)" strokeWidth="2.5" />;
          })}

          {/* Outer Bull (Green) */}
          <circle cx="0" cy="0" r="28" fill="#16a34a" stroke="url(#silverWire)" strokeWidth="2.5" />
          {/* Inner Bullseye (Red) */}
          <circle cx="0" cy="0" r="13" fill="#dc2626" stroke="url(#silverWire)" strokeWidth="2" />

          {/* Numbers on Ring */}
          {[
            { num: 20, deg: -90 },
            { num: 1, deg: -72 },
            { num: 18, deg: -54 },
            { num: 4, deg: -36 },
            { num: 13, deg: -18 },
            { num: 6, deg: 0 },
            { num: 10, deg: 18 },
            { num: 15, deg: 36 },
            { num: 2, deg: 54 },
            { num: 17, deg: 72 },
            { num: 3, deg: 90 },
            { num: 19, deg: 108 },
            { num: 7, deg: 126 },
            { num: 16, deg: 144 },
            { num: 8, deg: 162 },
            { num: 11, deg: 180 },
            { num: 14, deg: 198 },
            { num: 9, deg: 216 },
            { num: 12, deg: 234 },
            { num: 5, deg: 252 },
          ].map(({ num, deg }, idx) => {
            const rad = deg * (Math.PI / 180);
            const x = Math.cos(rad) * 201;
            const y = Math.sin(rad) * 201 + 4.5;
            const is20 = num === 20;
            return (
              <text
                key={idx}
                x={x}
                y={y}
                fill={is20 ? '#FFD200' : '#ffffff'}
                fontSize={is20 ? '16' : '13'}
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {num}
              </text>
            );
          })}

          {/* ---------------- TRIPLE DARTS EMBEDDED IN TREBLE 20 ("180 MAXIMUM") ---------------- */}
          {/* DART 1: Center Treble 20 */}
          <g transform="translate(0, -102) rotate(-18)">
            <ellipse cx="0" cy="0" rx="3" ry="3" fill="#000000" />
            <line x1="0" y1="0" x2="-85" y2="-85" stroke="#e2e8f0" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="-50" y="-58" width="8" height="26" rx="2" fill="url(#tungstenBarrel)" transform="rotate(45 -50 -58)" />
            <line x1="-50" y1="-50" x2="-90" y2="-90" stroke="url(#goldShaft)" strokeWidth="3" />
            <polygon points="-78,-78 -118,-68 -93,-93" fill="url(#yellowFlight)" />
            <polygon points="-78,-78 -68,-118 -93,-93" fill="url(#blueFlight)" />
            <polygon points="-90,-90 -122,-90 -106,-106" fill="#ffffff" opacity="0.9" />
          </g>

          {/* DART 2: Left Treble 20 */}
          <g transform="translate(-7, -100) rotate(-28)">
            <ellipse cx="0" cy="0" rx="3" ry="3" fill="#000000" />
            <line x1="0" y1="0" x2="-80" y2="-80" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="-46" y="-52" width="8" height="24" rx="2" fill="url(#tungstenBarrel)" transform="rotate(45 -46 -52)" />
            <line x1="-48" y1="-48" x2="-88" y2="-88" stroke="url(#goldShaft)" strokeWidth="3" />
            <polygon points="-74,-74 -114,-64 -89,-89" fill="url(#blueFlight)" />
            <polygon points="-74,-74 -64,-114 -89,-89" fill="url(#yellowFlight)" />
          </g>

          {/* DART 3: Right Treble 20 */}
          <g transform="translate(6, -104) rotate(-8)">
            <ellipse cx="0" cy="0" rx="3" ry="3" fill="#000000" />
            <line x1="0" y1="0" x2="-82" y2="-82" stroke="#e2e8f0" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="-48" y="-54" width="8" height="25" rx="2" fill="url(#tungstenBarrel)" transform="rotate(45 -48 -54)" />
            <line x1="-48" y1="-48" x2="-88" y2="-88" stroke="url(#goldShaft)" strokeWidth="3" />
            <polygon points="-76,-76 -116,-66 -91,-91" fill="url(#yellowFlight)" />
            <polygon points="-76,-76 -66,-116 -91,-91" fill="url(#blueFlight)" />
          </g>

          {/* ---------------- 180 MAXIMUM SCORE BADGE ---------------- */}
          <g transform="translate(-210, -110)">
            {/* Outer Badge Glow */}
            <rect x="0" y="0" width="105" height="42" rx="8" fill="#0f172a" stroke="#FFD200" strokeWidth="2" filter="url(#intenseGlow)" opacity="0.9" />
            <rect x="0" y="0" width="105" height="42" rx="8" fill="url(#surroundRing)" stroke="#FFD200" strokeWidth="2" />
            <text x="52" y="22" textAnchor="middle" fill="#FFD200" fontSize="20" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
              180
            </text>
            <text x="52" y="34" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2">
              MAXIMUM!
            </text>
          </g>
        </g>

        {/* ---------------- DYNAMIC INCOMING DART IN MOTION ---------------- */}
        <g transform="translate(100, 370) rotate(-35)">
          {/* Motion Trail Speed Arcs */}
          <line x1="-140" y1="0" x2="-35" y2="0" stroke="#FFD200" strokeWidth="2.5" strokeDasharray="8 5" opacity="0.8" />
          <line x1="-120" y1="-10" x2="-45" y2="-10" stroke="#ffffff" strokeWidth="2" strokeDasharray="5 5" opacity="0.6" />
          <line x1="-100" y1="10" x2="-40" y2="10" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          
          {/* Steel Tip Point */}
          <line x1="50" y1="0" x2="18" y2="0" stroke="#f8fafc" strokeWidth="3.5" strokeLinecap="round" />
          
          {/* Tungsten Barrel with knurled ring textures */}
          <rect x="-25" y="-6" width="45" height="12" rx="3.5" fill="url(#tungstenBarrel)" stroke="#475569" strokeWidth="0.5" />
          <line x1="-15" y1="-6" x2="-15" y2="6" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="-5" y1="-6" x2="-5" y2="6" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="5" y1="-6" x2="5" y2="6" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="15" y1="-6" x2="15" y2="6" stroke="#1e293b" strokeWidth="1.5" />
          
          {/* Golden Shaft */}
          <rect x="-65" y="-3" width="40" height="6" rx="2" fill="url(#goldShaft)" />
          
          {/* Standard Shape Flight Wings */}
          <polygon points="-62,0 -105,-28 -94,0" fill="url(#blueFlight)" />
          <polygon points="-62,0 -105,28 -94,0" fill="url(#yellowFlight)" />
          <polygon points="-68,0 -102,-12 -96,0" fill="#ffffff" opacity="0.9" />
          <polygon points="-68,0 -102,12 -96,0" fill="#ffffff" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
};
