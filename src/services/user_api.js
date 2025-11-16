// src/services/user_api.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getUsers() {
  // Llamada al backend para obtener usuarios
  const response = await fetch(`${BASE_URL}/api/v1/test/users`);
  if (!response.ok) throw new Error('Error al obtener usuarios');
  const data = await response.json();
  return Array.isArray(data) ? data : (data.users || []);
}
