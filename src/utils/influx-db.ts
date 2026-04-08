import { InfluxDB, Point } from '@influxdata/influxdb-client'

const token = process.env.INFLUXDB_TOKEN
const url = import.meta.env.VITE_INFLUXDB_API_URL

const client = new InfluxDB({ url, token })

const org = import.meta.env.VITE_INFLUXDB_ORG
const bucket = import.meta.env.VITE_INFLUXDB_BUCKET

const writer = () => {
  const writeClient = client.getWriteApi(org, bucket, 'ns')

  for (let i = 0; i < 5; i++) {
    const point = new Point('measurement1')
      .tag('tagname1', 'tagvalue1')
      .intField('field1', i)

    void setTimeout(() => {
      writeClient.writePoint(point)
    }, i * 1000)

    void setTimeout(() => {
      writeClient.flush()
    }, 5000)
  }
}

const reader = () => {
  const queryClient = client.getQueryApi(org)
  const fluxQuery = `from(bucket: "${bucket}")
  |> range(start: -1h)
  |> filter(fn: (r) => r._measurement == "measurement1")
  |> last()
  `

  queryClient.queryRows(fluxQuery, {
    next: (row, tableMeta) => {
      const tableObject = tableMeta.toObject(row)
      console.log(tableObject)
    },
    error: (error) => {
      console.error('\nError', error)
    },
    complete: () => {
      console.log('\nSuccess')
    },
  })
}

export {
  writer,
  reader
}

