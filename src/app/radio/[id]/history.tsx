"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { RadioProps } from "../../types/radio"
import { HistoryProps } from "../../types/history"
import { getRadio } from "../../services/get-radio"
import { getHistory } from "../../services/get-history"
import dayjs from "../../libs/dayjs"

export function RadioHistory() {

  // const today = new Date()
  const today = dayjs()

  const MAX_PAST_DAYS = 7     // enable history to go back from today + "n" past days

  const { id } = useParams()  // http://localhost:3000/radio/8e3429cd-6340-4248-8371-6540f3e9f7fe

  const [ selectedDay, setSelectedDay ] = useState<dayjs.Dayjs | null>(null)

  const [ radio, setRadio ] = useState<RadioProps>()

  const [ history, setHistory ] = useState<HistoryProps[]>([])

  const [ isRadioLoading, setIsRadioLoading ] = useState(true)
  
  const [ isHistoryLoading, setIsHistoryLoading ] = useState(true)

  useEffect(() => {
    (async () => {
      setRadio(await getRadio(String(id)))
      setIsRadioLoading(false) 
    })()
    // Update state with time values only on client-side, to avoid hidratation errors:
    setSelectedDay(dayjs()) 
  }, [])

  useEffect(() => {
    (async () => {
      setIsHistoryLoading(true)
      setHistory(await getHistory(String(id), selectedDay!))
      setIsHistoryLoading(false) 
    })()
  }, [selectedDay])

  return (
    <div className="flex flex-col items-center justify-center gap-2 my-4">
      {/* Radio detais */}
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
      <div className="flex flex-col gap-1 p-2 w-96 border-2 border-zinc-200 rounded-xl shadow-xl">
        {
          isHistoryLoading
          ?
            [...Array(5)].map((_, i) => {
              return (
                <div key={i} className="my-2 mx-auto w-90 h-6 bg-zinc-300 rounded-lg animate-pulse"></div>
              )
            })
          :
            history.length > 0 
            ?
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
            :
              <span className="mx-auto">Nada salvo nesse dia!</span>
        }
      </div>
      {/* <pre>
        {JSON.stringify(history, null, 2)}
      </pre> */}
    </div>
  )
}
