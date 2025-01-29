import { trelloCloneApi } from "@/shared/api/trelloCloneApi";
import type { Column } from "@/column/interfaces/Column";

export const getColumns = async (board_id: string): Promise<Column[]> => {
  try {
    const TOKEN = localStorage.getItem("token");
    console.log("🔍 Token enviado en petición GET /columns/:", TOKEN);
    if (!TOKEN) {
      throw new Error("UnauthorizedError");
    }
    const { data } = await trelloCloneApi.get<Column[]>(`/columns/${board_id}`, {
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
