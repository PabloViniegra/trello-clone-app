<script setup lang="ts">
import { useAuthorization } from "@/auth/composables/useAuthorization";
import { useValidation } from "@/shared/composables/useValidation";
import { computed } from "vue";

// Composables
const {
  validate,
  required,
  complexPassword,
  email: emailValidation,
} = useValidation();
const {
  registerMutation,
  username,
  password,
  confirmPassword,
  email,
  isPendingRegister,
} = useAuthorization();

// Computed validations
const passwordStatus = computed(() =>
  validate(password.value, [required, complexPassword])
);
const usernameStatus = computed(() => validate(username.value, [required]));
const emailStatus = computed(() =>
  validate(email.value, [required, emailValidation])
);

const confirmPasswordStatus = computed(() => {
  const isRequiredValid = required(confirmPassword.value).valid;
  const isMatchValid = confirmPassword.value === password.value;

  return {
    valid: isRequiredValid && isMatchValid,
    message: !isRequiredValid
      ? "This field is required"
      : !isMatchValid
      ? "Passwords do not match"
      : undefined,
  };
});
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-[700px] bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold text-primary text-center mb-6">
        Create an Account
      </h2>
      <form @submit.prevent="registerMutation()" class="space-y-4">
        <div>
          <label class="block text-lg font-medium text-gray-700"
            >Username</label
          >
          <input
            v-model="username"
            type="text"
            placeholder="Enter your username"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            :class="{ 'border-red-500': !usernameStatus.valid }"
          />
          <p v-if="!usernameStatus.valid" class="text-red-500 text-sm mt-1">
            {{ usernameStatus.message }}
          </p>
        </div>
        <div>
          <label class="block text-lg font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            :class="{ 'border-red-500': !emailStatus.valid }"
          />
          <p v-if="!emailStatus.valid" class="text-red-500 text-sm mt-1">
            {{ emailStatus.message }}
          </p>
        </div>
        <div>
          <label class="block text-lg font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            placeholder="Create a password"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            :class="{ 'border-red-500': !passwordStatus.valid }"
          />
          <p v-if="!passwordStatus.valid" class="text-red-500 text-sm mt-1">
            {{ passwordStatus.message }}
          </p>
        </div>
        <div>
          <label class="block text-lg font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            :class="{ 'border-red-500': !confirmPasswordStatus.valid }"
          />
          <p
            v-if="!confirmPasswordStatus.valid"
            class="text-red-500 text-sm mt-1"
          >
            {{ confirmPasswordStatus.message }}
          </p>
        </div>
        <button
          type="submit"
          class="w-full p-3 bg-secondary text-white font-semibold rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="
            isPendingRegister ||
            !usernameStatus.valid ||
            !emailStatus.valid ||
            !passwordStatus.valid ||
            !confirmPasswordStatus.valid
          "
        >
          <svg
            v-if="isPendingRegister"
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
          <span v-if="!isPendingRegister">Create Account</span>
        </button>
      </form>
      <p class="text-center mt-4 text-gray-600">
        Already have an account?
        <router-link
          to="/login"
          class="text-primary font-semibold hover:underline"
          >Sign in</router-link
        >
      </p>
    </div>
  </div>
</template>
