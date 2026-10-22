# DEUS ABSENS · Control directo de enemigos v2.7

## Decisiones aprobadas

**Control por director.** No hay Tablas de Instinto ni dados para escoger qué hará un enemigo. El director lo maneja con libertad, eligiendo movimiento, objetivo, ataque, saqueo o habilidad.

**Aproximación de referencia.** Si el director desea perseguir, el enemigo busca al Penitente más cercano mediante una ruta de **menor coste de movimiento válido** (no necesariamente menos casillas). El director puede elegir otro objetivo o mantenerse en posición. La interfaz podrá sugerir rutas, pero no será una IA autónoma obligatoria.

**Tipos de acciones.** Cada criatura tendrá una ficha con ataques y habilidades, así como movimiento fijo propio. Algunos tendrán **ataque múltiple**, igual que ciertos monstruos de juegos de rol de mesa. Un ataque múltiple consume **una acción principal** y produce los ataques expresamente indicados en su descripción. No da varias acciones principales.

## Reglas de movimiento para enemigos

| Elemento | Regla |
|---|---|
| Movimiento horizontal/vertical | 1 punto por paso |
| Movimiento diagonal | 2 puntos por paso |
| Obstáculo transitable | No incrementa el coste |
| Trampa | No afecta al enemigo |
| Muro | Infranqueable |
| Movimiento disponible | Valor propio de su ficha, independiente de CENIZA |

Para calcular una ruta se puede emplear un algoritmo de caminos mínimos con costes positivos, como **Dijkstra**. El enemigo se detiene en casillas permitidas y no atraviesa muros. Las reglas de ocupación de casillas y esquinas bloqueadas siguen pendientes. Si no existe una ruta válida, no se fuerza un desplazamiento imposible; el director elige otro curso de acción.

## Ejemplo hipotético de ficha, NO incorporado al bestiario

```json
{
  "id": "custodio_ejemplo",
  "nombre": "Custodio del Umbral (ejemplo)",
  "pvMaximos": 24,
  "defensa": 9,
  "movimiento": 3,
  "acciones": [
    {
      "id": "alabarda",
      "tipo": "ataque",
      "nombre": "Golpe de alabarda",
      "dadosDanio": "1d8"
    },
    {
      "id": "doble_alabarda",
      "tipo": "ataque_multiple",
      "nombre": "Doble golpe",
      "ataques": [{"accionId": "alabarda", "cantidad": 2}],
      "consumeAccionPrincipal": true
    }
  ]
}
```

Esta estructura es orientativa: **no sustituye** ni modifica `data/enemigos.json`. El daño, el alcance, los modificadores, el número de ataques y la forma de resolver cada acción se definirán al revisar las fichas reales.

## Secuencia sugerida del turno enemigo

1. Inicio del turno: estados y efectos.
2. Movimiento: hasta el máximo de la ficha; si persigue a un Penitente, usar una ruta de menor coste legal, con libertad del director para elegir otro objetivo.
3. Acción principal: uno de sus ataques, un ataque múltiple si lo posee, habilidad u otra acción disponible.
4. Acción de cierre: solo si se encuentra expresamente concedida en la ficha.

**Saqueo:** los enemigos conservan el saqueo gratuito desde las ocho casillas adyacentes (si ningún muro u obstáculo sólido lo impide), y pueden equipar o destruir objetos como ya se confirmó. Las propiedades de objetos activos y pasivos se aplican según sus reglas específicas.

## Sustitución de la propuesta v2.6

`docs/INSTINTO_ENEMIGO.md` y `data/instintos_enemigos.json` **quedan obsoletos y deben eliminarse del repositorio** si se subieron en la actualización v2.6. No deben cargarse ni utilizarse.

## Pendientes

- Definir datos completos y ataques reales de cada enemigo.
- Determinar cómo escoger el destino cuando haya varios Penitentes a idéntico coste.
- Resolver ocupación de casillas, diagonal entre muros y obstáculos sin rutas disponibles.
- Especificar reglas de línea de visión, alcance, prioridades y frecuencia de multataques.
- Crear, después de aprobar las reglas, la visualización del tablero y el asistente de rutas para el director.
