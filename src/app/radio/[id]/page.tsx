"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { RadioProp } from "../../types/radio"
import { IdProp } from "../../types/id"

type PageProps = {
   params: Promise<{ id: string }> 
}

export default function RadioHistory() {

  const { id } = useParams()
  console.log(id)

  async function getRadio(): Promise<RadioProp> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/radio/${id}`)
    const data = await response.json()
    return data
  }

  async function getHistory(): Promise<IdProp[]> {
    const startTime = "2026-02-26T19:00:00.125Z"
    const endTime = "2026-02-27T20:00:00.125Z"
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/history/radio=${id}&start=${startTime}&end=${endTime}`)
    const data = await response.json()
    return data
  }

  const [ radio, setRadio ] = useState<RadioProp>()

  const [ history, setHistory ] = useState<IdProp[]>()

  useEffect(() => {
    (async () => {
      setRadio(await getRadio())
      setHistory(await getHistory())
    })()
  }, [])

  return (
    <div>
      <div className="flex flex-row items-center">
        <img className="w-8 h-8 bg-gray-500" src={radio ? radio.icon : "-"}/>
        <p className="text-green-500">{radio ? radio.name : "-"}</p>
      </div>
      <pre>
        {JSON.stringify(history, null, 2)}
      </pre>
    </div>
  )
}
