import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card.jsx'

export default function SessionsChart({ data, title = 'Sesiones por dia', dataKey = 'sessions' }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="chart-card">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey={dataKey} stroke="#0f6e56" fill="#7ec7a4" fillOpacity={0.35} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
