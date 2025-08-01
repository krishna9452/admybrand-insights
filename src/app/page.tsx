import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">ADmyBRAND Insights</h1>
      <p className="text-muted-foreground">
        AI-Powered Analytics Dashboard for Digital Marketing
      </p>
      <Link
        href="/overview"
        className={buttonVariants({ variant: 'default' })}
      >
        View Dashboard
      </Link>
    </div>
  )
}