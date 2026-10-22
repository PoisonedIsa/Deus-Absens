# DEUS ABSENS · Interfaz visual v6.3

## Propósito

Actualizar tres apartados visuales sobre la base funcional v6.2, sin modificar las mecánicas ni el contenido de los personajes.

## 1. Portada gótica estática

- Vidriera ornamental vectorial inline con composición de dos columnas.
- Acceso al Inicio o directamente a Personajes.
- Diseño responsivo y sin animaciones en bucle.

## 2. Atlas de Zonas

- Se consulta `data/zonas.json` sin duplicar valores en HTML.
- Tarjetas con número y nombre provisional, tableros permitidos, cantidad base y variación de enemigos, presupuesto de amenaza y densidad del terreno.
- Vista completa en modal.
- `estado: BORRADOR_NO_APROBADO`; **las zonas no están balanceadas ni tienen biomas definitivos**.
- La generación procedural, el mapa táctico y el cálculo de rutas **no se implementan**.

## 3. Relicario

- Presentación por rarezas ya presentes en `data/reliquias.json`.
- Filtros por nombre/tipo/condición, estado y rareza.
- Contadores de descubiertos y sellados, porcentaje, carta y ficha de consulta.
- Registro manual de prueba que respeta el estado local actual.
- No se implementan Ecos, ruleta ni inventario grupal.

## Compatibilidad

- Se conserva el `localStorage` con clave `deusAbsensState`.
- No se modifican las diez narrativas de `data/personajes.json` ni `data/habilidades.json`.
- El director sigue controlando enemigos y la mesa sigue funcionando manualmente.
- Ninguna animación nueva consume recursos en bucle.

## Archivos

- `index.html`
- `assets/css/style.css`
- `assets/js/app.js`
- `assets/js/ui.js`
- `assets/js/data.js`
- `README.md`
- `docs/INTERFAZ_VISUAL_V6_3.md` (nuevo)
