<script setup lang="ts">
import { ref } from "vue";
import type { TaskCreate } from "@/task/interfaces/Task";

// Props
interface Props {
  createMutation: (params: { column_id: string; task: TaskCreate }) => void;
  columnId: string;
  isPendingMutation: boolean;
}

const { createMutation, columnId, isPendingMutation } = defineProps<Props>();
const emit = defineEmits(["close"]);

// Reactive properties
const title = ref("");
const content = ref("");

// Methods
const handleCreateTask = () => {
  if (!title.value.trim() || !content.value.trim()) return;
  createMutation({ column_id: columnId, task: { title: title.value, content: content.value } });
  title.value = "";
  content.value = "";
  emit("close");
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
    <div class="bg-card p-6 rounded-lg shadow-xl w-96">
      <header class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-primary">Create Task</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-black transition-all">
          ✖
        </button>
      </header>

      <div class="mb-4">
        <label class="text-sm font-semibold text-gray-600">Title</label>
        <input
          v-model="title"
          type="text"
          placeholder="Task title"
          class="w-full p-2 mt-1 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/80"
        />
      </div>

      <div class="mb-4">
        <label class="text-sm font-semibold text-gray-600">Description</label>
        <textarea
          v-model="content"
          placeholder="Task description"
          class="w-full p-2 mt-1 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/80 resize-none"
          rows="4"
        ></textarea>
      </div>

      <footer class="flex justify-end">
        <button
          @click="handleCreateTask"
          :disabled="isPendingMutation"
          class="px-4 py-2 bg-secondary text-white rounded-md disabled:opacity-50 flex items-center gap-x-2 transition-all hover:bg-secondary/90"
        >
          <svg
            v-if="isPendingMutation"
            class="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0h2a10 10 0 00-20 0h2z"></path>
          </svg>
          <span>{{ isPendingMutation ? "Creating..." : "Create" }}</span>
        </button>
      </footer>
    </div>
  </div>
</template>
