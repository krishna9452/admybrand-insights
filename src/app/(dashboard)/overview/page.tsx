export const dynamic = 'force-dynamic'; // Prevents static generation

import React from 'react';

export default async function OverviewPage() {
  const isVercel = process.env.VERCEL === '1';
  const baseUrl = isVercel
    ? process.env.NEXT_PUBLIC_API_BASE_URL 
    : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/overview`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch overview data. Status: ${res.status}`);
  }

  const data = await res.json();

  return (
    <div>
      <h1>Overview</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
