interface ErrorProps {
  message: string,
}

const Error = (props: ErrorProps) => {
  return (
    <div>
      There was an Error: {props.message}
    </div>
  )
}

export default Error