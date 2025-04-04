import { twMerge } from 'tailwind-merge'

interface Props {
  variant?: 'danger'
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
  onClick?: () => void
}

export const BadgeButton = ({ children, icon, className, variant = 'danger', onClick }: Props) => {
  const variantStyles = {
    danger: 'bg-danger-50 hover:bg-danger-100 active:bg-danger-50 text-danger-500 hover:text-danger-600',
  }

  return (
    <div
      className={twMerge(
        'cursor-pointer flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium font-sans font-semibold tracking-wide duration-300',
        variantStyles[variant],
        className,
      )}
      onClick={onClick}
    >
      {icon}
      <div className="whitespace-nowrap">{children}</div>
    </div>
  )
}
