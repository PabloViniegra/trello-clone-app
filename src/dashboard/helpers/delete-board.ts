import { trelloCloneApi } from "@/shared/api/trelloCloneApi";

export const deleteBoard = async (board_id: string): Promise<void> => {
  try {
    const TOKEN = localStorage.getItem("token");
    console.log("🔍 Token enviado en petición DELETE /boards/:", TOKEN);
    if (!TOKEN) {
      throw new Error("UnauthorizedError");
    }
    await trelloCloneApi.delete(`/boards/${board_id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error("UnauthorizedError");
    }
    throw error;
  }
};
