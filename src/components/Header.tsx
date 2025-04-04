import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface HeaderProps {
  children: ReactNode
  className?: string
}

const HeaderLeft = ({ children, className }: HeaderProps) => {
  return <div className={twMerge('justify-self-start', className)}>{children}</div>
}

const HeaderRight = ({ children, className }: HeaderProps) => {
  return <div className={twMerge('justify-self-end', className)}>{children}</div>
}

export const Header = ({ children, className }: HeaderProps) => {
  return <div className={twMerge('grid grid-cols-3 items-center py-2', className)}>{children}</div>
}

Header.Left = HeaderLeft
Header.Right = HeaderRight
