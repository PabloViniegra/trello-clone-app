import { useColumnsStore } from "@/stores/columnStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { getColumns } from "@/column/helpers/get-columns";
import { computed, watch } from "vue";
import { useToast } from "vue-toast-notification";
import { createColumn } from "@/column/helpers/create-column";
import type { ColumnCreate } from "@/column/interfaces/Column";
import { updateColumn } from "@/column/helpers/patch-column";
import { deleteColumn } from "@/column/helpers/delete-column";

export const useColumns = (id: string) => {
  // Router
  const router = useRouter();

  // Toaster
  const toaster = useToast();

  // Query Client
  const queryClient = useQueryClient();

  // Store
  const columnsStore = useColumnsStore();

  // Vue Query Hooks
  const {
    data: columns,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["columns", id],
    queryFn: () => getColumns(id),
    retry: 3,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });

  const createColumnMutation = useMutation({
    mutationFn: ({
      board_id,
      column,
    }: {
      board_id: string;
      column: ColumnCreate;
    }) => createColumn(board_id, column),
    retry: 3,
  });

  const patchColumnMutation = useMutation({
    mutationFn: ({
      columnId,
      column,
    }: {
      columnId: string;
      column: ColumnCreate;
    }) => updateColumn(columnId, column),
  });

  const deleteColumnMutation = useMutation({
    mutationFn: (columnId: string) => deleteColumn(columnId),
  });

  // Watchers
  watch(
    columns,
    (newColumns) => {
      if (newColumns) {
        columnsStore.setColumns(newColumns);
      }
    },
    { immediate: true }
  );

  watch(createColumnMutation.isSuccess, () => {
    if (createColumnMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["columns", id] });
      toaster.success("Column created successfully");
    }
  });

  watch(patchColumnMutation.isSuccess, () => {
    if (patchColumnMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["columns", id] });
      toaster.success("Column updated successfully");
    }
  });

  watch(deleteColumnMutation.isSuccess, () => {
    if (deleteColumnMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["columns", id] });
      toaster.success("Column deleted successfully");
    }
  });

  watch(isError, () => {
    if (error?.value?.message === "UnauthorizedError") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push({ name: "Login" });
    } else {
      toaster.error("Error fetching boards");
    }
  });

  watch(createColumnMutation.isError, () => {
    if (createColumnMutation.isError.value) {
      if (createColumnMutation?.error?.value?.message === "UnauthorizedError") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push({ name: "Login" });
      } else {
        toaster.error("Error creating column");
      }
    }
  });

  watch(patchColumnMutation.isError, () => {
    if (patchColumnMutation.isError.value) {
      if (patchColumnMutation?.error?.value?.message === "UnauthorizedError") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push({ name: "Login" });
      } else {
        toaster.error("Error updating column");
      }
    }
  });

  watch(deleteColumnMutation.isError, () => {
    if (deleteColumnMutation.isError.value) {
      if (deleteColumnMutation?.error?.value?.message === "UnauthorizedError") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push({ name: "Login" });
      } else {
        toaster.error("Error deleting column");
      }
    }
  });

  return {
    columns,
    isLoading,
    isFetching,
    isError,
    error,
    createMutation: createColumnMutation.mutate,
    isPendingMutation: computed(() => createColumnMutation.isPending),
    patchMutation: patchColumnMutation.mutate,
    isPendingPatch: computed(() => patchColumnMutation.isPending),
    deleteMutation: deleteColumnMutation.mutate,
  };
};
