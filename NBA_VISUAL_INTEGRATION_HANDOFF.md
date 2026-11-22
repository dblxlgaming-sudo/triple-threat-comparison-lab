# NBA Comparison Lab — Visual Integration Handoff

## Scope completed

This commit is the visual-only November 22 NBA Comparison Lab implementation. It contains no NBA research statistics, model calculations, database access, or production routing changes.

All statistical cells intentionally display `—`. Identity-only selector options exist solely to exercise the interface until the Site Agent connects the authoritative roster and matchup contracts.

## Integration files

- `index.html` — standalone NBA Comparison Lab entrypoint.
- `styles.css` — approved dark navy/cyan desktop and responsive mobile presentation.
- `src/app.js` — rendering, matchup/player selection, position selection, and coverage-popup interactions.
- `src/nba-visual-contract.js` — identity-only visual selector options, supported positions, and denominator-aware rank formatting.
- `tests/nba-visual-contract.test.mjs` — position and ranking-label regression coverage.

## Required Site Agent boundaries

1. Integrate the visual module into the existing authenticated Comparison Lab route. Do not create a new application, Worker, database, or research pipeline.
2. Keep the current member-facing Comparison Lab entry hidden until NBA activation is explicitly authorized.
3. Activate NBA only. Do not expose or alter the postponed Tennis/WNBA modes.
4. Replace `MATCHUPS` identity-only options with the approved factual matchup/player contract.
5. Replace only `—` placeholders with verified Research Statistics Agent outputs. Do not introduce fixture statistics.
6. Keep opponent-defense labels in “what the opponent allows” terms.
7. Supply both rank and qualifying-team denominator to `rankLabel(rank, denominator)`, producing labels such as `7th of 29` and `12th of 19`.
8. Populate the coverage popup with the selected team’s Season and Last 5 verified-game counts and coverage percentages. Rankings must remain limited to qualifying teams meeting the 90% coverage threshold.
9. Keep the Key Takeaway blank until the approved decision-tree module is available; do not generate narrative from presentation code.

## Interaction contract

- Matchup selection changes the opponent and available player list.
- Player selection changes the identity card only; statistics remain unavailable until integration.
- PG/SG/SF/PF/C changes the defense table and takeaway context.
- The cyan coverage `ⓘ` opens on desktop hover and click, and mobile tap.
- Clicking/tapping elsewhere or pressing Escape closes the popup.

## Validation completed

- JavaScript syntax checks passed.
- Rank formatter tests passed for ordinal and variable-denominator labels.
- Desktop browser validation: 1536 × 1024, no page-level horizontal overflow.
- Mobile browser validation: 390 × 844, no page-level horizontal overflow; wide tables scroll within their panels.
- Selector, position-tab, popup click/tap, outside-close, and Escape-close behavior verified.

No production deployment was performed. The Site Agent owns integration, authenticated routing, deployment, and eventual NBA activation.
