# DEUS ABSENS | Sistema de combate

Estado: BORRADOR DE DISEÑO 0.1. No modificar las reglas oficiales sin aprobación.

## Decisiones expresadas por el creador

- Combate táctico sobre tablero físico cuadriculado, de 10 × 10 o 15 × 15.
- Los personajes se desplazan una cantidad de casillas determinada por un modificador apropiado.
- Secuencia del turno: inicio de turno → movimiento → ataque o uso de objeto activo → acción de cierre, solo cuando exista una habilidad u objeto que la habilite.
- Los enemigos también se mueven y atacan.
- Se quiere explorar el sistema de ataque con 2d6.

## Reglas previas confirmadas e independientes del combate

- Atributos: ACERO, CENIZA, SANGRE, DOGMA; se distribuyen +3, +2, +1, +0.
- PV máximos = 12 + 3 × SANGRE.
- Estigma inicial 0; límite = 10 + DOGMA. Al alcanzar el límite, Quebranto, salvo habilidades que indiquen lo contrario.
- Legado mixto: desbloqueos de campaña compartidos y progreso individual por jugador.
- Cada Santo posee una capacidad máxima particular de cargas de martirio.
- Las cargas de martirio NO se restauran entre combates; solo se recuperan durante la expedición mediante objetos, eventos o decisión del director.
- Al comienzo de CADA NUEVA expedición, las cargas se restablecen al máximo de cada Santo.
- San Longinos: Herida del Costado, máximo inicial de 1 carga.

## Propuesta provisional para probar (NO APROBADA)

### Tableros
- 10 × 10: encuentros comunes.
- 15 × 15: encuentros especiales y jefes.
- Movimiento ortogonal: 1 casilla por punto. Movimiento diagonal: 1 casilla por punto, sin atravesar esquinas bloqueadas (por confirmar).

### Movimiento
- Movimiento (casillas) = 2 + CENIZA.
- CENIZA 0/1/2/3 equivale a 2/3/4/5 casillas.
- Se efectúa en una fase de movimiento, antes de la acción principal. Modificadores por equipo o estados por definir.

### Resolución de ataques
- Tirada = 2d6 + atributo aplicable + modificadores.
- Un ataque impacta si iguala o supera la Defensa.
- Defensa propuesta = 8 + CENIZA (sustituiría a la fórmula antigua 10 + CENIZA únicamente si se aprueba).
- Ataque con ACERO: cuerpo a cuerpo; CENIZA: disparos; DOGMA: ataques ocultistas, con excepciones por habilidad.
- Daño sigue siendo el dado indicado por el arma y sus propiedades, menos el Blindaje aplicable.
- 12 natural (6+6): crítico, propuesta de duplicar los dados de daño.
- 2 natural (1+1): fallo automático.
- Ataque preciso: penalización propuesta -2 al ataque; requiere adaptar las referencias antiguas a -3.
- Todas estas reglas numéricas están sujetas a pruebas de juego.

### Estructura por turno
1. Inicio: resolver estados y desencadenantes de inicio.
2. Movimiento: avanzar o permanecer inmóvil.
3. Acción principal: **elegir** ataque, objeto activo, martirio u otra acción disponible.
4. Acción de cierre: solamente si una habilidad u objeto otorga explícitamente una.

Los enemigos siguen el mismo orden de fases; el director decide su comportamiento.

## Problemas de compatibilidad con fichas actuales

- Santa Lucía y San Longinos: revisar penalización de ataques precisos.
- Santa Magdalena: el umbral de 15 en dado de ataque ya no encaja con 2d6 sin modificadores.
- San Lorenzo: convertir '20 natural / 1 natural' en un efecto compatible con 2d6 y reequilibrar el coste en Ecos y número de usos.
- Armas con alcance, efectos en cono/área y coberturas necesitan distancias en casillas.
- Fijar movimiento diagonal, alcance de ataques, tamaño de miniaturas, obstáculos y línea de visión.
- Definir iniciativa (individual o por bandos) y condiciones exactas de Puntos Débiles.
- Evaluar mediante simulaciones o partidas de prueba antes de establecer Defensa, críticos y penalizaciones definitivos.

## Ubicación prevista en el repositorio

`docs/COMBATE_BORRADOR.md` (este archivo). No sobrescribir todavía `data/personajes.json`, `data/habilidades.json` ni código de combate.
