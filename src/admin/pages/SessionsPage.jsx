import { useEffect, useState } from 'react'
import SessionsTable from '../components/tables/SessionsTable.jsx'
import { useAdminFilters } from '../hooks/useAdminFilters.jsx'
import { getSessionsTable } from '../services/admin-api.js'

export default function SessionsPage() {
  const { filters } = useAdminFilters()
  const [rows, setRows] = useState([])

  useEffect(() => {
    getSessionsTable(filters).then(setRows)
  }, [filters])

  return (
    <div className="admin-page">
      <section className="admin-intro-card">
        <h2>Detalle de sesiones del recorrido</h2>
        <p>Aqui vivira la tabla operativa para revisar actividad, filtros y profundidad de uso por sesion.</p>
      </section>

      <SessionsTable rows={rows} />
    </div>
  )
}
