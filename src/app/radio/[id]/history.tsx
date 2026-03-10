"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { RadioProp } from "../../types/radio"
import { IdProp } from "../../types/id"

import dayjs from "dayjs"
import "dayjs/locale/pt-br"
dayjs.locale("pt-br")

// type PageProps = {
//    params: Promise<{ id: string }> 
// }

export function RadioHistory() {

  // const today = new Date()
  const today = dayjs()

  const MAX_PAST_DAYS = 7     // enable history to go back from today + "n" past days

  const { id } = useParams()  // http://localhost:3000/radio/8e3429cd-6340-4248-8371-6540f3e9f7fe

  const [ selectedDay, setSelectedDay ] = useState<dayjs.Dayjs | null>(null)

  const [ radio, setRadio ] = useState<RadioProp>()

  const [ history, setHistory ] = useState<IdProp[]>([])

  const [ isRadioLoading, setIsRadioLoading ] = useState(true)
  
  const [ isHistoryLoading, setIsHistoryLoading ] = useState(true)

  async function getRadio(): Promise<RadioProp> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/radio/${id}`)
    if (response.status == 200) setIsRadioLoading(false) 
    const data = await response.json()
    return data
  }

  async function getHistory(): Promise<IdProp[]> {
    // const endTime = "2026-02-27T20:00:00.125Z"
    // const startTime = "2026-02-26T19:00:00.125Z"
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/history/radio=${id}&start=${startTime}&end=${endTime}`)
    // ...

    //                                      now: 2026-03-02T04:32:08.763Z (02/mar, 01h32)
    const endTime = selectedDay?.endOf("day") // 2026-03-03T02:59:59.999Z (02/mar, 23h59)
    const startTime = endTime?.startOf("day") // 2026-03-02T03:00:00.000Z (02/mar, 00h00)
    // console.log("startTime:", startTime?.toISOString(), "endTime: ", endTime?.toISOString())

    try {
      setIsHistoryLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/history/radio=${id}&start=${startTime?.toISOString()}&end=${endTime?.toISOString()}`)
      if (response.status == 200) setIsHistoryLoading(false) 
      const data = await response.json()
      return data
    } catch (err) {
      console.log(err)
      return []
    }
  }

  useEffect(() => {
    (async () => {
      setRadio(await getRadio())
    })()
    // Update state with time values only on client-side, to avoid hidratation errors:
    setSelectedDay(dayjs()) 
  }, [])

  useEffect(() => {
    (async () => {
      setHistory(await getHistory())
    })()
  }, [selectedDay])

  return (
    <div className="flex flex-col items-center justify-center gap-2 my-4">
      {/* Radio detais */}
      {
        isRadioLoading
        ?
          <span>...</span>
        :
          <div className="flex flex-row items-center gap-2">
            <img className="w-12 h-12" src={radio ? radio.icon : "-"}/>
            <p className="text-xl">{radio ? radio.name : "-"}</p>
          </div>
      }

      {/* Date picker */}
      <div className="flex items-center gap-8">
        <button 
          disabled={today.diff(selectedDay, "day") >= MAX_PAST_DAYS} // enabled for today + "n" past days
          onClick={() => setSelectedDay(selectedDay!.subtract(1, "day"))}
          className="text-4xl disabled:text-zinc-300 cursor-pointer disabled:cursor-default"
        >
          {"<"}
        </button>
        <span>{selectedDay?.format("DD/MMM (ddd)")}</span>  {/* "02/mar (seg)" */}
        <button 
          disabled={today.diff(selectedDay, "day") == 0} // enabled if selected day isn't today
          onClick={() => setSelectedDay(selectedDay!.add(1, "day"))}
          className="text-4xl disabled:text-zinc-300 cursor-pointer disabled:cursor-default"
        >
          {">"}
        </button>
      </div>

      {/* List of IDs */}
      <div>
      {
        isHistoryLoading
        ?
          <span>Carregando...</span>
        :
          history.length > 0 
          ?
            <div className="flex flex-col gap-1 p-2 max-w-96 border-2 border-zinc-200 rounded-xl shadow-xl">
              {
                history.map((e, i) => {
                  return (
                    <div key={i} className="flex flex-col justify-center p-0.5">
                      <span>{
                        `${dayjs(e.timestamp).format("HH:mm")}` + " " +
                        e.music_artist + " - " + 
                        e.music_title
                      }</span>
                      <div className="w-full h-px bg-zinc-200"></div>
                    </div>
                  )
                })
              }
            </div>
          :
            <span>Nada salvo nesse dia!</span>
      }
      </div>
      {/* <pre>
        {JSON.stringify(history, null, 2)}
      </pre> */}
    </div>
  )
}
