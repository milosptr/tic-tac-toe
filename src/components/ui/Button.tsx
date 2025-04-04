import { twMerge } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export const Button = ({ children, className, onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'bg-tertiary-500 hover:bg-tertiary-600 active:bg-tertiary-500 rounded-lg px-4 py-2 duration-300 cursor-pointer text-white',
        className,
        disabled && 'opacity-80 hover:bg-tertiary-500 active:bg-tertiary-500 cursor-not-allowed',
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
