import { trelloCloneApi } from "@/shared/api/trelloCloneApi";
import type { Task } from "@/task/interfaces/Task";

export const moveTask = async (task_id: string, new_column_id: string): Promise<Task> => {
  try {
    const TOKEN = localStorage.getItem("token");
    if (!TOKEN) {
      throw new Error("UnauthorizedError");
    }
    const { data } = await trelloCloneApi.patch<Task>(
      `/tasks/${task_id}/move?new_column_id=${new_column_id}`,
      {},
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
