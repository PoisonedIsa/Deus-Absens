// DEUS ABSENS: fichas digitales de consulta y mesa del director. Sin cálculo de rutas.
import {cargarDatos} from './data.js';
import {cargarEstado,guardarEstado} from './state.js';
import {abrirModal,cerrarModal,avisar,escapar,mostrarError,mostrarSeccion,renderPersonajes,renderEnemigos,renderMesa,renderReliquias,renderResumen,renderZonas,textoFichaPersonaje,textoFichaEnemigo,textoFichaZona,getSheet,estadisticas} from './ui.js';
const $=id=>document.getElementById(id);
function cerrarPortada(destino='inicio'){
 const gate=$('splashGate');
 if(!gate||!gate.classList.contains('open')){mostrarSeccion(destino);return;}
 gate.classList.remove('open');
 gate.classList.add('closing');
 gate.setAttribute('aria-hidden','true');
 gate.hidden=true;
 mostrarSeccion(destino);
}
async function iniciar(){
 const data=await cargarDatos();const {characters,enemies,items,abilities,equipment,zones,zonesStatus}=data;
 const state=cargarEstado(items);
 state.sheetTab='resumen';state.catalogOpen=false;
 const byChar=Object.fromEntries(characters.map(c=>[c.id,c]));
 const byEnemy=Object.fromEntries(enemies.map(e=>[e.id,e]));
 const byZone=Object.fromEntries(zones.map(z=>[z.id,z]));
 const byAbility=Object.fromEntries(abilities.map(a=>[a.id,a]));
 function render(kind='all'){
  if(kind==='all'||kind==='characters')renderPersonajes(characters,state,abilities,equipment,items);
  if(kind==='all')renderEnemigos(enemies);
  if(kind==='all')renderZonas(zones,zonesStatus);
  if(kind==='all'||kind==='encounter')renderMesa(enemies,state);
  if(kind==='all'||kind==='items')renderReliquias(items,state);
  renderResumen(characters,enemies,items,state);
 }
 function persist(kind){if(!guardarEstado(state))avisar('No se pudo guardar en el navegador.');render(kind)}
 function sheetFor(c){
  const m=byAbility[c.martyrId],s=getSheet(state,c.id,m);
  if(!state.sheets[c.id])state.sheets[c.id]={attrs:{...s.attrs},charges:s.charges,pv:s.pv,estigma:s.estigma};
  const record=state.sheets[c.id];
  if(!Array.isArray(record.inventory))record.inventory=(c.equipmentIds||[]).map((id,i)=>({uid:`initial-${c.id}-${i}`,kind:'equipment',id}));
  return {s,m,record};
 }
 function unlockSaint(id){const c=byChar[id];if(!c||!c.secret||state.unlockedSaints.includes(id))return;
  abrirModal('Desbloqueo manual de prueba',`<p>¿Habilitar a <strong>${escapar(c.name)}</strong>? Esta herramienta es provisional para el director: aún no descontamos Ecos.</p>`,[
   {label:'Desbloquear',action:()=>{state.unlockedSaints.push(id);persist('characters');avisar('Santo desbloqueado en este navegador.')}},{label:'Cancelar',secondary:true}], 'Basílica');
 }
 function choose(id){const c=byChar[id];if(!c||state.selectionLocked||c.secret&&!state.unlockedSaints.includes(id))return;
  state.chosen=id;state.sheetTab='resumen';state.catalogOpen=false;sheetFor(c);persist('characters');avisar(`${c.name}: prepara los atributos antes de sellar la ficha.`);
  document.getElementById('characterSheetPanel').scrollIntoView({behavior:'auto',block:'start'});
 }
 function modifyAttr(){const c=byChar[state.chosen];if(!c||state.selectionLocked)return;const {s}=sheetFor(c);
  const names=['ACERO','CENIZA','SANGRE','DOGMA'];
  const build=attrs=>`<p>Reparte exactamente los valores +3, +2, +1 y +0. Al cambiar un atributo, su valor se intercambia con el de otro.</p>
  <div class="attribute-form">${names.map(name=>`<label>${name}<select data-attr="${name}">${[3,2,1,0].map(n=>`<option value="${n}" ${n===attrs[name]?'selected':''}>+${n}</option>`).join('')}</select></label>`).join('')}</div>
  <p class="muted" id="attributePreview"></p>`;
  let pending={...s.attrs};
  abrirModal('Distribuir atributos',build(pending),[{label:'Guardar ficha',action:()=>{const rec=state.sheets[c.id];rec.attrs={...pending};rec.attributesConfirmed=true;const max=estadisticas(pending);rec.pv=Math.min(rec.pv,max.pv);rec.estigma=Math.min(rec.estigma,max.estigma);persist('characters');}},{label:'Cancelar',secondary:true}],c.name);
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
 function confirmCharacter(){
  const c=byChar[state.chosen];if(!c||state.selectionLocked)return;
  const {record}=sheetFor(c);
  if(!record.attributesConfirmed){avisar('Primero revisa y guarda los atributos.');return;}
  const values=Object.values(record.attrs||{}).slice().sort((a,b)=>b-a);
  if(JSON.stringify(values)!=='[3,2,1,0]'){avisar('Debes asignar exactamente +3, +2, +1 y +0.');return;}
  abrirModal('Sellar ficha de partida',`<p>¿Confirmar a <strong>${escapar(c.name)}</strong> como tu Penitente para esta partida?</p><p>Los atributos y la selección quedarán bloqueados. Podrás seguir gestionando PV, Estigma, martirio e inventario. El director podrá reabrir la selección mediante una confirmación expresa.</p>`,[
    {label:'Confirmar y sellar',action:()=>{state.selectionLocked=true;state.sheetTab='resumen';state.catalogOpen=false;persist('characters');avisar('Ficha sellada. Se ha abierto tu hoja de partida.')}},
    {label:'Volver',secondary:true}
  ],'Rito de consagración');
 }
 function reopenSelection(){
  if(!state.selectionLocked)return;
  abrirModal('Reabrir la selección',`<p>Esta acción administrativa permitirá cambiar de Santo o volver a distribuir atributos. No borra los objetos ni las estadísticas guardadas de los personajes.</p><p><strong>Advertencia:</strong> el bloqueo es local a este navegador; no funciona como bloqueo multijugador en línea.</p>`,[
    {label:'Reabrir (director)',action:()=>{state.selectionLocked=false;state.catalogOpen=true;state.sheetTab='resumen';persist('characters');}},
    {label:'Cancelar',secondary:true}
  ],'Control del director');
 }
 function addInventory(){
  const c=byChar[state.chosen];if(!c||!state.selectionLocked)return;
  const owned=items.filter(i=>state.unlocked.includes(i.id));
  const options=owned.map(i=>`<option value="${escapar(i.id)}">${escapar(i.name)} (${escapar(i.rarity)})</option>`).join('');
  const body=`<p>Registra un objeto obtenido durante esta expedición. Puedes añadir una reliquia que ya esté desbloqueada o escribir el nombre de un objeto narrativo.</p><label class="inventory-field">Reliquia desbloqueada<select id="inventorySelect"><option value="">Seleccionar…</option>${options}</select></label><label class="inventory-field">O registrar objeto manual<input id="inventoryCustom" maxlength="100" placeholder="Nombre del objeto" autocomplete="off"></label><p class="fine-print muted">Este registro no consume los desbloqueos del grupo ni implementa todavía capacidad o peso.</p>`;
  abrirModal('Registrar pertenencia',body,[
   {label:'Añadir al inventario',action:()=>{
      const id=$('inventorySelect')?.value||'',name=($('inventoryCustom')?.value||'').trim().slice(0,100);
      const entry=name?{kind:'manual',name}:id&&owned.some(x=>x.id===id)?{kind:'relic',id}:null;
      if(!entry){avisar('Elige una reliquia o escribe un nombre.');return;}
      const {record}=sheetFor(c);
      record.inventory.push({uid:`inv-${Date.now()}-${Math.floor(Math.random()*100000)}`,...entry});
      state.sheetTab='inventario';persist('characters');avisar('Objeto registrado en la ficha.');
   }},{label:'Cancelar',secondary:true}
  ],c.name);
 }
 function removeInventory(uid){
  const c=byChar[state.chosen];if(!c||!state.selectionLocked)return;
  const {record}=sheetFor(c);
  const item=record.inventory?.find(x=>x.uid===uid);if(!item)return;
  abrirModal('Retirar objeto',`<p>¿Retirar esta pertenencia del inventario de ${escapar(c.name)}?</p><p>Esta acción solo cambia el registro local del personaje; no modifica el desbloqueo del grupo.</p>`,[
    {label:'Retirar',action:()=>{record.inventory=record.inventory.filter(x=>x.uid!==uid);persist('characters');}},
    {label:'Cancelar',secondary:true}
  ],'Inventario');
 }
 function editPlayer(kind){const c=byChar[state.chosen];if(!c)return;const {s,record}=sheetFor(c);
  if(kind==='charge-use')record.charges=Math.max(0,s.charges-1);
  else if(kind==='charge-add')record.charges=Math.min(s.max,s.charges+1);
  else if(kind==='player-hp-minus')record.pv=Math.max(0,s.pv-1);
  else if(kind==='player-hp-plus')record.pv=Math.min(s.derived.pv,s.pv+1);
  else if(kind==='player-estigma-minus')record.estigma=Math.max(0,s.estigma-1);
  else if(kind==='player-estigma-plus')record.estigma=Math.min(s.derived.estigma,s.estigma+1);
  persist('characters');
 }
 function resetCharges(){const c=byChar[state.chosen];if(!c)return;abrirModal('Nueva expedición',`<p>¿Restaurar todas las cargas de martirio de ${escapar(c.name)}? No se reinician los PV ni el Estigma en esta versión de ficha.</p>`,[
  {label:'Restaurar cargas',action:()=>{const {s,record}=sheetFor(c);record.charges=s.max;persist('characters');}},{label:'Cancelar',secondary:true}], 'Santuario');}
 function unlockItem(id){const it=items.find(i=>i.id===id);if(!it||state.unlocked.includes(id))return;
  abrirModal('Registrar hallazgo',`<p>Desbloquear ${escapar(it.name)} en este navegador como prueba del catálogo.</p>`,[
   {label:'Registrar',action:()=>{state.unlocked.push(id);persist('items')}},{label:'Cancelar',secondary:true}]);}
 let counter=0;
 function spawn(id){const e=byEnemy[id];if(!e)return;
  counter+=1;const label=state.encounter.filter(s=>s.enemyId===id).length+1;
  state.encounter.push({uid:`${Date.now()}_${counter}_${Math.floor(Math.random()*10000)}`,enemyId:id,label,hp:e.hp});persist('encounter');avisar(`${e.name} añadido a la mesa.`);}
 function mutateEnemy(action,uid,amount){const i=state.encounter.findIndex(e=>e.uid===uid);if(i<0)return;
  const instance=state.encounter[i],def=byEnemy[instance.enemyId];if(!def)return;
  if(action==='enemy-remove'){state.encounter.splice(i,1);}
  if(action==='enemy-hit')instance.hp=Math.max(0,instance.hp-Number(amount||1));
  if(action==='enemy-heal')instance.hp=Math.min(def.hp,instance.hp+1);
  if(action==='enemy-full')instance.hp=def.hp;
  persist('encounter');
 }
 document.addEventListener('click',event=>{
  const t=event.target.closest('[data-enter-app],[data-goto],[data-section],[data-action]');if(!t)return;
  if(t.dataset.enterApp){event.preventDefault();cerrarPortada(t.dataset.enterApp);return}
  if(t.dataset.goto){event.preventDefault();mostrarSeccion(t.dataset.goto);return}
  if(t.dataset.section){mostrarSeccion(t.dataset.section);return}
  const a=t.dataset.action,id=t.dataset.id;
  if(a==='choose')choose(id);
  else if(a==='confirm-character')confirmCharacter();
  else if(a==='unlock-selection')reopenSelection();
  else if(a==='catalog-toggle'){state.catalogOpen=!state.catalogOpen;render('characters')}
  else if(a==='sheet-tab'){state.sheetTab=t.dataset.tab||'resumen';render('characters')}
  else if(a==='inventory-add')addInventory();
  else if(a==='inventory-remove')removeInventory(t.dataset.uid);
  else if(a==='character-detail'){const c=byChar[id];if(c)abrirModal(c.name,textoFichaPersonaje(c,abilities,equipment,state),[{label:'Cerrar',secondary:true}],`Pecado · ${c.sin}`);}
  else if(a==='saint-unlock')unlockSaint(id);
  else if(a==='enemy-detail'){const e=byEnemy[id];if(e)abrirModal(e.name,textoFichaEnemigo(e),[{label:'Cerrar',secondary:true}],`${e.type} · ${e.threat}`);}
  else if(a==='enemy-add')spawn(id);
  else if(a==='zone-detail'){const z=byZone[id];if(z)abrirModal(z.nombreProvisional||`Zona ${z.numero}`,textoFichaZona(z),[{label:'Cerrar',secondary:true}],`Atlas · Registro ${z.numero}`);}
  else if(a==='relic-detail'){const r=items.find(i=>i.id===id);if(r){const known=state.unlocked.includes(r.id);abrirModal(r.name, known?`<div class="detail-sheet"><div class="relic-modal-symbol" aria-hidden="true">${escapar(r.icon)}</div><div class="stats"><span class="stat">${escapar(r.type)}</span><span class="stat">${escapar(r.rarity)}</span></div><p>${escapar(r.desc)}</p><p><strong>Registro:</strong> ${escapar(r.condition)}</p></div>`:`<p>Esta reliquia sigue sellada.</p><p><strong>Condición de prueba:</strong> ${escapar(r.condition)}</p>`,[{label:'Cerrar',secondary:true}],known?'Reliquia descubierta':'Registro sellado');}}
  else if(a==='enemy-hit'||a==='enemy-heal'||a==='enemy-full'||a==='enemy-remove')mutateEnemy(a,t.dataset.uid,t.dataset.amount);
  else if(a==='attributes')modifyAttr();
  else if(a==='charges-reset')resetCharges();
  else if(['charge-use','charge-add','player-hp-minus','player-hp-plus','player-estigma-minus','player-estigma-plus'].includes(a))editPlayer(a);
  else if(a==='unlock')unlockItem(id);
 });
 $('modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')cerrarModal()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')cerrarModal()});
 if(byChar[state.chosen])sheetFor(byChar[state.chosen]);
 for(const id of ['characterSearch','characterFilter'])$(id).addEventListener('input',()=>renderPersonajes(characters,state,abilities,equipment,items));
 for(const id of ['enemySearch','enemyFilter'])$(id).addEventListener('input',()=>renderEnemigos(enemies));
 for(const id of ['itemSearch','itemFilter','itemRarityFilter'])$(id).addEventListener('input',()=>renderReliquias(items,state));
 render();
}
iniciar().catch(e=>{console.error('No se pudo iniciar DEUS ABSENS:',e);mostrarError('No se pudieron cargar los catálogos. Comprueba los archivos JSON y utiliza GitHub Pages o un servidor local.')});
