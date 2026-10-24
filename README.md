# DEUS ABSENS · PROYECTO COMPLETO v8.0 PARA GITHUB PAGES

**Versión vigente: v8.0, Santos y economía personal.** Sitio estático HTML/CSS/JavaScript, sin instalación ni servidor propio. Créditos del proyecto: **Isaias Martinez**.

- **Entrar:** abre `index.html` mediante GitHub Pages o servidor local. Al hacer un `git push`, conserva las rutas de carpetas y el archivo `.nojekyll`.
- **Reglas actuales:** [`docs/REGLAS_VIGENTES_V8_0.md`](docs/REGLAS_VIGENTES_V8_0.md) y [`docs/ECONOMIA_ECOS_V8_0.md`](docs/ECONOMIA_ECOS_V8_0.md).
- **Actualizar sin perder progreso:** [`docs/MIGRACION_V8_0.md`](docs/MIGRACION_V8_0.md). Descarga un respaldo de tu ficha antes de actualizar.
- **Datos sin aprobación:** [`docs/PENDIENTES_BESTIARIO_V8_0.md`](docs/PENDIENTES_BESTIARIO_V8_0.md). No se asignaron recompensas de Ecos enemigas ni propiedades robables ni precios de mejoras.
- **Códigos `DA65`:** mantienen compatibilidad con la v6.5. No son certificados criptográficos.
- **No hay IA enemiga ni cálculo de rutas.** La mesa sigue en manos del director.

> **Aviso:** los documentos con títulos `V6`, `V7`, `BORRADOR`, `PILOTO` y `herramientas/balance/` son históricos o experimentales. Si discrepan, las decisiones de las reglas vigentes v8.0 prevalecen. No se realizó una validación definitiva del balance con enemigos completos.

---

## Histórico de desarrollo (se conserva para referencia)

# DEUS ABSENS · Proyecto completo para GitHub · v7.2

**Este archivo ZIP es el proyecto COMPLETO.** Descomprime su contenido y sube los archivos y carpetas directamente a la raíz de tu repositorio de GitHub. No crees una carpeta adicional dentro del repositorio.

Contiene la web funcional más reciente (v6.9: interfaz editorial v6.5 + tablero de iniciativa), los catálogos de personajes y enemigos y toda la documentación hasta el balance v7.2.

**IMPORTANTE:** v7.2 es una actualización de reglas, documentos e informes de simulación; no convierte en funciones automáticas los sistemas todavía pendientes. Los valores del balance siguen siendo provisionales. Las tiradas y los Ecos no se conceden automáticamente al finalizar encuentros.

**Reglas vigentes clave:** Ecos personales completos para todos los Penitentes que hayan acertado un ataque contra el enemigo derrotado (aunque Blindaje absorba daño), reserva al cerrar expedición = `floor(60 % de Ecos obtenidos)`, compras de mejoras personales y permanentes; martirios con cargas y límites individuales, sin curación gratuita entre encuentros. Cargas y límites concretos pendientes excepto Longinos (1 por expedición).

El simulador de balance en `herramientas/balance/` es material de análisis y **NO controla a los enemigos**; el director continúa decidiendo sus acciones.

## Instalación rápida en GitHub Pages

1. Abre tu repositorio de GitHub y conserva una copia de seguridad si ya hay una versión publicada.
2. Extrae este ZIP; sube **el contenido** (`index.html`, `assets/`, `data/`, `docs/`, `herramientas/`, etc.) a la raíz del repositorio y permite reemplazar los archivos existentes.
3. Asegúrate de que `index.html` quede en la raíz, y activa GitHub Pages desde la rama que estás usando.
4. Recarga la página publicada con Ctrl + F5 (o el equivalente del móvil).

**Guardados:** la información del jugador reside en `localStorage` de su navegador. Reemplazar archivos en GitHub no la reinicia automáticamente; no borres datos del sitio. Para seguridad, exporta el código de ficha antes de actualizar.

---

# DEUS ABSENS · Pulido visual y hoja de partida v6.4

Esta entrega mantiene la apariencia editorial de la v6.3 y añade navegación agrupada, una pantalla de créditos más cuidada, una selección de Santo confirmable/bloqueable y una hoja de personaje con inventario local.

**Instalación:** sustituir las rutas del archivo de actualización directamente en la raíz del repositorio de GitHub Pages. No eliminar los JSON ni el almacenamiento del navegador.

**Para preparar una ficha:** Personajes → Elegir → Distribuir atributos → Guardar → Confirmar y sellar. Después se abre la hoja de partida con Ficha de combate, Inventario y Crónica. El director puede reabrir la selección mediante confirmación.

**Limitación:** bloqueo e inventario solo en este navegador. No hay autenticación de director ni sincronización multijugador. El inventario manual no añade automáticamente efectos mecánicos.

Para imágenes futuras: incorporar retratos locales `assets/images/*.webp` o `.jpg` y referenciarlos desde la propiedad opcional `retrato` de los personajes o enemigos en sus JSON. Los glifos siguen funcionando sin imágenes.

Detalle de los cambios: `docs/INTERFAZ_VISUAL_V6_4.md`.

---

# DEUS ABSENS · Santuario digital v6.4

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

El ZIP de actualización correspondiente a v6.3 contenía las rutas de esa versión; para instalar este refinamiento desde v6.3 utiliza `DEUS_ABSENS_pulido_v6.4_ACTUALIZACION.zip`. Extrae desde la raíz del repositorio y **no borres** `data/personajes.json`, `data/habilidades.json`, `data/reliquias.json` ni tus otros ficheros.

Archivos modificados: `index.html`, `assets/css/style.css`, `assets/js/app.js`, `assets/js/ui.js`, `assets/js/data.js`, `README.md`. Archivo nuevo: `docs/INTERFAZ_VISUAL_V6_3.md`.

**Nota:** `data/zonas.json` ya existía en v6.2. Sus tres zonas y valores no están aprobados como reglas definitivas.

## Mejoras visuales y estructurales previas

- **Bloque visual 2:** los diez Santos ahora aparecen como cartas/expedientes sagrados con glifos propios, lemas narrativos, atributos y accesos a la ficha completa.
- **Iconografía de navegación:** los once menús tienen un símbolo y las cabeceras de sección usan ornamentos individuales.
- **Transiciones:** la navegación es inmediata y sin animaciones de pantalla completa. Los detalles de hover son mínimos.
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

## v6.5 · Ecos, mejoras y códigos de legado

Esta versión conserva íntegramente el aspecto v6.4, las diez historias, las fichas y los datos locales. Añade una primera estructura **funcional sin servidor** para:

- **Ecos del jugador:** dos contadores independientes (expedición y reserva), sin operaciones automáticas hasta completar las reglas.
- **Mejoras:** menú de categorías personal/global, conectado al catálogo `data/mejoras.json` que se mantiene vacío. No hay compras ni bonus inventados.
- **Códigos:** jugador exporta un informe de su ficha; el director recibe ese informe, genera un sello de campaña y emite recompensas manuales que el jugador revisa y aplica. También se puede restaurar una ficha desde un informe y usar un respaldo local.

**Limitaciones esenciales:** un código `DA65` no está firmado digitalmente, no prueba autoridad de director y no sincroniza distintos navegadores. El director debe entregar códigos a cada jugador. No se aplica el cierre automático con «mitad de Ecos»: falta definir redondeo y bolsa concreta. Las mejoras no tienen precio ni efecto hasta que se confirmen.

Consulta la guía completa en `docs/LEGADO_ECOS_CODIGOS_V6_5.md`.
