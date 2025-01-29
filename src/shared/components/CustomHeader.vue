<script setup lang="ts">
import TrelloCloneIcon from "@/shared/components/icons/TrelloCloneIcon.vue";
import UserIcon from "@/shared/components/icons/UserIcon.vue";
import LogoutIcon from "@/shared/components/icons/LogoutIcon.vue";
import { onMounted, onUnmounted } from "vue";
import { useCustomHeader } from "@/shared/composables/useCustomHeader";

// Composable
const {
  username,
  isDropdownOpen,
  toggleDropdown,
  signOut,
  handleClickOutside,
  goHome,
} = useCustomHeader();

// Lifecycle Hooks
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <header
    class="bg-secondary/50 p-4 rounded-lg flex flex-row items-center justify-between mx-4"
  >
    <div
      class="flex flex-row gap-x-2 items-center hover:cursor-pointer hover:outline-none hover:outline-white hover:rounded-md"
      @click="goHome"
    >
      <TrelloCloneIcon customClass="size-7" />
      <h2 class="title font-geist font-black text-3xl">
        Trello Clone!
      </h2>
    </div>
    <nav class="relative dropdown-container">
      <button
        class="flex flex-row gap-x-2 items-center px-3 py-2 bg-white/60 hover:bg-white/40 rounded-lg transition-all duration-300 backdrop-blur-md border border-white/10 shadow-md"
        @click="toggleDropdown"
      >
        <UserIcon customClass="size-5" />
        <p class="font-sans text-sm font-semibold">{{ username }}</p>
      </button>
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg"
      >
        <button
          class="flex items-center gap-x-2 w-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-all duration-300 rounded-lg"
          @click="signOut"
        >
          <LogoutIcon customClass="size-5 text-red-400" />
          Sign Out
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}

.title {
    background-image: url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsX29mZmljZV8yOV9waG90b2dyYXBoeV9vZl9hX25lb25fZnJhbWVfdGVtcGxhdGVfYW1vbmdfdF83YjcwZjQ2Yy00MTMyLTRmOGQtYWQzMS04ZDFiNmY1ZDMxMjJfMS5qcGc.jpg');
    background-clip: text;
    color: transparent;
    background-color: white;
}
</style>
