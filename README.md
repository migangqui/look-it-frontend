# Look-It Frontend

Este proyecto es la interfaz frontend de la aplicación Look-It, desarrollada con Vue.js y Vite. Utiliza Tailwind CSS para estilos y está organizado en una estructura modular para facilitar el desarrollo y mantenimiento.

## Estructura del proyecto

```
frontend_tasks.md
index.html
init_frontend.md
package.json
postcss.config.js
tailwind.config.js
vite.config.js
src/
  App.vue
  main.js
  router.js
  style.css
  components/
    AuthButton.vue
    GarmentUpload.vue
    LookDisplay.vue
  services/
    auth_api.js
    garment_api.js
  stores/
    auth_store.js
  views/
    HomeView.vue
    ProfileView.vue
```

## Comandos principales

### Instalar dependencias
```zsh
npm install
```

### Ejecutar el servidor de desarrollo
```zsh
npm run dev
```

### Compilar para producción
```zsh
npm run build
```

### Previsualizar la build de producción
```zsh
npm run preview
```

## Configuración adicional
- **Tailwind CSS**: Configurado en `tailwind.config.js` y `postcss.config.js`.
- **Vite**: Configuración en `vite.config.js`.

## Notas
- El código fuente principal se encuentra en la carpeta `src/`.
- Los componentes reutilizables están en `src/components/`.
- Las vistas principales están en `src/views/`.
- Los servicios de API están en `src/services/`.
- El manejo de estado está en `src/stores/`.

---
