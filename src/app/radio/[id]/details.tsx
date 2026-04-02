"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { RadioProps } from "../../types/radio"
import { getRadio } from "../../services/get-radio"

export function Details() {

  const { id } = useParams()  // http://localhost:3000/radio/8e3429cd-6340-4248-8371-6540f3e9f7fe

  const [ radio, setRadio ] = useState<RadioProps>()

  const [ isRadioLoading, setIsRadioLoading ] = useState(true)

  useEffect(() => {
    (async () => {
      setRadio(await getRadio(String(id)))
      setIsRadioLoading(false) 
    })()
  }, [])

  return (
    <div>
      {
        isRadioLoading
        ?
          <div className="flex flex-row items-center gap-2 animate-pulse">
            <div className="w-12 h-12 bg-zinc-300 rounded-lg"/>
            <div className="w-20 h-6 bg-zinc-300 rounded-lg"></div>
          </div>
        :
          <div className="flex flex-row items-center gap-2">
            <img className="w-12 h-12" src={radio ? radio.icon : "-"}/>
            <p className="text-xl">{radio ? radio.name : "-"}</p>
          </div>
      }
    </div>
  )
}
