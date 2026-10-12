// DEMO FIXTURES ONLY. Never treat these values as production facts or API output.
export const tennis = {
  players: [
    { id:'gauff', name:'Coco Gauff', country:'USA', flag:'🇺🇸', hand:'Right Handed', rank:3, age:20, height:`5'9"`, tone:'blue' },
    { id:'sabalenka', name:'Aryna Sabalenka', country:'BLR', flag:'🇧🇾', hand:'Right Handed', rank:1, age:26, height:`5'11"`, tone:'violet' },
    { id:'swiatek', name:'Iga Swiatek', country:'POL', flag:'🇵🇱', hand:'Right Handed', rank:2, age:25, height:`5'9"`, tone:'cyan' }
  ],
  metrics: {
    gauff:{serve:[64.2,69.4,52.8,5.1,2.8],return:[43.1,30.4,55.8,41.2,64.9],performance:[68.5,42.3,54.1],form:[74.2,61.8,52.6]},
    sabalenka:{serve:[61.8,73.1,55.4,7.3,3.6],return:[39.8,28.1,51.7,37.6,61.1],performance:[72.1,39.8,56.2],form:[78.6,64.3,56.8]},
    swiatek:{serve:[66.1,72.0,54.9,3.8,2.1],return:[45.0,33.2,57.4,46.8,67.3],performance:[73.0,47.1,60.1],form:[82.4,69.0,58.1]}
  },
  meetings: [
    {surface:'Hard',event:'US Open · SF',date:'Sep 10, 2026',winner:'Coco Gauff',score:'6-4   3-6   7-5',stats:[[5,9],[3,6],['64%','59%'],['71%','76%'],['54%','48%'],['5/7','6/9'],['3/9','2/7']]},
    {surface:'Hard',event:'Cincinnati · F',date:'Aug 18, 2026',winner:'Aryna Sabalenka',score:'4-6   6-3   4-6',stats:[[4,8],[4,5],['62%','63%'],['68%','75%'],['51%','55%'],['4/6','5/7'],['2/6','4/8']]},
    {surface:'Clay',event:'Rome · QF',date:'May 16, 2026',winner:'Coco Gauff',score:'6-4   6-2',stats:[[3,4],[2,5],['67%','60%'],['73%','69%'],['57%','46%'],['4/5','3/6'],['4/8','1/5']]},
    {surface:'Hard',event:'Madrid · SF',date:'May 2, 2026',winner:'Aryna Sabalenka',score:'3-6   6-7',stats:[[4,7],[5,3],['60%','64%'],['70%','77%'],['49%','52%'],['5/8','4/5'],['1/6','3/7']]},
    {surface:'Grass',event:'Stuttgart · F',date:'Apr 20, 2026',winner:'Coco Gauff',score:'7-5   4-6   6-4',stats:[[6,10],[3,4],['65%','61%'],['74%','78%'],['53%','50%'],['6/8','5/8'],['3/7','2/6']]}
  ]
};

export const wnba = {
  teams:[
    {id:'lva',name:'Las Vegas Aces',short:'ACES',record:'32 - 12',standing:'1st in West',mark:'▲',tone:'orange'},
    {id:'nyl',name:'New York Liberty',short:'NYL',record:'27 - 9',standing:'1st in East',mark:'♜',tone:'teal'},
    {id:'min',name:'Minnesota Lynx',short:'MIN',record:'28 - 10',standing:'2nd in West',mark:'◆',tone:'cyan'}
  ],
  players:[{id:'wilson',name:`A’ja Wilson`,team:'Las Vegas Aces',number:'#22',position:'C',height:`6'4"`,age:28,tone:'orange'}],
  geography:[
    ['Restricted Area',41,11,'Favorable'],['Paint (Non-RA)',18,4,'Difficult'],['Mid-Range',6,15,'Neutral'],['Left Corner 3',7,5,'Difficult'],['Right Corner 3',4,9,'Neutral'],['Above Break 3',26,12,'Neutral']
  ],
  teamGeography:[
    ['Restricted Area',39,5,'Difficult'],['Paint (Non-RA)',20,3,'Difficult'],['Mid-Range',8,10,'Neutral'],['Left Corner 3',9,11,'Neutral'],['Right Corner 3',8,6,'Neutral'],['Above Break 3',24,8,'Neutral']
  ],
  playTypes:[
    ['Post Up',26,12,'Favorable'],['Transition',19,5,'Difficult'],['Spot Up',17,1,'Difficult'],['PNR Ball Handler',13,12,'Neutral'],['Cut',10,12,'Favorable'],['Hand Off',5,8,'Neutral'],['Putback',5,14,'Neutral'],['Isolation',4,8,'Neutral']
  ],
  teamPlayTypes:[
    ['Transition',21,6,'Neutral'],['Half Court',79,null,'—'],['Spot Up',19,4,'Difficult'],['Pick & Roll Ball Handler',27,5,'Difficult'],['Pick & Roll Roll Man',13,8,'Neutral'],['Post Up',11,9,'Neutral'],['Cut',8,10,'Neutral'],['Off Screen',6,11,'Favorable'],['Isolation',5,12,'Favorable']
  ],
  defense:[['Points Allowed','78.4',3],['Paint Points Allowed','31.2',5],['Restricted Area Defense','—',7],['Mid-Range Defense','—',15],['Above-Break 3 Defense','—',4],['Corner 3 Defense','—',6],['Pace','—',9],['Transition Points Allowed','—',11]],
  teamProfile:[['Points per Game',102.8,78.4,'Favorable'],['FG %',54.1,43.6,'Favorable'],['3PT %',37.8,33.1,'Favorable'],['Rebounds per Game',48.6,33.2,'Favorable'],['Turnovers per Game',16.3,13.9,'Neutral'],['Steals per Game',12.1,8.4,'Neutral'],['Blocks per Game',5.8,4.6,'Neutral'],['Pace',98.2,96.1,'Neutral']],
  h2hTrends:[['Paint Points',42.0,34.7],['Fast Break Points',15.3,9.7],['Second-Chance Points',11.7,16.0],['Points off Turnovers',18.0,12.3],['3PT Points',27.0,35.0],['Free-Throw Points',17.3,13.7]]
};
