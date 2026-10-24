import {escapar} from './ui.js';
import {normalizarLegado} from './legacy.js';
import {ecosConservados} from './economia.js';
const $=id=>document.getElementById(id);
export function pintarEconomia(state){
 const l=normalizarLegado(state.legacy);
 if($('legacyExpEcos'))$('legacyExpEcos').textContent=String(l.ecos.expedition);
 if($('legacySavedEcos'))$('legacySavedEcos').textContent=String(l.ecos.reserve);
 if($('legacyExpPhase'))$('legacyExpPhase').textContent=l.expedition.phase==='closed'?'Cerrada':`Activa · #${l.expedition.runIndex}`;
 if($('legacyEcosPreview'))$('legacyEcosPreview').textContent=String(ecosConservados(l.ecos.expedition));
 if($('legacyCloseExpedition'))$('legacyCloseExpedition').disabled=l.expedition.phase!=='active';
 if($('legacyNewExpedition'))$('legacyNewExpedition').disabled=l.expedition.phase!=='closed';
 const last=l.expedition.lastClose;if($('legacyLastClose'))$('legacyLastClose').textContent=last?`Último cierre #${last.runIndex}: ${last.remaining} disponibles → ${last.saved} reservados.`:'Los guardados de versiones anteriores se conservan.';
 const history=$('legacyEcosLedger');if(history){const entries=(l.expedition.transactions||[]).slice(-5).reverse();history.innerHTML=entries.length?entries.map(i=>`<li>${i.type==='indulgencia'?'Indulgencia':'Recompensa'}: ${i.amount>=0?'+':''}${i.amount} Ecos${i.enemyId?' · '+escapar(i.enemyId):''}</li>`).join(''):'<li>Sin movimientos registrados en esta expedición.</li>';}
}
export function pintarMejoras(catalog,state){
 const l=normalizarLegado(state.legacy);
 const valid=catalog.filter(i=>i.scope==='personal');
 const set=(id,value)=>{if($(id))$(id).textContent=value};
 set('upgradeCount',String(valid.length));set('upgradePersonal',String(l.personalUpgrades.length));set('upgradeGlobal',String(l.globalUpgrades.length));
 const filter=$('upgradeFilter')?.value||'all';
 const selected=valid.filter(i=>filter==='all'||i.scope===filter);
 if(!$('upgradeGrid'))return;
 $('upgradeGrid').innerHTML=selected.map(i=>{
  const owned=(i.scope==='personal'?l.personalUpgrades:l.globalUpgrades).includes(i.id);
  const title=escapar(i.name||i.nombre||i.id);
  const desc=escapar(i.description||i.descripcion||'Efecto pendiente de definición.');
  const scope='Personal';
  const cost=Number.isSafeInteger(i.cost)&&i.cost>=0?`Coste registrado: ${i.cost} Ecos`:'Coste sin definir';
  return `<article class="card upgrade-item"><span class="tag ${owned?'gold':''}">${scope}</span><h3>${title}</h3><p>${desc}</p><p class="fine-print muted">${cost} · ${owned?'Registrada en el legado':'No adquirida'}</p><span class="coming-tag">${owned?'Desbloqueada':'Sin compra disponible'}</span></article>`;
 }).join('') || `<div class="empty empty-upgrades"><span class="empty-mark">✣</span><h3>Las mejoras aún no tienen registros aprobados</h3><p>${catalog.length?'No hay mejoras en esta categoría.':'El archivo <code>data/mejoras.json</code> está vacío. El menú y el modelo de guardado están preparados, pero no se han inventado costes ni habilidades.'}</p></div>`;
}
export function pintarCodigos(mode,recipient,state){
 const l=normalizarLegado(state.legacy);
 const player=$('codePlayerMode'),dir=$('codeDirectorMode');
 for(const [button,active] of [[player,mode==='player'],[dir,mode==='director']]){if(button){button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}}
 const target=$('codeModeContent');if(!target)return;
 if(mode==='player'){
  target.innerHTML=`<span class="tag gold">FICHA INDIVIDUAL</span><h3>Enviar mi hoja al director</h3>
   <p>Genera una copia de tu ficha sellada, inventario y Ecos personales. Entrégala al director para que pueda identificarte y preparar una recompensa.</p>
   <div class="code-record"><span>Identidad de esta ficha</span><strong>${escapar(l.playerId||'Se creará al exportar')}</strong></div>
   <div class="code-record"><span>Campaña vinculada</span><strong>${escapar(l.campaignId||'Sin vincular')}</strong></div>
   <div class="code-record"><span>Ecos de expedición</span><strong>${l.ecos.expedition}</strong></div>
   <button class="btn" data-action="legacy-export-player">Generar código de mi ficha</button>
   <p class="legacy-footnote">También puedes pegar un código de recompensa o restaurar un informe de ficha en el panel derecho.</p>`;
 }else{
  target.innerHTML=`<span class="tag gold">REGISTRO DEL DIRECTOR</span><h3>Gestionar recompensas</h3>
    <p>Recibe el informe de un jugador, verifica su identidad y emite un código con Ecos de expedición y desbloqueos permitidos.</p>
    <div class="code-record"><span>Sello de campaña</span><strong>${escapar(l.campaignId||'Aún no creado')}</strong></div>
    <div class="code-record"><span>Jugador destinatario</span><strong>${recipient?escapar(`${recipient.name} · ${recipient.playerId}`):'Ningún informe leído'}</strong></div>
    <div class="panel-actions"><button class="small" data-action="legacy-new-campaign" ${l.campaignId?'disabled':''}>Crear sello de campaña</button>
      <button class="btn" data-action="legacy-director-grant" ${!l.campaignId||!recipient?'disabled':''}>Emitir recompensa</button></div>
    <p class="legacy-footnote">Los cambios globales se seleccionan al emitir el código y se reflejan en este dispositivo. Para cada jugador se debe emitir un código separado. El sistema no verifica permisos de director.</p>`;
 }
}
