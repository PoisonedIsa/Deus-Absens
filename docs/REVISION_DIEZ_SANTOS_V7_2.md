> **DOCUMENTO HISTÓRICO.** Las reglas vigentes de Santos y Ecos son las de [`REGLAS_VIGENTES_V8_0.md`](REGLAS_VIGENTES_V8_0.md) y [`ECONOMIA_ECOS_V8_0.md`](ECONOMIA_ECOS_V8_0.md). Este documento se conserva para consulta del proceso de diseño.

# DEUS ABSENS · Revisión de los diez Santos (v7.2)

**Propósito:** inventario de reglas definidas y pendientes para llegar al equilibrio de un roguelite difícil pero justo. Basado en `data/habilidades.json` conservado por la simulación v7.1 y en las confirmaciones posteriores de Longinos y Lucía en `docs/PUNTOS_DEBILES_BORRADOR.md` v5.7. **No crea nuevas cargas, costes, alcances ni límites de objetivos.**

## Regla transversal confirmada

- **Cargas:** individuales por Santo; gastadas permanecen gastadas hasta el inicio de una nueva expedición. No se asume una carga para los nueve Santos cuya cantidad sigue indeterminada.
- **Áreas:** cada martirio fija su número máximo de objetivos, cuando aplique. No se adopta un máximo común de tres.
- **Recursos:** sin curación automática entre salas; se permiten recursos de curación que tengan reglas propias. No se asume que el inventario esté vacío, aunque aún no puede modelarse de manera íntegra.

## Fichas: confirmado, registrado y por cerrar

| Santo | Pasiva y martirio presentes en el archivo | Cargas oficiales | Revisión imprescindible antes de simular fielmente |
|---|---|---|---|
| **San Longinos** | Cólera Sangrienta; Herida del Costado | **1, confirmado** | Pasiva aprobada: a PV ≤50 %, +1d4 adicional, reducción de penalización precisa en 1 (mínimo 0), no autocuración por vendajes/pociones con enemigos vivos. Martirio aprobado: impacto garantizado, ignora Blindaje, Sangrado Sacro 1d6 al inicio de cada uno de los siguientes 3 turnos enemigos y 3 PV de curación por aplicación hasta PV máximos. Integrar completos los Puntos Débiles en simulador. |
| **Santa Lucía** | Mirada Inmaculada; Juicio de la Ciega | **Sin definir** | Pasiva oficial reduce penalización de precisión en 2 hasta 0; fallo +1 Estigma. Martirio confirmado: impacto garantizado, 2d12 y **3 impactos de resistencia** sobre un Punto Débil elegido, sin destruir automáticamente un punto de resistencia mayor. Debe respetar Blindaje y la penalización distinta de Ojo de Aguja tras movimiento. **El texto viejo del JSON que dice que destruye un Punto Débil automáticamente está superado.** |
| **San Erasmo** | Comunión Voraz; Purga de Bilis Hirviente | **Sin definir** | Pasiva con consumo de restos, curación y Blindaje indicados en el borrador; falta validar economía de acciones y límites de hambre. Martirio 2d6 en cono y reducción de Blindaje según el JSON: **faltan geometría del cono, máximo de objetivos, alcances, y tratamiento del efecto persistente**. El límite de 2 blancos usado en v7.1 es un supuesto, no regla. |
| **Santa Magdalena** | Éxtasis del Sufrimiento; Matrimonio de Sangre | **Sin definir** | Falta cerrar costes de los Milagros Rotos y sus opciones; el vínculo de 2 rondas refleja al doble el PV perdido según el borrador, **pero faltan fuentes autorizadas, máximo de reflejos/daño y precisión del vínculo**. No asignar cargas todavía. |
| **San Lorenzo** | Peso del Oro Sacro; Comprar la Indulgencia | **Sin definir** | Pasiva ligada a Ecos personales y +25 % descrita en JSON; revisar interacción con la economía actual y bonificaciones acumulativas. Martirio incluye gasto de 15 Ecos y antiguo cambio de resultados propios de d20: **NO aprobado para 2d6**, pendiente de costes, tiradas elegibles, límites por expedición y de no permitir manipular críticos de forma abusiva. No tratar «15 Ecos» como precio confirmado. |
| **San Bartolomé** | Injerto Blasfemo; Piel de Nadie | **Sin definir** | Pasiva requiere bestiario con propiedades de Puntos Débiles que puedan absorberse; martirio requiere especificar colocación espacial detrás de un enemigo, bloqueo de línea de visión y duración de la protección y del golpe automático. |
| **San Simeón** | Inercia del Estilita; Apatía Absoluta | **Sin definir** | Pasiva +2 Blindaje y +2 daño de ametralladora sin moverse, con duración delimitada en borrador. Martirio inmunidad a ciertos estados y respuestas automáticas de 2d6 al aproximarse enemigos: **falta cuántas respuestas puede activar** y reglas de prioridad por enemigo/ataque. La única respuesta modelada en v7.1 era una hipótesis. |
| **San Judas Tadeo** *(apócrifo)* | El Peso de los Caídos; Procesión de los Olvidados | **Sin definir** | Pasiva permite invocar espectros y absorber daño letal según borrador; deben fijarse ataque real, alcance, acciones, duración y tope simultáneo. Martirio invoca **tres espectros** y presenta explosión 2d6: **falta área, máximo de enemigos alcanzables, daño y objetivo de ataque de los espectros**. El daño 1d4 ensayado en v7.1 no es oficial. |
| **Santa Juana de las Cenizas** *(apócrifa)* | Apoteosis de la Hoguera; Bautismo de la Pira | **Sin definir** | Pasiva de Forma Seráfica según borrador, requiere precisar vuelo y consumo de Estigma. Martirio +5 Estigma, 2d8 y Ceguera: **falta radio/forma del área y máximo de objetivos**. Los 3 blancos empleados en v7.1 fueron una hipótesis. |
| **San Lázaro** *(apócrifo)* | Rechazo de la Tumba; Exhalación del Sudario | **Sin definir** | Pasiva de 2 rondas al llegar a 0 PV según borrador; faltan resolución al final, interacciones con muerte y enemigos. Martirio automático 3d6, disminuye Estigma 3 y aplica Podrido: **falta fijar alcance cuantitativo exacto y confirmar si afecta a uno o varios objetivos**, además de casos límite. |

## Orden de cierre sugerido (recomendación, NO regla)

1. **Poderes de área e invocaciones**: Erasmo, Juana, Judas y Simeón. Son los que más pueden inflar el daño por activación o por respuesta gratuita.
2. **Efectos defensivos y persistentes**: Magdalena, Bartolomé y Lázaro. Definir duraciones, condiciones de activación y límites de activaciones.
3. **Economía y bonos acumulativos**: Lorenzo, incluyendo su relación con Ecos y tiradas 2d6.
4. **Integración plena de sistemas aprobados**: Longinos y Lucía, sin volver a decidir lo ya confirmado; sus puntos débiles y estados necesitan representación en las fichas enemigas.
5. **Asignación de cargas individuales**: después de conocer objetivos y frecuencias de cada habilidad, realizar iteraciones de simulación, no asignar 1 por defecto.

## Qué no debe confundirse con una regla

- La columna `prototypeMaxCharges: 1` no equivale a la capacidad oficial.
- Que una habilidad esté descrita literariamente no significa que disponga de las cifras necesarias para implementarla.
- No se puede inferir una ventaja o desventaja definitiva de un Santo a partir de una simulación que desactiva sus martirios por falta de definición.
