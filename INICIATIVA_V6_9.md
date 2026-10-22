# DEUS ABSENS · Iniciativa v6.9 · Regla definitiva y herramienta de prueba

## Regla confirmada

1. **Al comenzar cada combate**, todos los combatientes presentes tiran **2d6 + CENIZA** de manera individual.
2. Se ordenan los resultados **de mayor a menor**. El orden resultante se conserva **todas las rondas** de ese combate. Se vuelve a tirar la iniciativa general únicamente al comenzar un **combate nuevo**.
3. En caso de **empate de total**, actúa primero quien tenga **CENIZA mayor**.
4. Si persiste el empate (mismo total y misma CENIZA), **solo los empatados** repiten `2d6+CENIZA` para decidir su orden relativo. Si hay más de dos empatados, se repite entre los que sigan empatados tras cada tirada. Los demás conservan su lugar.
5. Cada **tipo de enemigo** recibe un valor propio de CENIZA de iniciativa, separado de `movement` y de los `attackBonus` de sus ataques. **No se le añaden** ACERO, SANGRE o DOGMA.
6. La iniciativa no automatiza acciones, objetivos, ataques ni movimiento. El director sigue decidiendo todo lo que hacen sus enemigos.

### Diferencia entre tres valores

| Dato del enemigo | Para qué sirve | Estado |
|---|---|---|
| `ceniza` | Bonificación a su `2d6` de iniciativa | Campo nuevo `null`, cifras por aprobar |
| `movement` | Casillas/puntos de movimiento | Provisional en bestiario, **no determina CENIZA** |
| `attacks[].attackBonus` | Modificador del ataque indicado en su propia ficha | Provisional, **no determina CENIZA** |

No se asigna +0 automáticamente a ningún enemigo. Si no hay CENIZA numérica aprobada, el director debe **declarar y anotar una CENIZA temporal de ensayo** antes de tirar; el formulario no deja efectuar tiradas con ese dato vacío.

## Uso de la herramienta

- Desde la web: **Mesa del director → Abrir tablero de iniciativa**. También puede abrirse la página independiente `herramientas/iniciativa.html` sin conexión.
- Agrega Penitentes y enemigos, con sus nombres y valores de CENIZA. Si varias copias del mismo tipo de enemigo aparecen con el mismo nombre, la herramienta exige usar la misma CENIZA.
- **Dados físicos:** introduce los dos dados de cada combatiente y pulsa «Calcular con dados físicos».
- **Dados virtuales:** pulsa «Tirar 2d6 para todos». Se anotan dados, total y eventuales desempates.
- El sistema muestra los empates de igual resultado e igual CENIZA y permite resolverlos con dados físicos o virtuales. **En ningún caso cambia las tiradas ajenas al empate**.
- Usa «Siguiente ronda» para avanzar el contador **sin alterar el orden**.
- Usa «Nueva batalla» para limpiar resultados y reutilizar combatientes, o «Vaciar mesa» para comenzar desde cero.
- «Cargar combate piloto» prepara a Longinos con CENIZA +1 y al Deudor de Sal con CENIZA **vacía**. El +1 de Longinos corresponde al reparto de prueba, no es permanente.

**Persistencia:** este tablero no escribe en `deusAbsensState`, no modifica fichas selladas, JSON ni códigos de Legado; **no** sincroniza con otros navegadores y las entradas de la sesión de herramienta se pierden si se recarga la página. Es intencional para no modificar la campaña mientras probamos la iniciativa.

## Ejemplos inequívocos de desempate

- A: `2d6=8, CENIZA +2 → total 10`. B: `2d6=9, CENIZA +1 → total 10`. **Actúa primero A**, aunque haya tirado menor suma natural; no repiten.
- A: `2d6=7, CENIZA +1 → 8`. B: `2d6=7, CENIZA +1 → 8`. **Repiten A y B**; los demás no tiran otra vez.
- Si A, B y C tienen mismos total y CENIZA y en desempate tiran 4, 9 y 9, queda B/C delante de A; **solo B y C** repiten para definir cuál va primero.

## Aún NO definido

- Cifras definitivas de CENIZA de los seis tipos de enemigo: `data/enemigos.json` conserva `null` en todos. Deben determinarse al equilibrar el bestiario.
- Incorporación de personajes que entran en un combate ya iniciado: todavía no se ha fijado mecánica de inserción en orden. La herramienta está pensada para los combatientes presentes al inicio.
- Resolución de combate automática, turnos, puntos débiles y reparto automático de Ecos: fuera del alcance de esta herramienta de iniciativa.

## Archivos de la actualización para GitHub

`index.html`, `herramientas/iniciativa.html`, `data/enemigos.json` (solo campo `ceniza: null`), `docs/DECISIONES_CONFIRMADAS.md`, `docs/REGLAS_VIGENTES_V6_9.md`, `docs/COMBATE_PILOTO_01.md`, `docs/REGISTRO_COMBATE_PILOTO_01.md` y este documento.
