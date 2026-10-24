# DEUS ABSENS | Contrato de archivos para futuras actualizaciones

## Política de rutas estables

**No mover ni renombrar** sin coordinación: `index.html`, `assets/css/style.css`, `assets/js/{app,data,state,ui}.js`, `data/{personajes,enemigos,reliquias,habilidades,variantes,mejoras,objetos}.json`.

Futuros cambios normales de contenido: entregar exclusivamente los archivos JSON afectados. Si el cambio necesita nuevas funcionalidades, actualizar además el módulo JavaScript correspondiente.

## Propósito de cada catálogo

| Archivo | Uso previsto | Situación actual |
|---|---|---|
| `data/personajes.json` | Santos, pecado, clase, desbloqueos y referencias de habilidades | 6 personajes de prueba, esquema antiguo |
| `data/habilidades.json` | Pasivas y martirios, efectos, cargas máximas | `[]` pendiente de revisión |
| `data/variantes.json` | Versiones redimidas y sus requisitos | `[]` pendiente |
| `data/objetos.json` | Armas, consumibles, piezas de equipo | `[]` pendiente |
| `data/reliquias.json` | Reliquias y hallazgos desbloqueables | 6 registros de prueba |
| `data/mejoras.json` | Progresión permanente y mejoras | `[]` pendiente |
| `data/enemigos.json` | Criaturas, amenazas y habilidades | 6 registros de prueba |

## Reglas para recibir un nuevo personaje

- Conservar el texto del autor y marcar balance como **provisional** hasta revisarlo.
- Asignar un `id` estable, único, sin espacios, que no cambie aunque cambie el nombre visible.
- Separar personaje, habilidades, objetos de equipo y forma redimida mediante IDs, una vez aprobado el nuevo esquema.
- La **capacidad máxima** de martirio es dato del Santo/habilidad; **cargas actuales** pertenecen al estado individual del jugador durante una expedición. No guardar `currentCharges` en un catálogo público compartido.
- Evitar duplicar campos de un mismo efecto en varios archivos.
- Mantener compatibilidad con datos de guardado anteriores o añadir una migración explícita.

## Contrato de martirio acordado (conceptual, no implementado)

```json
{
  "id": "martirio-san-longinos",
  "santoId": "san-longinos",
  "nombre": "Herida del Costado",
  "tipo": "martirio",
  "cargasMaximas": 1,
  "costePorUso": 1,
  "recargaInicioExpedicion": true,
  "estadoRevision": "provisional"
}
```

La interfaz deberá consultar `cargasActuales`, disminuirlas al activar y admitir aumentos autorizados dentro del máximo. Comenzar una nueva expedición reinicia `cargasActuales = cargasMaximas`. No se reinicia en combates.

## Advertencias al publicar en GitHub Pages

- JSON de repositorio público = información pública; no publicar claves de seguridad ni secretos del director.
- Los códigos cortos que recuperan datos remotos requerirían un servicio o registro externo.
- No confundir la capacidad de cargar un nuevo archivo con la existencia de una pantalla que lo muestre.
