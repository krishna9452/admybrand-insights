import { NextResponse } from 'next/server'

export async function GET() {
  // Generate realistic mock data
  const metrics = {
    revenue: {
      current: 125000,
      change: 12.5,
      trend: 'up',
    },
    users: {
      current: 8452,
      change: 5.3,
      trend: 'up',
    },
    conversions: {
      current: 3241,
      change: -2.1,
      trend: 'down',
    },
    growth: {
      current: 18.7,
      change: 3.2,
      trend: 'up',
    },
  }

  // Time series data for charts
  const timeSeries = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2023, i).toLocaleString('default', { month: 'short' }),
    revenue: Math.floor(Math.random() * 30000) + 80000,
    users: Math.floor(Math.random() * 2000) + 6000,
    conversions: Math.floor(Math.random() * 1000) + 2000,
  }))

  // Campaign data for pie chart
  const campaigns = [
    { name: 'Social Media', value: 45 },
    { name: 'Email Marketing', value: 25 },
    { name: 'PPC', value: 20 },
    { name: 'Organic', value: 10 },
  ]

  // Table data
  const tableData = Array.from({ length: 50 }, (_, i) => ({
    id: `campaign-${i}`,
    campaign: `Campaign ${i + 1}`,
    channel: ['Social', 'Email', 'PPC', 'Organic'][Math.floor(Math.random() * 4)],
    clicks: Math.floor(Math.random() * 5000),
    impressions: Math.floor(Math.random() * 100000),
    ctr: (Math.random() * 10).toFixed(2),
    cost: Math.floor(Math.random() * 5000),
    conversions: Math.floor(Math.random() * 200),
  }))

  return NextResponse.json({
    metrics,
    timeSeries,
    campaigns,
    tableData,
  })
}