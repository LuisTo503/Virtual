import { useEffect, useState } from 'react'
import RoutesChart from '../components/charts/RoutesChart.jsx'
import SessionsChart from '../components/charts/SessionsChart.jsx'
import { getTrafficMetrics } from '../services/admin-api.js'

export default function TrafficPage() {
  const [data, setData] = useState({ sessionsDaily: [], trafficChannels: [] })

  useEffect(() => {
    getTrafficMetrics().then(setData)
  }, [])

  const channelsAsRoutes = data.trafficChannels.map((item) => ({
    route: item.channel,
    sessions: item.sessions,
  }))

  return (
    <div className="admin-page">
      <section className="admin-intro-card">
        <h2>Trafico y adquisicion web</h2>
        <p>Este modulo recibira datos agregados desde Google Analytics Data API para usuarios, sesiones, canales, paginas y geografia.</p>
      </section>

      <section className="admin-chart-grid admin-chart-grid--hero">
        <SessionsChart data={data.sessionsDaily} title="Sesiones web por dia" />
        <RoutesChart data={channelsAsRoutes} title="Canales de adquisicion" />
      </section>
    </div>
  )
}
