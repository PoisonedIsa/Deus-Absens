# Arquitectura y acuerdo de rutas · DEUS ABSENS

Versión de estructura: `0.2.0` (refactor sin cambiar mecánicas).

## Mapa de archivos

```text
deus-absens/
├── index.html                 [RUTA FIJA] entrada de GitHub Pages
├── .nojekyll                  [RUTA FIJA] sirve la web estática sin Jekyll
├── README.md                  [RUTA FIJA] instrucciones para contribuir y publicar
├── assets/
│   ├── css/
│   │   └── style.css          [RUTA FIJA] apariencia global
│   ├── js/
│   │   ├── app.js             [RUTA FIJA] inicia la aplicación
│   │   ├── data.js            [RUTA FIJA] lee los catálogos JSON
│   │   ├── state.js           [RUTA FIJA] persistencia del progreso
│   │   └── ui.js              [RUTA FIJA] navegación, cartas y ventanas
│   └── images/                [AMPLIABLE] arte cuando lo diseñemos
├── data/
│   ├── personajes.json        [RUTA FIJA / CONTENIDO EDITABLE]
│   ├── enemigos.json          [RUTA FIJA / CONTENIDO EDITABLE]
│   └── reliquias.json         [RUTA FIJA / CONTENIDO EDITABLE]
└── docs/
    ├── ARQUITECTURA.md        [RUTA FIJA] mapa y normas
    ├── IDEAS.md               [EDITABLE] propuestas y decisiones
    └── DISENO_DE_JUEGO.md     [EDITABLE] especificación de mecánicas y flujos
```

**Ruta fija** significa que el archivo **no se renombra ni se cambia de carpeta** sin coordinar los imports y las referencias. **No** significa que su contenido sea intocable.

## Qué no vamos a mover

1. `index.html` en la raíz, para que GitHub Pages encuentre la página.
2. `assets/css/style.css` como hoja de estilos compartida.
3. `assets/js/app.js` como punto de entrada; el HTML lo enlaza con `type="module"`.
4. `assets/js/data.js`, `state.js` y `ui.js`, cuyos nombres ya se importan desde `app.js`.
5. `data/personajes.json`, `data/enemigos.json`, `data/reliquias.json`, `data/habilidades.json`, `data/variantes.json`, `data/mejoras.json` y `data/objetos.json`, porque `data.js` los carga por rutas relativas.
6. Los **ID existentes** de personajes y reliquias. Forman parte del guardado, así que cambiar `penitente` o `astilla` cortaría su vínculo con partidas previas. Se pueden cambiar nombres visibles sin tocar IDs.
7. La clave `localStorage`: `deusAbsensState` mientras mantengamos compatibilidad con partidas anteriores.

## Qué sí vamos a agregar y modificar

- Nuevos personajes, enemigos y reliquias: añadir objetos a los JSON (con un `id` único).
- Mecánicas de juego y balance: ampliar atributos y crear módulos en `assets/js/systems/` según decidamos.
- Pantallas nuevas: ampliar `index.html` y `assets/js/ui.js` sin cambiar las rutas existentes.
- Historia y reglas: ahora están en `index.html`; se pueden migrar **una sola vez** a `data/historia.json` y `data/reglas.json` cuando definamos su formato, conservando esas rutas a partir de entonces.
- Arte: añadir ficheros a `assets/images/` y usar rutas relativas.

## Fronteras de responsabilidad

- **Catálogos (`data/`)**: datos de referencia, compartidos por todos (personajes, enemigos, reliquias).
- **Estado (`state.js`)**: selecciones y descubrimientos de ese navegador, separados de los catálogos.
- **Interfaz (`ui.js`)**: mostrar cartas, filtros, navegación y diálogos.
- **Orquestación (`app.js`)**: conectar eventos con cambios de estado y renderizado.
- **Sistemas futuros**: lógica de inventario, turnos, daño y progresión, sin decidirla antes de recibir las reglas.

## Formato mínimo de datos

- Personaje: `id`, `name`, `role`, `icon`, `tags`, `hp`, `skill`, `desc`, `evolution`, `evoDesc`.
- Enemigo: `id`, `name`, `type`, `threat`, `icon`, `desc`, `ability`.
- Reliquia: `id`, `name`, `type`, `icon`, `rarity`, `unlock`, `condition`, `desc`.

`unlock: true` define una reliquia disponible al iniciar una partida; desbloquearla posteriormente se almacena en el progreso, **no reescribiendo el JSON**.

## Próximos módulos: nombres reservados, no implementados

```text
assets/js/systems/combate.js       turnos, enemigos, recursos y resolución
assets/js/systems/inventario.js    cantidades, equipamiento y uso
assets/js/systems/progresion.js    desbloqueos, expediciones y evolución
data/habilidades.json             habilidades reutilizables si hacen falta
```

Todavía no creamos esos archivos para evitar imponer reglas, pantallas o formatos prematuros. Se añadirán cuando el diseño de la partida esté acordado.

## Decisión sobre bases de datos

Para una demo alojada en GitHub Pages basta con JSON + `localStorage`. Si varios jugadores necesitan compartir una partida en tiempo real, guardar perfiles entre dispositivos o impedir que se vean secretos, necesitaremos un servicio externo con autenticación y base de datos. GitHub Pages por sí solo no ejecuta un servidor de partidas.

## Ampliaciones reservadas tras la sesión de diseño del 22/10/2026

En `docs/DISENO_DE_JUEGO.md` se documenta el objetivo de legado por campaña o jugador, códigos de progreso, Ecos, creación con cuatro atributos, santos y variantes redimidas. **Todavía no se programa ningún módulo nuevo** hasta cerrar los puntos pendientes.

Futuros catálogos probables, que se podrán crear sin mover los existentes: `data/condiciones.json` (opcional más adelante). Los catálogos `habilidades.json`, `mejoras.json`, `variantes.json` y `objetos.json` ya tienen ruta reservada y actualmente contienen `[]`. El lugar exacto de las fichas personalizadas y códigos de guardado se decidirá según el alcance de progreso elegido.

### Compatibilidad

El catálogo anterior contiene seis personajes experimentales y el campo `hp` como estadística simplificada. La nueva regla de PV depende de atributos asignados por el jugador y **no debe sobrescribir directamente** estos datos sin migración. Conservar IDs de guardados previos o crear una migración controlada cuando adoptemos el nuevo modelo de personajes.


## Contrato de entregas futuras (v0.2.2)

El repositorio raíz y el HTML **no se sustituyen en cada actualización**. En adelante se entrega únicamente el archivo modificado junto a su ruta exacta, salvo que un cambio funcional requiera también un módulo `assets/js/` o una migración.

**Rutas de contenido invariables:**

- `data/personajes.json`: datos de los Santos/Penitentes (actualmente seis fichas experimentales).
- `data/habilidades.json`: habilidades pasivas, de martirio y otras (vacío; definición pendiente).
- `data/variantes.json`: versiones redimidas (vacío).
- `data/objetos.json`: armas, consumibles y equipo (vacío).
- `data/reliquias.json`: colección de hallazgos y desbloqueos (seis registros de prueba).
- `data/mejoras.json`: mejoras permanentes y modificadores (vacío).
- `data/enemigos.json`: adversarios (seis registros de prueba).

Estos JSON adicionales **se descargan y se validan** al cargar la web, pero los módulos actuales no ofrecen aún fichas de San Longinos, contadores de martirio, creador completo ni pantalla de legado mixto. La presencia de una ruta no significa que la característica esté implementada.

Para crear o modificar el sistema de guardado mixto será necesaria una **migración versionada**, ya que `deusAbsensState` conserva el guardado del prototipo anterior. No cambiar sus claves o IDs sin tratar esa migración.
