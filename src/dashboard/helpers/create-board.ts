import { trelloCloneApi } from "@/shared/api/trelloCloneApi";
import type { BoardCreate, Board } from "@/dashboard/interfaces/Board";

export const createBoard = async (
  user_id: string,
  board: BoardCreate
): Promise<Board> => {
  try {
    const TOKEN = localStorage.getItem("token");
    console.log("🔍 Token enviado en petición GET /boards/:", TOKEN);
    if (!TOKEN) {
      throw new Error("UnauthorizedError");
    }
    const { data } = await trelloCloneApi.post<Board>(
      `/boards/${user_id}`,
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
