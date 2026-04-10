<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { Sun, Moon } from 'lucide-vue-next'
import { onMounted, ref, type Ref } from 'vue'
import {
  email,
  appName,
  isDarkMode,
  isSubmitting,
  handleSubmit,
  submitMessage,
  toggleDarkMode,
  trackSocialClick,
  queryTemplateData,
} from '@/utils/functions'

const template: Ref<any[]> = ref([])

onMounted(async () => {
  const response = await queryTemplateData()
  template.value = response

  // Apply initial dark mode class based on system preference
  if (isDarkMode.value) {
    document.documentElement.classList.add('bold')
  }
})

</script>

<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300" :class="{
    'bg-gray-50 text-gray-900': !isDarkMode,
    'bg-gray-900 text-gray-100': isDarkMode,
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

    <main class="flex-1 flex flex-col items-center justify-center px-6 py-16" :class="{
      'bg-linear-to-br from-slate-50 to-white': !isDarkMode,
      'bg-linear-to-br from-gray-900 to-gray-800': isDarkMode
    }">
      <div class="text-center space-y-12 max-w-4xl w-full">
        <!-- Hero Section -->
        <div class="space-y-6">
          <div class="inline-block px-4 py-2 text-sm font-medium tracking-wide uppercase" :class="{
            'bg-primary-100 text-primary-800': !isDarkMode,
            'bg-primary-900/30 text-primary-200': isDarkMode
          }">
            Coming Soon
          </div>
          <h1 class="text-6xl md:text-7xl font-black leading-tight" :class="{
            'text-gray-900': !isDarkMode,
            'text-white': isDarkMode
          }">
            Something
            <span class="block" :class="{
              'text-primary-600': !isDarkMode,
              'text-primary-400': isDarkMode
            }">Amazing</span>
            is Coming
          </h1>
          <p class="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-light" :class="{
            'text-gray-600': !isDarkMode,
            'text-gray-300': isDarkMode
          }">
            We're crafting innovative solutions for the engineering community.
            Join thousands of professionals who are already excited about what's next.
          </p>
        </div>

        <!-- Stats/Countdown Section -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold" :class="{
              'text-primary-600': !isDarkMode,
              'text-primary-400': isDarkMode
            }">500+</div>
            <div class="text-sm uppercase tracking-wide" :class="{
              'text-gray-500': !isDarkMode,
              'text-gray-400': isDarkMode
            }">Subscribers</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold" :class="{
              'text-primary-600': !isDarkMode,
              'text-primary-400': isDarkMode
            }">50+</div>
            <div class="text-sm uppercase tracking-wide" :class="{
              'text-gray-500': !isDarkMode,
              'text-gray-400': isDarkMode
            }">Clicks</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold" :class="{
              'text-primary-600': !isDarkMode,
              'text-primary-400': isDarkMode
            }">24</div>
            <div class="text-sm uppercase tracking-wide" :class="{
              'text-gray-500': !isDarkMode,
              'text-gray-400': isDarkMode
            }">Days Left</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold" :class="{
              'text-primary-600': !isDarkMode,
              'text-primary-400': isDarkMode
            }">2027</div>
            <div class="text-sm uppercase tracking-wide" :class="{
              'text-gray-500': !isDarkMode,
              'text-gray-400': isDarkMode
            }">Launch Year</div>
          </div>
        </div>

        <!-- Email Subscription -->
        <div class="space-y-8 max-w-md mx-auto">
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold" :class="{
              'text-gray-900': !isDarkMode,
              'text-white': isDarkMode
            }">Get Notified</h2>
            <p :class="{
              'text-gray-600': !isDarkMode,
              'text-gray-300': isDarkMode
            }">
              Be the first to know when we launch. No spam, just important updates.
            </p>
          </div>

          <div class="space-y-4">
            <div class="flex flex-col gap-3">
              <InputText v-model="email" placeholder="Enter your email address" type="email"
                class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary-500 dark:focus:border-primary-400 transition-colors"
                :class="{ 'border-red-500 dark:border-red-400': submitMessage && submitMessage.includes('Please') }"
                @keyup.enter="handleSubmit" />
              <Button label="Notify Me When We Launch" severity="primary" :loading="isSubmitting" @click="handleSubmit"
                class="w-full py-3 text-white font-medium transition-colors" :class="{
                  'bg-primary-600 hover:bg-primary-700': !isDarkMode,
                  'bg-primary-500 hover:bg-primary-600': isDarkMode,
                  'cursor-progress': isSubmitting
                }" />
            </div>

            <p v-if="submitMessage" class="text-sm font-medium" :class="{
              'text-green-600': !isDarkMode && submitMessage.includes('Thanks'),
              'text-green-400': isDarkMode && submitMessage.includes('Thanks'),
              'text-red-600': !isDarkMode && (submitMessage.includes('went wrong') || submitMessage.includes('Please')),
              'text-red-400': isDarkMode && (submitMessage.includes('went wrong') || submitMessage.includes('Please'))
            }">
              {{ submitMessage }}
            </p>
          </div>
        </div>

        <!-- Social Proof -->
        <div class="pt-8 border-t" :class="{
          'border-gray-200': !isDarkMode,
          'border-gray-700': isDarkMode
        }">
          <p class="text-sm mb-6" :class="{
            'text-gray-500': !isDarkMode,
            'text-gray-400': isDarkMode
          }">Follow us for updates</p>
          <div class="flex justify-center gap-6">
            <a href="https://x.com/@openclonne" target="_blank" @click="trackSocialClick('Twitter(X)')"
              class="text-gray-400 transition-colors" :class="{
                'hover:text-primary-600': !isDarkMode,
                'hover:text-primary-400': isDarkMode
              }">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://instagram.com/kojo_jeffery" target="_blank" @click="trackSocialClick('Instagram')"
              class="text-gray-400 transition-colors" :class="{
                'hover:text-primary-600': !isDarkMode,
                'hover:text-primary-400': isDarkMode
              }">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/jeffery-osei" target="_blank" @click="trackSocialClick('LinkedIn')"
              class="text-gray-400 transition-colors" :class="{
                'hover:text-primary-600': !isDarkMode,
                'hover:text-primary-400': isDarkMode
              }">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://github.com/BOLD-ENGINEERING" target="_blank" @click="trackSocialClick('Github')"
              class="text-gray-400 transition-colors" :class="{
                'hover:text-primary-600': !isDarkMode,
                'hover:text-primary-400': isDarkMode
              }">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>

    <footer class="px-6 py-8 border-t" :class="{
      'border-gray-200 bg-white': !isDarkMode,
      'border-gray-700 bg-gray-900': isDarkMode
    }">
      <div class="max-w-4xl mx-auto text-center">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="text-sm" :class="{
            'text-gray-500': !isDarkMode,
            'text-gray-400': isDarkMode
          }">
            &copy; {{ new Date().getFullYear() }} {{ appName }}. All rights reserved.
          </div>
          <div class="text-sm" :class="{
            'text-gray-500': !isDarkMode,
            'text-gray-400': isDarkMode
          }">
            Launching soon. Follow us for announcements.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
:root {
  --primary-600: #3b82f6;
  --muted-foreground: #6b7280;
  --border-color: #e5e7eb;
}

.bold {
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
