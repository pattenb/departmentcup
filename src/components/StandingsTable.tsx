import React from 'react';
import { StandingsRow, SportType } from '../types/tournament';
import { Check } from 'lucide-react';

interface StandingsTableProps {
  title: string;
  rows: StandingsRow[];
  sport: SportType;
  pouleId: string;
}

export const StandingsTable: React.FC<StandingsTableProps> = ({
  title,
  rows,
  sport,
  pouleId,
}) => {
  const isFoosball = sport === 'foosball';

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs border-t-4 border-t-[#1E64C8]">
      {/* Header bar */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E64C8]" />
          <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase font-sans">
            {title}
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {rows.length} Teams · Single Round-Robin
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-slate-50/90 border-b border-slate-200">
            <tr>
              <th scope="col" className="py-2.5 pl-4 pr-2 w-12 text-center">Rank</th>
              <th scope="col" className="py-2.5 px-3">Team / Lab</th>
              <th scope="col" className="py-2.5 px-2.5 text-center font-mono">P</th>
              <th scope="col" className="py-2.5 px-2.5 text-center font-mono">W</th>
              <th scope="col" className="py-2.5 px-2.5 text-center font-mono">L</th>
              <th scope="col" className="py-2.5 px-2.5 text-center font-mono">+/-</th>
              <th scope="col" className="py-2.5 pr-4 pl-3 text-right font-mono font-bold text-[#1E64C8]">PTS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => {
              const isDirectQualified =
                (isFoosball && row.rank <= 2) || (!isFoosball && row.rank <= 4);
              const isThirdCandidate = isFoosball && row.rank === 3;

              let rankStyle = 'text-slate-500';
              let rowBg = 'hover:bg-slate-50';

              if (isDirectQualified) {
                rankStyle = 'text-[#1E64C8] font-bold';
                rowBg = 'bg-blue-50/40 hover:bg-blue-50/80';
              } else if (isThirdCandidate) {
                rankStyle = 'text-amber-600 font-bold';
                rowBg = 'bg-amber-50/30 hover:bg-amber-50/70';
              }

              return (
                <tr key={row.teamId} className={`transition-colors ${rowBg}`}>
                  {/* Rank & indicator */}
                  <td className="py-3 pl-4 pr-2 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1 font-mono">
                      <span className={`w-5 text-center ${rankStyle}`}>{row.rank}</span>
                      {isDirectQualified && (
                        <span title="Qualified for Quarter-Finals" className="text-[#1E64C8]">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                      )}
                      {isThirdCandidate && (
                        <span title="Best 3rd comparison slot" className="text-amber-600 text-[10px] font-bold">
                          3rd
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Team Name, Players, and Lab */}
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <span>{row.teamName}</span>
                    </div>
                    {(row.player1 || row.player2) && (
                      <div className="text-[11px] text-slate-600 font-medium truncate max-w-xs">
                        {[row.player1, row.player2].filter(Boolean).join(' & ')}
                      </div>
                    )}
                    {row.lab && (
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">{row.lab}</div>
                    )}
                  </td>

                  {/* Played */}
                  <td className="py-3 px-2.5 text-center font-mono text-slate-700 tabular-nums">
                    {row.played}
                  </td>

                  {/* Won */}
                  <td className="py-3 px-2.5 text-center font-mono text-[#1E64C8] font-bold tabular-nums">
                    {row.won}
                  </td>

                  {/* Lost */}
                  <td className="py-3 px-2.5 text-center font-mono text-slate-500 tabular-nums">
                    {row.lost}
                  </td>

                  {/* Difference */}
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

                  {/* Points */}
                  <td className="py-3 pr-4 pl-3 text-right font-mono font-bold text-[#1E64C8] text-sm tabular-nums">
                    {row.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer with qualification rule note */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#1E64C8] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1E64C8]" />
            {isFoosball ? 'Top 2 direct to QF' : 'Top 4 direct to QF'}
          </span>
          {isFoosball && (
            <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Rank 3 to Best 3rd Table
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 font-mono text-slate-500">
          <span>Tiebreaker: Goal Difference (in case of draw, organisers decide)</span>
          <span>·</span>
          <span>Win = 3pts</span>
        </div>
      </div>
    </div>
  );
};
