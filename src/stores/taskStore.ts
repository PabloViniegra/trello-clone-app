import type { Task } from "@/task/interfaces/Task";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);

  return {
    tasks,
    setNewTasks(newTasks: Task[]) {
      tasks.value = newTasks;
    },
  };
});
