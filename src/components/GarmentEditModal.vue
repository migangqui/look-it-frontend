<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="handleClose"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-modal-in">
      <!-- Modal Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold text-gray-800">Edit Garment</h3>
        <button
          @click="handleClose"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            class="w-6 h-6"
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
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSave" class="space-y-4">
        <!-- Type Field -->
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <input
            id="type"
            v-model="formData.type"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-color-7 focus:border-transparent"
            placeholder="e.g., T-shirt, Jeans, Jacket"
          />
        </div>

        <!-- Role Field -->
        <div>
          <label for="role" class="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            id="role"
            v-model="formData.role"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-color-7 focus:border-transparent"
          >
            <option value="">Select a role</option>
            <option value="top">Top</option>
            <option value="outwear">Outwear</option>
            <option value="bottom">Bottom</option>
            <option value="footwear">Footwear</option>
          </select>
        </div>

        <!-- Color Field -->
        <div>
          <label for="color" class="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <div class="flex items-center gap-3">
            <input
              id="color"
              v-model="colorHex"
              type="color"
              class="w-16 h-10 border border-gray-300 rounded-lg cursor-pointer"
              @input="handleColorChange"
            />
            <input
              v-model="formData.color"
              type="text"
              readonly
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
              placeholder="rgb(167.0,44.0,2.0)"
            />
          </div>
        </div>

        <!-- Occasion Field -->
        <div>
          <label for="occasion" class="block text-sm font-medium text-gray-700 mb-1">
            Occasion
          </label>
          <input
            id="occasion"
            v-model="formData.occasion"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-color-7 focus:border-transparent"
            placeholder="e.g., Casual, Formal, Sport"
          />
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            :disabled="isSaving"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-color-7 hover:bg-color-5 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            :disabled="isSaving || !isFormValid"
          >
            <svg
              v-if="isSaving"
              class="animate-spin w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isSaving ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  garment: {
    type: Object,
    default: null
  },
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'saved']);

const formData = ref({
  type: '',
  role: '',
  color: '',
  occasion: ''
});

const colorHex = ref('#000000');
const isSaving = ref(false);
const errorMessage = ref('');

const isFormValid = computed(() => {
  return formData.value.role !== '' && formData.value.color !== '';
});

// Watch for garment changes to populate form
watch(() => props.garment, (newGarment) => {
  if (newGarment) {
    formData.value = {
      type: newGarment.type || '',
      role: newGarment.role || '',
      color: newGarment.color || '',
      occasion: newGarment.occasion || ''
    };
    
    // Convert RGB string to hex for color picker
    if (formData.value.color) {
      colorHex.value = rgbStringToHex(formData.value.color);
    } else {
      colorHex.value = '#000000';
    }
  }
}, { immediate: true });

// Watch for show prop to reset form when modal opens
watch(() => props.show, (isShowing) => {
  if (isShowing && props.garment) {
    formData.value = {
      type: props.garment.type || '',
      role: props.garment.role || '',
      color: props.garment.color || '',
      occasion: props.garment.occasion || ''
    };
    
    if (formData.value.color) {
      colorHex.value = rgbStringToHex(formData.value.color);
    } else {
      colorHex.value = '#000000';
    }
    errorMessage.value = '';
  }
});

function hexToRgbString(hex) {
  // Convert hex to RGB and format as rgb(r.g,b)
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}.0,${g}.0,${b}.0)`;
}

function rgbStringToHex(rgbString) {
  // Convert rgb(r.g,b) to hex for color picker
  if (!rgbString) return '#000000';
  
  const match = rgbString.match(/rgb\((\d+)\.\d+,(\d+)\.\d+,(\d+)\.\d+\)/);
  if (!match) {
    // Try to parse without decimal part
    const match2 = rgbString.match(/rgb\((\d+),(\d+),(\d+)\)/);
    if (match2) {
      const r = parseInt(match2[1]).toString(16).padStart(2, '0');
      const g = parseInt(match2[2]).toString(16).padStart(2, '0');
      const b = parseInt(match2[3]).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    }
    return '#000000';
  }
  
  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

function handleColorChange() {
  formData.value.color = hexToRgbString(colorHex.value);
}

function handleClose() {
  if (!isSaving.value) {
    emit('close');
  }
}

async function handleSave() {
  if (!isFormValid.value || isSaving.value) {
    return;
  }

  // Validate role
  const validRoles = ['top', 'outwear', 'bottom', 'footwear'];
  if (!validRoles.includes(formData.value.role)) {
    errorMessage.value = 'Please select a valid role';
    return;
  }

  // Validate color format
  const colorRegex = /^rgb\(\d+\.\d+,\d+\.\d+,\d+\.\d+\)$/;
  if (!colorRegex.test(formData.value.color)) {
    errorMessage.value = 'Invalid color format';
    return;
  }

  try {
    isSaving.value = true;
    errorMessage.value = '';

    const updatedData = {
      type: formData.value.type || null,
      role: formData.value.role,
      color: formData.value.color,
      occasion: formData.value.occasion || null
    };

    emit('saved', updatedData);
  } catch (error) {
    errorMessage.value = error.message || 'Error saving garment';
  } finally {
    isSaving.value = false;
  }
}
</script>

<style scoped>
@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modal-in {
  animation: modal-in 0.2s ease-out;
}
</style>

