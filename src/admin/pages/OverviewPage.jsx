import { useEffect, useState } from 'react'
import KpiCard from '../components/cards/KpiCard.jsx'
import RoutesChart from '../components/charts/RoutesChart.jsx'
import SessionsChart from '../components/charts/SessionsChart.jsx'
import TopScenesChart from '../components/charts/TopScenesChart.jsx'
import { useAdminFilters } from '../hooks/useAdminFilters.jsx'
import { getOverviewMetrics } from '../services/admin-api.js'

export default function OverviewPage() {
  const { filters } = useAdminFilters()
  const [data, setData] = useState({
    metrics: [],
    sessionsDaily: [],
    topScenes: [],
    topRoutes: [],
  })

  useEffect(() => {
    getOverviewMetrics(filters).then(setData)
  }, [filters])

  return (
    <div className="admin-page">
      <section className="admin-kpi-grid">
        {data.metrics.map((metric) => (
          <KpiCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="admin-chart-grid admin-chart-grid--hero">
        <SessionsChart data={data.sessionsDaily} />
        <TopScenesChart data={data.topScenes} />
      </section>

      <section className="admin-chart-grid">
        <RoutesChart data={data.topRoutes} />
      </section>
    </div>
  )
}
