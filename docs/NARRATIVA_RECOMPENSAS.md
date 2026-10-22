# DEUS ABSENS | Narrativa, recompensas y consecuencias

**Estado:** reglas de concepto confirmadas el 22/10/2026; parámetros de balance y herramientas web todavía no implementados.

## 1. Principio central (CONFIRMADO)

La historia pertenece al director de juego. El director prepara y narra libremente sus aventuras, personajes y conflictos, sin depender de un generador narrativo de la aplicación. Los jugadores toman decisiones en la narración y el director interpreta sus consecuencias.

La web **no sustituye ni dirige la narrativa**. Su función es administrar mecánicas derivadas de ella: recompensas, inventarios, efectos, penalizaciones y preparación de combates tácticos.

## 2. Flujo de escena (CONFIRMADO EN CONCEPTO)

1. El director presenta una situación narrativa ajena a cualquier sistema automático de historias.
2. Los jugadores toman decisiones y el director determina el resultado.
3. Si corresponde, el director otorga objetos, bonificaciones, penalizaciones u otros efectos a uno o más jugadores.
4. Cuando el director elige entregar recompensas aleatorias, utiliza una **ruleta de objetos**. Él decide cuándo activarla y cuántos premios conceder.
5. La aplicación registra los resultados en inventarios o fichas, así como las consecuencias activas.
6. El combate comienza con esos objetos y efectos registrados. La narración puede continuar al terminar el encuentro.

**Ejemplo proporcionado por el creador:** una decisión acertada autoriza **dos sorteos de objetos** antes del combate. La cifra de dos **es un ejemplo, no una recompensa fija para todas las escenas**.

## 3. Ruleta de objetos (REQUISITO CONFIRMADO; DETALLES ABIERTOS)

- El director puede iniciar sorteos de recompensas cuando los considere narrativamente pertinentes.
- El número de sorteos es configurable por el director.
- Los resultados se obtienen de un catálogo de objetos de juego, sin escribir su definición dentro de la ruleta.
- La ruleta debe registrar los premios **primero en el inventario grupal**. Después los jugadores acuerdan el reparto y la aplicación transfiere los objetos elegidos a fichas individuales, sin duplicar cantidades.
- El sorteo debe usar tablas/pesos configurables según la **zona y/o tipo de evento**, sin selector artificial de dificultad.

**Pendiente de decidir:** probabilidades exactas, rarezas, duplicados, y elegibilidad de objetos todavía bloqueados.

**Separación necesaria:** `objeto obtenido durante la expedición` no implica `objeto desbloqueado de manera permanente`. Ambas acciones se registrarán independientemente. El director podrá otorgar un desbloqueo permanente como recompensa narrativa específica cuando corresponda.

## 4. Bonificaciones y penalizaciones (CONFIRMADO EN CONCEPTO)

La narrativa puede afectar directamente las fichas: PV, Estigma, atributos, movimiento, ataques, Defensa, inventario y otros estados que establezcan las reglas. El director decide a quién afecta y aplica el efecto mediante la aplicación.

Toda instancia de efecto debe permitir registrar:

- Identificador de efecto, nombre y descripción.
- Origen (`narrativa`, `objeto`, `evento`, `director` u otros futuros).
- Objetivo (jugador o grupo, con objetivos individuales concretos cuando corresponda).
- Cambios mecánicos concretos y fecha/escena de aplicación.
- Duración o condición para terminar el efecto.
- Si puede acumularse o sustituir a otro efecto.

**No se fijan todavía** valores automáticos de bonificaciones ni penalizaciones. Su balance dependerá del sistema final de 2d6, Defensa, movimiento y estados alterados.

## 5. Integración con el resto del juego

- **Legado mixto:** los desbloqueos permanentes pertenecen a la campaña; las fichas, inventarios y progresiones personales se registran por jugador según corresponda.
- **Expediciones:** guardar por separado lo temporal (objetos y estados de la expedición) y lo permanente (desbloqueos y progreso individual). La regla final sobre qué objetos se conservan entre expediciones sigue pendiente.
- **Martirio:** si un objeto, evento o el director devuelve cargas, se registra como recarga permitida. Las cargas continúan sin regenerarse entre combates y se restauran totalmente al iniciar una nueva expedición.
- **Generación procedural:** el director controla la historia; la aplicación puede generar escenarios y enemigos de acuerdo con la zona de combate, por separado de la narración.
- **Tableros:** 10 × 10 para un grupo previsto de cuatro jugadores; 15 × 15 para un máximo de seis jugadores. El director no ocupa una plaza.

## 6. Modelo de datos sugerido (NO IMPLEMENTADO)

Se propone añadir en el futuro:

- `data/efectos.json` — definiciones de efectos; una única fuente de verdad por efecto.
- `data/tablas_recompensas.json` — pesos y filtros de ruleta por zona, tipo de evento o circunstancias.
- `assets/js/recompensas.js` — sorteo y validación de premios.
- `assets/js/efectos.js` — aplicación, seguimiento y caducidad de efectos en fichas.

No duplicar `data/objetos.json`: continuará siendo el catálogo de objetos; las tablas se referirán a sus identificadores. Los módulos existentes de guardado y estado conservarán sus rutas actuales y se extenderán cuando llegue la implementación.

## 7. Alcance de esta actualización

**Solo documentación**. No hay ruleta conectada al inventario, interfaz de director ni motor de penalizaciones en la web actual. No actualizar `index.html` ni sus módulos todavía: primero resolver parámetros de botín y efectos con el creador.

## 8. Reparto de botín confirmado (22/10/2026)

1. El director concede una recompensa, por ejemplo, **dos giros** de ruleta.
2. Los objetos sorteados aparecen en el **inventario grupal de la expedición**.
3. Los jugadores acuerdan quién recibirá cada objeto.
4. Cada asignación debe descontar del inventario grupal y sumar al inventario individual, como **una sola operación**.
5. Los objetos todavía no repartidos permanecen en el inventario grupal mientras la expedición continúe.
6. Los desbloqueos permanentes se manejan aparte y no cambian al transferir objetos.

Quedan por definir: redistribución entre jugadores, capacidad de carga, qué ocurre con el inventario temporal al morir o acabar la expedición, y quién puede aprobar transacciones en la interfaz. Este flujo aún no está implementado en la web.
