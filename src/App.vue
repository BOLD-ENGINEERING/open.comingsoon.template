<script setup lang="ts">
  import { ref } from 'vue';
  import { Sun, Moon } from 'lucide-vue-next';

  const isDarkMode = ref(false);

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle('bold');
  }

</script>

<template>
  <main
    class="flex h-screen flex-col items-center justify-center transition-colors duration-300"
  >
    <div class="absolute top-4 right-4">
      <Button
        raised
        severity="contrast"
        @click="toggleDarkMode()"
      >
        <Moon v-if="!isDarkMode" class="h-6 w-6" />
        <Sun v-else class="h-6 w-6" />
      </Button>
    </div>

    <div class="text-center">
      <h1 class="text-4xl font-bold">You did it!</h1>
      <h2 class="mt-2 text-lg">Welcome to Your App</h2>
      <p class="mt-2 text-sm">
        Use the toggle in the corner to switch themes.
      </p>
    </div>
  </main>
</template>

<style scoped></style>
