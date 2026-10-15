# Comparison Lab — Production Handoff

## Purpose

This repo is the working UI/reference implementation for the approved Triple Threat Comparison Lab. It deliberately does not guess production API ownership.

## Codex integration directive

Take this working implementation, communicate with the appropriate Triple Threat agents to obtain the existing authoritative contracts/data sources, map those contracts into the Comparison Lab component inputs, integrate it into the existing Tennis/WNBA Research sections, test against live data, and deploy.

### Constraints

- Resolve/verify the active Triple Threat workspace paths before changing anything. Most project source has moved to E:. Do not assume historical C: source paths are current.
- Do not move files, create replacement project trees, or reorganize existing Triple Threat structure unless explicitly authorized.
- Preserve existing auth, member navigation, Research separation, Publisher/LBG behavior, and deployment conventions.
- Comparison Lab belongs inside each sport's Research workspace. Remove/avoid a separate global left-nav Compare Players entry when integrating.
- Do not invent endpoints.
- Do not fabricate missing statistics.
- Do not recompute authoritative model probabilities, EV, Edge, projections, prices, or other model-owned outputs.
- Missing authoritative data should remain unavailable. Similar Players remains Coming Soon until a real similarity capability exists.

## Tennis UI inputs

Required concepts:
- player identity/search candidates
- country/hand/rank/age/height when authoritative
- surface/window aggregate metrics for Serve, Return, Performance, Form & Consistency
- H2H meetings with surface, event, date, winner, score, and per-meeting statistics

Behavior:
- Surface is global and filters H2H meetings too.
- Window is global for comparison aggregates.
- H2H stays on the same page, expands inline, and supports meeting navigation.
- Recent meeting rows should lead with the winner/result context rather than only tournament name.

## WNBA Player mode inputs

This is **player offense vs opponent team defense**.

Required concepts:
- player identity/team
- opponent team identity
- market/location/window selection
- player shot-location share + opponent defensive rank by zone
- player play-type usage + opponent defensive rank + matchup classification
- opponent defensive context relevant to selected market

Do not add recent player-game bars here. Player Stat Charts owns line/history/hit-rate visualization.
Do not add generic H2H here without market/stat context.

## WNBA Team mode inputs

Required concepts:
- team identities/search
- location/window selection
- offensive shot-location distribution vs opponent defensive zone ranks
- play-type usage vs opponent defensive ranks
- mirrored Team Matchup Profile
- H2H Matchup Trends: qualifying-meeting averages for paint points, fast-break points, second-chance points, points off turnovers, 3PT points, free-throw points (only where authoritative data exists)

H2H Matchup Trends is the bottom analytical section. Do not restore a generic H2H card or What Stands Out block there.

### Published fine-zone court contract

The authoritative Teams scoring-geography path is implemented in `src/wnba-zone-contract.js` and rendered by `src/app.js`. It consumes `/api/research/wnba/matchup-zones/current`, groups by `EventID + OffenseTeamID + DefenseTeamID`, and uses only `offense_shot_share`, `offense_field_goal_pct`, `opponent_field_goal_pct_allowed`, and `opponent_field_goal_pct_allowed_rank` for the five supplied zones. `CORNER_THREE` remains combined. The UI does not derive player distributions or matchup classifications. See `SITE_INTEGRATION_HANDOFF.md`.

## Matchup classification

The UI supports `Favorable`, `Neutral`, and `Difficult` as display states. During production integration, determine whether an existing authoritative contract supplies these classifications. If it does not, obtain an approved rule/owner before deriving them. Do not silently infer them from fixture thresholds.

## Demo fixtures

All values in `src/fixtures.js` are isolated demonstration data. Delete/disable them from the production path after authoritative adapters are connected, but keeping them for local visual regression/testing is acceptable if they are unmistakably fixture-only.
