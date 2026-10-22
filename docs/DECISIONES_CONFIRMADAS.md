# DEUS ABSENS | Reglas confirmadas al 22/10/2026

Este documento separa acuerdos reales de funcionalidades pendientes.

## Tipo de juego
- Roguelite de mesa con herramientas digitales, dirigido por una persona.
- Web alojable en GitHub Pages; datos públicos en JSON y guardado inicial local.

## Legado mixto
- Desbloqueos generales compartidos por la campaña.
- Progreso individual para cada jugador y su ficha.
- Al cerrar una expedición se conservan los desbloqueos y la mitad de los Ecos, con reglas de redondeo/bolsas aún por precisar.
- Se desea exportar/importar progreso con códigos. **Aún no implementado**.

## Personajes
- Elenco previsto: al menos 10 Penitentes; por lo menos 3 inicialmente bloqueados.
- Cada uno tendrá versión redimida desbloqueable, concebida como variante.
- Atributos: ACERO, CENIZA, SANGRE y DOGMA con reparto +3, +2, +1, +0 sin repeticiones.
- PV = 12 + (SANGRE × 3). Defensa = 10 + CENIZA. Estigma inicial = 0. Límite de Estigma = 10 + DOGMA.
- El autor enviará el elenco completo: habilidades, cargas y equilibrio siguen en revisión.

## Martirio
- Cada Santo puede tener un número máximo **diferente** de cargas.
- Al usar la habilidad se consumen sus cargas. Cuando no alcanza, no puede activarse.
- Las cargas **persisten entre combates** y no se recuperan automáticamente entre ellos.
- **Durante la expedición** se recargan únicamente con objetos, eventos o intervención del director.
- **Al empezar cada expedición nueva** se restablecen al máximo del Santo.
- Cada ficha de jugador mantiene su contador independiente.
- La cifra de San Longinos (1 carga) es provisional para revisión con el elenco completo.

## Estado de implementación
- El manual actual contiene **seis personajes, seis adversarios y seis reliquias demostrativos**.
- Los cuatro catálogos nuevos están vacíos y sus rutas son estables.
- No existen aún contador interactivo de martirio integrado, códigos de progreso ni legado mixto operativo.
- El guardado previo `deusAbsensState` se mantiene para no romper el prototipo; su migración se hará cuando el sistema definitivo esté diseñado.
