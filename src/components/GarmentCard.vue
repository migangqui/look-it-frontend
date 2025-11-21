<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative group cursor-pointer"
    @click="$emit('click', garment)"
  >
    <!-- Delete Button -->
    <button
      @click.stop="$emit('delete', garment.id)"
      class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
      title="Delete garment"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Garment Image -->
    <div class="aspect-square bg-gray-100 overflow-hidden">
      <img
        :src="garment.storage_url || '/placeholder.jpg'"
        :alt="garment.name || 'Garment'"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
    </div>

    <!-- Garment Info -->
    <div class="p-4">
      <h3 class="font-semibold text-gray-800 mb-1 truncate uppercase">
        {{ garment.role || 'Unnamed Garment' }}
      </h3>
      <p class="text-sm text-gray-600 mb-2">
        {{ garment.type || 'Uncategorized' }}
      </p>
      <p v-if="garment.occasion" class="text-xs text-gray-500 mb-2 italic">
        {{ garment.occasion }}
      </p>
      <div v-if="garment.color" class="flex items-center gap-2 mb-2">
        <div
          class="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
          :style="{ backgroundColor: garment.color }"
          :title="garment.color">
        </div>
      </div>
      <p class="text-xs text-gray-500">
        {{ formatDate(garment.creation_date) }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  garment: {
    type: Object,
    required: true
  }
});

defineEmits(['click', 'delete']);

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function handleImageError(event) {
  // Set a placeholder image or hide the broken image
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
}
</script>

