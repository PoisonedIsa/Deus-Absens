# Migración sin pérdida de progreso · v8.0

## Actualización en GitHub Pages

1. Antes de reemplazar los archivos, exporta un informe de cada ficha y crea un respaldo local desde la pestaña Códigos de Legado. Los datos viven en el navegador de cada jugador, **no** en GitHub.
2. Descomprime el ZIP completo v8.0 y sube a la raíz del repositorio **todo su contenido**, sobrescribiendo los archivos antiguos. `index.html` debe permanecer en la raíz.
3. Espera a que GitHub Pages publique la actualización y recarga la página con Ctrl+F5.
4. Comprueba una ficha sellada antigua, el inventario, el Estigma, PV, reserva de Ecos y los códigos de recompensas pendientes antes de usar acciones nuevas.

## Compatibilidad

- Conserva exactamente la clave `localStorage.deusAbsensState`; el estado legado se normaliza y se le añaden contadores de expedición sin borrar `chosen`, `sheets`, `inventory`, `unlocked`, `globalUpgrades` anteriores, saldos ni códigos ya aplicados.
- El modelo `DA65` mantiene prefijo y versión de transmisión. Códigos antiguos siguen siendo legibles y se puede restaurar un informe antiguo. Nuevos códigos pueden contener índice de expedición, historial, Hambre y transformación.
- Las cargas v8.0 se obtienen de `data/habilidades.json`. Un guardado antiguo puede mostrar menos cargas que el nuevo máximo: **se conserva el valor gastado almacenado** para no regalar usos. Al iniciar una NUEVA expedición se restablecen al máximo correcto.
- Un respaldo local existente `deusAbsensBackupV65` sigue siendo restaurable. Al importar un informe se sobrescribe voluntariamente la ficha del navegador, previa confirmación.
- Se conserva `globalUpgrades` para leer partidas antiguas, pero ya no se vende una mejora global como compra colectiva. Los desbloqueos narrativos del director siguen separados de las mejoras personales.

## Datos aún pendientes

Se mantienen sin inventar las recompensas numéricas de enemigos, los precios de mejoras y las propiedades robables de Bartolomé. Los informes y la carpeta `herramientas/balance/` anteriores son referencias históricas, no validación v8.0.

## Limitaciones

El director verifica manualmente impactos, condiciones, posicionamiento, Puntos Débiles, uso válido de martirios y fichas de enemigos. El navegador almacena contadores, no ejecuta enemigos. Los códigos no están firmados digitalmente.
