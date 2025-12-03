# Frontend Tasks: Additional Garment Fields for Look Creation

## 1. Modelo y API de prendas

- [ ] **Extender modelo de prenda en el frontend** para contemplar los campos opcionales devueltos por la API: `warmth` (1–5), `pattern` (`solid`, `stripes`, `checks`, `micro_print`, `print`) y `pattern_intensity` (1–3).
- [ ] **Verificar que `getGarments`** (`src/services/garment_api.js`) devuelve y propaga estos campos en todas las vistas que consumen la lista de prendas (especialmente `WardrobeView.vue`).
- [ ] **Asegurar que `updateGarment`** (`src/services/garment_api.js`) admite actualizaciones parciales de `warmth`, `pattern` y `pattern_intensity` cuando el usuario guarda cambios desde el modal de edición.

## 2. Edición de campos adicionales en la prenda

- [ ] **Actualizar `GarmentEditModal.vue`** para incluir controles de edición:
  - Selector o slider de `warmth` limitado a los valores 1–5.
  - Selector de `pattern` limitado a los valores del enum definido en `additional_garment_fields.md`.
  - Campo opcional `pattern_intensity` (selector o slider 1–3).
- [ ] **Inicializar el formulario** con los valores actuales de `warmth`, `pattern` y `pattern_intensity` cuando se abre el modal, utilizando los datos de `props.garment`.
- [ ] **Incluir los nuevos campos en `updatedData`** emitido en el evento `saved` para que `WardrobeView.vue` los envíe a `updateGarment`.
- [ ] **Agregar validaciones básicas** en el frontend:
  - `warmth` solo valores 1–5.
  - `pattern` solo uno de los valores admitidos.
  - `pattern_intensity` opcional, pero cuando exista solo valores 1–3.

## 3. Visualización de campos en el armario

- [ ] **Actualizar `GarmentCard.vue`** para mostrar los nuevos atributos de la prenda:
  - Indicador compacto de `warmth` (por ejemplo, número 1–5 o iconografía simple).
  - Texto legible para `pattern` (mapeando los valores del enum a etiquetas de UI).
  - Si se usa `pattern_intensity`, mostrarlo de forma discreta (p. ej. “Subtle / Medium / Strong”).
- [ ] **Asegurar consistencia visual** con el resto de la UI (Tailwind + colores definidos) y que la tarjeta no se rompa en pantallas pequeñas al añadir estos campos.

