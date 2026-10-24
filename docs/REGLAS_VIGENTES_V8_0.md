# DEUS ABSENS · Reglas vigentes de los diez Santos · v8.0

**Este documento prevalece sobre las descripciones mecánicas v6.5–v7.3 y sobre las hipótesis de los simuladores v7.0–v7.2.** La narrativa original de las fichas se conserva.

## Principios comunes

- Los atributos se reparten +3, +2, +1, +0 en ACERO, CENIZA, SANGRE, DOGMA. PV máximo = 12 + 3×SANGRE; DEF = 8 + ceil(CENIZA/2); MOV = 2 + CENIZA; Estigma máximo = 10 + DOGMA.
- Ataques ordinarios: 2d6+ACERO (melee), 2d6+CENIZA (distancia), 2d6+DOGMA (ocultos). 6+6 natural impacta siempre y dobla **solo dados de daño base del arma**. 1+1 natural falla y da −1 al siguiente ataque.
- Activar un martirio cuesta una acción principal y consume 1 carga cuando es válida, salvo excepción explícita (San Lorenzo: reacción). Máximo un martirio activado por turno propio salvo excepciones de fuera de turno. Requisitos incumplidos no consumen carga.
- Los PV perdidos, el Estigma y cargas consumidas persisten entre combates. No hay curación gratuita. Los efectos ordinarios de combate terminan al finalizar cada encuentro salvo persistencia expresa.
- Los martirios de área aprobados de Erasmo, Judas y Juana impactan automáticamente, eligen hasta 3 enemigos válidos, hacen **una sola tirada de daño compartida**; su Blindaje se aplica según habilidad. No generan progreso de Puntos Débiles salvo excepción expresa.
- Los Puntos Débiles requieren descubrimiento previo antes de apuntarlos. Los impactos precisos garantizados de Longinos/Lázaro/Bartolomé dan +1 de progreso; Lucía obtiene +3 en TOTAL; al no haber tirada no hay crítico natural. Destruir el punto en el mismo impacto que derrota al enemigo sigue contando y su efecto se resuelve una sola vez después del daño, si corresponde.
- El director mantiene control humano sobre enemigos, líneas de visión, movimiento y objetivos. La web no calcula rutas ni ejecuta IA enemiga.

## Fichas aprobadas

| Santo | Cargas | Activación |
|---|---:|---|
| San Longinos | 1 | Acción principal |
| San Erasmo | 1 | Acción principal |
| Santa Lucía | 1 | Acción principal |
| Santa Magdalena | 1 | Acción principal |
| San Lorenzo | 2 | Reacción tras tirada válida (máx. 1/ronda) |
| San Bartolomé | 2 | Acción principal |
| San Simeón | 2 | Acción principal |
| San Judas Tadeo | 1 | Acción principal |
| Santa Juana | 1 | Acción principal |
| San Lázaro | 1 | Acción principal |

### San Longinos

**Pasiva: Cólera Sangrienta.** Si al comprobar sus PV antes de cada ataque tiene la mitad de sus PV máximos o menos, suma 1d4 al daño y reduce en 1 (mínimo 0) la penalización por Ataque Preciso. Si se cura por encima del umbral, pierde las bonificaciones hasta volver a él. No puede utilizar vendajes ni pociones mediante acción principal mientras queden enemigos vivos.

**Martirio: Herida del Costado.** 1 carga por expedición. Acción principal; objetivo en una de las ocho casillas adyacentes. Impacto garantizado: 1d6 inicial que ignora Blindaje. Aplica Sangrado Sacro: 1d6 que ignora Blindaje al inicio de los próximos tres turnos del objetivo, incluso aturdido; Longinos recupera 3 PV (sin exceder el máximo) por cada activación ocurrida. Termina si muere el objetivo. Puede apuntar a un Punto Débil ya revelado y añadir 1 progreso, sin crítico natural.

### San Erasmo

**Pasiva: Comunión Voraz.** Comunión Voraz: durante el combate, desde su casilla o una adyacente, puede gastar 2 puntos de movimiento (no la acción principal), una vez por turno, para consumir un conjunto de restos de enemigo derrotado o colocado expresamente por el director. Cada conjunto se consume una sola vez: recupera 1d6 PV y obtiene +1 Blindaje hasta final de ese combate (máximo +3 de bonificación). Cada dos turnos propios consecutivos sin alimentarse pierde 2 PV; consumir reinicia el contador. El contador persiste entre combates pero solo avanza durante sus turnos. Tras el combate no puede alimentarse de los restos.

**Martirio: Purga de Bilis Hirviente.** 1 carga por expedición. Acción principal. Purga de Bilis Hirviente cubre un cono cardinal de 3 filas, anchuras 1–3–5, y alcanza a un máximo de 3 enemigos elegidos por el jugador dentro del área, con línea de visión desde Erasmo (paredes bloquean; obstáculos bajos no). No requiere tirada de impacto. Se tira 2d6 de daño UNA vez y se aplica el resultado a cada enemigo usando su Blindaje actual; después se reduce permanentemente su Blindaje en 2, mínimo 0.

### Santa Lucía

**Pasiva: Mirada Inmaculada.** Mirada Inmaculada: reduce en 2, hasta un mínimo de 0, solo la penalización por Ataques Precisos contra Puntos Débiles. Cualquier ataque fallido, incluido 1+1 natural, le concede 1 Estigma. Un ataque acertado que inflija 0 daño por Blindaje no se considera fallido.

**Martirio: Juicio de la Ciega.** 1 carga por expedición. Acción principal, contra cualquier enemigo visible, sin límite adicional de distancia. Juicio de la Ciega impacta automáticamente e inflige 2d12 de daño con Blindaje normal. Si se dirige a un Punto Débil previamente revelado, añade exactamente 3 puntos de progreso de precisión EN TOTAL (no 1+3). No es un crítico natural ni destruye automáticamente el punto.

### Santa Magdalena

**Pasiva: Éxtasis del Sufrimiento.** Éxtasis del Sufrimiento: mientras tenga 5 o más Estigma antes de pagar, suma +3 al daño de cada impacto directo de sus propios ataques, no a reflejos, condiciones ni otros daños indirectos. Reduce en 1 el coste en Estigma de cualquier milagro que ella utilice, incluso obtenido por otros medios, sin bajar de coste 1. Se comprueba el umbral antes de pagar.

**Martirio: Matrimonio de Sangre.** 1 carga por expedición. Acción principal. Elige un único enemigo visible sin límite de distancia y establece Matrimonio de Sangre hasta el COMIENZO de su segundo turno propio posterior a la activación. El vínculo persiste aunque se pierda después la línea de visión. Por cada pérdida real de PV causada DIRECTAMENTE por ese enemigo (incluidos sus ataques de área inmediatos, tras las reducciones de Magdalena), el enemigo vinculado recibe el doble del daño; ese reflejo ignora Blindaje, sin cadenas ni bonus +3. No refleja trampas, condiciones ni daño indirecto.

### San Lorenzo

**Pasiva: Peso del Oro Sacro.** Peso del Oro Sacro: por cada enemigo derrotado en el que haya conseguido un impacto válido, recibe suelo(1,25 × recompensa base de Ecos) en lugar de la base; se acredita al derrotarlo. Por cada 25 Ecos ganados y no gastados en la expedición actual añade +1 al daño de cada impacto directo propio, máximo +4. Al gastar Ecos se recalcula. No puede regalar objetos ni pagar sobornos. Recompensas base por enemigo: pendientes del bestiario.

**Martirio: Comprar la Indulgencia.** 2 cargas por expedición. Comprar la Indulgencia es una REACCIÓN inmediata, incluso fuera de su turno, después de una tirada de 2d6 propia o de un aliado visible y antes de resolverla. Máximo una activación por ronda. Cada uso válido consume una carga y exactamente 10 Ecos GANADOS Y NO GASTADOS de la expedición actual (nunca la reserva). Sube o baja exactamente 1 el valor de UN dado, entre 1 y 6. El 6+6 y 1+1 naturales se determinan sobre los dados originales y no se crean ni cancelan al modificarlos.

### San Bartolomé

**Pasiva: Injerto Blasfemo.** Injerto Blasfemo: al destruir un Punto Débil ya revelado recupera 3 PV (sin exceder el máximo), incluso si ese mismo ataque derrota al enemigo; obtiene exclusivamente la propiedad robable escrita en ese Punto Débil del bestiario, hasta terminar el combate. Solo puede mantener una propiedad robada, y al destruir otro punto puede conservarla o sustituirla; se cura 3 PV en ambos casos. No puede copiar otras habilidades. Las propiedades concretas siguen pendientes del módulo de enemigos.

**Martirio: Piel de Nadie.** 2 cargas por expedición. Acción principal. Piel de Nadie exige un enemigo visible a 5 casillas o menos y una casilla libre adyacente del LADO OPUESTO al enemigo respecto a la posición inicial de Bartolomé. Si no existe, no se activa ni consume carga. Se teletransporta allí. No puede ser seleccionado por ataques directos hasta su siguiente turno (pero sí sufre áreas, trampas y condiciones). Su primer ataque de cuchillo hasta el final de su siguiente turno propio impacta automáticamente; puede apuntar a Punto Débil revelado y añadir 1 progreso, sin crítico natural.

### San Simeón

**Pasiva: Inercia del Estilita.** Inercia del Estilita: al comienzo de su turno puede declarar que no gastará puntos de movimiento durante ese turno. De inmediato obtiene +2 Blindaje y +2 al daño de los impactos de su ametralladora hasta el comienzo del siguiente turno propio. Debe respetar la inmovilidad declarada.

**Martirio: Apatía Absoluta.** 2 cargas por expedición. Acción principal. Apatía Absoluta lo protege contra Estigma, empujones y aturdimiento hasta el comienzo de su siguiente turno. Cada enemigo que entre por primera vez en una de las ocho casillas adyacentes provoca una respuesta automática de 2d6 de daño, reducido por Blindaje normal; máximo una por enemigo y DOS respuestas en total por activación. No requiere tirada para impactar.

### San Judas Tadeo

**Pasiva: El Peso de los Caídos.** El Peso de los Caídos: invocar UN espectro pasivo cuesta una acción principal y 2 Estigma. Máximo 2 pasivos simultáneos. Aparece en casilla libre adyacente a Judas, ocupa espacio exclusivo; se mueve hasta 2 puntos por turno de Judas (ortogonal 1, diagonal 2, sin atravesar paredes) y realiza un ataque cuerpo a cuerpo por turno de Judas, incluido el turno de aparición: 2d6 + DOGMA de Judas, 1d4 de daño reducido por Blindaje. Defensa 9; se disipa al recibir un impacto que cause daño. Expira al finalizar el siguiente turno de Judas o al terminar el combate. Judas puede sacrificar voluntariamente uno PASIVO adyacente para anular un impacto directo que lo dejaría a 0 PV; no protege de áreas, trampas ni condiciones.

**Martirio: Procesión de los Olvidados.** 1 carga por expedición. Acción principal. Procesión de los Olvidados requiere TRES casillas libres adyacentes a Judas: si faltan, no se activa ni gasta carga. Invoca tres espectros INSTANTÁNEOS sin Estigma; cada uno ataca inmediatamente a un enemigo en sus ocho casillas adyacentes, pudiendo concentrarse, con tirada individual 2d6 + DOGMA y 1d4 de daño por acierto (Blindaje normal). Al terminar el turno, el jugador elige UNO de esos espectros para centrar una ÚNICA explosión de radio 1 (ocho casillas), línea de visión desde él, máximo 3 enemigos elegidos. Impacto automático; una única tirada 2d6 para todos, que ignora Blindaje. Después desaparecen los tres espectros.

### Santa Juana

**Pasiva: Apoteosis de la Hoguera.** Apoteosis de la Hoguera: al alcanzar su Estigma máximo se transforma OBLIGATORIAMENTE de inmediato, incluso fuera de su turno. Durante la transformación el Estigma permanece bloqueado en su máximo. Dura dos turnos propios: si comienza durante su turno ese es el primero; fuera de turno cuentan los dos siguientes. En cada impacto directo de sus propios ataques suma una vez ACERO + DOGMA e ignora Blindaje, no así daño indirecto ni Bautismo de la Pira. Conserva el vuelo narrado en la habilidad original (parámetros de vuelo pendientes). Al final de cada turno transformado pierde 3 PV sin mitigación, pudiendo caer a 0. Al final del segundo turno su Estigma vuelve a 0.

**Martirio: Bautismo de la Pira.** 1 carga por expedición. Acción principal. Bautismo de la Pira afecta hasta 3 enemigos elegidos dentro de radio 2 desde la casilla de Juana (incluye diagonales), cada uno con línea de visión: las paredes bloquean, obstáculos bajos no. Impacto automático; una sola tirada de 2d8 para todos, reducida por Blindaje normal. Aplica Ceguera (−3 a ataques de cada afectado durante su próximo turno). Luego obtiene hasta +5 Estigma sin superar su máximo y se transforma obligatoriamente si llega al límite. Puede usarse ya transformada, pero no gana Estigma bloqueado. Nunca suma la bonificación ACERO + DOGMA de la transformación a esta área.

### San Lázaro

**Pasiva: Rechazo de la Tumba.** Rechazo de la Tumba: inmune a veneno, enfermedad y Sangrado. Al alcanzar 0 PV puede seguir actuando durante sus siguientes dos turnos PROPIOS, con +2 al daño ácido. Si un impacto que cause daño le alcanza estando a 0 PV, pierde uno de los turnos restantes y el efecto termina si se agotan; no hay PV negativos. Si elimina a un enemigo con cualquier fuente propia de daño, incluidas condiciones aplicadas anteriormente, o termina el combate mientras resiste, recupera 5 PV INMEDIATAMENTE. Si acaba el segundo turno propio sin cumplirlo, muere.

**Martirio: Exhalación del Sudario.** 1 carga por expedición. Acción principal. Exhalación del Sudario alcanza un enemigo en una de sus ocho casillas adyacentes: impacto automático de 3d6, aplicando Blindaje normal salvo regla explícita diferente; reduce su propio Estigma en 3 (mínimo 0). Después aplica Vulnerabilidad: +2 al daño de impactos POSTERIORES que causen daño, no al 3d6 inicial, hasta el COMIENZO del siguiente turno propio de Lázaro. Puede apuntar a Punto Débil revelado para obtener 1 punto de progreso, sin crítico natural.

## Datos deliberadamente pendientes

- Bestiario: CENIZA individual de tipos enemigos, habilidades especiales, recompensas de Ecos, Puntos Débiles (dificultad/penalización/resistencia/efecto), propiedades robables de Bartolomé.
- Catálogo de mejoras personales y precios de reliquias: no aprobados; `data/mejoras.json` sigue vacío.
- Algunos parámetros originales, como el vuelo de Juana y efectos de las habilidades especiales enemigas, siguen sin reglas numéricas aprobadas. No se inventaron.

## Precaución sobre los informes de simulación

`herramientas/balance/` y los informes v7 son históricos y contienen hipótesis **no definitivas**. No sirven para validar automáticamente el equilibrio del nuevo juego v8.0.
