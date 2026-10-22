# DEUS ABSENS · Bloque visual 3 (v6.2)

## Alcance

Se reestructuraron **Expedición**, **Legado** y **Mesa del director** para dejar de parecer menús de demostración. Se preservan el contenido narrativo, las reglas, los JSON y el guardado local de versiones anteriores.

## Expedición

Nuevo panel introductorio, resumen de preparación derivado del estado real y tres accesos a Personajes, Reliquias y Director. Rutas, eventos, ruleta, Ecos y un ciclo completo de expedición todavía no se ejecutan desde esta pantalla.

## Legado

Panel de estado de desbloqueos de Santos, cantidad de reliquias descubiertas y personaje activo. Barras de progreso basadas en los catálogos y `localStorage`. Ecos, códigos de campaña, progreso personal separado y redención siguen pendientes.

## Mesa del director

HUD numérico de instancias enemigas totales, en pie y PV acumulados; lista de fichas con barras de PV por instancia. Los botones originales de PV, restaurar, consultar ficha y retirar siguen presentes. El director decide acciones y movimiento; no existe IA ni pathfinding.

## Rendimiento

- Se eliminó el uso de `document.startViewTransition`, que tomaba instantáneas de toda la página y aplicaba desenfoques.
- Se desactivaron las animaciones infinitas de portada y hero.
- Se eliminaron animaciones de entrada, transforms y sombras intensas en hover; navegación inmediata.
- Se sustituyeron capas fijas de fondo y backdrop blur por un fondo estático.
- Se renderizan únicamente las áreas que cambian al editar fichas, reliquias o mesa, en lugar de regenerar toda la web.
- Navegación de once pestañas en una sola fila desplazable horizontalmente.

## Compatibilidad

Los archivos que reemplaza la actualización incremental son:

- `index.html`
- `assets/css/style.css`
- `assets/js/ui.js`
- `assets/js/app.js`
- `README.md`

Se añade `docs/INTERFAZ_VISUAL_V6_2.md`.

No se modifica ningún `data/*.json`. No se cambia la estructura del almacenamiento local.
