# WNBA Fine-Zone Court — Site Integration Handoff

## Completed behavior

The WNBA **Teams** court consumes the published long-form CSV contract from:

`/api/research/wnba/matchup-zones/current`

Rows are joined only by the composite key:

`EventID + OffenseTeamID + DefenseTeamID`

The court accepts exactly these five supplied zones:

- `RESTRICTED_AREA`
- `PAINT`
- `MID_RANGE`
- `CORNER_THREE`
- `ABOVE_THE_BREAK_THREE`

It accepts exactly these four metrics per zone:

- `offense_shot_share`
- `offense_field_goal_pct`
- `opponent_field_goal_pct_allowed`
- `opponent_field_goal_pct_allowed_rank`

`CORNER_THREE` remains one combined zone. The UI does not split it into left/right values. The adapter does not calculate player distributions or matchup classifications.

## Files to integrate

- `src/wnba-zone-contract.js` — CSV parsing, strict filtering, composite-key grouping, availability and provenance preservation.
- `src/app.js` — team matchup selection, five-zone court/table rendering, unavailable states, provenance disclosure.
- `styles.css` — authoritative fine-zone table, court, provenance, and responsive presentation.

## Triple Threat host requirements

1. Serve these files inside the authenticated member route at `/research/comparison-lab/`.
2. Keep the API request same-origin so the existing member session authorizes `/api/research/wnba/matchup-zones/current`.
3. Do not proxy this contract to a public unauthenticated origin.
4. Preserve the API's `AvailabilityState`, `AvailabilityReason`, `Source`, `SourceVersion`, `SourceCapturedAt`, `SourceURL`, and `MetricDerivation` fields.
5. Populate the event selector from the grouped contract records. Do not join teams by display name.
6. Do not restore the old player-level fixture geography or its Favorable/Neutral/Difficult classifications.

## Verification

Run:

```powershell
node --check src/app.js
node --check src/wnba-zone-contract.js
node tests/wnba-zone-contract.test.mjs
```

Expected behavior outside the authenticated Triple Threat origin is an explicit unavailable state. GitHub Pages cannot reuse the private Triple Threat member session; production integration must run same-origin.

---

# Tennis H2H Metadata - Site Integration Handoff

## Confirmed defect and authoritative fields

The production adapter currently reads `MatchDate`, but the published Tennis V2 player-stat contract uses `Date`. It also recognizes only an explicit `W` row. This drops valid winner metadata when an H2H match has only the losing player's authoritative row.

For Daria Snigur vs Katarzyna Kawa, the authoritative contract contains:

- `TT2-789D0AB74A49786E`: `Date=2026-01-12`, Australian Open, Kawa `Result=L`; therefore the authoritative result relation identifies Snigur as winner even though the reciprocal row is absent.
- `TT2-A0F2B6AC317B1153`: `Date=2026-09-29`, Beijing, Snigur `Result=W` and Kawa `Result=L`.

## Files to integrate

- `src/tennis-h2h-contract.js` - pairs rows by `MatchID`, maps `Date` with legacy `MatchDate` fallback, resolves winner only from authoritative `Result`, and preserves availability/provenance.
- `tests/tennis-h2h-contract.test.mjs` - regression coverage for both Snigur/Kawa matches and the no-score-inference rule.

Replace the site's current `tennisMeetings` implementation with `normalizeTennisH2H`. Do not infer a winner from `FinalScore`; unresolved or conflicting result metadata must remain `Winner unavailable`. Do not replace a missing date with a fabricated or current date.
