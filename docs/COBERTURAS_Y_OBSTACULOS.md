# DEUS ABSENS | Terreno, coberturas y trampas

**Versión de diseño v2.1.** Los tres tipos de terreno a continuación son acuerdos confirmados. Los valores de cobertura y otros detalles indicados expresamente como propuestas no son reglas oficiales.

## Categorías confirmadas

| Categoría | Penitentes | Enemigos | ¿Bloquea el paso? |
|---|---|---|---|
| Obstáculo transitable | Cuesta el doble de movimiento | No sufren penalización de movimiento | No |
| Trampa | Reciben daño por tipo (1d4 a 1d8) | No les afecta | No, salvo regla especial futura |
| Muro | No lo atraviesan | No lo atraviesan | Sí, para todos |

Movimiento básico: **1 punto ortogonal** / **2 puntos diagonal**. Para probar obstáculos, se propone multiplicar el coste de entrar en la casilla ×2: jugador ortogonal 2; diagonal 4. **El cálculo concreto en casillas mixtas no está aprobado todavía**.

## Daño por tipo de trampa

- Trampa menor: **1d4** (ejemplo de categoría).
- Trampa intermedia: **1d6** (ejemplo de categoría).
- Trampa mayor: **1d8** (ejemplo de categoría; máximo daño por dado principal permitido actualmente).

**Confirmado:** las trampas están permanentemente activas; no se consumen tras dañar a un Penitente y pueden volver a afectar a otros. Los enemigos son inmunes a ellas. **Confirmado:** cada Penitente tira el dado de daño correspondiente **al entrar en una casilla de trampa**, y vuelve a tirarlo **al inicio de cada uno de sus turnos si sigue ocupándola**. Es una tirada por cada activación. Permanece activa para entradas y turnos posteriores. La posible desactivación extraordinaria sigue sin decidirse. La visibilidad ya no es uniforme: existen trampas visibles y ocultas.

## Coberturas: aún por balancear

Una cobertura no tiene por qué ser un muro. Puede ser un obstáculo transitable que ralentiza a los Penitentes y, si lo decidimos, les otorga un bono defensivo cuando se sitúa entre atacante y objetivo. Los bonos anteriores (`+1` ligera, `+2` pesada), los PV estructurales (`4` y `8`) y la destrucción están **pendientes de aprobación**. No deben imponerse en esta versión.

## Saqueo y obstáculos

Se mantiene la regla confirmada de que **un muro impide recoger botín a través de él**, incluso cuando el botín está adyacente. Los obstáculos **sólidos** también bloquean la recogida si físicamente interrumpen el acceso, según la regla previa. Queda pendiente especificar qué clases de obstáculos transitables serán sólidos para esta interacción; no asumir que todos los obstáculos transitables bloquean recoger objetos.

## Generación procedural futura

- Crear tipos por zona sin selector de dificultad.
- Afectar a los enemigos solo con muros, no con trampas ni penalización por obstáculos.
- Validar caminos para todas las unidades; el costo para jugadores y enemigos será diferente.
- Evitar muros en casillas iniciales y rutas inaccesibles.
- Usar los valores de catálogo como parámetros. No se ha implementado todavía ningún generador ni tablero digital.

## Ambientación sacra y tétrica (ejemplos narrativos, no clases cerradas)

| Arquetipo de catálogo | Nombre evocador de ejemplo | Daño |
|---|---|---|
| `trampa_menor` | Charco de sangre consagrada | 1d4 |
| `trampa_intermedia` | Agujas penitenciales | 1d6 |
| `trampa_mayor` | Sello de espinas sacrílegas | 1d8 |

Pueden añadirse variantes como cánticos castigadores, símbolos de penitencia, vitrales profanados o círculos de sangre ritual. Los nombres son **ambientación**, no implican por sí solos nuevos estados, penalizaciones ni tipos de daño. Las trampas siguen activas tras cada activación; nunca pasan automáticamente al estado de agotadas.

## Actualización v1.9 · Daño al entrar y al permanecer (CONFIRMADO)

1. Al **entrar** en la casilla de una trampa, el Penitente sufre una tirada del daño indicado por su tipo.
2. Al **inicio de cada turno** que comience ocupando esa casilla, vuelve a sufrir una tirada del mismo daño.
3. Abandonar la casilla evita el daño por permanencia en turnos posteriores; volver a entrar activa una nueva tirada.
4. Las trampas **no se consumen** y **no afectan a los enemigos**.
5. Daño base por tipo: `1d4`, `1d6` o `1d8`. Los efectos adicionales y el modo de desactivación extraordinaria siguen sin determinarse.

**Ejemplo:** un Penitente entra en una trampa `1d6` y tira `1d6` de daño. Si inicia su siguiente turno allí, tira otros `1d6`. No recibe daño adicional solo por acabar su turno en ella; el segundo disparador es el comienzo del turno.

## Actualización v2.0 · Trampas visibles y ocultas (CONFIRMADO)

- Los escenarios pueden contener **trampas visibles** y **trampas ocultas**. La combinación es una regla aprobada.
- Una trampa visible se representa abiertamente en el tablero para los jugadores.
- Una trampa oculta mantiene su posición reservada para el director hasta que se descubra o revele según las reglas que definamos después. Para jugar en tablero físico, el director puede conservar las coordenadas ocultas en su panel o notas sin colocarlas a la vista.
- **Ambas clases** permanecen siempre activas; infligen el daño por tipo (`1d4` a `1d8`) al entrar y al inicio de cada turno en esa casilla. Los enemigos son inmunes. La visibilidad no altera daño ni frecuencia de activación.
- Se recomienda registrar la visibilidad **por cada aparición de trampa**, no necesariamente por arquetipo: una trampa de agujas puede aparecer visible en una sala y oculta en otra. Este punto se modela en el catálogo como posibilidad técnica y podrá ajustarse.
- **ACTUALIZACIÓN v2.1:** ahora están aprobadas las dos modalidades de detección (pasiva y búsqueda activa). Siguen pendientes los atributos, dados, dificultades, radios, frecuencia de comprobación y revelación al activarse; no hay valores numéricos de detección aprobados.

## Actualización v2.1 · Detección pasiva y búsqueda activa (CONFIRMADO)

Ambas modalidades coexisten y se aplican únicamente a trampas ocultas:

1. **Detección pasiva:** los Penitentes tienen oportunidad de advertir una trampa oculta sin dedicar una acción a buscarla. La frecuencia, el radio y el umbral de éxito aún no se han definido. No significa revelar automáticamente todas las trampas del tablero.
2. **Búsqueda activa:** un Penitente puede dedicar su **acción principal** a buscar trampas ocultas. Esta modalidad deberá ser más fiable que la pasiva, aunque los valores de prueba se definirán más adelante.
3. **Descubrir no es desactivar:** si se descubre una trampa, se conoce su peligro y puede evitarse; sigue haciendo daño al entrar y al iniciar allí un turno. Sigue estando siempre activa.
4. **Dirección de juego:** el director conserva las posiciones de las trampas que todavía no hayan sido reveladas. La aplicación futura podrá mostrar una vista separada para el director.
5. **Propuesta de prueba, aún NO aprobada:** resolver ambas detecciones con `2d6 + CENIZA` en trampas mecánicas y `2d6 + DOGMA` en las rituales. La búsqueda activa tendría un umbral menor o una bonificación respecto de la pasiva.

**Pendiente de definir:** radio, momento o frecuencia de detección pasiva, dificultades, revelación tras activar una trampa y reglas sobre información compartida con el grupo. Por ahora ninguna de estas cuestiones tiene un número fijo ni una resolución automática implementada.
