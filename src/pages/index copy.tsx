import { Inter } from "next/font/google";
import Ajv2020 from "ajv/dist/2020"
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const ajv = new Ajv2020()

export default function Home() {
  const [value, setvalue] = useState('{}')

  useEffect(() => {
    (async () => {
      try {
        const schema = JSON.parse(value)
        const validate = ajv.compile(schema)
        const data = "abc"

        const valid = validate(data)
        console.log(valid)
        if (!valid) console.log(validate.errors)
      } catch (error) {
        console.log(error)
      }

    })()

    return () => { }
  }, [value])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <CodeMirror value={value} height="200px" width="500px" extensions={[json()]} onChange={(newValue) => setvalue(newValue)} />

    </main>
  );
}
