import { trelloCloneApi } from "@/shared/api/trelloCloneApi";
import type { Task } from "@/task/interfaces/Task";

export const createTasks = async (
  column_id: string,
  task: Omit<Task, "id">
): Promise<Task> => {
  try {
    const TOKEN = localStorage.getItem("token");
    console.log("🔍 Token enviado en petición GET /tasks/:", TOKEN);
    if (!TOKEN) {
      throw new Error("UnauthorizedError");
    }
    const { data } = await trelloCloneApi.post<Task>(
      `/tasks/${column_id}`,
      task,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
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
