# DEUS ABSENS · Santuario digital v6.3

Sitio web estático para GitHub Pages. Conserva los nombres de archivo y rutas originales.


## Bloque visual v6.2 · interfaz y rendimiento

- **Expedición:** nueva vista de preparación con resumen de Santo seleccionado, cantidad de criaturas y reliquias; accesos a secciones reales. Las rutas y la ejecución de expediciones siguen pendientes.
- **Legado:** panel con recuentos reales de Santos disponibles y reliquias descubiertas en este navegador, progreso y ficha elegida. Ecos, códigos y formas redimidas se indican como no implementados.
- **Mesa del director:** HUD de enemigos totales, vivos y PV; fichas de seguimiento con barra de PV, acceso a bestiario y todos los controles anteriores. Valores de combate siguen siendo provisionales. Sin IA ni rutas.
- **Rendimiento:** suprimidos efectos de animación permanente, blur y transiciones completas de vista; navegación instantánea y actualización selectiva de DOM al cambiar PV/cargas y descubrimientos. Interfaz más ligera en escritorio y teléfono.
- **Guardado:** no se borra ni cambia la clave `localStorage.deusAbsensState` ni se modifican los JSON de personajes/enemigos/reliquias.


## Bloque visual v6.3 · Portada, atlas y relicario

- **Portada de acceso renovada**: composición gótica estática, vidriera en SVG inline, entradas directas a Inicio y Personajes, sin bucles de animación ni recursos gráficos externos.
- **Atlas de Zonas**: fichas renderizadas desde `data/zonas.json` (esquema objeto con `zonas`); muestran número, nombre provisional, tamaños de tablero y parámetros de encuentro/terreno de prueba. Cada ficha puede abrirse para consultar todos los valores numéricos del borrador. **No hay generador de encuentros ni cálculo de rutas.**
- **Relicario visual**: tarjetas con estilos por rareza, estados descubierto/sellado, contador de progreso, filtros por texto, estado y rareza, y ficha de consulta. Se conserva el registro manual de hallazgos y el mismo guardado `deusAbsensState`.
- **Rendimiento**: los nuevos diseños no usan animaciones continuas, transiciones de página completa ni filtros de desenfoque. El Atlas se renderiza al cargar, no al registrar cada PV.

### Publicar desde la versión v6.2

El ZIP `DEUS_ABSENS_visual_v6.3_ACTUALIZACION.zip` contiene exactamente las rutas que debes sustituir o añadir. Extrae desde la raíz del repositorio y **no borres** `data/personajes.json`, `data/habilidades.json`, `data/reliquias.json` ni tus otros ficheros.

Archivos modificados: `index.html`, `assets/css/style.css`, `assets/js/app.js`, `assets/js/ui.js`, `assets/js/data.js`, `README.md`. Archivo nuevo: `docs/INTERFAZ_VISUAL_V6_3.md`.

**Nota:** `data/zonas.json` ya existía en v6.2. Sus tres zonas y valores no están aprobados como reglas definitivas.

## Mejoras visuales y estructurales previas

- **Bloque visual 2:** los diez Santos ahora aparecen como cartas/expedientes sagrados con glifos propios, lemas narrativos, atributos y accesos a la ficha completa.
- **Iconografía de navegación:** los once menús tienen un símbolo y las cabeceras de sección usan ornamentos individuales.
- **Transiciones ligeras:** animación entre secciones, con respeto a la preferencia del sistema de reducir movimiento.
- **Narrativas preservadas:** el proyecto completo incorpora el JSON ampliado v2.9 con las historias completas de los diez Penitentes y mantiene las mismas identidades de personaje y habilidades.

- **Pantalla de entrada** antes de acceder al contenido principal, con opción de entrar al inicio o saltar a personajes.
- **Navegación ampliada** con menús para Expedición, Zonas, Legado y Créditos.
- **Secciones placeholder** ya creadas para que el proyecto crezca sin tener que rehacer la estructura del sitio.
- **Créditos** como sección formal independiente.
- **Mejoras visuales**: atmósfera más marcada, paneles hero, microanimaciones, hover states, badges y ambientación general más coherente con el tono del juego.

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
