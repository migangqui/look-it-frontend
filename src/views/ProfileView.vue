<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Profile</h1>
    <!-- Aquí se mostrarán las prendas del usuario -->
    <div v-if="user && user.email" class="mb-2">
      <span class="font-semibold">Email:</span> {{ user.email }}
    </div>
    <div v-if="user && user.creation_date" class="mb-2">
      <span class="font-semibold">Register date:</span> {{ formatDate(user.creation_date) }}
    </div>
    <div v-if="user && user.last_login_date" class="mb-2">
      <span class="font-semibold">Last login date:</span> {{ formatDate(user.last_login_date) }}
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import { getAuthUser } from '../services/user_api.js';

  const user = ref(null);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Formato: yyyy/MM/dd hh:MM usando métodos nativos de Date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes} UTC`;
  };

  onMounted(async () => {
    try {
      const userData = await getAuthUser();
      user.value = userData;
    } catch (err) {
      user.value = null;
    }
  });
</script>
