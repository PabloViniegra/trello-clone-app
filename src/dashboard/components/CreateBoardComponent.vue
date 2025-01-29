<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["close", "createDashboard"]);
const boardName = ref("");

const handleCreate = () => {
  if (!boardName.value.trim()) return;

  emit("createDashboard", boardName.value);
  boardName.value = "";
};
</script>
<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg p-6 w-[400px] shadow-lg transition-all transform scale-100 animate-fade-in"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-geist font-semibold text-gray-800">Crear Pizarra</h2>
          <button
            class="text-gray-500 hover:text-red-500 transition"
            @click="emit('close')"
          >
            ✖
          </button>
        </div>

        <input
          v-model="boardName"
          type="text"
          placeholder="Nombre de la pizarra"
          class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-secondary font-sans"
        />

        <div class="flex justify-end mt-5 space-x-3">
          <button
            class="px-4 py-2 text-gray-500 hover:text-white font-sans hover:bg-red-900 rounded transition hover:cursor-pointer"
            @click="emit('close')"
          >
            Cancelar
          </button>
          <button
            class="px-4 py-2 bg-secondary text-white rounded hover:bg-emerald-600 hover:cursor-pointer transition font-sans"
            :disabled="!boardName.trim()"
            @click="handleCreate"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
