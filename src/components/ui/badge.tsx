import { cn } from '@/lib/util'

export default function Badge({
  children,
  className
}: {
  children: React.ReactNode,
  className?: string
}) {
  return (
    <div
      className={cn(
        'px-4 py-1 bg-primary rounded text-xs text-primary-foreground',
        className
      )}
    >
      {children}
    </div>
  )
}
