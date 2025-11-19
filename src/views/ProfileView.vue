<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Perfil y Armario</h1>
    <!-- Aquí se mostrarán las prendas del usuario -->
    <div v-if="email" class="mb-2">
      <span class="font-semibold">Email:</span> {{ email }}
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { getAuthUser } from '../services/user_api.js';

  const email = ref(null);

  onMounted(async () => {
    try {
      const user = await getAuthUser();
      email.value = user.email;
    } catch (error) {
      email.value = 'No disponible';
    }
  });
</script>
