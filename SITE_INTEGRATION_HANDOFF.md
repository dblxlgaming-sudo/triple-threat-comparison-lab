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
