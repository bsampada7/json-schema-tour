import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
import { useContext } from "react";
import { TourContext } from "@/pages/_app";

const navLinks = [
  {
    name: "Specification",
    href: "https://json-schema.org/specification",
  },
  {
    name: "Docs",
    href: "https://json-schema.org/learn/getting-started-step-by-step",
  },

  {
    name: "Tools",
    href: "https://json-schema.org/implementations",
  },
  {
    name: "Blog",
    href: "https://json-schema.org/blog",
  },
  {
    name: "Community",
    href: "https://json-schema.org/#community",
  },
]

const Nav = () => {
  const { tourPageNumber, setTourPageNumber } = useContext(TourContext);

  const onClickTour = () => {
    if (tourPageNumber === 0) {
      setTourPageNumber(1)
    } else {
      setTourPageNumber(0)
    }
  }

  return (
    <div className='flex justify-end md:mr-8 w-full gap-2'>
      {tourPageNumber > 0 ? <span className="font-semibold p-2 md:p-4 dark:text-slate-300 text-slate">
        A tour of JSON Schema
      </span>
        :
        <>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold p-2 md:p-4 dark:text-slate-300 text-slate-600 hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </>
      }

      <div className='flex items-center max-sm:ml-4 mr-8  gap-6 md:gap-4 dark:bg-slate-800'>
        <ThemeToggle />
      </div>
      <div className='flex items-center justify-end mr-8'>
        <a
          data-testid='Button-link'
          target='_blank'
          rel='noopener noreferrer'
          className='cursor-pointer hidden lg:flex bg-primary hover:bg-blue-700 text-white transition-all duration-500 ease-in-out rounded-md px-3 text-sm font-medium tracking-heading py-2.5 ml-2'
          onClick={onClickTour}
        >
          <span className='inline-block'>
            {tourPageNumber == 0 ? "Start Tour" : "End Tour"}
          </span>
        </a>
      </div>
    </div>
  )
}

export default Nav