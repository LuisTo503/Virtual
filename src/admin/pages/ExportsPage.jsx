import { useEffect, useRef, useState } from 'react'
import { Download, FileImage, FileText, FileType2 } from 'lucide-react'
import { Button } from '../../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.jsx'
import QuizAccuracyChart from '../components/charts/QuizAccuracyChart.jsx'
import RoutesChart from '../components/charts/RoutesChart.jsx'
import SessionsChart from '../components/charts/SessionsChart.jsx'
import { useAdminFilters } from '../hooks/useAdminFilters.jsx'
import { getExportBundle } from '../services/admin-api.js'
import {
  exportConsolidatedCsv,
  exportConsolidatedCsvFromBackend,
  exportElementAsJpg,
  exportElementAsPdf,
  exportElementAsPng,
  exportGeneralReportPdf,
} from '../services/export-service.js'

function ExportChartCard({ title, description, chartRef, onExportPng, onExportJpg, onExportPdf, children }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={chartRef}>{children}</div>
        <div className="admin-export-actions">
          <Button variant="outline" size="sm" onClick={onExportPng}>
            <FileImage size={15} />
            <span>PNG</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onExportJpg}>
            <FileImage size={15} />
            <span>JPG</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onExportPdf}>
            <FileText size={15} />
            <span>PDF</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ExportsPage() {
  const { filters } = useAdminFilters()
  const [bundle, setBundle] = useState(null)
  const sessionsRef = useRef(null)
  const routesRef = useRef(null)
  const quizRef = useRef(null)

  useEffect(() => {
    getExportBundle(filters).then(setBundle)
  }, [filters])

  if (!bundle) {
    return (
      <div className="admin-page">
        <section className="admin-intro-card">
          <h2>Exportaciones</h2>
          <p>Cargando datos del centro de exportaciones...</p>
        </section>
      </div>
    )
  }

  const fileSuffix = `${filters.dateFrom}_${filters.dateTo}`

  const handleCsvExport = async () => {
    try {
      await exportConsolidatedCsvFromBackend(filters)
    } catch {
      exportConsolidatedCsv({ filters, bundle })
    }
  }

  return (
    <div className="admin-page">
      <section className="admin-intro-card">
        <h2>Centro de exportaciones</h2>
        <p>
          Aqui ya puedes descargar un CSV consolidado con todas las entradas agregadas del dashboard,
          exportar las graficas en imagen o PDF y generar un reporte general segun el rango de fechas activo.
        </p>
      </section>

      <section className="admin-export-toolbar">
        <Button
          onClick={handleCsvExport}
        >
          <Download size={16} />
          <span>CSV consolidado</span>
        </Button>

        <Button
          variant="outline"
          onClick={() => exportGeneralReportPdf({ filters, bundle })}
        >
          <FileType2 size={16} />
          <span>Reporte general PDF</span>
        </Button>
      </section>

      <section className="admin-export-grid">
        <ExportChartCard
          title="Sesiones por dia"
          description="Grafica base para resumen temporal del uso del dashboard."
          chartRef={sessionsRef}
          onExportPng={() => exportElementAsPng(sessionsRef.current, `sesiones-diarias-${fileSuffix}.png`)}
          onExportJpg={() => exportElementAsJpg(sessionsRef.current, `sesiones-diarias-${fileSuffix}.jpg`)}
          onExportPdf={() => exportElementAsPdf(sessionsRef.current, `sesiones-diarias-${fileSuffix}.pdf`, 'Sesiones por dia')}
        >
          <SessionsChart data={bundle.sessionsDaily} />
        </ExportChartCard>

        <ExportChartCard
          title="Rutas mas usadas"
          description="Distribucion de las rutas principales del recorrido."
          chartRef={routesRef}
          onExportPng={() => exportElementAsPng(routesRef.current, `rutas-${fileSuffix}.png`)}
          onExportJpg={() => exportElementAsJpg(routesRef.current, `rutas-${fileSuffix}.jpg`)}
          onExportPdf={() => exportElementAsPdf(routesRef.current, `rutas-${fileSuffix}.pdf`, 'Rutas mas usadas')}
        >
          <RoutesChart data={bundle.topRoutes} />
        </ExportChartCard>

        <ExportChartCard
          title="Precision de quizzes"
          description="Indicador resumido del rendimiento educativo."
          chartRef={quizRef}
          onExportPng={() => exportElementAsPng(quizRef.current, `quiz-accuracy-${fileSuffix}.png`)}
          onExportJpg={() => exportElementAsJpg(quizRef.current, `quiz-accuracy-${fileSuffix}.jpg`)}
          onExportPdf={() => exportElementAsPdf(quizRef.current, `quiz-accuracy-${fileSuffix}.pdf`, 'Precision de quizzes')}
        >
          <QuizAccuracyChart data={bundle.quizAccuracy} />
        </ExportChartCard>
      </section>
    </div>
  )
}
