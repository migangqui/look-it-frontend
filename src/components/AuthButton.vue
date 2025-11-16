<template>
  <button class="bg-color-1 text-white px-4 py-2 rounded shadow hover:bg-color-2 flex items-center gap-2" @click="signInWithGoogle">
    <span class="inline-block w-5 h-5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
        <g>
          <path fill="#fff" d="M24 9.5c3.54 0 6.7 1.23 9.19 3.25l6.85-6.85C36.13 2.36 30.45 0 24 0 14.64 0 6.4 5.48 2.44 13.44l7.98 6.21C12.13 13.13 17.62 9.5 24 9.5z"/>
          <path fill="#fff" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.5c-.54 2.9-2.18 5.36-4.65 7.04l7.2 5.6C43.98 37.13 46.1 31.33 46.1 24.5z"/>
          <path fill="#fff" d="M10.42 28.65c-1.13-3.36-1.13-6.94 0-10.3l-7.98-6.21C.64 16.36 0 20.07 0 24c0 3.93.64 7.64 2.44 11.06l7.98-6.21z"/>
          <path fill="#fff" d="M24 48c6.45 0 12.13-2.13 16.54-5.81l-7.2-5.6c-2.01 1.35-4.59 2.16-7.34 2.16-6.38 0-11.87-3.63-14.58-8.94l-7.98 6.21C6.4 42.52 14.64 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </g>
      </svg>
    </span>
    Iniciar sesión con Google
  </button>
</template>
<script setup>
function signInWithGoogle() {
  // Lógica para Google Sign-In
}
</script>
