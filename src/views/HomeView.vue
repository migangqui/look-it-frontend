<template>
  <div class="min-h-screen p-4 flex flex-col items-center justify-center overflow-hidden">
  <img src="/src/images/logo_transparente.png" alt="Logo Look-It" class="mb-4 w-48 h-auto mx-auto" />
    <div class="mb-4 w-full flex justify-center">
      <AuthButton />
    </div>
    <!-- Landing page principal 
    <div v-if="loading" class="my-4">Cargando usuarios...</div>
    <div v-else>
      <table v-if="users.length" class="min-w-full bg-white border border-gray-200 rounded shadow mt-6">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">ID</th>
            <th class="py-2 px-4 border-b">Google ID</th>
            <th class="py-2 px-4 border-b">Email</th>
            <th class="py-2 px-4 border-b">Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="py-2 px-4 border-b">{{ user.id }}</td>
            <td class="py-2 px-4 border-b">{{ user.google_id }}</td>
            <td class="py-2 px-4 border-b">{{ user.email }}</td>
            <td class="py-2 px-4 border-b">{{ user.creation_date }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="mt-4 text-gray-500">No se encontraron usuarios.</div>
    </div>
    -->
  </div>
</template>
<script setup>
import AuthButton from '../components/AuthButton.vue';
import { ref, onMounted } from 'vue';
import { getUsers } from '../services/user_api.js';

const users = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    users.value = await getUsers();
  } catch (error) {
    console.error(error);
    users.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
