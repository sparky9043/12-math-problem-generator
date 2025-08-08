interface ErrorProps {
  message: string | undefined,
  onRetry: () => void,
}

const Error = (props: ErrorProps) => {

  if (!props.message) {
    return null
  }

  return (
    <div>
      <p>
        There was an Error: {props.message}
      </p>
      <button
        className="border-2 px-2 py-1 rounded hover:cursor-pointer"
        onClick={props.onRetry}
      >retry</button>
    </div>
  )
}

export default Error