import { useEffect, useState } from 'react'
import QuizAccuracyChart from '../components/charts/QuizAccuracyChart.jsx'
import TopScenesChart from '../components/charts/TopScenesChart.jsx'
import { useAdminFilters } from '../hooks/useAdminFilters.jsx'
import { getLearningMetrics } from '../services/admin-api.js'

export default function LearningPage() {
  const { filters } = useAdminFilters()
  const [data, setData] = useState({ quizAccuracy: [], topScenes: [] })

  useEffect(() => {
    getLearningMetrics(filters).then(setData)
  }, [filters])

  return (
    <div className="admin-page">
      <section className="admin-intro-card">
        <h2>Indicadores de aprendizaje e interaccion</h2>
        <p>Esta vista agrupara quizzes, audio, video e interacciones educativas por escena para medir valor pedagogico real.</p>
      </section>

      <section className="admin-chart-grid admin-chart-grid--hero">
        <QuizAccuracyChart data={data.quizAccuracy} />
        <TopScenesChart data={data.topScenes} title="Escenas con mas engagement educativo" />
      </section>
    </div>
  )
}
