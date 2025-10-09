import Logo from "./Logo"

const HomePage = () => {
  return (
    <div className="p-6 text-emerald-700 h-2/5 text-shadow-md text-shadow-stone-300">
      <div className="text-center">
        <h2 className="font-bold text-2xl">
          Setup Your Classroom <br /> with
        </h2>
        <div className="flex flex-col items-center my-2">
          <p className="uppercase font-bold text-xl">Chalk-Lit</p>
          <Logo color="dark" size='md' shadow="dark" />
        </div>
      </div>
    </div>
  )
}

export default HomePage