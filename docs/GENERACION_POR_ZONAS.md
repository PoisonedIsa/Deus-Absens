# DEUS ABSENS | Generación procedural por zonas

Estado: diseño confirmado en concepto; números y composición todavía provisionales.

## Decisiones del autor

- No habrá selector de dificultad fácil/normal/difícil: el juego debe ser difícil desde el comienzo.
- La zona actual guía la generación del terreno y de los enemigos.
- Al profundizar en las zonas, se aumenta gradualmente la complejidad de los encuentros.
- Los enemigos poseen una zona de origen, pero no están restringidos absolutamente a ella.
- Un enemigo originario de zona 1 puede seguir apareciendo en zonas posteriores, en cantidades mayores.
- Un enemigo originario de zona 3 puede aparecer excepcionalmente en zona 1.
- La generación de terreno y enemigos se quiere procedural. Se conserva la propuesta de generación editable por el director, pendiente de aprobación definitiva de sus controles.
- El combate usa tableros físicos de 10x10 o 15x15; movimiento diagonal cuesta 2 y ataques cuerpo a cuerpo alcanzan las 8 casillas adyacentes.

## Separación de datos

- `data/enemigos.json`: estadísticas, nombres y habilidades. Sigue siendo el catálogo original.
- `data/zonas.json`: número de zona, opciones del escenario y parámetros de generación.
- `data/apariciones_enemigos.json`: zona de origen, peso relativo por zona, coste de amenaza, máximos y reglas especiales, por `enemigoId`.

No añadir datos de aparición a `data/enemigos.json` por duplicado. Los registros de ejemplo en `apariciones_enemigos.json` se refieren a los seis enemigos provisionales actuales; no son asignaciones de mundo confirmadas.

## Algoritmo previsto

1. Elegir zona actual y tablero, no nivel de dificultad.
2. Crear terreno procedural según parámetros de la zona, evitando posiciones imposibles.
3. Preparar candidatos con peso mayor a 0 en la zona y permitidos por condiciones de evento.
4. Seleccionar enemigos por sorteo ponderado, descontando coste de amenaza y respetando máximos por enemigo, límite total y máximo de enemigos de origen superior al de la zona.
5. Colocar enemigos sin ocupar casillas bloqueadas, zonas de inicio ni rutas obligatorias.
6. Validar conectividad del tablero y condiciones de juego; si falla, regenerar o corregir.
7. Permitir ajustes del director si se aprueba el editor; guardar la semilla, los cambios y la versión del generador.

**Pesos no son porcentajes.** Si solo compiten dos enemigos con pesos 80 y 1, las probabilidades condicionales de elegirlos son 80/81 y 1/81. Si hay más enemigos candidatos, cambia el denominador.

**Un contador de aparición es un dato de configuración, no un contador de muertes ni de progreso.** Si más adelante se quiere que derrotar enemigos cambie sus apariciones, se añadirá por separado a la progresión de campaña.

## Restricciones todavía pendientes

- Número y nombres reales de las zonas.
- Lista de enemigos nativos de cada zona y sus pesos definitivos.
- Cómo varía el número de enemigos según jugadores activos.
- Determinar si los jefes son exclusivos de encuentros preparados o tienen posibilidad aleatoria.
- Mapa de cobertura, obstáculos por bioma, accesibilidad y colocación de miniaturas.
- Definir si una amenaza temprana excepcional debe llevar advertencia narrativa o permitir huida.
- Edición de generación por director, exportación de mapa y reglas de guardar semilla.
- Balance por pruebas reales y definición definitiva de reglas de ataque 2d6.

## Implementación

Este paquete agrega **archivos de datos y diseño solamente**. No actualiza ni conecta aún el generador a la web. Se deja pendiente `assets/js/generador.js` y la pantalla para el director, para evitar dar por implementadas reglas todavía no aprobadas.
