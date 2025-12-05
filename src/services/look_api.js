import { apiRequest } from './api_client.js';
import { authStore } from '../stores/auth_store.js';

function authHeaders(overrides = {}) {
  return {
    Authorization: `Bearer ${authStore.token || ''}`,
    ...overrides
  };
}

export async function createLook(payload) {
  const body = { ...payload };

  if (body.temperature === '' || body.temperature === null || body.temperature === undefined) {
    delete body.temperature;
  }

  return apiRequest('/api/v1/looks', {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  });
}

export async function fetchCountries() {
  return apiRequest('/api/v1/countries', {
    method: 'GET',
    headers: authHeaders()
  });
}
