'use client'

import { useState } from 'react'

export function DateFilter({ onChange }: { onChange: (range: { start: string; end: string }) => void }) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const applyFilter = () => {
    if (start && end) onChange({ start, end })
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
      <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="border p-2 rounded" />
      <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="border p-2 rounded" />
      <button onClick={applyFilter} className="bg-blue-500 text-white px-3 py-1 rounded">Apply</button>
    </div>
  )
}
