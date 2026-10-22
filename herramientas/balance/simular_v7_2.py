#!/usr/bin/env python3
"""DEUS ABSENS v7.2 diagnostic, NOT game engine; missing values are not approved.
Models: weapons only, Longinos' confirmed skills, old v7.1 provisional powers.
Other Saints have NO special powers in confirmed-only model, NOT zero charges in the game.
"""
from __future__ import annotations
import json,random,itertools,csv
from pathlib import Path
import motor_experimental_v7_2 as m
P=Path(__file__).resolve().parent
ROOT=P.parent.parent
profiles=m.base.new_profiles()
enemies={e['id']:e for e in json.loads((P/'inputs/enemigos.json').read_text(encoding='utf-8'))}
assert len(profiles)==10 and len(enemies)==6
assert all(v.get('ceniza') is None for v in enemies.values())
MODES=('weapons','confirmed','v71_partial')
SCENES_4=('Z2 incursión','Z3 elites','Jefe reforzado')
SCENES_6=('Z3 elites ampliada','Jefe reforzado ampliada')
PATHS={
 'Travesía 3 encuentros':['Z1 patrulla','Z2 incursión','Jefe acompañado'],
 'Descenso 4 encuentros':['Z1 patrulla','Z2 incursión','Z3 elites','Jefe acompañado'],
 'Descenso con jefe reforzado':['Z1 patrulla','Z2 incursión','Z3 elites','Jefe reforzado'],
}
def fight_once(seed,ids,scenario,mode,carry=None,gm='spread'):
 return m.fight(random.Random(seed),ids,scenario,profiles,enemies,
                board='terrain',dm=gm,ecen=0,carry=carry,
                feat=mode!='weapons',strict_known=mode=='confirmed')
def aggregate(data):
 n=len(data)
 return {'tests':n,'wins':sum(x['win'] for x in data),
         'win_pct':round(100*sum(x['win'] for x in data)/n,1),
         'clean_pct':round(100*sum(x['clean'] for x in data)/n,1),
         'avg_rounds':round(sum(x['rounds'] for x in data)/n,2),
         'avg_hp_end':round(sum(x['hp_left'] for x in data)/n,1),
         'avg_martyrs_used':round(sum(x['martyrs'] for x in data)/n,2)}
def main():
 results={'metadata':{
  'date':'2026-10-22','seed_base':720000,
  'source':'v7.1 spatial experimental engine, gated for confirmed skills; not official game code',
  'modes':{
   'weapons':'Only normal weapons, no Saint passives or martyrs',
   'confirmed':'Longinos confirmed one-charge bleeding/healing martyr and +1d4 when injured; no speculative powers or charges for other nine',
   'v71_partial':'Old v7.1 experimental skills and ONE HYPOTHETICAL MARTYR CHARGE FOR ALL, NOT OFFICIAL'},
  'enemy_initiative_ceniza':'+0 hypothetical per enemy, NOT OFFICIAL',
  'map':'10x10 for 4, 15x15 for 6, simplified geometry and movement',
  'healing_between_rooms':'none for free',
  'caveats':'No full abilities of nine Saints, no enemy special powers, no weak points or healing items. Results NOT final character balance.'
 },'encounters':[],'expeditions':[]}
 for count,scenes in ((4,SCENES_4),(6,SCENES_6)):
  teams=list(itertools.combinations(profiles,count))
  for title in scenes:
   scenario=m.SCENARIOS[count][title]
   for mode in MODES:
    rows=[fight_once(720000+count*20000+si*1000,group,scenario,mode)
          for si,group in enumerate(teams)]
    results['encounters'].append({'players':count,'scenario':title,'mode':mode,**aggregate(rows)})
    print('SINGLE',count,title,mode,round(100*sum(r['win'] for r in rows)/len(rows),1),'%',flush=True)
 groups=list(itertools.combinations(m.STARTERS,4));reps=4
 for title,rooms in PATHS.items():
  for gm in ('spread','focus'):
   for mode in MODES:
    record=[]
    for gi,group in enumerate(groups):
     for rep in range(reps):
      carry=None;wins=0;spent=0
      for ri,room in enumerate(rooms):
       seed=730000+gi*97+rep*1307+ri*100003+(1 if gm=='focus' else 0)*9001
       trial=fight_once(seed,group,m.SCENARIOS[4][room],mode,carry=carry,gm=gm)
       carry=trial['end_state'];spent+=trial['martyrs']
       if not trial['win']:break
       wins+=1
      record.append({'cleared':int(wins==len(rooms)),'rooms':wins,'spent':spent})
    n=len(record);cleared=sum(x['cleared'] for x in record)
    results['expeditions'].append({'name':title,'rooms':rooms,'gm':gm,'mode':mode,
      'teams':len(groups),'trials_per_team':reps,'tests':n,'wins':cleared,
      'win_pct':round(100*cleared/n,1),'avg_rooms':round(sum(x['rooms'] for x in record)/n,2),
      'avg_martyrs':round(sum(x['spent'] for x in record)/n,2)})
    print('EXPEDITION',title,gm,mode,f'{cleared}/{n}',flush=True)
 out=ROOT/'resultados';out.mkdir(exist_ok=True)
 (out/'v7_2_resultados.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 for key,fname in [('encounters','encuentros.csv'),('expeditions','expediciones.csv')]:
  rows=results[key]
  with (out/fname).open('w',encoding='utf-8',newline='') as f:
   writer=csv.DictWriter(f,fieldnames=rows[0].keys());writer.writeheader();writer.writerows(rows)
 print('DONE',sum(x['tests'] for x in results['encounters']),'single fights',sum(x['tests'] for x in results['expeditions']),'expeditions',flush=True)
if __name__=='__main__':main()
