import { apiRequest } from './api_client.js';
import { authStore } from '../stores/auth_store.js';

function authHeaders(overrides = {}) {
  return {
    Authorization: `Bearer ${authStore.token || ''}`,
    ...overrides
  };
}

export async function getAuthUser() {
  return apiRequest('/api/v1/users/me', {
    headers: authHeaders()
  });
}
