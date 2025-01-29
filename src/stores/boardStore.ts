import type { Board } from "@/dashboard/interfaces/Board";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBoardsStore = defineStore("boards", () => {
  const boards = ref<Board[]>([]);

  return {
    boards,
    setBoards(newBoards: Board[]) {
      boards.value = newBoards;
    },
  };
});
