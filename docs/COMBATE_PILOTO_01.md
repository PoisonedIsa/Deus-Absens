# DEUS ABSENS | Primera batalla de prueba · Escenario 01

**Estado: GUÍA DE PRUEBA, NO CONTENIDO FINAL.** El director no tiene que automatizar movimiento ni enemigos. Objetivo: comprobar fluidez de 2d6, Defensa, Blindaje, fases del turno, daño y controles manuales.

## Participantes propuestos (datos reales del prototipo)

- **Penitente:** San Longinos. Ficha editable en `data/personajes.json`; usa atributos repartidos con +3, +2, +1, +0 según elección del jugador. Sus valores derivados provienen de esa elección; NO se asignan automáticamente aquí.
- **Arma de Longinos:** Lanza de Trinchera «Gólgota», daño **1d10**. Su alcance extendido todavía necesita decisión; para esta prueba se utiliza únicamente un blanco **adyacente** y no se presume un alcance final. Pistola de Clavos: **1d6** a distancia, alcance exacto aún sin aprobar.
- **Enemigo de entrenamiento:** Deudor de Sal, **14 PV, Defensa 8, Blindaje 0, Movimiento 3**. Ataque «Cobro de sal»: 1d6, 1 ataque, bono listado +0, alcance listado 1. Estos números están marcados **PROVISIONALES** en `data/enemigos.json`.
- **Escenario:** tablero físico vacío, sin muros, coberturas, trampas ni Puntos Débiles de prueba inventados. El director controla movimiento y decisiones del Deudor de Sal. No se añade IA ni trayectorias automáticas.

## Pasos de la prueba

1. Preparar la ficha y registrar los atributos reales del jugador, sus PV máximos y Defensa calculados.
2. Colocar ambos personajes con al menos una casilla de separación, sin obstáculos. Anotar posiciones y distancia manualmente.
3. **Antes de jugar, escoger una regla provisional de iniciativa**; no presentarla como regla vigente mientras esté pendiente la decisión del creador.
4. En cada turno: efectos de inicio aplicables → movimiento → una acción principal → cierre solo si está habilitado.
5. Ataque cuerpo a cuerpo con Longinos: `2d6 + ACERO + modificadores`, impacta con resultado `>=8` frente al Deudor. Si impacta, tirar daño base de lanza 1d10 y aplicar Blindaje del enemigo (aquí 0). 6+6 garantiza impacto y daño base 2d10; 1+1 falla y da -1 al siguiente ataque del mismo atacante.
6. Ataque del Deudor: director decide si ataca. Los parámetros de ficha de ataque son `1d6` daño y bono `+0` de prueba; resolver conforme al atributo/bono enemigo que se defina para el prototipo. **Falta confirmar la fórmula general para ataque enemigo**, por lo que no se declara automáticamente que tenga ACERO +0.
7. Registrar cada ataque, acierto, fallo, daño, ronda, uso de habilidades y duración total. No asignar Ecos aún: cantidad por enemigo sin definir. Sí marcar quién lo acertó para **derecho futuro** a Ecos.
8. Registrar si los participantes llegan a PV=0. La regla histórica declara muerte al caer a cero; los aspectos de botín y cierre deben consultarse en sus documentos confirmados.

## Datos que debemos observar (sin decidir balance todavía)

| Dato | Anotación durante la prueba |
|---|---|
| Atributos elegidos / Defensa / PV del Santo | |
| Iniciativa provisional usada | |
| Número de rondas hasta terminar | |
| Ataques efectuados / acertados / críticos / dobles 1 por bando | |
| PV perdidos por el Santo | |
| Martirios y pasivas que influyeron | |
| Ataques con dudas de alcance, línea de visión o cobertura | |
| Tiempo de la mesa | |
| ¿El enemigo resultó trivial, justo o excesivo? | |

## Reglas deliberadamente excluidas de este primer escenario

- Puntos Débiles individuales del Deudor (no hay datos aprobados).
- Valores de Ecos o compra de mejoras (no definidos).
- Coberturas y trampas (aún falta terminar reglas).
- Rutas automáticas, IA, movimiento asistido o generadores de tablero.
- Aplicación automática de estados no definidos.

## Decisiones inmediatas para el creador

**Bloque de tres, recomendado para destrabar el prototipo:**

1. **Iniciativa:** ¿por bandos alternados, o por cada combatiente individual?
2. **Cobertura sencilla:** ¿un obstáculo bajo da +1 a Defensa al estar claramente entre atacante y objetivo, o preferimos dejarlo sin bono inicialmente? Los muros opacos siguen bloqueando visión.
3. **Ataques de enemigos sin atributos propios visibles:** ¿usan `2d6 + bono de ataque` impreso en su ficha contra Defensa, o necesitan atributos ACERO/CENIZA/DOGMA individuales como los Penitentes?

Al aprobar el bloque, realizar la batalla de prueba y ajustar números reales según lo ocurrido. No publicar como definitivo el enemigo de muestra hasta finalizar las pruebas.
