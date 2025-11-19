// src/services/user_api.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { authStore } from '../stores/auth_store.js';

export async function getAuthUser() {
  // Llamada al backend para obtener usuarios
  const response = await fetch(`${BASE_URL}/api/v1/users/me`, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`,
    }
  });
  if (!response.ok) throw new Error('Error to obtain user');
  const data = await response.json();
  return data;
}
