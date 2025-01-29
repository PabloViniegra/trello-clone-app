import { getBoards } from "@/dashboard/helpers/get-boards";
import { useBoardsStore } from "@/stores/boardStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, ref, watch, type Ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { createBoard } from "@/dashboard/helpers/create-board";
import { updateBoard } from "@/dashboard/helpers/update-board";
import type { BoardCreate } from "@/dashboard/interfaces/Board";
import { deleteBoard } from "@/dashboard/helpers/delete-board";

export const useBoards = (id: Ref<string | null>) => {
  const toaster = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  // Stores
  const { setBoards, boards } = useBoardsStore();

  if (!localStorage.getItem("token")) {
    router.push({ name: "Login" });
  }

  // Computed
  const userId = computed(() => id.value);
  const enabled = computed(() => !!userId.value);
  const isModalOpen = ref(false);

  // Hooks
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => getBoards(userId.value as string),
    enabled,
    retry: 1,
    refetchOnMount: "always",
    refetchOnReconnect: true,
    staleTime: 0,
  });

  const boardMutationCreate = useMutation({
    mutationFn: ({ id, board }: { id: string; board: BoardCreate }) =>
      createBoard(id, board),
    retry: 3,
  });

  const boardMutationPatch = useMutation({
    mutationFn: ({ id, board }: { id: string; board: BoardCreate }) =>
      updateBoard(id, board),
    retry: 3,
  });

  const deleteMutation = useMutation({
    mutationFn: (board_id: string) => deleteBoard(board_id),
    retry: 2,
  });
  // Watchers
  watch(
    data,
    (newBoards) => {
      if (newBoards) {
        setBoards(newBoards);
      }
    },
    { immediate: true }
  );

  watch(boardMutationCreate.isError, () => {
    if (boardMutationCreate.isError.value && boardMutationCreate.error.value) {
      if (boardMutationCreate.error.value.message === "UnauthorizedError") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push({ name: "Login" });
      } else {
        toaster.error("Error creating board");
      }
    }
  });

  watch(boardMutationPatch.isError, () => {
    if (boardMutationPatch.isError.value && boardMutationPatch.error.value) {
      if (boardMutationPatch.error.value.message === "UnauthorizedError") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push({ name: "Login" });
      } else {
        toaster.error("Error updating board");
      }
    }
  });

  watch(deleteMutation.isError, () => {
    if (deleteMutation.isError.value && deleteMutation.error.value) {
      if (deleteMutation.error.value.message === "UnauthorizedError") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push({ name: "Login" });
      } else {
        toaster.error("Error deleting board");
      }
    }
  });

  watch(isError, () => {
    if (isError.value && error.value) {
      if (error.value.message === "UnauthorizedError") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push({ name: "Login" });
      } else {
        toaster.error("Error fetching boards");
      }
    }
  });

  watch(boardMutationCreate.isSuccess, () => {
    if (boardMutationCreate.isSuccess.value) {
      queryClient.invalidateQueries({
        queryKey: ["boards", userId.value],
      });
      toaster.success("Board created successfully");
      isModalOpen.value = false;
    }
  });

  watch(boardMutationPatch.isSuccess, () => {
    if (boardMutationPatch.isSuccess.value) {
      queryClient.invalidateQueries({
        queryKey: ["boards", userId.value],
      });
      toaster.success("Board updated successfully");
    }
  });

  watch(deleteMutation.isSuccess, () => {
    if (deleteMutation.isSuccess.value) {
      queryClient.invalidateQueries({
        queryKey: ["boards", userId.value],
      });
      toaster.success("Board deleted successfully");
    }
  });

  return {
    boards: data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    boardMutationCreate,
    boardMutationPatch,
    isModalOpen,
    deleteMutation,
  };
};
