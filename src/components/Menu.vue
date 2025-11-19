<template>
  <nav class="w-full bg-color-2 text-white shadow-md fixed top-0 left-0 z-50">
    <div class="container mx-auto flex items-center justify-between h-16 px-4">
      <div class="flex items-center gap-3">
        <img src="/src/images/iso_transparente_negativo.png" alt="Logo Look-It" class="h-10 w-auto" />
        <span class="text-white font-semibold text-lg">Look-it</span>
      </div>
      <button @click="toggleMenu" class="md:hidden focus:outline-none text-white" aria-label="Abrir menú">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <ul :class="[
        menuOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-color-2 py-4 px-6 z-40' : 'hidden',
        'md:flex md:flex-row md:items-center md:space-x-6 md:static md:w-auto md:bg-transparent md:py-0 md:px-0 md:z-auto'
      ]">
        <li>
          <router-link to="/" class="hover:underline block py-2 md:py-0 text-white" @click="closeMenu">Inicio</router-link>
        </li>
        <li v-if="authStore.isAuthenticated">
          <router-link to="/profile" class="hover:underline block py-2 md:py-0 text-white" @click="closeMenu">Perfil</router-link>
        </li>
        <li v-if="authStore.isAuthenticated">
          <button @click="handleLogout" class="hover:underline block py-2 md:py-0 bg-transparent border-none text-white cursor-pointer">Logout</button>
        </li>
        <!-- Puedes agregar más enlaces aquí -->
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '../stores/auth_store.js';

export default {
  name: 'Menu',
  setup() {
    const menuOpen = ref(false);
    const router = useRouter();
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };
    const closeMenu = () => {
      menuOpen.value = false;
    };
    const handleLogout = () => {
      authStore.logout();
      closeMenu();
      router.push('/');
    };
    return { menuOpen, toggleMenu, closeMenu, handleLogout, authStore };
  },
};
</script>
