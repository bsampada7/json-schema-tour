import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [themeIcon, setthemeIcon] = useState("/images/icons/moon.svg")

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    if (theme === 'light') {
      setthemeIcon("/images/icons/moon.svg")
    }
    else {
      setthemeIcon("/images/icons/sun.svg")
    }
    return () => {
    }
  }, [theme])

  return (
    <button
      onClick={toggleTheme}
      className='rounded-md dark:hover:bg-gray-700 p-1.5 hover:bg-gray-100 transition duration-150'
    >
      <Image src={themeIcon} alt='Toggle theme' width={25} height={25} />
    </button>
  )
}

export default ThemeToggle