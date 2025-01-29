<script setup lang="ts">
import { useRouter } from "vue-router";
import { getUserFromLocalStorage } from "@/auth/helpers/get-user-from-localstorage";

const router = useRouter();

const user = getUserFromLocalStorage();
const token = localStorage.getItem("token");

const handleGetStarted = () => {
  if (user && token) {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
};
</script>

<template>
  <main
    class="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-secondary/60 to-primary/70"
  >
    <section
      class="text-center max-w-4xl px-8 py-12 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl border border-white/20"
    >
      <h1
        class="text-6xl md:text-7xl font-geist font-extrabold text-white drop-shadow-lg"
      >
        Welcome to Trello Clone!
      </h1>
      <p class="mt-4 text-lg text-gray-200 drop-shadow-md">
        A powerful and intuitive task management tool to keep your projects
        organized.
      </p>

      <button
        @click="handleGetStarted"
        class="mt-8 px-8 py-3 bg-white/10 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300"
      >
        Get Started
      </button>
    </section>
  </main>
</template>
