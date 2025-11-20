# Feature: Digitalización de Prendas (MVP)

## Descripción General

### Historia de Usuario 2: Digitalización de Prendas (MVP)

**Objetivo**: Permitir a los usuarios digitalizar sus prendas de ropa subiendo imágenes, visualizarlas en su perfil y gestionar su armario digital.

**Alcance del MVP**:
- Subir imágenes de prendas de ropa
- Visualizar lista de prendas en el perfil del usuario
- Eliminar prendas del armario
- Mostrar información básica de cada prenda (imagen, nombre, categoría, fecha de subida)

**Dependencias**:
- ✅ Fase 2 completada: Autenticación funcionando
- ✅ Backend con endpoints `/api/v1/garments` (POST), `/api/v1/garments` (GET) y `/api/v1/garments/{id}` (DELETE) implementados

---

## Tareas Técnicas

### A. Servicio API (`src/services/garment_api.js`)

#### A.1. Completar función `uploadGarment(file)`

**Estado actual**: Función básica sin configuración completa

**Acciones requeridas**:
- [ ] Importar `authStore` para obtener el token de autenticación
- [ ] Usar `VITE_API_BASE_URL` de `import.meta.env` (consistente con `user_api.js` y `auth_api.js`)
- [ ] Agregar header `Authorization: Bearer {token}` en la petición
- [ ] Implementar manejo de errores con validación de respuesta
- [ ] Retornar datos parseados de la respuesta JSON

**Ejemplo de implementación esperada**:
```javascript
import { authStore } from '../stores/auth_store.js';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function uploadGarment(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${BASE_URL}/api/v1/garment`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authStore.token}`,
    },
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('Error al subir la prenda');
  }
  
  const data = await response.json();
  return data;
}
```

#### A.2. Crear función `getGarments()`

**Acciones requeridas**:
- [ ] Crear función para obtener lista de prendas del usuario autenticado
- [ ] Endpoint: `GET /api/v1/garments`
- [ ] Incluir header de autenticación Bearer token
- [ ] Manejar errores de respuesta
- [ ] Retornar array de prendas parseado

**Ejemplo de implementación esperada**:
```javascript
export async function getGarments() {
  const response = await fetch(`${BASE_URL}/api/v1/garments`, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`,
    }
  });
  
  if (!response.ok) {
    throw new Error('Error al obtener las prendas');
  }
  
  const data = await response.json();
  return data;
}
```

#### A.3. Crear función `deleteGarment(garmentId)`

**Acciones requeridas**:
- [ ] Crear función para eliminar una prenda por su ID
- [ ] Endpoint: `DELETE /api/v1/garments/{id}`
- [ ] Incluir header de autenticación Bearer token
- [ ] Manejar errores de respuesta
- [ ] Retornar confirmación de eliminación

**Ejemplo de implementación esperada**:
```javascript
export async function deleteGarment(garmentId) {
  const response = await fetch(`${BASE_URL}/api/v1/garments/${garmentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authStore.token}`,
    }
  });
  
  if (!response.ok) {
    throw new Error('Error al eliminar la prenda');
  }
  
  return true;
}
```

---

### B. Componente GarmentUpload (`src/components/GarmentUpload.vue`)

#### B.1. Implementar UI completa con Tailwind CSS

**Estado actual**: Componente básico con input de archivo sin funcionalidad

**Acciones requeridas**:

- [ ] **Input de archivo estilizado**:
  - Usar clases de Tailwind para diseño moderno
  - Ocultar input nativo y crear botón personalizado
  - Agregar iconos o indicadores visuales

- [ ] **Preview de imagen antes de subir**:
  - Mostrar preview de la imagen seleccionada antes de confirmar subida
  - Usar `URL.createObjectURL()` para mostrar preview local
  - Limpiar preview al cambiar de archivo o después de subir

- [ ] **Botón de subida**:
  - Botón deshabilitado cuando no hay archivo seleccionado
  - Estilos con Tailwind CSS
  - Feedback visual al hacer hover

- [ ] **Indicador de carga durante la subida**:
  - Mostrar spinner o indicador de progreso
  - Deshabilitar botones durante la subida
  - Estado visual claro de "subiendo"

- [ ] **Mensajes de éxito/error**:
  - Mostrar mensaje de éxito tras subida exitosa
  - Mostrar mensaje de error si falla la subida
  - Usar colores de Tailwind (verde para éxito, rojo para error)

#### B.2. Validación de archivos

**Acciones requeridas**:
- [ ] Configurar atributo `accept` en el input: `accept="image/jpeg,image/jpg,image/png,image/webp"`
- [ ] Validación en JavaScript antes de subir:
  - Verificar tipo MIME del archivo
  - Mostrar error si el archivo no es una imagen válida
  - Mensaje de error claro al usuario

**Ejemplo de validación**:
```javascript
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
if (!validTypes.includes(file.type)) {
  // Mostrar error
}
```

#### B.3. Integración con servicio API

**Acciones requeridas**:
- [ ] Importar función `uploadGarment` de `garment_api.js`
- [ ] Llamar a la función al hacer clic en "Subir"
- [ ] Manejar promesas con async/await o .then/.catch
- [ ] Limpiar estado después de subida exitosa

#### B.4. Emitir evento al componente padre

**Acciones requeridas**:
- [ ] Emitir evento `@garment-uploaded` o similar tras subida exitosa
- [ ] Pasar datos de la prenda subida en el evento (opcional)
- [ ] Permitir al componente padre recargar la lista de prendas

**Ejemplo**:
```javascript
const emit = defineEmits(['garment-uploaded']);

// Después de subida exitosa:
emit('garment-uploaded', garmentData);
```

#### B.5. Manejo de estados

**Acciones requeridas**:
- [ ] Crear estado reactivo para: `idle`, `uploading`, `success`, `error`
- [ ] Actualizar estado según el flujo de subida
- [ ] Mostrar UI correspondiente según el estado actual
- [ ] Resetear estado después de un tiempo en `success` o `error`

**Estructura de estados sugerida**:
```javascript
const state = ref('idle'); // 'idle' | 'uploading' | 'success' | 'error'
const errorMessage = ref('');
const previewUrl = ref(null);
```

---

### C. Vista ProfileView (`src/views/ProfileView.vue`)

#### C.1. Integrar componente GarmentUpload

**Acciones requeridas**:
- [ ] Importar componente `GarmentUpload.vue`
- [ ] Agregar componente en el template
- [ ] Escuchar evento de prenda subida para recargar lista
- [ ] Posicionar componente en sección apropiada de la vista

#### C.2. Crear sección para mostrar lista de prendas

**Acciones requeridas**:

- [ ] **Grid o lista con imágenes de prendas**:
  - Usar grid de Tailwind CSS (ej: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`)
  - Cada prenda en una tarjeta (card) con Tailwind
  - Imágenes responsivas con `object-cover`

- [ ] **Mostrar información de cada prenda**:
  - **Imagen**: Usar `url_imagen` o campo equivalente del objeto prenda
  - **Nombre**: Mostrar nombre de la prenda
  - **Categoría**: Mostrar categoría (ej: "Camiseta", "Pantalón", etc.)
  - **Fecha de subida**: Formatear fecha legible (ej: "15 de enero, 2024")
  - Usar tipografía y espaciado de Tailwind

- [ ] **Botón de eliminar por cada prenda**:
  - Botón con icono de eliminar
  - Posicionado en la tarjeta de cada prenda
  - Estilos de Tailwind (ej: botón rojo pequeño)
  - Confirmación antes de eliminar (usar `confirm()` o modal)

#### C.3. Cargar prendas al montar el componente

**Acciones requeridas**:
- [ ] Importar función `getGarments` de `garment_api.js`
- [ ] Crear estado reactivo para almacenar array de prendas
- [ ] Llamar a `getGarments()` en `onMounted`
- [ ] Manejar errores al cargar prendas

**Ejemplo**:
```javascript
import { ref, onMounted } from 'vue';
import { getGarments } from '../services/garment_api.js';

const garments = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    loading.value = true;
    garments.value = await getGarments();
  } catch (err) {
    error.value = 'Error al cargar las prendas';
  } finally {
    loading.value = false;
  }
});
```

#### C.4. Recargar lista después de subir nueva prenda

**Acciones requeridas**:
- [ ] Crear función `loadGarments()` reutilizable
- [ ] Llamar a `loadGarments()` cuando se emita evento de prenda subida
- [ ] Mostrar feedback visual al usuario (ej: mensaje de éxito)

**Ejemplo**:
```javascript
const handleGarmentUploaded = async () => {
  await loadGarments();
  // Mostrar mensaje de éxito
};
```

#### C.5. Implementar eliminación de prendas

**Acciones requeridas**:
- [ ] Importar función `deleteGarment` de `garment_api.js`
- [ ] Crear función `handleDeleteGarment(garmentId)`
- [ ] Mostrar confirmación antes de eliminar
- [ ] Llamar a `deleteGarment()` y recargar lista tras éxito
- [ ] Manejar errores de eliminación

**Ejemplo**:
```javascript
const handleDeleteGarment = async (garmentId) => {
  if (!confirm('¿Estás seguro de eliminar esta prenda?')) {
    return;
  }
  
  try {
    await deleteGarment(garmentId);
    await loadGarments();
    // Mostrar mensaje de éxito
  } catch (err) {
    // Mostrar mensaje de error
  }
};
```

#### C.6. Manejar estados de carga y error

**Acciones requeridas**:
- [ ] Mostrar spinner o skeleton mientras cargan las prendas
- [ ] Mostrar mensaje si no hay prendas
- [ ] Mostrar mensaje de error si falla la carga
- [ ] Usar clases de Tailwind para estos estados

#### C.7. Usar Tailwind CSS para el diseño

**Acciones requeridas**:
- [ ] Aplicar clases de Tailwind consistentes en toda la vista
- [ ] Diseño responsivo (mobile-first)
- [ ] Espaciado y tipografía consistentes
- [ ] Colores del tema de la aplicación

---

### D. Consideraciones Adicionales

#### D.1. Manejo de errores consistente

**Acciones requeridas**:
- [ ] Manejar errores de red (fetch falla)
- [ ] Manejar errores de autenticación (401)
- [ ] Manejar errores del servidor (500, etc.)
- [ ] Mostrar mensajes de error claros y amigables al usuario
- [ ] Logging de errores para debugging (opcional: `console.error`)

#### D.2. Formateo de fechas

**Acciones requeridas**:
- [ ] Crear función helper para formatear fechas
- [ ] Formato legible en español (ej: "15 de enero, 2024")
- [ ] Usar `Date` API de JavaScript o librería como `date-fns` (si se agrega)
- [ ] Manejar diferentes formatos de fecha del backend

**Ejemplo de función helper**:
```javascript
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
}
```

#### D.3. Confirmación antes de eliminar prenda

**Acciones requeridas**:
- [ ] Usar `window.confirm()` o implementar modal personalizado
- [ ] Mensaje claro: "¿Estás seguro de eliminar esta prenda?"
- [ ] Prevenir eliminación accidental

#### D.4. Feedback visual al usuario

**Acciones requeridas**:
- [ ] Mensajes de éxito/error visibles
- [ ] Transiciones suaves con Tailwind (opcional)
- [ ] Indicadores de carga claros
- [ ] Estados hover en elementos interactivos

**Opciones de implementación**:
- Mensajes inline en el componente
- Toast notifications (requeriría librería adicional)
- Banner de estado en la parte superior

---

## Estructura de Datos Esperada

### Respuesta del endpoint `GET /api/v1/garments`

**Formato esperado**:
```json
[
  {
    "id": 1,
    "name": "Camiseta blanca",
    "category": "Camiseta",
    "image_url": "https://example.com/images/garment1.jpg",
    "created_at": "2024-01-15T10:30:00Z",
    "user_id": 123
  },
  {
    "id": 2,
    "name": "Pantalón vaquero",
    "category": "Pantalón",
    "image_url": "https://example.com/images/garment2.jpg",
    "created_at": "2024-01-14T15:20:00Z",
    "user_id": 123
  }
]
```

### Respuesta del endpoint `POST /api/v1/garment`

**Formato esperado**:
```json
{
  "id": 3,
  "name": "Vestido azul",
  "category": "Vestido",
  "image_url": "https://example.com/images/garment3.jpg",
  "created_at": "2024-01-16T09:15:00Z",
  "user_id": 123
}
```

### Estructura de objeto de prenda

**Campos esperados**:
- `id` (number): Identificador único de la prenda
- `name` (string): Nombre de la prenda
- `category` (string): Categoría de la prenda (ej: "Camiseta", "Pantalón", "Vestido")
- `image_url` (string): URL de la imagen de la prenda
- `created_at` (string): Fecha de creación en formato ISO 8601
- `user_id` (number): ID del usuario propietario

**Nota**: Si la estructura del backend difiere, ajustar los componentes según los campos reales recibidos.

---

## Checklist de Implementación

### Servicio API
- [ ] Completar `uploadGarment()` con autenticación y manejo de errores
- [ ] Crear `getGarments()` con autenticación y manejo de errores
- [ ] Crear `deleteGarment()` con autenticación y manejo de errores
- [ ] Verificar consistencia con otros servicios API (`user_api.js`, `auth_api.js`)

### Componente GarmentUpload
- [ ] Implementar UI completa con Tailwind CSS
- [ ] Agregar preview de imagen
- [ ] Implementar validación de tipos de archivo
- [ ] Integrar con servicio API
- [ ] Implementar estados (idle, uploading, success, error)
- [ ] Emitir evento al componente padre
- [ ] Manejar errores y mostrar mensajes

### Vista ProfileView
- [ ] Integrar componente GarmentUpload
- [ ] Crear grid/lista de prendas con Tailwind
- [ ] Mostrar información completa de cada prenda
- [ ] Implementar carga de prendas al montar
- [ ] Implementar recarga después de subir
- [ ] Implementar eliminación de prendas
- [ ] Agregar confirmación antes de eliminar
- [ ] Manejar estados de carga y error
- [ ] Formatear fechas correctamente

### Testing y Validación
- [ ] Probar subida de prenda exitosa
- [ ] Probar subida con archivo inválido
- [ ] Probar carga de lista de prendas
- [ ] Probar eliminación de prenda
- [ ] Probar manejo de errores (sin conexión, sin autenticación, etc.)
- [ ] Verificar diseño responsivo en diferentes tamaños de pantalla
- [ ] Verificar que los estados visuales funcionan correctamente

---

## Notas de Implementación

- Todos los componentes deben usar **Tailwind CSS** para estilos
- Mantener consistencia con el código existente (ej: uso de Composition API, estructura de servicios)
- Seguir patrones establecidos en `AuthButton.vue` y `ProfileView.vue` existentes
- Asegurar que todas las peticiones incluyan el token de autenticación
- Manejar casos edge: lista vacía, errores de red, timeouts, etc.

---

## Referencias

- Archivo de tareas: `.context/frontend_tasks.md` (líneas 19-24)
- Servicio API existente: `src/services/garment_api.js`
- Componente existente: `src/components/GarmentUpload.vue`
- Vista existente: `src/views/ProfileView.vue`
- Ejemplos de servicios: `src/services/user_api.js`, `src/services/auth_api.js`
- Store de autenticación: `src/stores/auth_store.js`

