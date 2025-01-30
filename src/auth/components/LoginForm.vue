<script setup lang="ts">
import { useAuthorization } from "@/auth/composables/useAuthorization";
import { useValidation } from "@/shared/composables/useValidation";
import { computed } from "vue";

// Composables
const {
  validate,
  required,
  email: emailValidation,
  emailTouched,
  passwordTouched,
} = useValidation();
const { loginMutation, email, password, isPendingLogin, rememberMe } =
  useAuthorization();

// Computed validations (only if the input was touched)
const emailStatus = computed(() => {
  return emailTouched.value
    ? validate(email.value, [required, emailValidation])
    : { valid: true };
});

const passwordStatus = computed(() => {
  return passwordTouched.value
    ? validate(password.value, [required])
    : { valid: true };
});
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 px-6">
    <div
      class="w-full md:w-[500px] lg:w-[600px] xl:w-[700px] bg-white shadow-xl rounded-lg p-8"
    >
      <h2 class="text-2xl md:text-3xl font-bold text-primary text-center mb-6">
        Login
      </h2>
      <form
        @submit.prevent="loginMutation()"
        class="space-y-6 flex flex-col items-center"
      >
        <div class="w-full">
          <label class="block text-sm md:text-lg font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            :class="{ 'border-red-500': !emailStatus.valid }"
            @blur="emailTouched = true"
          />
          <p
            v-if="!emailStatus.valid"
            class="text-red-500 text-xs md:text-sm mt-1"
          >
            {{ emailStatus.message }}
          </p>
        </div>
        <div class="w-full">
          <label class="block text-sm md:text-lg font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            :class="{ 'border-red-500': !passwordStatus.valid }"
            @blur="passwordTouched = true"
          />
          <p
            v-if="!passwordStatus.valid"
            class="text-red-500 text-xs md:text-sm mt-1"
          >
            {{ passwordStatus.message }}
          </p>
        </div>
        <div class="flex items-center gap-2 w-full">
          <input
            v-model="rememberMe"
            type="checkbox"
            id="rememberMe"
            class="cursor-pointer w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label
            for="rememberMe"
            class="text-sm md:text-base text-gray-600 cursor-pointer"
            >Remember Me</label
          >
        </div>
        <button
          type="submit"
          class="w-full p-3 bg-secondary text-white font-semibold rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="
            isPendingLogin || !emailStatus.valid || !passwordStatus.valid
          "
        >
          <svg
            v-if="isPendingLogin"
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0h2a10 10 0 00-20 0h2z"
            ></path>
          </svg>
          <span v-if="!isPendingLogin">Login</span>
        </button>
      </form>
      <p class="text-center mt-6 text-gray-600 text-sm md:text-base">
        Don't have an account?
        <router-link
          to="/register"
          class="text-primary font-semibold hover:underline"
          >Sign up</router-link
        >
      </p>
    </div>
  </div>
</template>
