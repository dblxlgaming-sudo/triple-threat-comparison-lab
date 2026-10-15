export const WNBA_ZONE_CONTRACT_URL = 'https://triplethreat.app/api/research/wnba/matchup-zones/current';

export const FINE_ZONES = [
  ['RESTRICTED_AREA', 'Restricted Area'],
  ['PAINT', 'Paint (Non-RA)'],
  ['MID_RANGE', 'Mid-Range'],
  ['CORNER_THREE', 'Corner 3'],
  ['ABOVE_THE_BREAK_THREE', 'Above the Break 3'],
];

export const FINE_ZONE_METRICS = new Set([
  'offense_shot_share',
  'offense_field_goal_pct',
  'opponent_field_goal_pct_allowed',
  'opponent_field_goal_pct_allowed_rank',
]);

export function parseCsv(text) {
  const records=[]; let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i+=1){const char=text[i],next=text[i+1];if(char==='"'&&quoted&&next==='"'){cell+='"';i+=1}else if(char==='"')quoted=!quoted;else if(char===','&&!quoted){row.push(cell);cell=''}else if((char==='\n'||char==='\r')&&!quoted){if(char==='\r'&&next==='\n')i+=1;row.push(cell);if(row.some(Boolean))records.push(row);row=[];cell=''}else cell+=char}
  if(cell||row.length){row.push(cell);records.push(row)}
  const headers=records.shift()||[];
  return records.map(values=>Object.fromEntries(headers.map((header,index)=>[header,values[index]??''])));
}

const keyFor=row=>`${row.EventID}|${row.OffenseTeamID}|${row.DefenseTeamID}`;
const numeric=value=>value===''||value==null||!Number.isFinite(Number(value))?null:Number(value);
const available=row=>String(row?.AvailabilityState||'').toUpperCase()==='AVAILABLE'&&numeric(row?.MetricValue)!=null;

export function normalizeFineZoneContract(rows) {
  const groups=new Map();
  for(const row of rows){
    if(!FINE_ZONE_METRICS.has(row.MetricName)||!FINE_ZONES.some(([id])=>id===row.ZoneName))continue;
    const key=keyFor(row);
    if(!groups.has(key))groups.set(key,{key,eventId:String(row.EventID),offenseTeamId:String(row.OffenseTeamID),defenseTeamId:String(row.DefenseTeamID),offenseTeam:row.OffenseTeam||'Offense unavailable',defenseTeam:row.DefenseTeam||'Defense unavailable',offenseTeamKey:row.OffenseTeamKey||'',defenseTeamKey:row.DefenseTeamKey||'',gameTime:row.GameTime||'',slateId:row.SlateID||'',boardDate:row.BoardDate||'',zones:new Map(),provenance:[]});
    const group=groups.get(key); if(!group.zones.has(row.ZoneName))group.zones.set(row.ZoneName,new Map()); group.zones.get(row.ZoneName).set(row.MetricName,row);
    group.provenance.push({source:row.Source||'',sourceVersion:row.SourceVersion||'',capturedAt:row.SourceCapturedAt||'',sourceUrl:row.SourceURL||'',derivation:row.MetricDerivation||''});
  }
  return [...groups.values()].map(group=>({...group,zones:FINE_ZONES.map(([zoneId,label])=>{const metrics=group.zones.get(zoneId)||new Map();const read=name=>{const row=metrics.get(name);return {value:available(row)?numeric(row.MetricValue):null,availability:row?.AvailabilityState||'UNAVAILABLE',reason:row?.AvailabilityReason||(!row?'Metric not supplied':''),unit:row?.Unit||'',source:row?.Source||'',sourceVersion:row?.SourceVersion||'',capturedAt:row?.SourceCapturedAt||'',sourceUrl:row?.SourceURL||'',derivation:row?.MetricDerivation||''}};return {id:zoneId,label,offenseShotShare:read('offense_shot_share'),offenseFieldGoalPct:read('offense_field_goal_pct'),opponentFieldGoalPctAllowed:read('opponent_field_goal_pct_allowed'),opponentFieldGoalPctAllowedRank:read('opponent_field_goal_pct_allowed_rank')}})}));
}

export async function fetchFineZoneContract(url=WNBA_ZONE_CONTRACT_URL) {
  const response=await fetch(url,{cache:'no-store',credentials:'include',headers:{Accept:'text/csv, application/json'}});
  if(!response.ok)throw new Error(response.status===401?'Member authentication is required to load the WNBA fine-zone contract.':`WNBA fine-zone contract returned ${response.status}.`);
  const contentType=response.headers.get('content-type')||'';
  const rows=contentType.includes('json')?await response.json():parseCsv(await response.text());
  return normalizeFineZoneContract(Array.isArray(rows)?rows:rows?.Records||rows?.records||[]);
}
