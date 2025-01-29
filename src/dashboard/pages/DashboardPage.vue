<script setup lang="ts">
import CustomHeader from "@/shared/components/CustomHeader.vue";
import { useBoards } from "@/dashboard/composables/useBoards";
import CustomLoader from "@/shared/components/CustomLoader.vue";
import ListBoardComponent from "@/dashboard/components/ListBoardComponent.vue";
import { computed, ref, watch } from "vue";
import { getUserFromLocalStorage } from "@/auth/helpers/get-user-from-localstorage";
import CreateBoardComponent from "@/dashboard/components/CreateBoardComponent.vue";
import type { TemporalBoard } from "@/dashboard/interfaces/Board";

const user = ref(getUserFromLocalStorage());
const userId = computed(() => user.value?.id || null);

const {
  boards,
  isFetching,
  isLoading,
  refetch,
  boardMutationCreate,
  boardMutationPatch,
  isModalOpen,
  deleteMutation,
} = useBoards(userId);

const handleCreateBoard = (name: string) => {
  boardMutationCreate.mutate({ id: userId.value, board: { name } });
};

const handleUpdateBoard = (board: TemporalBoard) => {
  if (!board.id) return;
  boardMutationPatch.mutate({ id: board.id, board: { name: board.name } });
};

const handleDeleteBoard = (id: string) => {
  deleteMutation.mutate(id);
};
// Watchers
watch(userId, (newUserId) => {
  if (newUserId) {
    refetch();
  }
});
</script>
<template>
  <main class="w-full">
    <CustomHeader />
    <h1
      class="text-primary font-geist font-extrabold text-4xl my-11 text-center"
    >
      Projects
    </h1>
    <CustomLoader
      v-if="isLoading || isFetching"
      :custom-class="'size-[75px]'"
    />
    <ListBoardComponent
      v-else
      :boards="boards || []"
      @open-modal="isModalOpen = true"
      @update-board="handleUpdateBoard"
      @delete-board="handleDeleteBoard"
    />
    <CreateBoardComponent
      v-if="isModalOpen"
      @close="isModalOpen = false"
      @createDashboard="handleCreateBoard"
    />
  </main>
</template>
