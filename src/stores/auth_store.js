import { reactive } from 'vue';

const savedToken = localStorage.getItem('auth_token');

export const authStore = reactive({
  isAuthenticated: !!savedToken,
  token: savedToken,
  sessionMessage: null,
  setToken(token) {
    this.token = token;
    this.isAuthenticated = !!token;
    this.sessionMessage = null;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  },
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.sessionMessage = null;
    localStorage.removeItem('auth_token');
  },
  setSessionMessage(message) {
    this.sessionMessage = message;
  },
  clearSessionMessage() {
    this.sessionMessage = null;
  }
});
