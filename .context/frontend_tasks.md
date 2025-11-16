# Frontend Tasks: Armario Inteligente y Generación de Looks

## Fase 1: Setup / Fundacional

*   [X] **[Setup - Frontend Config]** Instalar y configurar Tailwind CSS en el proyecto Vue, incluyendo el archivo tailwind.config.js.

* * * * *

## Fase 2: Historia 1: Autenticación Rápida (MVP)

*   [ ] **[HU 1 Frontend]** Instalar y configurar la librería de Google Sign-In en el proyecto Vue.

*   [ ] **[HU 1 Frontend]** Crear el componente visual src/components/AuthButton.vue (usando Tailwind CSS) para gestionar el flujo de inicio de sesión con Google.

*   [ ] **[HU 1 Frontend]** Crear la *store* de autenticación (`src/stores/auth_store.js`) para manejar el estado del token.

* * * * *

### Fase 3: Historia 2: Digitalización de Prendas (MVP)

*   [ ] **[HU 2 Frontend]** Crear el componente `src/components/GarmentUpload.vue` con la interfaz de usuario para seleccionar y enviar archivos a la API.

*   [ ] **[HU 2 Frontend]** Implementar la vista src/views/ProfileView.vue para mostrar la lista de prendas del usuario (usando Tailwind CSS).

* * * * *

### Fase 4: Historia 3: Generación de Looks Automáticos (MVP)

*   [ ] **[HU 3 Frontend]** Crear el componente src/components/LookDisplay.vue para renderizar el look sugerido (usando Tailwind CSS).

*   [ ] **[HU 3 Frontend]** Integrar el botón "Generar Look" en `ProfileView.vue` que llama al *endpoint* `/generate` y usa `LookDisplay.vue` para mostrar el resultado.
