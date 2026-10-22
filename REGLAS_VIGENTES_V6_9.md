# DEUS ABSENS | Índice de reglas vigentes v6.9

**Estado:** consolidación de iniciativa y combate piloto, 22/10/2026. Actualiza el índice v6.8. **Se añade una herramienta separada de iniciativa y el campo `ceniza: null` a enemigos sin modificar otras estadísticas.**

> Regla de precedencia: las decisiones expresamente confirmadas más recientes del creador sustituyen cualquier borrador histórico que las contradiga. Para detalles no repetidos aquí, consultar `docs/REGLAS_VIGENTES_V6_7.md` y documentos específicos; este índice es una actualización del vigente, no un nuevo sistema completo.

## Nuevo bloque CONFIRMADO

| Tema | Regla vigente |
|---|---|
| Iniciativa | **Individual, `2d6 + CENIZA` por combatiente**, una sola vez al iniciar el combate; el orden se mantiene en todas las rondas |
| CENIZA de enemigos | Un valor propio por **tipo de enemigo**, separado de Movimiento y bono de ataque. Todavía sin cifras aprobadas: `ceniza: null` |
| Empate de iniciativa | Primero mayor CENIZA; si coincide, repetir `2d6 + CENIZA` solo entre empatados hasta resolver |
| Cobertura baja | **+1 a Defensa** cuando un obstáculo bajo protege claramente al objetivo |
| Barreras opacas | **Bloquean línea de visión** para ataques que la requieran; no son solo un +Defensa |
| Ataques enemigos | **`2d6 + bono de ataque`** propio del ataque que figure en la ficha, contra Defensa |
| Control enemigo | El director elige libremente acciones, movimientos, objetivos y habilidades; **sin IA ni búsqueda de rutas** |

## Reglas que permanecen confirmadas y afectan al piloto

- Penitente: atributos ACERO, CENIZA, SANGRE, DOGMA con reparto +3/+2/+1/+0. PV máximos `12 + 3×SANGRE`; Defensa `8 + ceil(CENIZA/2)`; movimiento `2+CENIZA`; Estigma máximo `10+DOGMA`.
- Ataques de Penitentes: melé `2d6+ACERO`, distancia `2d6+CENIZA`, ocultos `2d6+DOGMA`, más modificadores específicos; impacta cuando `resultado >= Defensa`.
- Blindaje reduce el daño **después** del impacto; no convierte un acierto en fallo.
- En ataques, doble 6: acierto garantizado, duplica los dados de daño **base del arma**; otros dados y bonos no se duplican. En ataques, doble 1: falla automáticamente y aplica -1 a la **siguiente tirada de ataque** del mismo atacante.
- Movimiento: ortogonal 1 punto, diagonal 2 puntos; melé llega a las 8 casillas contiguas; un muro no se atraviesa. Los enemigos tienen puntos de movimiento fijos por ficha independientes de CENIZA.
- Turno: efectos de inicio → movimiento → acción principal → cierre únicamente si una habilidad lo habilita.
- San Longinos: «Cólera Sangrienta» activa con `PV actuales <= 50 % del máximo`: `+1d4` daño extra a sus ataques y disminución en 1 de penalización de ataque preciso, sin bajar de 0; no puede usar su acción principal para curarse con vendajes/pociones mientras haya enemigos vivos. Su martirio «Herida del Costado» impacta automáticamente, ignora Blindaje y aplica Sangrado Sacro al inicio de los próximos 3 turnos del objetivo: `1d6` daño y 3 PV restaurados a Longinos por activación (sin superar el máximo); 1 carga por expedición. El daño inicial del martirio no debe inventarse si la ficha aún no lo concreta.
- Búsqueda de Puntos Débiles: sigue vigente el mecanismo v5.7. No se inventa un Punto Débil del Deudor para la primera prueba.
- Ecos: al morir un enemigo, cada jugador cuyo Penitente haya **acertado un ataque** contra esa instancia obtiene su recompensa **completa**, incluso si Blindaje absorbió todo el daño. Los Ecos son personales, y al cerrar expedición se transfiere `floor(60 % de los Ecos ganados durante la expedición)` a la reserva, sin reducir la previa. **Cantidad de Ecos por enemigo todavía sin fijar**. Mejoras compradas son personales, persistentes, vinculadas a desbloqueos de objetos y ventajas menores universales.

## Iniciativa: tres decisiones ya CERRADAS (v6.9)

- Cada combatiente tira individualmente `2d6+CENIZA` **una sola vez** al iniciar el combate; resultados descendentes establecen el orden fijo de actuación para todas las rondas.
- **Cada tipo enemigo tiene su propia CENIZA de iniciativa**, no deducible de movimiento ni ataque. La ficha de enemigo solo añade `ceniza: null` hasta que se apruebe el número. No se añaden otros atributos a enemigos.
- Igual iniciativa total: primero mayor CENIZA. Igual total e igual CENIZA: repiten solamente los empatados; si sigue la igualdad, repetir otra vez solo entre los aún empatados.
- La web incorpora una **herramienta de prueba separada** en `herramientas/iniciativa.html`, accesible desde Mesa del director. Permite dados manuales o virtuales y registro de orden, sin tocar el guardado de fichas ni mover enemigos.
- Para el Deudor de Sal, el +0 indicado en v6.8 era un **supuesto temporal de ensayo**, no atributo definitivo. Antes de lanzar iniciativa se necesita introducir la CENIZA de prueba si no hay cifra aprobada.

## Advertencias técnicas / otras decisiones pendientes

- Los enemigos de ejemplo tienen **estadísticas provisionales**; no usar el resultado del piloto como calibración final sin varias pruebas.
- La cobertura baja `+1` es confirmada, pero todavía falta precisar cómo se manejan coberturas múltiples, destruibles y casillas especiales.
- No se han fijado alcance extendido de la lanza «Gólgota» ni alcance exacto de la pistola de Longinos. Para evitar supuestos, el PILOTO 01 utiliza solo ataques con el enemigo en casilla adyacente.
- `data/habilidades.json` conserva descripciones antiguas de San Longinos que difieren de las decisiones posteriores. Las reglas vigentes anteriores prevalecen; este ZIP no cambia ese archivo.
- Hay **calculadora manual/virtual de iniciativa independiente**, pero no motor de turnos, ataques, estados, ni cálculo de rutas. La calculadora no se sincroniza entre navegadores.
