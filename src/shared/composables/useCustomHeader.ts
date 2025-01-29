import { useAuthorization } from "@/auth/composables/useAuthorization";
import { getUserFromLocalStorage } from "@/auth/helpers/get-user-from-localstorage";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useCustomHeader = () => {
  // Router
  const router = useRouter();

  // Properties
  const username = getUserFromLocalStorage()?.username;

  // Reactive Properties
  const isDropdownOpen = ref(false);

  // Composables
  const { signOut } = useAuthorization();

  // Methods
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };

  const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".dropdown-container")) {
      isDropdownOpen.value = false;
    }
  };

  const goHome = () => {
    router.push("/");
  };

  return {
    username,
    isDropdownOpen,
    signOut,
    toggleDropdown,
    handleClickOutside,
    goHome,
  };
};
