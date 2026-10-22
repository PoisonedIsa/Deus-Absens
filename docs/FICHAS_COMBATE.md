# Fichas de Penitentes y Enemigos · Implementación v2.8

## Funcionamiento actual

- **Penitentes:** diez fichas, con siete de acceso inicial y tres apócrifos bloqueados. El director puede desbloquearlos manualmente para pruebas; el coste en Ecos no está implementado.
- **Atributos:** reparto de los valores +3, +2, +1, +0. PV = 12 + 3 × SANGRE, Defensa = 8 + ceil(CENIZA/2), Movimiento = 2 + CENIZA, Límite de Estigma = 10 + DOGMA.
- **Martirio:** las cargas se consumen manualmente desde la ficha. Recargas mediante intervención del director y restauración total mediante botón «Nueva expedición». No hay restauración al terminar combates.
- **Capacidad máxima:** solo Longinos (1) está confirmado. Los nueve restantes muestran una capacidad de **prueba de 1**, distinta de la regla definitiva pendiente. El diseño de carga se mantiene en `data/habilidades.json`.
- **Enemigos:** fichas de seis criaturas de la demostración original con PV/DEF/Blindaje/Movimiento y varias acciones. TODAS las cifras añadidas para enemigos son de prueba, y no representan el balance final.
- **Mesa del director:** añadir varias instancias de la misma criatura, editar PV y quitar instancias. Datos guardados localmente.
- **IA / rutas:** NO hay cálculo de rutas, Tablas de Instinto ni automatización de acciones. El director toma las decisiones.

## Archivos y rutas

`index.html`, `assets/css/style.css`, `assets/js/{app,ui,state}.js` y `data/{personajes,habilidades,objetos,enemigos}.json`.

## Revisión requerida antes de jugar en serio

1. Definir las cargas máximas de nueve martirios pendientes.
2. Ajustar las habilidades que todavía hacen referencia a críticos d20 o penalizaciones del sistema anterior; San Lorenzo es prioritario.
3. Definir estadísticas reales del bestiario, incluyendo movimiento y qué criaturas disponen de ataques múltiples.
4. Definir duración de estados especiales, puntos débiles, rango de armas y regla final para impacto/daño.
5. Implementar instancias de fichas por jugador y guardado compartido (códigos de legado).
