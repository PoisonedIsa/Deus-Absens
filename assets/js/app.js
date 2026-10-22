// Punto de entrada estable: une catálogos, guardado y presentación.
import { cargarDatos } from './data.js';
import { cargarEstado, guardarEstado } from './state.js';
import {
  abrirModal, cerrarModal, avisar, escapar, mostrarError, mostrarSeccion,
  renderPersonajes, renderEnemigos, renderReliquias,
} from './ui.js';

async function iniciar() {
  const { characters, enemies, items } = await cargarDatos();
  const state = cargarEstado(items);

  function actualizar() {
    renderPersonajes(characters, state);
    renderEnemigos(enemies);
    renderReliquias(items, state);
  }

  function persistir() {
    if (!guardarEstado(state)) avisar('El navegador no permitió guardar los cambios.');
    actualizar();
  }

  function elegirPersonaje(id) {
    const c = characters.find(x => x.id === id);
    if (!c) return;
    if (state.chosen === id) { avisar('Este es tu personaje actual.'); return; }
    abrirModal('Jurar el descenso', `<p>¿Elegirás a <strong>${escapar(c.name)}</strong> como tu personaje?</p><p>${escapar(c.desc)}</p><p><em>Esta elección puede cambiarse en esta versión de prueba.</em></p>`, [
      { label: 'Elegir personaje', action: () => { state.chosen = id; persistir(); avisar(`${c.name} se une al descenso.`); } },
      { label: 'Volver', secondary: true },
    ], 'Selección de personaje');
  }

  function evolucionarPersonaje(id) {
    const c = characters.find(x => x.id === id);
    if (!c) return;
    if (state.evolved.includes(id)) { avisar('La evolución de este personaje ya fue elegida.'); return; }
    if (state.chosen !== id) { avisar('Primero debes elegir este personaje.'); return; }
    abrirModal('La evolución es irreversible', `<p><strong>${escapar(c.evolution)}</strong></p><p>${escapar(c.evoDesc)}</p><p>Solo puedes evolucionar una vez por personaje. En esta maqueta, la evolución queda registrada en este navegador.</p>`, [
      { label: 'Aceptar evolución', action: () => { state.evolved.push(id); persistir(); avisar(`${c.name} ha evolucionado.`); } },
      { label: 'No todavía', secondary: true },
    ], 'Umbral de transformación');
  }

  function desbloquearReliquia(id) {
    const item = items.find(x => x.id === id);
    if (!item || state.unlocked.includes(id)) return;
    abrirModal('Registrar hallazgo', `<p>¿Marcar <strong>${escapar(item.name)}</strong> como descubierta?</p><p>Condición sugerida: ${escapar(item.condition)}.</p><p>Esta acción es para probar el manual; más adelante puede vincularse a eventos de la campaña.</p>`, [
      { label: 'Registrar hallazgo', action: () => { state.unlocked.push(id); persistir(); avisar(`${item.name} añadido al relicario.`); } },
      { label: 'Cancelar', secondary: true },
    ], 'Registro de reliquia');
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('[data-goto], [data-section], [data-action]');
    if (!target) return;
    if (target.dataset.goto) { event.preventDefault(); mostrarSeccion(target.dataset.goto); }
    else if (target.dataset.section) mostrarSeccion(target.dataset.section);
    else if (target.dataset.action === 'choose') elegirPersonaje(target.dataset.id);
    else if (target.dataset.action === 'evolve') evolucionarPersonaje(target.dataset.id);
    else if (target.dataset.action === 'unlock') desbloquearReliquia(target.dataset.id);
  });

  document.getElementById('modalBackdrop').addEventListener('click', event => {
    if (event.target.id === 'modalBackdrop') cerrarModal();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') cerrarModal(); });

  for (const id of ['characterSearch','characterFilter'])
    document.getElementById(id).addEventListener('input', () => renderPersonajes(characters, state));
  for (const id of ['enemySearch','enemyFilter'])
    document.getElementById(id).addEventListener('input', () => renderEnemigos(enemies));
  for (const id of ['itemSearch','itemFilter'])
    document.getElementById(id).addEventListener('input', () => renderReliquias(items, state));

  actualizar();
}

// La navegación y el contenido se cargan tras iniciar el módulo.
iniciar().catch(error => {
  console.error('Error al iniciar DEUS ABSENS:', error);
  mostrarError('No se pudieron cargar los datos del juego. Abre la web desde GitHub Pages o un servidor local y revisa los archivos JSON.');
});
