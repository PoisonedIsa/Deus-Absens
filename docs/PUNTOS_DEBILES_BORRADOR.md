# DEUS ABSENS | Puntos Débiles: reglas acumuladas de balance v5.7

**Estado actual (v5.7):** búsqueda de Puntos Débiles con categoría elegida por el jugador, selección y dificultad fijadas de antemano por el director, prohibición definitiva de nuevos intentos para todo el equipo ante un fallo, y ausencia de críticos en búsquedas **CONFIRMADAS**. Se conservan las reglas de precisión y combate ya aprobadas. Los valores y efectos particulares del bestiario siguen pendientes. **No implementado en el código ni en el JSON del juego.**

## Decisión confirmada
La penalización de un Ataque Preciso depende de la dificultad del Punto Débil del enemigo, no de una penalización universal.

## Decisiones confirmadas

1. La penalización del Ataque Preciso depende del Punto Débil, no es universal.
2. **Cada Punto Débil tiene una resistencia propia expresada en cantidad de impactos precisos acertados.**
3. Cada Ataque Preciso normal que conecte con el Punto Débil elegido suma **un impacto** a su contador.
4. **Un Ataque Preciso crítico que impacta cuenta como dos impactos** contra la resistencia del Punto Débil y **duplica los dados de daño del arma** (por ejemplo, `1d8` pasa a `2d8`), sin duplicar automáticamente modificadores fijos. El crítico se produce con doble 6 natural en 2d6 e impacta automáticamente, según la confirmación v4.2.
5. Los impactos adicionales no se transfieren a otros Puntos Débiles: si uno requiere 1 impacto restante y recibe un crítico preciso, se destruye y el segundo impacto no puede aplicarse a otra parte.
6. Al alcanzar su resistencia requerida, el Punto Débil se considera destruido y deja de acumular impactos.
7. El contador de impactos es individual para cada Punto Débil y se mantiene durante el encuentro.
8. **Todo Ataque Preciso exitoso hace el daño normal del arma a los PV generales del enemigo Y suma impactos al contador del Punto Débil elegido.** No hay que elegir entre causar daño y progresar en la destrucción de la vulnerabilidad. El Blindaje y otros modificadores de daño se resuelven mediante sus reglas habituales; atacar un Punto Débil no los ignora automáticamente.
9. **Cuando el Ataque Preciso sea crítico, se tiran el doble de dados de daño** (con los modificadores fijos sin duplicar automáticamente) y se suman **dos impactos** contra la resistencia del Punto Débil. Este daño también reduce los PV del enemigo.
10. **Los ataques normales** pueden reducir PV generales, pero **no avanzan** los contadores de Puntos Débiles.
11. **El efecto especial de un Punto Débil se activa únicamente cuando queda destruido.** Un impacto previo que no alcance la resistencia causa daño normal a los PV y aumenta el contador, **sin activar efectos parciales**.
12. La destrucción activa el efecto especial asociado a ese Punto Débil **una sola vez por ejemplar de enemigo**. Un Punto Débil ya destruido no vuelve a activar su efecto ni acumula más impactos. Los efectos concretos dependen de la ficha del enemigo y todavía deben diseñarse.
13. **CONFIRMADO, Santa Lucía — Juicio de la Ciega:** su disparo de martirio aporta **tres impactos precisos** al Punto Débil elegido y **duplica los dados de daño** del fusil. La habilidad original es un disparo que impacta automáticamente, por lo que esta adaptación conserva el impacto garantizado del martirio, sin imponer una regla general de impacto automático a otros críticos. Si la resistencia restante es de 1 o 2, el Punto Débil se destruye y no se transfieren impactos sobrantes. Si necesita más de 3 impactos, quedan acumulados los 3. El efecto especial solo se activa cuando quede destruido. **No concede tres ataques separados ni triplica daño.**

**Ejemplo ilustrativo:** un Punto Débil con resistencia de 3 queda en 1/3 tras un Ataque Preciso normal exitoso. Si el siguiente Ataque Preciso es crítico y acierta, suma 2 impactos, lo destruye (3/3) y duplica los dados de daño de ese golpe. Un ataque fallido no suma impactos. Juicio de la Ciega constituye una excepción de tres impactos precisos, no destrucción universal automática.

## Regla confirmada v4.5: tres categorías de dificultad

| Nivel | Penalización del Ataque Preciso | Ejemplo |
|---|---:|---|
| Expuesto | -1 | Articulación accesible |
| Protegido | -2 | Núcleo parcialmente cubierto |
| Sellado | -3 | Sello bajo protección reforzada |

Tirada confirmada: `2d6 + atributo de ataque + otros modificadores - penalización del Punto Débil` contra la **Defensa normal del enemigo**. Si se iguala o supera, el ataque impacta. **CONFIRMADO:** cada impacto preciso resta los PV normales correspondientes al daño efectivo del arma y, simultáneamente, acumula impactos contra el Punto Débil. **CONFIRMADO:** no existen efectos parciales del Punto Débil antes de destruirlo; su efecto especial se activa solo al completar la resistencia. Un ataque normal no incrementa el contador de impactos precisos.

Un Punto Débil debe ser atacable y estar al alcance del arma; los muros y demás condiciones de disparo se aplican como siempre. El objetivo puede tener varios Puntos Débiles de distinta dificultad.

## Probabilidades de ejemplo

Con bonificación de ataque +2 y objetivo Defensa 9:

| Ataque | Umbral natural en 2d6 | Probabilidad de impacto |
|---|---:|---:|
| Normal, sin penalización | 7+ | 21/36 = 58,33 % |
| Expuesto (-1) | 8+ | 15/36 = 41,67 % |
| Protegido (-2) | 9+ | 10/36 = 27,78 % |
| Sellado (-3) | 10+ | 6/36 = 16,67 % |

## Adaptación de pasivas: Longinos y Lucía confirmados

- **San Longinos, Cólera Sangrienta (CONFIRMADO):** cuando esté al 50 % o menos de PV máximos, reduce en 1 la penalización de precisión del Punto Débil, hasta 0, y añade +1d4 a su daño. No puede usar su acción para curarse con vendajes o pociones mientras haya enemigos vivos.
- **Santa Lucía, Mirada Inmaculada (CONFIRMADO):** reduce en **2 puntos la penalización por dificultad del Punto Débil** al realizar un Ataque Preciso, sin dejarla por debajo de 0. Si el punto impone -1 o -2, Lucía no recibe penalización por su dificultad; si impone -3, solo recibe -1. No genera bonificación adicional de +1 o +2.
- **Martirio de Lucía CONFIRMADO:** aporta 3 impactos precisos, duplica los dados de daño del fusil y conserva el impacto automático propio de la habilidad; no destruye automáticamente Puntos Débiles con más resistencia restante.

Las adaptaciones de **Cólera Sangrienta de San Longinos** y **Mirada Inmaculada de Santa Lucía están aprobadas**, aunque todavía **no se ha implementado** en `data/personajes.json` ni en el motor de combate.

## Ejemplo de estructura FUTURA, no integrada

```json
{
  "id": "articulacion_izquierda",
  "nombre": "Articulación izquierda",
  "dificultad": "protegido",
  "penalizacionAtaquePreciso": 2,
  "resistenciaImpactos": 2,
  "efectoAlDestruir": "reduce_movimiento",
  "valorEfecto": 1,
  "efectoSeActiva": "solo_al_destruir",
  "efectoRepetible": false
}
```

### Estado de cada contador en la partida

En el catálogo de enemigos se guardará la **resistenciaImpactos** máxima de cada Punto Débil. Durante un combate, el registro del ejemplar concreto guardará **impactosAcumulados** y **destruido**. Esto evita que el progreso contra un enemigo modifique a todos los de su misma especie.

Resistencias tentativas para pruebas, **no aprobadas**: vulnerabilidad sencilla 1 impacto, reforzada 2, especialmente resistente 3. La resistencia y la penalización son independientes: una parte fácil de acertar puede necesitar varios impactos.

### Pendientes de decisión

1. **RESUELTO:** cada Ataque Preciso exitoso causa daño a los PV generales del enemigo y suma impactos al Punto Débil.
2. **RESUELTO:** Juicio de la Ciega aporta 3 impactos precisos al mismo Punto Débil, duplica los dados de daño y mantiene su impacto garantizado original.
3. ¿Un Punto Débil oculto puede atacarse sin haberse descubierto?
4. **RESUELTO:** doble 6 natural garantiza impacto crítico automático, con independencia de Defensa y penalizaciones.
5. **RESUELTO:** solo hay efecto especial cuando el Punto Débil queda destruido; los impactos previos no generan efectos parciales.
6. ¿Qué resistencias concretas corresponden a cada criatura y jefe?

**No se modifica el código ni el JSON de personajes todavía.** Las reglas de daño a PV, resistencia, crítico preciso, activación del efecto al destruir, adaptación del martirio y pasiva de Santa Lucía están confirmadas en este documento; su implementación queda para el motor de combate.


## Adaptación confirmada: Santa Lucía — Juicio de la Ciega (v3.6)

**Efecto del martirio:** el siguiente disparo del fusil **Ojo de Aguja** de Santa Lucía impacta automáticamente al enemigo elegido y tira **2d12** en vez de **1d12** de daño del fusil, aplicando los modificadores fijos una sola vez salvo regla específica. Además registra **3 impactos precisos** contra un Punto Débil seleccionado del objetivo, no tres disparos independientes. El daño efectivo reduce los PV generales conforme a la regla de Ataques Precisos.

**Ejemplo:** contra un Punto Débil con resistencia 4 e impactos acumulados 0, Juicio de la Ciega inflige daño de 2d12 y deja su contador en 3/4: todavía no se activa el efecto especial. Si el punto tenía 2/4, pasa a 4/4 y se activa una vez; el impacto sobrante se pierde.

**No confundir:** el crítico normal de un Ataque Preciso sigue sumando 2 impactos, mientras que **este martirio específico** suma 3. No se ha decidido todavía el número definitivo de cargas de martirio para Santa Lucía. La formulación de esta regla de balance no introduce recargas por combate; las cargas se rigen por el sistema persistente de expedición ya confirmado.


## Adaptación confirmada: Santa Lucía — Mirada Inmaculada (v3.7)

**Efecto mecánico:** al declarar un Ataque Preciso, Santa Lucía reduce en **2 puntos** la penalización impuesta por la dificultad del Punto Débil, **hasta una penalización mínima de 0**. Esta reducción solo afecta a la penalización de dificultad del Punto Débil; no anula otras penalizaciones independientes, como las condiciones de disparo del fusil *Ojo de Aguja*.

| Penalización del Punto Débil | Penalización efectiva para Lucía |
|---|---|
| -1 (expuesto, categoría propuesta) | 0 |
| -2 (protegido, categoría propuesta) | 0 |
| -3 (sellado, categoría propuesta) | -1 |

**Conserva el coste de su pasiva original:** cada vez que Lucía falle una tirada de ataque, recibe **+1 de Estigma**. Se mantiene la restricción original del fusil: disparar después de moverse impone **-2 adicional**. Estos detalles no se eliminan al reducir la dificultad de un Punto Débil.

Las categorías y penalizaciones -1/-2/-3 **siguen propuestas**, no confirmadas; la regla de reducir en 2, con un mínimo de 0, **sí está confirmada** y funcionará con cualquier dificultad que se apruebe.

**Pendiente:** implementar la pasiva en `data/personajes.json` y en las reglas de resolución de ataque de la web. No se alteran los archivos de personajes en esta entrega.


## Adaptación confirmada: San Longinos — Cólera Sangrienta (v3.8)

**Umbral de activación:** cuando San Longinos tiene **50 % o menos de sus PV máximos**, su pasiva *Cólera Sangrienta* entra en vigor. Para PV enteros, equivale a `PV_actuales <= PV_maximos / 2`. Si se cura y supera ese umbral, la bonificación deja de aplicarse hasta que vuelva a cumplirse la condición.

**Daño adicional:** mientras la pasiva esté activa, cada ataque de Longinos que inflija daño añade **+1d4** a su daño. Este dado adicional se conserva según su descripción original; no modifica por sí mismo la tirada de impacto.

**Ataques Precisos:** mientras la pasiva esté activa, reduce en **1 punto** la penalización debida a la dificultad del Punto Débil, **sin bajar de penalización 0**. No otorga un bonificador positivo ni elimina penalizaciones por otros motivos.

| Penalización por dificultad del Punto Débil | Longinos con la pasiva activa | Longinos con la pasiva inactiva |
|---|---|---|
| -1 (ejemplo) | 0 | -1 |
| -2 (ejemplo) | -1 | -2 |
| -3 (ejemplo) | -2 | -3 |

**Se conserva su restricción original:** mientras haya enemigos vivos, Longinos no puede usar su acción para curarse a sí mismo con vendajes o pociones. Esta restricción no elimina curaciones de otras fuentes, como su martirio *Herida del Costado*, sujeto a sus propias reglas.

**Notas de consistencia:** las dificultades -1/-2/-3 son ejemplos todavía pendientes de aprobación; la reducción de 1 y el +1d4 al 50 % de PV o menos sí están confirmados. El +1d4 es un dado adicional al daño y su interacción general con críticos deberá resolverse al confirmar el alcance de la duplicación de dados. No se modifica el martirio de Longinos en esta actualización.

**Estado de implementación:** regla documentada, no integrada todavía al motor de ataque ni al JSON de personajes.


## Adaptación confirmada: San Longinos — Herida del Costado / Sangrado Sacro (v3.9)

**Martirio:** *Herida del Costado*, conservando lo anteriormente establecido: el ataque impacta automáticamente e ignora el Blindaje. El número de cargas máximas de Longinos sigue siendo **1 por expedición**, recargable únicamente mediante los mecanismos de expedición previamente definidos.

**Estado aplicado:** *Sangrado Sacro* sobre el enemigo alcanzado. **Duración: 3 turnos de ese enemigo**, salvo que el enemigo deje de estar en combate antes.

- **Momento de activación:** al inicio de **cada uno de los siguientes tres turnos del enemigo afectado**, comenzando por su siguiente turno después de aplicar el estado.
- **Daño por activación:** `1d6` PV del enemigo.
- **Curación por activación:** San Longinos recupera `3 PV`, sin superar sus PV máximos.
- **Límite:** tres activaciones como máximo para ese estado (`3d6` de daño total de sangrado y hasta `9 PV` recuperados, si se producen todas).
- **Terminación:** el estado termina después de la tercera activación o si el enemigo sale definitivamente del combate antes de ella. No se obtienen curaciones por activaciones futuras que nunca tengan lugar.
- **Restricción de Cólera Sangrienta:** la prohibición de autocurarse con vendajes o pociones mientras existan enemigos vivos **no impide** la curación que concede este martirio.

**Ejemplo:** se aplica Herida del Costado a un enemigo que sobrevive. En sus próximos tres inicios de turno recibe, respectivamente, las tiradas de `1d6` de Sangrado Sacro. Longinos recupera `3 PV` tras cada activación, hasta un máximo total de `9 PV`, limitado por sus PV máximos. El estado caduca inmediatamente después del tercer inicio de turno afectado.

**Estado de implementación:** documentación confirmada; todavía no actualizada la ficha JSON de Longinos ni el motor de estados del combate.


## Regla confirmada v4.0 — Qué dados se duplican en un crítico

**Decisión definitiva:** al producirse un ataque crítico, **se duplican únicamente los dados base de daño del arma que efectúa el ataque**. Los dados de daño añadidos por habilidades pasivas, estados, reliquias u otros efectos se lanzan **una sola vez**, salvo que una habilidad diga expresamente otra cosa. Los modificadores fijos al daño tampoco se duplican automáticamente.

**Ejemplos de resolución:**

- **San Longinos:** lanza *Gólgota* (`1d10`) mientras su pasiva *Cólera Sangrienta* está activa (`+1d4`). Ataque normal: `1d10 + 1d4`; crítico: **`2d10 + 1d4`**.
- **Santa Lucía:** fusil *Ojo de Aguja* (`1d12`). Crítico: **`2d12`**. Su martirio *Juicio de la Ciega* mantiene su efecto confirmado de impacto garantizado y 3 impactos contra la resistencia de un Punto Débil elegido.
- **Arma que lance 2d6 de base, con bonificación de habilidad de +1d4:** crítico: **`4d6 + 1d4`**.

La regla de Ataques Precisos críticos se mantiene: un crítico suma **2 impactos** al contador del Punto Débil (excepto efectos especiales expresamente confirmados, como los **3 impactos** del martirio de Santa Lucía), causa daño a los PV normales y activa el efecto del Punto Débil **solo al destruirlo**.

**Estado de implementación:** regla documentada y confirmada. No se ha cambiado `data/personajes.json` ni el código del motor de combate.


## Regla confirmada v4.1 — Condición del ataque crítico

**Decisión definitiva:** un ataque obtiene un **crítico al mostrar doble 6 natural en sus 2d6 de ataque** (ambos dados muestran un 6 antes de aplicar atributos, bonificaciones o penalizaciones). Un total modificado de 12, o superar la Defensa por una cantidad determinada, **no** genera por sí mismo un crítico.

- **Frecuencia base:** 1 resultado entre 36 combinaciones posibles de 2d6, es decir, `1/36 ≈ 2,78 %` por tirada sin cambios en los dados.
- **Daño:** se duplican solo los dados base del arma, según la regla v4.0; los dados adicionales y bonificaciones fijas no se duplican.
- **Ataque Preciso crítico:** cuenta como **2 impactos** contra la resistencia del Punto Débil escogido, causa el daño crítico habitual a los PV generales y activa el efecto especial solo si el Punto Débil queda destruido.
- **Excepción especial:** el martirio *Juicio de la Ciega* de Santa Lucía garantiza un impacto crítico y suma **3 impactos precisos**, conservando su descripción específica.

**Decidido en v4.2:** el doble 6 natural garantiza el impacto, sin importar la Defensa ni las penalizaciones a la tirada. El doble 1 natural también quedó definido posteriormente en v4.3: fallo automático y -1 a la siguiente tirada de ataque.

**Estado de implementación:** reglas documentadas; todavía sin cambios en `data/personajes.json` ni en el motor de combate.


## Regla confirmada v4.2 — Doble 6: impacto crítico automático

**Decisión definitiva:** sacar **doble 6 natural** en los 2d6 de ataque garantiza **un impacto crítico automático**, independientemente de la Defensa del objetivo, de la dificultad del Punto Débil y de los modificadores de ataque. Se comprueban las caras naturales de ambos dados **antes de sumar o restar** atributos, bonificaciones y penalizaciones.

**Resolución:**

1. Tirar los 2d6 de ataque y observar el resultado natural.
2. Si ambos muestran `6`, el ataque impacta automáticamente y es crítico. No es necesario alcanzar la Defensa.
3. Tirar **el doble de dados base del arma**, manteniendo sin duplicar dados de daño extra y bonificaciones fijas; aplicar los efectos defensivos de daño que correspondan, incluido el Blindaje, salvo que la habilidad ignore expresamente esa protección.
4. Si se declaró un **Ataque Preciso** y el objetivo tiene un Punto Débil, añadir **2 impactos** al contador de resistencia de ese Punto Débil (con la excepción confirmada de habilidades como *Juicio de la Ciega*, que añade 3). Si llega a su resistencia, el efecto especial se activa una única vez. El daño también reduce los PV generales del enemigo.

**Ejemplo:** un Penitente que ataca un Punto Débil sellado contra un enemigo de Defensa elevada obtiene `6 + 6` naturales. El ataque impacta aunque el modificador de precisión normalmente hubiera impedido alcanzar la Defensa. Cuenta como 2 impactos precisos y causa el daño crítico del arma. **Blindaje y Defensa no son equivalentes:** ignorar la Defensa para acertar no anula el Blindaje que mitiga daño.

**Actualización posterior v4.3:** el `1 + 1` natural es un fallo automático que impone -1 a la siguiente tirada de ataque.

**Implementación:** la regla se incorpora aquí a la documentación; esta actualización no modifica `data/personajes.json`, `data/enemigos.json` ni los módulos JavaScript.


## Regla confirmada v4.3 — Doble 1: fallo automático y penalización al siguiente ataque

**Decisión definitiva:** sacar **doble 1 natural** en los **2d6 de una tirada de ataque** hace que ese ataque **falle automáticamente** aunque los modificadores hubieran permitido alcanzar la Defensa. Además, el atacante recibe **-1 a su siguiente tirada de ataque**. Esto se aplica tanto a Penitentes como a enemigos.

**Procedimiento:**

1. Tirar los 2d6 de ataque y comprobar las caras naturales, antes de sumar atributos o modificadores.
2. Si ambos dados muestran `1`, declarar el ataque fallido: no inflige daño ni añade impactos al contador de un Punto Débil.
3. Registrar **-1 al siguiente ataque** de ese atacante. El penalizador se aplica a la próxima tirada de ataque que efectúe, sea normal o precisa. No modifica Defensa, Blindaje, movimiento ni tiradas de otros tipos.
4. Tras resolver esa siguiente tirada, consumir la penalización. Si esa tirada también muestra doble 1, se produce un nuevo fallo automático y una nueva penalización de -1 para el ataque posterior.

**Ejemplo:** un enemigo obtiene `1+1` naturales al atacar a un Penitente. Aunque tuviera bonificaciones suficientes para superar la Defensa, falla. En su siguiente turno, cuando vuelva a lanzar los 2d6 para atacar, aplicará **-1** al total de esa tirada. Si entonces saca doble 6 natural, este garantiza el crítico de acuerdo con v4.2: los resultados naturales de los dados tienen prioridad sobre los modificadores.

**Aspectos todavía por decidir:** si los efectos de otras habilidades que causen penalizadores de ataque se acumulan entre sí, y cómo trata un eventual módulo de automatización las tiradas hechas por el director. No se introducen penalizaciones extra, pérdida de armas ni consecuencias narrativas obligatorias por doble 1.

**Implementación:** documentación confirmada. No se ha modificado el código ni los JSON del juego.


## Regla confirmada v4.4 — Fórmula general de las tiradas de ataque

**Confirmado:** toda tirada de ataque ordinaria de DEUS ABSENS se resuelve con:

`2d6 + atributo correspondiente + modificadores` **contra la Defensa del objetivo**.

El atributo correspondiente depende del tipo de ataque:

| Tipo de ataque | Atributo |
| --- | --- |
| Cuerpo a cuerpo | **ACERO** |
| Armas a distancia | **CENIZA** |
| Ataques ocultistas | **DOGMA** |

El ataque impacta si el total modificado **iguala o supera** la Defensa; si es inferior, falla. **Las habilidades que indiquen explícitamente otro atributo o que garanticen el impacto conservan su excepción específica.** SANGRE continúa siendo un atributo de vitalidad, no el atributo ofensivo ordinario.

**Secuencia para resolver un ataque ordinario:**

1. Identificar si es ataque cuerpo a cuerpo, a distancia u ocultista; asignar ACERO, CENIZA o DOGMA.
2. Lanzar **2d6**, comprobar los resultados **naturales** antes de interpretar el total:
   - `6+6`: **impacto crítico automático**, independientemente de la Defensa o de las penalizaciones al ataque.
   - `1+1`: **fallo automático**; aplicar `-1` a la siguiente tirada de ataque de ese mismo atacante, consumiéndolo entonces.
3. Si no se dio un resultado natural especial, sumar atributo y modificadores: bonificaciones, penalización por Punto Débil, estados y otros efectos aplicables.
4. Comparar el resultado con la **Defensa**: igual o superior implica impacto.
5. Si impacta, calcular el daño del arma y de las habilidades aplicables; el Blindaje reduce el daño cuando corresponda. En crítico se duplican **solo los dados base del arma**, no los dados extra de habilidades ni los modificadores fijos.
6. Si fue un Ataque Preciso exitoso, además del daño a los PV del enemigo, sumar un impacto al Punto Débil escogido (dos si fue crítico, salvo excepción explícita, como los tres de Juicio de la Ciega). El efecto especial de ese Punto Débil solo ocurre cuando se destruye.

**Ejemplos ilustrativos, sin otras bonificaciones:**
- Espada cuerpo a cuerpo, ACERO +3, dados `4+2`: ataque total **9**. Impacta contra Defensa 9.
- Fusil a distancia, CENIZA +2, dados `3+2`: ataque total **7**. No impacta contra Defensa 9.
- Ritual ofensivo, DOGMA +1, dados `5+3`: ataque total **9**. Impacta contra Defensa 9.

**Alcance de la confirmación:** la selección de atributo y la fórmula ya están fijadas. No se asignan atributos a enemigos específicos ni se modifican todavía `data/personajes.json`, `data/enemigos.json` ni código JavaScript.


## Confirmación oficial v4.5 — Niveles de dificultad de Puntos Débiles

**DECISIÓN CONFIRMADA:** cada Punto Débil de un enemigo utiliza exactamente una de las siguientes categorías de dificultad de precisión:

| Categoría | Penalización de dificultad en Ataques Precisos |
|---|---:|
| **Expuesto** | **-1** |
| **Protegido** | **-2** |
| **Sellado** | **-3** |

La penalización se aplica a la tirada de ataque `2d6 + atributo ofensivo + modificadores` contra la Defensa ordinaria del enemigo. **El tipo de ataque determina el atributo:** ACERO cuerpo a cuerpo, CENIZA distancia, DOGMA ocultista. El doble 6 natural **impacta críticamente de forma automática** incluso con penalización; el doble 1 natural **falla automáticamente** y causa -1 a la siguiente tirada de ataque del atacante.

**Interacciones de pasivas ya aprobadas:**

| Dificultad | Penitente sin bonificación | Longinos con Cólera Sangrienta activa (reduce 1) | Santa Lucía con Mirada Inmaculada (reduce 2) |
|---|---:|---:|---:|
| Expuesto | -1 | 0 | 0 |
| Protegido | -2 | -1 | 0 |
| Sellado | -3 | -2 | -1 |

Las reducciones **no pueden transformarse en modificadores positivos**. La pasiva de Lucía no elimina otras penalizaciones, como disparar con *Ojo de Aguja* después de moverse. Longinos recibe su reducción únicamente cuando tiene **50 % o menos de sus PV máximos**, y conserva +1d4 a su daño durante ese estado.

**Esta decisión no cambia la resistencia a impactos:** el número de Ataques Precisos exitosos necesarios para destruir cada Punto Débil se definirá **por separado** en la ficha de cada enemigo. Cada impacto preciso exitoso reduce los PV generales normalmente y registra 1 impacto sobre el Punto Débil; un crítico preciso registra 2, mientras que *Juicio de la Ciega* registra 3. El efecto especial solo se activa una vez cuando el Punto Débil quede destruido.

**Pendientes sin alterar:** valores de resistencia específicos de cada Punto Débil, efectos de destrucción de cada enemigo, posibilidad de apuntar a Puntos Débiles ocultos y programación del motor de combate.

**Entrega v4.5:** documentación únicamente; no se han modificado archivos JSON, HTML, CSS ni JavaScript.


## Confirmación oficial v4.6 — Visibilidad de Puntos Débiles

**DECISIÓN CONFIRMADA:** los **Puntos Débiles ocultos deben descubrirse antes de poder recibir Ataques Precisos**. Mientras permanezcan ocultos, los jugadores no pueden elegirlos como objetivo de un Ataque Preciso, incluso si saben que el enemigo podría tener vulnerabilidades. No se permiten Ataques Precisos «a ciegas» contra esos Puntos Débiles.

**Estados de visibilidad y destrucción:**

- **Oculto:** no puede recibir Ataques Precisos dirigidos. El enemigo puede seguir recibiendo ataques normales conforme a las reglas generales.
- **Revelado:** puede seleccionarse para un Ataque Preciso. Conserva su nivel de dificultad propio (Expuesto -1, Protegido -2 o Sellado -3) y su contador de resistencia a impactos precisos.
- **Destruido:** alcanzó su resistencia a impactos y activó el efecto especial correspondiente **una única vez**.

La **visibilidad**, la **dificultad de precisión** y la **resistencia en impactos** son propiedades independientes. Por ejemplo, un Punto Débil inicialmente oculto puede ser Expuesto (-1) y requerir tres impactos tras revelarse; un Punto Débil inicialmente visible puede ser Sellado (-3) y requerir uno. La condición «Sellado» no significa necesariamente «oculto».

**Formas de descubrimiento compatibles con el diseño:** pistas narrativas y descubrimientos otorgados por el director, observación o habilidades que expresamente revelen vulnerabilidades. **El procedimiento mecánico específico** (tirada, atributo, coste en acciones, dificultad, alcance, permanencia de la revelación) **queda pendiente de confirmar**. Esta versión no introduce pruebas automáticas ni costes nuevos.

**Interacciones conservadas:**

- Las ventajas de precisión de Santa Lucía y San Longinos reducen la penalización por dificultad **solo cuando el Punto Débil puede ser atacado**; no revelan Puntos Débiles ocultos por sí solas.
- Un Ataque Preciso exitoso causa daño a los PV generales y aumenta el contador de resistencia. Un crítico natural de doble 6 impacta automáticamente, duplica solamente los dados base del arma y cuenta como 2 impactos precisos.
- El martirio *Juicio de la Ciega* de Santa Lucía cuenta como 3 impactos precisos sobre un Punto Débil objetivo y duplica los dados base del fusil; **todavía no se ha establecido que revele vulnerabilidades ocultas**.
- El efecto del Punto Débil se aplica solamente al destruirlo y una sola vez por instancia de enemigo.

**Pendientes:** cómo se descubre mecánicamente un Punto Débil oculto; si el descubrimiento se comparte con todo el grupo y cuánto dura; atributos y acciones necesarios para buscar; fichas particulares del bestiario.

**Entrega v4.6:** actualización documental únicamente. No modifica JSON ni el motor JavaScript.


## Confirmación oficial v4.7 — Descubrimiento mixto de Puntos Débiles ocultos

**DECISIÓN CONFIRMADA:** el descubrimiento de Puntos Débiles ocultos funciona mediante un **sistema mixto** con dos vías válidas:

1. **Revelación narrativa por el director:** el director puede mostrar uno o varios Puntos Débiles ocultos a través de pistas, acontecimientos narrativos, consecuencias de acciones o habilidades que revelen vulnerabilidades, sin exigir una tirada de búsqueda por defecto.
2. **Búsqueda activa por un jugador:** un Penitente puede declarar una **acción de búsqueda** y realizar una **tirada** para intentar descubrir un Punto Débil oculto. La mecánica exacta de esa tirada se definirá después.

**No son métodos excluyentes:** el director no está obligado a esperar la búsqueda del jugador, ni el jugador depende exclusivamente de pistas narrativas.

**Al descubrirse**, el Punto Débil pasa de `oculto` a `revelado`, por lo que puede recibir Ataques Precisos y conserva sin cambios su penalización según dificultad (Expuesto -1, Protegido -2, Sellado -3), su resistencia en impactos, su efecto de destrucción y el progreso acumulado si existiera. **Mientras permanezca oculto, no puede ser objetivo de Ataques Precisos.**

**Queda expresamente por decidir** antes de programar esta parte:
- Si la acción de búsqueda consume la **acción principal** del turno o usa otro coste.
- Qué atributo se usa en la tirada y contra qué umbral, y si varía según el enemigo o Punto Débil.
- Si una búsqueda puede detectar varios puntos o solo uno, y cómo se resuelve el fracaso.
- Si los Puntos Débiles descubiertos quedan revelados para todo el grupo y durante cuánto tiempo.
- Si hay límites de distancia, línea de visión o condiciones especiales.

**No se presume** que Mirada Inmaculada, Cólera Sangrienta o Juicio de la Ciega descubran automáticamente vulnerabilidades ocultas: sus efectos confirmados se mantienen.

**Entrega v4.7:** documentación acumulativa únicamente; no modifica el JSON, HTML, CSS ni JavaScript.


## Confirmación oficial v4.8 — Atributos para buscar Puntos Débiles ocultos

**DECISIÓN CONFIRMADA:** en el sistema mixto de descubrimiento, la tirada de búsqueda activa utiliza el atributo correspondiente a la naturaleza del Punto Débil:

- **Punto Débil físico → CENIZA:** permite buscar articulaciones, aberturas, mecanismos u otras vulnerabilidades materiales.
- **Punto Débil sobrenatural → DOGMA:** permite buscar sellos, vínculos ocultistas y otras vulnerabilidades de origen sobrenatural.

**Esquema de resolución de búsqueda:** `2d6 + CENIZA` para puntos físicos y `2d6 + DOGMA` para puntos sobrenaturales, comparados con una **dificultad de búsqueda todavía no confirmada**. Esto es una propuesta de fórmula coherente con la base 2d6, NO la aprobación de un umbral específico.

El director sigue pudiendo revelar narrativamente un Punto Débil sin tirada. Las bonificaciones de precisión de Santa Lucía y San Longinos NO se aplican automáticamente a la búsqueda: modifican Ataques Precisos contra puntos previamente revelados, no pruebas de búsqueda.

**Pendiente de decisión:** umbrales para búsquedas, si la búsqueda consume la acción principal, distancia/visibilidad, si revelar uno informa a todo el grupo, duración de la revelación y criterios ante resultados fallidos. La dificultad Expuesto (-1), Protegido (-2), Sellado (-3) se refiere a **impactar**, no a descubrir; no debe confundirse con la dificultad de búsqueda.

**Entrega v4.8:** solo documentación acumulada. Sin modificaciones en JSON o código.


## Confirmación oficial v4.9 — Coste de buscar Puntos Débiles ocultos

**DECISIÓN CONFIRMADA:** buscar activamente un Punto Débil oculto **consume la acción principal del turno del Penitente**.

- El Penitente puede usar sus puntos de **movimiento** disponibles durante ese turno y efectuar la búsqueda como su **acción principal**.
- Después de declarar la búsqueda, no puede efectuar un ataque normal, un Ataque Preciso, activar un objeto u otra habilidad que también requiera la acción principal **en el mismo turno**, salvo una excepción explícita de una habilidad u objeto.
- La búsqueda exige una **tirada** que utiliza **CENIZA** para un Punto Débil físico o **DOGMA** para uno sobrenatural. El **umbral numérico y la fórmula definitiva de la tirada** permanecen pendientes.
- Una **revelación narrativa del director** no obliga por sí misma a gastar la acción principal de ningún jugador ni requiere necesariamente una tirada.
- Un Punto Débil oculto **no** puede recibir Ataques Precisos hasta ser revelado. Al revelarse, conserva su dificultad Expuesto (-1), Protegido (-2) o Sellado (-3), su resistencia en impactos y su efecto al destruirse.

**Decisiones aún pendientes:** dificultad y resultado de la búsqueda, alcance y línea de visión, número de puntos detectables, duración de la revelación, si la información se comparte con todo el equipo. No se confunde la dificultad de búsqueda con la penalización para acertar un Ataque Preciso.

**Entrega v4.9:** solo documentación acumulada; no se modifican `data/personajes.json`, `data/enemigos.json`, HTML, CSS ni JavaScript.


## Confirmación oficial v5.0 — Dificultad de búsqueda individual para cada Punto Débil

**DECISIÓN CONFIRMADA:** cada Punto Débil oculto tendrá un **valor numérico propio de dificultad de búsqueda**, definido en la ficha del enemigo. No se utiliza una dificultad universal ni una tirada improvisada obligatoriamente por el director.

**Tirada de búsqueda activa confirmada:**

- **Vulnerabilidad física:** `2d6 + CENIZA` contra la `dificultad_busqueda` del Punto Débil.
- **Vulnerabilidad sobrenatural:** `2d6 + DOGMA` contra la `dificultad_busqueda` del Punto Débil.
- **Resultado:** si el total es **igual o superior** a la dificultad individual, la búsqueda tiene éxito y permite revelar el Punto Débil seleccionado conforme al sistema mixto.
- **Coste:** una acción principal del Penitente. El movimiento del turno sigue disponible.
- **Alternativa:** el director también puede revelar una vulnerabilidad mediante pistas o acontecimientos narrativos sin exigir tirada ni consumir por defecto la acción principal de los jugadores.

**Tres propiedades independientes en la futura ficha de cada Punto Débil:**

1. `dificultad_busqueda`: número objetivo para detectar el Punto Débil oculto con 2d6 + atributo correspondiente; **valor por definir enemigo por enemigo**.
2. `dificultad_precision`: categoría **Expuesto (-1)**, **Protegido (-2)** o **Sellado (-3)**, aplicada solamente cuando se intenta impactar mediante un Ataque Preciso una vez revelado.
3. `resistencia_impactos`: número de impactos precisos acertados necesarios para destruirlo. Un crítico preciso aporta dos impactos y *Juicio de la Ciega* aporta tres.

La visibilidad (`oculto`/`revelado`/`destruido`) y la naturaleza (`fisico`/`sobrenatural`) también se registrarán por Punto Débil. No se deduce la dificultad de búsqueda de su categoría de precisión ni de su resistencia.

**Ejemplo ilustrativo, NO es ficha oficial de ningún enemigo:** un Punto Débil físico oculto podría tener dificultad de búsqueda **10**, categoría **Expuesto (-1)** y resistencia **2** impactos. Un Penitente con CENIZA +2 que obtiene 4+4 en los 2d6 suma 10 y lo descubre. En otro turno, ya revelado, podría atacarlo con -1 por la categoría Expuesto.

**Aún pendientes:** hasta qué distancia se puede buscar, condiciones de visión, si una acción puede buscar más de un Punto Débil y los efectos secundarios de fallar una búsqueda. También falta fijar los valores numéricos concretos al crear el bestiario.

**Entrega v5.0:** documentación acumulada únicamente. No se ha modificado código JavaScript ni archivos JSON del juego.


---

## Actualización v5.1: descubrimiento compartido permanente durante el combate (CONFIRMADO)

Cuando **cualquier Penitente** descubre por una búsqueda exitosa un Punto Débil oculto de un enemigo, ese Punto Débil pasa inmediatamente de **oculto** a **revelado para todo el equipo**. Se mantiene revelado **hasta el final del combate**, o hasta quedar destruido. No se necesita que cada aliado gaste su propia acción principal ni repita la tirada.

- Todos los Penitentes pueden declarar Ataques Precisos contra ese Punto Débil revelado desde que se descubre, respetando sus propios turnos, alcance, visión y las demás reglas de ataque.
- El director también puede descubrirlo narrativamente; esa revelación es igualmente compartida por todo el equipo durante el combate.
- La revelación corresponde a un **Punto Débil concreto de un ejemplar concreto de enemigo**. Si hay dos enemigos idénticos, descubrir el núcleo de uno no revela automáticamente el núcleo del otro.
- La revelación **no** cambia su dificultad de precisión (Expuesto -1, Protegido -2, Sellado -3), su resistencia de impactos ni la dificultad numérica de búsqueda.
- El Punto Débil se destruye al alcanzar su resistencia acumulada; su efecto especial se activa **solo una vez, al destruirse**, y la progresión de daño funciona según las reglas anteriores.
- La visibilidad revelada termina al finalizar el combate; esta regla no concede un desbloqueo permanente de campaña.

**Por definir aún:** alcance y condiciones de visión para la acción de búsqueda, si una búsqueda permite examinar varios Puntos Débiles, consecuencias de fallar, y dificultades individuales concretas del bestiario.

**Entrega v5.1:** solo documentación acumulativa; el JSON y el código de combate no se modifican.


---

## Actualización v5.2: búsqueda sin límite de distancia con línea de visión (CONFIRMADO)

**DECISIÓN CONFIRMADA:** un Penitente puede realizar una **búsqueda activa de Puntos Débiles ocultos de cualquier enemigo visible, sin límite de distancia en casillas**, siempre que exista **línea de visión** entre el Penitente y ese enemigo.

- No se requiere estar adyacente ni dentro del alcance de un arma para **buscar**; el alcance de ataques se aplica al **atacar** un Punto Débil ya revelado, no a la búsqueda.
- Si no existe línea de visión, **no es posible efectuar la búsqueda activa** sobre ese enemigo desde esa posición. El director conserva su facultad de revelar vulnerabilidades mediante acontecimientos o pistas narrativas.
- La búsqueda **consume la acción principal**. El movimiento del turno sigue disponible, por lo que el Penitente puede desplazarse para establecer línea de visión y después buscar.
- Se resuelve con **2d6 + CENIZA** para un Punto Débil físico, o **2d6 + DOGMA** para uno sobrenatural, contra la dificultad de búsqueda numérica **propia del Punto Débil** indicada en la ficha del enemigo. Igualar o superar la dificultad revela la vulnerabilidad.
- Una revelación, sea por búsqueda o por el director, se **comparte con todo el equipo** hasta el fin del combate. Cada ejemplar de enemigo mantiene sus propios Puntos Débiles y sus contadores separados.
- La visibilidad (oculto/revelado), la penalización de precisión (Expuesto -1 / Protegido -2 / Sellado -3), la dificultad de búsqueda y la resistencia en impactos son características distintas.

**Pendiente de definir:** la convención exacta para trazar una línea entre casillas en el tablero físico (incluyendo esquinas y límites de celda), si una sola búsqueda puede revelar varios Puntos Débiles o solo uno, qué pasa cuando falla la búsqueda, y los valores individuales de los enemigos. No se incorpora cálculo automático de rutas.

**Entrega v5.2:** documentación acumulativa únicamente; no hay modificaciones al JSON, JavaScript ni otros archivos del juego.

## Actualización v5.3: obstáculos y línea de visión (CONFIRMADO)

**DECISIÓN CONFIRMADA:** los **muros y obstáculos completamente opacos** interpuestos entre el Penitente y el enemigo **bloquean la línea de visión** necesaria para buscar activamente un Punto Débil oculto. Los **obstáculos bajos no bloquean la línea de visión**; pueden ofrecer cobertura para ataques según las reglas de combate aplicables, pero no impiden por sí mismos la búsqueda.

- La búsqueda sigue permitida contra **cualquier enemigo visible**, **sin límite de distancia**, si hay línea de visión. El alcance del arma equipada no condiciona la búsqueda.
- Un muro o elemento completamente opaco bloquea la búsqueda cuando se interpone en la línea de visión. El Penitente puede **moverse para conseguir línea de visión** y luego gastar su acción principal en buscar, si tiene movimiento disponible.
- Un obstáculo **bajo** entre ambos no impide observar al objetivo ni buscar sus Puntos Débiles. No elimina otras reglas de terreno o cobertura del combate.
- Un elemento alto que **no sea completamente opaco** necesita una indicación concreta del escenario o del director: no se asume automáticamente que impida ver.
- El director todavía puede **revelar** Puntos Débiles mediante pistas narrativas, incluso cuando los jugadores no puedan realizar una búsqueda activa desde su posición.
- La tirada de búsqueda es **2d6 + CENIZA** para vulnerabilidades físicas o **2d6 + DOGMA** para sobrenaturales, contra la dificultad numérica individual de ese Punto Débil. Consume la **acción principal**. Una revelación exitosa se comparte con todo el equipo hasta el final del combate, por cada ejemplar de enemigo.
- **No se implementa cálculo automático de rutas.**

**Aún pendientes:** convención de trazado en casillas (esquinas y contactos de borde), cuántos Puntos Débiles se buscan con una acción, consecuencias de una búsqueda fallida y números específicos de cada enemigo.

**Entrega v5.3:** documentación acumulativa; sin cambios en el JavaScript, JSON o fichas existentes.


---

## Actualización v5.4: cantidad revelada por búsqueda (CONFIRMADO)

**Regla oficial:** cada búsqueda activa exitosa revela **exactamente un (1) Punto Débil oculto** del enemigo examinado. No revela los demás puntos ocultos de esa misma criatura.

- Consume la **acción principal**; el movimiento sigue disponible.
- Requiere línea de visión, sin límite de distancia. Muros y obstáculos completamente opacos bloquean visión; obstáculos bajos no.
- Tirada: **2d6 + CENIZA** para vulnerabilidades físicas o **2d6 + DOGMA** para sobrenaturales, contra la dificultad numérica propia del Punto Débil (éxito al igualar o superar).
- El punto revelado queda visible **para todo el equipo hasta terminar el combate**. Mantiene su penalización de precisión Expuesto -1 / Protegido -2 / Sellado -3 y su resistencia independiente medida en impactos.
- Los puntos todavía ocultos necesitan otras búsquedas exitosas o revelación narrativa del director.
- Se registra **por ejemplar de enemigo**: descubrir un punto de una criatura no revela el de otra copia.
- El director puede revelar vulnerabilidades mediante pistas narrativas sin tirada.

**Ejemplo ilustrativo:** si un jefe tiene tres Puntos Débiles ocultos, una búsqueda exitosa revela uno; dos continúan ocultos.

**Pendientes:** cómo se elige cuál Punto Débil se busca cuando hay varios, consecuencias de una búsqueda fallida y trazado de visión en bordes/esquinas.

**Entrega v5.4:** actualización solo de documentación; no modifica código ni JSON. Esta sección resuelve el pendiente anterior sobre cantidad revelada por búsqueda.


---

## Actualización v5.5: selección del Punto Débil descubierto (CONFIRMADO)

**Regla oficial:** cuando una búsqueda activa de vulnerabilidades ocultas obtiene un resultado exitoso, **el director determina cuál de los Puntos Débiles que continúan ocultos en ese ejemplar de enemigo se revela**. El jugador no elige automáticamente la vulnerabilidad descubierta, ni se elige por sorteo ni por orden ascendente de dificultad.

- Una búsqueda exitosa revela **un solo Punto Débil**; el resto permanece oculto. El director también puede revelar Puntos Débiles mediante pistas narrativas sin tirada.
- El descubrimiento se comparte con **todos los Penitentes** durante el resto del combate, solo para ese ejemplar del enemigo.
- La búsqueda consume la **acción principal**, conserva el movimiento y exige línea de visión, sin límite de distancia. Muros y obstáculos completamente opacos bloquean la visión; obstáculos bajos no.
- La búsqueda física utiliza **2d6 + CENIZA**; la sobrenatural utiliza **2d6 + DOGMA**, frente a la **dificultad numérica individual** del Punto Débil correspondiente.
- Una vez revelado, el Punto Débil conserva su dificultad para Ataques Precisos (**Expuesto -1, Protegido -2 o Sellado -3**) y su resistencia propia en impactos.
- **Importante, aún sin decidir:** cuando un enemigo presenta varias vulnerabilidades ocultas de dificultades distintas, está pendiente precisar el procedimiento de selección de la vulnerabilidad objetivo y de su dificultad **antes de resolver la tirada**. El director decide qué punto se descubre, pero esta confirmación no autoriza cambiar retroactivamente la dificultad para hacer que un fallo sea un éxito, o viceversa.
- Continúan pendientes las consecuencias de una tirada de búsqueda fallida y el trazado exacto de línea de visión en esquinas de casillas.

**Entrega v5.5:** solo reglas documentadas; no se alteran fichas, JavaScript ni JSON del juego.

---

## Actualización v5.6: resolución de búsquedas, fallos y dados (TRES DECISIONES CONFIRMADAS)

Esta sección **complementa y resuelve los puntos pendientes** de las secciones v5.4 y v5.5; las referencias históricas a asuntos «pendientes» en esas versiones no prevalecen sobre lo confirmado aquí.

### 1. Categoría declarada por el jugador; selección secreta previa por el director

1. El jugador declara qué tipo de Punto Débil oculto busca en un **enemigo concreto y visible**: **físico** o **sobrenatural**. No identifica de antemano el Punto Débil específico.
2. **Antes de lanzar los dados**, el director escoge en secreto **un único Punto Débil todavía oculto** de la categoría declarada en **ese ejemplar del enemigo** y utiliza la **dificultad numérica de búsqueda de ese mismo Punto Débil**, ya indicada en su ficha. Una vez fijada, la dificultad **no puede cambiarse tras conocer el resultado**.
3. El jugador gasta su **acción principal** y realiza la comprobación: `2d6 + CENIZA` para categoría física, o `2d6 + DOGMA` para categoría sobrenatural.
4. Si el total **iguala o supera** la dificultad elegida antes de la tirada, el director revela ese **único** Punto Débil. Se comparte con todo el equipo hasta acabar el combate. Los demás Puntos Débiles siguen ocultos.
5. La búsqueda requiere **línea de visión** con el enemigo, sin límite de distancia en el tablero. Muros y obstáculos completamente opacos bloquean la visión; los obstáculos bajos no. El movimiento sigue disponible, aunque la acción principal se consuma.

### 2. Fallo: bloqueo definitivo del mismo Punto Débil para todo el equipo (actualizado en v5.7)

- Si la búsqueda falla, la acción principal se considera gastada y **no se descubre** el Punto Débil elegido en secreto.
- **Ese mismo Punto Débil ya no puede ser objeto de ninguna búsqueda activa durante el resto del combate, por ningún Penitente del equipo.** Esta prohibición es absoluta: **no existen excepciones por cambios de circunstancias**.
- El director lleva el registro de búsqueda fallida **por Punto Débil y por ejemplar de enemigo, compartido por todo el equipo**. No necesita revelar la identidad ni dificultad del punto fallado.
- Los demás Puntos Débiles ocultos de la categoría, que no hayan sido objeto de búsqueda fallida, pueden seguir buscándose. El director solo puede seleccionar objetivos ocultos y aún elegibles.
- Si no queda ningún Punto Débil elegible en la categoría declarada, no se realiza tirada de búsqueda contra esa categoría. El director puede comunicar que no es posible obtener nuevos descubrimientos por ese procedimiento, sin revelar cuáles eran los puntos.
- La prohibición afecta **solo a nuevos intentos de búsqueda activa**: se conserva la facultad del director de revelar narrativamente una vulnerabilidad mediante acontecimientos o pistas, conforme al sistema mixto previamente confirmado.

### 3. Dobles 6 y dobles 1: sin efectos especiales en búsquedas

- En una tirada de **búsqueda**, los resultados naturales `6+6` y `1+1` **no activan** impactos críticos, fallos críticos ni descubrimientos automáticos.
- Ambos se resuelven **exactamente igual que cualquier otra tirada de búsqueda**: se suma el atributo correspondiente (`CENIZA` o `DOGMA`) y se compara el total con la dificultad individual prefijada.
- Los efectos previamente confirmados de `6+6` (impacto crítico automático) y `1+1` (fallo automático y -1 al siguiente ataque) siguen correspondiendo a las **tiradas de ataque**, no a las búsquedas.

### Ejemplo ilustrativo, sin fijar estadísticas de bestiario

Un enemigo tiene dos Puntos Débiles físicos ocultos con dificultades de búsqueda 9 y 11 (solo a modo de ejemplo). El jugador declara «busco uno físico». **Antes** de tirar, el director elige en secreto el de dificultad 11. El Penitente obtiene `2d6 = 7` y tiene `CENIZA +2`: total 9, por debajo de 11. La búsqueda falla, se gasta la acción principal y **el Punto Débil seleccionado de dificultad 11 ya no puede volver a buscarse por ningún miembro del equipo durante este combate, sin excepciones**. El otro Punto Débil físico (dificultad 9) continúa siendo un objetivo posible de búsquedas futuras, aunque el director lo seleccione de forma secreta antes de cada tirada.

**Estado de la entrega v5.6:** una única actualización documental acumulativa de tres decisiones. No se cambian `data/*.json`, `assets/js/*` ni ninguna mecánica ejecutable; no se añade navegación ni cálculo de rutas.


---

## Actualización v5.7: tres decisiones sobre reintentos, alcance del bloqueo y esquinas (CONFIRMADAS)

Estas decisiones **sustituyen expresamente** cualquier regla histórica sobre reintentos «si cambian las circunstancias». Se aplican durante todo el encuentro al ejemplar concreto de enemigo.

### A. Búsqueda fallida: no se puede repetir

Si una búsqueda activa falla, el Punto Débil secreto que el director había escogido queda **inhabilitado para nuevos intentos de búsqueda durante ese combate**. Ni mover al personaje, ni cambiar de equipo, ni obtener nuevas pistas, ni alterar las circunstancias permite repetir esa búsqueda. Se conserva el coste de la acción principal gastada.

### B. El bloqueo afecta a todo el equipo

La prohibición se comparte entre **todos los Penitentes**, no solo quien falló. El director registra, para cada *ejemplar de enemigo*, qué Puntos Débiles todavía ocultos están disponibles para una búsqueda y cuáles han sido bloqueados por un intento fallido. Se puede buscar otro Punto Débil aún elegible. Un Punto Débil bloqueado no se selecciona como objetivo secreto de otra tirada de búsqueda. Si no hay puntos elegibles de la categoría declarada, no se hace una tirada vacía. La **revelación narrativa por parte del director** se mantiene como vía distinta a las búsquedas activas.

### C. Línea de visión simplificada para esquinas

Para comprobar si un enemigo es visible en el tablero físico, se imagina o dibuja **una línea recta desde el centro de la casilla del Penitente hasta el centro de la casilla del enemigo**:

- Si la línea pasa por el **interior** de una casilla con **muro u obstáculo totalmente opaco**, la visión está bloqueada.
- Si atraviesa una casilla vacía o con **obstáculo bajo**, la visión se conserva.
- **Rozar exactamente el borde o la esquina** de una casilla opaca **no bloquea** la visión. No se aplican reglas extras de esquinas ni de adyacencia.

Esta regla solo evalúa **línea de visión**; no determina rutas, movimiento ni automáticamente reglas de cobertura. No se programará cálculo de caminos.

### Resumen práctico (tres decisiones de este lote)

1. **Reintentos tras fallar:** ninguno para ese Punto Débil en ese combate, sin excepciones por circunstancias.
2. **Quién queda bloqueado:** el equipo completo.
3. **Visión por esquinas:** recta entre centros; bloquea únicamente el interior de una casilla opaca, no un contacto exacto con su esquina o borde.

**Estado de la entrega v5.7:** actualización de documentación acumulativa. No se han modificado los personajes, enemigos, JSON ni el motor JavaScript del juego.
