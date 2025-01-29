// patch-column.ts
import { trelloCloneApi } from "@/shared/api/trelloCloneApi";
import type { Column } from "@/column/interfaces/Column";

export const updateColumn = async (
  columnId: string,
  column: Omit<Column, "id">
): Promise<Column> => {
  try {
    const TOKEN = localStorage.getItem("token");
    if (!TOKEN) {
      throw new Error("UnauthorizedError");
    }
    console.log("🛠 Enviando PATCH a /columns/", columnId, "con datos:", column);

    const { data } = await trelloCloneApi.patch<Column>(
      `/columns/${columnId}`,
      column,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );
    console.log(`✅ PATCH exitoso:`, data);
    return data;
  } catch (error: any) {
    console.error("❌ Error en PATCH:", error);
    if (error.response?.status === 401) {
      throw new Error("UnauthorizedError");
    }
    throw error;
  }
};
