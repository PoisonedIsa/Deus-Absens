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


## Terreno de combate (nuevo acuerdo v1.7)
- El terreno se divide en **obstáculos transitables**, **trampas** y **muros**.
- Los **obstáculos** cuestan el doble del movimiento habitual para los Penitentes; a los enemigos **no les aumentan el coste de movimiento**.
- Los **muros** son infranqueables para Penitentes y enemigos; siguen bloqueando la recogida de objetos a través de ellos.
- Las **trampas** dañan únicamente a los Penitentes, con dados de daño elegidos por tipo y comprendidos entre **1d4 y 1d8**; a los enemigos no les afectan.
- Los ejemplos de trampas `1d4`, `1d6` y `1d8` se usan como categorías iniciales; faltan diseñar clases definitivas, ubicaciones y efectos especiales específicos. El daño ocurre al entrar y al inicio de cada turno en la casilla (v1.9).
- El movimiento ordinario permanece confirmado: horizontal/vertical cuesta 1 punto y diagonal cuesta 2 puntos. **Aplicación provisional del doble coste:** entrar en un obstáculo ortogonalmente cuesta 2 puntos, diagonalmente cuesta 4; queda por validar la forma de calcular un movimiento que entra y sale de terreno mixto.
- **Confirmado:** las trampas están siempre activas y no se agotan con el uso; pueden dañar repetidamente a Penitentes. Su estética será sacra y tétrica (sangre ritual, agujas, símbolos profanados, etc.).
- **Sin definir:** cobertura que podrían dar los obstáculos, cómo se calculan las dificultades de detección y si se pueden desactivar de manera extraordinaria y si obstáculos transitables bloquean la recogida por razones físicas.
- Los valores anteriores de coberturas `+1/+2 Defensa` y `4/8 PV` siguen siendo **propuestas no aprobadas**; ningún obstáculo transitable bloqueará el paso solo porque una versión anterior del borrador lo indicara.
- Las nuevas reglas están **documentadas, pero no implementadas en la web ni en el generador procedural**.

## Actualización v1.8 · Trampas persistentes (CONFIRMADO)

- Todas las trampas permanecen **siempre activas** durante el encuentro; **no son de un solo uso** y **no se consumen** cuando se activan.
- Solo afectan a los Penitentes; los enemigos siguen siendo inmunes a sus efectos.
- El dado de daño de cada tipo está dentro del intervalo **1d4 a 1d8**, inclusive.
- Estética narrativa: trampas sacras y tétricas, inspiradas en sangre ritual, agujas penitenciales y símbolos profanados. Los nombres propuestos en `data/obstaculos.json` son **ejemplos**, no denominaciones finales.
- **Confirmado en v1.9:** las trampas causan daño al entrar y al inicio de cada turno si el Penitente permanece en la casilla. **Actualización v2.1:** detección pasiva y búsqueda activa confirmadas; quedan pendientes sus valores y una posible neutralización extraordinaria.
- Las reglas nuevas tienen precedencia sobre cualquier mención anterior que deje abierta la posibilidad de trampas consumibles. Aún no están programadas en la web.

## Actualización v1.9 · Activación de trampas (CONFIRMADO)

- Las trampas siempre activas causan daño **cada vez que un Penitente entra** en su casilla.
- Además, si un Penitente **inicia su turno** sobre una casilla con trampa, vuelve a sufrir el daño correspondiente antes de moverse.
- Cada activación implica una nueva tirada del dado del tipo de trampa (`1d4`, `1d6` o `1d8`).
- No se aplica daño por el solo hecho de terminar el turno en la casilla.
- Los enemigos siguen siendo inmunes; ninguna activación consume ni desactiva la trampa.
- Hay trampas visibles y ocultas; la detección pasiva y la búsqueda activa se confirman en v2.1, sin dificultades fijadas aún.
- Esta regla prevalece sobre referencias anteriores que calificaban el daño por permanencia como pendiente.

## Actualización v2.0 · Visibilidad de trampas (CONFIRMADO)

- Los escenarios pueden contener tanto **trampas visibles** como **trampas ocultas**.
- El director conoce las posiciones de las trampas ocultas; no se colocan como fichas visibles para todos al preparar el tablero físico.
- Una trampa no cambia su daño ni se consume por ser visible u oculta. Daño por tipo `1d4` a `1d8`, al entrar y al comienzo de cada turno en su casilla; enemigos inmunes.
- **Actualización v2.1:** se aprueban detección pasiva y búsqueda activa, pero siguen pendientes los atributos definitivos, umbrales, radios, frecuencia, revelación por activación y neutralización.
- No se ha implementado este comportamiento en la web; solo está documentado y preparado en el catálogo de datos.

## Actualización v2.1 · Dos formas de detección de trampas (CONFIRMADO)

- **Pasiva:** un Penitente puede advertir peligros ocultos sin gastar acción; no descubre automáticamente todas las trampas. Radio, frecuencia y dificultad pendientes.
- **Activa:** un Penitente puede emplear su **acción principal** para buscar trampas; será más fiable que la pasiva. Sus valores exactos siguen pendientes.
- **Detectar no desactiva:** las trampas descubiertas siguen siendo permanentes, dañan al entrar y al inicio de cada turno si se permanece en su casilla. Los enemigos son inmunes.
- **Propuesta aún no aprobada:** `2d6 + CENIZA` para trampas físicas, `2d6 + DOGMA` para trampas rituales. No se asignaron números de dificultad, radios ni probabilidades.
- Este acuerdo está **documentado, no programado** en el manual ni en el generador.


## Actualización v2.2 · Dados de ataque (CONFIRMADO)

- Se confirma **2d6 como núcleo de las tiradas de ataque** de DEUS ABSENS.
- Los dados de daño previstos para las armas y las trampas permanecen por ahora independientes de los dados de ataque.
- **Aún no confirmado:** valor base de Defensa, fórmula exacta de ataque, frecuencia y efecto de críticos, tratamiento de dobles 1, penalización a Ataques Precisos, modificación de las habilidades originales para 2d6.
- Ninguna regla numérica provisional en `docs/COMBATE_BORRADOR.md` debe tratarse como definitiva sin la aprobación del creador.
- No se han cambiado los archivos JSON de personajes ni la lógica de juego en JavaScript.


## Actualización v2.3 · Fórmula de Defensa (CONFIRMADO)

- **Defensa base = 8 + redondear hacia arriba (CENIZA / 2).**
- CENIZA +0/+1/+2/+3 equivale a Defensa base **8/9/9/10**, respectivamente.
- Sustituye todas las fórmulas anteriores de Defensa que estaban pendientes o eran experimentales.
- El ataque se basa en **2d6** (confirmado); su fórmula completa y las reglas de críticos y Ataques Precisos continúan en revisión.
- Las coberturas +1/+2 y la fórmula de movimiento `2 + CENIZA` siguen como propuestas, no reglas aprobadas.
- Esta actualización es documental; el sistema de combate web aún no está implementado.
