import { authStore } from '../stores/auth_store.js';
import { router } from '../router.js';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SESSION_EXPIRED_MESSAGE = 'Session expired, please log in again';

function handleUnauthorized() {
  authStore.logout();
  authStore.setSessionMessage(SESSION_EXPIRED_MESSAGE);
  router.push('/');
}

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const contentType = response.headers.get('content-type') || '';
  let data = null;

  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (response.status === 401) {
    handleUnauthorized();
    const error = new Error('Unauthorized');
    error.status = 401;
    throw error;
  }

  if (!response.ok) {
    const message =
      data?.message || response.statusText || 'Request failed';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}
