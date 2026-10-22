// Presentación. Las fichas se construyen desde data/*.json, no desde HTML duplicado.
const $ = id => document.getElementById(id);
export const escapar = value => String(value ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
export function mostrarSeccion(id) {
  const target=$(id);
  if (!target?.classList.contains('section')) return;
  document.querySelectorAll('.section').forEach(s => s.classList.toggle('active',s.id===id));
  document.querySelectorAll('.nav button').forEach(b => {
    const active=b.dataset.section===id;
    b.classList.toggle('active',active);
    if(active) b.setAttribute('aria-current','page');
    else b.removeAttribute('aria-current');
  });
  $('hero').style.display = id==='inicio'?'grid':'none';
  window.scrollTo(0,0);
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
const GLIFOS_SANTOS={
 'san-longinos':'⛨','santa-lucia':'◉','san-erasmo':'♜',
 'santa-magdalena':'✧','san-lorenzo':'⚿','san-bartolome':'⟁',
 'san-simeon':'♟','san-judas-tadeo':'☷','santa-juana':'✶','san-lazaro':'☩'
};
export function renderPersonajes(chars,state,abilities=[],equipment=[]){
  const byId=Object.fromEntries(abilities.map(a=>[a.id,a]));
  const q=$('characterSearch').value.toLowerCase().trim(),filter=$('characterFilter').value;
  const shown=chars.filter(c=>{
    const locked=c.secret&&!state.unlockedSaints.includes(c.id);
    const match=[c.name,c.sin,c.role,c.desc,c.titulo,c.trasfondo,c.narrativa?.lema,byId[c.passiveId]?.name,byId[c.martyrId]?.name].join(' ').toLowerCase().includes(q);
    return match && (filter==='all'||(filter==='available'&&!locked)||(filter==='locked'&&locked)||(filter==='chosen'&&state.chosen===c.id));
  });
  $('characterGrid').innerHTML=shown.map(c=>{
    const locked=c.secret&&!state.unlockedSaints.includes(c.id),selected=state.chosen===c.id;
    const passive=byId[c.passiveId]||c.pasiva,martyr=byId[c.martyrId]||c.martirio,sheet=getSheet(state,c.id,martyr);
    const ix=chars.indexOf(c)+1;
    const sigil=GLIFOS_SANTOS[c.id]||c.icon||'✦';
    const motto=c.narrativa?.lema||c.desc;
    return `<article class="card character-card codex-card${locked?' locked':''}${selected?' codex-selected':''}" data-sanctum="${escapar(c.id)}">
      <div class="codex-border" aria-hidden="true"></div>
      <div class="codex-topline"><span class="codex-index">${c.secret?'APÓCRIFO · ': 'SANTO · '}${String(ix).padStart(2,'0')}</span><span class="codex-seal">${locked?'✧ SELLO INTACTO':selected?'✦ ACTIVO':escapar(c.sin).toUpperCase()}</span></div>
      <div class="codex-emblem" aria-hidden="true"><span class="codex-emblem-ring"></span><span class="codex-emblem-ornament">${escapar(sigil)}</span><span class="codex-emblem-star">✦</span></div>
      <div class="codex-heading"><span class="codex-sin">${escapar(c.titulo||c.sin)}</span><h3>${escapar(c.name)}</h3><p class="codex-role">${escapar(c.rolCompleto||c.role)}</p></div>
      <p class="codex-quote">«${escapar(motto)}»</p>
      <div class="codex-rule" aria-hidden="true">✦</div>
      <div class="codex-metrics"><span><small>PV</small><strong>${sheet.derived.pv}</strong></span><span><small>DEF</small><strong>${sheet.derived.defensa}</strong></span><span><small>MOV</small><strong>${sheet.derived.movimiento}</strong></span><span><small>MARTIRIO</small><strong>${sheet.charges}/${sheet.max}</strong></span></div>
      <div class="codex-traits"><p><strong>Pasiva</strong><span>${escapar(passive?.name??passive?.nombre??'Pendiente')}</span></p><p><strong>Martirio</strong><span>${escapar(martyr?.name??martyr?.nombre??'Pendiente')}</span></p></div>
      <div class="card-bottom codex-actions"><button class="small codex-action-primary" data-action="character-detail" data-id="${escapar(c.id)}">Leer expediente ↗</button>
        ${locked?`<button class="small" data-action="saint-unlock" data-id="${escapar(c.id)}">Desbloquear (director)</button>`:
         selected?'<span class="tag gold">Penitente elegido</span>':`<button class="small" data-action="choose" data-id="${escapar(c.id)}">Elegir</button>`}</div>
    </article>`;
  }).join('')||'<div class="empty">No hay Penitentes para este filtro.</div>';
  const chosen=chars.find(c=>c.id===state.chosen);
  if(!chosen){$('characterSheetPanel').innerHTML='<div class="inventory-note">Elige un Santo para visualizar su ficha de partida y configurar sus atributos.</div>';return;}
  const martyr=byId[chosen.martyrId],sheet=getSheet(state,chosen.id,martyr),a=sheet.attrs,d=sheet.derived;
  $('characterSheetPanel').innerHTML=`<div class="sheet-panel codex-active-sheet">
    <div class="sheet-header"><div><div class="kicker">Expediente activo · Guardado local</div><h3>${escapar(chosen.name)}</h3><p>${escapar(chosen.role)} · ${escapar(chosen.sin)}</p></div><span class="tag gold">Seleccionado</span></div>
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
  const sigil=GLIFOS_SANTOS[c.id]||c.icon||'✦';
  return `<div class="detail-sheet codex-detail">
    <header class="codex-detail-intro"><div class="codex-detail-emblem" aria-hidden="true">${escapar(sigil)}</div>
      <div><div class="kicker">Crónica del Penitente · ${escapar(c.titulo||c.sin)}</div>
      <p class="codex-detail-class">${escapar(c.rolCompleto||c.role)}</p></div></header>
    <div class="lore-block">
      ${c.narrativa?.lema?`<p class="lore-quote">«${escapar(c.narrativa.lema)}»</p>`:''}
      ${historiaHTML}
    </div>
    <div class="stats codex-detail-tags"><span class="stat">Pecado: ${escapar(c.sin)}</span><span class="stat">Clase: ${escapar(c.role)}</span></div>
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
  const valid=instances.filter(s=>byId[s.enemyId]);
  $('dirTotal').textContent=String(valid.length);
  $('dirStanding').textContent=String(valid.filter(s=>Number(s.hp)>0).length);
  const hp=valid.reduce((sum,s)=>sum+Math.max(0,Number(s.hp)||0),0);
  const maxHp=valid.reduce((sum,s)=>sum+(Number(byId[s.enemyId].hp)||0),0);
  $('dirHpTotal').textContent=`${hp} / ${maxHp}`;
  host.innerHTML=valid.map(s=>{const e=byId[s.enemyId];
    const current=Math.max(0,Math.min(Number(e.hp)||0,Number(s.hp)||0));
    const ratio=e.hp>0?Math.round(current/e.hp*100):0;
    return `<article class="card encounter-card${current===0?' encounter-down':''}">
      <div class="encounter-heading"><span class="encounter-sigil" aria-hidden="true">${escapar(e.icon||'☠')}</span><div class="encounter-title"><span class="kicker">${escapar(e.type)} · ${escapar(e.threat)}</span><h3>${escapar(e.name)} <small>#${escapar(s.label)}</small></h3></div><span class="tag ${current===0?'':'gold'}">${current===0?'Caído':'En combate'}</span></div>
      <div class="encounter-hp-title"><strong>PV ${current} / ${e.hp}</strong><span>${ratio}%</span></div>
      <div class="encounter-hp-track" role="progressbar" aria-label="PV de ${escapar(e.name)}" aria-valuenow="${current}" aria-valuemin="0" aria-valuemax="${e.hp}"><span style="width:${ratio}%"></span></div>
      <div class="stats encounter-stats"><span class="stat">DEF ${e.defense}</span><span class="stat">BLIN ${e.armor}</span><span class="stat">MOV ${e.movement}</span></div>
      <p class="encounter-attacks">${(e.attacks||[]).map(a=>`${escapar(a.name)}: ${a.strikes>1?a.strikes+'×':''}${escapar(a.damage)}`).join(' · ')}</p>
      <div class="card-bottom encounter-controls"><button class="small" data-action="enemy-hit" data-uid="${escapar(s.uid)}" data-amount="1">-1 PV</button><button class="small" data-action="enemy-hit" data-uid="${escapar(s.uid)}" data-amount="5">-5 PV</button><button class="small" data-action="enemy-heal" data-uid="${escapar(s.uid)}">+1 PV</button><button class="small" data-action="enemy-full" data-uid="${escapar(s.uid)}">Restaurar</button><button class="small" data-action="enemy-detail" data-id="${escapar(e.id)}">Ficha</button><button class="small danger-outline" data-action="enemy-remove" data-uid="${escapar(s.uid)}">Quitar</button></div>
    </article>`;
  }).join('')||'<div class="empty empty-encounter"><span class="empty-mark">⚙</span><h3>La mesa permanece en silencio</h3><p>Añade criaturas desde el bestiario para comenzar a llevar sus PV. Puedes añadir varias copias del mismo tipo.</p><button class="small" data-goto="enemigos">Abrir bestiario ↗</button></div>';
}

export function renderResumen(chars,enemies,items,state){
  const chosen=chars.find(c=>c.id===state.chosen);
  const nSaints=chars.filter(c=>!c.secret||state.unlockedSaints.includes(c.id)).length;
  const nLoot=items.filter(i=>state.unlocked.includes(i.id)).length;
  const encounters=(state.encounter||[]).filter(s=>enemies.some(e=>e.id===s.enemyId));
  const set=(id,value)=>{const node=$(id);if(node)node.textContent=value};
  const progress=(bar,label,n,max)=>{
    const pct=max?Math.round(n/max*100):0;
    const node=$(bar);if(node)node.style.width=pct+'%';
    set(label,pct+' %');
  };
  set('expSelectedName',chosen?.name||'Sin elegir');
  set('expEnemiesCount',String(encounters.length));
  set('expLootCount',`${nLoot} / ${items.length}`);
  set('legacySaints',`${nSaints} / ${chars.length}`);
  set('legacyRelics',`${nLoot} / ${items.length}`);
  set('legacySelected',chosen?.name||'Sin elegir');
  progress('legacySaintsBar','legacySaintsPct',nSaints,chars.length);
  progress('legacyRelicsBar','legacyRelicsPct',nLoot,items.length);
}

// Atlas visual. Los valores proceden de data/zonas.json y continúan siendo borradores.
export function renderZonas(zones,estado='BORRADOR'){
  const host=$('zoneGrid');
  if(!host)return;
  if(!zones.length){host.innerHTML='<div class="empty">No hay zonas registradas todavía.</div>';return;}
  host.innerHTML=zones.map((zone,index)=>{
    const number=Number(zone.numero)||index+1;
    const encounter=zone.generacion?.encuentro||{};
    const terrain=zone.generacion?.terreno||{};
    const densityMin=Number.isFinite(Number(terrain.densidadMin))?Math.round(Number(terrain.densidadMin)*100):null;
    const densityMax=Number.isFinite(Number(terrain.densidadMax))?Math.round(Number(terrain.densidadMax)*100):null;
    const boards=(zone.tablerosPermitidos||[]).map(n=>`${escapar(n)}×${escapar(n)}`).join(' · ')||'Sin definir';
    const quantity=Number.isFinite(Number(encounter.cantidadBase))?String(encounter.cantidadBase):'—';
    const variability=Number.isFinite(Number(encounter.variacionCantidad))?`±${encounter.variacionCantidad}`:'';
    return `<article class="card atlas-card atlas-card-${Math.min(3,Math.max(1,number))}">
      <div class="atlas-card-surface" aria-hidden="true"><span>${String(number).padStart(2,'0')}</span><span class="atlas-card-symbol">${['◇','✠','⬡'][(number-1)%3]}</span></div>
      <div class="atlas-card-top"><span>REGISTRO ${String(number).padStart(2,'0')}</span><span class="tag">BORRADOR</span></div>
      <h3>${escapar(zone.nombreProvisional||`Zona ${number}`)}</h3>
      <p class="atlas-card-subtitle">La identidad narrativa y los enemigos característicos de esta zona todavía están por diseñarse.</p>
      <div class="atlas-data-grid">
        <div><small>Encuentro base</small><strong>${escapar(quantity)} ${escapar(variability)}</strong></div>
        <div><small>Tableros</small><strong>${boards}</strong></div>
        <div><small>Densidad de terreno</small><strong>${densityMin===null||densityMax===null?'—':`${densityMin}–${densityMax} %`}</strong></div>
        <div><small>Amenaza (borrador)</small><strong>${escapar(encounter.presupuestoAmenaza??'—')}</strong></div>
      </div>
      <div class="atlas-card-foot"><span class="atlas-status-dot" aria-hidden="true"></span><span>Parámetros provisionales</span><button class="small" data-action="zone-detail" data-id="${escapar(zone.id)}">Ver ficha ↗</button></div>
    </article>`;
  }).join('');
}

export function textoFichaZona(zone){
 const e=zone.generacion?.encuentro||{},t=zone.generacion?.terreno||{};
 const pct=v=>Number.isFinite(Number(v))?`${Math.round(Number(v)*100)} %`:'Sin definir';
 const boards=(zone.tablerosPermitidos||[]).map(n=>`${escapar(n)}×${escapar(n)}`).join(' · ')||'Sin definir';
 return `<div class="detail-sheet atlas-detail">
   <div class="atlas-detail-warn">ARCHIVO EN BORRADOR · No representa estadísticas aprobadas.</div>
   <p>${escapar(zone.nombreProvisional||`Zona ${zone.numero}`)} es un marcador estructural del atlas. Su nombre final, ambientación y distribución de enemigos aún no están confirmados.</p>
   <h4>Tableros permitidos</h4><p>${boards}</p>
   <h4>Generación de encuentros (prototipo)</h4>
   <div class="atlas-modal-stats"><span>Cantidad base: <strong>${escapar(e.cantidadBase??'—')}</strong></span><span>Variación: <strong>${escapar(e.variacionCantidad??'—')}</strong></span><span>Presupuesto de amenaza: <strong>${escapar(e.presupuestoAmenaza??'—')}</strong></span><span>Excepcionales máximos: <strong>${escapar(e.maximoExcepcionales??'—')}</strong></span></div>
   <h4>Terreno (prototipo)</h4><p>Densidad entre <strong>${pct(t.densidadMin)}</strong> y <strong>${pct(t.densidadMax)}</strong>.</p>
   <p class="muted fine-print">Estos valores se consultan desde data/zonas.json. Esta sección no genera rutas, enemigos ni tableros automáticamente.</p>
 </div>`;
}

const CLASE_RAREZA={'Común':'comun','Poco común':'poco-comun','Rara':'rara','Única':'unica','Mítica':'mitica'};
export function renderReliquias(items,state){
  const q=$('itemSearch').value.toLowerCase().trim();
  const filter=$('itemFilter').value;
  const rarity=$('itemRarityFilter')?.value||'all';
  const isKnown=i=>state.unlocked.includes(i.id);
  const result=items.filter(i=>{
    const known=isKnown(i);
    const correctStatus=filter==='all'||filter==='unlocked'&&known||filter==='locked'&&!known;
    return correctStatus&&(rarity==='all'||rarity===i.rarity)&&[i.name,i.type,i.desc,i.condition,i.rarity].join(' ').toLowerCase().includes(q);
  });
  $('itemGrid').innerHTML=result.map((item,index)=>{
    const known=isKnown(item);
    const rare=CLASE_RAREZA[item.rarity]||'comun';
    const symbol=known?escapar(item.icon||'✦'):'◇';
    return `<article class="card relic-card relic-${rare}${known?' relic-discovered':' relic-locked'}">
      <div class="relic-topline"><span>RELICARIO · ${String(index+1).padStart(2,'0')}</span><span class="relic-rarity">${escapar(item.rarity)}</span></div>
      <div class="relic-emblem" aria-hidden="true"><span class="relic-emblem-inner">${symbol}</span></div>
      <div class="relic-card-copy"><span class="relic-type">${escapar(item.type)}</span><h3>${escapar(item.name)}</h3>
        <p>${known?escapar(item.desc):'Este objeto todavía no ha sido registrado en el santuario.'}</p></div>
      <div class="relic-condition"><span class="relic-condition-title">${known?'REGISTRO ABIERTO':'CONDICIÓN DE DESCUBRIMIENTO'}</span>
        <p>${known?'Se conserva como hallazgo descubierto.':escapar(item.condition)}</p></div>
      <div class="relic-card-foot"><span class="relic-state">${known?'✦ Descubierta':'◇ Sellada'}</span>
        <div class="relic-actions"><button class="small" data-action="relic-detail" data-id="${escapar(item.id)}">Consultar</button>
        ${known?'':`<button class="small relic-unlock" data-action="unlock" data-id="${escapar(item.id)}">Registrar (prueba)</button>`}</div></div>
    </article>`;
  }).join('')||'<div class="empty">No hay reliquias que coincidan con los filtros.</div>';
  const total=items.filter(isKnown).length;
  const max=items.length;
  const percent=max?Math.round(total/max*100):0;
  $('relicCount').textContent=`${total} de ${max} reliquias`;
  $('relicResultCount').textContent=`${result.length} resultados`;
  $('relicKnown').textContent=String(total);
  $('relicHidden').textContent=String(max-total);
  $('relicProgressLabel').textContent=`${percent} %`;
  $('homeProgress').style.width=max?`${percent}%`:'0%';
  $('homeProgressText').textContent=`${total} reliquias descubiertas`;
}
