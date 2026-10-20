import React from 'react';
import { BookOpen, ShieldCheck, Award, Trophy } from 'lucide-react';

export const RulesView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Overview Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E64C8] font-mono">
          <BookOpen className="w-4 h-4" />
          <span>Ghent University · Department Cup 2026</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Tournament Regulations &amp; Format
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">
          Official competition handbook for Foosball (Kicker) and Darts, governing match point allocations, tie-breaker criteria, and knockout progression into the quarter-finals and grand finals.
        </p>
      </div>

      {/* Official Regulations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Foosball Rules */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs border-t-4 border-t-[#1E64C8]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E64C8]" />
            <h3 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wider">
              1. Department Cup Foosball Format
            </h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Match Rules &amp; Gameplay:</span>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong className="text-slate-900">Game Format:</strong> We always play <strong>1 game to 11 with 2 goals difference</strong>.</li>
                <li><strong className="text-slate-900">Middle Rod Scoring:</strong> Scoring from the middle does not count, unless both teams explicitly agree otherwise before the game starts.</li>
                <li><strong className="text-[#1E64C8]">Score Submission:</strong> After the game, please pass on the exact score to Pat or Emiel.</li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Format &amp; Groups:</span>
              18 teams divided into 3 Poules of 6 teams: <strong className="text-[#1E64C8]">Poule A, Poule B, and Poule C</strong>. Each team plays a single round-robin against all other 5 teams in their group (15 matches per group, 45 total).
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Scoring &amp; Points:</span>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong className="text-[#1E64C8]">Win:</strong> 3 points</li>
                <li><strong className="text-slate-600">Loss:</strong> 0 points</li>
                <li><strong className="text-rose-600">Draws:</strong> STRICTLY FORBIDDEN. Deciding goal must be scored.</li>
                <li>Score recorded as Goals For - Goals Against (e.g. 11 - 9).</li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Knockout Qualification (8 Teams):</span>
              <ul className="list-disc pl-4 space-y-1">
                <li>Top 2 teams from Poules A, B, and C automatically qualify (6 teams).</li>
                <li>Top 2 "Best Third-place" teams across all 3 groups qualify (2 teams).</li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Tie-Break Hierarchy:</span>
              <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-[11px] space-y-1 text-slate-700">
                <div>1. Points total (3 pts for win)</div>
                <div>2. Goal Difference (Goals For - Goals Against)</div>
                <div className="text-amber-700 font-semibold pt-1 border-t border-slate-200 mt-1">
                  * In case of a draw after Goal Difference, organisers decide what to do.
                </div>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Knockout Seeding:</span>
              <div className="text-[11px] text-slate-600 space-y-0.5 font-mono">
                <div>• QF1: Poule A #1 vs Best 3rd #2</div>
                <div>• QF2: Poule B #1 vs Poule C #2</div>
                <div>• QF3: Poule C #1 vs Poule A #2</div>
                <div>• QF4: Poule B #2 vs Best 3rd #1</div>
                <div>• Followed by Semi-Finals, 3rd Place Match, and Grand Final</div>
              </div>
            </div>
          </div>
        </div>

        {/* Darts Rules */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs border-t-4 border-t-[#FFD200]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD200]" />
            <h3 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wider">
              2. Department Cup Darts Regulations
            </h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Match Rules &amp; Gameplay:</span>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong className="text-slate-900">Game Format:</strong> The game starts at <strong>501 double out, best of five legs</strong>.</li>
                <li><strong className="text-[#1E64C8]">Score Submission:</strong> After the game, please pass on the exact score to Pat or Emiel.</li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Format &amp; Groups:</span>
              11 teams/players divided into 2 groups:
              <ul className="list-disc pl-4 space-y-1 mt-1">
                <li><strong className="text-[#1E64C8]">Group 1 (Group A):</strong> 6 teams/players (15 matches)</li>
                <li><strong className="text-[#1E64C8]">Group 2 (Group B):</strong> 5 teams/players (10 matches, 1 bye per round)</li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Scoring &amp; Legs:</span>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong className="text-[#1E64C8]">Win:</strong> 3 points</li>
                <li><strong className="text-slate-600">Loss:</strong> 0 points</li>
                <li><strong className="text-rose-600">Draws:</strong> STRICTLY FORBIDDEN. Deciding leg must be played.</li>
                <li>Score recorded as Legs Won - Legs Lost (e.g. 3 - 1, 3 - 0).</li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Qualification to Knockout:</span>
              Top 4 from Group 1 and Top 4 from Group 2 advance to an 8-player bracket.
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Crossover Seeding Formula:</span>
              <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-[11px] space-y-1 text-slate-700">
                <div>• QF1: Group 1 #1 vs Group 2 #4</div>
                <div>• QF2: Group 2 #2 vs Group 1 #3</div>
                <div>• QF3: Group 2 #1 vs Group 1 #4</div>
                <div>• QF4: Group 1 #2 vs Group 2 #3</div>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Tie-Breaker Hierarchy:</span>
              <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-[11px] space-y-1 text-slate-700">
                <div>1. Points (3 pts for win)</div>
                <div>2. Leg Difference (Legs Won - Legs Lost)</div>
                <div className="text-amber-700 font-semibold pt-1 border-t border-slate-200 mt-1">
                  * In case of a draw after Leg Difference, organisers decide what to do.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fair Play Charter */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center gap-4 text-xs text-slate-700">
        <ShieldCheck className="w-6 h-6 text-[#1E64C8] shrink-0" />
        <div>
          <strong className="text-slate-900 block text-sm">Ghent University Fair Play &amp; Sportsmanship:</strong>
          All competitors represent their respective chemistry laboratories and research divisions. Scores must be verified and confirmed by both captains upon match conclusion.
        </div>
      </div>
    </div>
  );
};
