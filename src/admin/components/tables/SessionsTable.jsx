import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card.jsx'

export default function SessionsTable({ rows }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sesiones recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sesion</th>
                <th>Dispositivo</th>
                <th>Ruta</th>
                <th>Entrada</th>
                <th>Escenas</th>
                <th>Interacciones</th>
                <th>Ultima actividad</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.device}</td>
                  <td>{row.route}</td>
                  <td>{row.entry}</td>
                  <td>{row.views}</td>
                  <td>{row.interactions}</td>
                  <td>{row.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
