# Ideas y decisiones | DEUS ABSENS

> Documento vivo para ordenar propuestas. **Una idea recogida no equivale a una función implementada.**
> El detalle está en [DISENO_DE_JUEGO.md](DISENO_DE_JUEGO.md).

## Acordado por el creador

- [x] Juego de mesa híbrido, con director y expediciones roguelite.
- [x] La web mostrará y registrará personajes, objetos, desbloqueos, mejoras y progresión.
- [x] Los desbloqueos persistirán entre partidas.
- [x] Al cerrar una expedición se conserva la mitad de los Ecos (regla exacta de transferencia y redondeo por precisar).
- [x] Se desea recuperar y trasladar progreso mediante códigos.
- [x] Habrá **al menos diez** personajes base; **al menos tres** inicialmente bloqueados.
- [x] Cada personaje tendrá una forma redimida bloqueada, concebida como variante.
- [x] Atributos: ACERO, CENIZA, SANGRE y DOGMA; reparto +3/+2/+1/+0.
- [x] Fórmulas: PV `12 + 3×SANGRE`; Defensa `10 + CENIZA`; límite de Estigma `10 + DOGMA`.
- [x] Primer personaje documentado: **San Longinos, Ira**.
- [x] Se desea mejorar el diseño visual.

## Propuestas técnicas (aún no aprobadas)

- [ ] Separar **catálogos**, **legado**, **fichas** y **estado de expedición**.
- [ ] Códigos de progreso portables offline con respaldo descargable.
- [ ] Considerar códigos firmados por el director para validar recompensas, nunca poner su clave privada en GitHub.
- [ ] Distinguir Ecos en expedición de Ecos ahorrados de partidas anteriores.
- [ ] Pantallas: Santuario / Penitentes / Relicario / Expedición / Crónica / Director.
- [ ] Registro de eventos que permita revisar qué cambió tras cada descenso.
- [ ] Creador de personajes paso a paso, con cálculos automáticos.
- [ ] Galería de variantes redimidas y condiciones de desbloqueo.

## Nuevas decisiones confirmadas

- [x] **Legado mixto:** los desbloqueos generales pertenecen a la campaña y cada jugador tiene progreso personal.
- [x] Los martirios tienen **cargas por Santo** (máximos diferentes según la habilidad).
- [x] Las cargas se gastan y **persisten entre combates**.
- [x] Durante una expedición únicamente se recargan con **objetos, eventos o intervención del director**.
- [x] **Cada nueva expedición comienza con todas las cargas restauradas**.
- [x] El contador es individual por jugador/ficha.
- [ ] Revisar equilibrio, efectos y número máximo de cargas de todos los Santos (incluido Longinos).


## No implementado todavía

- Sistema real de Ecos, fichas con atributos, diez personajes, redenciones, códigos de exportación/importación, inventario con cantidades, combate y cierre de expediciones.
- El prototipo actual sigue mostrando seis personajes anteriores y reglas provisionales. Los cuatro nuevos JSON son catálogos vacíos reservados, no funciones activas.
