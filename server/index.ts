import express, { type Request, type Response } from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

app.get('/api/status', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Server is running',
    service: 'Coming Soon Template API',
    version: '1.0.0'
  })
})

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method
  })
})

app.use((err: any, req: Request, res: Response) => {
  console.error('Error:', err)
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  })
})

export { app }
if (import.meta.main) {
  app.listen(PORT, () => {
    console.log(`[+] Server running on http://localhost:${PORT}`)
    console.log(`[+] Health check: http://localhost:${PORT}/health`)
  })
}
