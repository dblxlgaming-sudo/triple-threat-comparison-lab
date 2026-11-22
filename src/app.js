import { MATCHUPS, POSITIONS, blankRankLabel } from './nba-visual-contract.js';

const root = document.querySelector('#nba-lab');
const dash = '—';
const state = { matchupId: MATCHUPS[0].id, playerId: MATCHUPS[0].players[0].id, position: 'PG', coverageOpen: false };
const productionRows = ['Games','Minutes','Points','Rebounds','Assists','Turnovers','Steals','Blocks'];
const shootingRows = ['Restricted Area','Paint (Non-Restricted)','Mid-Range','Corner Three','Above-the-Break Three'];
const defenseMetrics = ['PTS','REB','AST','3PM','STL','BLK','P+R','P+A','R+A','P+R+A'];

function esc(value='') { return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char])); }
function currentMatchup() { return MATCHUPS.find(item => item.id === state.matchupId) || MATCHUPS[0]; }
function currentPlayer() { const m=currentMatchup(); return m.players.find(item => item.id === state.playerId) || m.players[0]; }
function options(items, selected, label) { return items.map(item => `<option value="${esc(item.id)}" ${item.id===selected?'selected':''}>${esc(item[label])}</option>`).join(''); }
function placeholderCells(count, className='') { return Array.from({length:count},()=>`<td class="${className}">${dash}</td>`).join(''); }

function render() {
  const matchup=currentMatchup();
  const player=currentPlayer();
  const opponent=matchup.opponent;
  root.innerHTML=`
    <header class="brand-header">
      <div class="brand-lockup" aria-label="Triple Threat"><span class="brand-ball">TRIPLE<br>THREAT</span></div>
      <span class="header-divider"></span><span class="nba-mark" aria-hidden="true">NBA</span>
      <div class="title-lockup"><h1>NBA COMPARISON LAB</h1><p>Player Production <i>•</i> Shooting Profile <i>•</i> Opponent Defense <i>•</i> Positional Analysis</p></div>
      <div class="data-through"><span class="info-symbol" aria-hidden="true">i</span><strong>Data Through: ${dash}</strong></div>
    </header>
    <section class="hero panel">
      <div class="selectors">
        <label><span>MATCHUP</span><select id="matchup-select">${options(MATCHUPS,state.matchupId,'label')}</select></label>
        <label><span>PLAYER</span><select id="player-select">${options(matchup.players,state.playerId,'label')}</select></label>
      </div>
      <div class="player-card">
        <div class="player-avatar" aria-hidden="true">${esc(player.initials)}</div>
        <div class="player-name"><h2>${esc(player.name)}</h2><p>${esc(player.team)} · #${esc(player.number)} · ${esc(player.position)}</p></div>
        <div class="team-badge" aria-label="${esc(player.team)}">${esc(player.team)}</div>
        ${[['HEIGHT',player.height],['WEIGHT',player.weight],['AGE',player.age]].map(([label,value])=>`<div class="bio"><span>${label}</span><strong>${esc(value)}</strong></div>`).join('')}
      </div>
      <div class="averages-strip"><h2>SEASON<br>AVERAGES</h2>${['PTS','REB','AST','STL','BLK','MIN'].map(label=>`<div class="average"><strong>${dash}</strong><span>${label}</span></div>`).join('')}</div>
    </section>
    <div class="upper-grid">
      <section class="panel production-panel"><h2><span class="section-icon">▥</span> PLAYER PRODUCTION</h2><div class="table-scroll"><table class="production-table"><thead><tr><th>STAT</th><th>SEASON AVG</th><th>LAST 5 AVG</th></tr></thead><tbody>${productionRows.map(label=>`<tr><th>${label}</th>${placeholderCells(2)}</tr>`).join('')}</tbody></table></div></section>
      <section class="panel shooting-panel"><h2><span class="section-icon">◎</span> PLAYER SHOOTING PROFILE (OFFENSE) – SEASON</h2><div class="shooting-layout">
        <div class="table-scroll"><table class="shooting-table"><thead><tr><th>SHOOTING LOCATION</th><th>FGM</th><th>FGA</th><th>FG%</th><th>SHOT FREQUENCY %</th></tr></thead><tbody>${shootingRows.map(label=>`<tr><th>${label}</th>${placeholderCells(4)}</tr>`).join('')}<tr class="total-row"><th>TOTAL</th>${placeholderCells(4)}</tr></tbody></table></div>
        <aside class="shooting-note"><h3><span class="info-symbol">i</span> Shooting Locations</h3><p>Season data only.</p><p>Last 5 shooting-location data is not available until supplied by the verified statistics engine.</p></aside>
      </div></section>
    </div>
    <section class="panel defense-panel">
      <header class="defense-header"><h2><span class="section-icon shield">⬡</span> OPPONENT DEFENSE – ${esc(opponent.toUpperCase())} <button class="coverage-trigger" id="coverage-trigger" type="button" aria-label="Opponent defense coverage information" aria-expanded="${state.coverageOpen}" aria-controls="coverage-popup">ⓘ</button></h2><strong>${esc(matchup.opponentCode)} Defensive Rankings (What Opponent Allows vs. Player Position)</strong>
        <div class="coverage-popup ${state.coverageOpen?'open':''}" id="coverage-popup" role="dialog" aria-label="Opponent defense coverage information"><h3>Coverage Information</h3><dl><div><dt>Season verified games</dt><dd>${dash}</dd></div><div><dt>Season coverage</dt><dd>${dash}</dd></div><div><dt>Last 5 verified games</dt><dd>${dash}</dd></div><div><dt>Last 5 coverage</dt><dd>${dash}</dd></div></dl><p>Rankings include only qualifying teams meeting the 90% verified-game coverage threshold. The qualifying-team denominator will be supplied by the statistics engine.</p></div>
      </header>
      <div class="position-tabs" role="group" aria-label="Player position">${POSITIONS.map(pos=>`<button type="button" data-position="${pos}" class="${pos===state.position?'active':''}" aria-pressed="${pos===state.position}">${pos}</button>`).join('')}</div>
      <div class="defense-layout"><div class="table-scroll"><table class="defense-table"><thead><tr><th>VS ${state.position} (OPPONENT ALLOWS)</th>${defenseMetrics.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody><tr><th>Season (Avg Allowed)</th>${placeholderCells(10)}</tr><tr><th>Last 5 (Avg Allowed)</th>${placeholderCells(10)}</tr><tr><th>League Rank (Season)</th>${placeholderCells(10,'rank-placeholder')}</tr><tr><th>League Rank (Last 5)</th>${placeholderCells(10,'rank-placeholder')}</tr></tbody></table></div><aside class="takeaway"><h3><span class="clipboard">▣</span> KEY TAKEAWAY – vs ${state.position}</h3><p>${dash}</p><small>Takeaway will appear only when the approved decision logic and verified statistics are integrated.</small></aside></div>
    </section>
    <footer class="rank-legend"><strong>DEFENSIVE RANKING (VS POSITION)</strong><span><i class="rank-chip green"></i> 1–10 = Tougher Defense (Allows Fewer)</span><span><i class="rank-chip yellow"></i> 11–20 = League Average</span><span><i class="rank-chip red"></i> 21+ = Weaker Defense (Allows More)</span><span class="denominator-example">Rank format: ${blankRankLabel()}</span></footer>`;
  bind();
}

function closeCoverage() { if(state.coverageOpen){state.coverageOpen=false;render();} }
function bind() {
  document.querySelector('#matchup-select').addEventListener('change',event=>{state.matchupId=event.target.value;state.playerId=currentMatchup().players[0].id;render();});
  document.querySelector('#player-select').addEventListener('change',event=>{state.playerId=event.target.value;render();});
  document.querySelectorAll('[data-position]').forEach(button=>button.addEventListener('click',()=>{state.position=button.dataset.position;render();}));
  const trigger=document.querySelector('#coverage-trigger');
  trigger.addEventListener('click',event=>{event.stopPropagation();state.coverageOpen=!state.coverageOpen;render();});
  trigger.addEventListener('mouseenter',()=>{if(matchMedia('(hover: hover)').matches&&!state.coverageOpen){state.coverageOpen=true;render();}});
  document.querySelector('#coverage-popup').addEventListener('click',event=>event.stopPropagation());
}
document.addEventListener('click',event=>{if(state.coverageOpen&&!event.target.closest('#coverage-popup')&&!event.target.closest('#coverage-trigger'))closeCoverage();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeCoverage();});
render();
