import { useContext } from "react";
import Header from "./Header"
import { TourContext } from "@/pages/_app";

const WelcomePage = () => {
  const { setTourPageNumber } = useContext(TourContext);
  return (
    <>
      <Header />
      <section className='bg-[linear-gradient(72.68deg,_#002CC4_28.97%,_#5468FF_145.47%)] clip-bottom w-full dark:bg-[linear-gradient(72.68deg,_#002C34_28.97%,_#5468FF_145.47%)]'>
        <div className='max-w-[1400px] text-center mx-auto mt-24 lg:mt-40 pb-24'>
          <h1 className='lg:leading-header text-h1mobile lg:text-h1 font-semibold text-white text-center px-1 md:px-0 dark:text-slate-200'>
            Welcome to the tour of JSON Schema
          </h1>

          <h2 className='lg:leading-6 text-center text-h5mobile md:text-h5  text-white mt-4 dark:text-slate-300'>
            JSON Schema enables the confident and reliable use of the JSON
            data format.
          </h2>

          <h2 className='lg:leading-6 text-center text-h5mobile md:text-h5  text-white mt-4 dark:text-slate-300'>
            Click on the button below to start the tour.
          </h2>

          <div className='lg:w-[650px]  mx-auto my-10 flex gap-8 justify-items-center '>
            <button
              className='w-[170px] h-[45px] mx-auto rounded border-2 bg-primary hover:bg-blue-700 text-white font-semibold dark:bg-[560bad] dark:border-none'
              onClick={() => setTourPageNumber((prev: number) => prev + 1)}
            >
              Start Tour
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default WelcomePage