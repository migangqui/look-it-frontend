<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-3 flex flex-col items-center">
    <div class="w-24 h-24 mb-2 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
      <img
        v-if="garment.image_name"
        :src="imageUrl"
        :alt="garment.type || 'Garment'"
        class="w-full h-full object-cover"
      />
      <span v-else class="text-xs text-gray-400 text-center px-2">No image</span>
    </div>
    <div class="text-center space-y-1">
      <p class="text-sm font-semibold text-gray-800">
        {{ garment.type || 'Garment' }}
        <span v-if="garment.role" class="text-xs text-gray-500">({{ (garment.role || 'Unnamed Garment').replaceAll('_', ' ') }})</span>
      </p>
      <p v-if="garment.color" class="text-xs text-gray-600">
        Color: {{ garment.color }}
      </p>
      <p class="text-xs text-gray-500">
        Occasion: {{ garment.occasion || 'all' }}
      </p>
      <p v-if="garment.warmth !== undefined" class="text-xs text-gray-500">
        Warmth: {{ garment.warmth }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  garment: {
    type: Object,
    required: true
  }
});

const imageUrl = computed(() => props.garment.image_name || '');
</script>
