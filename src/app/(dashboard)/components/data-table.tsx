'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download } from 'lucide-react'

interface CampaignPerformance {
  campaign: string
  channel: string
  clicks: number
  impressions: number
  ctr: number
  cost: number
  conversions: number
}

// Define the columns with explicit cell renderers
const columns: ColumnDef<CampaignPerformance>[] = [
  {
    id: 'campaign',
    header: 'Campaign',
    cell: ({ row }) => row.original.campaign,
  },
  {
    id: 'channel',
    header: 'Channel',
    cell: ({ row }) => row.original.channel,
  },
  {
    id: 'clicks',
    header: 'Clicks',
    cell: ({ row }) => row.original.clicks.toLocaleString(),
  },
  {
    id: 'impressions',
    header: 'Impressions',
    cell: ({ row }) => row.original.impressions.toLocaleString(),
  },
  {
    id: 'ctr',
    header: 'CTR (%)',
    cell: ({ row }) => row.original.ctr.toFixed(2),
  },
  {
    id: 'cost',
    header: 'Cost ($)',
    cell: ({ row }) => row.original.cost.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  },
  {
    id: 'conversions',
    header: 'Conversions',
    cell: ({ row }) => row.original.conversions.toLocaleString(),
  },
]

interface DataTableProps {
  data: CampaignPerformance[]
}

export function DataTable({ data }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const exportToCSV = () => {
    // Define the property order for CSV export
    const properties: (keyof CampaignPerformance)[] = [
      'campaign',
      'channel',
      'clicks',
      'impressions',
      'ctr',
      'cost',
      'conversions'
    ];

    const headers = columns.map(col => col.header as string);
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        properties
          .map(property => {
            const value = row[property];
            if (property === 'cost' || property === 'ctr') {
              return Number(value).toFixed(2);
            }
            return String(value);
          })
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'admybrand-data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Campaign Performance</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Filter campaigns..."
            value={(table.getColumn('campaign')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('campaign')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}