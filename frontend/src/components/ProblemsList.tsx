import type { CurrentUser } from "../App"
import ProblemForm from "./ProblemForm"
import Togglable from "./Togglable"

interface HomepageProps {
  user: CurrentUser | null
}

const ProblemsList = (props: HomepageProps) => {
  console.log(props.user)
  return (
    <div>
      {/* {props.user.name} logged in successfully! */}
      <Togglable>
        <ProblemForm />
      </Togglable>
    </div>
  )
}

export default ProblemsList