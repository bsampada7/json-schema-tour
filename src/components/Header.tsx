import Logo from './Logo'
import Nav from './Nav'

const Header = () => {
  return (
    <header className="w-full bg-white dark:bg-slate-800 fixed top-0 z-[170] shadow-xl drop-shadow-lg">
      <div className="flex w-full md:justify-between items-center ml-8 2xl:px-12 py-4">
        <Logo />
        <Nav />
      </div>
    </header>
  )
}


export default Header