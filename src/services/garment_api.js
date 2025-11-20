import { authStore } from '../stores/auth_store.js';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function uploadGarment(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${BASE_URL}/api/v1/garments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authStore.token}`,
    },
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('Error uploading garment');
  }
  
  const data = await response.json();
  return data;
}

export async function getGarments() {
  const response = await fetch(`${BASE_URL}/api/v1/garments`, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`,
    }
  });
  
  if (!response.ok) {
    throw new Error('Error fetching garments');
  }
  
  const data = await response.json();
  return data;
}

export async function deleteGarment(garmentId) {
  const response = await fetch(`${BASE_URL}/api/v1/garments/${garmentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authStore.token}`,
    }
  });
  
  if (!response.ok) {
    throw new Error('Error deleting garment');
  }
  
  return true;
}
