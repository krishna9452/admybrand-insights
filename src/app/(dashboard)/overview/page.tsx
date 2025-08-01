'use client'

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface RevenueData {
  date: string;
  revenue: number;
}

export default function OverviewPage() {
  const [data, setData] = useState<RevenueData[]>([]);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Example data; replace this with your real fetch logic
    const fetchData = async () => {
      const mockData: RevenueData[] = [
        { date: "2025-07-01", revenue: 5000 },
        { date: "2025-07-02", revenue: 5200 },
        { date: "2025-07-03", revenue: 5100 },
        { date: "2025-07-04", revenue: 5300 },
        { date: "2025-07-05", revenue: 5500 },
      ];
      setData(mockData);
    };
    fetchData();
  }, []);

  function exportToCSV() {
    const csvRows = [
      ['Date', 'Revenue'],
      ...data.map(row => [row.date, row.revenue])
    ];

    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'revenue-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportToPDF() {
    if (!pdfRef.current) return;

    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("revenue-chart.pdf");
    });
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Revenue Overview</h1>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={exportToPDF}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <Card ref={pdfRef}>
        <CardContent className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
