// Presentación del manual. No contiene definiciones permanentes de personajes u objetos.
const $ = id => document.getElementById(id);

export function escapar(valor) {
  return String(valor ?? '').replace(/[&<>"']/g, simbolo => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[simbolo]);
}

export function mostrarSeccion(id) {
  if (!$(id)?.classList.contains('section')) return;
  document.querySelectorAll('.section').forEach(s => s.classList.toggle('active', s.id === id));
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active', b.dataset.section === id));
  $('hero').style.display = id === 'inicio' ? 'grid' : 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

let temporizadorToast;
export function avisar(mensaje) {
  const elemento = $('toast');
  elemento.textContent = mensaje;
  elemento.classList.add('show');
  clearTimeout(temporizadorToast);
  temporizadorToast = setTimeout(() => elemento.classList.remove('show'), 2600);
}

export function cerrarModal() { $('modalBackdrop').classList.remove('open'); }

export function abrirModal(titulo, cuerpoHtml, acciones, kicker = 'Decisión') {
  $('modalKicker').textContent = kicker;
  $('modalTitle').textContent = titulo;
  $('modalBody').innerHTML = cuerpoHtml;
  const contenedor = $('modalActions');
  contenedor.replaceChildren();
  for (const accion of acciones) {
    const boton = document.createElement('button');
    boton.className = 'btn ' + (accion.secondary ? 'secondary' : '');
    boton.textContent = accion.label;
    boton.addEventListener('click', () => { cerrarModal(); accion.action?.(); });
    contenedor.append(boton);
  }
  $('modalBackdrop').classList.add('open');
}

export function mostrarError(mensaje) {
  const elemento = $('appStatus');
  elemento.textContent = mensaje;
  elemento.hidden = false;
}

export function renderPersonajes(personajes, estado) {
  const q = ($('characterSearch').value || '').toLowerCase();
  const filtro = $('characterFilter').value;
  const coincidencias = personajes.filter(c => {
    const coincideTexto = [c.name, c.role, c.skill, c.desc, c.evolution].join(' ').toLowerCase().includes(q);
    const coincideEstado = filtro === 'chosen' ? estado.chosen === c.id :
      filtro === 'available' ? estado.chosen !== c.id :
      filtro === 'evolved' ? estado.evolved.includes(c.id) : true;
    return coincideTexto && coincideEstado;
  });

  $('characterGrid').innerHTML = coincidencias.length ? coincidencias.map(c => {
    const elegido = estado.chosen === c.id;
    const evolucionado = estado.evolved.includes(c.id);
    return `<article class="card character-card">
      <div class="character-top"><div><span class="tag">${escapar(c.role)}</span><h3>${escapar(c.name)}</h3></div><div class="crest">${escapar(c.icon)}</div></div>
      <p>${escapar(c.desc)}</p>
      <div class="stats"><span class="stat">Vitalidad: ${escapar(c.hp)}</span>${(c.tags || []).map(t => `<span class="stat">${escapar(t)}</span>`).join('')}</div>
      <p><strong style="color:var(--ink)">Don:</strong> ${escapar(c.skill)}</p>
      <div class="card-bottom">
        ${elegido ? '<span class="tag gold">Personaje elegido</span>' : `<button class="small" data-action="choose" data-id="${escapar(c.id)}">Elegir personaje</button>`}
        ${evolucionado ? '<span class="tag">Evolución obtenida</span>' : `<button class="small" data-action="evolve" data-id="${escapar(c.id)}" ${elegido ? '' : 'disabled'}>Evolucionar una vez</button>`}
      </div>
      ${evolucionado ? `<div class="prose" style="margin-top:14px;padding:14px"><strong>${escapar(c.evolution)}</strong><p>${escapar(c.evoDesc)}</p></div>` : ''}
    </article>`;
  }).join('') : '<div class="empty">Ningún personaje coincide con la búsqueda.</div>';
}

export function renderEnemigos(enemigos) {
  const q = ($('enemySearch').value || '').toLowerCase();
  const filtro = $('enemyFilter').value;
  const coincidencias = enemigos.filter(e => (filtro === 'all' || e.type === filtro) &&
    [e.name, e.desc, e.ability, e.type].join(' ').toLowerCase().includes(q));
  $('enemyGrid').innerHTML = coincidencias.length ? coincidencias.map(e => `<article class="card">
    <div class="character-top"><div><span class="tag ${e.type === 'Celestial' ? 'gold' : ''}">${escapar(e.type)}</span><h3>${escapar(e.name)}</h3></div><div class="symbol">${escapar(e.icon)}</div></div>
    <p>${escapar(e.desc)}</p><div class="stats"><span class="stat">Amenaza: ${escapar(e.threat)}</span></div>
    <p><strong style="color:var(--ink)">Rasgo:</strong> ${escapar(e.ability)}</p></article>`).join('') : '<div class="empty">No se encontraron criaturas.</div>';
}

export function renderReliquias(items, estado) {
  const q = ($('itemSearch').value || '').toLowerCase();
  const filtro = $('itemFilter').value;
  const coincidencias = items.filter(i => {
    const desbloqueado = estado.unlocked.includes(i.id);
    return (filtro === 'all' || (filtro === 'unlocked' && desbloqueado) || (filtro === 'locked' && !desbloqueado)) &&
      [i.name, i.type, i.desc, i.condition].join(' ').toLowerCase().includes(q);
  });
  $('itemGrid').innerHTML = coincidencias.length ? coincidencias.map(i => {
    const desbloqueado = estado.unlocked.includes(i.id);
    return `<article class="card ${desbloqueado ? '' : 'locked'}">
      <div class="character-top"><div><span class="tag ${['Mítica','Única'].includes(i.rarity) ? 'gold' : ''}">${escapar(i.rarity)}</span><h3>${escapar(i.name)}</h3></div><div class="symbol">${desbloqueado ? escapar(i.icon) : '▧'}</div></div>
      <p>${desbloqueado ? escapar(i.desc) : 'Este registro permanece oculto. Descubre la condición para revelar su verdadera naturaleza.'}</p>
      <div class="stats"><span class="stat">${escapar(i.type)}</span></div>
      ${desbloqueado ? '<span class="tag gold">Descubierto</span>' : `<p class="locked-note">Bloqueado · ${escapar(i.condition)}</p><button class="small" data-action="unlock" data-id="${escapar(i.id)}">Registrar desbloqueo de prueba</button>`}
    </article>`;
  }).join('') : '<div class="empty">No hay objetos que coincidan con el filtro.</div>';

  const total = items.filter(i => estado.unlocked.includes(i.id)).length;
  $('relicCount').textContent = `${total} de ${items.length} reliquias`;
  $('homeProgress').style.width = items.length ? (total / items.length * 100) + '%' : '0%';
  $('homeProgressText').textContent = `${total} reliquias descubiertas`;
}
