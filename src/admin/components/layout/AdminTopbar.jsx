import { useLocation } from 'react-router-dom'
import DashboardFilters from '../filters/DashboardFilters.jsx'

const titleMap = {
  '/admin/overview': 'Resumen general',
  '/admin/navigation': 'Navegacion del tour',
  '/admin/learning': 'Aprendizaje e interaccion',
  '/admin/sessions': 'Sesiones',
  '/admin/traffic': 'Trafico y adquisicion',
  '/admin/exports': 'Exportaciones CSV',
}

export default function AdminTopbar() {
  const location = useLocation()
  const title = titleMap[location.pathname] || 'Panel admin'

  return (
    <header className="admin-topbar">
      <div>
        <p className="admin-topbar__eyebrow">Panel interno</p>
        <h1 className="admin-topbar__title">{title}</h1>
      </div>
      <DashboardFilters />
    </header>
  )
}
