import { useContext, useState } from "react"
import Header from "./Header"
import ReactCodeMirror from "@uiw/react-codemirror"
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"
import { tokyoNightDay } from "@uiw/codemirror-theme-tokyo-night-day"
import { json } from "@codemirror/lang-json"
import Image from "next/image"
import { steps, stepsSchema } from "@/tourSteps"
import Ajv2020 from "ajv/dist/2020";
import { TourContext } from "@/pages/_app"
import { useTheme } from "next-themes"

const ajv2020 = new Ajv2020();
const validateSteps = ajv2020.compile(stepsSchema);
const areStepsValid = validateSteps(steps);

const Tour = ({ stepNumber }: { stepNumber: number }) => {
  const [editorValue, seteditorValue] = useState({})
  const [results, setresults] = useState({ type: "info", message: "Click on the button to validate the schema" })
  const [isJSON, setisJSON] = useState(true)
  const { setTourPageNumber } = useContext(TourContext);
  const { theme } = useTheme()

  const step = steps[stepNumber]


  const onCopy = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const parent = (e.target as HTMLButtonElement).closest('.copied') as HTMLElement
    if (parent) {
      parent.classList.add("active");
      setTimeout(() => {
        parent.classList.remove("active");
      }, 1500);
    }
    navigator.clipboard.writeText(JSON.stringify(step.examples[index], null, ' '));
  }

  const onPasteForward = (index: number) => {
    seteditorValue(step.examples[index])
    onEditorChange(JSON.stringify(step.examples[index], null, ' '))
  }

  const onClickCTA = async (cta: any) => {
    if (!isJSON) {
      setresults({ type: "error", message: "Invalid JSON!" })
      return
    }
    if (Object.keys(editorValue).length === 0) {
      setresults({ type: "info", message: "Please add JSON Schema in the editor!" })
      return
    }
    const result = await cta.onClick(editorValue, cta.testCases);
    setresults(result)
  }

  const onEditorChange = (value: string) => {
    try {
      seteditorValue(JSON.parse(value))
      setisJSON(true)
    }
    catch {
      setisJSON(false)
    }
  }
  if (!areStepsValid) {
    return <></>
  }
  return (
    <>
      <Header />
      <div className="tour-container flex flex-col mt-20 md:flex-row w-full p-8 bg-white dark:bg-slate-800 ">
        <section className="relative pb-2 md:pb-0 md:pr-4 bg-white dark:bg-slate-800  dark:text-slate-300 text-slate-600 basis-1/2 md:max-h-screen overflow-auto">
          <h2 className="lg:leading-6 text-left text-h5mobile md:text-h5text-white my-4 dark:text-slate-300">{step.title}</h2>
          <p>{step.content}</p>
          {step.examples.map((example, index) => (
            <div key={index}>
              <span>Example {index + 1}:</span>
              <div className="relative">
                <ReactCodeMirror
                  value={JSON.stringify(example, null, ' ')}
                  editable={false}
                  theme={theme === "dark" ? tokyoNight : tokyoNightDay}
                  extensions={[json()]}
                  basicSetup={
                    {
                      foldGutter: true,
                      syntaxHighlighting: true,
                      lineNumbers: false,
                      closeBrackets: true,
                    }
                  }
                />
                <div className="copied absolute z-10 top-0 right-8 flex gap-2 mr-1 mt-1">
                  <button className="copy rounded-md bg-slate-600 p-1.5 text-white opacity-50 hover:opacity-90 duration-150"
                    onClick={(e) => onCopy(index, e)}
                  >
                    <Image src="/json-schema-tour/images/icons/copy.svg" alt="Copy" width={12} height={12} />
                  </button>
                  <button className="check hidden rounded-md bg-slate-600 p-1.5 text-white opacity-90 duration-150">
                    <Image src="/json-schema-tour/images/icons/check.svg" alt="Copied" width={12} height={12} />
                  </button>
                </div>
                <div className="forward absolute z-10 top-0 right-0 flex gap-2 mr-1 mt-1">
                  <button className="copy rounded-md bg-slate-600 p-1.5 text-white opacity-50 hover:opacity-90 duration-150"
                    onClick={(e) => onPasteForward(index)}
                  >
                    <Image src="/json-schema-tour/images/icons/paste-forward.svg" alt="Copy" width={12} height={12} />
                  </button>
                  <button className="check hidden rounded-md bg-slate-600 p-1.5 text-white opacity-90 duration-150">
                    <Image src="/json-schema-tour/images/icons/check.svg" alt="Copied" width={12} height={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {step.cta.map((cta, index) => {
            return (
              <>
                {'testCases' in cta && cta.testCases.map((example, index) => (
                  <div key={index}>
                    <span>Test Case {index + 1}:</span>
                    <div className="relative">
                      <ReactCodeMirror
                        value={JSON.stringify(example, null, ' ')}
                        editable={false}
                        theme={theme === "dark" ? tokyoNight : tokyoNightDay}
                        extensions={[json()]}
                        basicSetup={
                          {
                            foldGutter: true,
                            syntaxHighlighting: true,
                            lineNumbers: false,
                            closeBrackets: true,
                          }
                        }
                      />
                    </div>
                  </div>
                ))}
              </>
            )
          })}

          <div className="fixed bottom-4 w-full -ml-8 md:w-[48%] flex gap-2 justify-center items-center">
            <button
              className='px-3 py-1 rounded border-2 bg-primary hover:bg-blue-700 text-white font-semibold dark:bg-[560bad] dark:border-none'
              onClick={() => { setTourPageNumber((prev: number) => prev - 1) }}
            >
              Prev
            </button>
            <span className="dark:text-slate-300 text-slate-600">
              {stepNumber + 1}/{steps.length}
            </span>
            <button
              className='px-3 py-1 rounded border-2 bg-primary hover:bg-blue-700 text-white font-semibold dark:bg-[560bad] dark:border-none'
              onClick={() => { setTourPageNumber((prev: number) => prev == steps.length ? 0 : prev + 1) }}
            >
              Next
            </button>
          </div>
        </section>
        <section className="schema-editor flex flex-col md:pl-2 border-t-4 md:border-t-0 md:basis-1/2 md:border-l-4 border-gray-300 dark:border-gray-700">
          <h2 className="lg:leading-6 text-left text-h5mobile md:text-h5text-white mt-4 md:mt-0 mb-2 dark:text-slate-300">Schema Editor</h2>
          <ReactCodeMirror
            value={JSON.stringify(editorValue, null, " ")}
            onChange={onEditorChange}
            className="grow flex pb-2 md:border-b-4 border-gray-300 dark:border-gray-700 max-h-[66%]"
            editable={true}
            theme={theme === "dark" ? tokyoNight : tokyoNightDay}
            extensions={[json()]}
            basicSetup={
              {
                foldGutter: true,
                syntaxHighlighting: true,
                lineNumbers: true,
                closeBrackets: true,
              }
            }
          />
          <div className="flex flex-col validation-result w-full basis-1/3 min-h-[20rem] md:min-h-[unset] mt-2 bg-white">
            <div className="flex justify-end mx-1 mt-1">
              {step.cta?.map((cta, index) => (
                <button
                  key={index}
                  className='px-3 py-1 rounded border-2 bg-primary hover:bg-blue-700 text-white font-semibold dark:bg-[560bad] dark:border-none'
                  onClick={() => onClickCTA(cta)}
                >
                  {cta.text}
                </button>
              ))}
            </div>
            <div className={`result grow p-2 bg-gray-200 rounded-sm m-2 
            ${results.type == 'error' ? 'text-red-600' : ''} 
            ${results.type == 'success' ? 'text-green-600' : ''}`}>
              {results.message}
            </div>

          </div>
        </section>
      </div>

    </>
  )
}

export default Tour