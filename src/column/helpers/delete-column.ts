import { trelloCloneApi } from "@/shared/api/trelloCloneApi";

export const deleteColumn = async (column_id: string): Promise<void> => {
  try {
    const TOKEN = localStorage.getItem("token");
    if (!TOKEN) {
      throw new Error("UnauthorizedError");
    }
    await trelloCloneApi.delete(`/columns/${column_id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error("UnauthorizedError");
    }
    throw error;
  }
};
