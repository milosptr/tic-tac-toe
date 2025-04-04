import { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

type Props = InputProps & {
  className?: string
  placeholder?: string
  onChange: (value: string) => void
}

export const TextInput = ({ placeholder, onChange, className, ...props }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <input
      type="text"
      {...props}
      placeholder={placeholder}
      className={twMerge('bg-white rounded-lg px-4 py-2', className)}
      onChange={handleChange}
    />
  )
}
