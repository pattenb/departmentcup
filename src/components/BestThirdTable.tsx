import React from 'react';
import { StandingsRow } from '../types/tournament';
import { Award, Check, X } from 'lucide-react';

interface BestThirdTableProps {
  thirdRows: StandingsRow[];
}

export const BestThirdTable: React.FC<BestThirdTableProps> = ({ thirdRows }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs border-t-4 border-t-amber-500">
      <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 bg-white">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase font-sans">
            Department Cup Foosball: Best 3rd-Place Comparison Table
          </h3>
        </div>
        <span className="text-xs text-amber-900 font-bold bg-amber-100 px-2.5 py-1 rounded border border-amber-300">
          Top 2 Advance to Quarter-Finals
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-slate-50 border-b border-slate-200">
            <tr>
              <th scope="col" className="py-2.5 pl-4 pr-2 text-center w-12">Rank</th>
              <th scope="col" className="py-2.5 px-3">Team / Ghent Lab</th>
              <th scope="col" className="py-2.5 px-2.5 text-center">Group</th>
              <th scope="col" className="py-2.5 px-2.5 text-center font-mono">P</th>
              <th scope="col" className="py-2.5 px-2.5 text-center font-mono">W</th>
              <th scope="col" className="py-2.5 px-2.5 text-center font-mono">L</th>
              <th scope="col" className="py-2.5 px-2.5 text-center font-mono">+/-</th>
              <th scope="col" className="py-2.5 px-3 text-right font-mono font-bold text-[#1E64C8]">PTS</th>
              <th scope="col" className="py-2.5 pr-4 pl-3 text-center">Knockout Seed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {thirdRows.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-6 text-center text-slate-500 italic">
                  Group matches in progress. Third-place contenders will appear here.
                </td>
              </tr>
            ) : (
              thirdRows.map((row, idx) => {
                const rankNum = idx + 1;
                const qualifies = rankNum <= 2;
                const seedTarget =
                  rankNum === 1
                    ? 'Seeded into QF4 (vs Poule B #2)'
                    : rankNum === 2
                    ? 'Seeded into QF1 (vs Poule A #1)'
                    : 'Eliminated from Cup';

                return (
                  <tr
                    key={row.teamId}
                    className={`transition-colors ${
                      qualifies
                        ? 'bg-blue-50/40 hover:bg-blue-50/70'
                        : 'bg-white hover:bg-slate-50 text-slate-500'
                    }`}
                  >
                    <td className="py-3 pl-4 pr-2 text-center font-mono">
                      <span className={`font-bold text-sm ${qualifies ? 'text-[#1E64C8]' : 'text-slate-400'}`}>
                        #{rankNum}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        {row.teamName}
                      </div>
                      {row.lab && (
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">{row.lab}</div>
                      )}
                    </td>

                    <td className="py-3 px-2.5 text-center font-mono">
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-bold border border-slate-200">
                        Poule {row.pouleId}
                      </span>
                    </td>

                    <td className="py-3 px-2.5 text-center font-mono tabular-nums text-slate-700">
                      {row.played}
                    </td>

                    <td className="py-3 px-2.5 text-center font-mono tabular-nums text-[#1E64C8] font-bold">
                      {row.won}
                    </td>

                    <td className="py-3 px-2.5 text-center font-mono tabular-nums text-slate-500">
                      {row.lost}
                    </td>

                    <td className="py-3 px-2.5 text-center font-mono tabular-nums whitespace-nowrap font-semibold">
                      <span
                        className={
                          row.goalDifference > 0
                            ? 'text-emerald-600'
                            : row.goalDifference < 0
                            ? 'text-rose-600'
                            : 'text-slate-500'
                        }
                      >
                        {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right font-mono font-bold text-[#1E64C8] tabular-nums text-sm">
                      {row.points}
                    </td>

                    <td className="py-3 pr-4 pl-3 text-center whitespace-nowrap">
                      {qualifies ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1E64C8] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                          <Check className="w-3 h-3 stroke-[3]" />
                          {seedTarget}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                          <X className="w-3 h-3 text-rose-500" />
                          Eliminated
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600 flex flex-wrap items-center justify-between gap-2">
        <span>Tiebreaker order: Goal Difference (in case of a draw, organisers decide what to do)</span>
        <span className="text-slate-500 font-mono">Auto-calculated after each match score entry</span>
      </div>
    </div>
  );
};
