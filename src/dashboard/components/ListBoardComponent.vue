<script setup lang="ts">
import type { Board } from "@/dashboard/interfaces/Board";
import router from "@/router";
import AddIcon from "@/shared/components/icons/AddIcon.vue";
import RightIcon from "@/shared/components/icons/RightIcon.vue";
import SaveIcon from "@/shared/components/icons/SaveIcon.vue";
import EditIcon from "@/shared/components/icons/EditIcon.vue";
import { defineEmits, ref } from "vue";
import DeleteIcon from "@/shared/components/icons/DeleteIcon.vue";

// Props y Emits
interface Props {
  boards: Board[];
}
const { boards } = defineProps<Props>();
const emit = defineEmits(["openModal", "updateBoard", "deleteBoard"]);

// Propiedades reactivas
const editingBoardId = ref<string | null>(null);
const boardNames = ref<Record<string, string>>({});
const hoveredBoardId = ref<string | null>(null);

// Métodos
const enableEditing = (board: Board) => {
  editingBoardId.value = board.id;
  boardNames.value[board.id] = board.name;
};

const saveBoardName = (board: Board) => {
  if (
    !boardNames.value[board.id]?.trim() ||
    boardNames.value[board.id] === board.name
  ) {
    editingBoardId.value = null;
    return;
  }

  emit("updateBoard", { name: boardNames.value[board.id], id: board.id });
  editingBoardId.value = null;
};

const goTo = (id: string) => {
  router.push({ name: "SingleBoard", params: { id } });
};
</script>

<template>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 justify-center bg-white/80 min-h-[700px] h-auto rounded-xl mx-2 shadow-lg"
    @click.self="editingBoardId = null"
  >
    <article
      class="bg-card rounded-xl shadow-md p-5 w-full sm:w-64 h-56 flex flex-col justify-center items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg animate-fade-in hover:bg-gray-200/50 hover:cursor-pointer"
      @click="emit('openModal')"
    >
      <AddIcon class="size-20 sm:size-24 text-secondary" />
      <p
        class="mt-2 text-gray-700 font-semibold font-geist py-1 px-3 bg-border/20 rounded-full text-center"
      >
        Create a new board
      </p>
    </article>

    <article
      v-for="board in boards"
      :key="board.id"
      class="bg-card rounded-xl shadow-md p-5 w-full sm:w-64 h-56 flex flex-col justify-center items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg animate-fade-in hover:cursor-pointer relative group"
    >
      <header
        class="flex flex-row justify-end w-full absolute top-3 right-3 gap-x-3 items-center"
      >
        <button
          @click.stop="emit('deleteBoard', board.id)"
          class="absolute top-0 right-12 text-red-500 hover:text-red-700 transition-all duration-200 sm:hidden"
        >
          <DeleteIcon class="size-6 sm:size-7" />
        </button>
        <button
          class="absolute top-0 right-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700 hidden sm:flex"
          @click.stop="emit('deleteBoard', board.id)"
        >
          <DeleteIcon class="size-7" />
        </button>
        <RightIcon
          class="size-6 sm:size-7 text-sky-300 hover:scale-105 hover:outline-none hover:outline-black/50 hover:outline-1 hover:rounded-lg transition-all duration-500"
          @click="goTo(board.id)"
        />
      </header>

      <div class="flex items-center space-x-2">
        <input
          v-if="editingBoardId === board.id"
          v-model="boardNames[board.id]"
          class="text-lg sm:text-xl font-bold font-geist text-primary text-center bg-transparent border-b border-primary focus:outline-none transition-all"
          @keyup.enter="saveBoardName(board)"
          @click.stop
        />
        <h3
          v-else
          class="text-lg sm:text-xl font-bold font-geist text-primary text-center cursor-pointer"
          @dblclick="enableEditing(board)"
        >
          {{ board.name }}
        </h3>
        <EditIcon
          v-if="editingBoardId !== board.id"
          class="size-4 sm:size-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          @click.stop="enableEditing(board)"
        />
      </div>

      <button
        v-if="editingBoardId === board.id"
        @click="saveBoardName(board)"
        class="absolute bottom-3 right-3 p-2 bg-primary/90 text-white font-bold rounded-full hover:bg-primary transition-all duration-200"
      >
        <SaveIcon class="size-4 sm:size-5" />
      </button>
    </article>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
