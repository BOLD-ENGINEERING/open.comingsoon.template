/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'

export const appName = import.meta.env.VITE_APP_NAME
export const isSubmitting = ref(false)
export const submitMessage = ref('')
export const isDarkMode = ref(true)
export const email = ref('')

export const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('bold')
}

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const handleSubmit = async () => {
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

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    submitMessage.value = `Thanks for subscribing! We'll notify you at ${email.value}`
    email.value = ''
  } catch (err: any) {
    submitMessage.value = `Something went wrong - ${err.message}`
  } finally {
    isSubmitting.value = false
  }
}

export const updateCountdown = () => {
  const launchDate = new Date('Jan 1, 2027 00:00:00').getTime()

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

export type InfluxWritePayload = {
  measurement: string
  fields: Record<string, string | number | boolean>
  tags?: Record<string, string>
  timestamp?: number | string
}

export const sendInfluxPoint = async (payload: InfluxWritePayload) => {
  const response = await fetch('/api/influx/write', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Influx write failed: ${response.statusText}`)
  }

  return response.json()
}
