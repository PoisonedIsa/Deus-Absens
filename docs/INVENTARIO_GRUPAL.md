# DEUS ABSENS | Inventario grupal y reparto

**Estado:** reparto y botín recuperable por muerte confirmados; costes de recuperación y demás detalles pendientes.

## Acuerdo de juego

La ruleta de objetos y las recompensas narrativas aleatorias entregan los objetos **al inventario grupal de la expedición**. Los jugadores deciden cómo distribuir el botín. Cada reparto traslada una cantidad real del inventario grupal a la ficha de un jugador: nunca crea una copia.

## Flujo funcional previsto

1. El director autoriza, por ejemplo, dos sorteos como premio narrativo.
2. La ruleta obtiene dos objetos del catálogo y los agrega al inventario grupal.
3. El grupo decide quién recibe cada uno.
4. Al asignar un objeto, el sistema verifica que está disponible, resta una unidad del grupo y suma una al inventario personal seleccionado.
5. La aplicación registra de forma legible la transferencia y mantiene cantidades consistentes.

## Separación de datos

- **Catálogo de objetos** (`data/objetos.json`): definición y efectos, no cantidades de un jugador.
- **Inventario grupal** (estado de expedición): `idObjeto` y cantidad disponible para reparto.
- **Inventarios individuales** (estado de expedición/ficha): `idJugador`, `idObjeto`, cantidad.
- **Legado compartido** (progreso permanente): IDs de objetos desbloqueados, independiente de su posesión durante la expedición.

## Regla confirmada: botín recuperable tras la muerte

- Cuando un Penitente muere **durante un combate**, los objetos que lleva quedan en la **casilla que ocupaba** en el tablero físico.
- Los demás jugadores **pueden recuperarlos**. No pasan automáticamente al inventario grupal ni desaparecen en el instante de su muerte.
- Para la futura ficha digital, el botín pasa de `inventarioIndividual` a un registro de `botinEnTablero`, con identificador de combate, coordenadas y objetos/cantidades. Cuando otro jugador lo recoge, se trasladan unidades del botín al inventario de quien lo recoge, **sin duplicar objetos**.
- Los objetos desbloqueados permanentemente en el legado compartido no se borran por la muerte del portador: **poseer** y **haber desbloqueado** un objeto son estados diferentes.
- No se ha decidido si recoger botín consume movimiento, acción principal o acción de cierre; tampoco el alcance ni el destino del botín no recogido. Son decisiones pendientes, no reglas ya aprobadas.

## Reglas por definir

- Si los jugadores pueden intercambiar objetos ya asignados.
- Límites de inventario o equipamiento por personaje.
- Destino de objetos no asignados al terminar una expedición.
- Coste de acción y condiciones para recuperar botín de un Penitente caído.
- Tratamiento del botín que no se recupere antes de cerrar el combate o la expedición.
- Excepciones para objetos ligados al personaje o de misión, si llegaran a existir.
- Permisos de la interfaz: quién confirma cada transferencia.
- Pesos de ruleta, duplicados y acceso a recompensas bloqueadas.

## Alcance técnico

Este documento no crea una ruleta, un inventario ni sincronización entre dispositivos. En el prototipo actual las recompensas no están conectadas a las fichas. Se implementará cuando aprobemos las reglas restantes, sin cambiar las rutas existentes.
