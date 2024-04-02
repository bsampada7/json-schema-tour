import Link from "next/link"

const navLinks = [
  {
    name: "Specification",
    href: "https://json-schema.org/specification",
  },
  {
    name: "Docs",
    href: "https://json-schema.org/docs",
  },

  {
    name: "Tools",
    href: "https://json-schema.org/tools",
  },
  {
    name: "Blog",
    href: "https://json-schema.org/blog",
  },
  {
    name: "Community",
    href: "https://json-schema.org/community",
  },
]

const Nav = () => {
  return (
    <div className='flex justify-end md:mr-8 w-full '>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="font-semibold p-2 md:p-4 dark:text-slate-300 text-slate-600 hover:underline"
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default Nav