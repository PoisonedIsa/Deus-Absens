# DEUS ABSENS | Documento vivo de diseño de juego

**Estado:** diseño documentado v0.2.2 (22 de octubre de 2026). Este documento registra ideas del creador y recomendaciones de arquitectura. **No implica que las funciones estén programadas.**

## 1. Identidad del proyecto [CONFIRMADO]

- Juego de mesa híbrido, de estructura **roguelite**, apoyado en una web.
- Las aventuras las prepara y dirige una persona que actúa como **director de juego**.
- La web debe servir de apoyo al combate, consulta de personajes, equipamiento, desbloqueos, mejoras y progresión entre expediciones.
- Objetivo de experiencia: que regresar de una aventura transforme el contenido disponible para la siguiente.
- Alojamiento previsto: **GitHub Pages** (sitio estático).

## 2. Bucle de expediciones [CONFIRMADO / ABIERTO]

**Idea expresada por el creador:**

1. Al iniciar una partida, se recupera el progreso conservado de expediciones anteriores mediante un código.
2. El director presenta la aventura y registra lo ocurrido, incluyendo supervivencia, hallazgos, recompensas y desbloqueos.
3. Durante el descenso, los personajes pueden obtener objetos y mejoras.
4. Al terminar, **se conserva todo el contenido desbloqueado** y **la mitad de los Ecos**.
5. La siguiente partida parte de ese legado, con nuevas opciones disponibles.

**Acordar antes de codificar:**
- **RESUELTO:** legado mixto: desbloqueos generales compartidos por campaña y progreso individual por jugador.
- ¿Se transfieren los Ecos que quedan al final o los Ecos ganados durante la aventura?
- ¿La mitad se redondea hacia abajo o hacia arriba cuando hay una cantidad impar?
- ¿Se conserva íntegro un banco de Ecos acumulados anteriormente? **Sugerencia:** dividir `ecos_expedicion` y `ecos_reserva` para no volver a reducir lo ya guardado.
- ¿Qué diferencias hay entre morir, sobrevivir, retirarse y superar una expedición?
- ¿Qué mejoras son permanentes y cuáles se pierden al volver?

### Ejemplo orientativo de modelo de legado (ESQUEMA AÚN NO IMPLEMENTADO)

```json
{
  "schemaVersion": 1,
  "campaignId": "campana-ejemplo",
  "lastRunId": "expedicion-ejemplo",
  "unlockIds": {
    "characters": [],
    "redeemedForms": [],
    "items": [],
    "improvements": []
  },
  "echoes": {
    "reserve": 0,
    "currentRun": 0
  },
  "characters": {},
  "inventory": {},
  "completedExpeditions": []
}
```

El JSON anterior **es solamente un borrador de estructura**, no un archivo de guardado implementado.

## 3. Códigos de progreso [IDEA CONFIRMADA; TECNOLOGÍA POR DEFINIR]

**Experiencia buscada:** al cerrar una aventura, el director genera un código; al introducirlo antes de la siguiente partida, la web restaura o actualiza el legado.

### Opciones técnicas

**A. Código de legado portable sin servidor (recomendación para el primer prototipo).**
- La web serializa el progreso en texto, opcionalmente comprimido y codificado para copiar/pegar.
- Al importar, comprueba versión y formato y pide confirmación mostrando un resumen de cambios.
- No requiere cuentas ni backend y puede utilizarse con GitHub Pages.
- El código puede ser largo a medida que crece la partida; no debe presentarse como imposible de modificar.
- Debe ofrecerse también exportación/importación por archivo como copia de seguridad.

**B. Código de recompensa avalado por el director (fase posterior).**
- El director autoriza una recompensa o resultado de aventura y genera un comprobante digital.
- Un mecanismo de firma asimétrica puede permitir que el sitio público verifique que lo aprobó el director, sin publicar su clave privada.
- La clave privada **no** se almacena en el repositorio ni en los JSON públicos.
- Sin servidor compartido sigue siendo difícil garantizar que un código válido no se reutilice en otro dispositivo o que no se restaure un guardado antiguo.

**C. Código corto alfanumérico (opcional futuro).**
- Para traducir un código de pocas letras a un progreso arbitrariamente grande se necesita un registro externo, habitualmente una base de datos/servicio.

**Protecciones del prototipo:** mostrar resumen antes de importar, no sobreescribir silenciosamente, guardar respaldo previo, ID de campaña y versión de esquema, validar IDs contra catálogos y permitir revertir. **Un checksum detecta errores de copia; no autentica a quien generó el código.**

## 4. Creación de personajes [BASE PROPORCIONADA POR EL CREADOR]

### Paso 1. Atributos

Distribuir exactamente una vez cada valor **+3, +2, +1, +0** entre cuatro atributos:

| Atributo | Influencia |
| --- | --- |
| **ACERO** | Fuerza, cuerpo a cuerpo, armaduras y resistencia a empujones. |
| **CENIZA** | Agilidad, armas a distancia, evasión e iniciativa. |
| **SANGRE** | Vitalidad y resistencia física a estados adversos. |
| **DOGMA** | Fe, ocultismo, Milagros Rotos y voluntad ante el terror. |

### Paso 2. Estadísticas derivadas

- **PV máximos** = `12 + (SANGRE × 3)`.
- **Defensa** = `10 + CENIZA`.
- **Estigma inicial** = `0`.
- **Límite de Estigma** = `10 + DOGMA`.
- **PV a 0:** muerte del personaje según la regla base recibida.
- **Estigma al límite:** **Quebranto**; sus efectos y persistencia aún deben definirse.

### Paso 3. Santo y pecado

- Los personajes están asociados a santos y pecados capitales y tienen reglas distintivas.
- Habrá **al menos 10 personajes iniciales** y **al menos 3 estarán bloqueados** al comienzo.
- Cada uno tendrá una **forma redimida bloqueada** que se comportará como una variante jugable del personaje original.
- La forma redimida **no debe asumirse equivalente** a la evolución única del prototipo anterior; falta decidir si sustituyen o coexisten ambas mecánicas.
- Hay siete pecados y al menos diez personajes: queda pendiente decidir si un pecado puede corresponder a varios santos/personajes.

### Ficha inicial documentada: SAN LONGINOS | IRA

**Identidad:** San Longinos, Penitente de la Ira.

**Rol:** Berserker de Trinchera / Asalto Sangriento.

**Atributos sugeridos:** ACERO y SANGRE. La asignación exacta depende del jugador.

**Trasfondo (resumen del creador):** inspiración en el martirio de Longinos y en una orden de combatientes que busca atraer la atención divina confrontando a las fuerzas celestiales.

**Equipo inicial (estadísticas de fantasía para juego de mesa):**
- **Lanza de Trinchera «Gólgota»:** `1d10` de daño físico; alcance corto sin obligar a situarse cuerpo a cuerpo.
- **Pistola de Clavos de Crucifixión:** `1d6` de daño a distancia.

**Pasiva: Cólera Sangrienta.**
- Activa si PV actuales son **50 % o menos** de los PV máximos.
- Los ataques agregan `+1d4` al daño.
- La penalización para **Ataques Precisos** cambia de `−3` a `−1` mientras esté activa.
- Restricción: no puede emplear su acción en curarse con vendajes o pociones mientras haya enemigos vivos.

**Habilidad de Martirio: Herida del Costado.**
- **Cargas iniciales propuestas para Longinos:** máximo de **1 carga** (revisable al equilibrar personajes). Una activación consume 1 carga; no es «una vez por combate».
- **Impacto:** automático, ignorando Blindaje.
- **Estado aplicado:** Sangrado Sacro; el objetivo pierde `1d6` PV al comienzo de sus turnos.
- **Recuperación:** Longinos recupera `3` PV cada vez que se aplica ese daño periódico.

**Términos aún sin reglas generales:** Ataques Precisos, Blindaje, duración y acumulación de Sangrado Sacro, funcionamiento de curación, límites de PV, distancia corta y sistema de aciertos. No completar sin acuerdo.

### Plantilla futura de personaje (NO IMPLEMENTADA)

```json
{
  "id": "san-longinos",
  "displayName": "San Longinos",
  "sin": "ira",
  "role": "Berserker de Trinchera / Asalto Sangriento",
  "unlock": { "initiallyAvailable": true, "conditionId": null },
  "suggestedAttributes": ["acero", "sangre"],
  "startingEquipmentIds": ["golgota", "clavos-crucifixion"],
  "passiveAbilityId": "colera-sangrienta",
  "martyrdomAbilityId": "herida-del-costado",
  "redeemedVariantId": null
}
```

Este esquema prevé referencias por ID. Los textos, los efectos detallados y las condiciones de las formas redimidas se definirán en catálogos propios cuando estemos listos.

## 5. Modelo de estados [PROPUESTA]

Distinguir cuatro tipos de información para que el guardado no mezcle cosas incompatibles:

1. **Catálogo del juego (datos de solo lectura):** personajes, santos, pecados, objetos, habilidades, condiciones de desbloqueo y enemigos.
2. **Legado permanente:** personajes y variantes habilitadas, reliquias descubiertas, mejoras permanentes, reserva de Ecos e historial de expediciones.
3. **Estado de expedición:** PV actuales, Estigma actual, recursos temporales, equipo transportado, Ecos de esta expedición, turnos, estados y encuentros.
4. **Fichas de jugador:** atributos asignados, santo elegido, variante, modificaciones y equipamiento personalizado.

**Importante:** descubrir un objeto, poseerlo, equiparlo y consumirlo son estados distintos; desbloquearlo no implica recibir una copia física cada partida.

## 6. Propuesta visual [PROPUESTA, NO APLICADA]

Mantener la identidad cromática existente: fondo carbón `#100e12`, rojo `#a33c42`, dorado `#c7a779`, tipografías Cinzel / Crimson Pro; mejorar legibilidad y jerarquía.

**Navegación sugerida:**
- **Santuario:** resumen del legado, Ecos reservados, últimos hallazgos y próxima expedición.
- **Penitentes:** galería de santos, creador de fichas y variantes redimidas con estado bloqueado.
- **Relicario:** descubrimientos, inventario y objetos equipados en vistas diferenciadas.
- **Expedición:** seguimiento del grupo, combatientes, recursos y registro de encuentros.
- **Crónica:** historia, reglas, bestiario y glosario.
- **Director:** finalización de aventuras, aprobación de resultados y generación de códigos.

**Decisiones de UX sugeridas:**
- Cartas diferenciadas entre `No descubierto`, `Descubierto`, `Disponible` y `Equipado`.
- Pantalla de cierre de expedición con resumen de cambios y previsión de Ecos retenidos.
- Flujo de creación en 3 pasos con números derivados calculados al instante.
- Código de progreso con botón **Copiar**, **Importar** y opción de **Guardar respaldo**.
- Interfaz móvil prioritaria para teléfonos alrededor de una mesa; tipografía legible y botones grandes.
- No exponer información de director o sorpresas de campaña en JSON públicos si los jugadores no deben verla.

## 7. Prioridades de implementación [PROPUESTA]

- **Fase 1:** aprobar el modelo de legado y establecer progreso grupal/individual; fijar redondeo y política de Ecos.
- **Fase 2:** definir esquema de personajes y registrar los diez santos; fichas + creador de atributos.
- **Fase 3:** construir exportación/importación de código con validación y respaldos.
- **Fase 4:** vista de director y cierre de expedición; añadir desbloqueos reales de objetos y formas redimidas.
- **Fase 5:** sistema de combate e inventario; rediseño visual por pantallas, con pruebas móviles.

## 8. Decisiones que faltan [PENDIENTES]

1. **RESUELTO:** sistema mixto, con desbloqueos globales por campaña y progreso individual de cada jugador.
2. ¿Cómo se generan/ganan/gastan los Ecos y qué cuenta como Ecos de la expedición?
3. ¿Qué sucede con las mejoras de un personaje que muere? ¿Sus fichas vuelven a nivel base?
4. ¿Qué desbloquea una forma redimida? ¿Reemplaza habilidades/equipo o es otra opción seleccionable?
5. ¿Cómo serán los tres personajes bloqueados de inicio y cuáles serán sus condiciones?
6. ¿Cuáles son las reglas de ataque, iniciativa, precisión, Blindaje, alcance, estados y duración?
7. ¿Debe haber códigos distintos de **legado** y de **recompensas** aprobadas por el director?
8. ¿Qué puede ver/modificar cada jugador frente al director?


## 9. Acuerdos posteriores: legado y martirio [CONFIRMADOS; PENDIENTES DE IMPLEMENTACIÓN]

### Legado mixto

- **Campaña:** desbloqueos generales, incluyendo descubrimientos y acceso compartido a contenido.
- **Jugador:** ficha, Santo elegido, estadísticas, estado personal y progresión individual.
- **Expedición:** recursos temporales y consumos durante la aventura, separados del legado.
- El director registra el cierre de expedición y se pretende generar códigos para restaurar el progreso. No hay exportador/importador funcional todavía.
- Se conserva lo desbloqueado y **la mitad de los Ecos** según la idea original. Queda pendiente establecer qué bolsa de Ecos se reduce, cómo se redondea y si el resultado cambia según supervivencia.

### Habilidades de martirio

- Cada Santo tiene su **propio número máximo de cargas**, determinado al equilibrar su habilidad.
- Activar una habilidad consume las cargas que indique su ficha (habitualmente una; excepciones por definir).
- Las cargas **no** se restauran al iniciar ni al terminar un combate. Persisten durante la expedición.
- **Durante** la expedición solamente se recuperan por **objetos, eventos o decisión del director**.
- **Al comenzar una expedición nueva**, se restauran completamente hasta la capacidad máxima de cada Santo.
- El contador de cargas es **individual por ficha/jugador**. Dos personas que utilicen el mismo Santo no comparten cargas.
- Una carga restaurada no puede exceder el máximo de la ficha salvo una excepción explícita diseñada en el futuro.
- La capacidad máxima de **San Longinos es provisionalmente 1**, sujeta a revisión de balance junto a las demás habilidades.
- **El motor de contador todavía no está implementado** en la web entregada.

### Revisión del elenco

El creador enviará las fichas de sus personajes Penitentes. Nombres, efectos y número de cargas deberán revisarse y consensuarse **antes de sustituir** el elenco demostrativo de seis personajes del prototipo. No modificar silenciosamente habilidades aún en discusión.
