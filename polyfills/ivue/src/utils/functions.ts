/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export const isDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
export const appName = import.meta.env.VITE_APP_NAME
export const isSubmitting = ref(false)
export const submitMessage = ref('')
export const email = ref('')

export const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('bold')
}

export const getVisitorIP = async (): Promise<string> => {
  try {
    const ipApiUrl = import.meta.env.VITE_IP_API_URL || 'https://api.ipify.org'
    const ipResponse = await fetch(`${ipApiUrl}?format=json`)

    if (!ipResponse.ok) {
      throw new Error(`IP API request failed: ${ipResponse.status}`)
    }

    const { ip } = await ipResponse.json()

    if (!ip) {
      throw new Error('No IP address returned from API')
    }

    return ip
  } catch (error: any) {
    throw new Error(`Failed to get visitor IP: ${error.message}`)
  }
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
    const ip = await getVisitorIP()

    const existingRecords = await queryTemplateData({
      select: 'notifier_email',
      filters: { ip },
      limit: 1
    })

    const existingRecord = existingRecords[0] as unknown as { notifier_email?: string } | undefined

    if (existingRecord) {
      await updateTemplateData(
        { ip },
        { notifier_email: email.value }
      )
    } else {
      await insertTemplateData({
        ip,
        notifier_email: email.value
      })
    }

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

export const queryTemplateData = async (options?: {
  select?: string
  filters?: Record<string, any>
  orderBy?: string
  ascending?: boolean
  limit?: number
}) => {
  const {
    select = '*',
    filters = {},
    orderBy,
    ascending = true,
    limit
  } = options || {}

  let query = supabase
    .from(`${import.meta.env.VITE_SUPABASE_TABLE}`)
    .select(select)

  Object.entries(filters).forEach(([key, value]) => {
    query = query.eq(key, value)
  })

  if (orderBy) {
    query = query.order(orderBy, { ascending })
  }

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

export const updateTemplateData = async (filters: Record<string, any>, updates: Record<string, any>) => {
  let query = supabase
    .from(`${import.meta.env.VITE_SUPABASE_TABLE}`)
    .update(updates)

  Object.entries(filters).forEach(([key, value]) => {
    query = query.eq(key, value)
  })

  const { data, error } = await query.select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const insertTemplateData = async (data: Record<string, any>) => {
  const { data: insertedData, error } = await supabase
    .from(`${import.meta.env.VITE_SUPABASE_TABLE}`)
    .insert([data])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return insertedData
}

export const trackSocialClick = async (socialPlatform: string) => {
  try {
    const ip = await getVisitorIP()

    const existingRecords = await queryTemplateData({
      select: 'social_click_entry, social_click_count',
      filters: { ip },
      limit: 1
    })

    const existingRecord = existingRecords[0] as unknown as {
      social_click_entry?: Record<string, number>
      social_click_count?: number
    } | undefined

    if (existingRecord && existingRecord.social_click_entry) {
      const updatedClicks = {
        ...existingRecord.social_click_entry,
        [socialPlatform]: (existingRecord.social_click_entry[socialPlatform] || 0) + 1
      }
      const newTotalCount = (existingRecord.social_click_count || 0) + 1

      await updateTemplateData(
        { ip },
        {
          social_click_entry: updatedClicks,
          social_click_count: newTotalCount
        }
      )
    } else {
      await insertTemplateData({
        ip,
        social_click_entry: { [socialPlatform]: 1 },
        social_click_count: 1
      })
    }
  } catch (error: any) {
    throw new Error(`Failed to track social click: ${error.message}`)
  }
}
