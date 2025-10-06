type ButtonVariants = 'primary' | 'secondary'
type ButtonSizes = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode,
  variant?: ButtonVariants,
  size?: ButtonSizes,
}

const baseStyles: string = 'rounded-lg tracking-wider'

const variants: Record<ButtonVariants, string> = {
  primary: 'bg-emerald-600 text-emerald-50 hover:cursor-pointer disabled:opacity-20',
  secondary: 'bg-green-500 text-emerald-50 hover:cursor-pointer disabled:opacity-20',
}

const sizes: Record<ButtonSizes, string> = {
  sm: 'px-2 py-1 text-sm font-sm',
  md: 'px-3 py-2 text-base font-semibold',
  lg: 'px-4 py-2.5 text-lg font-lg',
}

const Button = ({ children, variant = 'primary', size = 'md', ...rest }: ButtonProps) => {
  const getStyles = (): string => {
    return `${baseStyles} ${variants[variant]} ${sizes[size]}`
  }

  return (
    <button {...rest} className={getStyles()}>
      {children}
    </button>
  )
}

export default Button