import { apiRequest } from './api_client.js';
import { authStore } from '../stores/auth_store.js';

function authHeaders(overrides = {}) {
  return {
    Authorization: `Bearer ${authStore.token || ''}`,
    ...overrides
  };
}

export async function uploadGarment(file) {
  const formData = new FormData();
  formData.append('file', file);

  return apiRequest('/api/v1/garments', {
    method: 'POST',
    headers: authHeaders(),
    body: formData
  });
}

export async function getGarments() {
  return apiRequest('/api/v1/garments', {
    headers: authHeaders()
  });
}

export async function deleteGarment(garmentId) {
  await apiRequest(`/api/v1/garments/${garmentId}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return true;
}

export async function updateGarment(garmentId, garmentData) {
  return apiRequest(`/api/v1/garments/${garmentId}`, {
    method: 'PATCH',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(garmentData)
  });
}
