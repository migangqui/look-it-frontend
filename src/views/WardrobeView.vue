<template>
  <div class="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-800">My Wardrobe</h1>
      <!-- New Garment Button -->
      <button
        @click="toggleUploadForm"
        class="bg-color-7 hover:bg-color-5 text-white w-12 h-12 rounded-full font-medium transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
      >
        <svg
          v-if="!showUploadForm"
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
    </div>

    <!-- Garment Upload Component -->
    <div v-if="showUploadForm" class="mb-8 transition-all duration-300">
      <GarmentUpload @garment-uploaded="handleGarmentUploaded" />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <svg
        class="animate-spin w-12 h-12 text-green-500"
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
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <p class="text-red-600 font-semibold">Error loading garments</p>
      <p class="text-red-500 text-sm mt-1">{{ error }}</p>
      <button
        @click="loadGarments"
        class="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
      >
        Try Again
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading && garments.length === 0" class="text-center py-12">
      <svg
        class="w-24 h-24 text-gray-300 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
      <p class="text-xl font-semibold text-gray-600 mb-2">Your wardrobe is empty</p>
      <p class="text-gray-500">Upload your first garment to get started!</p>
    </div>

    <!-- Garments Grid -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      <div
        v-for="garment in garments"
        :key="garment.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative group"
      >
        <!-- Delete Button -->
        <button
          @click="handleDeleteGarment(garment.id)"
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
    </div>

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="fixed bottom-4 right-4 bg-color-3 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in"
    >
      {{ successMessage }}
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="closeDeleteModal"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-modal-in">
        <!-- Modal Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-800">Confirmar eliminación</h3>
          <button
            @click="closeDeleteModal"
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
        <div class="mb-6">
          <p class="text-gray-600">
            ¿Estás seguro de que deseas eliminar esta prenda? Esta acción no se puede deshacer.
          </p>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end gap-3">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getGarments, deleteGarment } from '../services/garment_api.js';
import GarmentUpload from '../components/GarmentUpload.vue';

const garments = ref([]);
const loading = ref(true);
const error = ref(null);
const successMessage = ref('');
const showUploadForm = ref(false);
const showDeleteModal = ref(false);
const garmentToDelete = ref(null);

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

async function loadGarments() {
  try {
    loading.value = true;
    error.value = null;
    garments.value = await getGarments();
  } catch (err) {
    error.value = err.message || 'Error al cargar las prendas';
    console.error('Error loading garments:', err);
  } finally {
    loading.value = false;
  }
}

function toggleUploadForm() {
  showUploadForm.value = !showUploadForm.value;
}

async function handleGarmentUploaded(garmentData) {
  // Reload the garments list
  await loadGarments();
  
  // Hide upload form after successful upload
  showUploadForm.value = false;
  
  // Show success message
  successMessage.value = 'Garment uploaded successfully!';
  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
}

function handleDeleteGarment(garmentId) {
  garmentToDelete.value = garmentId;
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
  garmentToDelete.value = null;
}

async function confirmDelete() {
  if (!garmentToDelete.value) {
    return;
  }

  try {
    await deleteGarment(garmentToDelete.value);
    await loadGarments();
    
    // Close modal
    closeDeleteModal();
    
    // Show success message
    successMessage.value = 'Garment deleted successfully!';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (err) {
    error.value = err.message || 'Error al eliminar la prenda';
    console.error('Error deleting garment:', err);
    
    // Close modal even on error
    closeDeleteModal();
    
    // Clear error after 3 seconds
    setTimeout(() => {
      error.value = null;
    }, 3000);
  }
}

onMounted(() => {
  loadGarments();
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-modal-in {
  animation: modal-in 0.2s ease-out;
}
</style>

