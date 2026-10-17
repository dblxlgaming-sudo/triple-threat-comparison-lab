const TEXT_UNAVAILABLE = Object.freeze({
  date: 'Date unavailable',
  winner: 'Winner unavailable',
  event: 'Tournament unavailable',
  score: 'Score unavailable'
});

function text(value) {
  return value == null ? '' : String(value).trim();
}

function firstText(rows, fields) {
  for (const row of rows) {
    for (const field of fields) {
      const value = text(row?.[field]);
      if (value) return value;
    }
  }
  return '';
}

function isPairName(name, leftPlayer, rightPlayer) {
  return name === leftPlayer || name === rightPlayer;
}

/**
 * Resolve a winner only from the authoritative Result relation.
 * Score text is deliberately never parsed or used as a winner signal.
 */
export function resolveAuthoritativeWinner(rows, leftPlayer, rightPlayer) {
  const candidates = new Set();

  for (const row of rows) {
    const player = text(row?.Player);
    const opponent = text(row?.Opponent);
    const result = text(row?.Result).toUpperCase();
    if (!isPairName(player, leftPlayer, rightPlayer) ||
        !isPairName(opponent, leftPlayer, rightPlayer) ||
        player === opponent) continue;

    if (result === 'W') candidates.add(player);
    if (result === 'L') candidates.add(opponent);
  }

  return candidates.size === 1 ? [...candidates][0] : '';
}

function meetingKey(row, index) {
  const matchId = firstText([row], ['MatchID', 'match_id', 'EventID']);
  if (matchId) return `id:${matchId}`;
  const date = firstText([row], ['Date', 'MatchDate', 'date']);
  const event = firstText([row], ['Tournament', 'Event', 'event']);
  return date || event ? `fallback:${date}|${event}` : `row:${index}`;
}

/**
 * Normalize Tennis V2 player-stat rows into Comparison Lab H2H meetings.
 * The published V2 contract uses Date (not MatchDate). Missing values remain
 * explicitly unavailable and carry source/availability metadata for disclosure.
 */
export function normalizeTennisH2H(rows, leftPlayer, rightPlayer) {
  const pairRows = (Array.isArray(rows) ? rows : []).filter(row => {
    const player = text(row?.Player);
    const opponent = text(row?.Opponent);
    return (player === leftPlayer && opponent === rightPlayer) ||
      (player === rightPlayer && opponent === leftPlayer);
  });

  const groups = new Map();
  pairRows.forEach((row, index) => {
    const key = meetingKey(row, index);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  });

  return [...groups.entries()].map(([key, matchRows]) => {
    const date = firstText(matchRows, ['Date', 'MatchDate', 'date']);
    const winner = resolveAuthoritativeWinner(matchRows, leftPlayer, rightPlayer);
    const event = firstText(matchRows, ['Tournament', 'Event', 'event']);
    const score = firstText(matchRows, ['FinalScore', 'Score', 'score']);
    const source = firstText(matchRows, ['Source', 'source']);
    const sourceVersion = firstText(matchRows, ['SourceVersion', 'source_version']);

    return {
      matchId: key.startsWith('id:') ? key.slice(3) : null,
      surface: firstText(matchRows, ['Surface', 'surface']) || null,
      event: event || TEXT_UNAVAILABLE.event,
      date: date || TEXT_UNAVAILABLE.date,
      winner: winner || TEXT_UNAVAILABLE.winner,
      score: score || TEXT_UNAVAILABLE.score,
      availability: {
        date: date ? 'available' : 'unavailable',
        winner: winner ? 'available' : 'unavailable'
      },
      provenance: {
        source: source || null,
        sourceVersion: sourceVersion || null,
        rowCount: matchRows.length
      },
      rows: matchRows
    };
  });
}

