import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  SportType,
  Team,
  GroupMatch,
  KnockoutMatch,
  SportTournamentState,
  StandingsRow,
} from '../types/tournament';
import {
  DEFAULT_FOOSBALL_TEAMS,
  DEFAULT_DARTS_TEAMS,
  generateRoundRobinMatches,
  createInitialKnockoutMatches,
} from '../data/defaultTeams';
import {
  calculateStandings,
  calculateBestThirdPlace,
  syncFoosballKnockout,
  syncDartsKnockout,
  generateSampleData,
} from '../utils/tournamentLogic';

const STORAGE_KEY = 'chemistry_dept_cup_tournament_v4';

interface TournamentContextType {
  activeSport: SportType;
  setActiveSport: (sport: SportType) => void;
  activeView: 'groups' | 'knockout' | 'teams' | 'rules';
  setActiveView: (view: 'groups' | 'knockout' | 'teams' | 'rules') => void;

  // Foosball Data
  foosballTeams: Team[];
  foosballMatches: GroupMatch[];
  foosballKnockout: KnockoutMatch[];
  foosballStandingsA: StandingsRow[];
  foosballStandingsB: StandingsRow[];
  foosballStandingsC: StandingsRow[];
  foosballBestThird: {
    thirdPlaceRows: StandingsRow[];
    qualifiedThirds: StandingsRow[];
    eliminatedThirds: StandingsRow[];
  };

  // Darts Data
  dartsTeams: Team[];
  dartsMatches: GroupMatch[];
  dartsKnockout: KnockoutMatch[];
  dartsStandingsG1: StandingsRow[];
  dartsStandingsG2: StandingsRow[];

  // Action Handlers
  updateGroupScore: (
    sport: SportType,
    matchId: string,
    homeScore: number | null,
    awayScore: number | null
  ) => { success: boolean; error?: string };
  clearGroupScore: (sport: SportType, matchId: string) => void;

  updateKnockoutScore: (
    sport: SportType,
    matchId: string,
    homeScore: number | null,
    awayScore: number | null
  ) => { success: boolean; error?: string };
  clearKnockoutScore: (sport: SportType, matchId: string) => void;

  updateTeamInfo: (
    sport: SportType,
    teamId: string,
    newName: string,
    newLab?: string,
    newPlayer1?: string,
    newPlayer2?: string,
    newEmail?: string
  ) => void;

  fillDemoData: (sport?: SportType) => void;
  resetScores: (sport?: SportType) => void;
  resetToDefault: () => void;
  exportData: () => void;
  importData: (jsonData: string) => { success: boolean; error?: string };

  // Helper lookups
  getTeamById: (sport: SportType, teamId: string | null) => Team | undefined;
  getChampion: (sport: SportType) => Team | undefined;
}

const TournamentContext = createContext<TournamentContextType | null>(null);

function createInitialFoosballState(): SportTournamentState {
  const teams = [...DEFAULT_FOOSBALL_TEAMS];
  const groupMatches = [
    ...generateRoundRobinMatches(teams, 'foosball', 'A'),
    ...generateRoundRobinMatches(teams, 'foosball', 'B'),
    ...generateRoundRobinMatches(teams, 'foosball', 'C'),
  ];
  const knockoutMatches = createInitialKnockoutMatches('foosball');

  return { teams, groupMatches, knockoutMatches };
}

function createInitialDartsState(): SportTournamentState {
  const teams = [...DEFAULT_DARTS_TEAMS];
  const groupMatches = [
    ...generateRoundRobinMatches(teams, 'darts', 'G1'),
    ...generateRoundRobinMatches(teams, 'darts', 'G2'),
  ];
  const knockoutMatches = createInitialKnockoutMatches('darts');

  return { teams, groupMatches, knockoutMatches };
}

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSport, setActiveSport] = useState<SportType>('foosball');
  const [activeView, setActiveView] = useState<'groups' | 'knockout' | 'teams' | 'rules'>('groups');

  const [foosballState, setFoosballState] = useState<SportTournamentState>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_foosball`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved foosball tournament state:', e);
    }
    return createInitialFoosballState();
  });

  const [dartsState, setDartsState] = useState<SportTournamentState>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_darts`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved darts tournament state:', e);
    }
    return createInitialDartsState();
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_foosball`, JSON.stringify(foosballState));
    } catch (e) {
      console.error('Failed to save foosball state to localStorage', e);
    }
  }, [foosballState]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_darts`, JSON.stringify(dartsState));
    } catch (e) {
      console.error('Failed to save darts state to localStorage', e);
    }
  }, [dartsState]);

  // Compute Foosball Standings
  const foosballStandingsA = useMemo(() => {
    return calculateStandings(foosballState.teams, foosballState.groupMatches, 'A', 'foosball');
  }, [foosballState.teams, foosballState.groupMatches]);

  const foosballStandingsB = useMemo(() => {
    return calculateStandings(foosballState.teams, foosballState.groupMatches, 'B', 'foosball');
  }, [foosballState.teams, foosballState.groupMatches]);

  const foosballStandingsC = useMemo(() => {
    return calculateStandings(foosballState.teams, foosballState.groupMatches, 'C', 'foosball');
  }, [foosballState.teams, foosballState.groupMatches]);

  const foosballBestThird = useMemo(() => {
    return calculateBestThirdPlace(foosballStandingsA, foosballStandingsB, foosballStandingsC);
  }, [foosballStandingsA, foosballStandingsB, foosballStandingsC]);

  // Compute Darts Standings
  const dartsStandingsG1 = useMemo(() => {
    return calculateStandings(dartsState.teams, dartsState.groupMatches, 'G1', 'darts');
  }, [dartsState.teams, dartsState.groupMatches]);

  const dartsStandingsG2 = useMemo(() => {
    return calculateStandings(dartsState.teams, dartsState.groupMatches, 'G2', 'darts');
  }, [dartsState.teams, dartsState.groupMatches]);

  // Synchronize Knockout Brackets whenever standings change
  useEffect(() => {
    setFoosballState((prev) => {
      const updatedKnockout = syncFoosballKnockout(
        prev.knockoutMatches,
        foosballStandingsA,
        foosballStandingsB,
        foosballStandingsC,
        foosballBestThird.qualifiedThirds
      );
      // Only update if changed
      if (JSON.stringify(updatedKnockout) !== JSON.stringify(prev.knockoutMatches)) {
        return { ...prev, knockoutMatches: updatedKnockout };
      }
      return prev;
    });
  }, [foosballStandingsA, foosballStandingsB, foosballStandingsC, foosballBestThird.qualifiedThirds]);

  useEffect(() => {
    setDartsState((prev) => {
      const updatedKnockout = syncDartsKnockout(
        prev.knockoutMatches,
        dartsStandingsG1,
        dartsStandingsG2
      );
      if (JSON.stringify(updatedKnockout) !== JSON.stringify(prev.knockoutMatches)) {
        return { ...prev, knockoutMatches: updatedKnockout };
      }
      return prev;
    });
  }, [dartsStandingsG1, dartsStandingsG2]);

  // Score updater with strict validation
  const updateGroupScore = useCallback(
    (sport: SportType, matchId: string, homeScore: number | null, awayScore: number | null) => {
      if (homeScore !== null && awayScore !== null) {
        if (homeScore === awayScore) {
          return { success: false, error: 'Draws are strictly forbidden in this tournament. One team must win!' };
        }
        if (homeScore < 0 || awayScore < 0) {
          return { success: false, error: 'Scores cannot be negative.' };
        }
      }

      const isCompleted = homeScore !== null && awayScore !== null;

      if (sport === 'foosball') {
        setFoosballState((prev) => ({
          ...prev,
          groupMatches: prev.groupMatches.map((m) =>
            m.id === matchId
              ? {
                  ...m,
                  homeScore,
                  awayScore,
                  completed: isCompleted,
                }
              : m
          ),
        }));
      } else {
        setDartsState((prev) => ({
          ...prev,
          groupMatches: prev.groupMatches.map((m) =>
            m.id === matchId
              ? {
                  ...m,
                  homeScore,
                  awayScore,
                  completed: isCompleted,
                }
              : m
          ),
        }));
      }

      return { success: true };
    },
    []
  );

  const clearGroupScore = useCallback((sport: SportType, matchId: string) => {
    if (sport === 'foosball') {
      setFoosballState((prev) => ({
        ...prev,
        groupMatches: prev.groupMatches.map((m) =>
          m.id === matchId
            ? { ...m, homeScore: null, awayScore: null, completed: false }
            : m
        ),
      }));
    } else {
      setDartsState((prev) => ({
        ...prev,
        groupMatches: prev.groupMatches.map((m) =>
          m.id === matchId
            ? { ...m, homeScore: null, awayScore: null, completed: false }
            : m
        ),
      }));
    }
  }, []);

  const updateKnockoutScore = useCallback(
    (sport: SportType, matchId: string, homeScore: number | null, awayScore: number | null) => {
      if (homeScore !== null && awayScore !== null) {
        if (homeScore === awayScore) {
          return { success: false, error: 'Draws are forbidden in knockout matches. One team must advance!' };
        }
        if (homeScore < 0 || awayScore < 0) {
          return { success: false, error: 'Scores cannot be negative.' };
        }
      }

      const isCompleted = homeScore !== null && awayScore !== null;

      if (sport === 'foosball') {
        setFoosballState((prev) => {
          const updatedMatches = prev.knockoutMatches.map((m) =>
            m.id === matchId
              ? {
                  ...m,
                  homeScore,
                  awayScore,
                  completed: isCompleted,
                }
              : m
          );

          // Re-sync winners
          return {
            ...prev,
            knockoutMatches: syncFoosballKnockout(
              updatedMatches,
              foosballStandingsA,
              foosballStandingsB,
              foosballStandingsC,
              foosballBestThird.qualifiedThirds
            ),
          };
        });
      } else {
        setDartsState((prev) => {
          const updatedMatches = prev.knockoutMatches.map((m) =>
            m.id === matchId
              ? {
                  ...m,
                  homeScore,
                  awayScore,
                  completed: isCompleted,
                }
              : m
          );

          return {
            ...prev,
            knockoutMatches: syncDartsKnockout(
              updatedMatches,
              dartsStandingsG1,
              dartsStandingsG2
            ),
          };
        });
      }

      return { success: true };
    },
    [foosballStandingsA, foosballStandingsB, foosballStandingsC, foosballBestThird.qualifiedThirds, dartsStandingsG1, dartsStandingsG2]
  );

  const clearKnockoutScore = useCallback(
    (sport: SportType, matchId: string) => {
      if (sport === 'foosball') {
        setFoosballState((prev) => {
          const updatedMatches = prev.knockoutMatches.map((m) =>
            m.id === matchId
              ? { ...m, homeScore: null, awayScore: null, completed: false, winnerId: null, loserId: null }
              : m
          );
          return {
            ...prev,
            knockoutMatches: syncFoosballKnockout(
              updatedMatches,
              foosballStandingsA,
              foosballStandingsB,
              foosballStandingsC,
              foosballBestThird.qualifiedThirds
            ),
          };
        });
      } else {
        setDartsState((prev) => {
          const updatedMatches = prev.knockoutMatches.map((m) =>
            m.id === matchId
              ? { ...m, homeScore: null, awayScore: null, completed: false, winnerId: null, loserId: null }
              : m
          );
          return {
            ...prev,
            knockoutMatches: syncDartsKnockout(
              updatedMatches,
              dartsStandingsG1,
              dartsStandingsG2
            ),
          };
        });
      }
    },
    [foosballStandingsA, foosballStandingsB, foosballStandingsC, foosballBestThird.qualifiedThirds, dartsStandingsG1, dartsStandingsG2]
  );

  const updateTeamInfo = useCallback(
    (
      sport: SportType,
      teamId: string,
      newName: string,
      newLab?: string,
      newPlayer1?: string,
      newPlayer2?: string,
      newEmail?: string
    ) => {
      const cleanName = newName.trim();
      if (!cleanName) return;

      const updateFn = (t: Team): Team =>
        t.id === teamId
          ? {
              ...t,
              name: cleanName,
              lab: newLab !== undefined ? newLab.trim() : t.lab,
              player1: newPlayer1 !== undefined ? newPlayer1.trim() : t.player1,
              player2: newPlayer2 !== undefined ? newPlayer2.trim() : t.player2,
              email: newEmail !== undefined ? newEmail.trim() : t.email,
            }
          : t;

      if (sport === 'foosball') {
        setFoosballState((prev) => ({
          ...prev,
          teams: prev.teams.map(updateFn),
        }));
      } else {
        setDartsState((prev) => ({
          ...prev,
          teams: prev.teams.map(updateFn),
        }));
      }
    },
    []
  );

  const fillDemoData = useCallback((sport?: SportType) => {
    const targetSport = sport || activeSport;
    if (targetSport === 'foosball' || !sport) {
      setFoosballState((prev) => {
        const { groupMatches, knockoutMatches } = generateSampleData(
          'foosball',
          prev.groupMatches,
          prev.teams,
          prev.knockoutMatches
        );
        return { ...prev, groupMatches, knockoutMatches };
      });
    }
    if (targetSport === 'darts' || !sport) {
      setDartsState((prev) => {
        const { groupMatches, knockoutMatches } = generateSampleData(
          'darts',
          prev.groupMatches,
          prev.teams,
          prev.knockoutMatches
        );
        return { ...prev, groupMatches, knockoutMatches };
      });
    }
  }, [activeSport]);

  const resetScores = useCallback((sport?: SportType) => {
    const targetSport = sport || activeSport;
    if (targetSport === 'foosball' || !sport) {
      setFoosballState((prev) => ({
        ...prev,
        groupMatches: prev.groupMatches.map((m) => ({
          ...m,
          homeScore: null,
          awayScore: null,
          completed: false,
        })),
        knockoutMatches: createInitialKnockoutMatches('foosball'),
      }));
    }
    if (targetSport === 'darts' || !sport) {
      setDartsState((prev) => ({
        ...prev,
        groupMatches: prev.groupMatches.map((m) => ({
          ...m,
          homeScore: null,
          awayScore: null,
          completed: false,
        })),
        knockoutMatches: createInitialKnockoutMatches('darts'),
      }));
    }
  }, [activeSport]);

  const resetToDefault = useCallback(() => {
    localStorage.removeItem(`${STORAGE_KEY}_foosball`);
    localStorage.removeItem(`${STORAGE_KEY}_darts`);
    setFoosballState(createInitialFoosballState());
    setDartsState(createInitialDartsState());
  }, []);

  const exportData = useCallback(() => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      foosball: foosballState,
      darts: dartsState,
    };
    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ugent_department_cup_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [foosballState, dartsState]);

  const importData = useCallback((jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.foosball && parsed.darts) {
        setFoosballState(parsed.foosball);
        setDartsState(parsed.darts);
        return { success: true };
      }
      return { success: false, error: 'Invalid backup file format.' };
    } catch {
      return { success: false, error: 'Failed to parse JSON file.' };
    }
  }, []);

  const getTeamById = useCallback(
    (sport: SportType, teamId: string | null): Team | undefined => {
      if (!teamId) return undefined;
      const list = sport === 'foosball' ? foosballState.teams : dartsState.teams;
      return list.find((t) => t.id === teamId);
    },
    [foosballState.teams, dartsState.teams]
  );

  const getChampion = useCallback(
    (sport: SportType): Team | undefined => {
      const koList = sport === 'foosball' ? foosballState.knockoutMatches : dartsState.knockoutMatches;
      const finalMatch = koList.find((m) => m.round === 'final');
      if (finalMatch && finalMatch.completed && finalMatch.winnerId) {
        return getTeamById(sport, finalMatch.winnerId);
      }
      return undefined;
    },
    [foosballState.knockoutMatches, dartsState.knockoutMatches, getTeamById]
  );

  return (
    <TournamentContext.Provider
      value={{
        activeSport,
        setActiveSport,
        activeView,
        setActiveView,

        foosballTeams: foosballState.teams,
        foosballMatches: foosballState.groupMatches,
        foosballKnockout: foosballState.knockoutMatches,
        foosballStandingsA,
        foosballStandingsB,
        foosballStandingsC,
        foosballBestThird,

        dartsTeams: dartsState.teams,
        dartsMatches: dartsState.groupMatches,
        dartsKnockout: dartsState.knockoutMatches,
        dartsStandingsG1,
        dartsStandingsG2,

        updateGroupScore,
        clearGroupScore,
        updateKnockoutScore,
        clearKnockoutScore,
        updateTeamInfo,

        fillDemoData,
        resetScores,
        resetToDefault,
        exportData,
        importData,

        getTeamById,
        getChampion,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export function useTournament() {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
}
