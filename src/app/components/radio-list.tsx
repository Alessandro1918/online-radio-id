"use client"
import { useState, useEffect } from "react"

type RadioProp = {
  id: string,
  name: string,
  state: string,
  country: string,
  stream: string,
  site: string,
  icon: string,
  frequency: string,
  query: string,
}

// export async function RadioList() {
export function RadioList() {

  async function getRadios(): Promise<RadioProp[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/radios`)
    const data = await response.json()
    return data
  }

  // const radios = await getRadios()

  const [ radios, setRadios ] = useState<RadioProp[]>([])
  useEffect(() => {
    (async () => {
      setRadios(await getRadios())
    })()
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {
        radios.map(e => {
          return (
            <div key={e.id} className="flex flex-row items-center">
              <img className="w-8 h-8 bg-gray-500" src={e.icon}/>
              <p className="text-green-500">{e.name}</p>
            </div>
          )
        })
      }
    </div>
  )
}
