export async function loginWithGoogle(token) {
  // Llamada al backend para validar el token
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_token: token })
  });
  const data = await response.json();
  console.log('Login response data:', data);
  return data;
}