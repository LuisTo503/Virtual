import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminFiltersProvider } from '../hooks/useAdminFilters.jsx'
import AdminLayout from '../components/layout/AdminLayout.jsx'
import OverviewPage from '../pages/OverviewPage.jsx'
import NavigationPage from '../pages/NavigationPage.jsx'
import LearningPage from '../pages/LearningPage.jsx'
import SessionsPage from '../pages/SessionsPage.jsx'
import TrafficPage from '../pages/TrafficPage.jsx'
import ExportsPage from '../pages/ExportsPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import UnauthorizedPage from '../pages/UnauthorizedPage.jsx'
import { ADMIN_ROUTE_REDIRECT } from './admin-routes.js'
import '../styles/admin.css'

export default function AdminApp() {
  return (
    <AdminFiltersProvider>
      <Routes>
        <Route index element={<Navigate to={ADMIN_ROUTE_REDIRECT} replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />
        <Route element={<AdminLayout />}>
          <Route path="overview" element={<OverviewPage />} />
          <Route path="navigation" element={<NavigationPage />} />
          <Route path="learning" element={<LearningPage />} />
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="traffic" element={<TrafficPage />} />
          <Route path="exports" element={<ExportsPage />} />
        </Route>
        <Route path="*" element={<Navigate to={ADMIN_ROUTE_REDIRECT} replace />} />
      </Routes>
    </AdminFiltersProvider>
  )
}
