# DEUS ABSENS · Ecos y mejoras · Confirmaciones v6.6

**Estado:** decisiones de diseño CONFIRMADAS. La economía automática, los precios y los efectos de las mejoras todavía NO están implementados.

## 1. Recompensas individuales por enemigo
- Cuando un enemigo es derrotado, **cada Penitente que le haya causado daño durante ese combate recibe la recompensa COMPLETA de Ecos asociada a dicho enemigo**.
- No es necesario asestar el golpe final. La recompensa no se divide entre los participantes elegibles.
- Quien no haya causado daño a ese enemigo no recibe sus Ecos.
- Las recompensas son **personales**: se registran en los Ecos de expedición de cada jugador elegible.
- **Pendiente:** valor de Ecos por enemigo, criterio exacto de daño elegible (por ejemplo, daño absorbido por Blindaje o daño indirecto), y registro de contribuciones por instancia enemiga.

## 2. Mejoras compradas: personales y persistentes
- Todas las mejoras **que compra un jugador con sus Ecos** pertenecen a ese jugador y se conservan entre expediciones.
- Enfoque de contenido: desbloquear **más objetos** y obtener **ventajas universales pequeñas** sin desestabilizar el combate.
- «Universal» significa que la ventaja no depende de un Santo concreto; **no significa que la reciba todo el grupo**.
- Los desbloqueos narrativos o hitos generales de campaña que el director comparta mediante códigos siguen siendo posibles, **pero no son mejoras compradas globalmente**.
- **Pendiente:** catálogo concreto, requisitos, costes, efectos, si las ventajas se equipan, límites de ventajas simultáneas.

## 3. Cierre de expedición: conservar el 60 %
- Al cerrar una expedición, cada jugador conserva **el 60 % de los Ecos obtenidos durante esa expedición**, redondeado **hacia abajo** al entero.
- Fórmula: `Ecos transferidos a reserva = floor(Ecos ganados en la expedición × 0.60)`.
- La reserva personal acumulada de expediciones anteriores **no se reduce** por este cierre.
- Ejemplo: 13 Ecos ganados → `floor(13 × 0.60) = 7` Ecos añadidos a la reserva.
- **Pendiente:** tratamiento de Ecos gastados durante una expedición y momento exacto del cierre.

## Compatibilidad con la versión v6.5
- `legacy.ecos.expedition` y `legacy.ecos.reserve` ya existen como estructuras, pero **no debe activarse todavía** el cálculo automático hasta definir las decisiones pendientes.
- `legacy.personalUpgrades` permite registrar mejoras personales. El antiguo campo `legacy.globalUpgrades` permanece para compatibilidad con guardados anteriores; **no autoriza nuevas compras de mejoras globales**.
- `data/mejoras.json` sigue sin costes ni bonificaciones definitivos.
- El sistema de códigos sigue sin autenticación criptográfica; el director valida las entregas.
- Ningún archivo JS, JSON, HTML o CSS cambia en esta actualización de documentación. La interfaz v6.5 todavía puede contener el rótulo «mejoras globales» o una opción de asignarlas: se corregirá durante la implementación de la economía.

## Precedencia
Estas tres decisiones tienen prioridad sobre los borradores anteriores que indiquen reparto de Ecos, premio solo al golpe final, mejoras compradas globalmente o conservación del 50 %.
