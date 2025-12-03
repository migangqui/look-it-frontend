# Cierre de sesión al recibir respuestas no autorizadas

## Objetivo
- Cuando cualquier petición a la API devuelva un 401, cerrar automáticamente la sesión del usuario, redirigir a la ruta de login y mostrar un mensaje de error claro.

## Pasos
1. **Centralizar el manejo de errores**: Revisa `src/services/*_api.js` para encontrar el wrapper compartido de `fetch`/`axios`; si no existe, crea un helper pequeño que todos los servicios usen para manejar respuestas y lanzar errores estructurados.
2. **Detectar respuestas 401**: En ese helper, después de parsear la respuesta HTTP, comprueba si `response.status === 401`. Si es así, activa el flujo de cierre de sesión antes de relanzar el error para que las llamadas no sigan con credenciales obsoletas.
3. **Implementar efectos secundarios del cierre de sesión**: Usa `auth_store.js` para limpiar tokens/flags de sesión almacenados. Añade (o reutiliza) un método como `authStore.logout()` que restablezca `isAuthenticated` y cualquier información de usuario persistida.
4. **Redirigir y mostrar mensaje**: Desde el helper o un guardia global del router, invoca `router.push('/')` después del logout y usa una notificación compartida o banner de error (por ejemplo, una store reactiva o evento) para mostrar “Sesión expirada, inicia sesión de nuevo” o un texto similar.
5. **Asegurar que el usuario vea el estado más reciente**: Cuando se monte la pantalla de login, lee cualquier mensaje de error compartido y muéstralo de forma destacada (toast/banner).
6. **Probar manualmente**: Simula un 401 desde el backend (mockea la API o codifica temporalmente una respuesta) para confirmar que la app cierra sesión, redirige y muestra el error.

## Notas
- Mantén el mensaje corto y en inglés para alinearlo con el tono deseado.
- Busca un único lugar para manejar los 401 de forma que los servicios futuros hereden el comportamiento sin código adicional.
