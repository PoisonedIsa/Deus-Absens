// DEUS ABSENS: fichas digitales de consulta y mesa del director. Sin cálculo de rutas.
import {cargarDatos} from './data.js';
import {cargarEstado,guardarEstado} from './state.js';
import {abrirModal,cerrarModal,avisar,escapar,mostrarError,mostrarSeccion,renderPersonajes,renderEnemigos,renderMesa,renderReliquias,textoFichaPersonaje,textoFichaEnemigo,getSheet,estadisticas} from './ui.js';
const $=id=>document.getElementById(id);
async function iniciar(){
 const data=await cargarDatos();const {characters,enemies,items,abilities,equipment}=data;
 const state=cargarEstado(items);
 const byChar=Object.fromEntries(characters.map(c=>[c.id,c]));
 const byEnemy=Object.fromEntries(enemies.map(e=>[e.id,e]));
 const byAbility=Object.fromEntries(abilities.map(a=>[a.id,a]));
 function render(){renderPersonajes(characters,state,abilities,equipment);renderEnemigos(enemies);renderMesa(enemies,state);renderReliquias(items,state)}
 function persist(){if(!guardarEstado(state))avisar('No se pudo guardar en el navegador.');render()}
 function sheetFor(c){const m=byAbility[c.martyrId];const s=getSheet(state,c.id,m);if(!state.sheets[c.id])state.sheets[c.id]={attrs:{...s.attrs},charges:s.charges,pv:s.pv,estigma:s.estigma};return {s,m,record:state.sheets[c.id]}}
 function unlockSaint(id){const c=byChar[id];if(!c||!c.secret||state.unlockedSaints.includes(id))return;
  abrirModal('Desbloqueo manual de prueba',`<p>¿Habilitar a <strong>${escapar(c.name)}</strong>? Esta herramienta es provisional para el director: aún no descontamos Ecos.</p>`,[
   {label:'Desbloquear',action:()=>{state.unlockedSaints.push(id);persist();avisar('Santo desbloqueado en este navegador.')}},{label:'Cancelar',secondary:true}], 'Basílica');
 }
 function choose(id){const c=byChar[id];if(!c||c.secret&&!state.unlockedSaints.includes(id))return;
  state.chosen=id;sheetFor(c);persist();avisar(`${c.name}: ficha activa.`);
  document.getElementById('characterSheetPanel').scrollIntoView({behavior:'smooth',block:'start'});
 }
 function modifyAttr(){const c=byChar[state.chosen];if(!c)return;const {s}=sheetFor(c);
  const names=['ACERO','CENIZA','SANGRE','DOGMA'];
  const build=attrs=>`<p>Reparte exactamente los valores +3, +2, +1 y +0. Al cambiar un atributo, su valor se intercambia con el de otro.</p>
  <div class="attribute-form">${names.map(name=>`<label>${name}<select data-attr="${name}">${[3,2,1,0].map(n=>`<option value="${n}" ${n===attrs[name]?'selected':''}>+${n}</option>`).join('')}</select></label>`).join('')}</div>
  <p class="muted" id="attributePreview"></p>`;
  let pending={...s.attrs};
  abrirModal('Distribuir atributos',build(pending),[{label:'Guardar ficha',action:()=>{const rec=state.sheets[c.id];rec.attrs={...pending};const max=estadisticas(pending);rec.pv=Math.min(rec.pv,max.pv);rec.estigma=Math.min(rec.estigma,max.estigma);persist();}},{label:'Cancelar',secondary:true}],c.name);
  const form=$('modalBody');
  function preview(){const p=estadisticas(pending);$('attributePreview').textContent=`PV ${p.pv} · Defensa ${p.defensa} · Movimiento ${p.movimiento} · Límite de Estigma ${p.estigma}`;}
  form.addEventListener('change',event=>{
   const name=event.target.dataset.attr;if(!name)return;
   const v=Number(event.target.value),old=pending[name];if(old===v)return;
   const swap=names.find(n=>n!==name&&pending[n]===v);
   pending[name]=v;if(swap)pending[swap]=old;
   for(const select of form.querySelectorAll('[data-attr]'))select.value=String(pending[select.dataset.attr]);
   preview();
  });preview();
 }
 function editPlayer(kind){const c=byChar[state.chosen];if(!c)return;const {s,record}=sheetFor(c);
  if(kind==='charge-use')record.charges=Math.max(0,s.charges-1);
  else if(kind==='charge-add')record.charges=Math.min(s.max,s.charges+1);
  else if(kind==='player-hp-minus')record.pv=Math.max(0,s.pv-1);
  else if(kind==='player-hp-plus')record.pv=Math.min(s.derived.pv,s.pv+1);
  else if(kind==='player-estigma-minus')record.estigma=Math.max(0,s.estigma-1);
  else if(kind==='player-estigma-plus')record.estigma=Math.min(s.derived.estigma,s.estigma+1);
  persist();
 }
 function resetCharges(){const c=byChar[state.chosen];if(!c)return;abrirModal('Nueva expedición',`<p>¿Restaurar todas las cargas de martirio de ${escapar(c.name)}? No se reinician los PV ni el Estigma en esta versión de ficha.</p>`,[
  {label:'Restaurar cargas',action:()=>{const {s,record}=sheetFor(c);record.charges=s.max;persist();}},{label:'Cancelar',secondary:true}], 'Santuario');}
 function unlockItem(id){const it=items.find(i=>i.id===id);if(!it||state.unlocked.includes(id))return;
  abrirModal('Registrar hallazgo',`<p>Desbloquear ${escapar(it.name)} en este navegador como prueba del catálogo.</p>`,[
   {label:'Registrar',action:()=>{state.unlocked.push(id);persist()}},{label:'Cancelar',secondary:true}]);}
 let counter=0;
 function spawn(id){const e=byEnemy[id];if(!e)return;
  counter+=1;const label=state.encounter.filter(s=>s.enemyId===id).length+1;
  state.encounter.push({uid:`${Date.now()}_${counter}_${Math.floor(Math.random()*10000)}`,enemyId:id,label,hp:e.hp});persist();avisar(`${e.name} añadido a la mesa.`);}
 function mutateEnemy(action,uid,amount){const i=state.encounter.findIndex(e=>e.uid===uid);if(i<0)return;
  const instance=state.encounter[i],def=byEnemy[instance.enemyId];if(!def)return;
  if(action==='enemy-remove'){state.encounter.splice(i,1);}
  if(action==='enemy-hit')instance.hp=Math.max(0,instance.hp-Number(amount||1));
  if(action==='enemy-heal')instance.hp=Math.min(def.hp,instance.hp+1);
  if(action==='enemy-full')instance.hp=def.hp;
  persist();
 }
 document.addEventListener('click',event=>{
  const t=event.target.closest('[data-goto],[data-section],[data-action]');if(!t)return;
  if(t.dataset.goto){event.preventDefault();mostrarSeccion(t.dataset.goto);return}
  if(t.dataset.section){mostrarSeccion(t.dataset.section);return}
  const a=t.dataset.action,id=t.dataset.id;
  if(a==='choose')choose(id);
  else if(a==='character-detail'){const c=byChar[id];if(c)abrirModal(c.name,textoFichaPersonaje(c,abilities,equipment,state),[{label:'Cerrar',secondary:true}],`Pecado · ${c.sin}`);}
  else if(a==='saint-unlock')unlockSaint(id);
  else if(a==='enemy-detail'){const e=byEnemy[id];if(e)abrirModal(e.name,textoFichaEnemigo(e),[{label:'Cerrar',secondary:true}],`${e.type} · ${e.threat}`);}
  else if(a==='enemy-add')spawn(id);
  else if(a==='enemy-hit'||a==='enemy-heal'||a==='enemy-full'||a==='enemy-remove')mutateEnemy(a,t.dataset.uid,t.dataset.amount);
  else if(a==='attributes')modifyAttr();
  else if(a==='charges-reset')resetCharges();
  else if(['charge-use','charge-add','player-hp-minus','player-hp-plus','player-estigma-minus','player-estigma-plus'].includes(a))editPlayer(a);
  else if(a==='unlock')unlockItem(id);
 });
 $('modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')cerrarModal()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')cerrarModal()});
 for(const id of ['characterSearch','characterFilter'])$(id).addEventListener('input',()=>renderPersonajes(characters,state,abilities,equipment));
 for(const id of ['enemySearch','enemyFilter'])$(id).addEventListener('input',()=>renderEnemigos(enemies));
 for(const id of ['itemSearch','itemFilter'])$(id).addEventListener('input',()=>renderReliquias(items,state));
 render();
}
iniciar().catch(e=>{console.error('No se pudo iniciar DEUS ABSENS:',e);mostrarError('No se pudieron cargar los catálogos. Comprueba los archivos JSON y utiliza GitHub Pages o un servidor local.')});
