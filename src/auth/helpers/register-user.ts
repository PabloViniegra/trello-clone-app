import { trelloCloneApi } from "@/shared/api/trelloCloneApi";
import type { UserCreation, User } from "@/auth/interfaces/User";

export const registerUser = async (user: UserCreation): Promise<User> => {
    const response = await trelloCloneApi.post<User>('/users/', user);
    return response.data;
}
