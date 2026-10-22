# DEUS ABSENS | Puntos Débiles: borrador de balance v3.1

**Estado: propuesta para discutir. NO aprobada ni implementada en la web.**

## Decisión confirmada
La penalización de un Ataque Preciso depende de la dificultad del Punto Débil del enemigo, no de una penalización universal.

## Propuesta: tres categorías

| Nivel | Penalización del Ataque Preciso | Ejemplo |
|---|---:|---|
| Expuesto | -1 | Articulación accesible |
| Protegido | -2 | Núcleo parcialmente cubierto |
| Sellado | -3 | Sello bajo protección reforzada |

Tirada propuesta: `2d6 + atributo de ataque + otros modificadores - penalización del Punto Débil` contra la **Defensa normal del enemigo**. Si se iguala o supera, el ataque impacta. Se tira el daño normal del arma y, como propuesta, se aplica el efecto de la vulnerabilidad. Un ataque normal no activa el efecto del Punto Débil.

Un Punto Débil debe ser atacable y estar al alcance del arma; los muros y demás condiciones de disparo se aplican como siempre. El objetivo puede tener varios Puntos Débiles de distinta dificultad.

## Probabilidades de ejemplo

Con bonificación de ataque +2 y objetivo Defensa 9:

| Ataque | Umbral natural en 2d6 | Probabilidad de impacto |
|---|---:|---:|
| Normal, sin penalización | 7+ | 21/36 = 58,33 % |
| Expuesto (-1) | 8+ | 15/36 = 41,67 % |
| Protegido (-2) | 9+ | 10/36 = 27,78 % |
| Sellado (-3) | 10+ | 6/36 = 16,67 % |

## Propuesta de adaptación de dos pasivas (PENDIENTE)

- San Longinos: cuando su pasiva por PV bajos se active, reduce la penalización de precisión en 1, hasta mínimo 0.
- Santa Lucía: reduce la penalización de precisión en 2, hasta mínimo 0.
- El martirio de Lucía que destruye un Punto Débil automáticamente debe revisarse por separado para no neutralizar jefes completos.

Estas propuestas no sustituyen las habilidades originales ni el archivo `data/personajes.json` sin confirmación.

## Ejemplo de estructura FUTURA, no integrada

```json
{
  "id": "articulacion_izquierda",
  "nombre": "Articulación izquierda",
  "dificultad": "protegido",
  "penalizacionAtaquePreciso": 2,
  "efectoAlImpactar": "reduce_movimiento",
  "valorEfecto": 1
}
```

### Pendientes de decisión

1. ¿Los Puntos Débiles normales se destruyen con un impacto preciso acertado o tienen integridad de varios impactos?
2. ¿Los jefes tienen Puntos Débiles con mayor resistencia?
3. ¿Un Punto Débil oculto puede atacarse sin haberse descubierto?
4. ¿Se aplica el crítico natural de 2d6 a los Ataques Precisos igual que a los normales?
5. ¿El ataque preciso que impacta causa daño normal además del efecto del Punto Débil?

**No se modifica el código ni el JSON de personajes todavía.**
