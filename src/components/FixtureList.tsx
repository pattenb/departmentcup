import React, { useState } from 'react';
import { GroupMatch, SportType } from '../types/tournament';
import { useTournament } from '../context/TournamentContext';
import { useAuth } from '../context/AuthContext';
import { Search, AlertCircle, Check, RotateCcw, Lock } from 'lucide-react';

interface FixtureListProps {
  sport: SportType;
  matches: GroupMatch[];
  pouleOptions: { id: string; label: string }[];
}

export const FixtureList: React.FC<FixtureListProps> = ({ sport, matches, pouleOptions }) => {
  const { updateGroupScore, clearGroupScore, getTeamById } = useTournament();
  const { isAdmin, openLoginModal } = useAuth();

  const [selectedPoule, setSelectedPoule] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [editingScores, setEditingScores] = useState<Record<string, { home: string; away: string; error?: string }>>({});

  const filteredMatches = matches.filter((m) => {
    if (selectedPoule !== 'all' && m.pouleId !== selectedPoule) return false;
    if (statusFilter === 'pending' && m.completed) return false;
    if (statusFilter === 'completed' && !m.completed) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const home = getTeamById(sport, m.homeTeamId);
      const away = getTeamById(sport, m.awayTeamId);
      const homeMatch = home?.name.toLowerCase().includes(q) || home?.lab?.toLowerCase().includes(q);
      const awayMatch = away?.name.toLowerCase().includes(q) || away?.lab?.toLowerCase().includes(q);
      if (!homeMatch && !awayMatch) return false;
    }

    return true;
  });

  const getScoreValue = (matchId: string, side: 'home' | 'away', actualVal: number | null): string => {
    if (editingScores[matchId] && editingScores[matchId][side] !== undefined) {
      return editingScores[matchId][side];
    }
    return actualVal !== null ? String(actualVal) : '';
  };

  const handleScoreChange = (match: GroupMatch, side: 'home' | 'away', val: string) => {
    if (!isAdmin) {
      openLoginModal('Admin login required to enter match scores.');
      return;
    }

    const curHome = side === 'home' ? val : getScoreValue(match.id, 'home', match.homeScore);
    const curAway = side === 'away' ? val : getScoreValue(match.id, 'away', match.awayScore);

    let errorMsg: string | undefined = undefined;

    if (curHome !== '' && curAway !== '') {
      const hNum = parseInt(curHome, 10);
      const aNum = parseInt(curAway, 10);
      if (!isNaN(hNum) && !isNaN(aNum)) {
        if (hNum === aNum) {
          errorMsg = 'Draws are strictly forbidden in Department Cup! One team must win.';
        } else if (hNum < 0 || aNum < 0) {
          errorMsg = 'Scores cannot be negative.';
        }
      }
    }

    setEditingScores((prev) => ({
      ...prev,
      [match.id]: {
        home: curHome,
        away: curAway,
        error: errorMsg,
      },
    }));
  };

  const handleSaveMatch = (match: GroupMatch) => {
    if (!isAdmin) {
      openLoginModal('Admin login required to enter match scores.');
      return;
    }

    const edit = editingScores[match.id];
    const homeStr = edit ? edit.home : match.homeScore !== null ? String(match.homeScore) : '';
    const awayStr = edit ? edit.away : match.awayScore !== null ? String(match.awayScore) : '';

    if (homeStr === '' || awayStr === '') {
      setEditingScores((prev) => ({
        ...prev,
        [match.id]: {
          home: homeStr,
          away: awayStr,
          error: 'Please enter scores for both teams.',
        },
      }));
      return;
    }

    const hNum = parseInt(homeStr, 10);
    const aNum = parseInt(awayStr, 10);

    if (isNaN(hNum) || isNaN(aNum)) {
      setEditingScores((prev) => ({
        ...prev,
        [match.id]: {
          home: homeStr,
          away: awayStr,
          error: 'Please enter valid integer scores.',
        },
      }));
      return;
    }

    const res = updateGroupScore(sport, match.id, hNum, aNum);
    if (!res.success) {
      setEditingScores((prev) => ({
        ...prev,
        [match.id]: {
          home: homeStr,
          away: awayStr,
          error: res.error,
        },
      }));
    } else {
      setEditingScores((prev) => {
        const next = { ...prev };
        delete next[match.id];
        return next;
      });
    }
  };

  const handleClear = (match: GroupMatch) => {
    if (!isAdmin) {
      openLoginModal('Admin login required to clear match scores.');
      return;
    }

    clearGroupScore(sport, match.id);
    setEditingScores((prev) => {
      const next = { ...prev };
      delete next[match.id];
      return next;
    });
  };

  const matchesByRound = filteredMatches.reduce<Record<number, GroupMatch[]>>((acc, match) => {
    if (!acc[match.round]) acc[match.round] = [];
    acc[match.round].push(match);
    return acc;
  }, {});

  const rounds = Object.keys(matchesByRound)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="space-y-5">
      {/* Read only Notice if not admin */}
      {!isAdmin && (
        <div className="bg-slate-100 border border-slate-300 rounded-xl p-3.5 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700">
            <Lock className="w-4 h-4 text-[#1E64C8] shrink-0" />
            <span>
              <strong>Public View:</strong> Matches &amp; results are read-only. Log in as organizer admin (<strong>admincup</strong>) to enter or update scores.
            </span>
          </div>
          <button
            onClick={() => openLoginModal('Admin login required to enter match scores.')}
            className="px-3.5 py-1.5 rounded bg-[#1E64C8] hover:bg-[#154fa1] text-white font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Log In as Admin
          </button>
        </div>
      )}

      {/* Quick Rule Reminder Banner */}
      <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-950">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E64C8] shrink-0" />
          <div>
            <strong className="text-slate-900 font-bold">
              {sport === 'foosball' ? 'Kicker Rules:' : 'Darts Rules:'}
            </strong>{' '}
            {sport === 'foosball'
              ? 'Play 1 game to 11 with 2 goals difference. Middle rod goals count only if agreed before match.'
              : '501 double out, best of 5 legs.'}{' '}
            <strong className="text-[#1E64C8]">After the game, please pass on the exact score to Pat or Emiel.</strong>
          </div>
        </div>
      </div>

      {/* Filters Bar in clean white card */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            Group:
          </span>
          <button
            onClick={() => setSelectedPoule('all')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedPoule === 'all'
                ? 'bg-[#1E64C8] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Groups
          </button>
          {pouleOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedPoule(opt.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedPoule === opt.id
                  ? 'bg-[#1E64C8] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Status selector */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5 text-xs font-semibold">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({matches.length})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'pending'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending ({matches.filter((m) => !m.completed).length})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'completed'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Completed ({matches.filter((m) => m.completed).length})
            </button>
          </div>

          {/* Search box */}
          <div className="relative flex-1 sm:w-52">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team or lab..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E64C8] focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Match Cards */}
      {rounds.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500 text-sm shadow-xs">
          No matches found matching the selected filter criteria.
        </div>
      ) : (
        <div className="space-y-6">
          {rounds.map((roundNum) => {
            const roundMatches = matchesByRound[roundNum];
            return (
              <div key={roundNum} className="space-y-3">
                <div className="flex items-center gap-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1E64C8] font-mono">
                    Round {roundNum}
                  </h4>
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-[11px] text-slate-500 font-mono">
                    {roundMatches.filter((m) => m.completed).length} / {roundMatches.length} Completed
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                  {roundMatches.map((match) => {
                    const homeTeam = getTeamById(sport, match.homeTeamId);
                    const awayTeam = getTeamById(sport, match.awayTeamId);

                    const editState = editingScores[match.id];
                    const homeVal = getScoreValue(match.id, 'home', match.homeScore);
                    const awayVal = getScoreValue(match.id, 'away', match.awayScore);
                    const error = editState?.error;

                    const isHomeWinner =
                      match.completed &&
                      match.homeScore !== null &&
                      match.awayScore !== null &&
                      match.homeScore > match.awayScore;
                    const isAwayWinner =
                      match.completed &&
                      match.homeScore !== null &&
                      match.awayScore !== null &&
                      match.awayScore > match.homeScore;

                    const isDirty =
                      (editState &&
                        (editState.home !== (match.homeScore !== null ? String(match.homeScore) : '') ||
                          editState.away !== (match.awayScore !== null ? String(match.awayScore) : ''))) ||
                      (!match.completed && homeVal !== '' && awayVal !== '');

                    return (
                      <div
                        key={match.id}
                        className={`bg-white border rounded-xl p-4 transition-all shadow-xs ${
                          error
                            ? 'border-rose-400 bg-rose-50/20'
                            : match.completed
                            ? 'border-slate-200'
                            : 'border-slate-200 hover:border-[#1E64C8]/50'
                        }`}
                      >
                        {/* Top bar with match metadata */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3 pb-2 border-b border-slate-100 font-mono">
                          <span className="font-bold text-slate-700">
                            {sport === 'foosball' ? `Poule ${match.pouleId}` : match.pouleId === 'G1' ? 'Group 1' : 'Group 2'} · Match {match.id.split('_m')[1] || ''}
                          </span>
                          <div className="flex items-center gap-2">
                            {match.completed ? (
                              <span className="inline-flex items-center gap-1 text-[#1E64C8] font-bold">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Completed
                              </span>
                            ) : (
                              <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                Pending
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Teams & Score Entry Row */}
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
                          {/* Home Team */}
                          <div className="text-right">
                            <div
                              className={`text-sm font-bold truncate ${
                                isHomeWinner ? 'text-[#1E64C8]' : 'text-slate-900'
                              }`}
                              title={homeTeam?.name}
                            >
                              {homeTeam?.name || 'Home Team'}
                            </div>
                            {(homeTeam?.player1 || homeTeam?.player2) ? (
                              <div className="text-[11px] text-slate-600 font-medium truncate max-w-[170px] ml-auto">
                                {[homeTeam.player1, homeTeam.player2].filter(Boolean).join(' & ')}
                              </div>
                            ) : homeTeam?.lab ? (
                              <div className="text-[11px] text-slate-500 truncate max-w-[150px] ml-auto">
                                {homeTeam.lab}
                              </div>
                            ) : null}
                          </div>

                          {/* Scores Box */}
                          <div className="flex items-center gap-1.5 shrink-0 bg-slate-50 border border-slate-300 rounded-lg p-1">
                            <input
                              type="number"
                              min="0"
                              max="99"
                              value={homeVal}
                              onChange={(e) => handleScoreChange(match, 'home', e.target.value)}
                              placeholder="0"
                              onClick={() => {
                                if (!isAdmin) openLoginModal('Admin login required to enter match scores.');
                              }}
                              className={`w-11 h-9 text-center font-mono text-base font-bold rounded bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E64C8] tabular-nums ${
                                isHomeWinner ? 'text-[#1E64C8]' : ''
                              }`}
                            />
                            <span className="text-slate-400 font-bold text-xs">:</span>
                            <input
                              type="number"
                              min="0"
                              max="99"
                              value={awayVal}
                              onChange={(e) => handleScoreChange(match, 'away', e.target.value)}
                              placeholder="0"
                              onClick={() => {
                                if (!isAdmin) openLoginModal('Admin login required to enter match scores.');
                              }}
                              className={`w-11 h-9 text-center font-mono text-base font-bold rounded bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E64C8] tabular-nums ${
                                isAwayWinner ? 'text-[#1E64C8]' : ''
                              }`}
                            />
                          </div>

                          {/* Away Team */}
                          <div className="text-left">
                            <div
                              className={`text-sm font-bold truncate ${
                                isAwayWinner ? 'text-[#1E64C8]' : 'text-slate-900'
                              }`}
                              title={awayTeam?.name}
                            >
                              {awayTeam?.name || 'Away Team'}
                            </div>
                            {(awayTeam?.player1 || awayTeam?.player2) ? (
                              <div className="text-[11px] text-slate-600 font-medium truncate max-w-[170px]">
                                {[awayTeam.player1, awayTeam.player2].filter(Boolean).join(' & ')}
                              </div>
                            ) : awayTeam?.lab ? (
                              <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
                                {awayTeam.lab}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {/* Inline Error Notice */}
                        {error && (
                          <div className="mt-2.5 p-2 rounded bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-800 text-xs">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                            <span>{error}</span>
                          </div>
                        )}

                        {/* Action buttons (Save, Clear) */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-end gap-2">
                          {match.completed && (
                            <button
                              onClick={() => handleClear(match)}
                              title="Clear match score"
                              className="px-2.5 py-1 text-[11px] text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" /> Clear
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (!isAdmin) {
                                openLoginModal('Admin login required to enter match scores.');
                              } else {
                                handleSaveMatch(match);
                              }
                            }}
                            disabled={isAdmin && (homeVal === '' || awayVal === '')}
                            className={`px-3.5 py-1 text-xs font-bold rounded transition-colors inline-flex items-center gap-1 cursor-pointer ${
                              isDirty || !isAdmin
                                ? 'bg-[#1E64C8] hover:bg-[#154fa1] text-white shadow-xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            } disabled:opacity-40 disabled:cursor-not-allowed`}
                          >
                            {!isAdmin ? <Lock className="w-3 h-3" /> : <Check className="w-3.5 h-3.5" />}
                            {!isAdmin ? 'Enter Score (Admin)' : match.completed ? 'Update Score' : 'Save Score'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
