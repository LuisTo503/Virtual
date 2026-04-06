import { useEffect, useState } from 'react'
import KpiCard from '../components/cards/KpiCard.jsx'
import QuizAccuracyChart from '../components/charts/QuizAccuracyChart.jsx'
import TopScenesChart from '../components/charts/TopScenesChart.jsx'
import SimpleTableCard from '../components/tables/SimpleTableCard.jsx'
import { useAdminFilters } from '../hooks/useAdminFilters.jsx'
import { getLearningMetrics } from '../services/admin-api.js'

export default function LearningPage() {
  const { filters } = useAdminFilters()
  const [data, setData] = useState({ learningMetrics: [], quizAccuracy: [], topScenes: [], sceneLearningRows: [] })

  useEffect(() => {
    getLearningMetrics(filters).then(setData)
  }, [filters])

  return (
    <div className="admin-page">
      <section className="admin-intro-card">
        <h2>Indicadores de aprendizaje e interaccion</h2>
        <p>Esta vista agrupara quizzes, audio, video e interacciones educativas por escena para medir valor pedagogico real.</p>
      </section>

      <section className="admin-kpi-grid">
        {data.learningMetrics.map((metric) => (
          <KpiCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="admin-chart-grid admin-chart-grid--hero">
        <QuizAccuracyChart data={data.quizAccuracy} />
        <TopScenesChart data={data.topScenes} title="Escenas con mas engagement educativo" />
      </section>

      <section className="admin-chart-grid">
        <SimpleTableCard
          title="Resumen de aprendizaje por escena"
          columns={[
            { key: 'scene', label: 'Escena' },
            { key: 'attempts', label: 'Intentos' },
            { key: 'correct', label: 'Correctas' },
            { key: 'accuracy', label: 'Precision' },
          ]}
          rows={data.sceneLearningRows}
        />
      </section>
    </div>
  )
}
