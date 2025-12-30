<template>
    <div class="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
        <div class="mb-6 flex items-start justify-between">
            <div>
                <h1 class="text-3xl font-bold text-gray-800">My Looks</h1>
                <p class="text-sm text-gray-500 mt-1">
                    Saved outfits based on your wardrobe and preferences comings
                    soon...
                </p>
            </div>
            <AddButton :is-open="showForm" @toggle="showForm = !showForm" />
        </div>

        <form
            v-if="showForm"
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 space-y-4 mb-8"
            @submit.prevent="handleSubmit"
        >
            <p class="text-black-500 mt-1">
                <i
                    >Generate outfit suggestions based on your location,
                    occasion and preferences.</i
                >
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Occasion</label
                    >
                    <select
                        v-model="form.occasion"
                        class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-color-3 focus:border-color-3"
                        required
                    >
                        <option value="casual">Casual</option>
                        <option value="formal">Formal</option>
                        <option value="all">All</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                        >City</label
                    >
                    <input
                        v-model="form.city"
                        type="text"
                        class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-color-3 focus:border-color-3"
                        placeholder="Madrid"
                        required
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Country</label
                    >
                    <select
                        v-if="countries.length"
                        v-model="form.country_code"
                        class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-color-3 focus:border-color-3"
                        :disabled="countriesLoading"
                        required
                    >
                        <option value="" disabled>Select a country</option>
                        <option
                            v-for="country in countries"
                            :key="country.code"
                            :value="country.code"
                        >
                            {{ country.name }}
                        </option>
                    </select>
                    <input
                        v-else
                        v-model="form.country_code"
                        type="text"
                        class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-color-3 focus:border-color-3"
                        placeholder="ES"
                        required
                    />
                    <p
                        v-if="countriesLoading"
                        class="mt-1 text-xs text-gray-500"
                    >
                        Loading countries...
                    </p>
                    <p
                        v-else-if="countriesError"
                        class="mt-1 text-xs text-red-600"
                    >
                        {{ countriesError }}
                    </p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Temperature (ºC, optional)
                    </label>
                    <input
                        v-model.number="form.temperature"
                        type="number"
                        step="0.1"
                        class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-color-3 focus:border-color-3"
                        placeholder="Leave empty to auto-detect"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Cold sensitivity (-1 to 1)
                    </label>
                    <input
                        v-model.number="form.cold_sensitivity"
                        type="number"
                        min="-1"
                        max="1"
                        step="1"
                        class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-color-3 focus:border-color-3"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Number of looks</label
                    >
                    <input
                        v-model.number="form.n_results"
                        type="number"
                        min="1"
                        max="3"
                        class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-color-3 focus:border-color-3"
                    />
                </div>
            </div>

            <div class="flex items-center justify-between pt-2">
                <p v-if="errorMessage" class="text-sm text-red-600">
                    {{ errorMessage }}
                </p>
                <button
                    type="submit"
                    class="ml-auto inline-flex items-center px-4 py-2 bg-color-3 text-white rounded-lg shadow hover:bg-color-2 transition-colors disabled:opacity-60"
                    :disabled="loading"
                >
                    <svg
                        v-if="loading"
                        class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                    <span>{{
                        loading ? "Generating looks..." : "Generate looks"
                    }}</span>
                </button>
            </div>
        </form>

        <div v-if="looks.length > 0" class="space-y-4">
            <div class="flex items-center justify-between">
                <h2 class="text-2xl font-semibold text-gray-800">
                    Suggested outfits
                </h2>
                <div class="flex items-center space-x-2">
                    <button
                        class="px-3 py-1 rounded-lg border text-sm text-gray-700 disabled:opacity-40"
                        :disabled="currentOutfitIndex === 0"
                        @click="prevOutfit"
                    >
                        Previous
                    </button>
                    <span class="text-sm text-gray-500">
                        Look {{ currentOutfitIndex + 1 }} of {{ looks.length }}
                    </span>
                    <button
                        class="px-3 py-1 rounded-lg border text-sm text-gray-700 disabled:opacity-40"
                        :disabled="currentOutfitIndex === looks.length - 1"
                        @click="nextOutfit"
                    >
                        Next
                    </button>
                </div>
            </div>

            <div
                class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
                <LookDisplay
                    v-for="garment in currentOutfit"
                    :key="garment._id"
                    :garment="garment"
                />
            </div>
        </div>

        <div
            v-else-if="!loading && hasRequested"
            class="text-center text-gray-500 mt-8"
        >
            No looks were found for the selected options.
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { createLook, fetchCountries } from "../services/look_api.js";
import LookDisplay from "../components/LookDisplay.vue";
import AddButton from "../components/AddButton.vue";

const form = reactive({
    occasion: "casual",
    city: "",
    country_code: "",
    temperature: "",
    cold_sensitivity: 0,
    n_results: 3,
});

const loading = ref(false);
const errorMessage = ref("");
const looks = ref([]);
const currentOutfitIndex = ref(0);
const hasRequested = ref(false);
const showForm = ref(true);
const countries = ref([]);
const countriesLoading = ref(false);
const countriesError = ref("");

const currentOutfit = computed(() => {
    if (!looks.value.length) {
        return [];
    }
    return looks.value[currentOutfitIndex.value] || [];
});

onMounted(async () => {
    countriesLoading.value = true;
    countriesError.value = "";

    try {
        const response = await fetchCountries();
        countries.value = Array.isArray(response) ? response : [];
    } catch (err) {
        console.error("Error fetching countries:", err);
        countriesError.value = err.message || "Error fetching countries.";
    } finally {
        countriesLoading.value = false;
    }
});

async function handleSubmit() {
    errorMessage.value = "";

    if (!form.city || !form.country_code || !form.occasion) {
        errorMessage.value = "Please fill in occasion, city and country code.";
        return;
    }

    loading.value = true;

    try {
        const payload = {
            occasion: form.occasion,
            city: form.city,
            country_code: form.country_code,
            temperature: form.temperature,
            cold_sensitivity: form.cold_sensitivity,
            n_results: form.n_results,
        };

        const response = await createLook(payload);
        looks.value = Array.isArray(response) ? response : [];
        currentOutfitIndex.value = 0;
        hasRequested.value = true;
        showForm.value = false;
    } catch (err) {
        console.error("Error creating looks:", err);
        errorMessage.value = err.message || "Error generating looks.";
    } finally {
        loading.value = false;
    }
}

function prevOutfit() {
    if (currentOutfitIndex.value > 0) {
        currentOutfitIndex.value -= 1;
    }
}

function nextOutfit() {
    if (currentOutfitIndex.value < looks.value.length - 1) {
        currentOutfitIndex.value += 1;
    }
}
</script>
