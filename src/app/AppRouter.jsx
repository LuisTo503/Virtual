import { Navigate, Route, Routes } from 'react-router-dom'
import TourApp from '../App.jsx'
import AdminApp from '../admin/app/AdminApp.jsx'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/" element={<TourApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
