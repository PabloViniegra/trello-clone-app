<script setup lang="ts">
import type { Column } from "@/column/interfaces/Column";
import { ref, type Ref } from "vue";

// Props
interface Props {
  createMutation: (params: {
    board_id: string;
    column: Omit<Column, "id">;
  }) => void;
  boardId: string;
  isPendingMutation: boolean;
}
const { createMutation, isPendingMutation, boardId } = defineProps<Props>();

// Emits
const emit = defineEmits(["close"]);

// Reactive properties
const columnName = ref("");

// Methods
const handleCreateColumn = () => {
  if (!columnName.value.trim()) return;
  createMutation({ board_id: boardId, column: { name: columnName.value } });
  columnName.value = "";
  emit("close");
};
</script>
<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm w-screen h-screen"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-lg">
      <header class="flex justify-between items-center">
        <h3 class="text-xl font-bold">Create Column</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-black">
          ✖
        </button>
      </header>

      <div class="mt-4">
        <input
          v-model="columnName"
          type="text"
          placeholder="Column name"
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <footer class="mt-4 flex justify-end">
        <button
          @click="handleCreateColumn"
          :disabled="isPendingMutation"
          class="px-4 py-2 bg-secondary text-white rounded-md disabled:opacity-50"
        >
          {{ isPendingMutation ? "Creating..." : "Create" }}
        </button>
      </footer>
    </div>
  </div>
</template>
