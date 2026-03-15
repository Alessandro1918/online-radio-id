"use client"
import { useState, useEffect } from "react"
import { RadioProp } from "../types/radio"

// export async function RadioList() {
export function RadioList() {

  const [ radios, setRadios ] = useState<RadioProp[]>([])

  const [ isLoading, setIsLoading ] = useState(true)

  async function getRadios(): Promise<RadioProp[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/radios`)
    if (response.status == 200) setIsLoading(false)
    const data = await response.json()
    return data
  }

  // const radios = await getRadios()

  useEffect(() => {
    (async () => {
      setRadios(await getRadios())
    })()
  }, [])

  return (
    <div className="flex flex-col gap-1 p-2 w-48 border-2 border-zinc-200 rounded-xl shadow-xl">
      {
        isLoading
        ?
          [...Array(4)].map((e, i) => {
            return (
              <div key={i} className="my-2 flex flex-row items-center gap-2 animate-pulse">
                <div className="w-12 h-12 bg-zinc-300 rounded-lg"/>
                <div className="w-30 h-6 bg-zinc-300 rounded-lg"></div>
              </div>
            )
          })
        :
          radios.map(e => {
            return (
              <a key={e.id} href={`/radio/${e.id}`}>
                <div className="flex flex-col justify-center p-0.5">
                  <div className="flex flex-row items-center gap-2">
                    <img className="w-12 h-12" src={e.icon}/>
                    <p>{e.name}</p>
                  </div>
                  <div className="mt-2 w-full h-px bg-zinc-200"></div>
                </div>
              </a>
            )
          })
      }
    </div>
  )
}
