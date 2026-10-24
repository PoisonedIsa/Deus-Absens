# Ecos y cierre de expedición · reglas aprobadas v8.0

## Participación

- Ecos **individuales**, nunca repartidos ni globales. Cada jugador que haya impactado una instancia enemiga al menos una vez gana la recompensa BASE completa de ese enemigo cuando es derrotado, aunque su Blindaje absorbiera todo el daño del impacto.
- Cuenta cualquier impacto directo automático, las tres áreas aprobadas de Erasmo/Judas/Juana sobre sus enemigos elegidos y cada ataque ACERTADO de los espectros pasivos o de martirio de Judas (atribuido a Judas). No cuentan por sí solos los ticks posteriores de Sangrado Sacro de Longinos ni el reflejo de Magdalena.
- La elegibilidad no se pierde por estar a 0 PV cuando el enemigo muere.
- La recompensa se acredita INMEDIATAMENTE al morir ese enemigo, y queda disponible en el saldo de expedición actual. Director verifica la participación; no hay IA ni reparto automático.
- San Lorenzo obtiene `floor(1.25 × recompensa_base_del_enemigo)` **por cada enemigo** para el que sea elegible. La bonificación solo afecta a él. Los demás participantes obtienen la base entera.

## Saldos y gastos

- `ecos.expedition` es lo ganado y aún no gastado en la expedición actual. `ecos.reserve` es la reserva personal acumulada antes.
- Durante la expedición únicamente se puede gastar `ecos.expedition` cuando la habilidad autoriza. Lorenzo usa 10 Ecos de ese saldo por activación de Comprar la Indulgencia, además de una de sus 2 cargas. Máximo una reacción por ronda.
- La pasiva de Lorenzo añade al daño de cada impacto directo propio `min(4, floor(ecos.expedition/25))`; los gastos cambian el bono inmediatamente.
- La reserva `ecos.reserve` **solo** sirve entre expediciones para mejoras, reliquias y desbloqueos personales, una vez sus precios hayan sido aprobados. No hay precios oficiales ni compras automáticas todavía. Los desbloqueos narrativos del director son compartidos y separados de las compras.

## Cierre

Al finalizar cualquier expedición, completada o fallida, se transfiere a la reserva:

```
conservados = floor(0.60 * ecos.expedition)
ecos.reserve += conservados
ecos.expedition = 0
```

- Los Ecos gastados ya se han descontado antes del cálculo. La reserva anterior no se reduce.
- Cerrar una expedición **solo una vez**. Iniciar la siguiente restablece las cargas del Santo activo sin restaurar automáticamente PV ni Estigma.
- Ejemplo ilustrativo (no recompensa oficial): 30 Ecos ganados, Lorenzo gasta 10, quedan 20; conserva 12 Ecos.

## Uso de códigos

- El director recibe un informe `DA65` del jugador, comprueba identidad y eligibilidad, e introduce MANUALMENTE la recompensa base del enemigo (pues no existen valores aprobados). La página calcula el +25 % de Lorenzo cuando corresponde.
- También conserva ajustes manuales excepcionales para compatibilidad, claramente diferenciados de recompensas por enemigo.
- Se emite un código individual por jugador. La web no sincroniza navegadores; cada jugador lo aplica tras verificar origen. Un identificador aplicado se conserva para impedir duplicados.
- Los nuevos códigos pueden incluir índice de expedición; los códigos antiguos `DA65` siguen siendo legibles, aunque carecen de esa protección adicional. La comprobación de integridad **NO** prueba autenticidad del director.
