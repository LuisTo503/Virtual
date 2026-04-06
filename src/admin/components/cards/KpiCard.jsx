import { ArrowUpRight } from 'lucide-react'
import { Badge } from '../../../components/ui/badge.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card.jsx'

export default function KpiCard({ label, value, delta, tone = 'default' }) {
  return (
    <Card className="kpi-card">
      <CardHeader className="kpi-card__header">
        <CardTitle>{label}</CardTitle>
        <ArrowUpRight size={16} className="kpi-card__icon" />
      </CardHeader>
      <CardContent className="kpi-card__content">
        <div className="kpi-card__value">{value}</div>
        {delta ? <Badge tone={tone}>{delta}</Badge> : null}
      </CardContent>
    </Card>
  )
}
