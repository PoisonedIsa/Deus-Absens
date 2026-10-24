# DEUS ABSENS | Inventario grupal y reparto

**Estado:** reparto grupal, botín recuperable, coste de recuperación en combate, recuperación de lote completo, alcance adyacente y recuperación tras la victoria, pérdida del botín abandonado y saqueo enemigo con uso, destrucción, curación y pérdida definitiva confirmados. Algunas condiciones de activación y capacidad siguen pendientes.

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
- **Recoger el botín consume la acción principal del turno** del Penitente que lo recupera. No puede utilizar esa misma acción principal para atacar ni para activar un objeto en ese turno.
- **Una única acción principal permite recoger todo el botín que dejó el Penitente caído**, sin requerir una acción por cada objeto. El sistema transfiere el lote completo sin duplicar unidades.
- **Alcance de recuperación:** el Penitente puede recoger el botín desde **cualquiera de las 8 casillas adyacentes** al lugar donde cayó su compañero, incluidas las diagonales, gastando su acción principal. No necesita ocupar la casilla del botín. Si un muro u obstáculo sólido bloquea la interacción entre el personaje y el botín, **no puede recogerlo**, aunque esté en una casilla adyacente. Esta restricción rige también para los enemigos.
- **Victoria del grupo:** si los jugadores ganan el combate, pueden recuperar el botín de los Penitentes caídos que aún permanezca en el escenario, **antes de abandonar el campo de batalla**. Fuera del combate no se exige gastar una acción principal de turno.
- Esta recuperación posterior no altera las reglas para recoger botín **durante** un combate: sigue costando una acción principal, puede realizarse desde una de las ocho casillas adyacentes y permite recoger todo el lote.
- **Abandono del escenario:** si los jugadores salen sin recoger los objetos, **todo botín abandonado desaparece de la expedición**, incluso después de una victoria. Si el grupo huye o es derrotado y abandona el escenario, pierde todo lo que haya dejado atrás. No queda pendiente para recuperarlo en una visita posterior.
- **Saqueo enemigo:** los enemigos pueden llegar hasta el botín de un Penitente caído **antes que los jugadores** y recoger objetos. Una vez recogidos, estos salen del registro de botín en el suelo y pasan a estar en poder del enemigo, sin duplicarse.
- **Armas robadas:** si el arma robada es más poderosa que su ataque disponible, o mejora funcionalmente su ataque (por ejemplo, añade alcance), el enemigo **la equipa y puede usarla**. La comparación considerará mejoras tácticas, no solo daño.
- **Armas inferiores:** si el arma es peor que los ataques del enemigo y no le proporciona una mejora útil, el enemigo **la rompe** y **recupera inmediatamente todos sus PV hasta su máximo actual**. El arma destruida se elimina del inventario y del campo de batalla de esa expedición.
- **Objetos activos y pasivos:** los enemigos pueden usarlos con los mismos efectos que los jugadores, sujetos a las condiciones que imponga la descripción del objeto. Los activos se activan según sus reglas; los pasivos se aplican mientras correspondan.
- **Muerte del enemigo portador:** todo objeto o arma que **esté en posesión de un enemigo cuando muere desaparece definitivamente de la expedición**. No cae al tablero, no se agrega al inventario grupal y no se recupera tras la victoria.
- **Distinción de legado:** la pérdida definitiva aquí afecta a la **copia física durante la expedición**, no borra un desbloqueo permanente ya registrado.
- **Saqueo gratuito para enemigos (confirmado):** cuando el enemigo alcanza una posición válida para recoger botín, **recogerlo, equiparlo o destruirlo no consume su acción principal ni puntos adicionales de movimiento**. Si aún dispone de su acción principal puede atacar ese mismo turno, incluso con el arma que acaba de equipar. Si rompe un arma inferior, recupera en ese momento todos sus PV hasta el máximo.
- **Alcance del saqueo enemigo (confirmado):** los enemigos pueden recoger gratuitamente el botín desde cualquiera de las **8 casillas inmediatamente adyacentes** a su posición, incluidas las diagonales. No necesitan entrar en la casilla del botín. Esta regla determina el alcance, no modifica los costes de movimiento para llegar a la posición.
- **Objeto activo:** la recogida es gratuita, pero activar el objeto sigue sus propias reglas y costes. No se presupone que la activación sea gratis.
- **Bloqueo por obstáculos (confirmado):** los muros y obstáculos sólidos impiden la recogida de botín aunque se encuentre dentro de las ocho casillas adyacentes. Se aplica por igual a Penitentes y enemigos, sin modificar los costes de interacción propios de cada uno.
- **Decisiones técnicas todavía abiertas:** prioridades si hay varios objetos disponibles, armas equivalentes, objetos con requisitos especiales y criterios precisos para coberturas que no sean obstáculos sólidos. No se inventan esas reglas aquí.
- Los límites de capacidad del inventario y las reglas de interacción con coberturas no sólidas siguen pendientes de definición.

## Reglas por definir

- Si los jugadores pueden intercambiar objetos ya asignados.
- Límites de inventario o equipamiento por personaje.
- Destino de objetos no asignados al terminar una expedición.
- **Confirmado:** muros y obstáculos sólidos bloquean la recogida desde casillas adyacentes, tanto para jugadores como para enemigos. Sigue pendiente clasificar coberturas no sólidas.
- Capacidad del inventario y cómo resolver incompatibilidades al recoger un lote completo.
- Reglas todavía no definidas del saqueo enemigo: interacción con coberturas no sólidas, prioridades cuando hay varios objetos disponibles, cómo decidir entre armas equivalentes o mejoras situacionales y qué ocurre con equipo que el enemigo no pueda utilizar. Recoger, equipar y destruir **ya se ha confirmado que es gratuito**.
- Comportamiento de un enemigo que abandone el escenario con equipo robado: aunque no sea recuperable tras su muerte, el destino al escapar sigue pendiente de precisión.
- Si existe alguna excepción para objetos de misión o vinculados a un personaje.
- Permisos de la interfaz: quién confirma cada transferencia.
- Pesos de ruleta, duplicados y acceso a recompensas bloqueadas.

## Alcance técnico

Este documento no crea una ruleta, un inventario ni sincronización entre dispositivos. En el prototipo actual las recompensas no están conectadas a las fichas. Se implementará cuando aprobemos las reglas restantes, sin cambiar las rutas existentes.
