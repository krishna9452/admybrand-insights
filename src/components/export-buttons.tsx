'use client'

import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { saveAs } from 'file-saver'

export function ExportButtons({ data }: { data: any[] }) {
  const exportCSV = () => {
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(',')),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'data.csv')
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      head: [Object.keys(data[0])],
      body: data.map((row) => Object.values(row)),
    })
    doc.save('data.pdf')
  }

  return (
    <div className="flex gap-2 mt-4">
      <button onClick={exportCSV} className="px-3 py-1 bg-blue-600 text-white rounded">Export CSV</button>
      <button onClick={exportPDF} className="px-3 py-1 bg-red-600 text-white rounded">Export PDF</button>
    </div>
  )
}
