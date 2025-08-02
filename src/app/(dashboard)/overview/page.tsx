'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { DataTable } from '@/components/ui/data-table'
import { columns, data as tableData } from './table-data'
import { ThemeToggle } from '@/components/theme-toggle'
import { ExportButtons } from '@/components/export-buttons'
import { DateFilter } from '@/components/date-filter'
import { LoadingSkeleton } from '@/components/loading-skeleton'

export default function OverviewPage() {
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [userData, setUserData] = useState<any[]>([])
  const [filteredTableData, setFilteredTableData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Simulate data fetch and real-time updates
  useEffect(() => {
    setRevenueData([
      { date: '2025-07-01', revenue: 4800 },
      { date: '2025-07-02', revenue: 5000 },
      { date: '2025-07-03', revenue: 4900 },
      { date: '2025-07-04', revenue: 5150 },
      { date: '2025-07-05', revenue: 5400 },
    ])
    setUserData([
      { date: '2025-07-01', users: 120 },
      { date: '2025-07-02', users: 150 },
      { date: '2025-07-03', users: 100 },
      { date: '2025-07-04', users: 180 },
      { date: '2025-07-05', users: 200 },
    ])
    setFilteredTableData(tableData)
    setLoading(false)

    const interval = setInterval(() => {
      const newDate = new Date().toISOString().split('T')[0]
      setRevenueData(prev => [...prev.slice(1), { date: newDate, revenue: Math.floor(4500 + Math.random() * 1000) }])
      setUserData(prev => [...prev.slice(1), { date: newDate, users: Math.floor(100 + Math.random() * 100) }])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleDateFilter = ({ start, end }: { start: string; end: string }) => {
    const from = new Date(start)
    const to = new Date(end)
    const filtered = tableData.filter(row => {
      const date = new Date(row.date)
      return date >= from && date <= to
    })
    setFilteredTableData(filtered)
  }

  const deviceData = [
    { name: 'Mobile', value: 65 },
    { name: 'Desktop', value: 30 },
    { name: 'Tablet', value: 5 },
  ]

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard Overview</h1>
        <ThemeToggle />
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Revenue', value: '$25,000' },
          { title: 'Users', value: '3,200' },
          { title: 'Conversions', value: '220' },
          { title: 'Growth', value: '8.5%' },
        ].map((item) => (
          <Card key={item.title} className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-medium">{item.value}</CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Revenue (Line Chart)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {loading ? (
              <LoadingSkeleton height={288} />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#4f46e5" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Users (Bar Chart)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {loading ? (
              <LoadingSkeleton height={288} />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Device Breakdown (Pie Chart)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#6366f1"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Table with Filters & Export */}
      <Card className="hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Recent Revenue Data</CardTitle>
        </CardHeader>
        <CardContent>
          <DateFilter onChange={handleDateFilter} />
          <ExportButtons data={filteredTableData} />
          {loading ? (
            <LoadingSkeleton height={300} />
          ) : (
            <DataTable columns={columns} data={filteredTableData} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
