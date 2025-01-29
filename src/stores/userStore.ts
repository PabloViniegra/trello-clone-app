import type { User } from "@/auth/interfaces/User";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useUserStore = defineStore("user", () => {
  const currentUser = ref<User | null>(null);

  return {
    currentUser,
    setCurrentUser(user: User) {
      currentUser.value = user;
    },
    clearUser() {
      currentUser.value = null;
    },
  };
});
