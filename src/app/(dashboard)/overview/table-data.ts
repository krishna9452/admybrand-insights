'use client'

import { ColumnDef } from '@tanstack/react-table'

export type Revenue = {
  id: string
  date: string
  revenue: number
  users: number
  conversionRate: string
}

export const data: Revenue[] = [
  { id: '1', date: '2025-07-01', revenue: 4800, users: 120, conversionRate: '3.1%' },
  { id: '2', date: '2025-07-02', revenue: 5000, users: 150, conversionRate: '4.2%' },
  { id: '3', date: '2025-07-03', revenue: 4900, users: 100, conversionRate: '2.8%' },
  { id: '4', date: '2025-07-04', revenue: 5150, users: 180, conversionRate: '5.0%' },
  { id: '5', date: '2025-07-05', revenue: 5400, users: 200, conversionRate: '5.3%' },
]

export const columns: ColumnDef<Revenue>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue',
  },
  {
    accessorKey: 'users',
    header: 'Users',
  },
  {
    accessorKey: 'conversionRate',
    header: 'Conversion Rate',
  },
]
