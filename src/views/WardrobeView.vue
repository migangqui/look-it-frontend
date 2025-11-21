<template>
  <div class="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-800">My Wardrobe</h1>
      <!-- New Garment Button -->
      <GarmentAddButton :is-open="showUploadForm" @toggle="toggleUploadForm" />
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
      <GarmentCard
        v-for="garment in garments"
        :key="garment.id"
        :garment="garment"
        @click="handleGarmentClick"
        @delete="handleDeleteGarment"
      />
    </div>

    <!-- Edit Modal -->
    <GarmentEditModal
      v-if="showEditModal"
      :garment="garmentToEdit"
      :show="showEditModal"
      @close="closeEditModal"
      @saved="handleGarmentSaved"
    />

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="fixed bottom-4 right-4 bg-color-3 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in"
    >
      {{ successMessage }}
    </div>

    <!-- Delete Confirmation Modal -->
    <GarmentDeleteModal
      :show="showDeleteModal"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getGarments, deleteGarment, updateGarment } from '../services/garment_api.js';
import GarmentUpload from '../components/GarmentUpload.vue';
import GarmentEditModal from '../components/GarmentEditModal.vue';
import GarmentCard from '../components/GarmentCard.vue';
import GarmentDeleteModal from '../components/GarmentDeleteModal.vue';
import GarmentAddButton from '../components/GarmentAddButton.vue';

const garments = ref([]);
const loading = ref(true);
const error = ref(null);
const successMessage = ref('');
const showUploadForm = ref(false);
const showDeleteModal = ref(false);
const garmentToDelete = ref(null);
const showEditModal = ref(false);
const garmentToEdit = ref(null);

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
  // Hide upload form after successful upload
  showUploadForm.value = false;
  
  // Open edit modal with the newly uploaded garment
  garmentToEdit.value = garmentData;
  showEditModal.value = true;
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

function handleGarmentClick(garment) {
  garmentToEdit.value = garment;
  showEditModal.value = true;
}

function closeEditModal() {
  showEditModal.value = false;
  garmentToEdit.value = null;
}

async function handleGarmentSaved(updatedData) {
  if (!garmentToEdit.value || !garmentToEdit.value.id) {
    return;
  }

  try {
    await updateGarment(garmentToEdit.value.id, updatedData);
    await loadGarments();
    
    // Close modal
    closeEditModal();
    
    // Show success message
    successMessage.value = 'Garment updated successfully!';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (err) {
    error.value = err.message || 'Error updating garment';
    console.error('Error updating garment:', err);
    
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

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>

