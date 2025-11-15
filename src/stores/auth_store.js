import { reactive } from 'vue';

export const authStore = reactive({
  isAuthenticated: false,
  user: null,
  setUser(user) {
    this.user = user;
    this.isAuthenticated = !!user;
  },
  logout() {
    this.user = null;
    this.isAuthenticated = false;
  }
});
