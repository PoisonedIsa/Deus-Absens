// Catálogos públicos y editables. Rutas relativas compatibles con GitHub Pages.
// No almacenar secretos ni información privada en archivos JSON del repositorio.
const CATALOGOS = {
  characters: '../../data/personajes.json',
  enemies: '../../data/enemigos.json',
  items: '../../data/reliquias.json',
  abilities: '../../data/habilidades.json',
  variants: '../../data/variantes.json',
  improvements: '../../data/mejoras.json',
  equipment: '../../data/objetos.json',
};

async function leerCatalogo(ruta) {
  const respuesta = await fetch(new URL(ruta, import.meta.url));
  if (!respuesta.ok) throw new Error(`No se pudo cargar ${ruta} (${respuesta.status})`);
  const datos = await respuesta.json();
  if (!Array.isArray(datos)) throw new Error(`El catálogo ${ruta} debe ser una lista JSON.`);
  return datos;
}

function comprobarIds(lista, nombre) {
  const ids = new Set();
  for (const registro of lista) {
    if (!registro || typeof registro.id !== 'string' || !registro.id.trim()) {
      throw new Error(`Un registro de ${nombre} no tiene un id válido.`);
    }
    if (ids.has(registro.id)) throw new Error(`ID duplicado en ${nombre}: ${registro.id}`);
    ids.add(registro.id);
  }
}

export async function cargarDatos() {
  const entries = await Promise.all(Object.entries(CATALOGOS).map(async ([clave, ruta]) => {
    return [clave, await leerCatalogo(ruta)];
  }));
  const datos = Object.fromEntries(entries);
  for (const [nombre, lista] of Object.entries(datos)) comprobarIds(lista, nombre);
  return datos;
}
