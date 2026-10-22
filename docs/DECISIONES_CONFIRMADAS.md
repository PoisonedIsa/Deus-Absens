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

## Combate táctico y tableros (acuerdos posteriores)
- Tablero físico de **10 × 10** para un grupo previsto de **4 jugadores**; tablero de **15 × 15** para un máximo de **6 jugadores**. El director es independiente del cupo de jugadores.
- Movimiento horizontal/vertical: **1 punto** por casilla. Movimiento diagonal: **2 puntos** por casilla.
- Ataque cuerpo a cuerpo convencional: cualquiera de las **8 casillas adyacentes**, diagonales incluidas (interacción con obstáculos pendiente).
- Turno: inicio → movimiento → acción principal de ataque u objeto activo → acción de cierre únicamente si una habilidad u objeto la habilita.
- El sistema de resolución **2d6** interesa al creador, pero fórmulas numéricas y balance siguen en desarrollo.

## Expediciones y generación por zonas (acuerdos posteriores)
- Expediciones variables: el director decide rutas, zonas, objetivos y extensión.
- No hay selector de dificultad. La zona guía composición y complejidad de encuentros.
- Enemigos pueden aparecer fuera de su zona de origen; la frecuencia y cantidad dependen de pesos y límites configurables por zona.
- Obstáculos y encuentros tendrán generación procedural, sujeto a validación del tablero.

## Narrativa del director y consecuencias (acuerdo posterior)
- La narración y las decisiones se manejan **libremente por el director, al margen de la aplicación**; no se requiere generador automático de historias.
- La web administrará **recompensas, penalizaciones y otros efectos** aplicables directamente a las fichas individuales, antes o durante los combates.
- Si el director autoriza botín aleatorio, una **ruleta de objetos** permitirá sortear premios e incorporarlos al inventario. Ejemplo del creador: una decisión favorable concede **dos objetos** antes del combate; no implica que toda escena dé siempre dos.
- Ganar un objeto durante una expedición y desbloquearlo de forma permanente son registros separados.
- Mecánicas, probabilidades, cantidades y duraciones específicas de la ruleta y los efectos aún no están implementadas ni balanceadas. Véase `docs/NARRATIVA_RECOMPENSAS.md`.

## Inventario grupal y reparto (acuerdo posterior)
- Los objetos obtenidos por la ruleta ingresan **primero al inventario grupal** de la expedición.
- Los jugadores deciden conjuntamente qué objetos asignar a qué fichas individuales.
- La aplicación deberá permitir transferir una unidad de objeto del inventario grupal al individual sin duplicar cantidades.
- Recibir o repartir un objeto no constituye desbloqueo permanente automático.
- Reglas de intercambios posteriores, límites de capacidad y destino de objetos no repartidos al cerrar la expedición: **pendientes**.
- **Todavía no implementado** en el prototipo web.

## Muerte y recuperación de objetos (nuevo acuerdo)
- Si un Penitente muere en combate, **sus objetos quedan en la casilla donde cayó** y otros jugadores pueden recuperarlos durante el combate.
- No se envían de inmediato al inventario grupal, ni se duplican al recuperarlos.
- El catálogo de objetos desbloqueados permanece separado del inventario físico de la expedición.
- **Recoger el botín consume la acción principal del turno** del Penitente que realiza la recuperación. En ese turno no podrá usar esa misma acción para atacar o utilizar un objeto activo.
- **Una acción principal permite recuperar todos los objetos que dejó un Penitente caído** en ese botín; no se necesita una acción por objeto.
- **Alcance confirmado:** puede recuperarse desde **cualquiera de las 8 casillas inmediatamente adyacentes**, incluyendo diagonales, sin entrar a la casilla del botín, **si un muro u obstáculo sólido no bloquea la recogida**. La recogida sigue consumiendo una acción principal y transfiere todo el lote.
- **Si el grupo vence el combate**, los supervivientes pueden recuperar los objetos de los caídos que sigan en el tablero, antes de abandonar el escenario. Al haber terminado el combate, esa recuperación ya no consume acciones principales de turno.
- **Si los jugadores abandonan el escenario sin recuperar el botín, esos objetos se pierden definitivamente en la expedición**, sea por retirada, derrota o por marcharse después de ganar sin recogerlos.
- **Los enemigos pueden recoger objetos del botín de los caídos si llegan antes que los jugadores.** Cuando un enemigo toma objetos, pasan del suelo a su posesión sin duplicarse.
- **Armas robadas útiles:** un enemigo equipa un arma si es superior a su ataque o mejora su funcionamiento (por ejemplo, le aporta mayor alcance).
- **Armas inferiores:** un enemigo destruye el arma si es peor que sus ataques y no añade una ventaja útil; al hacerlo **se cura por completo, hasta su máximo de PV actual**. El arma queda destruida.
- **Objetos activos y pasivos:** los enemigos pueden utilizarlos igual que los Penitentes, respetando sus efectos definidos.
- **Muerte del enemigo:** cualquier objeto o arma que posea **desaparece definitivamente de la expedición**. No se recupera de su cadáver ni después de una victoria.
- **Esta pérdida no elimina los desbloqueos permanentes** del legado compartido: perder una copia durante la expedición no equivale a bloquear de nuevo el objeto.
- **Saqueo enemigo gratuito:** cuando un enemigo alcanza el botín y puede recogerlo, **lo toma, equipa o destruye sin gastar acción principal ni puntos de movimiento adicionales**. Puede continuar su turno y atacar si conserva su acción principal. La destrucción de un arma inferior restaura inmediatamente sus PV al máximo.
- **Alcance del saqueo enemigo (confirmado):** el enemigo puede recoger objetos gratuitamente desde cualquiera de las **8 casillas adyacentes** al botín, incluidas las diagonales, sin ocupar su casilla, **si ningún muro u obstáculo sólido bloquea la recogida**. El alcance es idéntico al de los Penitentes; el coste de recogida no lo es.
- **Acciones distintas:** recoger/equipar/destruir gratuitamente no vuelve gratuita la activación posterior de un objeto activo; se respetan los costes de uso definidos para ese objeto.
- **Bloqueo por obstáculos (confirmado):** muros y obstáculos sólidos bloquean la recogida de botín, incluso desde una casilla adyacente, tanto para Penitentes como para enemigos. No se permite recoger objetos a través de esos obstáculos.
- **Pendiente:** interacción con coberturas no sólidas, prioridad si hay varios objetos, reglas para armas equivalentes, requisitos especiales de uso y límites de inventario.
- **Pendiente de implementar** en la interfaz y la persistencia.
