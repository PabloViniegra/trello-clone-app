import type { Board, BoardCreate } from "@/dashboard/interfaces/Board";
import { trelloCloneApi } from "@/shared/api/trelloCloneApi";

export const updateBoard = async (
  boardId: string,
  board: BoardCreate
): Promise<Board> => {
  try {
    const TOKEN = localStorage.getItem("token");
    console.log("🔍 Token enviado en petición GET /boards/:", TOKEN);
    if (!TOKEN) {
      throw new Error("UnauthorizedError");
    }
    const { data } = await trelloCloneApi.patch<Board>(
      `/boards/${boardId}`,
      board,
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
