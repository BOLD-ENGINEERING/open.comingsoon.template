<script setup lang="ts">

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { Sun, Moon } from 'lucide-vue-next'
import {
  email,
  appName,
  isDarkMode,
  isSubmitting,
  handleSubmit,
  submitMessage,
  toggleDarkMode,
} from '@/utils/functions'

</script>

<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300" :class="{
    'dark:bg-gray-900 dark:text-gray-100': isDarkMode,
    'bg-gray-50 text-gray-900': !isDarkMode,
  }">
    <nav class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center space-x-3">
        <img src="/logo.jpeg" alt="{{ appName }}" class="h-8 w-auto" />
      </div>

      <div class="flex items-center space-x-2">
        <Button raised severity="contrast" @click="toggleDarkMode" class="p-2">
          <Moon v-if="!isDarkMode" class="h-5 w-5" />
          <Sun v-else class="h-5 w-5" />
        </Button>
      </div>
    </nav>

    <main class="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <div class="text-center space-y-8 max-w-3xl w-full">
        <div class="space-y-4">
          <h1 class="text-5xl font-bold text-primary-600">Coming Soon</h1>
          <p class="text-xl text-muted-foreground">
            We're building something exciting for the engineering community
          </p>
        </div>

        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Stay tuned for updates on our upcoming projects and initiatives that will revolutionize
            how engineers collaborate and innovate. We're working hard behind the scenes to bring
            you the best tools and resources.
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex flex-col gap-1 w-full items-center justify-center">
            <InputText v-model="email" placeholder="Enter your email address" type="email"
              class="flex-1 w-full max-w-xl"
              :class="{ 'border-red-500': submitMessage && submitMessage.includes('Please') }"
              @keyup.enter="handleSubmit" />
            <Button label="Notify Me" severity="primary" :loading="isSubmitting" @click="handleSubmit"
              class="w-full max-w-xl cursor-pointer" :class="{ 'cursor-progress': isSubmitting }" />
            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              We'll only use your email for project updates. No spam.
            </p>
          </div>

          <p v-if="submitMessage" class="mt-3 text-sm" :class="{
            'text-green-600': submitMessage.includes('Thanks'),
            'text-red-600':
              submitMessage.includes('went wrong') || submitMessage.includes('Please'),
          }">
            {{ submitMessage }}
          </p>
        </div>
      </div>
    </main>

    <footer
      class="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-6 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
      <span class="text-center sm:text-left">&copy; {{ new Date().getFullYear() }} {{ appName }}. All rights
        reserved.</span>

      <div class="flex justify-center gap-4 sm:gap-8 flex-wrap text-gray-500 dark:text-gray-400">
        <a href="https://x.com/@openclonne" target="_blank"
          class="hover:text-primary-600 hover:cursor-pointer hover:underline transition-colors duration-200">
          Twitter(X)
        </a>
        <a href="https://instagram.com/kojo_jeffery" target="_blank"
          class="hover:text-primary-600 hover:cursor-pointer hover:underline transition-colors duration-200">
          Instagram
        </a>
        <a href="https://linkedin.com/in/jeffery-osei" target="_blank"
          class="hover:text-primary-600 hover:cursor-pointer hover:underline transition-colors duration-200">
          LinkedIn
        </a>
        <a href="https://github.com/BOLD-ENGINEERING" target="_blank"
          class="hover:text-primary-600 hover:cursor-pointer hover:underline transition-colors duration-200">
          Github
        </a>
      </div>

      <span class="text-center sm:text-right">Launching soon . Follow us for announcements</span>
    </footer>
  </div>
</template>

<style scoped>
:root {
  --primary-600: #3b82f6;
  --muted-foreground: #6b7280;
  --border-color: #e5e7eb;
}

.dark {
  --primary-600: #60a5fa;
  --muted-foreground: #9ca3af;
  --border-color: #374151;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
