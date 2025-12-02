# Instrucciones de Implementación: Edición de Prendas

## Objetivo
Implementar un sistema de edición de prendas mediante un modal que permita editar los campos `type`, `role`, `color` y `occasion` de una prenda. El modal debe aparecer automáticamente después de subir una prenda y también al hacer clic en cualquier prenda de la lista.

## Pasos de Implementación

### 1. Crear el Componente de Modal de Edición

**Archivo:** `src/components/GarmentEditModal.vue`

Crear un nuevo componente que contendrá:
- Un modal con overlay oscuro
- Formulario con los siguientes campos:
  - **type**: Campo de texto (input)
  - **role**: Select con opciones: `top`, `outwear`, `bottom`, `footwear`
  - **color**: Selector de color RGB que guarda el formato `rgb(167.0,44.0,2.0)`
  - **occasion**: Campo de texto (input)
- Botones de acción: "Guardar" y "Cancelar"
- Manejo de estados de carga y errores

**Características del selector de color:**
- Debe permitir seleccionar un color RGB
- El formato de guardado debe ser exactamente: `rgb(r.g,b)` donde r, g, b son números decimales con un decimal (ej: `rgb(167.0,44.0,2.0)`)
- Puede usar un input type="color" nativo o una librería de color picker

**Props del componente:**
- `garment`: Objeto con los datos de la prenda a editar
- `show`: Boolean para controlar la visibilidad del modal

**Events del componente:**
- `@close`: Emitido al cerrar el modal
- `@saved`: Emitido cuando se guarda exitosamente, debe incluir los datos actualizados

### 2. Agregar función PATCH en garment_api.js

**Archivo:** `src/services/garment_api.js`

Agregar una nueva función `updateGarment`:

```javascript
export async function updateGarment(garmentId, garmentData) {
  const response = await fetch(`${BASE_URL}/api/v1/garments/${garmentId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${authStore.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(garmentData)
  });
  
  if (!response.ok) {
    throw new Error('Error updating garment');
  }
  
  const data = await response.json();
  return data;
}
```

**Nota:** El endpoint será el mismo que el de DELETE pero con método PATCH: `/api/v1/garments/{garmentId}`

**Datos a enviar en el body:**
- `type`: string
- `role`: string (uno de: `top`, `outwear`, `bottom`, `footwear`)
- `color`: string en formato `rgb(r.g,b)` (ej: `rgb(167.0,44.0,2.0)`)
- `occasion`: string

### 3. Modificar GarmentUpload.vue

**Archivo:** `src/components/GarmentUpload.vue`

Modificar la función `handleUpload` para emitir el evento con los datos completos de la prenda después de un POST exitoso:

- Asegurarse de que el evento `garment-uploaded` incluya todos los datos de la prenda devueltos por el servidor, incluyendo el `id` de la prenda.

### 4. Modificar WardrobeView.vue

**Archivo:** `src/views/WardrobeView.vue`

#### 4.1. Importar el nuevo componente y la función de API

```javascript
import GarmentEditModal from '../components/GarmentEditModal.vue';
import { getGarments, deleteGarment, updateGarment } from '../services/garment_api.js';
```

#### 4.2. Agregar estado para el modal

Agregar las siguientes refs:
- `showEditModal`: Boolean para controlar la visibilidad del modal
- `garmentToEdit`: Objeto que contiene la prenda que se está editando

#### 4.3. Modificar handleGarmentUploaded

Después de que se suba una prenda exitosamente:
1. Cerrar el formulario de upload
2. Abrir el modal de edición con los datos de la prenda recién subida
3. Mostrar el mensaje de éxito después de guardar en el modal

#### 4.4. Agregar handler para abrir modal desde la lista

Agregar un evento `@click` en cada elemento de la grilla de prendas (en el div principal del card) que:
- Abra el modal de edición
- Establezca `garmentToEdit` con los datos de la prenda seleccionada

**Nota:** Asegurarse de que el botón de eliminar no active el modal (usar `@click.stop` en el botón de eliminar).

#### 4.5. Agregar handler para guardar cambios

Crear una función `handleGarmentSaved` que:
1. Llame a `updateGarment` con el ID y los datos actualizados
2. Recargue la lista de prendas con `loadGarments()`
3. Cierre el modal
4. Muestre un mensaje de éxito

#### 4.6. Agregar el componente al template

Agregar el componente `GarmentEditModal` en el template con:
- `v-if="showEditModal"`
- `:garment="garmentToEdit"`
- `:show="showEditModal"`
- `@close` para cerrar el modal
- `@saved` para manejar el guardado

### 5. Detalles de Implementación del Selector de Color

**Formato RGB requerido:**
- El color debe guardarse como string en formato: `rgb(r.g,b)` donde:
  - `r`, `g`, `b` son valores numéricos con un decimal
  - Ejemplo válido: `rgb(167.0,44.0,2.0)`
  - No usar espacios después de las comas
  - Los valores deben estar en el rango 0.0 - 255.0

**Opciones de implementación:**
1. **Input nativo HTML5:** Usar `<input type="color">` y convertir el valor hexadecimal a RGB
2. **Librería externa:** Usar una librería como `vue-color` o `@vueuse/core` si está disponible
3. **Implementación custom:** Crear un selector RGB personalizado con inputs numéricos para R, G, B

**Función de conversión sugerida:**
```javascript
function hexToRgbString(hex) {
  // Convertir hex a RGB y formatear como rgb(r.g,b)
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}.0,${g}.0,${b}.0)`;
}

function rgbStringToHex(rgbString) {
  // Convertir rgb(r.g,b) a hex para el color picker
  const match = rgbString.match(/rgb\((\d+)\.\d+,(\d+)\.\d+,(\d+)\.\d+\)/);
  if (!match) return '#000000';
  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}
```

### 6. Estructura del Select de Role

El campo `role` debe ser un `<select>` con las siguientes opciones:
- `top`
- `outwear`
- `bottom`
- `footwear`

Cada opción debe tener un label legible para el usuario (puede usar mayúsculas o formato título).

### 7. Validaciones

- Validar que el campo `role` sea uno de los valores permitidos
- Validar que el formato del color sea correcto antes de enviar
- Mostrar mensajes de error apropiados si la actualización falla

### 8. Estilos y UX

- El modal debe tener un diseño consistente con el resto de la aplicación
- Incluir animaciones de entrada/salida similares a las del modal de confirmación de eliminación
- El overlay debe cerrar el modal al hacer clic fuera de él
- El botón de cerrar (X) debe estar visible en la esquina superior derecha
- Mostrar estado de carga mientras se guarda

## Resumen de Archivos a Modificar/Crear

1. **NUEVO:** `src/components/GarmentEditModal.vue` - Componente del modal de edición
2. **MODIFICAR:** `src/services/garment_api.js` - Agregar función `updateGarment`
3. **MODIFICAR:** `src/views/WardrobeView.vue` - Integrar el modal y manejar eventos
4. **MODIFICAR:** `src/components/GarmentUpload.vue` - Asegurar que emite datos completos (opcional, verificar)

## Flujo de Usuario

1. **Después de subir una prenda:**
   - Usuario sube imagen → POST exitoso → Modal de edición se abre automáticamente → Usuario edita campos → Guarda → Modal se cierra → Lista se actualiza

2. **Al hacer clic en una prenda existente:**
   - Usuario hace clic en una prenda de la lista → Modal de edición se abre con datos actuales → Usuario edita campos → Guarda → Modal se cierra → Lista se actualiza

## Notas Adicionales

- El campo `occasion` puede estar vacío inicialmente si no viene del servidor
- Si el color no está definido, usar un valor por defecto o permitir que el usuario lo seleccione
- El modal debe manejar el caso donde la prenda no tiene todos los campos definidos
- Considerar agregar validación del lado del cliente antes de enviar al servidor

