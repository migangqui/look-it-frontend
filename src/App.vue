<template>
  <div class="min-h-screen flex flex-col">
    <Menu />
    <main class="flex-1 pt-16">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
<script setup>
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';
</script>
