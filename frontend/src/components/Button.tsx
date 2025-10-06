type ButtonVariants = 'primary' | 'secondary'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode,
  variant?: ButtonVariants,
}

const variants: Record<ButtonVariants, string> = {
  primary: 'px-2 py-1 rounded bg-emerald-600 text-emerald-100 hover:cursor-pointer disabled:opacity-20',
  secondary: '',
}

const Button = ({ children, variant = 'primary', ...rest }: ButtonProps) => {
  const getStyles = (): string => {
    return `${variants[variant]}`
  }

  return (
    <button {...rest} className={getStyles()}>
      {children}
    </button>
  )
}

export default Button