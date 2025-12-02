<template>
  <div class="w-full">
    <!-- Heading -->
    <h2 class="text-2xl font-bold text-gray-800 mb-2">Add New Items to Your Wardrobe</h2>
    <p class="text-gray-600 mb-6">Upload images of your clothes and we'll help you organize them.</p>

    <!-- Upload Area -->
    <div
      class="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors"
      :class="{
        'border-green-400 bg-green-50': isDragging,
        'border-gray-300': !isDragging && state === 'idle',
        'border-green-500': state === 'success',
        'border-red-400': state === 'error'
      }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <!-- Preview Image -->
      <div v-if="previewUrl && state !== 'uploading'" class="mb-4">
        <img
          :src="previewUrl"
          alt="Preview"
          class="max-h-48 mx-auto rounded-lg object-cover"
        />
      </div>

      <!-- Cloud Icon -->
      <div v-if="!previewUrl || state === 'uploading'" class="flex justify-center mb-4">
        <svg
          v-if="state !== 'uploading'"
          class="w-16 h-16 text-color-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <!-- Loading Spinner -->
        <svg
          v-else
          class="animate-spin w-16 h-16 text-green-500"
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

      <!-- Instructions -->
      <div v-if="state === 'idle' || state === 'uploading'" class="mb-4">
        <p class="text-lg font-semibold text-gray-800 mb-2">Drag & Drop your image here</p>
        <p class="text-sm text-gray-600">or click to browse your file</p>
      </div>

      <!-- Success Message -->
      <div v-if="state === 'success'" class="mb-4">
        <p class="text-lg font-semibold text-green-600 mb-2">Upload successful!</p>
        <p class="text-sm text-gray-600">Your garment has been added to your wardrobe.</p>
      </div>

      <!-- Error Message -->
      <div v-if="state === 'error'" class="mb-4">
        <p class="text-lg font-semibold text-red-600 mb-2">Upload failed</p>
        <p class="text-sm text-red-500">{{ errorMessage }}</p>
      </div>

      <!-- Select Files Button -->
      <button
        v-if="state === 'idle'"
        type="button"
        class="mt-4 bg-color-7 hover:bg-color-5 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
        @click.stop="triggerFileInput"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        Select File
      </button>

      <!-- Upload Button -->
      <button
        v-if="selectedFile && state === 'idle'"
        type="button"
        class="mt-4 bg-color-3 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="state === 'uploading'"
        @click.stop="handleUpload"
      >
        Upload
      </button>

      <!-- Hidden File Input -->
      <input
        ref="fileInput"
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        class="hidden"
        @change="onFileChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { uploadGarment } from '../services/garment_api.js';

const emit = defineEmits(['garment-uploaded']);

const fileInput = ref(null);
const selectedFile = ref(null);
const previewUrl = ref(null);
const isDragging = ref(false);
const state = ref('idle'); // 'idle' | 'uploading' | 'success' | 'error'
const errorMessage = ref('');

const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];

function triggerFileInput() {
  fileInput.value?.click();
}

function validateFile(file) {
  if (!validTypes.includes(file.type)) {
    errorMessage.value = 'Please select a valid image file (JPEG, PNG, WebP or AVIF)';
    state.value = 'error';
    setTimeout(() => {
      resetState();
    }, 3000);
    return false;
  }
  return true;
}

function handleFileSelect(file) {
  if (!validateFile(file)) {
    return;
  }

  selectedFile.value = file;
  
  // Create preview
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
  previewUrl.value = URL.createObjectURL(file);
  state.value = 'idle';
  errorMessage.value = '';
}

function onFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    handleFileSelect(file);
  }
}

function handleDragOver(e) {
  e.preventDefault();
  isDragging.value = true;
}

function handleDragLeave(e) {
  e.preventDefault();
  isDragging.value = false;
}

function handleDrop(e) {
  e.preventDefault();
  isDragging.value = false;
  
  const file = e.dataTransfer.files[0];
  if (file) {
    handleFileSelect(file);
  }
}

async function handleUpload() {
  if (!selectedFile.value || state.value === 'uploading') {
    return;
  }

  try {
    state.value = 'uploading';
    errorMessage.value = '';

    const garmentData = await uploadGarment(selectedFile.value);
    
    state.value = 'success';
    emit('garment-uploaded', garmentData);

    // Reset after 2 seconds
    setTimeout(() => {
      resetState();
    }, 2000);
  } catch (error) {
    state.value = 'error';
    errorMessage.value = error.message || 'Error uploading garment. Please try again.';
    
    // Reset after 3 seconds
    setTimeout(() => {
      resetState();
    }, 3000);
  }
}

function resetState() {
  state.value = 'idle';
  selectedFile.value = null;
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }
  errorMessage.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}
</script>
