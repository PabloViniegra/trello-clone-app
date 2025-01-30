import axios from 'axios';
import { useRouter } from 'vue-router';

export const trelloCloneApi = axios.create({
  baseURL: 'https://trello-clone-api-rest.onrender.com',
});

trelloCloneApi.interceptors.request.use((config) => {
    const TOKEN = localStorage.getItem("token");

    if (config.url?.includes("/auth/login") || config.url?.includes("/users")) {
        return config;
    }

    if (!TOKEN) {
        console.error("⛔ Interceptor: No hay token en localStorage. Redirigiendo al login...");
        const router = useRouter();
        if (router)
            router.push({ name: "Login" });
        throw new Error("UnauthorizedError");
    }

    config.headers["Authorization"] = `Bearer ${TOKEN}`;
    return config;
});

trelloCloneApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("⛔ Unauthorized interceptor: Token inválido o expirado.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        const router = useRouter();
        if (router)
            router.push({ name: "Login" });
      }
      return Promise.reject(error);
    }
  );
