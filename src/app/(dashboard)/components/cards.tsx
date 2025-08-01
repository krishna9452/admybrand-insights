import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUp, ArrowDown, TrendingUp, LucideIcon } from 'lucide-react'

// Define the metric type for individual metrics
interface Metric {
  current: number
  change: number
  trend: 'up' | 'down'
}

// Define the metrics object type
interface MetricsData {
  revenue: Metric
  users: Metric
  conversions: Metric
  growth: Metric
}

// Define the props for the Cards component
interface CardsProps {
  metrics: MetricsData
}

// Define the type for individual card data
interface MetricCard {
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: LucideIcon
}

export function Cards({ metrics }: CardsProps) {
  const metricCards: MetricCard[] = [
    {
      title: 'Revenue',
      value: `$${metrics.revenue.current.toLocaleString()}`,
      change: metrics.revenue.change,
      trend: metrics.revenue.trend,
      icon: TrendingUp,
    },
    {
      title: 'Users',
      value: metrics.users.current.toLocaleString(),
      change: metrics.users.change,
      trend: metrics.users.trend,
      icon: TrendingUp,
    },
    {
      title: 'Conversions',
      value: metrics.conversions.current.toLocaleString(),
      change: metrics.conversions.change,
      trend: metrics.conversions.trend,
      icon: TrendingUp,
    },
    {
      title: 'Growth',
      value: `${metrics.growth.current}%`,
      change: metrics.growth.change,
      trend: metrics.growth.trend,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {metricCards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {card.trend === 'up' ? (
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              {card.change}% vs last period
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}