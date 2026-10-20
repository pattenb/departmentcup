import { Team, GroupMatch, KnockoutMatch, StandingsRow, SportType } from '../types/tournament';

/**
 * Calculates the standings table for a specific poule/group.
 */
export function calculateStandings(
  teams: Team[],
  matches: GroupMatch[],
  pouleId: string,
  sport: SportType
): StandingsRow[] {
  const pouleTeams = teams.filter((t) => t.pouleId === pouleId);
  const pouleMatches = matches.filter(
    (m) => m.pouleId === pouleId && m.completed && m.homeScore !== null && m.awayScore !== null
  );

  // Initialize stats map
  const statsMap = new Map<
    string,
    {
      team: Team;
      played: number;
      won: number;
      lost: number;
      goalsFor: number;
      goalsAgainst: number;
      points: number;
    }
  >();

  for (const team of pouleTeams) {
    statsMap.set(team.id, {
      team,
      played: 0,
      won: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    });
  }

  // Tally matches
  for (const match of pouleMatches) {
    const home = statsMap.get(match.homeTeamId);
    const away = statsMap.get(match.awayTeamId);
    if (!home || !away) continue;

    const hs = match.homeScore!;
    const as = match.awayScore!;

    // In this tournament, draws are strictly forbidden. If an invalid score with draw is entered, skip from points
    if (hs === as) continue;

    home.played += 1;
    away.played += 1;
    home.goalsFor += hs;
    home.goalsAgainst += as;
    away.goalsFor += as;
    away.goalsAgainst += hs;

    if (hs > as) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    }
  }

  // Convert to array and sort with tie-breakers
  const rows: StandingsRow[] = Array.from(statsMap.values()).map(({ team, played, won, lost, goalsFor, goalsAgainst, points }) => {
    return {
      teamId: team.id,
      teamName: team.name,
      lab: team.lab,
      player1: team.player1,
      player2: team.player2,
      email: team.email,
      pouleId,
      rank: 1,
      played,
      won,
      lost,
      goalsFor,
      goalsAgainst,
      goalDifference: goalsFor - goalsAgainst,
      points,
      status: 'eliminated',
    };
  });

  // Sort tie-breakers:
  // 1. Points (desc)
  // 2. Goal / Leg Difference (desc)
  // 3. In case of a draw, organisers decide what to do (alphabetical fallback for stable render)
  rows.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return a.teamName.localeCompare(b.teamName);
  });

  // Assign rank and status
  return rows.map((row, index) => {
    const rank = index + 1;
    let status: 'qualified' | 'potential_third' | 'eliminated' = 'eliminated';
    let statusLabel = 'Eliminated';

    if (sport === 'foosball') {
      if (rank <= 2) {
        status = 'qualified';
        statusLabel = `Top 2 (${pouleId}${rank})`;
      } else if (rank === 3) {
        status = 'potential_third';
        statusLabel = `3rd Place (${pouleId}3)`;
      }
    } else {
      // Darts: top 4 qualify from both groups
      if (rank <= 4) {
        status = 'qualified';
        statusLabel = `Qualified (${pouleId} #${rank})`;
      }
    }

    return {
      ...row,
      rank,
      status,
      statusLabel,
    };
  });
}

/**
 * Calculates Foosball Best 3rd Place comparison across Poule A, B, and C.
 */
export function calculateBestThirdPlace(
  standingsA: StandingsRow[],
  standingsB: StandingsRow[],
  standingsC: StandingsRow[]
): {
  thirdPlaceRows: StandingsRow[];
  qualifiedThirds: StandingsRow[];
  eliminatedThirds: StandingsRow[];
} {
  const thirdA = standingsA.find((r) => r.rank === 3);
  const thirdB = standingsB.find((r) => r.rank === 3);
  const thirdC = standingsC.find((r) => r.rank === 3);

  const thirdList: StandingsRow[] = [];
  if (thirdA) thirdList.push(thirdA);
  if (thirdB) thirdList.push(thirdB);
  if (thirdC) thirdList.push(thirdC);

  // Sort criteria:
  // 1. Points
  // 2. Goal Difference
  // 3. In case of a draw, organisers decide what to do
  thirdList.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return a.teamName.localeCompare(b.teamName);
  });

  // Top 2 qualify
  const qualifiedThirds = thirdList.slice(0, 2);
  const eliminatedThirds = thirdList.slice(2);

  return {
    thirdPlaceRows: thirdList,
    qualifiedThirds,
    eliminatedThirds,
  };
}

/**
 * Updates knockout matches with seeded teams from group standings and advances winners.
 */
export function syncFoosballKnockout(
  knockoutMatches: KnockoutMatch[],
  standingsA: StandingsRow[],
  standingsB: StandingsRow[],
  standingsC: StandingsRow[],
  bestThirds: StandingsRow[]
): KnockoutMatch[] {
  const a1 = standingsA.find((r) => r.rank === 1)?.teamId ?? null;
  const a2 = standingsA.find((r) => r.rank === 2)?.teamId ?? null;
  const b1 = standingsB.find((r) => r.rank === 1)?.teamId ?? null;
  const b2 = standingsB.find((r) => r.rank === 2)?.teamId ?? null;
  const c1 = standingsC.find((r) => r.rank === 1)?.teamId ?? null;
  const c2 = standingsC.find((r) => r.rank === 2)?.teamId ?? null;

  const best3rd_1 = bestThirds[0]?.teamId ?? null;
  const best3rd_2 = bestThirds[1]?.teamId ?? null;

  const updated = knockoutMatches.map((m) => ({ ...m }));

  // QF1: Poule A #1 vs Best 3rd #2
  const qf1 = updated.find((m) => m.id === 'fb_qf1');
  if (qf1) {
    qf1.homeTeamId = a1;
    qf1.awayTeamId = best3rd_2;
  }

  // QF2: Poule B #1 vs Poule C #2
  const qf2 = updated.find((m) => m.id === 'fb_qf2');
  if (qf2) {
    qf2.homeTeamId = b1;
    qf2.awayTeamId = c2;
  }

  // QF3: Poule C #1 vs Poule A #2
  const qf3 = updated.find((m) => m.id === 'fb_qf3');
  if (qf3) {
    qf3.homeTeamId = c1;
    qf3.awayTeamId = a2;
  }

  // QF4: Poule B #2 vs Best 3rd #1
  const qf4 = updated.find((m) => m.id === 'fb_qf4');
  if (qf4) {
    qf4.homeTeamId = b2;
    qf4.awayTeamId = best3rd_1;
  }

  // Resolve winners for QFs
  for (const qf of [qf1, qf2, qf3, qf4]) {
    if (qf && qf.completed && qf.homeScore !== null && qf.awayScore !== null && qf.homeScore !== qf.awayScore) {
      if (qf.homeScore > qf.awayScore) {
        qf.winnerId = qf.homeTeamId;
        qf.loserId = qf.awayTeamId;
      } else {
        qf.winnerId = qf.awayTeamId;
        qf.loserId = qf.homeTeamId;
      }
    } else if (qf) {
      qf.winnerId = null;
      qf.loserId = null;
    }
  }

  // SF1: Winner QF1 vs Winner QF2
  const sf1 = updated.find((m) => m.id === 'fb_sf1');
  if (sf1) {
    sf1.homeTeamId = qf1?.winnerId ?? null;
    sf1.awayTeamId = qf2?.winnerId ?? null;
    if (sf1.completed && sf1.homeScore !== null && sf1.awayScore !== null && sf1.homeScore !== sf1.awayScore) {
      sf1.winnerId = sf1.homeScore > sf1.awayScore ? sf1.homeTeamId : sf1.awayTeamId;
      sf1.loserId = sf1.homeScore > sf1.awayScore ? sf1.awayTeamId : sf1.homeTeamId;
    } else {
      sf1.winnerId = null;
      sf1.loserId = null;
    }
  }

  // SF2: Winner QF3 vs Winner QF4
  const sf2 = updated.find((m) => m.id === 'fb_sf2');
  if (sf2) {
    sf2.homeTeamId = qf3?.winnerId ?? null;
    sf2.awayTeamId = qf4?.winnerId ?? null;
    if (sf2.completed && sf2.homeScore !== null && sf2.awayScore !== null && sf2.homeScore !== sf2.awayScore) {
      sf2.winnerId = sf2.homeScore > sf2.awayScore ? sf2.homeTeamId : sf2.awayTeamId;
      sf2.loserId = sf2.homeScore > sf2.awayScore ? sf2.awayTeamId : sf2.homeTeamId;
    } else {
      sf2.winnerId = null;
      sf2.loserId = null;
    }
  }

  // 3rd Place Match: Loser SF1 vs Loser SF2
  const m3rd = updated.find((m) => m.id === 'fb_3rd');
  if (m3rd) {
    m3rd.homeTeamId = sf1?.loserId ?? null;
    m3rd.awayTeamId = sf2?.loserId ?? null;
    if (m3rd.completed && m3rd.homeScore !== null && m3rd.awayScore !== null && m3rd.homeScore !== m3rd.awayScore) {
      m3rd.winnerId = m3rd.homeScore > m3rd.awayScore ? m3rd.homeTeamId : m3rd.awayTeamId;
      m3rd.loserId = m3rd.homeScore > m3rd.awayScore ? m3rd.awayTeamId : m3rd.homeTeamId;
    } else {
      m3rd.winnerId = null;
      m3rd.loserId = null;
    }
  }

  // Grand Final: Winner SF1 vs Winner SF2
  const mFinal = updated.find((m) => m.id === 'fb_final');
  if (mFinal) {
    mFinal.homeTeamId = sf1?.winnerId ?? null;
    mFinal.awayTeamId = sf2?.winnerId ?? null;
    if (mFinal.completed && mFinal.homeScore !== null && mFinal.awayScore !== null && mFinal.homeScore !== mFinal.awayScore) {
      mFinal.winnerId = mFinal.homeScore > mFinal.awayScore ? mFinal.homeTeamId : mFinal.awayTeamId;
      mFinal.loserId = mFinal.homeScore > mFinal.awayScore ? mFinal.awayTeamId : mFinal.homeTeamId;
    } else {
      mFinal.winnerId = null;
      mFinal.loserId = null;
    }
  }

  return updated;
}

/**
 * Updates Darts knockout bracket with seeded teams:
 * QF1: Group 1 #1 vs Group 2 #4
 * QF2: Group 2 #2 vs Group 1 #3
 * QF3: Group 2 #1 vs Group 1 #4
 * QF4: Group 1 #2 vs Group 2 #3
 */
export function syncDartsKnockout(
  knockoutMatches: KnockoutMatch[],
  standingsG1: StandingsRow[],
  standingsG2: StandingsRow[]
): KnockoutMatch[] {
  const g1_1 = standingsG1.find((r) => r.rank === 1)?.teamId ?? null;
  const g1_2 = standingsG1.find((r) => r.rank === 2)?.teamId ?? null;
  const g1_3 = standingsG1.find((r) => r.rank === 3)?.teamId ?? null;
  const g1_4 = standingsG1.find((r) => r.rank === 4)?.teamId ?? null;

  const g2_1 = standingsG2.find((r) => r.rank === 1)?.teamId ?? null;
  const g2_2 = standingsG2.find((r) => r.rank === 2)?.teamId ?? null;
  const g2_3 = standingsG2.find((r) => r.rank === 3)?.teamId ?? null;
  const g2_4 = standingsG2.find((r) => r.rank === 4)?.teamId ?? null;

  const updated = knockoutMatches.map((m) => ({ ...m }));

  // QF1: Group 1 #1 vs Group 2 #4
  const qf1 = updated.find((m) => m.id === 'dt_qf1');
  if (qf1) {
    qf1.homeTeamId = g1_1;
    qf1.awayTeamId = g2_4;
  }

  // QF2: Group 2 #2 vs Group 1 #3
  const qf2 = updated.find((m) => m.id === 'dt_qf2');
  if (qf2) {
    qf2.homeTeamId = g2_2;
    qf2.awayTeamId = g1_3;
  }

  // QF3: Group 2 #1 vs Group 1 #4
  const qf3 = updated.find((m) => m.id === 'dt_qf3');
  if (qf3) {
    qf3.homeTeamId = g2_1;
    qf3.awayTeamId = g1_4;
  }

  // QF4: Group 1 #2 vs Group 2 #3
  const qf4 = updated.find((m) => m.id === 'dt_qf4');
  if (qf4) {
    qf4.homeTeamId = g1_2;
    qf4.awayTeamId = g2_3;
  }

  // Resolve winners for QFs
  for (const qf of [qf1, qf2, qf3, qf4]) {
    if (qf && qf.completed && qf.homeScore !== null && qf.awayScore !== null && qf.homeScore !== qf.awayScore) {
      if (qf.homeScore > qf.awayScore) {
        qf.winnerId = qf.homeTeamId;
        qf.loserId = qf.awayTeamId;
      } else {
        qf.winnerId = qf.awayTeamId;
        qf.loserId = qf.homeTeamId;
      }
    } else if (qf) {
      qf.winnerId = null;
      qf.loserId = null;
    }
  }

  // SF1: Winner QF1 vs Winner QF2
  const sf1 = updated.find((m) => m.id === 'dt_sf1');
  if (sf1) {
    sf1.homeTeamId = qf1?.winnerId ?? null;
    sf1.awayTeamId = qf2?.winnerId ?? null;
    if (sf1.completed && sf1.homeScore !== null && sf1.awayScore !== null && sf1.homeScore !== sf1.awayScore) {
      sf1.winnerId = sf1.homeScore > sf1.awayScore ? sf1.homeTeamId : sf1.awayTeamId;
      sf1.loserId = sf1.homeScore > sf1.awayScore ? sf1.awayTeamId : sf1.homeTeamId;
    } else {
      sf1.winnerId = null;
      sf1.loserId = null;
    }
  }

  // SF2: Winner QF3 vs Winner QF4
  const sf2 = updated.find((m) => m.id === 'dt_sf2');
  if (sf2) {
    sf2.homeTeamId = qf3?.winnerId ?? null;
    sf2.awayTeamId = qf4?.winnerId ?? null;
    if (sf2.completed && sf2.homeScore !== null && sf2.awayScore !== null && sf2.homeScore !== sf2.awayScore) {
      sf2.winnerId = sf2.homeScore > sf2.awayScore ? sf2.homeTeamId : sf2.awayTeamId;
      sf2.loserId = sf2.homeScore > sf2.awayScore ? sf2.awayTeamId : sf2.homeTeamId;
    } else {
      sf2.winnerId = null;
      sf2.loserId = null;
    }
  }

  // 3rd Place: Loser SF1 vs Loser SF2
  const m3rd = updated.find((m) => m.id === 'dt_3rd');
  if (m3rd) {
    m3rd.homeTeamId = sf1?.loserId ?? null;
    m3rd.awayTeamId = sf2?.loserId ?? null;
    if (m3rd.completed && m3rd.homeScore !== null && m3rd.awayScore !== null && m3rd.homeScore !== m3rd.awayScore) {
      m3rd.winnerId = m3rd.homeScore > m3rd.awayScore ? m3rd.homeTeamId : m3rd.awayTeamId;
      m3rd.loserId = m3rd.homeScore > m3rd.awayScore ? m3rd.awayTeamId : m3rd.homeTeamId;
    } else {
      m3rd.winnerId = null;
      m3rd.loserId = null;
    }
  }

  // Grand Final: Winner SF1 vs Winner SF2
  const mFinal = updated.find((m) => m.id === 'dt_final');
  if (mFinal) {
    mFinal.homeTeamId = sf1?.winnerId ?? null;
    mFinal.awayTeamId = sf2?.winnerId ?? null;
    if (mFinal.completed && mFinal.homeScore !== null && mFinal.awayScore !== null && mFinal.homeScore !== mFinal.awayScore) {
      mFinal.winnerId = mFinal.homeScore > mFinal.awayScore ? mFinal.homeTeamId : mFinal.awayTeamId;
      mFinal.loserId = mFinal.homeScore > mFinal.awayScore ? mFinal.awayTeamId : mFinal.homeTeamId;
    } else {
      mFinal.winnerId = null;
      mFinal.loserId = null;
    }
  }

  return updated;
}

/**
 * Generates sample match scores for testing and demo purposes.
 * Ensures NO draws, realistic scores, and a completed group stage + knockout stage.
 */
export function generateSampleData(
  sport: SportType,
  matches: GroupMatch[],
  teams: Team[],
  knockoutMatches: KnockoutMatch[]
): {
  groupMatches: GroupMatch[];
  knockoutMatches: KnockoutMatch[];
} {
  // Realistic foosball scores (typically first to 10 goals)
  const foosballScorePairs = [
    [10, 7], [10, 4], [10, 8], [8, 10], [5, 10],
    [10, 9], [9, 10], [10, 6], [10, 3], [6, 10],
    [10, 5], [7, 10], [10, 2], [10, 8], [4, 10],
  ];

  // Realistic darts scores (legs, typically best of 3 or 5: 3-1, 3-2, 2-0, etc.)
  const dartsScorePairs = [
    [3, 1], [3, 0], [2, 3], [3, 2], [1, 3],
    [3, 1], [0, 3], [3, 2], [2, 3], [3, 0],
    [3, 1], [1, 3], [3, 2], [3, 0], [2, 3],
    [3, 1], [3, 2], [1, 3], [3, 0], [0, 3],
    [3, 1],
  ];

  const pairs = sport === 'foosball' ? foosballScorePairs : dartsScorePairs;

  // Fill group matches with deterministic variety based on match index
  const newGroupMatches = matches.map((m, idx) => {
    const pair = pairs[idx % pairs.length];
    // Slightly favor teams by seed to make standings realistic
    const homeTeam = teams.find((t) => t.id === m.homeTeamId);
    const awayTeam = teams.find((t) => t.id === m.awayTeamId);

    let hs = pair[0];
    let as = pair[1];

    if (homeTeam && awayTeam) {
      if (homeTeam.seed < awayTeam.seed && hs < as) {
        // Swap to make higher seed win slightly more often
        const temp = hs;
        hs = as;
        as = temp;
      }
    }

    // Ensure strictly no draw
    if (hs === as) {
      hs += 1;
    }

    return {
      ...m,
      homeScore: hs,
      awayScore: as,
      completed: true,
    };
  });

  // Recompute standings
  let updatedKnockout: KnockoutMatch[] = [];

  if (sport === 'foosball') {
    const stA = calculateStandings(teams, newGroupMatches, 'A', 'foosball');
    const stB = calculateStandings(teams, newGroupMatches, 'B', 'foosball');
    const stC = calculateStandings(teams, newGroupMatches, 'C', 'foosball');
    const { qualifiedThirds } = calculateBestThirdPlace(stA, stB, stC);

    updatedKnockout = syncFoosballKnockout(knockoutMatches, stA, stB, stC, qualifiedThirds);

    // Fill QF scores
    for (const qf of updatedKnockout.filter((m) => m.round === 'quarter')) {
      qf.homeScore = 10;
      qf.awayScore = 8;
      qf.completed = true;
    }

    // Sync SF
    updatedKnockout = syncFoosballKnockout(updatedKnockout, stA, stB, stC, qualifiedThirds);

    // Fill SF scores
    for (const sf of updatedKnockout.filter((m) => m.round === 'semi')) {
      sf.homeScore = sf.matchNumber === 1 ? 10 : 7;
      sf.awayScore = sf.matchNumber === 1 ? 6 : 10;
      sf.completed = true;
    }

    // Sync Finals
    updatedKnockout = syncFoosballKnockout(updatedKnockout, stA, stB, stC, qualifiedThirds);

    // Fill 3rd place and Final
    const m3rd = updatedKnockout.find((m) => m.round === 'third_place');
    if (m3rd) {
      m3rd.homeScore = 10;
      m3rd.awayScore = 9;
      m3rd.completed = true;
    }

    const mFinal = updatedKnockout.find((m) => m.round === 'final');
    if (mFinal) {
      mFinal.homeScore = 10;
      mFinal.awayScore = 8;
      mFinal.completed = true;
    }

    updatedKnockout = syncFoosballKnockout(updatedKnockout, stA, stB, stC, qualifiedThirds);
  } else {
    const stG1 = calculateStandings(teams, newGroupMatches, 'G1', 'darts');
    const stG2 = calculateStandings(teams, newGroupMatches, 'G2', 'darts');

    updatedKnockout = syncDartsKnockout(knockoutMatches, stG1, stG2);

    // Fill QF scores
    for (const qf of updatedKnockout.filter((m) => m.round === 'quarter')) {
      qf.homeScore = 3;
      qf.awayScore = qf.matchNumber % 2 === 0 ? 1 : 2;
      qf.completed = true;
    }

    updatedKnockout = syncDartsKnockout(updatedKnockout, stG1, stG2);

    for (const sf of updatedKnockout.filter((m) => m.round === 'semi')) {
      sf.homeScore = sf.matchNumber === 1 ? 3 : 1;
      sf.awayScore = sf.matchNumber === 1 ? 2 : 3;
      sf.completed = true;
    }

    updatedKnockout = syncDartsKnockout(updatedKnockout, stG1, stG2);

    const m3rd = updatedKnockout.find((m) => m.round === 'third_place');
    if (m3rd) {
      m3rd.homeScore = 3;
      m3rd.awayScore = 2;
      m3rd.completed = true;
    }

    const mFinal = updatedKnockout.find((m) => m.round === 'final');
    if (mFinal) {
      mFinal.homeScore = 3;
      mFinal.awayScore = 1;
      mFinal.completed = true;
    }

    updatedKnockout = syncDartsKnockout(updatedKnockout, stG1, stG2);
  }

  return {
    groupMatches: newGroupMatches,
    knockoutMatches: updatedKnockout,
  };
}
