import ProblemForm from "./ProblemForm"
import Togglable from "./Togglable"

interface CurrentUser {
  username: string,
  name: string,
  id: string,
  token: string,
}

interface HomepageProps {
  user: CurrentUser
}

const Homepage: React.FC<HomepageProps> = ({ user }) => {
  return (
    <div>
      {user.name} logged in successfully!
      <Togglable>
        <ProblemForm />
      </Togglable>
    </div>
  )
}

export default Homepage