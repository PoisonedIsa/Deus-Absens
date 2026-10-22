#!/usr/bin/env python3
"""DEUS ABSENS: prueba Monte Carlo de combate BÁSICO, no simulación completa de habilidades ni del tablero.
Reproducible: Python estándar, sin bibliotecas externas. No cambia la web ni sus datos.
"""
import argparse
import itertools
import json
import math
import random
from functools import lru_cache
from collections import Counter,defaultdict
from pathlib import Path

ROOT=Path(__file__).resolve().parent
DATA=ROOT/'inputs'
BUILD={
'san-longinos':'ACERO SANGRE CENIZA DOGMA',
'santa-lucia':'CENIZA SANGRE ACERO DOGMA',
'san-erasmo':'SANGRE ACERO CENIZA DOGMA',
'santa-magdalena':'DOGMA SANGRE CENIZA ACERO',
'san-lorenzo':'DOGMA ACERO CENIZA SANGRE',
'san-bartolome':'CENIZA ACERO SANGRE DOGMA',
'san-simeon':'SANGRE CENIZA ACERO DOGMA',
'san-judas-tadeo':'DOGMA SANGRE CENIZA ACERO',
'santa-juana':'DOGMA ACERO SANGRE CENIZA',
'san-lazaro':'SANGRE DOGMA CENIZA ACERO'}
# (nombre, daño, atributo de ataque, +daño vs Blindaje). Los efectos no numéricos quedan fuera.
WEAPONS={
'san-longinos':[('Gólgota','1d10','ACERO',False),('Clavos','1d6','CENIZA',False)],
'santa-lucia':[('Ojo de Aguja','1d12','CENIZA',False),('Estilete','1d4','ACERO',False)],
'san-erasmo':[('Gancho','1d8','ACERO',False)],
'santa-magdalena':[('Látigo','1d6','ACERO',False)],
'san-lorenzo':[('Parrilla','1d8','CENIZA',False),('Martillo','1d6','ACERO',True)],
'san-bartolome':[('Cuchillos','2d4','ACERO',False),('Ballesta','1d6','CENIZA',False)],
'san-simeon':[('Campanario','2d6','CENIZA',False),('Pilar','1d10','ACERO',False)],
'san-judas-tadeo':[('Maza','1d8','ACERO',False),('Campana','1d4','DOGMA',False)],
'santa-juana':[('Mandoble','1d10','ACERO',False)],
'san-lazaro':[('Fusil','1d8','CENIZA',False),('Losa','1d8','ACERO',False)]}
SCENARIOS={
 4:{
  'Z1 patrulla':['deudor-sal','deudor-sal','perro-puerta'],
  'Z1 presion':['deudor-sal','deudor-sal','perro-puerta','perro-puerta'],
  'Z2 patrulla':['deudor-sal','perro-puerta','querubin-desollado','querubin-desollado'],
  'Z2 incursión':['deudor-sal','perro-puerta','querubin-desollado','querubin-desollado','querubin-desollado'],
  'Z3 elites':['serafin-ceniza','novia-foso','querubin-desollado','deudor-sal'],
  'Z3 asedio':['serafin-ceniza','novia-foso','querubin-desollado','querubin-desollado','perro-puerta'],
  'Jefe acompañado':['hueco-que-reza','querubin-desollado','querubin-desollado'],
  'Jefe reforzado':['hueco-que-reza','serafin-ceniza','querubin-desollado','deudor-sal']},
 6:{
  'Z1 patrulla ampliada':['deudor-sal']*3+['perro-puerta']*2,
  'Z2 patrulla ampliada':['deudor-sal']+['perro-puerta']*2+['querubin-desollado']*3,
  'Z3 elites ampliada':['serafin-ceniza']*2+['novia-foso']+['querubin-desollado']*2+['perro-puerta'],
  'Z3 asedio ampliada':['serafin-ceniza']*2+['novia-foso']*2+['querubin-desollado']*2+['perro-puerta','deudor-sal'],
  'Jefe acompañado ampliada':['hueco-que-reza','serafin-ceniza']+['querubin-desollado']*2+['perro-puerta'],
  'Jefe reforzado ampliada':['hueco-que-reza']+['serafin-ceniza']*2+['novia-foso']+['querubin-desollado']*2}}

@lru_cache(maxsize=None)
def unpack_dice(d):
 n,s=d.split('d');return int(n),int(s)
def damage(rng,s):
 n,faces=unpack_dice(s);return sum(rng.randint(1,faces) for _ in range(n))
@lru_cache(maxsize=None)
def chance(bonus,defense):
 return sum(a==6 and b==6 or (not(a==1 and b==1) and a+b+bonus>=defense) for a in range(1,7) for b in range(1,7))/36

@lru_cache(maxsize=None)
def expected(dice,bonus,defense,armor,extra=0):
 n,faces=unpack_dice(dice);average=n*(faces+1)/2
 return chance(bonus,defense)*max(0,average+extra-armor) + average/36

def atk(rng,bonus,defense,dice,armor,extra,penalty):
 a=rng.randint(1,6);b=rng.randint(1,6)
 critical=(a==6 and b==6);fumble=(a==1 and b==1)
 hit=not fumble and (critical or a+b+bonus-(1 if penalty else 0)>=defense)
 dmg=max(0,damage(rng,dice)+(damage(rng,dice) if critical else 0)+extra-armor) if hit else 0
 return hit,dmg,fumble

def new_profiles():
 originals=json.loads((DATA/'personajes.json').read_text(encoding='utf-8'))
 profiles={}
 for p in originals:
  sid=p['id'];attrs=dict(zip(BUILD[sid].split(),[3,2,1,0]));assert sorted(attrs.values())==[0,1,2,3]
  shield_bonus=2 if sid=='san-erasmo' else (1 if sid=='santa-juana' else 0)
  profiles[sid]={'id':sid,'name':p['name'],'secret':p['secret'],'attrs':attrs,'hp':12+3*attrs['SANGRE'],
                 'defense':8+math.ceil(attrs['CENIZA']/2)+shield_bonus,'weapons':WEAPONS[sid]}
 return profiles

def tiebreak(rng,contenders):
 if len(contenders)<2:return contenders
 batches=defaultdict(list)
 for ent in contenders:batches[rng.randint(1,6)+rng.randint(1,6)+ent['ceniza']].append(ent)
 if len(batches)==1:return tiebreak(rng,contenders)
 return [entry for score in sorted(batches,reverse=True) for entry in tiebreak(rng,batches[score])]

def fight(rng,heroes,enemy_ids,template,enemy_ceniza=0,dm='spread',round_limit=18):
 ps=[{'side':'hero','id':p['id'],'profile':p,'hp':p['hp'],'ceniza':p['attrs']['CENIZA'],'penalty':False,'damage':0} for p in heroes]
 es=[]
 for i,sid in enumerate(enemy_ids):
  t=template[sid]
  es.append({'side':'enemy','id':sid,'instance':i,'template':t,'hp':t['hp'],'ceniza':enemy_ceniza,
             'penalty':False,'attacked_by':set()})
 initiative=defaultdict(list)
 for c in ps+es:
  init=rng.randint(1,6)+rng.randint(1,6)+c['ceniza']
  initiative[(init,c['ceniza'])].append(c)
 order=[c for rank in sorted(initiative,reverse=True) for c in tiebreak(rng,initiative[rank])]
 round_count=0
 for round_count in range(1,round_limit+1):
  if not any(p['hp']>0 for p in ps) or not any(e['hp']>0 for e in es):break
  for c in order:
   if c['hp']<=0:continue
   if not any(p['hp']>0 for p in ps) or not any(e['hp']>0 for e in es):break
   if c['side']=='hero':
    targets=[e for e in es if e['hp']>0]
    # Escenario favorable a coordinación: concentración de fuego contra quien está más cerca de caer.
    e=max(targets,key=lambda e:(1-e['hp']/e['template']['hp'])+e['template']['hp']/300+max(a['strikes'] for a in e['template']['attacks'])/20)
    options=c['profile']['weapons'];attrs=c['profile']['attrs'];armor=e['template']['armor'];df=e['template']['defense']
    w=max(options,key=lambda w:expected(w[1],attrs[w[2]],df,armor,2 if w[3] and armor>0 else 0))
    hit,dmg,fumble=atk(rng,attrs[w[2]],df,w[1],armor,2 if w[3] and armor>0 else 0,c['penalty'])
    c['penalty']=fumble;c['damage']+=dmg;e['hp']-=dmg
    if hit:e['attacked_by'].add(c['id']) # La recompensa de Ecos no requiere superar el Blindaje.
   else:
    targets=[p for p in ps if p['hp']>0]
    target=min(targets,key=lambda p:(p['hp']/p['profile']['hp'],p['profile']['defense'])) if dm=='focus' else rng.choice(targets)
    attack=max(c['template']['attacks'],key=lambda a:expected(a['damage'],a['attackBonus'],target['profile']['defense'],0)*a['strikes'])
    for _ in range(attack['strikes']):
     if target['hp']<=0:break
     hit,dmg,fumble=atk(rng,attack['attackBonus'],target['profile']['defense'],attack['damage'],0,0,c['penalty'])
     c['penalty']=fumble;target['hp']-=dmg
 alive=sum(p['hp']>0 for p in ps)
 all_killed=all(e['hp']<=0 for e in es)
 return {'win':int(all_killed and alive>0),'clean':int(all_killed and alive==len(ps)),
         'downs':len(ps)-alive,'rounds':round_count,'eligible':sum(len(e['attacked_by']) for e in es if e['hp']<=0),
         'killed':sum(e['hp']<=0 for e in es),'remaining_hp':sum(max(0,p['hp']) for p in ps),
         'damage':{p['id']:p['damage'] for p in ps}}

def main(seed=20261022,r4=90,r6=50,sensitivity=True):
 rng=random.Random(seed);profiles=new_profiles();enemies={e['id']:e for e in json.loads((DATA/'enemigos.json').read_text(encoding='utf-8'))}
 assert len(profiles)==10 and len(enemies)==6
 assert all(e.get('ceniza') is None for e in enemies.values())
 records=[];combinations=[];herodamage=Counter();herofights=Counter()
 for group_size,reps in [(4,r4),(6,r6)]:
  for title,enemy_ids in SCENARIOS[group_size].items():
   aggregate=Counter();ncomb=0
   for ids in itertools.combinations(profiles,group_size):
    ncomb+=1;team=[profiles[id] for id in ids];totals=Counter()
    for _ in range(reps):
     outcome=fight(rng,team,enemy_ids,enemies)
     for key in ['win','clean','downs','rounds','eligible','killed','remaining_hp']:totals[key]+=outcome[key]
     for id_,d in outcome['damage'].items():herodamage[(group_size,id_)]+=d;herofights[(group_size,id_)]+=1
    for k,v in totals.items():aggregate[k]+=v
    combinations.append({'group_size':group_size,'scenario':title,'heroes':ids,'samples':reps,
                         'win_rate':round(totals['win']/reps,5),'clean_rate':round(totals['clean']/reps,5),
                         'mean_downs':round(totals['downs']/reps,3),'mean_rounds':round(totals['rounds']/reps,3)})
   n=ncomb*reps
   records.append({'group_size':group_size,'board_reference':10 if group_size==4 else 15,'scenario':title,
         'enemy_types':enemy_ids,'n_combinations':ncomb,'samples':n,
         'win_rate':round(aggregate['win']/n,5),'clean_win_rate':round(aggregate['clean']/n,5),
         'mean_downs':round(aggregate['downs']/n,3),'mean_rounds':round(aggregate['rounds']/n,3),
         'mean_remaining_hp':round(aggregate['remaining_hp']/n,2),
         'mean_players_eligible_per_killed_enemy':round(aggregate['eligible']/max(1,aggregate['killed']),2)})
   print(f"{group_size} jugadores: {title:27} victorias {aggregate['win']/n:.1%}, sin bajas {aggregate['clean']/n:.1%}, n={n}",flush=True)
 impacts=[]
 for size in [4,6]:
  group=[x for x in combinations if x['group_size']==size]
  for sid,p in profiles.items():
   yes=[x['win_rate'] for x in group if sid in x['heroes']]
   no=[x['win_rate'] for x in group if sid not in x['heroes']]
   impacts.append({'group_size':size,'id':sid,'name':p['name'],'secret':p['secret'],
                  'with_character_win_rate':round(sum(yes)/len(yes),5),
                  'without_character_win_rate':round(sum(no)/len(no),5),
                  'difference_percentage_points':round(100*(sum(yes)/len(yes)-sum(no)/len(no)),2),
                  'mean_direct_damage_per_battle':round(herodamage[(size,sid)]/herofights[(size,sid)],2)})
 starter=[]
 for scen in SCENARIOS[4]:
  eligible=[x for x in combinations if x['group_size']==4 and x['scenario']==scen and all(not profiles[sid]['secret'] for sid in x['heroes'])]
  starter.append({'scenario':scen,'combinations':len(eligible),'win_rate':round(sum(x['win_rate'] for x in eligible)/len(eligible),5),
             'clean_rate':round(sum(x['clean_rate'] for x in eligible)/len(eligible),5),
             'worst_group':min(eligible,key=lambda x:x['win_rate'])['heroes'],
             'best_group':max(eligible,key=lambda x:x['win_rate'])['heroes']})
 sensitivity_rows=[]
 if sensitivity:
  starter_groups=list(itertools.combinations([p for p in profiles if not profiles[p]['secret']],4))
  for title,enemy_ids in list(SCENARIOS[4].items())[2:]:
   for dm in ['spread','focus']:
    for hypothetical_ceniza in [-1,0,2]:
     counter=Counter()
     for ids in starter_groups:
      for _ in range(12):
       result=fight(rng,[profiles[sid] for sid in ids],enemy_ids,enemies,hypothetical_ceniza,dm)
       counter['wins']+=result['win'];counter['clean']+=result['clean'];counter['downs']+=result['downs']
     n=len(starter_groups)*12
     sensitivity_rows.append({'scenario':title,'dm_strategy_test':dm,'enemy_ceniza_assumption':hypothetical_ceniza,
                  'samples':n,'win_rate':round(counter['wins']/n,5),'clean_win_rate':round(counter['clean']/n,5),
                  'mean_downs':round(counter['downs']/n,3)})
 output={'metadata':{'seed':seed,'repeat4':r4,'repeat6':r6,'official_enemy_ceniza':None,
       'initiative_enemy_ceniza_assumption':0,'main_gm_target_policy':'spread',
       'disclaimer':'NO simula tableros, posiciones, alcance, movilidad, obstáculos, efectos de terreno, habilidades, pasivas, martirios, estigma, puntos débiles ni curación. No son tasas oficiales de victoria.'},
        'hero_trial_builds':profiles,'scenarios':records,'starter_only':starter,'hero_impacts':impacts,
        'sensitivity':sensitivity_rows,'all_party_scenarios':combinations}
 dest=ROOT/'resultados'/'simulacion_resultados.json';dest.parent.mkdir(exist_ok=True)
 dest.write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print('RESULTADO:',dest,flush=True)
 return output

if __name__=='__main__':
 parser=argparse.ArgumentParser()
 parser.add_argument('--seed',type=int,default=20261022)
 parser.add_argument('--r4',type=int,default=90)
 parser.add_argument('--r6',type=int,default=50)
 parser.add_argument('--sin-sensibilidad',action='store_true')
 args=parser.parse_args()
 main(args.seed,args.r4,args.r6,not args.sin_sensibilidad)
