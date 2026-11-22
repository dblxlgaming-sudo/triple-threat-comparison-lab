export const POSITIONS = Object.freeze(['PG','SG','SF','PF','C']);

// Identity-only visual options. No values below are research statistics.
export const MATCHUPS = Object.freeze([
  {id:'lal-bos',label:'LAL Lakers vs BOS Celtics',opponent:'Boston Celtics',opponentCode:'BOS',players:[
    {id:'luka-doncic',label:'Luka Dončić (LAL)',name:'Luka Dončić',initials:'LD',team:'LAL',number:'77',position:'PG',height:'6′ 7″',weight:'230 lbs',age:'27'},
    {id:'austin-reaves',label:'Austin Reaves (LAL)',name:'Austin Reaves',initials:'AR',team:'LAL',number:'15',position:'SG',height:'6′ 5″',weight:'197 lbs',age:'28'}
  ]},
  {id:'nyk-mil',label:'NYK Knicks vs MIL Bucks',opponent:'Milwaukee Bucks',opponentCode:'MIL',players:[
    {id:'jalen-brunson',label:'Jalen Brunson (NYK)',name:'Jalen Brunson',initials:'JB',team:'NYK',number:'11',position:'PG',height:'6′ 2″',weight:'190 lbs',age:'30'}
  ]},
  {id:'okc-den',label:'OKC Thunder vs DEN Nuggets',opponent:'Denver Nuggets',opponentCode:'DEN',players:[
    {id:'shai-gilgeous-alexander',label:'Shai Gilgeous-Alexander (OKC)',name:'Shai Gilgeous-Alexander',initials:'SGA',team:'OKC',number:'2',position:'PG',height:'6′ 6″',weight:'195 lbs',age:'28'}
  ]}
]);

export function ordinal(value) {
  if(!Number.isInteger(value)||value<1)return '—';
  const mod100=value%100;
  const suffix=mod100>=11&&mod100<=13?'th':({1:'st',2:'nd',3:'rd'}[value%10]||'th');
  return `${value}${suffix}`;
}

export function rankLabel(rank, denominator) {
  if(!Number.isInteger(rank)||rank<1||!Number.isInteger(denominator)||denominator<1)return '— of —';
  return `${ordinal(rank)} of ${denominator}`;
}

export function blankRankLabel(){return rankLabel(null,null);}
