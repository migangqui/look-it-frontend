# Feature: Creación de looks (`LooksView`)

Este documento define las tareas necesarias para implementar la vista de creación de looks y su integración con el backend.

## 1. Endpoint de creación de looks

- [ ] Crear un servicio en `src/services/look_api.js` (o similar) con una función `createLook(payload)` que:
  - [ ] Haga un `POST` a `/api/v1/looks`.
  - [ ] Envíe el cuerpo JSON con las propiedades:
    - `occasion` (string, requerido, p.ej. `"casual"`).
    - `city` (string, requerido, p.ej. `"Madrid"`).
    - `country_code` (string, requerido, p.ej. `"ES"`).
    - `temperature` (number, opcional, p.ej. `22.5`).
    - `cold_sensitivity` (number, opcional, por defecto `0`).
    - `n_results` (number, opcional, por defecto `3`).
  - [ ] Añada la cabecera `Authorization: Bearer <JWT>` obteniendo el token desde la sesión / store de autenticación (igual que en `src/services/garment_api.js`, no como parámetro explícito).
  - [ ] Gestione errores HTTP devolviendo información útil (status, mensaje, etc.).

- [ ] Asegurar que si `temperature` no se envía en el payload, simplemente se omite del JSON para que el backend la obtenga de OpenWeatherMap usando `city` y `country_code`.

Ejemplo de request objetivo:

```bash
curl -X POST "/api/v1/looks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_JWT_AQUI" \
  -d '{
    "occasion": "casual",
    "city": "Madrid",
    "country_code": "ES",
    "temperature": 22.5,
    "cold_sensitivity": 0,
    "n_results": 3
  }'
```

La respuesta esperada es una lista de outfits, y cada outfit es una lista de prendas (GarmentItem) serializadas:

```json
[
  [
    { "garment_1": "..." },
    { "garment_2": "..." }
  ],
  [
    { "garment_3": "..." }
  ],
  [
    { "garment_4": "..." }
  ]
]
```

## 2. Nueva vista `LooksView`

- [ ] Crear el componente `LooksView.vue` en `src/views/` siguiendo el estilo de los demás views (Vue 3 + script setup o composición existente).
- [ ] Registrar la ruta correspondiente en el router (p.ej. `/looks`) y añadirla a la navegación principal si aplica.

### 2.1 Formulario de creación de look

En `LooksView`:

- [ ] Añadir un formulario con los campos:
  - [ ] `occasion`: selector o input (p.ej. opciones `casual`, `formal`, `sport`, etc.).
  - [ ] `city`: input de texto requerido.
  - [ ] `country_code`: input corto (p.ej. `ES`, `US`), requerido.
  - [ ] `temperature`: input numérico opcional (puede dejarse vacío para que el backend consulte OpenWeatherMap).
  - [ ] `cold_sensitivity`: slider o input numérico (rango sugerido p.ej. `-2` a `+2`, por defecto `0`).
  - [ ] `n_results`: input numérico (por defecto `1`, mínimo `1`, máximo `3`).
- [ ] Añadir botón principal (p.ej. “Generar looks”):
  - [ ] Al pulsar, validar campos requeridos.
  - [ ] Construir el payload omitendo `temperature` si el campo está vacío.
  - [ ] Obtener el JWT (p.ej. desde una store de auth existente o donde se gestione el login).
  - [ ] Llamar al servicio `createLook`.
  - [ ] Gestionar estado de carga (`loading`) y errores (`errorMessage`).

## 3. Visualización de outfits devueltos

La respuesta es una lista de outfits, donde cada outfit es una lista de prendas:

```ts
type GarmentItem = {
  _id: string;
  user_id: string;
  image_name: string;
  type: string;
  role: string;
  color: string;
  occasion: string;
  warmth: number;
  pattern: string;
  pattern_intensity: number;
  creation_date: string;
};

type Outfit = GarmentItem[];
type LookResponse = Outfit[];
```

En `LooksView`:

- [ ] Guardar la respuesta en un estado local, p.ej. `const looks = ref<LookResponse>([])`.
- [ ] Mostrar una sección de resultados sólo cuando haya al menos un outfit.
- [ ] Implementar navegación entre outfits:
  - [ ] Índice actual `currentOutfitIndex` con valor inicial `0`.
  - [ ] Botones “Anterior” / “Siguiente” para cambiar de outfit respetando límites (no salir de rango).
  - [ ] Indicador de posición: p.ej. `Look 1 de 3`.

### 3.1 Render de cada outfit

- [ ] Para el outfit actual (`looks[currentOutfitIndex]`):
  - [ ] Renderizar cada `GarmentItem` en una tarjeta o componente reutilizable:
    - [ ] Si existe un componente de prenda (p.ej. `GarmentCard`, `GarmentItem.vue` o similar), reutilizarlo.
    - [ ] Si no existe, crear un componente sencillo en `src/components/` que reciba un `garment` y muestre:
      - [ ] Imagen (`image_name`).
      - [ ] Tipo / rol (`type`, `role`).
      - [ ] Color, ocasión y nivel de abrigo (`warmth`).
  - [ ] Acomodar las prendas en una disposición visual clara (grid / flex) usando clases de Tailwind.

## 4. Estados de UI y manejo de errores

- [ ] Mostrar un indicador de carga mientras se está llamando al endpoint (p.ej. spinner o texto “Generando looks…”).
- [ ] Mostrar mensajes de error si:
  - [ ] Falla la petición (problemas de red, 5xx).
  - [ ] El backend responde con error de validación o de autenticación (p.ej. 401 si falta JWT).
- [ ] Mostrar un mensaje amigable si la respuesta es una lista vacía (no se han encontrado combinaciones).
- [ ] Resetear el índice `currentOutfitIndex` a `0` cada vez que se obtenga un nuevo set de looks.

## 5. Autenticación y JWT

- [ ] Usar el mismo mecanismo que `src/services/garment_api.js` para obtener el JWT (p.ej. store de usuario, localStorage, etc.), de forma que:
  - [ ] El servicio `createLook` añada automáticamente la cabecera `Authorization` sin recibir el token como parámetro.
  - [ ] `LooksView` no gestione directamente el JWT, sólo llama al servicio.
- [ ] Asegurar que, si no hay JWT disponible, se mantiene el comportamiento global esperado (redirigir a login, mostrar aviso, etc.), reutilizando patrones ya existentes en la app.

## 6. Validación manual

- [ ] Levantar el frontend con `npm run dev` o `npm run dev:local`.
- [ ] Probar manualmente los siguientes escenarios:
  - [ ] Crear looks con temperatura informada.
  - [ ] Crear looks sin temperatura (el backend debería usar OpenWeatherMap).
  - [ ] Cambiar `occasion`, `city`, `country_code`, `cold_sensitivity` y `n_results` y verificar que la respuesta se actualiza.
  - [ ] Navegar entre varias combinaciones de outfits.
  - [ ] Comportamiento cuando no hay JWT o cuando el token es inválido.
