import assert from 'node:assert/strict';
import {normalizeFineZoneContract} from '../src/wnba-zone-contract.js';

const zones=['RESTRICTED_AREA','PAINT','MID_RANGE','CORNER_THREE','ABOVE_THE_BREAK_THREE'];
const metrics=['offense_shot_share','offense_field_goal_pct','opponent_field_goal_pct_allowed','opponent_field_goal_pct_allowed_rank'];
const rows=zones.flatMap((zone,zoneIndex)=>metrics.map((metric,metricIndex)=>({EventID:'evt-1',OffenseTeamID:'10',DefenseTeamID:'20',OffenseTeam:'Offense',DefenseTeam:'Defense',ZoneName:zone,MetricName:metric,MetricValue:metric.endsWith('_rank')?String(zoneIndex+1):String(.1+(metricIndex/10)),Unit:metric.endsWith('_rank')?'RANK':'PROPORTION',AvailabilityState:'AVAILABLE',Source:'official',SourceVersion:'v1'})));
rows.find(row=>row.ZoneName==='MID_RANGE'&&row.MetricName==='offense_field_goal_pct').AvailabilityState='UNAVAILABLE';
rows.find(row=>row.ZoneName==='MID_RANGE'&&row.MetricName==='offense_field_goal_pct').AvailabilityReason='Suppressed upstream';

const [matchup]=normalizeFineZoneContract(rows);
assert.equal(matchup.key,'evt-1|10|20');
assert.deepEqual(matchup.zones.map(zone=>zone.id),zones);
assert.equal(matchup.zones.find(zone=>zone.id==='CORNER_THREE').label,'Corner 3');
assert.equal(matchup.zones.filter(zone=>zone.id.includes('CORNER')).length,1);
assert.equal(matchup.zones.find(zone=>zone.id==='MID_RANGE').offenseFieldGoalPct.value,null);
assert.equal(matchup.zones.find(zone=>zone.id==='MID_RANGE').offenseFieldGoalPct.reason,'Suppressed upstream');
assert.equal(matchup.zones[0].opponentFieldGoalPctAllowedRank.value,1);
console.log('WNBA fine-zone contract adapter tests passed');
