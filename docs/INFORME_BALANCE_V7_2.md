> **DOCUMENTO HISTÓRICO.** Las reglas vigentes de Santos y Ecos son las de [`REGLAS_VIGENTES_V8_0.md`](REGLAS_VIGENTES_V8_0.md) y [`ECONOMIA_ECOS_V8_0.md`](ECONOMIA_ECOS_V8_0.md). Este documento se conserva para consulta del proceso de diseño.

# DEUS ABSENS · Simulación controlada v7.2

**Fecha:** 22 de octubre de 2026. **Naturaleza:** ensayo estadístico reproducible, **NO simulación definitiva de todas las habilidades** ni cambio a la web.

## Qué se aprobó antes de simular

- Número de cargas de martirio **diferente por Santo**, a decidir uno por uno (solo Longinos tiene 1 confirmada).
- Límite de objetivos de cada martirio de área **por habilidad**, no universal.
- Sin recuperación automática de PV ni de cargas entre encuentros. Son válidos recursos de curación cuando sus efectos estén definidos.

## Tres modelos, sin dar autoridad a números provisionales

- **Solo armas:** no se activan pasivas ni martirios. Referencia deliberadamente incompleta.
- **Confirmadas*:** se activan exclusivamente los efectos numéricos ya aprobados de **San Longinos** (+1d4 de daño con ≤50 % PV, Herida del Costado con 1 carga, Sangrado Sacro de 3 activaciones y +3 PV de cura por activación). No se usan poderes de los otros nueve, *porque carecemos de sus cargas oficiales*, **no porque se les asignen 0 cargas en el juego**. Las reglas de precisión de Santa Lucía no pueden comprobarse sin un modelo de Puntos Débiles. El motor es aproximado incluso para Longinos.
- **Experimental v7.1:** referencia histórica con **una carga hipotética para todos**, blancos de área supuestos, daño de espectros hipotético y demás habilidades parciales. **No representa una regla confirmada ni un escenario balanceado**.

**Constantes provisionales del simulador heredado:** CENIZA de todos los enemigos igual a +0, aunque los valores oficiales permanecen sin definir; armas y atributos con distribuciones de ensayo; alcance y movimiento simplificados, geometría aproximada, y sin habilidades especiales enemigas, búsquedas de Puntos Débiles, trampas o inventario de consumibles. No se incorpora IA ni rutas automáticas en la web.

## Comparación de combates aislados

**Se prueban las 210 combinaciones posibles de diez Santos para cada tamaño de grupo (4 y 6).** Una batalla por combinación y escenario/modo (`n=210`); comparar sólo tendencias grandes.

| Grupo | Encuentro | Solo armas | Confirmadas* | Experimental v7.1 |
|---|---|---:|---:|---:|
| 4 | Z2 incursión | 85.2 % | 87.1 % | 99.5 % |
| 4 | Z3 elites | 47.6 % | 56.2 % | 91.4 % |
| 4 | Jefe reforzado | 12.4 % | 17.6 % | 65.2 % |
| 6 | Z3 elites ampliada | 36.7 % | 44.8 % | 92.9 % |
| 6 | Jefe reforzado ampliada | 1.4 % | 7.1 % | 55.2 % |

## Expediciones consecutivas: siete Santos iniciales, equipos de cuatro

Cada ruta usa **las 35 combinaciones de cuatro entre los siete Santos iniciales**, cuatro réplicas por equipo (`n=140` por fila), sin recuperación gratuita de PV ni cargas. Las fichas de enemigos son provisionales. Comparación con director que reparte ataques y que concentra amenazas.

| Expedición | Táctica de director | Solo armas | Confirmadas* | Experimental v7.1 |
|---|---|---:|---:|---:|
| Travesía 3 encuentros | Reparte | 35.0 % | 45.0 % | 61.4 % |
| Travesía 3 encuentros | Concentra | 27.9 % | 34.3 % | 49.3 % |
| Descenso 4 encuentros | Reparte | 10.0 % | 12.1 % | 26.4 % |
| Descenso 4 encuentros | Concentra | 9.3 % | 10.7 % | 19.3 % |
| Descenso con jefe reforzado | Reparte | 3.6 % | 4.3 % | 10.0 % |
| Descenso con jefe reforzado | Concentra | 0.7 % | 0.0 % | 7.1 % |

## Conclusiones y precauciones

1. **No hay base para asignar una carga a todos.** La enorme diferencia respecto a la simulación experimental refleja efectos omitidos o hipotéticos, **no demuestra que todas las habilidades sean demasiado fuertes o débiles**.
2. **El desgaste importa.** La ausencia de curación gratuita y la persistencia de cargas hace que una cadena de encuentros sea mucho más exigente que un combate aislado.
3. **El comportamiento del director importa.** El foco de ataques puede bajar notablemente la probabilidad de completar la ruta. En el juego la dirección sigue siendo humana y libre, no automatizada.
4. **No usar estas tasas para nerfear a Santos concretos.** En «Confirmadas*», nueve Santos no cuentan con habilidades completas; en «Experimental» varias cargas, áreas y daño espectral están sin validar.
5. **No usar estos datos para establecer recompensas de Ecos, PV de enemigos o números de cargas.** Antes faltan puntos débiles reales, habilidades del bestiario, CENIZA por criatura y efectos de consumibles.
6. **No existe recuperación gratuita entre encuentros** por regla. El experimento tampoco incorpora curaciones por objetos o habilidades que podrían ser accesibles en el juego real.

## Siguiente iteración de simulación, tras cerrar fichas

- Declarar los nueve máximos de cargas restantes, de forma individual.
- Declarar la forma del área, máximo de blancos y duración del martirio de Erasmo, Judas y Juana, además de las respuestas de Simeón.
- Fijar los costes de milagros, las fuentes de daño reflejado y las invocaciones.
- Completar atributos CENIZA y habilidades de los seis enemigos; Puntos Débiles con resistencia y dificultad; inventario y curas.
- Ejecutar la misma batería con semillas reproducibles y evaluar errores de estimación con más réplicas antes de decidir balance oficial.

## Reproducción

Desde `herramientas/balance/`, con Python 3 y su biblioteca estándar:

```bash
python simular_v7_2.py
```

Los datos de entrada provienen de la simulación archivada v7.1. El script escribe JSON y CSV bajo `resultados/` en el directorio raíz de este paquete. El simulador **no se carga desde la página** ni altera el navegador o la campaña.

Datos exactos: `resultados/v7_2_resultados.json`, `resultados/encuentros.csv`, `resultados/expediciones.csv`.
