# DEUS ABSENS | Inventario grupal y reparto

**Estado:** reglas de reparto confirmadas, especificación de implementación pendiente.

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

## Reglas por definir

- Si los jugadores pueden intercambiar objetos ya asignados.
- Límites de inventario o equipamiento por personaje.
- Destino de objetos no asignados al terminar una expedición.
- Pérdidas de objetos y botín ante la muerte de un Penitente.
- Permisos de la interfaz: quién confirma cada transferencia.
- Pesos de ruleta, duplicados y acceso a recompensas bloqueadas.

## Alcance técnico

Este documento no crea una ruleta, un inventario ni sincronización entre dispositivos. En el prototipo actual las recompensas no están conectadas a las fichas. Se implementará cuando aprobemos las reglas restantes, sin cambiar las rutas existentes.
