<script setup lang="ts">
import MainLayout from "@/shared/layouts/MainLayout.vue";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { useRoute } from "vue-router";
import HomeLayout from "@/shared/layouts/HomeLayout.vue";
const route = useRoute();

const getLayout = () => {
  if (route.path === "/") return HomeLayout;
  return MainLayout;
};
</script>

<template>
  <component :is="getLayout()">
    <router-view />
  </component>
  <VueQueryDevtools />
</template>
