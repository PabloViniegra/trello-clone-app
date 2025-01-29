import type { Column } from "@/column/interfaces/Column";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useColumnsStore = defineStore("columns", () => {
  const columns = ref<Column[]>([]);

  return {
    columns,
    setColumns(newColumns: Column[]) {
      columns.value = newColumns;
    },
  };
});
