# DEUS ABSENS | Sistema de combate

Estado: BORRADOR DE DISEÑO 0.3. No modificar las reglas oficiales sin aprobación.

## Decisiones expresadas por el creador

- Combate táctico sobre tablero físico cuadriculado, de 10 × 10 o 15 × 15.
- Los personajes se desplazan una cantidad de casillas determinada por un modificador apropiado.
- Secuencia del turno: inicio de turno → movimiento → ataque o uso de objeto activo → acción de cierre, solo cuando exista una habilidad u objeto que la habilite.
- Los enemigos también se mueven y atacan.
- Se quiere explorar el sistema de ataque con 2d6.
- **Movimiento diagonal confirmado:** cruzar una casilla en diagonal cuesta 2 puntos de movimiento; el desplazamiento horizontal o vertical cuesta 1 punto por casilla.

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
- **REGLA CONFIRMADA:** movimiento horizontal o vertical: 1 punto por casilla; movimiento diagonal: 2 puntos por casilla.
- Atravesar esquinas bloqueadas, unidades y obstáculos: por definir.
- En un tablero vacío, el coste mínimo de ir de (x1, y1) a (x2, y2) equivale a |x2 - x1| + |y2 - y1|: moverse diagonalmente no acorta el coste, pero ofrece una trayectoria alternativa.

### Movimiento
- Movimiento (casillas) = 2 + CENIZA.
- CENIZA 0/1/2/3 equivale a 2/3/4/5 casillas.
- Se efectúa en una fase de movimiento, antes de la acción principal. Modificadores por equipo o estados por definir.

### Resolución de ataques
- Tirada = 2d6 + atributo aplicable + modificadores.
- Un ataque impacta si iguala o supera la Defensa.
- **Defensa CONFIRMADA = 8 + techo(CENIZA / 2)**. El redondeo hacia arriba se aplica a la mitad de CENIZA, no a toda la expresión. Reemplaza las fórmulas antiguas 10 + CENIZA y 8 + CENIZA.
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
- El coste diagonal ya está fijado en 2 puntos; falta definir alcance de ataques (incluyendo adyacencia diagonal para golpes cuerpo a cuerpo), tamaño de miniaturas, obstáculos y línea de visión.
- Definir iniciativa (individual o por bandos) y condiciones exactas de Puntos Débiles.
- Evaluar mediante simulaciones o partidas de prueba antes de establecer Defensa, críticos y penalizaciones definitivos.

## Ubicación prevista en el repositorio

`docs/COMBATE_BORRADOR.md` (este archivo). No sobrescribir todavía `data/personajes.json`, `data/habilidades.json` ni código de combate.


## Adiciones de diseño 0.3: coberturas, obstáculos y disparos (PROPUESTAS, NO APROBADAS)

Estas reglas se ofrecen para pruebas y **no sustituyen** los acuerdos confirmados.

### Clasificación de obstáculos

| Tipo | Bonus a Defensa si protege del ataque | PV del obstáculo | Movimiento | Visión |
|---|---:|---:|---|---|
| Cobertura ligera | +1 | 4 | No atraviesa su casilla, salvo excepciones de escenario | No bloquea totalmente |
| Cobertura pesada | +2 | 8 | No atraviesa su casilla | No bloquea totalmente |
| Muro alto/obstáculo infranqueable | Ninguna tirada: bloquea el ataque | No destructible con ataques convencionales | Bloquea | Bloquea |

- Coberturas no apilan bonos: tomar **solo el mayor** aplicable a cada ataque.
- Se considera que una cobertura protege cuando se interpone en la trayectoria del ataque hacia el objetivo. El trazado preciso en esquinas o bordes está pendiente.
- Los muros altos impiden atacar a través de ellos; no confundir +Defensa con bloqueo total de línea de visión.
- Destruir cobertura: elegir el obstáculo como objetivo de una acción principal de ataque y aplicar el daño del arma contra sus PV; no daña de forma automática al personaje detrás.
- No se ha aprobado todavía si los ataques contra obstáculos impactan automáticamente, si el Blindaje modifica el daño recibido por estructuras ni qué objetos obstaculizan el saqueo.

### Tiradas de ataque (continúan como propuesta)

- Tirada = 2d6 + ACERO (melee), CENIZA (armas a distancia) o DOGMA (efecto sobrenatural), salvo excepciones.
- **Defensa base confirmada: 8 + techo(CENIZA / 2)**. Las bonificaciones propuestas de cobertura ligera (+1) y pesada (+2) todavía NO están aprobadas.
- Daño: dados propios de cada arma y luego reducción por Blindaje; el Blindaje no da bonificación a la tirada de ataque.
- 12 natural (6 y 6): crítico; propuesta de duplicar los **dados** de daño, no todos los modificadores.
- 2 natural (1 y 1): fallo automático.
- Ataque a Punto Débil: penalización provisional -2 a la tirada, efecto dependiente del enemigo.
- Ejemplo: atacante con CENIZA +3 vs Defensa base 9. Sin cobertura: 26/36 = 72,2% de impacto; ligera (DEF 10): 21/36 = 58,3%; pesada (DEF 11): 15/36 = 41,7%. Muro alto: ataque bloqueado.

### Reglas espaciales confirmadas pertinentes

- Horizontal/vertical = 1 punto de movimiento por casilla. Diagonal = 2 puntos.
- Un ataque cuerpo a cuerpo convencional alcanza una de las ocho casillas adyacentes, incluidas las diagonales.
- Los obstáculos sólidos y muros bloquean recoger botín desde una casilla adyacente, tanto a Penitentes como enemigos.

### Pendiente de decidir y probar

1. Cómo se calcula exactamente la línea de visión en ángulos y esquinas; si es válida una línea que atraviesa dos esquinas bloqueadas.
2. ¿Los obstáculos destructibles bloquean la recogida de botín al interponerse? Ya está confirmado que los obstáculos **sólidos** sí.
3. ¿Un ataque dirigido a un obstáculo impacta automáticamente o requiere tirada?
4. Si los disparos pueden atravesar varios obstáculos o si solo cuenta el mayor bono.
5. Iniciativa, rango por arma, movimiento base (2 + CENIZA sigue provisional), acciones de cierre y manejo de estados.
6. Probar el efecto de CENIZA sobre movimiento, Defensa y puntería; evitar que domine los otros atributos.
7. Adaptar a 2d6 las fichas originales de Santa Magdalena, San Lorenzo y Ataques Precisos antes de programar.

### Separación de datos y lógica

- `data/obstaculos.json` contiene **arquetipos provisionales**, no reglas aprobadas.
- En el futuro `data/zonas.json` indicará qué tipos y cantidades de obstáculos pueden generarse según la zona.
- `assets/js/generador.js` construirá mapas y verificará conectividad.
- `assets/js/tablero.js` dibujará el escenario y evaluará distancias/obstáculos.
- No se ha modificado todavía la web ni el generador: estos son datos y documentación para revisión.


## Actualización v1.7 · Obstáculos, trampas y muros (DECISIONES CONFIRMADAS)

| Terreno | Penitentes | Enemigos |
|---|---|---|
| Libre | Coste normal | Coste normal |
| Obstáculo transitable | Doble coste de movimiento | Coste normal |
| Trampa | Daño variable según tipo, de 1d4 a 1d8 | Inmunes al efecto de trampa |
| Muro | No se puede atravesar | No se puede atravesar |

**Precedencia:** esta sección reemplaza cualquier indicación anterior que trate las coberturas/obstáculos transitables como casillas impasables. No cambia el bloqueo de paredes.

- Movimiento normal confirmado: 1 punto ortogonal, 2 diagonal.
- Ejemplo de cálculo **propuesto, pendiente de validar**: el multiplicador ×2 aplica al entrar en la casilla de obstáculo: coste 2 ortogonal o 4 diagonal; enemigos siempre pagan 1 o 2, respectivamente. No tratar el detalle de cálculo como definitivo.
- Trampas: representar en el catálogo variantes de prueba 1d4, 1d6 y 1d8; ninguna debe infligir daño superior a 1d8 mediante su dado principal. La activación al entrar y al inicio de cada turno mientras se ocupa la casilla está **confirmada en v2.0**.
- Las trampas no afectan a los enemigos; los muros sí les impiden el paso.
- Los obstáculos transitables pueden ofrecer cobertura, pero el bono y la resistencia aún no están aprobados.
- El sistema procedural deberá validar conectividad y coste de caminos, reservar posiciones iniciales y evitar encerrar a las unidades con muros.

## Actualización v1.8 · Trampas perpetuamente activas (CONFIRMADO)

- Las trampas **nunca se agotan tras activarse**. Siguen representando peligros permanentes de la casilla durante el encuentro.
- Los Penitentes pueden sufrir daño de trampa según su tipo (`1d4`, `1d6` o `1d8`); los enemigos no lo sufren.
- Su aspecto narrativo será sacro y tétrico: sangre ritual, agujas penitenciales, símbolos profanados y otros motivos semejantes.
- **Actualizado en v2.0:** se confirmó daño al entrar y al inicio de cada turno mientras se permanezca en la casilla. No se aplican daños adicionales al mero final de turno.
- Reglas de muros y obstáculos transitables de v1.7 siguen vigentes; los bonos de cobertura siguen en evaluación.

## Actualización v2.0 · Momento del daño de trampas (CONFIRMADO)

- **Entrada:** al pisar la casilla, todo Penitente recibe una tirada del dado de daño de la trampa (`1d4`, `1d6` o `1d8`).
- **Inicio de turno:** si el Penitente empieza su turno sobre la casilla de trampa, recibe otra tirada de ese dado antes de su movimiento.
- **Repetición:** se aplica de nuevo cada vez que entre o comience allí un turno. Nunca se agota la trampa.
- **Enemigos:** inmunes a trampas en ambos casos. Los muros siguen bloqueando a todos.
- **Sin daño adicional al final del turno** por el solo hecho de quedarse allí. Otros efectos y modos de desactivación extraordinaria siguen sin decidirse.

## Trampas visibles y ocultas (v2.0, confirmado)

Los mapas incluyen una mezcla de trampas visibles y ocultas. Su visibilidad no cambia el daño: las trampas siguen siendo permanentes, dañan al entrar y al inicio de cada turno sobre su casilla, e ignoran a los enemigos. La detección pasiva y la búsqueda activa están aprobadas en v2.1; las dificultades y otras especificaciones siguen pendientes.

## Detección de trampas (v2.1, confirmado)

- Habrá **detección pasiva** sin coste de acción y **búsqueda activa** que consume la acción principal.
- La búsqueda activa será más fiable, pero no se han establecido radios, dificultades ni bonificaciones numéricas.
- Detectar una trampa no la neutraliza: sigue activándose al entrar y al iniciar un turno sobre ella.
- Propuesta pendiente de aprobación: `2d6 + CENIZA` para peligros mecánicos y `2d6 + DOGMA` para peligros rituales.
- Las trampas no reveladas se mantienen ocultas al jugador y conocidas por el director.


## Actualización v2.2 · Elección del dado central (CONFIRMADO)

- El creador ha confirmado avanzar con **2d6 como sistema central para las tiradas de ataque**.
- Esta aprobación **no equivale** a aprobar automáticamente la fórmula completa de bonificaciones, los valores de Defensa, los críticos ni el Ataque Preciso. Estos requieren pruebas de equilibrio.
- Los dados de **daño** propios de las armas (d4, d6, d8, d10, d12) se mantienen de momento, al igual que el daño de trampas (d4 a d8).
- Propuesta a probar: `2d6 + atributo aplicable + modificadores >= Defensa`. Para cuerpo a cuerpo se propone ACERO; disparos, CENIZA; milagros, DOGMA; SANGRE conserva su papel en PV y resistencia.
- **Defensa aprobada:** `8 + techo(CENIZA / 2)`. Los ataques que igualan o superan la Defensa impactarían según la fórmula de acierto actualmente propuesta; un muro completo impide atacar aunque se alcance el valor.
- **Crítico experimental:** 6+6 natural (2,78 % de las tiradas) duplica dados de daño del ataque, sin duplicar modificadores fijos.
- **Fallo experimental:** 1+1 natural (2,78 %) falla siempre.
- **Ataque preciso experimental:** modificador -2; los efectos sobre Puntos Débiles se definirán por enemigo.
- En la resolución propuesta, tras impactar se tira el daño del arma, se aplican bonos y se resta el Blindaje, con un mínimo de 0 daño. Orden y límites aún sujetos a prueba.

### Tabla de pruebas exactas, Defensa 9 sin cobertura

| Modificador total de ataque | Se requiere en 2d6 | Tiradas favorables de 36 | Probabilidad |
|---:|---:|---:|---:|
| +0 | 9 o más | 10 | 27,78 % |
| +1 | 8 o más | 15 | 41,67 % |
| +2 | 7 o más | 21 | 58,33 % |
| +3 | 6 o más | 26 | 72,22 % |

Las probabilidades incluyen dobles 1 y 6: el doble 1 no llegaría a Defensa 9 con modificadores +0 a +3, y el doble 6 siempre acertaría.

### Compatibilidad obligatoria con las diez fichas (PENDIENTE)

1. Santa Magdalena: umbral 15 en el dado de ataque debe reinterpretarse, pues 2d6 natural no supera 12.
2. San Lorenzo: reemplazar la manipulación de 20 o 1 natural por una regla apropiada para dos dados; no asumir equivalencia en poder.
3. San Longinos y Santa Lucía: sus referencias a penalización de -3 en Ataques Precisos deben adaptarse solo cuando aprobemos el coste.
4. Revisar efectos que garantizan críticos e impactos, especialmente sobre jefes.
5. CENIZA podría dominar al afectar puntería, Defensa y movimiento; evaluar alternativas antes de fijar la Defensa.
6. No modificar todavía los valores de armas, daño, cargas de martirio ni datos del juego.

### Próxima decisión

Definir **Defensa base** y progresión por CENIZA, luego fijar críticos y Ataques Precisos tras pruebas.


## Actualización v2.3 · Defensa (CONFIRMADA)

- **Fórmula oficial:** `Defensa base = 8 + ⌈CENIZA / 2⌉` (redondear la mitad hacia arriba).
- Distribución habitual de atributos iniciales: CENIZA +0 → Defensa 8; +1 → 9; +2 → 9; +3 → 10.
- La misma regla se aplica a personajes y enemigos con atributo CENIZA definido; bonos de coberturas, equipamiento o estados se resolverán aparte.
- Se confirma la Defensa, **no** todavía la fórmula definitiva de impacto, el efecto de los críticos o la penalización del Ataque Preciso. El dado de ataque 2d6 sí está confirmado.
- Las referencias previas a `8 + CENIZA` en versiones anteriores quedan anuladas por este acuerdo.
