// Presentación. Las fichas se construyen desde data/*.json, no desde HTML duplicado.
const $ = id => document.getElementById(id);
export const escapar = value => String(value ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
export function mostrarSeccion(id) {
  if (!$(id)?.classList.contains('section')) return;
  document.querySelectorAll('.section').forEach(s => s.classList.toggle('active',s.id===id));
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active',b.dataset.section===id));
  $('hero').style.display = id==='inicio'?'grid':'none';
  window.scrollTo({top:0,behavior:'smooth'});
}
let toastTimer;
export function avisar(msg){const e=$('toast');e.textContent=msg;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),2600)}
export function cerrarModal(){ $('modalBackdrop').classList.remove('open'); }
export function abrirModal(titulo,contenido,acciones=[],kicker='Registro'){
  $('modalKicker').textContent=kicker;$('modalTitle').textContent=titulo;$('modalBody').innerHTML=contenido;
  const nav=$('modalActions');nav.replaceChildren();
  for(const a of acciones){const b=document.createElement('button');b.type='button';b.className='btn'+(a.secondary?' secondary':'');b.textContent=a.label;b.addEventListener('click',()=>{cerrarModal();a.action?.()});nav.append(b)}
  $('modalBackdrop').classList.add('open');
}
export function mostrarError(message){$('appStatus').textContent=message;$('appStatus').hidden=false;}
const bonus=v=>'+'+Number(v ?? 0);
export function estadisticas(atributos){const a=atributos??{ACERO:3,CENIZA:2,SANGRE:1,DOGMA:0};return {pv:12+a.SANGRE*3,defensa:8+Math.ceil(a.CENIZA/2),movimiento:2+a.CENIZA,estigma:10+a.DOGMA}}
export function getSheet(state,id,ability){
  const found=state.sheets?.[id];
  const attrs=found?.attrs??{ACERO:3,CENIZA:2,SANGRE:1,DOGMA:0};
  const derived=estadisticas(attrs);
  const max=Number.isInteger(found?.maxCharges)&&found.maxCharges>0?found.maxCharges:(ability?.maxCharges??ability?.prototypeMaxCharges??1);
  const charges=Number.isInteger(found?.charges)?Math.max(0,Math.min(found.charges,max)):max;
  return {attrs,derived,max,charges,pv:typeof found?.pv==='number'?Math.max(0,Math.min(derived.pv,found.pv)):derived.pv,estigma:typeof found?.estigma==='number'?Math.max(0,Math.min(derived.estigma,found.estigma)):0};
}
export function renderPersonajes(chars,state,abilities=[],equipment=[]){
  const byId=Object.fromEntries(abilities.map(a=>[a.id,a]));const gear=Object.fromEntries(equipment.map(o=>[o.id,o]));
  const q=$('characterSearch').value.toLowerCase().trim(),filter=$('characterFilter').value;
  const shown=chars.filter(c=>{
    const locked=c.secret&&!state.unlockedSaints.includes(c.id);
    const match=[c.name,c.sin,c.role,c.desc,c.titulo,c.trasfondo,byId[c.passiveId]?.name,byId[c.martyrId]?.name].join(' ').toLowerCase().includes(q);
    return match && (filter==='all'||(filter==='available'&&!locked)||(filter==='locked'&&locked)||(filter==='chosen'&&state.chosen===c.id));
  });
  $('characterGrid').innerHTML=shown.map(c=>{
    const locked=c.secret&&!state.unlockedSaints.includes(c.id),selected=state.chosen===c.id;
    const passive=byId[c.passiveId],martyr=byId[c.martyrId],sheet=getSheet(state,c.id,martyr);
    return `<article class="card character-card${locked?' locked':''}">
      <div class="character-top"><div><span class="tag ${locked?'':'gold'}">${escapar(c.sin)}${locked?' · Sellado':''}</span><h3>${escapar(c.name)}</h3></div><div class="crest">${escapar(c.icon)}</div></div>
      <p>${escapar(c.desc)}</p>
      <div class="stats"><span class="stat">${escapar(c.role)}</span><span class="stat">PV ${sheet.derived.pv}</span><span class="stat">DEF ${sheet.derived.defensa}</span><span class="stat">MOV ${sheet.derived.movimiento}</span></div>
      <p><strong>Pasiva:</strong> ${escapar(passive?.name??'Pendiente')}</p>
      <p><strong>Martirio:</strong> ${escapar(martyr?.name??'Pendiente')} · ${sheet.charges}/${sheet.max} cargas${martyr?.maxCharges==null?' (provisional)':''}</p>
      <div class="card-bottom"><button class="small" data-action="character-detail" data-id="${escapar(c.id)}">Ver ficha completa</button>
      ${locked?`<button class="small" data-action="saint-unlock" data-id="${escapar(c.id)}">Desbloquear (director)</button>`:
      selected?'<span class="tag gold">Penitente elegido</span>':`<button class="small" data-action="choose" data-id="${escapar(c.id)}">Elegir</button>`}</div>
    </article>`;
  }).join('')||'<div class="empty">No hay Penitentes para este filtro.</div>';
  const chosen=chars.find(c=>c.id===state.chosen);
  if(!chosen){$('characterSheetPanel').innerHTML='<div class="inventory-note">Elige un Santo para visualizar su ficha de partida y configurar sus atributos.</div>';return;}
  const martyr=byId[chosen.martyrId],sheet=getSheet(state,chosen.id,martyr),a=sheet.attrs,d=sheet.derived;
  $('characterSheetPanel').innerHTML=`<div class="sheet-panel">
    <div class="sheet-header"><div><div class="kicker">Ficha activa · Guardado local</div><h3>${escapar(chosen.name)}</h3><p>${escapar(chosen.role)} · ${escapar(chosen.sin)}</p></div><span class="tag gold">Seleccionado</span></div>
    <div class="attributes">${Object.entries(a).map(([key,v])=>`<div class="attribute"><small>${key}</small><strong>+${v}</strong></div>`).join('')}</div>
    <div class="stats sheet-stats"><span class="stat">PV: ${sheet.pv}/${d.pv}</span><span class="stat">Defensa: ${d.defensa}</span><span class="stat">Movimiento: ${d.movimiento}</span><span class="stat">Estigma: ${sheet.estigma}/${d.estigma}</span></div>
    <div class="martyr-block"><p><strong>${escapar(martyr?.name)}</strong> · <strong class="martyr-count">${sheet.charges}/${sheet.max}</strong> cargas ${martyr?.maxCharges==null?'<span class="tag">Capacidad de prueba</span>':''}</p><p class="muted">${escapar(martyr?.description)}</p>
    <div class="card-bottom"><button class="small" data-action="charge-use" ${sheet.charges===0?'disabled':''}>Consumir carga</button><button class="small" data-action="charge-add" ${sheet.charges===sheet.max?'disabled':''}>Recargar (director)</button><button class="small" data-action="charges-reset">Nueva expedición</button></div></div>
    <div class="card-bottom"><button class="small" data-action="attributes">Distribuir atributos</button><button class="small" data-action="player-hp-minus">PV -1</button><button class="small" data-action="player-hp-plus">PV +1</button><button class="small" data-action="player-estigma-minus">Estigma -1</button><button class="small" data-action="player-estigma-plus">Estigma +1</button></div>
    <p class="muted fine-print">La nueva expedición restaura únicamente las cargas. Las fichas se guardan en este navegador; todavía no existe sincronización entre jugadores.</p></div>`;
}
export function textoFichaPersonaje(c,abilities,equipment,state){
  const dict=Object.fromEntries(abilities.map(a=>[a.id,a]));const gear=Object.fromEntries(equipment.map(g=>[g.id,g]));
  const p=dict[c.passiveId]??c.pasiva,m=dict[c.martyrId]??c.martirio,sh=getSheet(state,c.id,m);
  const historia=Array.isArray(c.narrativa?.parrafos)?c.narrativa.parrafos:[c.trasfondo||c.desc];
  const historiaHTML=historia.filter(Boolean).map(parrafo=>`<p class="lore-paragraph">${escapar(parrafo)}</p>`).join('');
  return `<div class="detail-sheet">
    <div class="lore-block">
      <div class="kicker">Crónica del Penitente · ${escapar(c.titulo||c.sin)}</div>
      ${c.narrativa?.lema?`<p class="lore-quote">«${escapar(c.narrativa.lema)}»</p>`:''}
      ${historiaHTML}
    </div>
    <div class="stats"><span class="stat">Pecado: ${escapar(c.sin)}</span><span class="stat">Clase: ${escapar(c.rolCompleto||c.role)}</span></div>
    <h4>Atributos sugeridos</h4><p>${(c.suggestedAttributes||[]).map(escapar).join(' y ')}</p>
    <h4>Equipo inicial</h4>${(c.equipmentIds||[]).map(id=>{const g=gear[id];return g?`<p><strong>${escapar(g.name)}</strong> (${escapar(g.damage||'sin daño')}). ${escapar(g.effect)}</p>`:''}).join('')}
    <h4>Pasiva · ${escapar(p?.name||p?.nombre)}</h4><p>${escapar(p?.description||p?.descripcion)}</p>
    <h4>Martirio · ${escapar(m?.name||m?.nombre)}</h4><p>${escapar(m?.description||m?.descripcion)}</p>
    <p><strong>Cargas:</strong> ${sh.charges}/${sh.max} ${m?.maxCharges==null?'(capacidad temporal de prueba)':''} · restauración completa al iniciar una nueva expedición.</p>
    <p class="muted fine-print">Los efectos mecánicos todavía están pendientes de balance. Algunas referencias originales a d20 necesitan adaptación a 2d6.</p>
  </div>`;
}
export function renderEnemigos(enemies){
  const q=$('enemySearch').value.toLowerCase().trim(),filter=$('enemyFilter').value;
  const filtered=enemies.filter(e=>(filter==='all'||e.type===filter)&&[e.name,e.desc,e.type,e.ability,...(e.attacks||[]).map(a=>a.name)].join(' ').toLowerCase().includes(q));
  $('enemyGrid').innerHTML=filtered.map(e=>`<article class="card enemy-card">
    <div class="character-top"><div><span class="tag ${e.type==='Celestial'?'gold':''}">${escapar(e.type)} · ${escapar(e.threat)}</span><h3>${escapar(e.name)}</h3></div><div class="symbol">${escapar(e.icon)}</div></div>
    <p>${escapar(e.desc)}</p><div class="stats"><span class="stat">PV ${e.hp}</span><span class="stat">DEF ${e.defense}</span><span class="stat">BLIN ${e.armor}</span><span class="stat">MOV ${e.movement}</span></div>
    <p><strong>Acciones:</strong> ${(e.attacks||[]).map(a=>`${escapar(a.name)} (${escapar(a.damage)}${a.strikes>1?', '+a.strikes+' ataques':''})`).join(' · ')}</p>
    <span class="tag">ESTADÍSTICAS PROVISIONALES</span><div class="card-bottom"><button class="small" data-action="enemy-detail" data-id="${escapar(e.id)}">Ver ficha</button><button class="small" data-action="enemy-add" data-id="${escapar(e.id)}">Añadir a mesa</button></div>
  </article>`).join('')||'<div class="empty">No hay enemigos que coincidan con la búsqueda.</div>';
}
export function textoFichaEnemigo(e){return `<div class="detail-sheet"><p>${escapar(e.desc)}</p><div class="stats"><span class="stat">PV ${e.hp}</span><span class="stat">Defensa ${e.defense}</span><span class="stat">Blindaje ${e.armor}</span><span class="stat">Movimiento ${e.movement}</span></div>
    <h4>Ataques y opciones</h4>${(e.attacks||[]).map(a=>`<p><strong>${escapar(a.name)}</strong>: ${a.strikes>1?`${a.strikes} ataques por acción principal, cada uno `:'1 ataque por acción principal, '} daño ${escapar(a.damage)}. Alcance orientativo ${escapar(a.rangeTiles)} casillas. Bono de ataque ${a.attackBonus>=0?'+':''}${escapar(a.attackBonus)}.</p>`).join('')}
    <h4>Habilidades</h4>${(e.abilities||[]).map(a=>`<p><strong>${escapar(a.name)}:</strong> ${escapar(a.description)}</p>`).join('')}
    <p class="muted fine-print">Ficha de pruebas. PV, daño, movimiento, bonos y ataques múltiples son valores provisionales editables en data/enemigos.json. El director decide acciones y objetivos, sin cálculo de rutas.</p></div>`}
export function renderMesa(enemies,state){
  const byId=Object.fromEntries(enemies.map(e=>[e.id,e]));
  const instances=state.encounter||[];
  const host=$('encounterList');if(!host)return;
  $('encounterCount').textContent=`${instances.length} criatura(s) en mesa`;
  host.innerHTML=instances.map(s=>{const e=byId[s.enemyId];if(!e)return '';
    return `<article class="card encounter-card"><div class="character-top"><div><span class="tag">${escapar(e.type)} · ${escapar(e.threat)}</span><h3>${escapar(e.name)} <small>#${escapar(s.label)}</small></h3></div><span class="tag gold">${s.hp===0?'Caído':'En combate'}</span></div>
      <div class="stats"><span class="stat">PV: ${s.hp}/${e.hp}</span><span class="stat">DEF ${e.defense}</span><span class="stat">BLIN ${e.armor}</span><span class="stat">MOV ${e.movement}</span></div>
      <p>${(e.attacks||[]).map(a=>`${escapar(a.name)}: ${a.strikes>1?a.strikes+'×':''}${escapar(a.damage)}`).join(' · ')}</p>
      <div class="card-bottom"><button class="small" data-action="enemy-hit" data-uid="${escapar(s.uid)}" data-amount="1">PV -1</button><button class="small" data-action="enemy-hit" data-uid="${escapar(s.uid)}" data-amount="5">PV -5</button><button class="small" data-action="enemy-heal" data-uid="${escapar(s.uid)}">PV +1</button><button class="small" data-action="enemy-full" data-uid="${escapar(s.uid)}">Curar al máximo</button><button class="small" data-action="enemy-detail" data-id="${escapar(e.id)}">Ficha</button><button class="small" data-action="enemy-remove" data-uid="${escapar(s.uid)}">Quitar</button></div>
    </article>`;
  }).join('')||'<div class="empty">La mesa está vacía. Añade enemigos desde el bestiario. Puedes incluir varias copias del mismo tipo.</div>';
}
export function renderReliquias(items,state){
  const q=$('itemSearch').value.toLowerCase(),filter=$('itemFilter').value;
  const result=items.filter(i=>{const found=state.unlocked.includes(i.id);return (filter==='all'||filter==='unlocked'&&found||filter==='locked'&&!found)&&[i.name,i.type,i.desc,i.condition].join(' ').toLowerCase().includes(q)});
  $('itemGrid').innerHTML=result.map(i=>{const known=state.unlocked.includes(i.id);return `<article class="card ${known?'':'locked'}"><div class="character-top"><div><span class="tag ${i.rarity==='Mítica'||i.rarity==='Única'?'gold':''}">${escapar(i.rarity)}</span><h3>${escapar(i.name)}</h3></div><div class="symbol">${known?escapar(i.icon):'▧'}</div></div><p>${known?escapar(i.desc):'Registro oculto. Descubre su condición para revelarlo.'}</p><div class="stats"><span class="stat">${escapar(i.type)}</span></div>${known?'<span class="tag gold">Descubierto</span>':`<p class="locked-note">${escapar(i.condition)}</p><button class="small" data-action="unlock" data-id="${escapar(i.id)}">Registrar hallazgo de prueba</button>`}</article>`}).join('')||'<div class="empty">Sin reliquias coincidentes.</div>';
  const total=items.filter(i=>state.unlocked.includes(i.id)).length;
  $('relicCount').textContent=`${total} de ${items.length} reliquias`;
  $('homeProgress').style.width=items.length?`${total/items.length*100}%`:'0%';
  $('homeProgressText').textContent=`${total} reliquias descubiertas`;
}
