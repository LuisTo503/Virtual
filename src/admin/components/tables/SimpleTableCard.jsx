import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card.jsx'

export default function SimpleTableCard({ title, columns, rows, emptyLabel = 'Sin datos para mostrar.' }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? rows.map((row, index) => (
                <tr key={`${title}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.key}>{row[column.key]}</td>
                  ))}
                </tr>
              )) : (
                <tr>
                  <td colSpan={columns.length}>{emptyLabel}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
