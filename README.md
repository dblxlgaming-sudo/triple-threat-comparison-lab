# Triple Threat Comparison Lab

Standalone, working reference implementation for Triple Threat's **Comparison Lab**.

This repository intentionally separates **UI/component contracts** from Triple Threat production APIs. The data in `src/fixtures.js` is demo fixture data only. It exists so the app can be run, reviewed, and tested before Codex maps the component inputs to the authoritative contracts already used by the production agents.

## Run locally

No build step is required.

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.

## Locked product behavior represented here

### Tennis
- Player-v-player comparison only.
- Search/select either player without leaving Comparison Lab.
- Global Surface filter: All / Hard / Clay / Grass.
- Global Time Window: Season / L20 / L10 / L5.
- Mirrored Serve, Return, Performance, and Form & Consistency comparisons.
- Head to Head expands inline, is surface-aware, shows a selected meeting's match statistics, and supports previous/next meeting navigation.
- Recent H2H meetings identify the **winner**, not merely the tournament.
- No separate Change Players button.

### WNBA — Players
- Player offense is compared against an opponent **team defense**; it is not a generic player-v-player box-score comparison.
- Market filter: PTS / REB / AST / 3PM / PTS+REB / PTS+AST / REB+AST / PRA.
- Global location filter: All / Home / Away.
- Global time window: Season / L20 / L10 / L5.
- Scoring Geography uses the approved half-court treatment and Favorable / Neutral / Difficult legend.
- Play-Type Matchup sits above Opponent Defensive Context.
- Similar Players is deliberately **Coming Soon** until an authoritative similarity capability exists.
- No H2H module and no recent-game hit-rate bars in this mode.

### WNBA — Teams
- Team-v-team comparison uses the same Comparison Lab shell but different basketball semantics.
- Global location and time-window controls.
- Scoring Geography compares selected offense to opposing defense.
- Play-Type Matchup describes offensive usage versus opponent defensive rank.
- Team Matchup Profile is mirrored for fast matchup scanning.
- Bottom section is **H2H Matchup Trends**, not a generic H2H record. Values represent average scoring tendencies from qualifying meetings under the selected context.
- No What Stands Out placeholder in Team mode.

## Data boundary

`src/fixtures.js` supplies the standalone Tennis demonstration and legacy visual fixtures. Nothing in it should be treated as a production fact or endpoint.

The WNBA Teams scoring-geography court now uses the published fine-zone contract at `/api/research/wnba/matchup-zones/current`. It joins records by `EventID + OffenseTeamID + DefenseTeamID`, preserves upstream unavailable/provenance fields, and displays only the five supplied team-level zones. See `SITE_INTEGRATION_HANDOFF.md` for the production host contract.

`src/adapters.js` defines the normalized inputs consumed by the UI. Production integration should replace fixture loading with adapters that map existing authoritative Triple Threat contracts into these shapes. Do **not** make UI code infer missing statistics, recalculate model outputs, or invent endpoints.

## Integration handoff

Codex/Site Agent should:

1. Obtain the existing authoritative Tennis/WNBA data contracts from the appropriate Triple Threat agents.
2. Map those contracts into the normalized structures documented in `src/adapters.js`.
3. Integrate Tennis Comparison Lab inside Tennis Research and WNBA Comparison Lab inside WNBA Research.
4. Preserve sport-specific semantics rather than merging the data models.
5. Test filters and empty/null states against live data.
6. Match the host site's authentication, navigation, typography, and deployment conventions.

## Files

- `index.html` — standalone application shell
- `styles.css` — responsive visual system
- `src/fixtures.js` — isolated demo data
- `src/adapters.js` — normalized component contract and fixture selectors
- `src/app.js` — state, interactions, filtering, and rendering
