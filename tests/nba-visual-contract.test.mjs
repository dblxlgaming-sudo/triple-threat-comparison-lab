import assert from 'node:assert/strict';
import { POSITIONS, MATCHUPS, ordinal, rankLabel, blankRankLabel } from '../src/nba-visual-contract.js';

assert.deepEqual(POSITIONS,['PG','SG','SF','PF','C']);
assert.ok(MATCHUPS.every(matchup=>matchup.players.length>0));
assert.equal(ordinal(1),'1st');
assert.equal(ordinal(2),'2nd');
assert.equal(ordinal(3),'3rd');
assert.equal(ordinal(11),'11th');
assert.equal(ordinal(12),'12th');
assert.equal(rankLabel(7,29),'7th of 29');
assert.equal(rankLabel(12,19),'12th of 19');
assert.equal(blankRankLabel(),'— of —');
assert.equal(rankLabel(null,29),'— of —');
console.log('nba-visual-contract tests passed');
