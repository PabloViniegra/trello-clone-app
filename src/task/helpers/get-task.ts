import { trelloCloneApi } from "@/shared/api/trelloCloneApi";
import type { Task } from "@/task/interfaces/Task";

export const getTasks = async (column_id: string): Promise<Task[]> => {
  try {
    const TOKEN = localStorage.getItem("token");
    console.log("🔍 Token enviado en petición GET /tasks/:", TOKEN);
    if (!TOKEN) {
      throw new Error("UnauthorizedError");
    }
    const { data } = await trelloCloneApi.get<Task[]>(`/tasks/${column_id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error("UnauthorizedError");
    }
    throw error;
  }
};
