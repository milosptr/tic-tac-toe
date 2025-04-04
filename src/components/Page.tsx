import { twMerge } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  className?: string
}

export const Page = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge('bg-primary-500 rounded-lg px-4 py-10 pattern text-white min-h-[50vh] max-w-full', className)}
    >
      {children}
    </div>
  )
}
