interface ButtonProps {
  children: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button