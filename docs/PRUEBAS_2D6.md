# DEUS ABSENS | Pruebas del sistema 2d6 (v2.2)

**Aprobado:** 2d6 como dados centrales de ataque. **Confirmado:** 2d6 para ataques y Defensa base = 8 + ⌈CENIZA / 2⌉. **Aún no aprobado:** fórmula completa de ataque, críticos y precisos.

## Protocolo de prueba

Prueba estas reglas **solo como simulación**:
1. Ataque = 2d6 + atributo relevante + otros modificadores.
2. Si el total iguala o supera la Defensa, acierta.
3. La **Defensa aprobada** es 8 + redondear hacia arriba(CENIZA / 2) del defensor.
4. Si el ataque conecta, tirar el dado de daño descrito por el arma y restar Blindaje; 0 es el daño mínimo propuesto.
5. Doble seis natural: crítico experimental, se duplican solo los dados de daño. Doble uno: fallo automático experimental.
6. Ataque Preciso experimental: -2 al ataque, con efectos de Punto Débil dependientes del enemigo.

## Probabilidad exacta contra Defensa 9

| Bono | Umbral en 2d6 | Probabilidad de alcanzar la Defensa |
|---:|---:|---:|
| +0 | 9+ | 10/36 = 27,78 % |
| +1 | 8+ | 15/36 = 41,67 % |
| +2 | 7+ | 21/36 = 58,33 % |
| +3 | 6+ | 26/36 = 72,22 % |

**Advertencia de balance:** CENIZA influiría simultáneamente en acierto a distancia, Defensa y movimiento (este último ya confirmado como 2+CENIZA). Conviene comparar fichas con CENIZA +0 y +3.

## Casos de prueba sugeridos

- **San Longinos**, ACERO +3: ataque cuerpo a cuerpo contra Defensa 9; debería impactar con una tirada de 6+ en los dados.
- **Santa Lucía**, CENIZA +3: ataque a distancia contra Defensa 9; tiro Preciso experimental -2 exige 8+ en los dados, salvo que se aplique la pasiva que lo elimina.
- **Enemigo con CENIZA +3**, Defensa confirmada 10: frente a un ataque +3 requiere 7+ en los dados, es decir 21/36 = 58,33 %.

## Pendientes de aprobación

- La fórmula de Defensa ya está aprobada. Sigue pendiente analizar si las ventajas entre los cuatro atributos resultan equilibradas.
- Reglas de crítico y pifia, compatibilidad con San Lorenzo.
- Ataques Precisos, Puntos Débiles y pasiva de Santa Lucía.
- Cobertura y Blindaje, línea de visión, iniciativa y rangos.


## Tabla oficial de Defensa por CENIZA (v2.3)

| CENIZA | Mitad redondeada hacia arriba | Defensa base |
|---:|---:|---:|
| +0 | 0 | 8 |
| +1 | 1 | 9 |
| +2 | 1 | 9 |
| +3 | 2 | 10 |

La probabilidad del cuadro anterior corresponde a un **objetivo fijo con Defensa 9**, no a todos los personajes. Los bonos de cobertura aún no están confirmados.


## Movimiento base confirmado (v2.4)

| CENIZA | Puntos de movimiento por turno | Máximo de casillas ortogonales en terreno libre | Máximo de pasos diagonales en terreno libre |
|---:|---:|---:|---:|
| +0 | 2 | 2 | 1 |
| +1 | 3 | 3 | 1 |
| +2 | 4 | 4 | 2 |
| +3 | 5 | 5 | 2 |

El coste ortogonal es 1 y el diagonal 2. Esta tabla no incluye obstáculos ni modificaciones por estados. Pruebas pendientes: rutas mixtas con obstáculos, balance de CENIZA como atributo de precisión/Defensa/movimiento y esquinas bloqueadas.


## Consideraciones de movilidad enemiga (v2.5)

- Las criaturas tendrán **movimiento fijo por tipo**, no derivado de CENIZA.
- Al probar encuentros en tablero 10×10 o 15×15, medir si cada criatura alcanza una posición útil dentro de un número razonable de turnos.
- Evaluar obstáculos transitables (sin sobrecoste para enemigos), trampas (sin daño) y muros (bloquean).
- No hay cifras oficiales de movimiento por enemigo; asignarlas después de revisar sus fichas.
