import { reactive } from 'vue';

const savedToken = localStorage.getItem('auth_token');

export const authStore = reactive({
  isAuthenticated: !!savedToken,
  token: savedToken,
  setToken(token) {
    this.token = token;
    this.isAuthenticated = !!token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  },
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    localStorage.removeItem('auth_token');
  }
});
