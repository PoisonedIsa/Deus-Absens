# DEUS ABSENS · Fichas de combate v2.8

Sitio web estático para GitHub Pages. Conserva los nombres de archivo y rutas originales.

## Implementado y probado en esta versión

- Catálogo de **10 Penitentes**, con 7 disponibles y 3 apócrifos bloqueados de inicio.
- Fichas completas: trasfondo resumido, pecado, rol, armas, pasiva y martirio, usando contenido del autor.
- Creador de atributos `+3, +2, +1, +0` sin repeticiones. Fórmulas: PV `12 + SANGRE × 3`; Defensa `8 + techo(CENIZA/2)`; movimiento `2 + CENIZA`; Estigma máximo `10 + DOGMA`.
- Ficha activa con PV/Estigma y contador de cargas de martirio, persistidos por personaje en `localStorage`. **Una nueva expedición restaura las cargas; un combate nuevo no**.
- Tres Santos secretos: desbloqueo manual de prueba. **No se descuentan Ecos** hasta crear el sistema de economía.
- Fichas de 6 enemigos de ejemplo con PV, Defensa, Blindaje, movimiento, acciones, ataques múltiples y habilidades. **TODOS sus valores numéricos de combate son PROVISIONALES**.
- Mesa del director: añade múltiples ejemplares de enemigos, reduce/restaura PV y elimina individuos. Las criaturas no se mueven automáticamente.
- Conserva el catálogo de reliquias, su progreso y la crónica original.

## NO implementado todavía

- No hay cálculo de rutas, IA enemiga ni Tablas de Instinto. **El director controla por completo a los enemigos**.
- No hay sistema automático de tiradas, condiciones, daño, turnos, saqueo ni encuentros procedurales. Las fichas presentan las habilidades y permiten registrar PV manualmente.
- Sin sincronización entre dispositivos. `localStorage` conserva datos solo en el navegador actual.
- El legado mixto y los códigos de recuperación de campañas, los Ecos, la ruleta y las evoluciones redimidas todavía están por programar.
- El catálogo de seis reliquias sigue siendo de demostración.

## Qué cambiar en GitHub

Si ya publicaste la versión anterior, usa el ZIP **ACTUALIZACION**, que contiene solo las rutas a reemplazar o añadir. No cambies la ubicación de los archivos.

## Archivos del catálogo

- `data/personajes.json`: diez Santos, identidades, desbloqueos y vínculos a habilidades.
- `data/habilidades.json`: diez pasivas, diez martirios y límites de cargas. Solo San Longinos tiene capacidad inicial confirmada de 1; para los otros se muestra temporalmente 1 hasta que definamos sus valores.
- `data/objetos.json`: veinte objetos de equipo inicial de los diez Santos, como registros separados.
- `data/enemigos.json`: seis criaturas de demostración. **Edita sus estadísticas aquí, no en HTML o JavaScript**.
- `assets/js/ui.js`: presentación de fichas y contadores.
- `assets/js/app.js`: interacción, selección, registro de encuentros.
- `assets/js/state.js`: guardado compatible con selecciones/reliquias de la versión anterior.

## Para visualizar localmente

Desde la raíz del proyecto ejecuta `python -m http.server 8000` y abre `http://localhost:8000/`.
Los JSON no cargan de forma fiable si abres directamente `index.html` con `file://`.

## Seguridad y acceso

La web estática no distingue permisos reales entre jugador y director: el botón «Desbloquear (director)» es temporal y cualquier persona con acceso a la página podría usarlo. Esto se resolverá junto con el sistema de códigos/roles. No publiques contraseñas ni secretos en JSON públicos.
