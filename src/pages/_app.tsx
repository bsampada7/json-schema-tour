import "@/styles/globals.css";
import { useState } from 'react';
import type { AppProps } from "next/app";
import { ThemeProvider } from 'next-themes'
import { createContext } from 'react';

interface TourContextProps {
  tourPageNumber: number;
  setTourPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const TourContext = createContext<TourContextProps>({
  tourPageNumber: 0,
  setTourPageNumber: () => { },
});

export default function App({ Component, pageProps }: AppProps) {
  const [tourPageNumber, setTourPageNumber] = useState(0);
  return (
    <ThemeProvider>
      <TourContext.Provider value={{ tourPageNumber, setTourPageNumber }}>
        <Component {...pageProps} />
      </TourContext.Provider>
    </ThemeProvider>
  )
}
