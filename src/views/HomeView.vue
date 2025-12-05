<template>
  <div class="flex flex-col items-center justify-center overflow-hidden py-16">
    <div class="flex flex-col items-center justify-center space-y-4 px-4">
      <!-- Logo verde oscuro -->
      <img src="https://storage.googleapis.com/look-it-storage/app/logos/logo_transparente.png" alt="Logo Look-It" class="w-72 h-auto" />

      <div v-if="sessionMessage" class="w-full max-w-md rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <span>{{ sessionMessage }}</span>
          <button
            type="button"
            class="text-xs font-semibold uppercase tracking-wide text-red-600 hover:text-red-800"
            @click="dismissSessionMessage"
          >
            dismiss
          </button>
        </div>
      </div>

      <!-- Mensaje de bienvenida -->
      <h2 v-if="authStore.isAuthenticated" class="text-2xl font-bold text-gray-900">Welcome Back!</h2>

      <!-- Texto descriptivo -->
      <p v-if="!authStore.isAuthenticated" class="text-base text-center max-w-md">
        Sign in to continue to your <b class="text-color-4">digital wardrobe</b>
      </p>

      <!-- Botón de login -->
      <div class="mt-6">
        <AuthButton v-if="!authStore.isAuthenticated" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, watch } from 'vue';
  import AuthButton from '../components/AuthButton.vue';
  import { authStore } from '../stores/auth_store.js';

  const sessionMessage = computed(() => authStore.sessionMessage);

  const dismissSessionMessage = () => {
    authStore.clearSessionMessage();
  };

  watch(
    sessionMessage,
    (message, _, onCleanup) => {
      if (!message) return;
      const timer = setTimeout(() => authStore.clearSessionMessage(), 6000);
      onCleanup(() => clearTimeout(timer));
    },
    { flush: 'post' }
  );
</script>
