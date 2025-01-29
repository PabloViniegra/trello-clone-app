<script setup lang="ts">
import type { Column } from "@/column/interfaces/Column";
import AddIcon from "@/shared/components/icons/AddIcon.vue";
import { ref } from "vue";
import CreateColumnModal from "@/column/components/CreateColumnModal.vue";
import BoardColumn from "@/dashboard/components/BoardColumn.vue";


// Props
interface Props {
  columns: Column[];
  createMutation: (params: {
    board_id: string;
    column: Omit<Column, "id">;
  }) => void;
  isPendingMutation: boolean;
  boardId: string;
  patchMutation: (params: {
    columnId: string;
    column: Omit<Column, "id">;
  }) => void;
  isPendingPatch: boolean;
  deleteMutation: (columnId: string) => void;
}
const {
  columns,
  createMutation,
  isPendingMutation,
  boardId,
  isPendingPatch,
  patchMutation,
  deleteMutation
} = defineProps<Props>();

const isModalOpen = ref(false);

const deleteColumn = (columnId: string) => {
  deleteMutation(columnId);
};
</script>
<template>
  <main>
    <section
      class="flex flex-row justify-start w-full overflow-x-auto bg-zinc-200 my-2 rounded-md"
    >
      <div class="flex flex-row gap-4 p-4">
        <article
          class="w-[300px] h-screen overflow-y-auto bg-border/60 outline-1 outline-white m-3 rounded-md flex-shrink-0"
        >
          <header
            class="flex flex-col justify-center items-center mt-16 gap-y-4"
          >
            <h5 class="text-text font-bold font-sans text-lg">
              Create a new column
            </h5>
            <AddIcon
              :custom-class="'size-15 text-text hover:text-white hover:cursor-pointer'"
              @click="isModalOpen = true"
            />
          </header>
        </article>
        <BoardColumn
          v-for="column in columns"
          :key="column.id"
          :column="column"
          :isPendingPatch="isPendingPatch"
          :patchMutation="patchMutation"
          @delete-column="deleteColumn"
        />
      </div>
    </section>

    <CreateColumnModal
      v-if="isModalOpen"
      :boardId="boardId"
      :createMutation="createMutation"
      :isPendingMutation="isPendingMutation"
      @close="isModalOpen = false"
    />
  </main>
</template>
