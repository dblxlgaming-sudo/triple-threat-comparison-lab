import assert from 'node:assert/strict';
import { normalizeTennisH2H, resolveAuthoritativeWinner } from '../src/tennis-h2h-contract.js';

const rows = [
  {
    MatchID: 'TT2-789D0AB74A49786E',
    Date: '2026-01-12',
    Player: 'Katarzyna Kawa',
    Opponent: 'Daria Snigur',
    Surface: 'Hard',
    Tournament: 'Australian Open',
    FinalScore: '1-6 6-2 2-6',
    Result: 'L',
    Source: 'V2 Raw Match Log historical result'
  },
  {
    MatchID: 'TT2-A0F2B6AC317B1153',
    Date: '2026-09-29',
    Player: 'Daria Snigur',
    Opponent: 'Katarzyna Kawa',
    Surface: 'Hard',
    Tournament: 'Beijing',
    FinalScore: '3-6 6-4 7-5',
    Result: 'W',
    Source: 'V2 Raw Match Log historical result'
  },
  {
    MatchID: 'TT2-A0F2B6AC317B1153',
    Date: '2026-09-29',
    Player: 'Katarzyna Kawa',
    Opponent: 'Daria Snigur',
    Surface: 'Hard',
    Tournament: 'Beijing',
    FinalScore: '6-3 4-6 5-7',
    Result: 'L',
    Source: 'V2 Raw Match Log historical result'
  }
];

const meetings = normalizeTennisH2H(rows, 'Daria Snigur', 'Katarzyna Kawa');
assert.equal(meetings.length, 2);

const australianOpen = meetings.find(meeting => meeting.event === 'Australian Open');
assert.equal(australianOpen.date, '2026-01-12');
assert.equal(australianOpen.winner, 'Daria Snigur');
assert.equal(australianOpen.availability.date, 'available');
assert.equal(australianOpen.availability.winner, 'available');
assert.equal(australianOpen.provenance.source, 'V2 Raw Match Log historical result');

const beijing = meetings.find(meeting => meeting.event === 'Beijing');
assert.equal(beijing.date, '2026-09-29');
assert.equal(beijing.winner, 'Daria Snigur');
assert.equal(beijing.provenance.rowCount, 2);

assert.equal(
  resolveAuthoritativeWinner([{Player:'Daria Snigur',Opponent:'Katarzyna Kawa',FinalScore:'6-0 6-0'}], 'Daria Snigur', 'Katarzyna Kawa'),
  '',
  'score orientation must never be used to infer a winner'
);

const unavailable = normalizeTennisH2H([{
  MatchID:'missing-metadata', Player:'Daria Snigur', Opponent:'Katarzyna Kawa', Tournament:'Unknown', FinalScore:'6-0 6-0'
}], 'Daria Snigur', 'Katarzyna Kawa')[0];
assert.equal(unavailable.date, 'Date unavailable');
assert.equal(unavailable.winner, 'Winner unavailable');
assert.equal(unavailable.availability.date, 'unavailable');
assert.equal(unavailable.availability.winner, 'unavailable');

console.log('tennis-h2h-contract tests passed');

