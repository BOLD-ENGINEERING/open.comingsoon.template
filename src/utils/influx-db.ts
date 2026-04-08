import { InfluxDB, Point } from '@influxdata/influxdb-client'
import type { WriteApi, WritePrecisionType } from '@influxdata/influxdb-client'

const INFLUX_TOKEN = import.meta.env.INFLUXDB_TOKEN
const INFLUX_URL = import.meta.env.VITE_INFLUXDB_API_URL
const INFLUX_ORG = import.meta.env.VITE_INFLUXDB_ORG
const INFLUX_BUCKET = import.meta.env.VITE_INFLUXDB_BUCKET

if (!INFLUX_TOKEN || !INFLUX_URL || !INFLUX_ORG || !INFLUX_BUCKET) {
  throw new Error('Missing InfluxDB server configuration')
}

export type InfluxPointPayload = {
  measurement: string
  fields: Record<string, string | number | boolean>
  tags?: Record<string, string>
  timestamp?: number | string | Date
}

export class InfluxDbService {
  private client: InfluxDB
  private org: string
  private bucket: string

  constructor() {
    this.client = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN })
    this.org = INFLUX_ORG
    this.bucket = INFLUX_BUCKET
  }

  private createWriteApi(precision: WritePrecisionType = 'ns'): WriteApi {
    return this.client.getWriteApi(this.org, this.bucket, precision)
  }

  async writePoint(payload: InfluxPointPayload): Promise<void> {
    const writeApi = this.createWriteApi('ns')
    const point = new Point(payload.measurement)

    Object.entries(payload.tags ?? {}).forEach(([key, value]) => {
      point.tag(key, value)
    })

    Object.entries(payload.fields).forEach(([key, value]) => {
      if (typeof value === 'number') {
        point.floatField(key, value)
      } else if (typeof value === 'boolean') {
        point.booleanField(key, value)
      } else {
        point.stringField(key, String(value))
      }
    })

    if (payload.timestamp) {
      point.timestamp(new Date(payload.timestamp).getTime())
    }

    writeApi.writePoint(point)
    await writeApi.close()
  }

  async writePoints(points: InfluxPointPayload[]): Promise<void> {
    const writeApi = this.createWriteApi('ns')

    points.forEach((payload) => {
      const point = new Point(payload.measurement)
      Object.entries(payload.tags ?? {}).forEach(([key, value]) => point.tag(key, value))
      Object.entries(payload.fields).forEach(([key, value]) => {
        if (typeof value === 'number') {
          point.floatField(key, value)
        } else if (typeof value === 'boolean') {
          point.booleanField(key, value)
        } else {
          point.stringField(key, String(value))
        }
      })
      if (payload.timestamp) {
        point.timestamp(new Date(payload.timestamp).getTime())
      }
      writeApi.writePoint(point)
    })

    await writeApi.close()
  }

  async queryLatest(
    measurement: string,
    field?: string,
    range = '-1h',
  ): Promise<Array<Record<string, unknown>>> {
    const queryApi = this.client.getQueryApi(this.org)
    const fieldFilter = field ? `|> filter(fn: (r) => r._field == "${field}")` : ''
    const fluxQuery = `from(bucket: "${this.bucket}")\n  |> range(start: ${range})\n  |> filter(fn: (r) => r._measurement == "${measurement}")\n  ${fieldFilter}\n  |> last()`

    return new Promise<Array<Record<string, unknown>>>((resolve, reject) => {
      const rows: Array<Record<string, unknown>> = []

      queryApi.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          rows.push(tableMeta.toObject(row))
        },
        error: (error) => reject(error),
        complete: () => resolve(rows),
      })
    })
  }
}

export const influxDbService = new InfluxDbService()
