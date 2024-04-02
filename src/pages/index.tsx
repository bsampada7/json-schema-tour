import Logo from "@/components/Logo";
import Nav from "@/components/Nav";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <header className="w-full bg-white dark:bg-slate-800 fixed top-0 z-[170] shadow-xl drop-shadow-lg">
        <div className="flex w-full md:justify-between items-center ml-8 2xl:px-12 py-4">
          <Logo />
          <Nav />
        </div>
      </header>
    </main>
  );
}
