export type SportType = 'foosball' | 'darts';

export interface Team {
  id: string;
  name: string;
  lab?: string;
  pouleId: string; // 'A' | 'B' | 'C' for foosball; 'G1' | 'G2' for darts
  seed: number;
  player1?: string;
  player2?: string;
  email?: string;
}

export interface MatchScore {
  homeScore: number | null;
  awayScore: number | null;
  completed: boolean;
}

export interface GroupMatch {
  id: string;
  sport: SportType;
  pouleId: string;
  round: number;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  completed: boolean;
}

export interface StandingsRow {
  teamId: string;
  teamName: string;
  lab?: string;
  player1?: string;
  player2?: string;
  email?: string;
  pouleId: string;
  rank: number;
  played: number;
  won: number;
  lost: number;
  goalsFor: number;      // Or legs for in Darts
  goalsAgainst: number;  // Or legs against in Darts
  goalDifference: number;
  points: number;
  status: 'qualified' | 'potential_third' | 'eliminated';
  statusLabel?: string;
}

export interface KnockoutMatch {
  id: string;
  sport: SportType;
  round: 'quarter' | 'semi' | 'third_place' | 'final';
  matchNumber: number; // 1-4 for QF, 1-2 for SF, 1 for Final, 1 for 3rd
  title: string;
  homeTeamId: string | null;
  awayTeamId: string | null;
  homePlaceholder: string;
  awayPlaceholder: string;
  homeScore: number | null;
  awayScore: number | null;
  winnerId: string | null;
  loserId: string | null;
  completed: boolean;
}

export interface SportTournamentState {
  teams: Team[];
  groupMatches: GroupMatch[];
  knockoutMatches: KnockoutMatch[];
}

export interface TournamentStore {
  foosball: SportTournamentState;
  darts: SportTournamentState;
}
