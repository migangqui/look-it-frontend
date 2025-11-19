<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
    <div class="flex flex-col items-center justify-center space-y-4 px-4">
      <!-- Logo verde oscuro -->
      <img src="/src/images/logo_transparente.png" alt="Logo Look-It" class="w-72 h-auto" />
      
      <!-- Mensaje de bienvenida -->
      <h2 v-if="authStore.isAuthenticated" class="text-2xl font-bold text-gray-900">Welcome Back!</h2>
      
      <!-- Texto descriptivo -->
      <p v-if="!authStore.isAuthenticated" class="text-gray-500 text-base text-center max-w-md">
        Sign in to continue to your digital wardrobe.
      </p>
      
      <!-- Botón de login -->
      <div class="mt-6">
        <AuthButton v-if="!authStore.isAuthenticated" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthButton from '../components/AuthButton.vue';
import { authStore } from '../stores/auth_store.js';
</script>