<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">My Profile</h1>
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
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-GB', options);
  }

  onMounted(async () => {
    try {
      const userData = await getAuthUser();
      user.value = userData;
    } catch (err) {
      user.value = null;
    }
  });
</script>
