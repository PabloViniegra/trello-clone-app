import LoginPage from "@/auth/pages/LoginPage.vue";
import MainLayout from "@/shared/layouts/MainLayout.vue";
import HomeLayout from "@/shared/layouts/HomeLayout.vue";
import HomePage from "@/shared/pages/HomePage.vue";
import RegisterPage from "@/auth/pages/RegisterPage.vue";
import DashboardPage from "@/dashboard/pages/DashboardPage.vue";
import SingleBoardPage from "@/dashboard/pages/SingleBoardPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeLayout,
      children: [{ path: "", name: "HomePage", component: HomePage }],
    },
    {
      path: "/auth",
      component: MainLayout,
      name: "Auth",
      redirect: "/auth/login",
      children: [
        { path: "/register", name: "Register", component: RegisterPage },
        { path: "/login", name: "Login", component: LoginPage },
      ],
    },
    {
      path: "/dashboard",
      component: MainLayout,
      children: [
        { path: "", name: "Dashboard", component: DashboardPage },
        { path: "board/:id", name: "SingleBoard", component: SingleBoardPage },
      ],
    },
  ],
});

export default router;
