# Inicialización del Frontend: Armario Inteligente y Generación de Looks

Este documento define la estructura inicial propuesta para el frontend del proyecto, basada en Vue (Mobile First) y orientada a la digitalización y gestión inteligente de prendas.

## Tareas de Setup (Frontend)

Las siguientes tareas fundacionales para el frontend están extraídas del plan general del proyecto:

- **Instalar y configurar Tailwind CSS** en el proyecto Vue, incluyendo el archivo `tailwind.config.js`.

## Estructura de Carpetas y Archivos

```
/src
├── /components
│   ├── AuthButton.vue              # Botón de Google Sign-In
│   ├── GarmentUpload.vue           # Componente para la subida de fotos
│   └── LookDisplay.vue             # Componente para mostrar el look generado
├── /views
│   ├── ProfileView.vue             # Armario y perfil del usuario
│   └── HomeView.vue                # Landing page principal
├── /stores
│   └── auth_store.js               # Manejo del estado de autenticación
└── /services
    ├── auth_api.js                 # Llamadas a /api/v1/auth
    └── garment_api.js              # Llamadas a /api/v1/garment y /look
/ (Raíz del proyecto)
└── tailwind.config.js              # Configuración de Tailwind CSS
```

## Descripción de Componentes Clave

- **/components/**: Componentes reutilizables para autenticación, subida de prendas y visualización de looks.
- **/views/**: Vistas principales de la aplicación (perfil/armario y home).
- **/stores/**: Gestión del estado global, especialmente autenticación.
- **/services/**: Módulos para la comunicación con el backend (API REST).
- **tailwind.config.js**: Configuración de Tailwind CSS para estilos responsivos y mobile first.

## Consideraciones Técnicas

- El frontend gestionará el flujo de Google Sign-In y enviará el token al backend para validación.
- El diseño será mobile first, utilizando utilidades de Tailwind CSS para responsividad.
- La subida de imágenes se realizará desde el frontend, enviando los archivos al backend para procesamiento.
- El estado de autenticación se mantendrá centralizado y reactivo.

---