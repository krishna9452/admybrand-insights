export function LoadingSkeleton({ height = 24, width = '100%' }: { height?: number; width?: number | string }) {
  return (
    <div
      style={{ height, width }}
      className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
    />
  )
}
