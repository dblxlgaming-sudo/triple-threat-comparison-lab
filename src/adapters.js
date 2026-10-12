import { tennis, wnba } from './fixtures.js';

/**
 * NORMALIZED UI CONTRACT
 *
 * Production adapters should return these shapes. They should map authoritative
 * existing contracts; they must not invent missing data or recalculate model output.
 *
 * TennisComparisonData:
 * { players[], metricsByPlayerId, meetings[] }
 * meetings: { surface,event,date,winner,score,stats }
 *
 * WnbaPlayerComparisonData:
 * { players[], teams[], geography[], playTypes[], defense[] }
 * geography: [zone, sharePct, opponentDefenseRank, matchup]
 * playTypes: [type, usagePct, opponentDefenseRank|null, matchup]
 * defense: [label, value|string, rank]
 *
 * WnbaTeamComparisonData:
 * { teams[], geography[], playTypes[], teamProfile[], h2hTrends[] }
 * teamProfile: [metric, offenseValue, defenseValue, matchup]
 * h2hTrends: [metric, leftH2hAverage, rightH2hAverage]
 */

export function loadTennisComparison({surface='All', window='Season'}={}) {
  const meetings = surface === 'All' ? tennis.meetings : tennis.meetings.filter(m => m.surface === surface);
  // Fixture metrics are intentionally static. A production adapter should select
  // authoritative split/window aggregates before returning metricsByPlayerId.
  return { players:tennis.players, metricsByPlayerId:tennis.metrics, meetings, surface, window };
}

export function loadWnbaPlayerComparison({market='PTS', location='All', window='Season'}={}) {
  return { players:wnba.players, teams:wnba.teams, geography:wnba.geography, playTypes:wnba.playTypes, defense:wnba.defense, market, location, window };
}

export function loadWnbaTeamComparison({location='All', window='Season'}={}) {
  return { teams:wnba.teams, geography:wnba.teamGeography, playTypes:wnba.teamPlayTypes, teamProfile:wnba.teamProfile, h2hTrends:wnba.h2hTrends, location, window, qualifyingMeetings:3, seasonLabel:'2026' };
}
