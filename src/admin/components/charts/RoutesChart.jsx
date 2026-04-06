import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card.jsx'

const COLORS = ['#0f6e56', '#7ec7a4', '#f2b56b', '#d96b4a']

export default function RoutesChart({ data, title = 'Rutas mas usadas' }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="chart-card">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={data} dataKey="sessions" nameKey="route" innerRadius={56} outerRadius={92} paddingAngle={2}>
              {data.map((entry, index) => (
                <Cell key={entry.route} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
