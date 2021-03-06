import express from 'express';
import client from 'prom-client';
import log from './logger'

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'Rest API response time in seconds',
  labelNames: [ 'method', 'route', 'status_code' ],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: 'database_response_time_duration_seconds',
  help: 'Database response time in seconds',
  labelNames: [ 'operation', 'success' ],
})

export function startMetricsServer() {

  app.get('/metrics', async (req, res) => {

    const collectDefaultMetrics = client.collectDefaultMetrics;

    collectDefaultMetrics();
    
    res.set('Content-Type', client.register.contentType);
    
    return res.send(await client.register.metrics())
  });

  app.listen(9100, () => {
    log.info('Metrics server started at http://localhost:9100')
  });
}