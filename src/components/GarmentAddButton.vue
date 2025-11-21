<template>
  <button
    @click="handleClick"
    class="bg-color-7 hover:bg-color-5 text-white w-12 h-12 rounded-full font-medium transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
  >
    <svg
      v-if="!isOpen"
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M12 4v16m8-8H4"
      />
    </svg>
    <svg
      v-else
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M20 12H4"
      />
    </svg>
  </button>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['toggle']);

function handleClick() {
  emit('toggle');
}
</script>

