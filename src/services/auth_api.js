export async function loginWithGoogle(token) {
  // Llamada al backend para validar el token
  return fetch('/api/v1/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  });
}
