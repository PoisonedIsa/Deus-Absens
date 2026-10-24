# DEUS ABSENS | Combate piloto 01 · San Longinos vs. Deudor de Sal

**Versión de preparación v6.9 · GUÍA DE PRUEBA, NO BALANCE FINAL**

**Objetivo:** comprobar que el ciclo básico de combate es claro, cuánto dura un enfrentamiento 1 contra 1 y qué incidencias surgen con iniciativa, Defensa, críticos y estados iniciales. No introduce IA enemiga, cálculo de rutas ni automatización.

## Qué necesitamos

- Un tablero físico de **10 × 10**, dos fichas/miniaturas, **2d6** para ataques e iniciativa, **1d10** para la lanza y **1d6** para el ataque enemigo.
- Una copia del `docs/REGISTRO_COMBATE_PILOTO_01.md` (para imprimir o copiar a mano).
- La ficha del jugador y la Mesa del director para apuntar PV. No iniciar un nuevo personaje ni sobrescribir una ficha sellada de una campaña real; se puede llevar esta prueba en papel.
- El director decide cuándo y cómo actúa el Deudor conforme a su turno, sin automatización.

## Fichas para esta prueba

### San Longinos

Reparto **SUGERIDO SOLO PARA PRUEBA**, no decisión definitiva ni cambio del Santo:

| Atributo | Valor |
|---|---:|
| ACERO | +3 |
| CENIZA | +1 |
| SANGRE | +2 |
| DOGMA | +0 |

Con estos valores: **PV 18**, **Defensa 9**, **Movimiento 3**, **Estigma máximo 10**. La mitad de PV máximos es **9**.

- Arma para este piloto: **Lanza de Trinchera «Gólgota»**, base **1d10**, usando exclusivamente **alcance adyacente** (incluida diagonal); su alcance adicional real aún no está confirmado.
- Ataque de melé `2d6+3` contra Defensa del Deudor (`8`). Doble 6 = impacto automático y **2d10 de daño base**. Doble 1 = fallo y `-1` al próximo ataque intentado por Longinos.
- Pasiva oficial «Cólera Sangrienta»: a **9 PV o menos**, cada ataque suyo añade **1d4 extra** que **NO se duplica** en críticos; la penalización de precisos también baja 1, pero no hay Puntos Débiles inventados en este piloto.
- Martirio oficial «Herida del Costado»: 1 carga por expedición, impacto garantizado, ignora Blindaje, Sangrado Sacro 1d6 de daño al inicio de los próximos 3 turnos del objetivo y 3 PV de curación a Longinos por activación. **Por claridad, no se necesita usar el martirio en la primera pasada; si se usa, registrar por separado y no inventar daño instantáneo no especificado.**

### Deudor de Sal

| Parámetro | Valor EN PROTOTIPO |
|---|---:|
| PV | 14 |
| Defensa | 8 |
| Blindaje | 0 |
| Movimiento | 3 |
| Ataque «Cobro de sal» | `2d6 + 0` contra Defensa, daño base `1d6` |
| Alcance de ataque | 1 casilla |
| **CENIZA para iniciativa** | **Sin valor oficial (`null`). Debe declararse provisionalmente para la prueba** |

**Aviso:** `data/enemigos.json` no tiene CENIZA, aunque la nueva regla oficial requiere `2d6+CENIZA` para cada combatiente. El +0 de v6.8 era únicamente un supuesto de prueba; **no** se establece que todos los enemigos tengan CENIZA +0. `data/enemigos.json` incluye ahora `"ceniza": null` para cada tipo hasta asignar y aprobar cifras, sin otros atributos añadidos.

El efecto «Cobro pendiente» figura en la ficha, pero su robo de un recurso temporal no está desarrollado. **No inventar su resolución** durante esta prueba; anotar como pendiente.

## Montaje

1. Dibujar una cuadrícula de 10 × 10. Por ejemplo, situar a Longinos en **E5** y al Deudor en **E6**. Están adyacentes. El tablero queda **sin muros, obstáculos bajos, trampas ni Puntos Débiles adicionales**.
2. Anotar ambos PV y las características anteriores.
3. Antes de tirar, **declarar por escrito** la CENIZA de ensayo del Deudor, porque todavía no hay valor oficial. Longinos usa +1 con la distribución sugerida. **No deducir CENIZA enemiga de su movimiento**.
4. Cada combatiente tira **2d6+CENIZA una sola vez** al empezar el combate. El orden descendente se mantiene durante todas las rondas.
5. Si dos o más empatan en total, va primero quien tenga mayor CENIZA. Si también empatan en CENIZA, repiten `2d6+CENIZA` **solo esos combatientes** hasta desempatar; los demás conservan sus posiciones. No se aplican críticos de ataque a tiradas de iniciativa.
6. Si deseas utilizar la web, abre **Mesa del director → Tablero de iniciativa**, o directamente `herramientas/iniciativa.html`. Pulsa «Cargar combate piloto», introduce la CENIZA de prueba del Deudor y usa dados físicos o virtuales.
5. Comenzar la ronda 1 con el primero de la lista de iniciativa.

## Resolver cada turno (ambos bandos)

1. **Inicio:** aplicar efectos de comienzo de turno si existen.
2. **Movimiento:** cada bando puede moverse según sus puntos (Longinos 3, Deudor 3); no se permite atravesar muros. El director elige libremente la conducta del Deudor.
3. **Acción principal:** un ataque o una acción permitida; no hacer dos ataques normales en un mismo turno.
4. **Cierre:** solo existe si una habilidad lo habilita expresamente.
5. Anotar tirada natural, bono y penalizaciones, Defensa objetivo, impacto/fallo, daño base, daño extra, Blindaje y PV resultantes.

### Ejemplos de cálculo

- **Longinos:** tira **2 y 3**: `2+3+ACERO 3=8`, alcanza la Defensa 8 del Deudor y **acierta**. Tira `1d10`; si obtiene 6, el Deudor pasa de 14 a **8 PV**.
- **Deudor:** tira **5 y 4**: `5+4+bono 0=9`, alcanza la Defensa 9 de Longinos y **acierta**. Si su `1d6` obtiene 3, Longinos pasa de 18 a **15 PV**.
- **Doble 6 natural** en un ataque: acierto garantizado y se duplican los **dados base del arma**. Para la lanza `2d10`; para «Cobro de sal» `2d6`. Un dado extra `1d4` de Cólera Sangrienta **no** se duplica.
- **Doble 1 natural** en un ataque: fallo automático y `-1` al siguiente ataque de ese mismo atacante. El modificador se consume cuando se intente el siguiente ataque.
- **Cobertura baja (para un segundo ensayo, no aquí):** un objetivo de Defensa base 9 pasa a **Defensa 10** si un obstáculo bajo lo protege claramente. Si el obstáculo no protege, vuelve a 9. Un muro opaco bloquea la línea de visión en lugar de sumar Defensa.

### Qué anotar al vencer

Si el Deudor cae a 0 PV, registra **quién acertó al menos un ataque contra ese ejemplar**. Esas personas **tendrían derecho a su recompensa COMPLETA de Ecos**, aunque en este escenario **no hay una cantidad aprobada**, así que **no se suman Ecos** al guardado real.

## Segunda pasada opcional: prueba de cobertura

Usa un ataque **de alcance legal según la decisión que se apruebe para el arma utilizada** y coloca un obstáculo bajo que proteja claramente al objetivo. Comprueba Defensa con y sin protección, manteniendo constantes los demás valores. Si el alcance de la pistola de Longinos aún no está confirmado, **no atribuirle arbitrariamente un rango como regla oficial**. Un muro opaco, por su parte, bloquea la línea de visión. No mezclar obstáculos con el ensayo base sin anotar el cambio.

## Criterios de evaluación

- ¿Se entendió el orden de iniciativa fijo para el combate, incluido el desempate por CENIZA? (Anotar el valor de prueba del Deudor.)
- ¿Cuántas rondas y ataques hicieron falta?
- ¿Se activó Cólera Sangrienta? ¿Influyó?
- ¿Hubo un 6+6 o 1+1 y se resolvió correctamente?
- ¿Fue demasiado fácil/difícil el Deudor con 14 PV / DEF 8 / Blindaje 0?
- ¿Qué reglas faltaron para jugar sin detenerse?

**Importante:** un combate 1v1 con estadísticas provisionales **no determina el equilibrio final**. Repetirlo varias veces y luego incorporar un segundo Penitente antes de fijar recompensas de Ecos.

## Decisiones de iniciativa confirmadas (v6.9)

CENIZA enemiga por tipo; una única tirada al inicio; empates por mayor CENIZA, luego nuevas tiradas exclusivamente entre los empatados. Estos puntos ya no necesitan otra votación. **Pendiente solo el valor numérico de CENIZA del Deudor y del resto de tipos enemigos.**
