<script setup lang="ts">
import ListColumn from "@/column/components/ListColumn.vue";
import { useColumns } from "@/column/composables/useColumns";
import CustomLoader from "@/shared/components/CustomLoader.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const boardId = route.params.id;

const {
  columns,
  createMutation,
  isPendingMutation,
  isLoading,
  isFetching,
  isPendingPatch,
  patchMutation,
  deleteMutation
} = useColumns(boardId.toString());
</script>
<template>
  <main class="w-full flex flex-col justify-center items-center">
    <header
      class="w-full flex justify-center items-center bg-secondary/40 p-4 rounded-lg"
    >
      <h1 class="font-geist text-2xl text-black font-extrabold text-center">
        Columns
      </h1>
    </header>
    <CustomLoader
      v-if="isLoading || isFetching"
      :custom-class="'size-24 flex flex-row justify-center items-center mt-56'"
    />
    <ListColumn
      v-else
      :columns="columns ?? []"
      :createMutation="createMutation"
      :isPendingMutation="isPendingMutation.value"
      :boardId="boardId.toString()"
      :isPendingPatch="isPendingPatch.value"
      :patchMutation="patchMutation"
      :deleteMutation="deleteMutation"
    />
  </main>
</template>
