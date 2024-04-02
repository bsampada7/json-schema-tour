import Tour from "@/components/Tour";
import WelcomePage from "@/components/WelcomePage";
import { Inter } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { TourContext } from "./_app";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { tourPageNumber } = useContext(TourContext);

  return (
    <main
      className={`flex min-h-screen md:max-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      {tourPageNumber === 0 && <WelcomePage />}
      {tourPageNumber > 0 &&
        <Tour
          stepNumber={tourPageNumber - 1}
        />}
    </main>
  );
}
