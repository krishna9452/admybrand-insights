import { Cards } from '../components/cards'
import { Charts } from '../components/charts'
import { DataTable } from '../components/data-table'
import { ModeToggle } from '../components/mode-toggle'

export default async function OverviewPage() {
  const response = await fetch('http://localhost:3000/api/mock-data')
  const data = await response.json()

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">ADmyBRAND Insights</h1>
        <ModeToggle />
      </div>

      <Cards metrics={data.metrics} />
      <Charts timeSeries={data.timeSeries} campaigns={data.campaigns} />
      <DataTable data={data.tableData} />
    </div>
  )
}