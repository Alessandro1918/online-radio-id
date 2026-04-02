"use client"
import { useState, useEffect } from "react"
import { RadioProps } from "../types/radio"
import { getRadios } from "../services/get-radios"
import { RadioItem } from "./radio-item"
import { RadioItemSkeleton } from "./radio-item-skeleton"

// export async function RadioList() {
export function RadioList() {

  const [ radios, setRadios ] = useState<RadioProps[]>([])

  const [ isLoading, setIsLoading ] = useState(true)

  // const radios = await getRadios()
  useEffect(() => {
    (async () => {
      setRadios(await getRadios())
      setIsLoading(false)
    })()
  }, [])

  return (
    <div className="flex flex-col gap-1 p-2 w-96 border-2 border-zinc-200 rounded-xl shadow-xl">
      {
        isLoading
        ?
          [...Array(4)].map((_, i) => {
            return (
              <RadioItemSkeleton key={i} />
            )
          })
        :
          radios.map(e => {
            return (
              <RadioItem key={e.id} {...e} />
            )
          })
      }
    </div>
  )
}
