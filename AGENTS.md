# Directrices del repositorio

## Estructura del proyecto y organización de módulos
- `src/` contiene los puntos de entrada de Vue 3 (`main.js`, `App.vue`), el router, estilos compartidos y el `style.css` impulsado por Tailwind.
- Los widgets reutilizables están agrupados en `src/components/`, los helpers de API en `src/services/`, las stores en `src/stores/` y las páginas completas en `src/views/`. Mantén las piezas nuevas dentro de estas carpetas.
- La configuración permanece en la raíz (`vite.config.js`, `tailwind.config.js`, `postcss.config.js`) junto con `index.html` y los markdown de apoyo.

## Comandos de compilación, pruebas y desarrollo
- `npm install`: instala la cadena de herramientas Vite + Vue + Tailwind referenciada en `package.json`.
- `npm run dev`: inicia el servidor de desarrollo de Vite con el `VITE_API_BASE_URL` predeterminado.
- `npm run dev:local`: igual que el anterior pero fuerza `VITE_API_BASE_URL=http://localhost:8000` para apuntar a la API local.
- `npm run build`: genera los artefactos de producción dentro de `dist/`.
- `npm run preview`: ejecuta el sitio construido localmente para validar el paquete antes de desplegar.

## Estilo de código y convenciones de nombres
- JavaScript usa módulos ES con indentación de dos espacios y comillas simples para imports/cadenas (ver `src/main.js` y `src/router.js`).
- Los componentes de archivo único de Vue usan nombres en PascalCase (por ejemplo, `GarmentUpload.vue`, `HomeView.vue`); usa kebab-case para nombres de clases CSS al escribir utilidades de Tailwind.
- Mantén los helpers de API (`services/`) y las stores (`stores/`) como módulos JS planos que exportan funciones u objetos nombrados; prefiere nombres descriptivos que reflejen los endpoints del backend (por ejemplo, `garment_api.js` contiene `fetchGarments`).
- Todavía no hay un formateador comprometido; ejecuta `npm run dev` o `build` y confía en las preferencias de linting de la comunidad (estilo Tailwind + Vue) cuando crees archivos nuevos.

## Directrices de pruebas
- No hay una suite de pruebas configurada (no existe un script `test` ni un framework en `package.json`). Valida los cambios manualmente con `npm run dev` o `npm run preview`.
- Al agregar pruebas en el futuro, prefiere frameworks compatibles con Vite (Vitest/Jest) y refleja la jerarquía de `src/` para los archivos de prueba (por ejemplo, `src/services/garment_api.test.js`).

## Directrices de commits y pull requests
- Los mensajes de commit combinan prefijos convencionales y frases descriptivas (por ejemplo, `feat: implement wardrobe view` o `Improve garment components`). Mantén los commits enfocados y menciona números de issue si existen.
- Los PRs deben explicar qué se construyó, describir cómo verificarlo localmente e incluir capturas de pantalla cuando haya cambios de UI. Vincula issues o tareas relacionadas en la descripción para que los revisores sepan el contexto.

## Notas de configuración
- Mantén los secretos fuera del repositorio; `dev:local` muestra cómo sobreescribir `VITE_API_BASE_URL` sin comprometer archivos env.
- Las utilidades de Tailwind se configuran en `tailwind.config.js`; añade nuevos colores o tipografías allí en lugar de estilos individuales cuando surjan patrones reutilizables.
