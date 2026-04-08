<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { Sun, Moon } from 'lucide-vue-next'
import { Instagram, Twitter, Facebook, Github } from 'lucide-vue-next'

const isDarkMode = ref(false)
const email = ref('')
const isSubmitting = ref(false)
const submitMessage = ref('')

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('bold')
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

async function handleSubmit() {
  if (!email.value) {
    submitMessage.value = 'Please enter your email address'
    return
  }

  if (!validateEmail(email.value)) {
    submitMessage.value = 'Please enter a valid email address'
    return
  }

  isSubmitting.value = true
  submitMessage.value = 'Subscribing...'

  // Simulate API call
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Simulate successful response
    submitMessage.value = `Thanks for subscribing! We'll notify you at ${email.value}`
    email.value = ''
  } catch (error) {
    submitMessage.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Timer functionality
const launchDate = new Date('Jan 1, 2027 00:00:00').getTime()

function updateCountdown() {
  const now = new Date().getTime()
  const distance = launchDate - now

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}

const countdown = ref(updateCountdown())

setInterval(() => {
  countdown.value = updateCountdown()
}, 1000)
</script>

<template>
  <div
    class="min-h-screen flex flex-col transition-colors duration-300"
    :class="{
      'dark:bg-gray-900 dark:text-gray-100': isDarkMode,
      'bg-gray-50 text-gray-900': !isDarkMode,
    }"
  >
    <!-- Navbar -->
    <nav
      class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-center space-x-3">
        <span class="text-xl font-bold text-primary-600">BOLD ENGINEERING</span>
      </div>

      <div class="flex items-center space-x-4 text-sm font-medium">
        <span
          >{{ countdown.days }}d {{ countdown.hours }}h {{ countdown.minutes }}m
          {{ countdown.seconds }}s</span
        >
      </div>

      <div class="flex items-center space-x-2">
        <Button raised severity="contrast" @click="toggleDarkMode" class="p-2">
          <Moon v-if="!isDarkMode" class="h-5 w-5" />
          <Sun v-else class="h-5 w-5" />
        </Button>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <!-- Coming Soon Content -->
      <div class="text-center space-y-8 max-w-3xl w-full">
        <!-- Logo / Brand -->
        <div class="space-y-4">
          <h1 class="text-5xl font-bold text-primary-600">Coming Soon</h1>
          <p class="text-xl text-muted-foreground">
            We're building something exciting for the engineering community
          </p>
        </div>

        <!-- Description -->
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Stay tuned for updates on our upcoming projects and initiatives that will revolutionize
            how engineers collaborate and innovate. We're working hard behind the scenes to bring
            you the best tools and resources.
          </p>
        </div>

        <!-- Email Subscription -->
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
            <InputText
              v-model="email"
              placeholder="Enter your email address"
              type="email"
              class="flex-1"
              :class="{ 'border-red-500': submitMessage && submitMessage.includes('Please') }"
              @keyup.enter="handleSubmit"
            />
            <Button
              label="Notify Me"
              severity="primary"
              :loading="isSubmitting"
              @click="handleSubmit"
              class="px-8"
            />
          </div>

          <p
            v-if="submitMessage"
            class="mt-3 text-sm"
            :class="{
              'text-green-600': submitMessage.includes('Thanks'),
              'text-red-600':
                submitMessage.includes('went wrong') || submitMessage.includes('Please'),
            }"
          >
            {{ submitMessage }}
          </p>

          <p class="mt-2 text-xs text-muted-foreground">
            We'll only use your email for project updates. No spam, ever.
          </p>
        </div>

        <!-- Social Links -->
        <div class="flex justify-center space-x-8">
          <a href="#" class="hover:text-primary-600 transition-colors duration-200">
            <Twitter class="h-6 w-6" />
          </a>
          <a href="#" class="hover:text-primary-600 transition-colors duration-200">
            <Instagram class="h-6 w-6" />
          </a>
          <a href="#" class="hover:text-primary-600 transition-colors duration-200">
            <Facebook class="h-6 w-6" />
          </a>
          <a href="#" class="hover:text-primary-600 transition-colors duration-200">
            <Github class="h-6 w-6" />
          </a>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer
      class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-xs text-muted-foreground"
    >
      <span>© {{ new Date().getFullYear() }} BOLD ENGINEERING. All rights reserved.</span>
      <span>Launching soon • Follow us for announcements</span>
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

/* Additional styles for better spacing */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
