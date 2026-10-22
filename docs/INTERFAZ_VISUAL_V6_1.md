# DEUS ABSENS · Bloque visual 2 (v6.1)

## Alcance implementado

1. Cartas de los diez Santos rediseñadas como expedientes sagrados: glifo, nombre, pecado, lema, rol, estadísticas, habilidades y botones existentes.
2. Símbolo propio en cada opción de navegación y en la cabecera de cada sección.
3. Transiciones suaves entre las secciones: View Transitions API cuando está disponible; animación CSS como alternativa. Respeta `prefers-reduced-motion`.
4. En el proyecto completo se incorpora `data/personajes.json` de la versión de narrativas v2.9, conservando historias y lore completos. También se conserva `docs/PUNTOS_DEBILES_BORRADOR.md` acumulado hasta v5.7.

## Compatibilidad

- No se alteraron las reglas de combate, los cálculos de atributos ni los identificadores de personajes.
- No se modifica el formato de guardado en `localStorage`.
- Los botones de elegir, ver expediente, distribuir atributos, martirio, desbloqueo y mesa del director conservan sus atributos de acción.
- No se implementa cálculo de rutas ni IA de enemigos.
- La actualización mínima no sobrescribe el JSON de personajes: usa el que ya esté en el repositorio, con soporte tanto para los datos breves como para las crónicas ampliadas.

## Rutas reemplazadas en la actualización

- `index.html`
- `assets/css/style.css`
- `assets/js/ui.js`

## Nueva documentación

- `docs/INTERFAZ_VISUAL_V6_1.md`
