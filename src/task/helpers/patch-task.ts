import { trelloCloneApi } from "@/shared/api/trelloCloneApi";
import type { Task, TaskCreate } from "@/task/interfaces/Task";

export const updateTask = async (
  task_id: string,
  task: TaskCreate
): Promise<Task> => {
  try {
    const TOKEN = localStorage.getItem("token");
    if (!TOKEN) {
      throw new Error("UnauthorizedError");
    }
    const { data } = await trelloCloneApi.patch<Task>(
      `/tasks/${task_id}`,
      task,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );

    return data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error("UnauthorizedError");
    }
    throw error;
  }
};
