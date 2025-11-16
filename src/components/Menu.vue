<template>
  <nav class="w-full bg-color-1 text-white shadow-md fixed top-0 left-0 z-50">
    <div class="container mx-auto flex items-center justify-between h-16 px-4">
  <img src="/src/images/iso_transparente_negativo.png" alt="Logo Look-It" class="h-12 w-auto" />
      <button @click="toggleMenu" class="md:hidden focus:outline-none" aria-label="Abrir menú">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <ul :class="['flex', 'space-x-6', 'md:flex', 'md:space-x-6', menuOpen ? 'flex-col absolute top-16 left-0 w-full bg-color-1 py-4 px-6 z-40' : 'hidden', 'md:static', 'md:w-auto', 'md:bg-transparent', 'md:py-0', 'md:px-0', 'md:z-auto']" >
        <li><router-link to="/" class="hover:underline block py-2 md:py-0">Inicio</router-link></li>
        <li><router-link to="/profile" class="hover:underline block py-2 md:py-0">Perfil</router-link></li>
        <!-- Puedes agregar más enlaces aquí -->
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Menu',
  setup() {
    const menuOpen = ref(false);
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };
    return { menuOpen, toggleMenu };
  },
};
</script>
