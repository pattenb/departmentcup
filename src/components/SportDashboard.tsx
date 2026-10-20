import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { StandingsTable } from './StandingsTable';
import { BestThirdTable } from './BestThirdTable';
import { FixtureList } from './FixtureList';
import { KnockoutBracket } from './KnockoutBracket';
import { ChampionBanner } from './ChampionBanner';
import { Table2, Calendar, GitBranch, ChevronRight, FlaskConical } from 'lucide-react';
import { FoosballPlayersVisual, DartsBoardArrowsVisual } from './HeroVisuals';

export const SportDashboard: React.FC = () => {
  const {
    activeSport,
    activeView,
    setActiveView,
    foosballTeams,
    foosballMatches,
    foosballKnockout,
    foosballStandingsA,
    foosballStandingsB,
    foosballStandingsC,
    foosballBestThird,

    dartsTeams,
    dartsMatches,
    dartsKnockout,
    dartsStandingsG1,
    dartsStandingsG2,

    getChampion,
    getTeamById,
  } = useTournament();

  const [activeSubTab, setActiveSubTab] = useState<'standings' | 'fixtures' | 'bracket'>(() => {
    return activeView === 'knockout' ? 'bracket' : 'standings';
  });

  React.useEffect(() => {
    if (activeView === 'knockout') {
      setActiveSubTab('bracket');
    }
  }, [activeView]);

  const handleSubTabChange = (tab: 'standings' | 'fixtures' | 'bracket') => {
    setActiveSubTab(tab);
    if (tab === 'bracket') {
      setActiveView('knockout');
    } else {
      setActiveView('groups');
    }
  };

  const isFoosball = activeSport === 'foosball';
  const matches = isFoosball ? foosballMatches : dartsMatches;
  const knockoutMatches = isFoosball ? foosballKnockout : dartsKnockout;
  const champion = getChampion(activeSport);

  const finalMatch = knockoutMatches.find((m) => m.round === 'final');
  const thirdMatch = knockoutMatches.find((m) => m.round === 'third_place');
  const runnerUp = finalMatch?.completed && finalMatch.loserId ? getTeamById(activeSport, finalMatch.loserId) : undefined;
  const thirdPlace = thirdMatch?.completed && thirdMatch.winnerId ? getTeamById(activeSport, thirdMatch.winnerId) : undefined;

  const completedGroupCount = matches.filter((m) => m.completed).length;
  const totalGroupCount = matches.length;
  const isGroupFinished = completedGroupCount === totalGroupCount && totalGroupCount > 0;
  const groupProgressPercent = Math.round((completedGroupCount / (totalGroupCount || 1)) * 100);

  const totalPointsOrGoals = matches
    .filter((m) => m.completed && m.homeScore !== null && m.awayScore !== null)
    .reduce((sum, m) => sum + (m.homeScore || 0) + (m.awayScore || 0), 0);

  const pouleOptions = isFoosball
    ? [
        { id: 'A', label: 'Poule A' },
        { id: 'B', label: 'Poule B' },
        { id: 'C', label: 'Poule C' },
      ]
    : [
        { id: 'G1', label: 'Group A' },
        { id: 'G2', label: 'Group B' },
      ];

  return (
    <div className="space-y-8">
      {/* Champion Celebration Banner if Grand Final finished */}
      {champion && (
        <ChampionBanner
          sport={activeSport}
          champion={champion}
          runnerUp={runnerUp}
          thirdPlace={thirdPlace}
        />
      )}

      {/* Full Page Width Hero Banner */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 -mt-8 sm:-mt-10 mb-8 overflow-hidden text-white py-12 sm:py-16 shadow-md border-b border-blue-900/40 bg-gradient-to-r from-[#00306c] via-[#004890] to-[#1E64C8]">
        {/* Dynamic Sport Visuals: Foosball Players on Foosball page, Dartboard & Arrows on Darts page */}
        {isFoosball ? <FoosballPlayersVisual /> : <DartsBoardArrowsVisual />}

        {/* Inner Content Constrained to 7xl Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            {/* Faculty Pill Kicker from screenshot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold tracking-wide uppercase backdrop-blur-xs">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Faculty of Sciences · Department of Chemistry</span>
            </div>

            {/* Headline matching user's exact request */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
              Department Cup{' '}
              <span className="text-[#FFD200]">
                {isFoosball ? 'Foosball' : 'Darts'}
              </span>
            </h1>

            <p className="text-white/95 text-sm sm:text-base leading-relaxed font-normal max-w-2xl drop-shadow-xs">
              {isFoosball
                ? 'At the Department of Chemistry at Ghent University, research groups compete in the annual Department Cup Foosball (Kicker) Championship across 3 Poules.'
                : 'At the Department of Chemistry at Ghent University, research groups compete in the annual Department Cup Darts Championship across 2 Groups.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleSubTabChange('standings')}
                className="px-6 py-3 rounded-md bg-[#FFD200] hover:bg-[#ecc000] text-slate-950 font-bold uppercase tracking-wider text-xs transition-colors shadow-sm cursor-pointer"
              >
                Standings &amp; Poules
              </button>
              <button
                onClick={() => handleSubTabChange('bracket')}
                className="px-6 py-3 rounded-md border border-white/80 hover:bg-white/15 text-white font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer backdrop-blur-xs"
              >
                Knockout Bracket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Overview Strip in clean UGent card format */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E64C8] block mb-1">
            Group Stage Progress
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
              {completedGroupCount} / {totalGroupCount}
            </span>
            <span className="text-xs font-semibold text-slate-500 font-mono">
              {groupProgressPercent}% Completed
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-[#1E64C8] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${groupProgressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E64C8] block mb-1">
            {isFoosball ? 'Total Goals Scored' : 'Total Legs Played'}
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
              {totalPointsOrGoals}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {isFoosball ? 'Department Goals' : 'Legs Recorded'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            No draws permitted · Winner takes 3 points
          </p>
        </div>

        <button
          onClick={() => handleSubTabChange('bracket')}
          className="bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-[#1E64C8]/50 rounded-xl p-5 shadow-xs text-left transition-colors group cursor-pointer"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E64C8] block mb-1 flex items-center justify-between">
            <span>Knockout Bracket</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1E64C8] transition-colors" />
          </span>
          <div className="text-2xl font-black text-slate-900">
            {champion ? 'Winner Decided' : knockoutMatches.some((m) => m.completed) ? 'Knockout Active' : '8 Teams Auto-Seeded'}
          </div>
          <p className="text-xs text-[#1E64C8] font-semibold mt-2">
            Click to view visual bracket &rarr;
          </p>
        </button>
      </div>

      {/* Navigation Sub-Tabs in clean Ghent University styling */}
      <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => handleSubTabChange('standings')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'standings'
                ? 'bg-[#1E64C8] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Table2 className="w-3.5 h-3.5" />
            <span>Standings &amp; Poules</span>
          </button>
          <button
            onClick={() => handleSubTabChange('fixtures')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'fixtures'
                ? 'bg-[#1E64C8] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Match Fixtures &amp; Scores</span>
          </button>
          <button
            onClick={() => handleSubTabChange('bracket')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'bracket'
                ? 'bg-[#1E64C8] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Knockout Bracket (8 Teams)</span>
            {isGroupFinished && (
              <span className="w-2 h-2 rounded-full bg-[#FFD200]" />
            )}
          </button>
        </div>

        <div className="text-xs text-slate-500 hidden sm:block pr-2">
          {activeSubTab === 'standings' && 'Real-time standings automatically update after each match'}
          {activeSubTab === 'fixtures' && 'Draws strictly forbidden — enter decisive goal/leg scores'}
          {activeSubTab === 'bracket' && 'Auto-seeded from poule rankings as matches finish'}
        </div>
      </div>

      {/* Main Tab Content */}
      {activeSubTab === 'standings' && (
        <div className="space-y-6">
          {/* Quick Match Rules Banner */}
          <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-950">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E64C8] shrink-0" />
              <div>
                <strong className="text-slate-900 font-bold block text-xs uppercase tracking-wide">
                  {isFoosball ? 'Kicker Rules:' : 'Darts Rules:'}
                </strong>
                <span>
                  {isFoosball
                    ? '1 game to 11 with 2 goals difference. Middle rod goals do not count unless agreed before start.'
                    : '501 double out, best of 5 legs.'}
                  {' '}
                  <strong className="text-[#1E64C8]">After the game, please pass on the exact score to Pat or Emiel.</strong>
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveView('rules')}
              className="text-[11px] font-bold text-[#1E64C8] hover:underline shrink-0 cursor-pointer"
            >
              Full Regulations &rarr;
            </button>
          </div>

          {/* Quick Notice Banner */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-xl px-5 py-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1E64C8] text-white flex items-center justify-center shrink-0">
                <GitBranch className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-sm">
                  {isGroupFinished
                    ? 'Poule matches complete! The 8 qualified teams are seeded in the Knockout Bracket.'
                    : 'Knockout Qualification Tracker:'}
                </span>
                <span className="text-slate-600">
                  {isFoosball
                    ? 'Top 2 teams from Poules A, B, and C + 2 Best Third-Place teams advance to Quarter-Finals.'
                    : 'Top 4 teams from Group 1 and Group 2 cross-seed into Quarter-Finals.'}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleSubTabChange('bracket')}
              className="px-4 py-2 rounded-md bg-[#1E64C8] hover:bg-[#154fa1] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              View Knockout Bracket &rarr;
            </button>
          </div>

          {/* Foosball Standings: Poules A, B, C */}
          {isFoosball ? (
            <>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <StandingsTable
                  title="Poule A"
                  rows={foosballStandingsA}
                  sport="foosball"
                  pouleId="A"
                />
                <StandingsTable
                  title="Poule B"
                  rows={foosballStandingsB}
                  sport="foosball"
                  pouleId="B"
                />
                <StandingsTable
                  title="Poule C"
                  rows={foosballStandingsC}
                  sport="foosball"
                  pouleId="C"
                />
              </div>

              {/* Dedicated Best 3rd Place Comparison Table for Foosball */}
              <BestThirdTable thirdRows={foosballBestThird.thirdPlaceRows} />
            </>
          ) : (
            /* Darts Standings: Group 1 & Group 2 */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StandingsTable
                title="Group 1 (6 Teams)"
                rows={dartsStandingsG1}
                sport="darts"
                pouleId="G1"
              />
              <StandingsTable
                title="Group 2 (7 Teams)"
                rows={dartsStandingsG2}
                sport="darts"
                pouleId="G2"
              />
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'fixtures' && (
        <FixtureList
          sport={activeSport}
          matches={matches}
          pouleOptions={pouleOptions}
        />
      )}

      {activeSubTab === 'bracket' && (
        <KnockoutBracket
          sport={activeSport}
          matches={knockoutMatches}
        />
      )}
    </div>
  );
};
