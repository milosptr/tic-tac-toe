import { twMerge } from 'tailwind-merge'

type Props = {
  children: React.ReactNode
  className?: string
}

export const Card = ({ children, className }: Props) => {
  return <div className={twMerge('bg-white px-4 py-2 rounded-md text-black', className)}>{children}</div>
}
