interface ErrorProps {
  message: string | undefined,
}

const Error = (props: ErrorProps) => {
  if (!props.message) {
    return null
  }

  return (
    <div>
      There was an Error: {props.message}
    </div>
  )
}

export default Error