# DEUS ABSENS · Balance de los 10 Penitentes

**Estado:** propuesta de diseño para revisión, no aprobada ni implementada.
**Base:** fichas de `data/personajes.json` de la versión narrativa v2.9, y reglas de combate pactadas.

## Reglas confirmadas que condicionan el balance

- Ataque: 2d6 + atributo + modificadores frente a Defensa.
- Defensa del Penitente: 8 + techo(CENIZA / 2).
- Movimiento del Penitente: 2 + CENIZA.
- Habilidades de martirio: cargas propias de cada Santo, persistentes entre combates y restauradas completamente al comenzar una nueva expedición. Las cantidades concretas, salvo la referencia de Longinos, siguen pendientes de balance.
- Tablero: 10×10 para 4 jugadores; 15×15 para hasta 6.
- Acciones: inicio, movimiento, principal, cierre condicional.
- El director controla a los enemigos; no se utilizan Tablas de Instinto ni búsqueda automática de caminos.

## Referencia estadística: ataque frente a Defensa 9

| Bonificación total al ataque | Probabilidad de impacto antes de reglas de dobles |
|---:|---:|
| +0 | 27,8 % |
| +1 | 41,7 % |
| +2 | 58,3 % |
| +3 | 72,2 % |
| +4 | 83,3 % |

> Estas probabilidades no incluyen posibles reglas de fallo o crítico automático, coberturas ni estados. En 2d6 cada bonificación +1 importa mucho. Un +4 acumulativo puede ser decisivo.

## Diagnóstico y primer ajuste propuesto (TODOS PENDIENTES DE APROBACIÓN)

| Santo | Fortaleza que conservar | Riesgo de balance | Ajuste experimental a probar |
|---|---|---|---|
| San Longinos | Ataque agresivo al estar herido | Sangrado y autocuración ilimitados | Sangrado Sacro durante **2 activaciones**; revisar la cura de 3 PV por activación; Ataque Preciso adaptado de -2 a -1 mientras dure la pasiva. |
| Santa Lucía | Destruir Puntos Débiles con precisión | Crítico y destrucción automática pueden trivializar al jefe | Mantener 2d12 y la destrucción de **1 Punto Débil**, pero que los jefes no pierdan automáticamente una fase ni mueran por ello. |
| San Erasmo | Tanque que mejora por aprovechar bajas | Escudo +2 Defensa y +3 Blindaje acumulado pueden anular demasiados golpes | Probar **+1 Defensa** de escudo y conservar el +3 Blindaje máximo; determinar si la penalización por hambre se suspende cuando no hubo oportunidad real de activar su pasiva. |
| Santa Magdalena | Conversión del Estigma y daño recibido en potencia | Daño reflejado duplicado sin límite; sinergias peligrosas con costes propios de PV | Probar **máximo 6 de daño reflejado por activación**, durante sus 2 rondas; decidir si los costes voluntarios de PV activan el vínculo. |
| San Lorenzo | Economía de Ecos y alteración de la fortuna | +4 ataque/+4 daño en 2d6 e intercambio de 15 Ecos por 20 natural de una tirada de d20 | Probar bonos **hasta +2 ataque y +2 daño**; cambiar un dado individual de d6 a 1 o 6 (no un resultado d20), sujeto a coste de Ecos y carga de martirio. |
| San Bartolomé | Aprovechar Puntos Débiles y ataques ajenos | Teletransporte global + protección total + impacto garantizado | Conservar el ataque garantizado, pero probar un alcance máximo para reposicionarse o sustituir la inmunidad total por una bonificación defensiva temporal. |
| San Simeón | Fortaleza inmóvil y respuestas defensivas | Contraataque automático de 2d6 por cada enemigo acercándose | Probar **1 contraataque automático por ronda**; dejar inmovilización/inmunidades durante el efecto original. |
| San Judas Tadeo | Convertir caídos en apoyo para el grupo | Tres ataques instantáneos + 2d6 de área + protección de espectros | Probar tres ataques de espectro y reducir el área final a **1d6**, o conservar el área de 2d6 y reducir el número de ataques; definir máximo de espectros activos. |
| Santa Juana de las Cenizas | Transformación Seráfica poderosa pero costosa | Daño añadido por dos atributos, vuelo e ignorar todo Blindaje puede dominar fases | Probar **1 transformación por combate**; revisar si ignora todo Blindaje o una cantidad limitada. Conservar los 2 turnos y coste de PV mientras se evalúa. |
| San Lázaro | Resistencia a estados y segunda oportunidad | Revivir si el combate termina, peste acumulable y aumento universal de daño recibido | Probar que **Peste de Sepulcro no se acumule** y solo reinicie duración; definir un límite de activaciones de Putrefacción Activa. |

## Incompatibilidades que hay que corregir antes del balance numérico

1. **20/1 natural en San Lorenzo:** sistema original d20, incompatible con ataque 2d6. Adaptar explícitamente.
2. **Umbral 15 en el arma de Santa Magdalena:** decidir si se refiere al total de ataque o a un valor histórico de d20; sustituirlo por una condición válida de 2d6.
3. **Ataque Preciso:** aparece como -3 en varias fichas, mientras el borrador 2d6 proponía -2. Confirmar regla común y después ajustar excepciones de Longinos y Lucía.
4. **«Una vez por combate» en descripciones originales:** sustituir por cargas persistentes por expedición, con capacidad específica por Santo. No inventar capacidades definitivas sin pruebas.
5. **Tabla de Instinto robable de Bartolomé:** reemplazar esa referencia por «ataque o habilidad especial robable del enemigo» porque el sistema de instintos fue descartado.
6. **Blindaje:** acordar si puede reducirse permanentemente solo durante un combate o más allá y cómo se trata el valor mínimo.
7. **Efectos repetidos:** Sangrado, Peste, Ceguera, Podrido, reducción de Blindaje y reflejos deben especificar duración, acumulación y resistencias.
8. **Áreas y alcances:** definir casillas para conos, radio cercano, distancia corta/media y empujones.

## Secuencia recomendada de trabajo

### Fase A: reglas comunes (antes de editar los 10 personajes)

- Confirmar Ataques Precisos, críticos, Blindaje, tipos de daño y duraciones.
- Definir cuándo se activa una pasiva, cuándo se ejecuta una habilidad de martirio y qué acción consume.
- Acordar una escala de presupuesto por turno y objetivo: daño, protección, curación y control.

### Fase B: balance individual

1. **Longinos y Lucía:** dos referencias ofensivas (cuerpo a cuerpo y distancia).
2. **Erasmo, Simeón y Lázaro:** tres referencias de resistencia.
3. **Magdalena y Bartolomé:** efectos situacionales, daño reflejado y Puntos Débiles.
4. **Lorenzo, Judas Tadeo y Juana:** economía, múltiples aliados y transformación.
5. Elegir para cada uno la **cantidad máxima de cargas de martirio** tras evaluar su impacto total por expedición.

### Fase C: pruebas comparables

- Escenario 10×10 con cuatro Penitentes y enfrentamientos de enemigos comunes, élites y jefe.
- Escenario 15×15 con seis Penitentes y encuentros equivalentes de zona.
- Registrar: rondas por combate, daño total, daño recibido, curación, número de efectos de control, Estigma, consumo de Ecos y usos de martirio.
- Comparar aporte por rol; no exigir que todos hagan el mismo daño.

### Fase D: implementación (solo cuando se aprueben cambios)

- Cambiar exclusivamente los campos correspondientes en `data/personajes.json`.
- Si cambian reglas reutilizadas por el motor o la ficha, entregar además los archivos JavaScript concretos que sea necesario modificar.
- Mantener narrativas, nombres, identificadores y equipo salvo que se solicite lo contrario.

## Primera decisión sugerida

**Confirmar la penalización estándar de Ataque Preciso para 2d6**. El borrador usaba -2 y las fichas antiguas -3. Definir esa regla desbloquea directamente los ajustes de Longinos, Lucía y Bartolomé.
