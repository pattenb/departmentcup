import React, { useEffect } from 'react';
import { Team, SportType } from '../types/tournament';
import { Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChampionBannerProps {
  sport: SportType;
  champion: Team;
  runnerUp?: Team;
  thirdPlace?: Team;
}

export const ChampionBanner: React.FC<ChampionBannerProps> = ({
  sport,
  champion,
  runnerUp,
  thirdPlace,
}) => {
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#1E64C8', '#FFD200', '#004b93', '#f59e0b', '#3b82f6'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  useEffect(() => {
    fireConfetti();
  }, [champion.id]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#004b93] via-[#105ebb] to-[#1E64C8] text-white rounded-2xl p-6 sm:p-8 shadow-md">
      {/* Background glow & accents */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FFD200] border-2 border-white flex items-center justify-center text-slate-950 shadow-md">
            <Trophy className="w-9 h-9" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD200]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ghent University · Department Cup {sport === 'foosball' ? 'Foosball' : 'Darts'} Champion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5 tracking-tight">
              {champion.name}
            </h2>
            {champion.lab && (
              <p className="text-xs text-white/90 mt-0.5 font-medium">{champion.lab}</p>
            )}
          </div>
        </div>

        {/* Podium Summary */}
        <div className="flex items-center gap-4 text-xs">
          {runnerUp && (
            <div className="bg-white/15 backdrop-blur-xs border border-white/20 rounded-xl px-4 py-2.5">
              <span className="text-[10px] font-mono uppercase text-white/70 block">2nd Place · Silver</span>
              <span className="font-bold text-white text-sm">{runnerUp.name}</span>
            </div>
          )}
          {thirdPlace && (
            <div className="bg-white/15 backdrop-blur-xs border border-white/20 rounded-xl px-4 py-2.5">
              <span className="text-[10px] font-mono uppercase text-[#FFD200] block">3rd Place · Bronze</span>
              <span className="font-bold text-white text-sm">{thirdPlace.name}</span>
            </div>
          )}
          <button
            onClick={fireConfetti}
            className="px-4 py-2.5 rounded-xl bg-[#FFD200] hover:bg-[#ecc000] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Celebrate
          </button>
        </div>
      </div>
    </div>
  );
};
