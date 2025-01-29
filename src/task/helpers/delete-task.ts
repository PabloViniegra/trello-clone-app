import { trelloCloneApi } from "@/shared/api/trelloCloneApi";

export const deleteTask = async (task_id: string): Promise<void> => {
  try {
    const TOKEN = localStorage.getItem("token");
    if (!TOKEN) {
      throw new Error("UnauthorizedError");
    }
    await trelloCloneApi.delete(`/tasks/${task_id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error("UnauthorizedError");
    }
    throw error;
  }
};
