import React, { useState } from 'react';
import { KnockoutMatch, SportType } from '../types/tournament';
import { useTournament } from '../context/TournamentContext';
import { useAuth } from '../context/AuthContext';
import { Trophy, Award, Edit3, X, AlertCircle, RotateCcw, Lock } from 'lucide-react';

interface KnockoutBracketProps {
  sport: SportType;
  matches: KnockoutMatch[];
}

export const KnockoutBracket: React.FC<KnockoutBracketProps> = ({ sport, matches }) => {
  const { updateKnockoutScore, clearKnockoutScore, getTeamById, getChampion } = useTournament();
  const { isAdmin, openLoginModal } = useAuth();

  const [activeEditingMatch, setActiveEditingMatch] = useState<KnockoutMatch | null>(null);
  const [modalHomeScore, setModalHomeScore] = useState<string>('');
  const [modalAwayScore, setModalAwayScore] = useState<string>('');
  const [modalError, setModalError] = useState<string | null>(null);

  const champion = getChampion(sport);

  const qfMatches = matches.filter((m) => m.round === 'quarter');
  const sfMatches = matches.filter((m) => m.round === 'semi');
  const thirdMatch = matches.find((m) => m.round === 'third_place');
  const finalMatch = matches.find((m) => m.round === 'final');

  const openScoreModal = (match: KnockoutMatch) => {
    if (!isAdmin) {
      openLoginModal('Admin login required to enter or edit knockout scores.');
      return;
    }
    setActiveEditingMatch(match);
    setModalHomeScore(match.homeScore !== null ? String(match.homeScore) : '');
    setModalAwayScore(match.awayScore !== null ? String(match.awayScore) : '');
    setModalError(null);
  };

  const handleSaveModal = () => {
    if (!activeEditingMatch) return;

    if (!isAdmin) {
      openLoginModal('Admin login required to enter knockout scores.');
      return;
    }

    if (modalHomeScore === '' || modalAwayScore === '') {
      setModalError('Please enter scores for both sides.');
      return;
    }

    const hNum = parseInt(modalHomeScore, 10);
    const aNum = parseInt(modalAwayScore, 10);

    if (isNaN(hNum) || isNaN(aNum)) {
      setModalError('Please enter valid numeric scores.');
      return;
    }

    if (hNum === aNum) {
      setModalError('Draws are not permitted in knockout rounds! One team must advance.');
      return;
    }

    const res = updateKnockoutScore(sport, activeEditingMatch.id, hNum, aNum);
    if (!res.success) {
      setModalError(res.error || 'Failed to save score.');
    } else {
      setActiveEditingMatch(null);
    }
  };

  const handleClearScore = (matchId: string) => {
    if (!isAdmin) {
      openLoginModal('Admin login required to clear knockout scores.');
      return;
    }
    clearKnockoutScore(sport, matchId);
    if (activeEditingMatch?.id === matchId) {
      setActiveEditingMatch(null);
    }
  };

  const renderTeamRow = (
    teamId: string | null,
    placeholder: string,
    score: number | null,
    isWinner: boolean,
    isCompleted: boolean
  ) => {
    const team = getTeamById(sport, teamId);

    return (
      <div
        className={`flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors ${
          isWinner
            ? 'bg-blue-50/70 text-[#1E64C8] font-bold'
            : isCompleted
            ? 'text-slate-500'
            : 'text-slate-800'
        }`}
      >
        <div className="truncate mr-2 flex-1">
          {team ? (
            <div>
              <span className={`font-bold ${isWinner ? 'text-[#1E64C8]' : 'text-slate-900'}`}>
                {team.name}
              </span>
              {team.lab && <span className="block text-[10px] text-slate-500 truncate">{team.lab}</span>}
            </div>
          ) : (
            <span className="italic text-slate-400 font-mono text-[11px]">{placeholder}</span>
          )}
        </div>
        <div className="shrink-0 font-mono font-bold text-sm w-7 text-center tabular-nums">
          {score !== null ? (
            <span className={isWinner ? 'text-[#1E64C8]' : 'text-slate-500'}>{score}</span>
          ) : (
            <span className="text-slate-300">-</span>
          )}
        </div>
      </div>
    );
  };

  const renderMatchCard = (match: KnockoutMatch, subtitle?: string) => {
    const homeTeam = getTeamById(sport, match.homeTeamId);
    const awayTeam = getTeamById(sport, match.awayTeamId);
    const canEnterScore = !!(match.homeTeamId && match.awayTeamId);

    const isHomeWinner = match.completed && match.winnerId === match.homeTeamId;
    const isAwayWinner = match.completed && match.winnerId === match.awayTeamId;

    return (
      <div
        key={match.id}
        className={`relative bg-white border rounded-xl overflow-hidden shadow-xs transition-all ${
          match.completed
            ? 'border-[#1E64C8]/40 shadow-xs'
            : canEnterScore
            ? 'border-slate-300 hover:border-[#1E64C8]'
            : 'border-slate-200 opacity-75'
        }`}
      >
        {/* Match Header */}
        <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600 font-mono">
          <span className="font-bold text-slate-800">{match.title}</span>
          <div className="flex items-center gap-1.5">
            {subtitle && (
              <span className="text-[10px] font-semibold text-[#1E64C8] bg-blue-50 px-2 py-0.5 rounded">
                {subtitle}
              </span>
            )}
            {canEnterScore && (
              <button
                onClick={() => openScoreModal(match)}
                title={isAdmin ? 'Enter or edit match score' : 'Admin Login required to enter score'}
                className="p-1 hover:text-[#1E64C8] hover:bg-slate-200 rounded transition-colors text-slate-500 cursor-pointer"
              >
                {!isAdmin ? <Lock className="w-3.5 h-3.5 text-slate-400" /> : <Edit3 className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Teams and Scores */}
        <div className="divide-y divide-slate-100">
          {renderTeamRow(
            match.homeTeamId,
            match.homePlaceholder,
            match.homeScore,
            isHomeWinner,
            match.completed
          )}
          {renderTeamRow(
            match.awayTeamId,
            match.awayPlaceholder,
            match.awayScore,
            isAwayWinner,
            match.completed
          )}
        </div>

        {/* Quick Action Footer */}
        {canEnterScore && (
          <div className="bg-slate-50/80 px-3.5 py-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-mono truncate max-w-[170px]">
              {match.completed
                ? 'Winner: ' + (isHomeWinner ? homeTeam?.name : awayTeam?.name)
                : 'Ready to play'}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              {match.completed && isAdmin && (
                <button
                  onClick={() => handleClearScore(match.id)}
                  title="Reset match score"
                  className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={() => openScoreModal(match)}
                className="text-[#1E64C8] hover:underline font-bold font-mono text-[11px] cursor-pointer flex items-center gap-1"
              >
                {!isAdmin && <Lock className="w-3 h-3" />}
                {match.completed ? 'Edit Score' : 'Enter Score'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Banner / Guide info */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#1E64C8]" />
            {sport === 'foosball' ? 'Department Cup Foosball Bracket' : 'Department Cup Darts Bracket'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {sport === 'foosball'
              ? 'Top 2 from Poules A, B, C + 2 Best 3rd-place teams auto-seeded into Quarter-Finals.'
              : 'Top 4 from Group 1 and Group 2 cross-seeded into Quarter-Finals (G1 #1 vs G2 #4, G2 #2 vs G1 #3, etc.).'}
          </p>
        </div>

        {champion && (
          <div className="bg-amber-50 border border-amber-300 px-4 py-2 rounded-lg flex items-center gap-2 shadow-xs">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-xs">
              <span className="text-slate-600 font-mono">Department Champion:</span>{' '}
              <strong className="text-amber-900 font-bold">{champion.name}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Bracket Tree Grid */}
      <div className="overflow-x-auto pb-6">
        <div className="min-w-[1020px] grid grid-cols-4 gap-6 items-stretch">
          {/* Column 1: Quarter-Finals */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1E64C8] font-mono pb-2 border-b-2 border-[#1E64C8] flex items-center justify-between">
              <span>Quarter-Finals</span>
              <span>(Best 8)</span>
            </div>
            <div className="space-y-4">
              {qfMatches.map((m) => renderMatchCard(m))}
            </div>
          </div>

          {/* Column 2: Semi-Finals */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1E64C8] font-mono pb-2 border-b-2 border-[#1E64C8] flex items-center justify-between">
              <span>Semi-Finals</span>
              <span>(Final 4)</span>
            </div>
            <div className="space-y-16 pt-8">
              {sfMatches.map((m) => renderMatchCard(m))}
            </div>
          </div>

          {/* Column 3: Finals (Grand Final + 3rd Place) */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1E64C8] font-mono pb-2 border-b-2 border-[#1E64C8] flex items-center justify-between">
              <span>Grand Final</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>

            <div className="pt-4 space-y-8">
              {finalMatch && (
                <div className="ring-2 ring-[#FFD200] rounded-xl overflow-hidden shadow-sm">
                  {renderMatchCard(finalMatch, 'Department Cup Trophy')}
                </div>
              )}

              {/* 3rd Place Playoff */}
              {thirdMatch && (
                <div className="pt-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono pb-2 border-b border-slate-200 flex items-center justify-between mb-3">
                    <span>3rd Place Playoff</span>
                    <Award className="w-4 h-4 text-amber-600" />
                  </div>
                  {renderMatchCard(thirdMatch, 'Bronze Match')}
                </div>
              )}
            </div>
          </div>

          {/* Column 4: Podium / Winner Showcase */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1E64C8] font-mono pb-2 border-b-2 border-[#1E64C8] flex items-center justify-between">
              <span>Podium Honors</span>
              <Award className="w-4 h-4 text-[#1E64C8]" />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-600 shadow-xs">
                <Trophy className="w-8 h-8" />
              </div>

              {champion ? (
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#1E64C8] font-bold">
                    1st Place · Champion
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-1">{champion.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{champion.lab}</p>
                </div>
              ) : (
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    {sport === 'foosball' ? 'Department Cup Foosball' : 'Department Cup Darts'}
                  </span>
                  <h4 className="text-sm font-bold text-slate-700 mt-1">Awaiting Grand Final</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Winner will be crowned here</p>
                </div>
              )}

              {/* Runner-up and 3rd place info */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-left text-xs">
                <div className="flex items-center justify-between py-1.5 px-3 rounded bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-mono text-[11px]">2nd Place:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[140px]">
                    {finalMatch?.completed && finalMatch.loserId
                      ? getTeamById(sport, finalMatch.loserId)?.name
                      : 'TBD'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 px-3 rounded bg-slate-50 border border-slate-100">
                  <span className="text-amber-700 font-mono text-[11px]">3rd Place:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[140px]">
                    {thirdMatch?.completed && thirdMatch.winnerId
                      ? getTeamById(sport, thirdMatch.winnerId)?.name
                      : 'TBD'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Entry Dialog */}
      {activeEditingMatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-sm font-bold text-slate-900 font-mono">{activeEditingMatch.title}</h4>
              <button
                onClick={() => setActiveEditingMatch(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Home Team Input */}
              <div className="flex items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="truncate flex-1">
                  <div className="text-xs font-bold text-slate-900">
                    {getTeamById(sport, activeEditingMatch.homeTeamId)?.name || activeEditingMatch.homePlaceholder}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {getTeamById(sport, activeEditingMatch.homeTeamId)?.lab}
                  </div>
                </div>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={modalHomeScore}
                  onChange={(e) => setModalHomeScore(e.target.value)}
                  placeholder="0"
                  className="w-14 h-10 text-center font-mono font-bold text-lg bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-[#1E64C8] focus:ring-1 focus:ring-[#1E64C8] tabular-nums"
                />
              </div>

              {/* Away Team Input */}
              <div className="flex items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="truncate flex-1">
                  <div className="text-xs font-bold text-slate-900">
                    {getTeamById(sport, activeEditingMatch.awayTeamId)?.name || activeEditingMatch.awayPlaceholder}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {getTeamById(sport, activeEditingMatch.awayTeamId)?.lab}
                  </div>
                </div>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={modalAwayScore}
                  onChange={(e) => setModalAwayScore(e.target.value)}
                  placeholder="0"
                  className="w-14 h-10 text-center font-mono font-bold text-lg bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-[#1E64C8] focus:ring-1 focus:ring-[#1E64C8] tabular-nums"
                />
              </div>

              {modalError && (
                <div className="p-2.5 rounded bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{modalError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setActiveEditingMatch(null)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveModal}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-[#1E64C8] hover:bg-[#154fa1] text-white transition-colors cursor-pointer shadow-xs"
                >
                  Save Score &amp; Advance Winner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
