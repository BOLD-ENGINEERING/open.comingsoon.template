import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Nora from '@primeuix/themes/nora'
import PrimeVue from 'primevue/config'
import router from './router'
import App from './App.vue'

import 'primeicons/primeicons.css'
import '@/global.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Nora, // Aura, Material, Lara, Nora
    options: {
      prefix: 'p',
      ripple: true,
      cssLayer: false,
      inputVariant: 'filled',
      darkModeSelector: '.bold',
    },
  },
})

app.mount('#app')
