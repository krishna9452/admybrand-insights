import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-9 w-[250px]" />
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[120px]" />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 mb-8">
        <Skeleton className="h-[348px]" />
        <Skeleton className="h-[348px]" />
        <Skeleton className="h-[348px] md:col-span-2" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-9 w-[200px]" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-[200px]" />
            <Skeleton className="h-9 w-[100px]" />
          </div>
        </div>
        <Skeleton className="h-[400px]" />
        <div className="flex justify-end gap-2">
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[100px]" />
        </div>
      </div>
    </div>
  )
}