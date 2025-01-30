import type { UserLogin, Token } from "@/auth/interfaces/User";
import { trelloCloneApi } from "@/shared/api/trelloCloneApi";

export const loginUser = async (
  user: UserLogin,
  rememberMe: boolean
): Promise<Token> => {
  try {
    const formData = new URLSearchParams();
    formData.append("grant_type", user.grant_type);
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("scope", user.scope);
    formData.append("client_id", user.client_id);
    formData.append("client_secret", user.client_secret);

    const { data } = await trelloCloneApi.post<Token>(
      `/auth/login?remember_me=${rememberMe}`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        error.response.data.detail || "Incorrect username or password";
      }
      throw new Error(
        error.response.data.detail || "An error ocurred during login"
      );
    }
    throw new Error("Network Error, please try again later");
  }
};
