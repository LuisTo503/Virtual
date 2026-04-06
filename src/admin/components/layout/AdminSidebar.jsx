import { BarChart3, Compass, Download, GraduationCap, House, Radar, Table2 } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Badge } from '../../../components/ui/badge.jsx'
import { ADMIN_ROUTES } from '../../app/admin-routes.js'

const iconMap = {
  overview: House,
  navigation: Compass,
  learning: GraduationCap,
  sessions: Table2,
  traffic: Radar,
  exports: Download,
}

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-brand__mark">TV</div>
        <div>
          <div className="admin-brand__title">Admin Dashboard</div>
          <div className="admin-brand__subtitle">Tour Verde Virtual</div>
        </div>
      </div>

      <div className="admin-sidebar__section">
        <Badge tone="success">v1 base</Badge>
      </div>

      <nav className="admin-nav">
        {ADMIN_ROUTES.map((route) => {
          const Icon = iconMap[route.key] || BarChart3

          return (
            <NavLink
              key={route.key}
              to={route.path}
              className={({ isActive }) => `admin-nav__link ${isActive ? 'is-active' : ''}`}
            >
              <Icon size={16} />
              <span>{route.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
