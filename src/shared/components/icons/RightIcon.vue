<script setup lang="ts">
interface Props {
  customClass?: string;
}
const { customClass } = defineProps<Props>();
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="customClass"
    width="128"
    height="128"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m0 15v-4H7v-2h5V7l5 5z"
    />
  </svg>
</template>
