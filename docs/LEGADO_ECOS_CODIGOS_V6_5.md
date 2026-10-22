
> **Actualización de diseño v6.6:** las decisiones económicas posteriores sustituyen parte de este documento técnico de v6.5. Las recompensas de enemigos se otorgan completas a cada Penitente que les haya causado daño; las mejoras compradas son exclusivamente personales y permanentes; al cerrar una expedición se transfiere `floor(0.60 × Ecos obtenidos)` a la reserva sin reducir la reserva previa. Consulta `docs/ECOS_Y_MEJORAS_V6_6.md`. Las menciones en este documento a compras de mejoras globales o a conservar el 50 % describen el estado **anterior**, no una regla vigente. La interfaz y el código de v6.5 aún no implementan automáticamente las nuevas reglas.

# DEUS ABSENS · Ecos, mejoras y códigos v6.5

**Estado del módulo: estructura funcional / economía en diseño.** La implementación v6.5 añade menús, almacenamiento y transferencia de datos, pero **no inventa costes ni bonos**.

## Decisiones del director del proyecto CONFIRMADAS

1. **Una ficha sellada por navegador del jugador.** El director lleva su propia mesa en otro navegador/dispositivo; no se comparten datos automáticamente.
2. **Ecos personales.** Cada jugador registra sus propios Ecos. Se separan `ecos.expedition` y `ecos.reserve` en el almacenamiento.
3. **Desbloqueos generales compartidos.** Santos apócrifos, reliquias y mejoras de tipo `global` se pueden distribuir mediante códigos emitidos por el director. Todos los participantes deben importar la actualización correspondiente; no hay sincronización.
4. **Códigos en ambas direcciones.** El jugador exporta su ficha y el director entrega códigos de recompensa. El jugador también puede recuperar una ficha en otro navegador a partir de un informe anterior.
5. **Mejoras personales y globales.** Se guardan por ID; su precio y efecto siguen sin definirse.
6. **Regla de Ecos antigua:** al finalizar una expedición se conserva la mitad de los Ecos, pero falta determinar qué bolsa se reduce y cómo redondear. **NO se aplica ninguna conversión automática** hasta aprobar esos detalles.

## Pantallas añadidas

- **Ecos y legado (`#progreso`):** indicadores de Ecos de expedición y reservados, junto con Santos y reliquias ya registrados.
- **Mejoras (`#mejoras`):** catálogo preparado desde `data/mejoras.json` (actualmente `[]`). Filtro por ámbito, estado adquirido/no adquirido y costes si algún día se registran. **Ninguna compra ni mejora automática está habilitada.**
- **Códigos (`#codigos`):** pestañas «Soy jugador» y «Soy director», generación de códigos, copia, lectura, confirmación, respaldo local y restauración desde un respaldo anterior.

## Estructura de datos

Se mantiene `localStorage` bajo la clave **`deusAbsensState`** (no se cambia el nombre) y se añade el objeto opcional normalizado `legacy`:

```json
{
  "version": 1,
  "playerId": "",
  "campaignId": "",
  "ecos": {"expedition": 0, "reserve": 0},
  "personalUpgrades": [],
  "globalUpgrades": [],
  "appliedCodes": [],
  "directorHistory": []
}
```

Las listas ya existentes `unlocked` y `unlockedSaints` continúan representando reliquias y Santos conocidos por este navegador. **No se han movido ni reseteado.** El código recibe/desbloquea registros de esos catálogos; se validan los ID respecto al catálogo instalado.

### Futuro esquema de `data/mejoras.json`

El archivo **permanece vacío**. Cuando aprobemos una mejora podrá registrarse con:

```json
{
  "id": "identificador-unico",
  "name": "Nombre aprobado de la mejora",
  "scope": "personal",
  "description": "Efecto aprobado",
  "cost": null,
  "requirements": []
}
```

`scope` solo acepta `personal` o `global` en la nueva interfaz. El ejemplo es **solo un contrato de datos, no una mejora real**. No se asignan precios ni bonus.

## Flujo de intercambio sin servidor

### A. Jugador → Director
1. El jugador selecciona su Santo, revisa los cuatro atributos y sella la ficha en Personajes.
2. Abre «Códigos» → «Soy jugador» → «Generar código de mi ficha».
3. Copia el código `DA65...` y lo envía al director por el medio que prefiera.
4. Incluye identificación local del jugador, Santo, atributos, PV, Estigma, cargas, inventario, Ecos personales, descubrimientos visibles y marcas de recompensas ya usadas.

### B. Director → Jugador
1. El director abre «Códigos» → «Soy director» y crea un sello de campaña único en su navegador.
2. Pega el código del jugador en «Código recibido» y elige «Revisar código». Confirma que ese jugador es el destinatario.
3. Selecciona «Emitir recompensa». Puede registrar **manualmente** una cantidad no negativa de Ecos de expedición y elegir Santos/reliquias o mejoras existentes. Lo ya desbloqueado de manera global en la mesa también se incluye.
4. Copia el nuevo código y lo envía al jugador. **La mesa no añade esos Ecos a la reserva personal del director**.
5. El jugador pega el código en «Soy jugador», revisa su contenido y confirma la importación. La recompensa solo se aplica si el código señala a su `playerId` y pertenece a la campaña vinculada.
6. El uso se registra en `appliedCodes` para impedir aplicar nuevamente **la misma emisión** en ese navegador. Las recompensas globales se muestran en Legado y Reliquias. Para compartirlas con otras fichas, el director emite otro código para cada jugador.

### C. Restaurar hoja en otro navegador
1. En la ficha original, el jugador exporta un informe reciente de **su propia ficha**.
2. En el nuevo navegador, abre «Códigos» → «Soy jugador», pega el informe y elige «Restaurar mi ficha».
3. El sistema **pregunta antes de sobrescribir** la selección, inventario y Ecos personales. Hace un respaldo local previo en `deusAbsensBackupV65`.
4. La ficha se restaura con el Santo y los atributos sellados. Se conservan las marcas de recompensas consumidas que viajaron en ese informe, para evitar repetir las mismas en el nuevo dispositivo.

## Seguridad, alcance y limitaciones

- El código tiene una suma de comprobación para detectar errores de copiado, **no una firma digital**. Cualquiera que tenga la estructura técnica podría fabricar o modificar códigos. El indicador «Soy director» es solo un modo de pantalla, no una autenticación.
- No existe verificación de permisos, bases de datos, sincronización, QR, validación en línea, protección real contra copiar/reutilizar códigos en otros dispositivos ni reloj de campañas.
- Los cambios globales **requieren entrega manual** a cada jugador. No hay menú de compra ni efectos de mejoras y tampoco se ejecuta el cierre de expedición ni el cálculo de la mitad de Ecos.
- Los códigos pueden ser largos; la información de la ficha se trata como datos personales de juego. No publiques códigos en un repositorio público.
- La copia local `deusAbsensBackupV65` se sobrescribe cuando se crea un nuevo respaldo. No reemplaza una copia personal independiente del código exportado.
- Si las reglas de economía cambian, se actualizará este documento junto con el esquema antes de activar gastos/transferencias.
- El director conserva control absoluto sobre las criaturas: **sin IA ni cálculo de rutas**.

## Rutas añadidas y modificadas

**Archivos nuevos:** `assets/js/legacy.js`, `assets/js/legacy-ui.js`, `docs/LEGADO_ECOS_CODIGOS_V6_5.md`.

**Archivos reemplazados:** `index.html`, `assets/css/style.css`, `assets/js/app.js`, `assets/js/state.js`, `README.md`, `docs/DECISIONES_CONFIRMADAS.md`.

No se tocan `data/*.json`, las narrativas de los diez Santos, `assets/js/ui.js`, las reglas documentadas de Puntos Débiles ni el sistema de encuentros.
