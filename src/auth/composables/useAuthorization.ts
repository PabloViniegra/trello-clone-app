import type { UserCreation, User } from "@/auth/interfaces/User";
import { registerUser } from "@/auth/helpers/register-user";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMutation } from "@tanstack/vue-query";
import { loginUser } from "@/auth/helpers/login-user";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toast-notification";

export const useAuthorization = () => {
  //Router
  const router = useRouter();

  //Toaster
  const toaster = useToast();

  //Store
  const userStore = useUserStore();

  // Reactive properties
  const { currentUser } = storeToRefs(userStore);
  const username = ref<string>("");
  const email = ref<string>("");
  const password = ref<string>("");
  const confirmPassword = ref<string>("");
  const rememberMe = ref<boolean>(false);

  // useQuery hooks
  const {
    data: user,
    mutate: registerMutation,
    isError: isErrorRegister,
    error: errorRegister,
    isSuccess: isSuccessRegister,
    isPending: isPendingRegister,
  } = useMutation({
    mutationFn: () =>
      registerUser({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
  });

  const {
    mutate: loginMutation,
    data: token,
    isPending: isPendingLogin,
    isError: isErrorLogin,
    error: errorLogin,
    isSuccess: isSuccessLogin,
  } = useMutation({
    mutationFn: () =>
      loginUser(
        {
          username: email.value,
          password: password.value,
          grant_type: "password",
          scope: "",
          client_id: "string",
          client_secret: "string",
        },
        rememberMe.value
      ),
  });

  // Watchers
  watch(isSuccessRegister, () => {
    if (isSuccessRegister.value && user.value) {
      loginMutation();
      userStore.setCurrentUser(user.value);
    }
  });

  watch(isSuccessLogin, () => {
    if (isSuccessLogin.value && token.value) {
      console.log("✅ Token recibido en login:", token.value.access_token);
      if (!token.value.access_token) {
        return;
      }
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: token.value.user.username,
          email: token.value.user.email,
          id: token.value.user.id,
        })
      );
      localStorage.setItem("token", token.value.access_token);
      userStore.setCurrentUser(token.value.user);
      toaster.success("Logged in successfully");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  });

  watch(isErrorRegister, () => {
    if (isErrorRegister.value && errorRegister.value) {
      toaster.error(errorRegister.value.message);
    }
  });

  watch(isErrorLogin, () => {
    if (isErrorLogin.value && errorLogin.value) {
      toaster.error(errorLogin.value.message);
    }
  });

  return {
    user,
    username,
    email,
    password,
    rememberMe,
    confirmPassword,
    registerMutation,
    isErrorRegister,
    errorRegister,
    isSuccessRegister,
    isPendingRegister,
    loginMutation,
    isErrorLogin,
    errorLogin,
    isSuccessLogin,
    isPendingLogin,
    currentUser,
    signOut: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      userStore.clearUser();
      router.push("/login");
    },
  };
};
