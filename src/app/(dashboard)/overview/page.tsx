export const dynamic = 'force-dynamic'; // Ensures data is fetched at request time

import React from 'react';

export default async function OverviewPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

  if (!baseUrl) {
    return (
      <div className="p-4">
        <h1>Error</h1>
        <p>Missing API base URL. Please set `NEXT_PUBLIC_API_BASE_URL` in your environment.</p>
      </div>
    );
  }

  try {
    const res = await fetch(`${baseUrl}/api/overview`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch overview data. Status: ${res.status}`);
    }

    const data = await res.json();

    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">Overview</h1>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="p-4">
        <h1>Error Loading Data</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
