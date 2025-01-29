import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { getTasks } from "@/task/helpers/get-task";
import { useTaskStore } from "@/stores/taskStore";
import { computed, watch } from "vue";
import { createTasks } from "@/task/helpers/create-task";
import { moveTask } from "@/task/helpers/move-task";
import { updateTask } from "@/task/helpers/patch-task";
import { deleteTask } from "@/task/helpers/delete-task";
import type { Task, TaskCreate } from "@/task/interfaces/Task";

export const useTasks = (column_id: string) => {
  // Store
  const taskStore = useTaskStore();

  // Query client
  const queryClient = useQueryClient();

  // Router
  const router = useRouter();

  // Toaster
  const toaster = useToast();

  //Vue Query Hooks
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tasks", column_id],
    queryFn: () => getTasks(column_id),
    refetchOnMount: true,
  });

  const createTaskMutation = useMutation({
    mutationFn: ({
      column_id,
      task,
    }: {
      column_id: string;
      task: Omit<Task, "id">;
    }) => createTasks(column_id, task),
  });

  const moveTaskMutation = useMutation({
    mutationFn: ({
      task_id,
      new_column_id,
    }: {
      task_id: string;
      new_column_id: string;
    }) => moveTask(task_id, new_column_id),
    onSuccess: (_, variables) => {
      const { new_column_id } = variables;
      toaster.success("Task created successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks", column_id] });
      queryClient.invalidateQueries({ queryKey: ["tasks", new_column_id] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ task_id, task }: { task_id: string; task: TaskCreate }) =>
      updateTask(task_id, task),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (task_id: string) => deleteTask(task_id),
  });

  // Watchers
  watch(
    data,
    (newTaks) => {
      if (newTaks) {
        taskStore.setNewTasks(newTaks);
      }
    },
    { immediate: true }
  );

  watch(moveTaskMutation.isSuccess, () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks", column_id],
    });
    toaster.success("Task moved successfully");
  });

  watch(updateTaskMutation.isSuccess, () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks", column_id],
    });
    toaster.success("Task updated successfully");
  });

  watch(createTaskMutation.isSuccess, () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks", column_id],
    });
    toaster.success("Task created successfully");
  });

  watch(deleteTaskMutation.isSuccess, () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks", column_id],
    });
    toaster.success("Task deleted successfully");
  });

  watch(updateTaskMutation.isError, (newIsError) => {
    if (newIsError && updateTaskMutation.error) {
      toaster.error("Error updating task");
    }
  });

  watch(isError, (newIsError) => {
    if (newIsError && error) {
      toaster.error("Error loading tasks");
    }
  });

  watch(createTaskMutation.isError, (newIsError) => {
    if (newIsError && createTaskMutation.error) {
      toaster.error("Error creating task");
    }
  });

  watch(moveTaskMutation.isError, (newIsError) => {
    if (newIsError && moveTaskMutation.error) {
      toaster.error("Error moving task");
    }
  });

  watch(deleteTaskMutation.isError, (newIsError) => {
    if (newIsError && deleteTaskMutation.error) {
      toaster.error("Error deleting task");
    }
  });

  return {
    tasks: data,
    isLoading,
    isError,
    error,
    createTaskMutation: createTaskMutation.mutate,
    isCreatePending: computed(() => createTaskMutation.isPending),
    isMovePending: computed(() => moveTaskMutation.isPending),
    moveTaskMutation: moveTaskMutation.mutate,
    updateTaskMutation: updateTaskMutation.mutate,
    isUpdatePending: computed(() => updateTaskMutation.isPending),
    deleteTaskMutation: deleteTaskMutation.mutate,
  };
};
