import { createContext, useContext, useState } from 'react'

const AdminFiltersContext = createContext(null)

const defaultFilters = {
  dateFrom: '2026-04-01',
  dateTo: '2026-04-05',
  device: 'all',
  route: 'all',
  scene: 'all',
  channel: 'all',
  page: 'all',
  country: 'all',
}

export function AdminFiltersProvider({ children }) {
  const [filters, setFilters] = useState(defaultFilters)

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  return (
    <AdminFiltersContext.Provider value={{ filters, updateFilter, resetFilters }}>
      {children}
    </AdminFiltersContext.Provider>
  )
}

export function useAdminFilters() {
  const context = useContext(AdminFiltersContext)

  if (!context) {
    throw new Error('useAdminFilters must be used inside AdminFiltersProvider')
  }

  return context
}
