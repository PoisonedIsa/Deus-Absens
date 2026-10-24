# DEUS ABSENS | Índice de reglas vigentes y estado real

**Hito de organización v6.7 · 22 de octubre de 2026**  
**Alcance:** documento de consulta para preparar el primer combate. **No cambia** JavaScript, JSON, atributos, economía ni guardados.

## Cómo leer la documentación

1. Una decisión explícita más reciente del creador prevalece sobre cualquier propuesta anterior, incluso si figura en un documento denominado «decisiones confirmadas».
2. `docs/COMBATE_BORRADOR.md`, `docs/DISENO_DE_JUEGO.md` y las versiones acumuladas de Puntos Débiles contienen **historial**: hay propuestas descartadas y fragmentos obsoletos.
3. **Confirmado ≠ implementado.** La web v6.5 gestiona fichas e informes, pero no realiza todavía tiradas, estados, puntos débiles, reparto de Ecos ni cierre automático de expedición.
4. Este documento es un índice de estado, no reemplaza el texto completo de los documentos de cada sistema.

## 1. Reglas confirmadas de personajes y combate

| Sistema | Regla vigente | Implementación |
|---|---|---|
| Atributos | Reparto único de +3, +2, +1, +0 entre ACERO, CENIZA, SANGRE, DOGMA | Ficha básica sí; habilidades aún no totalmente adaptadas |
| PV | `12 + (3 × SANGRE)` | Sí, en ficha |
| Defensa | `8 + ceil(CENIZA/2)` | Sí, valor derivado en ficha; ataques no automatizados |
| Movimiento penitente | `2 + CENIZA` | Indicado en ficha; movimiento físico/manual |
| Estigma | Inicia en 0, máximo `10 + DOGMA`; alcanzar máximo provoca Quebranto | Contador base sí; efectos de Quebranto pendientes |
| Turno | Inicio de estados → movimiento → acción principal → cierre solo si una habilidad lo habilita | Guía documental; sin motor de turnos |
| Movimiento | Ortogonal 1; diagonal 2; melé en las 8 casillas contiguas; muros infranqueables | Manual; sin cálculo de rutas |
| Enemigos | Director controla totalmente elección de acciones, objetivos, movimiento y habilidades | Mesa manual; sin IA ni tablas de instinto |
| Ataque | `2d6 + ACERO` melé, `+ CENIZA` distancia, `+ DOGMA` oculto, más modificadores; `>= Defensa` impacta | Regla documental |
| Blindaje | Reduce daño **después** de acertar | Regla documental; aún sin resolución automática |
| Doble 6 de ataque | Impacto crítico garantizado; duplica dados BASE del arma, no dados extra ni bonos planos | Regla documental |
| Doble 1 de ataque | Fallo automático; -1 a la siguiente tirada de ataque de ese atacante | Regla documental |
| Ataque múltiple | Solo para enemigos con ficha que lo permita; varios ataques separados dentro de UNA acción principal | Regla documental |
| Martirio | Cargas particulares por Santo; se restablecen al inicio de una nueva expedición, NO entre combates | Contador básico; varias capacidades provisionales |
| PV a cero | Muerte del Penitente conforme a regla base histórica; las consecuencias de botín tienen reglas específicas | Resolución manual |

## 2. Terreno y Puntos Débiles

- **Terreno:** muro impide el paso; obstáculo transitable penaliza movimiento del Penitente, no del enemigo; trampas activas dañan al Penitente al entrar y al iniciar turno sobre ellas, sin afectar a enemigos. Los detalles de detección de trampas aún no están cerrados.
- **Línea de visión para búsqueda:** recta desde centro a centro; bloquea el interior de muros u obstáculos opacos; rozar borde o esquina no bloquea; obstáculo bajo no bloquea.
- **Puntos Débiles:** cada ejemplar de enemigo los tiene independientes. Estados oculto/revelado/destruido. Los ocultos no pueden recibir ataques precisos.
- **Búsqueda activa:** acción principal; sin alcance máximo, requiere visión. Jugador declara física (`2d6+CENIZA`) o sobrenatural (`2d6+DOGMA`). Antes de tirar el director elige secretamente punto oculto y dificultad individual. Éxito revela **uno solo**, visible a todo el grupo durante el combate; fallo lo bloquea para nuevas búsquedas activas de **todo el equipo** durante ese combate, sin excepción. No hay críticos/fallos críticos especiales en búsquedas. El director conserva la revelación narrativa.
- **Ataque preciso:** penalización por tipo Expuesto -1, Protegido -2, Sellado -3; número separado de impactos requeridos para destruir. Ataque preciso exitoso reduce PV generales y suma 1 progreso, crítico preciso 2; efecto especial solo tras destruir.
- **Santa Lucía y San Longinos:** sus excepciones revisadas constan en `docs/PUNTOS_DEBILES_BORRADOR.md` (secciones recientes). **Las descripciones anteriores de `data/habilidades.json` todavía no reflejan todas las correcciones**.
- **Todavía sin aprobar:** bonificaciones definitivas por cobertura ligera/pesada; detección de trampas; interacciones espaciales complejas; números y efectos de puntos débiles de cada enemigo.

## 3. Legado y economía

- Ficha del Penitente **sellada por navegador**; director usa su propia mesa; códigos de ida y vuelta sin servidor. Son códigos portátiles, **no firmas digitales antifraude**.
- Ecos **personales**. Cada Penitente que haya **acertado por lo menos un ataque contra un enemigo** recibe íntegra la recompensa de ese enemigo al derrotarlo, incluso si el Blindaje redujo el daño neto a cero. No exige golpe final. Reparto por **ejemplar** de enemigo, nunca por nombre de tipo.
- Al cerrar expedición: `floor(0.60 × Ecos obtenidos durante esa expedición)` se añade a la reserva personal previa, que no se reduce. Tratamiento de gastos durante expedición aún pendiente.
- Mejoras adquiridas con Ecos: **personales, permanentes**, orientadas a desbloquear objetos y ventajas universales pequeñas aplicables a los Santos del mismo jugador. Descubrimientos de campaña compartidos por director, separados de compras personales.
- **No existen costes definitivos, bonificaciones aprobadas ni cantidad oficial de Ecos por enemigo.** `data/mejoras.json` continúa vacío. La ejecución de estas reglas todavía no está automatizada en v6.5.

## 4. Contenidos implementados y borradores

| Elemento | Disponible hoy | Advertencia |
|---|---|---|
| Diez Santos (7 disponibles, 3 apócrifos) y narrativas | Sí | Ocho necesitan revisión de balance completa |
| Fichas selladas, PV/Estigma, inventario manual | Sí | Guardado local por navegador; las habilidades no están automatizadas |
| Mesa del director, instancias enemigas con PV manuales | Sí | Sin motor de combate ni puntos débiles individualizados |
| Seis enemigos de ejemplo | Sí | **TODOS** sus números figuran como provisionales |
| Zonas, reliquias, códigos, Legado y Mejoras (interfaz) | Base | No son aún un bucle de expedición completo |
| Ecos automáticos, compras y cierre al 60 % | No | Esperar a las decisiones pendientes |

## 5. Referencias históricas expresamente sustituidas

| Lectura antigua | Regla que manda ahora |
|---|---|
| Defensa = `10 + CENIZA` o `8 + CENIZA` | `8 + ceil(CENIZA/2)` |
| Ataques con d20 o críticos de 20 natural | Ataque `2d6`, 6+6 / 1+1 |
| Enemigos buscan rutas óptimas, AI, instintos o Dijkstra | **Director toma todas las decisiones**, sin rutas automáticas |
| Gana Ecos quien daña PV netos o quien remata | Gana quien **acierta** un ataque; Blindaje no anula el derecho |
| Conservar 50 % de Ecos | Conservar **60 % de los Ecos ganados** en la expedición, redondeado hacia abajo |
| Comprar mejoras «globales» | **Compras personales persistentes**; descubrimientos globales de campaña son distintos |
| Búsqueda fallida repetible al cambiar circunstancias | **Bloqueo definitivo** de ese punto para búsqueda activa durante todo el combate, para todo el equipo |
| Ataque preciso con penalización única -2 | Expuesto -1, Protegido -2, Sellado -3 |

## 6. Pendientes que impiden una prueba representativa completa

1. **Orden de actuación**: todavía sin definir iniciativa (por bandos o individual).
2. **Cobertura y ataque a través de obstáculos bajos:** deben distinguirse visión, bloqueo y bonus defensivo.
3. **Alcances exactos** de algunas armas (p. ej., lanza de Longinos); los datos actuales no tienen alcance normalizado.
4. **Estados y Quebranto**: falta duración, resolución y curación.
5. **Enemigos, armas y Puntos Débiles**: números de ejemplo y fichas no adaptadas por completo a decisiones recientes.
6. **Economía**: valores por enemigo y compras aún no calibradas.

### Fuentes del propio repositorio consultadas

`docs/COMBATE_BORRADOR.md`, `docs/COBERTURAS_Y_OBSTACULOS.md`, `docs/DECISIONES_CONFIRMADAS.md`, `docs/PUNTOS_DEBILES_BORRADOR.md`, `docs/FICHAS_COMBATE.md`, `docs/LEGADO_ECOS_CODIGOS_V6_5.md`, `data/enemigos.json`, `data/habilidades.json`, `data/objetos.json`, y los acuerdos posteriores confirmados hasta el 22/10/2026.
