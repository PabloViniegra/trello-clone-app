import { trelloCloneApi } from "@/shared/api/trelloCloneApi";
import type { Column, ColumnCreate } from "@/column/interfaces/Column";

export const createColumn = async (
  board_id: string,
  column: ColumnCreate
): Promise<Column> => {
  try {
    const TOKEN = localStorage.getItem("token");
    console.log("🔍 Token enviado en petición POST /columns/:", TOKEN);
    if (!TOKEN) {
      throw new Error("UnauthorizedError");
    }
    const { data } = await trelloCloneApi.post<Column>(
      `/columns/${board_id}`,
      column,
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
