import Logo from "./Logo"

const HomePage = () => {
  return (
    <div className="p-6 text-emerald-900 h-2/5">
      <div className="text-center">
        <h2 className="font-bold text-xl">
          Setup Your Classroom with
        </h2>
        <div className="flex flex-col items-center my-2">
          <p className="uppercase font-bold">Chalk-Lit</p>
          <Logo color="dark" size='md' />
        </div>
      </div>
    </div>
  )
}

export default HomePage