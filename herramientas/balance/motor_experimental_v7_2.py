#!/usr/bin/env python3
"""DEUS ABSENS v7.1: Monte Carlo experiment (NOT official engine or AI for gameplay).
Spatial grid / simple one-step movement, partial character powers, fixed individual initiative.
All assumptions are labeled in report. Python 3 stdlib only. Does not mutate game site.
"""
import argparse, itertools, json, math, random, statistics
from pathlib import Path
from collections import defaultdict
from functools import lru_cache
ROOT=Path(__file__).resolve().parent
from sys import path as syspath
# Read fixed weapon/build presets from reproducible v7.0 script, not from gameplay automation.
BASE=ROOT/'simular_v7_0.py'
import importlib.util
spec=importlib.util.spec_from_file_location('base_v7',BASE)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
WEAPONS=base.WEAPONS
SCENARIOS=base.SCENARIOS
DATA=ROOT/'inputs'

# EXPERIMENTAL weapon range by broad category; not official item data.
RANGE={
 'Gólgota':2,'Clavos':6,'Ojo de Aguja':8,'Estilete':1,'Gancho':3,
 'Látigo':2,'Parrilla':3,'Martillo':1,'Cuchillos':1,'Ballesta':6,
 'Campanario':7,'Pilar':1,'Maza':1,'Campana':5,'Mandoble':1,
 'Fusil':7,'Losa':1}
STARTERS=['san-longinos','santa-lucia','san-erasmo','santa-magdalena','san-lorenzo','san-bartolome','san-simeon']

@lru_cache(None)
def dice_tuple(s):
 a,b=s.split('d');return int(a),int(b)
def roll(rng,s):
 a,b=dice_tuple(s);return sum(rng.randint(1,b) for _ in range(a))
def d2(rng):return rng.randrange(1,7)+rng.randrange(1,7)
def distance(a,b):return max(abs(a[0]-b[0]),abs(a[1]-b[1]))
def manhattan(a,b):return abs(a[0]-b[0])+abs(a[1]-b[1])

def line_tiles(a,b):
 """Tiles the segment touches internally, excluding endpoints and mere boundary contact."""
 dx=b[0]-a[0];dy=b[1]-a[1];n=max(2,math.ceil(math.hypot(dx,dy)*12))
 seen=set()
 for i in range(1,n):
  x=a[0]+dx*i/n;y=a[1]+dy*i/n
  if abs((x+.5)-round(x+.5))<0.0001 or abs((y+.5)-round(y+.5))<0.0001:continue
  seen.add((math.floor(x+0.5),math.floor(y+0.5)))
 return seen

def los(a,b,walls):return not any(p in walls for p in line_tiles(a,b))
def covered(a,b,low):
 return any(p in low and distance(p,b)<=2 for p in line_tiles(a,b))

def create_map(rng,size,terrain):
 walls=set();low=set()
 if terrain=='empty':return walls,low
 # 2-5 center obstacles, leave broad passages. No pathfinding or procedural zone maps in the game.
 m=size//2
 template=[(m-2,m-1),(m+1,m+1),(m,m+2),(m-3,m+2),(m+2,m-1)]
 for pt in template[:(3 if size==10 else 5)]:
  if rng.random()<.65:walls.add(pt)
 for pt in [(m-2,m+1),(m-1,m+1),(m+2,m+1),(m+2,m-2),(m-1,m-2)]:
  if rng.random()<.76 and pt not in walls:low.add(pt)
 return walls,low

def initial_positions(size,nplayers,nenemies,walls):
 # Several lines of distance, forcing melee mobility. Fixed, deterministic layout.
 ps=[];es=[]
 for i in range(nplayers):
  x=1+(i*2)%(size-2);y=size-3-(i//((size-2)//2))*1
  while (x,y) in walls:y+=1
  ps.append((x,y))
 for i in range(nenemies):
  x=1+(i*2)%(size-2);y=2+(i//((size-2)//2))*1
  while (x,y) in walls:y-=1
  es.append((x,y))
 return ps,es

def move_toward(ent,target,steps,size,walls,low,occupied,rng,playerside):
 """Greedy one-step movement (no route search, obstacles can block progress)."""
 moved=False
 while steps>0 and distance(ent['pos'],target['pos'])>1:
  x,y=ent['pos'];tx,ty=target['pos'];choices=[]
  for dx,dy in [(1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)]:
   xy=(x+dx,y+dy)
   if not(0<=xy[0]<size and 0<=xy[1]<size) or xy in walls or xy in occupied:continue
   cost=(1 if dx==0 or dy==0 else 2)*(2 if playerside and xy in low else 1)
   if cost>steps:continue
   score=(manhattan((x,y),target['pos'])-manhattan(xy,target['pos']))/cost
   if score>0:choices.append((score,xy,cost))
  if not choices:break
  best=max(q[0] for q in choices);opt=[q for q in choices if q[0]==best];_,pos,cost=rng.choice(opt)
  occupied.discard(ent['pos']);occupied.add(pos);ent['pos']=pos;steps-=cost;moved=True
 return moved

def calc_atk(rng,bonus,defense,dmgdice,armor,extra=0,bonusdice=None,penalty=0,autohit=False,ignorearmor=False):
 if autohit:a,b=3,4
 else:a,b=rng.randint(1,6),rng.randint(1,6)
 crit=(a==6 and b==6);fumble=(a==1 and b==1)
 hit=not fumble and (autohit or crit or a+b+bonus-penalty>=defense)
 damage=0
 if hit:
  damage=roll(rng,dmgdice)+(roll(rng,dmgdice) if crit else 0)+extra+(roll(rng,bonusdice) if bonusdice else 0)
  damage=max(0,damage-(0 if ignorearmor else armor))
 return hit,damage,fumble

def initiative(rng,units):
 # One roll at start. total > CENIZA > roll among tied, preserving relative tie-group slot.
 buckets=defaultdict(list)
 for p in units:buckets[(d2(rng)+p['ceniza'],p['ceniza'])].append(p)
 def tie(group):
  if len(group)<2:return group
  if len(group)>1:
   # same CENIZA in group, reroll only this group, recursively until resolved
   vals=defaultdict(list)
   for q in group:vals[d2(rng)+q['ceniza']].append(q)
   if len(vals)==1:return tie(group)
   return [u for n in sorted(vals,reverse=True) for u in tie(vals[n])]
 return [u for k in sorted(buckets,reverse=True) for u in tie(buckets[k])]

def make_players(ids,profiles,positions):
 out=[]
 for i,sid in enumerate(ids):
  p=profiles[sid];attrs=p['attrs'];out.append({'side':'p','sid':sid,'pos':positions[i],'hp':p['hp'],'maxhp':p['hp'],
    'defense':p['defense'],'armor':0,'bonusarmor':0,'ceniza':attrs['CENIZA'], 'attrs':attrs, 'fumble':False,
    'charges':1,'estigma':0,'bleed':0,'spectres':[],'hungry':0,'eaten':set(),'expose':0,
    'reflect':0,'protected':False,'autonext':False,'warform':0,'undead':0,'started':False,
    'damage':0,'actions':0,'martyrused':0,'turns_moving':0,'turns_still':0})
 return out

def make_enemies(enemy_ids,templates,positions,ecen):
 out=[]
 for i,sid in enumerate(enemy_ids):
  d=templates[sid];out.append({'side':'e','sid':sid,'instance':i,'pos':positions[i],'hp':d['hp'],
   'maxhp':d['hp'],'defense':d['defense'],'armor':d['armor'],'ceniza':ecen,
   'move':d['movement'],'attacks':d['attacks'],'fumble':False,'bleed':0,'plague':0,'plague_owner':None,
   'blind':0,'vulnerable':False,'attacked_by':set(),'damage':0,'actions':0})
 return out

def weapon_options(sid,attrs):
 return [{'name':name,'dmg':d,'att':attrs[a],'attr':a,'range':RANGE[name],'vsarmor':b}
         for name,d,a,b in WEAPONS[sid]]

def choose_weapon(p,e,options,low,walls,moved,feat):
 choices=[]
 for w in options:
  if distance(p['pos'],e['pos'])>w['range'] or not los(p['pos'],e['pos'],walls):continue
  penalty=(2 if p['sid']=='santa-lucia' and w['name']=='Ojo de Aguja' and moved else 0)
  defn=e['defense']+(1 if w['range']>1 and covered(p['pos'],e['pos'],low) else 0)
  # rough expected outgoing dmg, independent from randomness, actual dice computed on attack.
  avg=sum(dice_tuple(w['dmg']))/2 # overwritten below
  n,faces=dice_tuple(w['dmg']);avg=n*(faces+1)/2
  bonus=(2 if w['vsarmor'] and e['armor']>0 else 0)
  if feat and p['sid']=='san-simeon' and not moved and w['name']=='Campanario':bonus+=2
  score=base.chance(w['att']-penalty,defn)*max(0,avg+bonus-e['armor'])
  if feat and p['sid']=='san-lazaro' and w['name']=='Fusil' and e['plague']==0:score+=2
  if feat and p['sid']=='san-lorenzo' and w['name']=='Parrilla':score+=1
  choices.append((score,w,defn,penalty,bonus))
 return max(choices,key=lambda t:t[0]) if choices else None

def target_for_hero(p,enemies,feat):
 live=[e for e in enemies if e['hp']>0]
 if not live:return None
 # Aim at a vulnerable/exposed enemy or nearly finished foe, encouraging teamwork.
 return max(live,key=lambda e:(1-e['hp']/e['maxhp'])*5+(1 if e['sid'] in ['hueco-que-reza','serafin-ceniza'] else 0)
            -.1*distance(p['pos'],e['pos']))

def target_for_enemy(e,players,dm,rng):
 live=[p for p in players if p['hp']>0 and not p['protected']]
 if not live:return None
 if dm=='focus':return min(live,key=lambda p:(p['hp']/p['maxhp'],distance(e['pos'],p['pos'])*.015))
 # A director spreading attacks chooses randomly among plausible targets.
 return rng.choice(live)

def damage_enemy(e,amount,source=None):
 if amount<=0:return
 e['hp']-=amount
 if source is not None:source['damage']+=amount

def damage_player(p,amount):
 if amount<=0:return
 p['hp']-=amount

def fight(rng,ids,scenario,profiles,template,feat=True,board='terrain',dm='spread',ecen=0,round_cap=16,carry=None,strict_known=False):
 size=10 if len(ids)==4 else 15
 walls,low=create_map(rng,size,board)
 pp,ee=initial_positions(size,len(ids),len(scenario),walls)
 players=make_players(ids,profiles,pp);enemies=make_enemies(scenario,template,ee,ecen)
 if strict_known:
  # No inventar capacidad: solamente Longinos tiene carga oficial, exactamente 1.
  for player in players:
   if player['sid'] != 'san-longinos':player['charges']=0
 if carry:
  for p in players:
   if p['sid'] in carry:
    old=carry[p['sid']];p['hp']=old['hp'];p['charges']=old['charges'];p['estigma']=old['estigma']
 units=initiative(rng,players+enemies)
 stats={'moves':0,'blocked':0,'attacks':0,'martyrs':0,'passives':0,'status':0,'hits':0,'near_armor_hits':0}
 winner=False;rounds=0
 for rn in range(1,round_cap+1):
  rounds=rn
  if not any(p['hp']>0 for p in players) or not any(e['hp']>0 for e in enemies):break
  for q in units:
   if q['hp']<=0:continue
   if not any(p['hp']>0 for p in players) or not any(e['hp']>0 for e in enemies):break
   q['actions']+=1
   if q['side']=='e':
    if q['bleed']>0:
     q['bleed']-=1;dealt=roll(rng,'1d6');damage_enemy(q,dealt);stats['status']+=1
     for p in players:
      if p['sid']=='san-longinos' and p['hp']>0: p['hp']=min(p['maxhp'],p['hp']+3);break
    if q['plague']>0:
     q['plague']-=1;damage_enemy(q,2);stats['status']+=1
    if q['hp']<=0:continue
    t=target_for_enemy(q,players,dm,rng)
    if t is None:continue
    # select attack with highest expected threat *if* in reach, otherwise close distance
    def eligible_attacks(t):
     return [a for a in q['attacks'] if distance(q['pos'],t['pos'])<=a['rangeTiles'] and los(q['pos'],t['pos'],walls)]
    attacks=eligible_attacks(t)
    if not attacks:
     candidates=[p for p in players if p['hp']>0 and not p['protected']]
     if candidates:t=min(candidates,key=lambda p:distance(p['pos'],q['pos']))
     occupied={a['pos'] for a in players+enemies if a is not q and a['hp']>0}
     stats['moves']+=int(move_toward(q,t,q['move'],size,walls,low,occupied,rng,False))
     attacks=eligible_attacks(t)
    if not attacks:continue
    # special enemy abilities not modeled: insufficient numeric rules
    a=max(attacks,key=lambda a:base.expected(a['damage'],a['attackBonus'],t['defense'],t['armor']+t['bonusarmor'])*a['strikes'])
    for ix in range(a['strikes']):
     if t['hp']<=0:break
     # if a martyr response from Simeon is active, enemy reaching melee may be shot once
     if feat and not strict_known and t['sid']=='san-simeon' and t.get('overwatch',0)>0 and a['rangeTiles']==1 and distance(q['pos'],t['pos'])<=1:
      damage_enemy(q,roll(rng,'2d6'),t);t['overwatch']-=1;stats['martyrs']+=1
      if q['hp']<=0:break
     defense=t['defense']+(1 if a['rangeTiles']>1 and covered(q['pos'],t['pos'],low) else 0)
     pen=(1 if q['fumble'] else 0)+(3 if q['blind']>0 else 0)
     hit,dmg,fum=calc_atk(rng,a['attackBonus'],defense,a['damage'],t['armor']+t['bonusarmor'],penalty=pen)
     q['fumble']=fum;stats['attacks']+=1
     if hit:stats['hits']+=1
     damage_player(t,dmg)
     if feat and not strict_known and t['reflect']>0 and dmg>0:
      linked=next((e for e in enemies if e['instance']==t.get('linked') and e['hp']>0),None)
      if linked is not None:damage_enemy(linked,2*dmg,t);stats['passives']+=1
     if feat and not strict_known and t['sid']=='san-lazaro' and t['hp']<=0 and t['undead']==0:
      t['undead']=2; t['hp']=1 # provisional two-turn borrowed-life state, not rule change
    q['blind']=max(0,q['blind']-1)
    continue
   # HERO START
   sid=q['sid'];attrs=q['attrs'];hero_feat=feat and (not strict_known or sid=='san-longinos');q['protected']=False;q['bonusarmor']=0
   if q['reflect']>0:q['reflect']-=1
   if hero_feat and sid=='san-simeon' and q.get('overwatch',0)>0:q['overwatch']=0
   if hero_feat and sid=='san-lazaro' and q['undead']>0:
    q['undead']-=1
    if q['undead']==0 and q['hp']<=1:q['hp']=0;continue
   if hero_feat and sid=='san-erasmo':
    corpses=[e for e in enemies if e['hp']<=0 and e['instance'] not in q['eaten'] and distance(q['pos'],e['pos'])<=2]
    if corpses:
     e=corpses[0];q['eaten'].add(e['instance']);q['hp']=min(q['maxhp'],q['hp']+roll(rng,'1d6'))
     q['armor']=min(3,q['armor']+1);q['hungry']=0;stats['passives']+=1
    else:
     q['hungry']+=1
     if q['hungry']>=2:q['hp']-=2;stats['passives']+=1
   if q['hp']<=0:continue
   if hero_feat and sid=='san-judas-tadeo':
    q['spectres']=[x-1 for x in q['spectres'] if x>1]
   q['started']=True
   target=target_for_hero(q,enemies,hero_feat)
   if target is None:continue
   opts=weapon_options(sid,attrs)
   selected=choose_weapon(q,target,opts,low,walls,False,hero_feat)
   moved=False
   if not selected:
    # Heroes can shoot at nearest reachable targets; try that before moving.
    for possible in sorted((e for e in enemies if e['hp']>0),key=lambda e:distance(q['pos'],e['pos'])):
     selected=choose_weapon(q,possible,opts,low,walls,False,hero_feat)
     if selected:target=possible;break
   if not selected:
    occupied={a['pos'] for a in players+enemies if a is not q and a['hp']>0}
    moved=move_toward(q,target,2+attrs['CENIZA'],size,walls,low,occupied,rng,True)
    stats['moves']+=int(moved)
    selected=choose_weapon(q,target,opts,low,walls,moved,hero_feat)
    if not selected:
     for possible in sorted((e for e in enemies if e['hp']>0),key=lambda e:distance(q['pos'],e['pos'])):
      selected=choose_weapon(q,possible,opts,low,walls,moved,hero_feat)
      if selected:target=possible;break
   if moved:q['turns_moving']+=1
   else:q['turns_still']+=1
   if hero_feat and sid=='san-simeon' and not moved:
    q['bonusarmor']=2;stats['passives']+=1
   # martyrs: one-charge assumption per hero except Longinos confirmed exactly one
   if hero_feat and q['charges']>0:
    live=[e for e in enemies if e['hp']>0 and distance(q['pos'],e['pos'])<=4 and los(q['pos'],e['pos'],walls)]
    if sid=='san-longinos' and live and (target['maxhp']>=26 or q['hp']<=q['maxhp']/2):
     target['bleed']=max(target['bleed'],3);q['charges']-=1;stats['martyrs']+=1; q['martyrused']+=1;continue
    if sid=='santa-lucia' and selected and (target['maxhp']>=16 or rn>=3):
     dmg=max(0,roll(rng,'2d12')-target['armor']);damage_enemy(target,dmg,q)
     target['attacked_by'].add(sid);q['charges']-=1;stats['martyrs']+=1;q['martyrused']+=1;continue
    if sid=='san-erasmo' and len(live)>=2:
     for e in sorted(live,key=lambda t:distance(q['pos'],t['pos']))[:2]:
      damage_enemy(e,max(0,roll(rng,'2d6')-e['armor']),q);e['armor']=max(0,e['armor']-2);e['attacked_by'].add(sid)
     q['charges']-=1;stats['martyrs']+=1;q['martyrused']+=1;continue
    if sid=='santa-magdalena' and live and q['hp']<=q['maxhp']*.7:
     q['reflect']=2;q['linked']=target['instance'];q['charges']-=1;stats['martyrs']+=1;q['martyrused']+=1;continue
    if sid=='san-bartolome' and live and (target['maxhp']>=20 or rn>=3):
     q['autonext']=True;q['protected']=True;q['charges']-=1;stats['martyrs']+=1;q['martyrused']+=1;continue
    if sid=='san-simeon' and live and len(live)>=2 and distance(q['pos'],live[0]['pos'])<=3:
     q['overwatch']=1;q['charges']-=1;stats['martyrs']+=1;q['martyrused']+=1;continue
    if sid=='san-judas-tadeo' and live and len(live)>=2:
     q['spectres']=[2,2,2];q['charges']-=1;stats['martyrs']+=1;q['martyrused']+=1
     for e in live[:3]:damage_enemy(e,max(0,roll(rng,'2d6')),q);e['attacked_by'].add(sid)
     continue
    if sid=='santa-juana' and live and len(live)>=2:
     for e in live[:3]:
      damage_enemy(e,max(0,roll(rng,'2d8')-e['armor']),q);e['blind']=1;e['attacked_by'].add(sid)
     q['estigma']+=5;q['charges']-=1;stats['martyrs']+=1;q['martyrused']+=1;continue
    if sid=='san-lazaro' and live and (target['maxhp']>=20 or rn>=3):
     e=target;damage_enemy(e,max(0,roll(rng,'3d6')-e['armor']),q)
     e['vulnerable']=True;e['attacked_by'].add(sid)
     q['estigma']=max(0,q['estigma']-3);q['charges']-=1;stats['martyrs']+=1;q['martyrused']+=1;continue
   if not selected:continue
   _,w,defn,penalty,bonus=selected
   if q['autonext'] and w['name']=='Cuchillos':
    autohit=True;q['autonext']=False
   else:autohit=False
   # Lasting status for a few heroes
   if hero_feat and sid=='san-erasmo' and target['hp']<=0:continue
   ext=(1 if q['fumble'] else 0)+penalty
   bonusdice='1d4' if hero_feat and sid=='san-longinos' and q['hp']<=q['maxhp']/2 else None
   if hero_feat and sid=='santa-magdalena' and q['estigma']>=5:bonus+=3
   if hero_feat and sid=='san-simeon' and not moved and w['name']=='Campanario':bonus+=2
   ignorearmor=feat and sid=='santa-juana' and q['warform']>0
   hit,dmg,fum=calc_atk(rng,w['att'],defn,w['dmg'],target['armor'],bonus,bonusdice,ext,autohit,ignorearmor)
   q['fumble']=fum;stats['attacks']+=1
   if hit:
    target['attacked_by'].add(sid);stats['hits']+=1
    if hero_feat and sid=='san-lazaro' and w['name']=='Fusil': target['plague']=3
   damage_enemy(target,dmg+(2 if hero_feat and target['vulnerable'] and hit else 0),q)
   if hero_feat and sid=='san-lorenzo' and w['name']=='Parrilla' and hit:
    others=[e for e in enemies if e['hp']>0 and e is not target and distance(q['pos'],e['pos'])<=3 and los(q['pos'],e['pos'],walls)]
    if others:
     t=others[0];h,d,_=calc_atk(rng,w['att'],t['defense'],w['dmg'],t['armor'])
     if h:t['attacked_by'].add(sid)
     damage_enemy(t,d,q);stats['passives']+=1
   if hero_feat and sid=='san-judas-tadeo' and q['spectres']:
    # Spectre damage die UNDEFINED in official record: modeled as 1d4 sensitivity assumption.
    for s in q['spectres']:
     live=[e for e in enemies if e['hp']>0 and distance(q['pos'],e['pos'])<=5]
     if live:
      t=live[0];h,d,_=calc_atk(rng,attrs['DOGMA'],t['defense'],'1d4',t['armor'])
      if h:t['attacked_by'].add(sid)
      damage_enemy(t,d,q);stats['passives']+=1
   if hero_feat and sid=='san-lazaro' and q['undead']>0:
    if any(e['hp']<=0 for e in enemies):q['hp']=min(q['maxhp'],5);q['undead']=0;stats['passives']+=1
  # end combat per round
 alive=sum(p['hp']>0 for p in players)
 allkilled=all(e['hp']<=0 for e in enemies)
 stats.update({'win':int(allkilled and alive>0),'clean':int(allkilled and alive==len(players)),
   'downs':len(players)-alive,'rounds':rounds,'hp_left':sum(max(0,p['hp']) for p in players),
   'kills':sum(e['hp']<=0 for e in enemies),'ecos_eligible':sum(len(e['attacked_by']) for e in enemies if e['hp']<=0),
   'player_damage':{p['sid']:p['damage'] for p in players},
   'end_state':{p['sid']:{'hp':max(0,p['hp']),'charges':p['charges'],'estigma':p['estigma']} for p in players}})
 return stats

def aggregate(rows):
 n=len(rows);return {'samples':n,'win':round(sum(x['win'] for x in rows)/n,4),
  'clean':round(sum(x['clean'] for x in rows)/n,4),
  'downs':round(sum(x['downs'] for x in rows)/n,3),'rounds':round(sum(x['rounds'] for x in rows)/n,2),
  'martyr_uses':round(sum(x['martyrs'] for x in rows)/n,2),
  'movement_acts':round(sum(x['moves'] for x in rows)/n,2),
  'hits':round(sum(x['hits'] for x in rows)/n,2),
  'damage':round(sum(sum(x['player_damage'].values()) for x in rows)/n,2)}

def main(reps4=1,reps6=1,seed=20261022):
 rng=random.Random(seed);pro=base.new_profiles();enemies={e['id']:e for e in json.loads((DATA/'enemigos.json').read_text(encoding='utf-8'))}
 asserts=[len(pro)==10,len(enemies)==6,all(e.get('ceniza') is None for e in enemies.values())]
 assert all(asserts)
 scenarios={4:{k:v for k,v in SCENARIOS[4].items() if k in ['Z1 patrulla','Z2 incursión','Z3 elites','Z3 asedio','Jefe acompañado','Jefe reforzado']},
            6:{k:v for k,v in SCENARIOS[6].items() if k in ['Z1 patrulla ampliada','Z3 elites ampliada','Z3 asedio ampliada','Jefe reforzado ampliada']}}
 summary=[];groups=[];matchcount=0
 for size,sc in scenarios.items():
  allgroups=list(itertools.combinations(pro,size))
  reps=reps4 if size==4 else reps6
  for title,encounter in sc.items():
   counters={'basic':[],'partial':[]};bygroup={'basic':defaultdict(list),'partial':defaultdict(list)}
   for ids in allgroups:
    for mode in ['basic','partial']:
     for _ in range(reps):
      x=fight(rng,ids,encounter,pro,enemies,feat=mode=='partial',board='terrain',dm='spread')
      counters[mode].append(x);bygroup[mode][ids].append(x);matchcount+=1
   for mode in ['basic','partial']:
    rows=counters[mode];summary.append({'size':size,'board':size==4 and '10×10' or '15×15','scenario':title,'mode':mode,'enemies':encounter,**aggregate(rows)})
    for ids,rs in bygroup[mode].items():
     groups.append({'size':size,'scenario':title,'mode':mode,'members':ids,'starter_only':all(k in STARTERS for k in ids),**aggregate(rs)})
   print(size,title,'n',len(counters['partial']), 'base',round(100*sum(x['win'] for x in counters['basic'])/len(counters['basic']),1),
      'skills',round(100*sum(x['win'] for x in counters['partial'])/len(counters['partial']),1),flush=True)
 # director tactics / enemy CENIZA / terrain sensitivity, 35 starter groups only
 sensitivity=[];starters=list(itertools.combinations(STARTERS,4))
 for scene_name in ['Z2 incursión','Z3 elites','Z3 asedio','Jefe acompañado','Jefe reforzado']:
  eids=scenarios[4][scene_name]
  for gm in ['spread','focus']:
   for terrain in ['empty','terrain']:
    for ecen in [0,2]:
     rows=[]
     for group in starters:
      for _ in range(4):rows.append(fight(rng,group,eids,pro,enemies,feat=True,dm=gm,board=terrain,ecen=ecen))
     sensitivity.append({'scenario':scene_name,'gm':gm,'terrain':terrain,'enemy_ceniza_trial':ecen,**aggregate(rows)})
     matchcount+=len(rows)
 # Proposed encounter choices test hard roguelite target 35-70% win. ALL are recommendations, not fixed levels.
 # calibrate examples using existing enemies; some enemy configurations can be extreme.
 candidate_scenarios={
  'Z1 prueba dificil':['deudor-sal','perro-puerta','querubin-desollado','querubin-desollado'],
  'Z2 prueba dificil':['serafin-ceniza','querubin-desollado','querubin-desollado','perro-puerta'],
  'Z2 caceria':['novia-foso','querubin-desollado','querubin-desollado','deudor-sal'],
  'Z3 prueba dificil':['serafin-ceniza','novia-foso','querubin-desollado','querubin-desollado'],
  'Jefe de prueba':['hueco-que-reza','querubin-desollado','querubin-desollado'],
  'Jefe extremo':['hueco-que-reza','serafin-ceniza','querubin-desollado','querubin-desollado']}
 candidates=[]
 for label,eids in candidate_scenarios.items():
  rows=[]
  for group in starters:
   for _ in range(8):rows.append(fight(rng,group,eids,pro,enemies,feat=True,board='terrain',dm='focus',ecen=0))
  candidates.append({'name':label,'enemies':eids,'gm':'focus','board':'10x10','enemy_ceniza_trial':0,**aggregate(rows)})
  matchcount+=len(rows)
  print('test diff',label,round(100*candidates[-1]['win'],1),flush=True)
 out={'metadata':{'seed':seed,'reps4':reps4,'reps6':reps6,'total_fights':matchcount,
       'baseline':'base weapons and position; no special abilities',
       'partial':'some passive and martyrdom effects, numerous assumptions documented; not complete balance',
       'important':'NO AI/pathfinding is introduced to the game website. The simulated director uses simple fixed attack selection policies.',
       'enemy_ceniza':'Provisional +0 and +2 test values only; official enemy CENIZA unset'},
      'scenarios':summary,'groups':groups,'sensitivity':sensitivity,'candidate_hard_scenarios':candidates}
 dest=ROOT/'resultados';dest.mkdir(exist_ok=True)
 (dest/'simulacion_espacial_v7_1.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print('TOTAL',matchcount,flush=True)
 return out


# Use simular_v7_2.py for the controlled comparison.
