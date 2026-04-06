import { RotateCcw } from 'lucide-react'
import { Button } from '../../../components/ui/button.jsx'
import { useAdminFilters } from '../../hooks/useAdminFilters.jsx'

export default function DashboardFilters() {
  const { filters, updateFilter, resetFilters } = useAdminFilters()

  return (
    <div className="admin-filters">
      <label className="admin-filters__field">
        <span>Desde</span>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(event) => updateFilter('dateFrom', event.target.value)}
        />
      </label>

      <label className="admin-filters__field">
        <span>Hasta</span>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(event) => updateFilter('dateTo', event.target.value)}
        />
      </label>

      <label className="admin-filters__field">
        <span>Dispositivo</span>
        <select value={filters.device} onChange={(event) => updateFilter('device', event.target.value)}>
          <option value="all">Todos</option>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
        </select>
      </label>

      <Button variant="outline" size="sm" onClick={resetFilters}>
        <RotateCcw size={14} />
        <span>Reset</span>
      </Button>
    </div>
  )
}
