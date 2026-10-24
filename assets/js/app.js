// DEUS ABSENS: fichas digitales de consulta y mesa del director. Sin cálculo de rutas.
import {cargarDatos} from './data.js';
import {cargarEstado,guardarEstado,STORAGE_KEY} from './state.js';
import {normalizarLegado,nuevoId,crearCodigo,leerCodigo,construirInforme,validarInforme,validarRecompensa,aplicarRecompensa,restaurarInforme} from './legacy.js';
import {pintarEconomia,pintarMejoras,pintarCodigos} from './legacy-ui.js';
import {gastarIndulgencia,cerrarExpedicion,iniciarExpedicion,recompensaPersonal,bonusDañoLorenzo} from './economia.js';
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
 const data=await cargarDatos();const {characters,enemies,items,abilities,equipment,zones,zonesStatus,improvements}=data;
 const state=cargarEstado(items);
 state.legacy=normalizarLegado(state.legacy);
 let codeMode='player',directorRecipient=null;
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
  if(kind==='all'||kind==='legacy'||kind==='characters'||kind==='items'){
   pintarEconomia(state);pintarMejoras(improvements,state);pintarCodigos(codeMode,directorRecipient,state);
  }
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
    {label:'Confirmar y sellar',action:()=>{if(!state.legacy.playerId)state.legacy.playerId=nuevoId('penitente');state.selectionLocked=true;state.sheetTab='resumen';state.catalogOpen=false;persist('characters');avisar('Ficha sellada. Se ha abierto tu hoja de partida.')}},
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
  if(kind==='charge-use'){
   if(s.charges===0)return;
   if(state.legacy.expedition.phase!=='active'){avisar('Primero inicia una expedición.');return;}
   const isLorenzo=c.id==='san-lorenzo';
   const extra=isLorenzo?`<p>Comprar la Indulgencia cuesta <strong>10 Ecos ganados en esta expedición</strong>, además de una carga. Saldo actual: <strong>${state.legacy.ecos.expedition}</strong> Ecos.</p><label class="inventory-field">Ronda actual (número del director)<input id="indulgenceRound" type="number" min="1" max="100000" step="1" value="1"></label><p>Solo una reacción por ronda. Confirma que se trata de una tirada propia o de un aliado visible.</p>`:'<p>Confirma con el director que la acción es válida y se cumplen los requisitos antes de consumir la carga. El sistema no controla posiciones ni turnos.</p>';
   abrirModal('Activar martirio · '+escapar(c.name),`<p><strong>${escapar(byAbility[c.martyrId]?.name||'Martirio')}</strong></p>${extra}`,[
    {label:'Confirmar activación',action:()=>{
     try{
      if(isLorenzo){
       const round=Number($('indulgenceRound')?.value);
       if(!Number.isInteger(round)||round<1||round>100000)throw Error('Introduce una ronda entera válida.');
       if(state.legacy.expedition.lastLorenzoRound===round)throw Error('Lorenzo ya utilizó una reacción en esta ronda.');
       record.charges=gastarIndulgencia(state.legacy,s.charges);
       state.legacy.expedition.lastLorenzoRound=round;
      }else record.charges=s.charges-1;
      persist('all');avisar('Carga registrada.');
     }catch(e){avisar(e.message);}
    }},{label:'Cancelar',secondary:true}], 'Expedición v8.0');
   return;
  }
  if(kind==='charge-add')record.charges=Math.min(s.max,s.charges+1);
  else if(kind==='player-hp-minus')record.pv=Math.max(0,s.pv-1);
  else if(kind==='player-hp-plus')record.pv=Math.min(s.derived.pv,s.pv+1);
  else if(kind==='player-estigma-minus'){
   if(c.id==='santa-juana'&&record.transformedTurnsLeft>0){avisar('El Estigma está bloqueado durante la transformación.');return;}
   record.estigma=Math.max(0,s.estigma-1);
  }else if(kind==='player-estigma-plus'){
   if(c.id==='santa-juana'&&record.transformedTurnsLeft>0){avisar('El Estigma está bloqueado durante la transformación.');return;}
   record.estigma=Math.min(s.derived.estigma,s.estigma+1);
   if(c.id==='santa-juana'&&record.estigma===s.derived.estigma&&!record.transformedTurnsLeft){record.transformedTurnsLeft=2;avisar('Juana alcanza el máximo: Forma Seráfica activada.');}
  }
  persist('characters');
 }
 function trackErasmo(action){
  const c=byChar[state.chosen];if(!c||c.id!=='san-erasmo')return;
  const {record,s}=sheetFor(c);if(state.legacy.expedition.phase!=='active'){avisar('La expedición está cerrada.');return;}
  if(action==='erasmo-hunger'){
   record.hungerTurns=(Number(record.hungerTurns)||0)+1;
   if(record.hungerTurns>=2){record.hungerTurns=0;record.pv=Math.max(0,s.pv-2);avisar('Hambre: −2 PV. El contador continúa en 0.');}
  }else if(action==='erasmo-feed'){
   abrirModal('Consumir restos',`<p>Confirma que existe un conjunto de restos <strong>no consumido</strong> en tu casilla o en una adyacente, que sigue el combate y que Erasmo dispone de 2 puntos de movimiento. Solo puede alimentarse una vez por turno.</p><label class="inventory-field">Número de turno propio de este combate<input id="erasmoFeedTurn" type="number" min="1" max="100000" step="1" value="1"></label><p>Tira 1d6 y registra manualmente los PV recuperados.</p>`,[
    {label:'Confirmar consumo',action:()=>{const turn=Number($('erasmoFeedTurn')?.value);if(!Number.isInteger(turn)||turn<1||turn>100000){avisar('Número de turno inválido.');return;}if(record.lastFeedTurn===turn){avisar('Erasmo ya se alimentó en ese turno.');return;}record.lastFeedTurn=turn;record.hungerTurns=0;record.temporaryArmor=Math.min(3,(Number(record.temporaryArmor)||0)+1);persist('characters');}},
    {label:'Cancelar',secondary:true}], 'Comunión Voraz');return;
  }else if(action==='erasmo-combat-end'){
   record.temporaryArmor=0;record.lastFeedTurn=null;
  }
  persist('characters');
 }
 function juanaTurnEnd(){
  const c=byChar[state.chosen];if(!c||c.id!=='santa-juana')return;
  const {record,s}=sheetFor(c);if(!record.transformedTurnsLeft)return;
  record.pv=Math.max(0,s.pv-3);record.transformedTurnsLeft--;
  if(record.transformedTurnsLeft===0)record.estigma=0;
  persist('characters');avisar('Turno de Forma Seráfica registrado: −3 PV.');
 }
 function resetCharges(){
  mostrarSeccion('progreso');
  avisar('Cierra la expedición actual desde Ecos y legado; después podrás iniciar otra y restaurar cargas.');
 }
 function closeExpedition(){
  if(state.legacy.expedition.phase!=='active')return;
  const amt=state.legacy.ecos.expedition,kept=Math.floor(amt*.6);
  abrirModal('Cerrar expedición',`<p>Saldo no gastado: <strong>${amt} Ecos</strong>. Se conservarán <strong>${kept} Ecos</strong> (60 %, redondeado hacia abajo), que pasarán a tu reserva personal.</p><p>La reserva anterior, los PV, el Estigma y el contador de Hambre no se reinician. El resultado es el mismo si la expedición termina en fracaso.</p><p><strong>Esta acción solo puede aplicarse una vez por expedición.</strong></p>`,[
   {label:'Confirmar cierre',action:()=>{if(!respaldoLocal())return;try{const n=cerrarExpedicion(state.legacy);persist('all');avisar(`Expedición cerrada: ${n} Ecos añadidos a la reserva.`);}catch(e){avisar(e.message);}}},
   {label:'Cancelar',secondary:true}], 'Economía v8.0');
 }
 function startExpedition(){
  if(state.legacy.expedition.phase!=='closed')return;
  abrirModal('Iniciar nueva expedición','<p>Se restaurarán las cargas de martirio de la ficha activa. Los PV, el Estigma y el Hambre conservan sus valores actuales. La reserva anterior no se modifica.</p>',[
   {label:'Iniciar expedición',action:()=>{if(!respaldoLocal())return;try{
    iniciarExpedicion(state.legacy);
    const c=byChar[state.chosen];if(c){const {s,record}=sheetFor(c);record.charges=s.max;}
    persist('all');avisar('Nueva expedición iniciada.');
   }catch(e){avisar(e.message);}}},
   {label:'Cancelar',secondary:true}], 'Economía v8.0');
 }
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
 // El director y el jugador comparten el esquema, NO la misma sesión de navegador.
 function outputCode(code){$('codeOutput').value=code;$('codeOutput').focus();$('codeOutput').select();}
 function respaldoLocal(){
  try{localStorage.setItem('deusAbsensBackupV65',JSON.stringify(state));return true;}
  catch(e){console.warn(e);avisar('No se pudo crear el respaldo. No se aplicaron cambios.');return false;}
 }
 function importCode(){
  const raw=$('codeInput').value;
  let obj;
  try{obj=leerCodigo(raw);}catch(e){avisar(e.message);return;}
  const p=obj.payload;
  if(obj.type==='PLAYER_REPORT'){
   try{validarInforme(p,characters,items,improvements);}catch(e){avisar(e.message);return;}
   const summary=`<p><strong>${escapar(p.saintName||p.saintId)}</strong> · ${escapar(p.playerId)}</p><p>Ecos de expedición: <strong>${p.ecos.expedition}</strong>. Reservados: <strong>${p.ecos.reserve}</strong>. Inventario: <strong>${p.sheet.inventory.length}</strong> registros.</p><p class="muted fine-print">${escapar(p.campaignId||'Aún no vinculado a una campaña')}. Un informe de jugador no acredita la autorización de sus datos.</p>`;
   if(codeMode==='director'){
    abrirModal('Informe recibido del Penitente',summary+'<p>¿Usar este informe para identificar al destinatario de una recompensa? No cambia tus datos de director.</p>',[
     {label:'Elegir destinatario',action:()=>{directorRecipient={playerId:p.playerId,name:p.saintName||p.saintId,saintId:p.saintId,campaignId:p.campaignId,runIndex:p.expedition?.runIndex||null};pintarCodigos(codeMode,directorRecipient,state);avisar('Informe registrado para preparar la recompensa.')}},
     {label:'Cancelar',secondary:true}
    ],'Códigos · lectura');
   }else{
    abrirModal('Restaurar una hoja de partida',summary+'<p><strong>Atención:</strong> este proceso sustituye la selección y el progreso personal actuales de este navegador. Se guardará un respaldo local previo.</p>',[
     {label:'Restaurar mi ficha',action:()=>{if(!respaldoLocal())return;try{restaurarInforme(p,state,characters,items,improvements);state.sheetTab='resumen';state.catalogOpen=false;persist('all');avisar('Ficha restaurada.');}catch(e){avisar(e.message);}}},
     {label:'Cancelar',secondary:true}
    ],'Restauración confirmada');
   }
  } else {
   if(codeMode==='director'){avisar('Cambia a modo jugador para aplicar una recompensa.');return;}
   try{validarRecompensa(p,state,characters,items,improvements);}catch(e){avisar(e.message);return;}
   const itemsFound=[p.global.saints.length&&`${p.global.saints.length} Santos`,p.global.relics.length&&`${p.global.relics.length} reliquias`,p.personalUpgrades.length&&`${p.personalUpgrades.length} mejoras personales`,p.global.upgrades.length&&`${p.global.upgrades.length} mejoras globales`].filter(Boolean).join(' · ')||'Sin desbloqueos nuevos';
   abrirModal('Recompensa del director',`<p><strong>Campaña:</strong> ${escapar(p.campaignId)}</p><p><strong>Destino:</strong> ${escapar(p.toPlayer)}</p><p><strong>Ecos de expedición que se agregarán:</strong> ${p.ecosExpedition}</p><p>${escapar(itemsFound)}</p><p class="muted fine-print">Revisa el origen de este código. No contiene ninguna firma que permita acreditar quién lo creó. Se guardará un respaldo antes de aplicarlo.</p>`,[
    {label:'Aplicar recompensa',action:()=>{if(!respaldoLocal())return;try{aplicarRecompensa(p,state,characters,items,improvements);persist('all');avisar('Recompensa aplicada a esta ficha.');}catch(e){avisar(e.message);}}},
    {label:'Cancelar',secondary:true}
   ],'Confirmación de recompensa');
  }
 }
 function exportReport(){
  const c=byChar[state.chosen];if(!c||!state.selectionLocked){avisar('Primero selecciona y sella un Santo.');return;}
  if(!state.legacy.playerId)state.legacy.playerId=nuevoId('penitente');
  try{const code=crearCodigo('PLAYER_REPORT',construirInforme(state,c));guardarEstado(state);pintarCodigos(codeMode,directorRecipient,state);outputCode(code);avisar('Informe de ficha generado.');}
  catch(e){avisar(e.message);}
 }
 function createCampaign(){
  if(codeMode!=='director'||state.legacy.campaignId)return;
  abrirModal('Crear sello de campaña','<p>Se creará un identificador local de campaña para vincular los códigos emitidos por esta mesa. No crea cuentas ni un servidor.</p>',[
   {label:'Crear sello',action:()=>{state.legacy.campaignId=nuevoId('campana');persist('legacy');avisar('Sello de campaña creado.');}},
   {label:'Cancelar',secondary:true}
  ],'Mesa del director');
 }
 function directorGrant(){
  if(codeMode!=='director'||!directorRecipient||!state.legacy.campaignId)return;
  if(directorRecipient.campaignId&&directorRecipient.campaignId!==state.legacy.campaignId){avisar('Este Penitente ya pertenece a otra campaña.');return;}
  const secrets=characters.filter(c=>c.secret&&!state.unlockedSaints.includes(c.id));
  const relics=items.filter(i=>!state.unlocked.includes(i.id));
  const unowned=[]; // Mejoras personales requieren compra por el jugador; no se conceden como compra global.
  const checks=(entries,kind)=>entries.map(c=>`<label><input type="checkbox" data-grant="${kind}" value="${escapar(c.id)}"><span>${escapar(c.name||c.nombre||c.id)}</span></label>`).join('');
  const body=`<p>Destinatario: <strong>${escapar(directorRecipient.name)}</strong><br><small>${escapar(directorRecipient.playerId)}</small></p>
    <label class="legacy-inline-label" for="grantEnemy">Origen de la recompensa</label>
    <select id="grantEnemy" class="filter"><option value="">Ajuste manual excepcional (sin enemigo)</option>${enemies.map(e=>`<option value="${escapar(e.id)}">${escapar(e.name)} · recompensa pendiente</option>`).join('')}</select>
    <label class="legacy-inline-label" for="grantEcos">Ecos BASE por el enemigo derrotado (indicados por el director) o cantidad del ajuste manual</label>
    <input id="grantEcos" class="legacy-number" type="number" min="0" max="100000000" step="1" value="0">
    <label class="legacy-inline-label"><input id="grantHitVerified" type="checkbox"> He verificado que este Penitente impactó al enemigo (incluso si está a 0 PV).</label>
    <p class="legacy-modaltip">No existen recompensas numéricas oficiales por enemigo en el bestiario. Para un enemigo, el director introduce la base aprobada. Si el destinatario es Lorenzo, se aplica automáticamente suelo(125 % × base). Los ajustes manuales no reciben esa bonificación.</p>
    <label class="legacy-inline-label">Nuevos Santos apócrifos</label><div class="legacy-option-grid">${checks(secrets,'saint')||'<span class="muted">Ninguno pendiente.</span>'}</div>
    <label class="legacy-inline-label">Nuevas reliquias</label><div class="legacy-option-grid">${checks(relics,'relic')||'<span class="muted">Ninguna pendiente.</span>'}</div>
    <label class="legacy-inline-label">Mejoras aprobadas del catálogo</label><div class="legacy-option-grid">${checks(unowned,'upgrade')||'<span class="muted">El catálogo aún no tiene mejoras aprobadas.</span>'}</div>
    <p class="legacy-modaltip">Los desbloqueos narrativos de campaña existentes pueden compartirse. No se venden mejoras globales ni se inventan costes.</p>`;
  abrirModal('Emitir código de recompensa',body,[
   {label:'Generar código',action:()=>{
    const raw=($('grantEcos')?.value||'');const qty=Number(raw);
    if(!/^\d+$/.test(raw)||!Number.isSafeInteger(qty)||qty<0||qty>100000000){avisar('Indica una cantidad entera válida de Ecos.');return;}
    const chosen=kind=>[...document.querySelectorAll(`[data-grant="${kind}"]:checked`)].map(x=>x.value);
    const enemyId=$('grantEnemy')?.value||'';
    if(enemyId&&(!enemies.some(e=>e.id===enemyId)||!$('grantHitVerified')?.checked)){avisar('Debes verificar el impacto del destinatario en ese enemigo.');return;}
    const payout=enemyId?recompensaPersonal(qty,directorRecipient.saintId==='san-lorenzo'):qty;
    if(payout>100000000){avisar('La recompensa excede el límite de Ecos.');return;}
    const saints=chosen('saint'),relicIds=chosen('relic'),upgradeIds=chosen('upgrade');
    const pids=upgradeIds.filter(id=>improvements.some(i=>i.id===id&&i.scope==='personal'));
    const gids=upgradeIds.filter(id=>improvements.some(i=>i.id===id&&i.scope==='global'));
    const payload={id:nuevoId('recompensa'),campaignId:state.legacy.campaignId,toPlayer:directorRecipient.playerId,
     ecosExpedition:payout,runIndex:directorRecipient.runIndex||undefined,rewardInfo:enemyId?{enemyId,base:qty,bonusApplied:directorRecipient.saintId==='san-lorenzo'}:null,personalUpgrades:pids,global:{saints:[...new Set([...state.unlockedSaints,...saints])],relics:[...new Set([...state.unlocked,...relicIds])],upgrades:[...new Set([...state.legacy.globalUpgrades,...gids])]}};
    try{
     const code=crearCodigo('DIRECTOR_GRANT',payload);
     // El director registra solo progresión global; nunca suma Ecos a su propia ficha.
     state.unlockedSaints=payload.global.saints;state.unlocked=payload.global.relics;state.legacy.globalUpgrades=payload.global.upgrades;
     state.legacy.directorHistory.push({id:payload.id,toPlayer:payload.toPlayer,ecos:payout,source:enemyId||'ajuste-manual'});
     state.legacy.directorHistory=state.legacy.directorHistory.slice(-40);
     persist('all');outputCode(code);avisar('Código de recompensa preparado. Cópialo y entrégalo al jugador.');
    }catch(e){avisar(e.message);}
   }},
   {label:'Cancelar',secondary:true}
  ],'Registro del director');
 }
 function restoreBackup(){
  const raw=localStorage.getItem('deusAbsensBackupV65');if(!raw){avisar('No hay ningún respaldo local v6.5.');return;}
  abrirModal('Recuperar respaldo',`<p>¿Restaurar el respaldo local anterior? Esto sustituye el estado de juego actual. La restauración no sincroniza otros dispositivos.</p>`,[
   {label:'Restaurar respaldo',action:()=>{
    try{const old=JSON.parse(raw);if(!old||typeof old!=='object'||!Array.isArray(old.unlocked)||typeof old.sheets!=='object')throw Error('Respaldo corrupto.');
     for(const key of Object.keys(state))delete state[key];Object.assign(state,old);state.legacy=normalizarLegado(state.legacy);state.sheetTab='resumen';state.catalogOpen=false;persist('all');avisar('Respaldo local recuperado.');
    }catch(e){avisar(e.message);}
   }},{label:'Cancelar',secondary:true}
  ],'Seguridad local');
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
  else if(a==='legacy-close-expedition')closeExpedition();
  else if(a==='legacy-new-expedition')startExpedition();
  else if(['erasmo-hunger','erasmo-feed','erasmo-combat-end'].includes(a))trackErasmo(a);
  else if(a==='juana-transform-end-turn')juanaTurnEnd();
  else if(['charge-use','charge-add','player-hp-minus','player-hp-plus','player-estigma-minus','player-estigma-plus'].includes(a))editPlayer(a);
  else if(a==='legacy-mode-player'||a==='legacy-mode-director'){codeMode=a==='legacy-mode-player'?'player':'director';pintarCodigos(codeMode,directorRecipient,state);}
  else if(a==='legacy-export-player')exportReport();
  else if(a==='legacy-import')importCode();
  else if(a==='legacy-new-campaign')createCampaign();
  else if(a==='legacy-director-grant')directorGrant();
  else if(a==='legacy-copy'){const v=$('codeOutput').value;if(!v){avisar('Aún no hay código para copiar.');}else if(navigator.clipboard?.writeText){navigator.clipboard.writeText(v).then(()=>avisar('Código copiado.')).catch(()=>{$('codeOutput').select();avisar('Selecciona y copia el código manualmente.');});}else{$('codeOutput').select();avisar('Selecciona y copia el código manualmente.');}}
  else if(a==='legacy-select-code'){$('codeOutput').focus();$('codeOutput').select();}
  else if(a==='legacy-backup'){if(respaldoLocal())avisar('Respaldo local guardado.');}
  else if(a==='legacy-restore-backup')restoreBackup();
  else if(a==='unlock')unlockItem(id);
 });
 $('modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')cerrarModal()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')cerrarModal()});
 if(byChar[state.chosen])sheetFor(byChar[state.chosen]);
 for(const id of ['characterSearch','characterFilter'])$(id).addEventListener('input',()=>renderPersonajes(characters,state,abilities,equipment,items));
 for(const id of ['enemySearch','enemyFilter'])$(id).addEventListener('input',()=>renderEnemigos(enemies));
 for(const id of ['itemSearch','itemFilter','itemRarityFilter'])$(id).addEventListener('input',()=>renderReliquias(items,state));
 $('upgradeFilter').addEventListener('input',()=>pintarMejoras(improvements,state));
 render();
}
iniciar().catch(e=>{console.error('No se pudo iniciar DEUS ABSENS:',e);mostrarError('No se pudieron cargar los catálogos. Comprueba los archivos JSON y utiliza GitHub Pages o un servidor local.')});
