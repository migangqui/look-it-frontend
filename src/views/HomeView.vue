<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Bienvenido a Look-It</h1>
    <AuthButton />
    <!-- Landing page principal -->
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
  </div>
</template>
<script setup>
import AuthButton from '../components/AuthButton.vue';
// Lógica para la landing page
import { ref, onMounted } from 'vue';

const users = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch('https://look-it-backend-service-fcm5ogal7q-no.a.run.app/api/v1/test/users');
    if (!response.ok) throw new Error('Error al obtener usuarios');
    const data = await response.json();
    users.value = Array.isArray(data) ? data : (data.users || []);
  } catch (error) {
    console.error(error);
    users.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
