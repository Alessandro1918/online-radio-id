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
    <div className="flex flex-col gap-2">
      {
        isLoading
        ?
          <span>Carregando...</span>
        :
          radios.map(e => {
            return (
              <div key={e.id} className="flex flex-row items-center gap-2">
                <img className="w-12 h-12 bg-gray-500" src={e.icon}/>
                <a href={`/radio/${e.id}`}>
                  <p className="text-green-500">{e.name}</p>
                </a>
              </div>
            )
          })
      }
    </div>
  )
}
