# DEUS ABSENS · Refinamiento editorial v6.4

## Dirección visual

- Se conserva la composición elegante de la v6.3. No se reemplaza por una interfaz completamente nueva.
- La inspiración ambiental de libros de fantasía oscura se traduce en **márgenes generosos, jerarquía tipográfica, límites de folio, tonos hueso/granate y contraste más legible**. Los recursos visuales son originales del proyecto; no se reproducen ilustraciones ni páginas de terceros.
- No se añaden animaciones continuas, desenfoques de pantalla completa ni cambios de ruta automáticos.
- Menús agrupados: El mundo (Crónica, Reglas, Zonas), El códice (Personajes, Enemigos, Reliquias), La partida (Expedición, Director, Legado). Inicio y Créditos quedan a un clic.
- Los paneles de Zonas, Bestiario y Reliquias existentes se conservan.

## Flujo de selección y ficha

1. Elegir un Santo desbloqueado en `Personajes`.
2. Pulsar «Distribuir atributos» y revisar/guardar exactamente `+3, +2, +1, +0` (uno por atributo).
3. Pulsar «Confirmar y sellar ficha». Se muestra un diálogo de confirmación antes de bloquear.
4. La aplicación oculta el catálogo y muestra una **hoja de partida** con tres vistas: Ficha de combate, Inventario y Crónica.
5. La elección y los atributos permanecen bloqueados durante la partida. Sigue siendo posible modificar PV, Estigma, cargas de Martirio e inventario.
6. «Consultar otros Santos» abre el catálogo **en modo solo lectura** para esa partida. «Reabrir selección (director)» permite desbloquear después de un diálogo de confirmación. No elimina fichas anteriores.

El bloqueo y el inventario se guardan en el mismo `localStorage` que ya usaba el proyecto. Las partidas guardadas antes de v6.4 siguen disponibles; si tenían un Santo elegido, deberán revisar atributos y confirmar expresamente para activarle el bloqueo.

## Inventario

- En el primer uso de una ficha, se registran los objetos de `equipmentIds` definidos en `data/personajes.json`.
- «Registrar objeto» permite elegir una reliquia ya desbloqueada en el navegador o escribir un registro narrativo manual.
- Se puede retirar un objeto del inventario con confirmación.
- No se borran los desbloqueos permanentes del grupo por retirar objetos de la ficha.
- **No se ha implementado** capacidad, peso, intercambio entre jugadores, asignación automática de botín ni economía de Ecos.
- El inventario usa las descripciones existentes. No modifica estadísticas de juego automáticamente.

## Arte reemplazable

Se mantienen los símbolos originales, pero los registros pueden recibir ilustraciones más adelante sin modificar JS:

- En `data/personajes.json`, añadir un campo `"retrato": "assets/images/retrato-san-longinos.webp"` al Santo correspondiente.
- En `data/enemigos.json`, añadir un campo `"retrato": "assets/images/retrato-enemigo.webp"` a la criatura.
- Colocar las imágenes en `assets/images/` conservando los nombres de archivo elegidos. Se admiten rutas locales seguras de esa carpeta.
- Si no se añade ninguna imagen, se muestran los glifos de siempre.

No se distribuyen ilustraciones copiadas de otros libros ni se requiere cargar imágenes externas para que el sitio funcione.

## Créditos

La pantalla acredita **Isaias Martinez** como autor del concepto, universo y dirección creativa. Se reconoce también el trabajo de prototipado y la asistencia de IA.

## Alcance y limitaciones

- El «control del director» es una acción visible en la página, **no** una autorización con contraseña. La web estática no autentica roles.
- El bloqueo no se sincroniza entre dispositivos ni entre jugadores. Cada navegador tiene su estado independiente.
- No se incorporan nuevas reglas de combate ni se cambian los catálogos JSON existentes.
- No hay rutas automáticas, IA enemiga ni generación de encuentros.
- La capacidad definitiva de carga de Martirio para muchos Santos sigue siendo provisional.

## Archivos modificados en v6.4

- `index.html`: navegación agrupada, pantalla de créditos y textos.
- `assets/css/style.css`: pulido de paleta, legibilidad y hoja de personaje.
- `assets/js/ui.js`: vista de ficha confirmada, inventario y accesos.
- `assets/js/app.js`: seleccionar, confirmar, bloquear, inventariar y reabrir.
- `assets/js/state.js`: compatibilidad y persistencia de `selectionLocked`.
- `docs/INTERFAZ_VISUAL_V6_4.md`: este documento.
- `README.md`: instrucciones actualizadas.
