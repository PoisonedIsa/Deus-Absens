# DEUS ABSENS

Manual web para un **juego de mesa híbrido**: consulta de personajes, bestiario y reliquias, con herramientas digitales de partida previstas para versiones posteriores.

## Publicar en GitHub Pages

1. Crea un repositorio y copia **el contenido de esta carpeta** a la raíz de la rama `main`.
2. En el repositorio, abre **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona **`main`** y **`/(root)`** y guarda.
5. Cuando termine el despliegue, abre la dirección que muestra GitHub Pages.

`index.html` debe permanecer en la raíz. Todas las rutas usan `./` o URL relativas al propio módulo, así que la web funciona también si el proyecto se publica en una subruta como `usuario.github.io/deus-absens/`.

## Abrirlo en tu equipo

Debido a que los datos están separados en JSON, abrir `index.html` con `file://` puede bloquear las solicitudes. Arranca un servidor local desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Después abre `http://localhost:8000/`.

## Estado de esta entrega: v0.2.2

**Funcional ahora:** páginas y navegación del manual, seis personajes demostrativos, seis enemigos, seis reliquias, selección/evolución de prueba, filtros y desbloqueos guardados localmente en el navegador.

**Diseñado pero NO programado:** legado mixto (campaña + jugador), códigos de legado, creador de atributos, diez Santos definitivos, formas redimidas, Ecos, contador y recarga de martirio, inventario de partida y combate digital. Ver `docs/DECISIONES_CONFIRMADAS.md`.

**No se ha comprobado ninguna publicación real a GitHub**: se entrega el repositorio completo para que puedas publicarlo.

## Qué editar

- `data/personajes.json`: fichas y evoluciones.
- `data/enemigos.json`: bestiario.
- `data/reliquias.json`: hallazgos y condiciones de desbloqueo.
- `data/habilidades.json`: catálogo reservado de habilidades, de momento vacío.
- `data/variantes.json`: catálogo reservado de formas redimidas, de momento vacío.
- `data/objetos.json`: catálogo reservado de equipo y consumibles, de momento vacío.
- `data/mejoras.json`: catálogo reservado de mejoras, de momento vacío.
- `index.html`: textos de historia, reglas y estructura de secciones **por ahora**.
- `assets/css/style.css`: diseño visual.
- `assets/js/`: comportamiento del sitio, no contenido del juego.

Consulta [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) para las rutas estables y las ideas reservadas.

## Notas de progreso

- Los datos de catálogo son públicos: cualquiera que vea el repositorio puede leerlos. Los bloqueos son de presentación, no seguridad contra spoilers.
- La elección de personaje, las evoluciones y las reliquias desbloqueadas se guardan con `localStorage`, **solo en el navegador y origen actuales**. GitHub Pages no sincroniza partidas entre jugadores ni dispositivos.
- La clave `deusAbsensState` mantiene compatibilidad con la versión inicial en el **mismo origen**, pero el progreso del archivo local no pasa automáticamente a GitHub Pages.
- Aún **no hay** motor de combate, fichas de partida en grupo ni inventario con cantidades. Se diseñarán al concretar las reglas.

## Diseño del sistema roguelite (no implementado)

Las nuevas decisiones e ideas se registran en [docs/DISENO_DE_JUEGO.md](docs/DISENO_DE_JUEGO.md) y en [docs/IDEAS.md](docs/IDEAS.md). El proyecto **no implementa todavía** códigos de progreso, Ecos, santificación/redenciones ni el nuevo creador de personajes; esta entrega actualiza documentación sin alterar la web funcional.


## Actualizaciones posteriores

Una vez publicado este ZIP completo, podremos enviar **únicamente** `data/personajes.json`, `data/habilidades.json` o cualquier otro fichero cambiado para sustituirlo por la misma ruta en GitHub. Si una característica requiere nueva interfaz o lógica, indicaremos también los archivos JavaScript/HTML necesarios; editar solo JSON no genera por sí mismo controles nuevos.

`docs/CONTRATO_DATOS.md` detalla nombres, referencias y pautas para futuras entregas.
