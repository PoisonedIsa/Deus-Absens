# DEUS ABSENS v8.0 · Notas de la versión consolidada

## Qué se actualizó

- Actualizadas las 20 habilidades (pasiva + martirio de cada uno de los 10 Santos), con cargas oficiales, descripciones legibles y metadatos estructurados `rulesV8`.
- La ficha muestra las pasivas y los martirios vigentes; la gestión de cargas se adapta a los máximos acordados.
- Ecos de expedición, reserva y cierre del 60 %; el cierre no puede cobrarse dos veces. Tras cerrar, se puede iniciar la siguiente expedición y restaurar las cargas del Santo activo sin restauración gratuita de PV ni Estigma.
- San Lorenzo descuenta de manera conjunta 10 Ecos actuales y una carga al registrar una reacción válida. Pide el número de ronda para impedir un segundo uso en esa misma ronda; no simula el lanzamiento ni modifica automáticamente los dados.
- El director puede acreditar recompensas por enemigos identificados, introduciendo la base numérica **manualmente**; es obligatorio verificar el impacto. Si el destinatario es Lorenzo, calcula su +25 % redondeado hacia abajo. También se conserva la opción de ajuste manual excepcional por compatibilidad.
- El intercambio portátil `DA65` mantiene compatibilidad con códigos e informes antiguos y distingue los nuevos códigos de recompensas por índice de expedición cuando se conoce.
- La ficha incorpora asistencia manual para el Hambre y Blindaje temporal de Erasmo y el contador de turnos transformados de Juana.
- Las narrativas, el tablero de iniciativa, el inventario, los registros y la apariencia gótica original se conservan.

## No se inventó

CENIZA enemiga, recompensas numéricas de Ecos de enemigos, propiedades robables de Bartolomé, precios de compras/mejoras, reglas de vuelo concretas de Juana ni efectos especiales enemigos definitivos.

## Limitaciones intencionadas

- El director decide por sí mismo posiciones, ataques, búsquedas y puntuación de Puntos Débiles. **No hay IA enemiga ni cálculo de rutas.**
- Las mejoras personales no se pueden comprar todavía porque faltan precios aprobados.
- Los códigos `DA65` verifican integridad pero no acreditan quién los emitió ni sincronizan navegadores automáticamente.
- Los simuladores v7.0–v7.2 y sus entradas siguen archivados como experimentos históricos; no equivalen a una simulación integral del nuevo conjunto de reglas v8.0.

## Comprobaciones

- Los módulos JavaScript pasan `node --check`.
- `herramientas/pruebas/pruebas_v8.mjs`: 20 habilidades, 10 cargas, bonificación de Lorenzo, cierre del 60 %, prevención de cierres duplicados, códigos DA65 antiguos, restauración y doble aplicación de recompensas.
- `herramientas/pruebas/prueba_dom_simulado_v8.mjs`: arranque de la app con catálogos, carga de un guardado antiguo simulado, gasto de Lorenzo, cierre e inicio de expedición, persistencia de PV/Estigma/reserva/códigos.
- Verificación de estructura del ZIP, JSON válido, y conservación de personajes/enemigos/reliquias/objetos/zonas originales.
- La prueba visual automática con navegador gráfico no pudo completarse debido a restricciones de acceso del entorno de ejecución. No se afirma haber probado visualmente GitHub Pages en un navegador real. Se recomienda una verificación visual tras publicar.
