interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode,
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button className="" {...rest}>
      {children}
    </button>
  )
}

export default Button