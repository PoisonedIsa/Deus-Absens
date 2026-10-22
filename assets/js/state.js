// La clave se conserva para mantener compatibilidad con la versión original.
export const STORAGE_KEY = 'deusAbsensState';

export function cargarEstado(items) {
  const defaults = items.filter(item => item.unlock === true).map(item => item.id);
  const estadoVacio = { chosen: null, evolved: [], unlocked: defaults };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return estadoVacio;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return estadoVacio;
    return {
      chosen: typeof parsed.chosen === 'string' ? parsed.chosen : null,
      evolved: Array.isArray(parsed.evolved) ? [...new Set(parsed.evolved.filter(id => typeof id === 'string'))] : [],
      unlocked: [...new Set([...defaults, ...(Array.isArray(parsed.unlocked) ? parsed.unlocked.filter(id => typeof id === 'string') : [])])],
    };
  } catch (error) {
    console.warn('No se pudo leer el progreso guardado:', error);
    return estadoVacio;
  }
}

export function guardarEstado(estado) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
    return true;
  } catch (error) {
    console.warn('No se pudo guardar el progreso:', error);
    return false;
  }
}
