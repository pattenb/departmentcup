import { Team, GroupMatch, KnockoutMatch, SportType } from '../types/tournament';

export const DEFAULT_FOOSBALL_TEAMS: Team[] = [
  // Group A (6 teams)
  { id: 'f_a1', name: 'Kicking bags', player1: 'Tom Cardoen', player2: 'Pouria Khodabakhsh', email: 'tom.cardoen@ugent.be', pouleId: 'A', seed: 1 },
  { id: 'f_a2', name: 'Xray-Master Idiots (XMI)', player1: 'Thomas Healy', player2: 'Ellen De Lentdecker', email: 'thomas.healy@ugent.be', pouleId: 'A', seed: 2 },
  { id: 'f_a3', name: 'Bram & Filippo', player1: 'Bram', player2: 'Filippo', email: 'Bramsmet.desmet@ugent.be', pouleId: 'A', seed: 3 },
  { id: 'f_a4', name: 'Team Britney', player1: 'Pieter-Jan Covens', player2: 'Emiel Vanden Berghe', email: 'pieterjan.covens@ugent.be', pouleId: 'A', seed: 4 },
  { id: 'f_a5', name: 'De Brugse Beren', player1: 'Jordi Jaenen', player2: 'Stijn Germonpré', email: 'jordi.jaenen@ugent.be', pouleId: 'A', seed: 5 },
  { id: 'f_a6', name: 'BEPT', player1: 'Grim Herregodts', player2: 'Jorge Alves Anjos', email: 'grim.herregodts@ugent.be', pouleId: 'A', seed: 6 },

  // Group B (6 teams)
  { id: 'f_b1', name: 'Masonic Lodge P2', player1: 'Lorenzo Rodighiero', player2: 'Paola La Magna', email: 'lorenzo.rodighiero@ugent.be', pouleId: 'B', seed: 1 },
  { id: 'f_b2', name: 'Wasabi Warriors', player1: 'pierre van bocxstaele', player2: 'Philippe Green', email: 'pierre.vanbocxstaele@ugent.be', pouleId: 'B', seed: 2 },
  { id: 'f_b3', name: 'Ihar & Pat', player1: 'Ihar Mikhnavets', player2: 'Pat Borra', email: 'Pat.borra@ugent.be', pouleId: 'B', seed: 3 },
  { id: 'f_b4', name: 'Francine', player1: 'Francis Bru', player2: 'Pauline Rooms', email: 'francis.bru@ugent.be', pouleId: 'B', seed: 4 },
  { id: 'f_b5', name: 'Safe Return', player1: 'Ruben Van der Stichelen', player2: 'Guillaume Acke', email: 'ruben.vanderstichelen@ugent.be', pouleId: 'B', seed: 5 },
  { id: 'f_b6', name: 'Hot Plasma Party', player1: 'Tom Van Helden', player2: 'Thibaut Van Acker', email: 'tom.vanhelden@ugent.be', pouleId: 'B', seed: 6 },

  // Group C (6 teams)
  { id: 'f_c1', name: 'Jing & Zofia', player1: 'Jing Bai', player2: 'Zofia', email: 'zofia.petryna@ugent.be', pouleId: 'C', seed: 1 },
  { id: 'f_c2', name: 'Pure Class, Naturally', player1: 'Wiebe Volckaert', player2: 'Luca Giordano', email: 'wiebe.volckaert@ugent.be', pouleId: 'C', seed: 2 },
  { id: 'f_c3', name: 'Dark Polo Gent', player1: 'Tommaso Ruggiero', player2: 'Gianluca Carì', email: 'tommaso.ruggiero@ugent.be', pouleId: 'C', seed: 3 },
  { id: 'f_c4', name: 'The balding boys', player1: 'Kobe Scherpereel', player2: 'Tijs Vandenneucker', email: 'kobe.scherpereel@ugent.be', pouleId: 'C', seed: 4 },
  { id: 'f_c5', name: 'Bend it like Frank', player1: 'Mathias Vandermeiren', player2: 'Teun Vandenhaute', email: 'mathias.vandermeiren@ugent.be', pouleId: 'C', seed: 5 },
  { id: 'f_c6', name: 'Mean Girls', player1: 'Óscar', player2: 'Eline', email: 'Oscar.AldazTrenc@ugent.be', pouleId: 'C', seed: 6 },
];

export const DEFAULT_DARTS_TEAMS: Team[] = [
  // Group A (Group 1 - 6 players)
  { id: 'd_g1_1', name: 'Jan Matthys', player1: 'Jan Matthys', email: 'jmatthy.matthys@ugent.be', pouleId: 'G1', seed: 1 },
  { id: 'd_g1_2', name: 'Thibaut Van Acker', player1: 'Thibaut Van Acker', email: 'Thibaut.VanAcker@UGent.be', pouleId: 'G1', seed: 2 },
  { id: 'd_g1_3', name: 'Kobe Scherpereel', player1: 'Kobe Scherpereel', email: 'kobe.scherpereel@ugent.be', pouleId: 'G1', seed: 3 },
  { id: 'd_g1_4', name: 'Goutam Ghosh', player1: 'Goutam Ghosh', email: 'Goutam.Ghosh@Ugent.be', pouleId: 'G1', seed: 4 },
  { id: 'd_g1_5', name: 'Tom Cardoen', player1: 'Tom Cardoen', email: 'tom.cardoen@ugent.be', pouleId: 'G1', seed: 5 },
  { id: 'd_g1_6', name: 'Ilyas Maulana Yahya', player1: 'Ilyas Maulana Yahya', email: 'ilyasmaulana.yahya@ugent.be', pouleId: 'G1', seed: 6 },

  // Group B (Group 2 - 5 players)
  { id: 'd_g2_1', name: 'Patman', player1: 'Patman', email: 'Pat.borra@ugent.be', pouleId: 'G2', seed: 1 },
  { id: 'd_g2_2', name: 'Thibaut Baert', player1: 'Thibaut Baert', email: 'thibaut.baert@ugent.be', pouleId: 'G2', seed: 2 },
  { id: 'd_g2_3', name: 'Luca Zanotto', player1: 'Luca Zanotto', email: 'luca.zanotto@ugent.be', pouleId: 'G2', seed: 3 },
  { id: 'd_g2_4', name: 'Tijs Vandenneucker', player1: 'Tijs Vandenneucker', email: 'Tijs.vandenneucker@UGent.be', pouleId: 'G2', seed: 4 },
  { id: 'd_g2_5', name: 'Jasper Herthogs', player1: 'Jasper Herthogs', email: 'jasper.herthogs@ugent.be', pouleId: 'G2', seed: 5 },
];

/**
 * Generate round robin fixtures using the standard Berger rotation algorithm.
 */
export function generateRoundRobinMatches(
  teams: Team[],
  sport: SportType,
  pouleId: string
): GroupMatch[] {
  const pouleTeams = teams.filter((t) => t.pouleId === pouleId);
  const n = pouleTeams.length;
  if (n < 2) return [];

  const teamList = [...pouleTeams];
  // If odd, add a dummy bye marker
  const hasBye = n % 2 !== 0;
  if (hasBye) {
    teamList.push({
      id: '__bye__',
      name: 'BYE',
      pouleId,
      seed: 99,
    });
  }

  const totalTeams = teamList.length;
  const totalRounds = totalTeams - 1;
  const matchesPerRound = totalTeams / 2;
  const matches: GroupMatch[] = [];

  // Working array of indices
  const indices = teamList.map((_, i) => i);

  let matchIndex = 1;
  for (let round = 0; round < totalRounds; round++) {
    for (let m = 0; m < matchesPerRound; m++) {
      const homeIdx = indices[m];
      const awayIdx = indices[totalTeams - 1 - m];

      const homeTeam = teamList[homeIdx];
      const awayTeam = teamList[awayIdx];

      // Skip bye match
      if (homeTeam.id === '__bye__' || awayTeam.id === '__bye__') {
        continue;
      }

      // Alternate home/away slightly each round for fairness
      const isSwapped = (round + m) % 2 === 1;
      const actualHome = isSwapped ? awayTeam : homeTeam;
      const actualAway = isSwapped ? homeTeam : awayTeam;

      matches.push({
        id: `${sport}_${pouleId}_m${matchIndex++}`,
        sport,
        pouleId,
        round: round + 1,
        homeTeamId: actualHome.id,
        awayTeamId: actualAway.id,
        homeScore: null,
        awayScore: null,
        completed: false,
      });
    }

    // Rotate array: keep index 0 fixed, rotate others
    const last = indices.pop()!;
    indices.splice(1, 0, last);
  }

  return matches;
}

export function createInitialKnockoutMatches(sport: SportType): KnockoutMatch[] {
  if (sport === 'foosball') {
    return [
      {
        id: 'fb_qf1',
        sport: 'foosball',
        round: 'quarter',
        matchNumber: 1,
        title: 'Quarter-Final 1',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Poule A #1',
        awayPlaceholder: 'Best 3rd #2',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'fb_qf2',
        sport: 'foosball',
        round: 'quarter',
        matchNumber: 2,
        title: 'Quarter-Final 2',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Poule B #1',
        awayPlaceholder: 'Poule C #2',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'fb_qf3',
        sport: 'foosball',
        round: 'quarter',
        matchNumber: 3,
        title: 'Quarter-Final 3',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Poule C #1',
        awayPlaceholder: 'Poule A #2',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'fb_qf4',
        sport: 'foosball',
        round: 'quarter',
        matchNumber: 4,
        title: 'Quarter-Final 4',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Poule B #2',
        awayPlaceholder: 'Best 3rd #1',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'fb_sf1',
        sport: 'foosball',
        round: 'semi',
        matchNumber: 1,
        title: 'Semi-Final 1',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Winner QF1',
        awayPlaceholder: 'Winner QF2',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'fb_sf2',
        sport: 'foosball',
        round: 'semi',
        matchNumber: 2,
        title: 'Semi-Final 2',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Winner QF3',
        awayPlaceholder: 'Winner QF4',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'fb_3rd',
        sport: 'foosball',
        round: 'third_place',
        matchNumber: 1,
        title: '3rd Place Match',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Loser SF1',
        awayPlaceholder: 'Loser SF2',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'fb_final',
        sport: 'foosball',
        round: 'final',
        matchNumber: 1,
        title: 'Grand Final',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Winner SF1',
        awayPlaceholder: 'Winner SF2',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
    ];
  } else {
    // Darts knockout seeded as requested:
    // QF1: Group 1 #1 vs Group 2 #4
    // QF2: Group 2 #2 vs Group 1 #3
    // QF3: Group 2 #1 vs Group 1 #4
    // QF4: Group 1 #2 vs Group 2 #3
    return [
      {
        id: 'dt_qf1',
        sport: 'darts',
        round: 'quarter',
        matchNumber: 1,
        title: 'Quarter-Final 1',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Group 1 #1',
        awayPlaceholder: 'Group 2 #4',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'dt_qf2',
        sport: 'darts',
        round: 'quarter',
        matchNumber: 2,
        title: 'Quarter-Final 2',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Group 2 #2',
        awayPlaceholder: 'Group 1 #3',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'dt_qf3',
        sport: 'darts',
        round: 'quarter',
        matchNumber: 3,
        title: 'Quarter-Final 3',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Group 2 #1',
        awayPlaceholder: 'Group 1 #4',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'dt_qf4',
        sport: 'darts',
        round: 'quarter',
        matchNumber: 4,
        title: 'Quarter-Final 4',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Group 1 #2',
        awayPlaceholder: 'Group 2 #3',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'dt_sf1',
        sport: 'darts',
        round: 'semi',
        matchNumber: 1,
        title: 'Semi-Final 1',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Winner QF1',
        awayPlaceholder: 'Winner QF2',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'dt_sf2',
        sport: 'darts',
        round: 'semi',
        matchNumber: 2,
        title: 'Semi-Final 2',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Winner QF3',
        awayPlaceholder: 'Winner QF4',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'dt_3rd',
        sport: 'darts',
        round: 'third_place',
        matchNumber: 1,
        title: '3rd Place Match',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Loser SF1',
        awayPlaceholder: 'Loser SF2',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
      {
        id: 'dt_final',
        sport: 'darts',
        round: 'final',
        matchNumber: 1,
        title: 'Grand Final',
        homeTeamId: null,
        awayTeamId: null,
        homePlaceholder: 'Winner SF1',
        awayPlaceholder: 'Winner SF2',
        homeScore: null,
        awayScore: null,
        winnerId: null,
        loserId: null,
        completed: false,
      },
    ];
  }
}
