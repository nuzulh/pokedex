'use client'

export default function Button({
  children,
  onClick,
  disabled
}: {
  children: React.ReactNode,
  onClick?: () => void,
  disabled?: boolean
}) {
  return (
    <button disabled={disabled} className='border border-primary py-1 px-4 rounded shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-100 disabled:pointer-events-none disabled:border-gray-500 disabled:text-gray-500' onClick={onClick}>
      {children}
    </button>
  )
}
