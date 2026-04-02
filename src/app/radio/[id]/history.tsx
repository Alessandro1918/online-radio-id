"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { HistoryProps } from "../../types/history"
import { getHistory } from "../../services/get-history"
import { HistoryItemSkeleton } from "./history-item-skeleton"
import { HistoryItem } from "./history-item"
import dayjs from "../../libs/dayjs"

export function History() {

  const { id } = useParams()  // http://localhost:3000/radio/8e3429cd-6340-4248-8371-6540f3e9f7fe

  // const today = new Date()
  const today = dayjs()

  const MAX_PAST_DAYS = 7     // enable history to go back from today + "n" past days

  const [ selectedDay, setSelectedDay ] = useState<dayjs.Dayjs | null>(null)

  const [ history, setHistory ] = useState<HistoryProps[]>([])
  
  const [ isHistoryLoading, setIsHistoryLoading ] = useState(true)

  useEffect(() => {
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
    <div className="flex flex-col items-center justify-center gap-2">

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
                <HistoryItemSkeleton key={i} />
              )
            })
          :
            history.length > 0 
            ?
              history.map((e, i) => {
                return (
                  <HistoryItem 
                    key={i}
                    uuid={e.uuid}
                    timestamp={e.timestamp}
                    radio={e.radio}
                    music_artist={e.music_artist}
                    music_title={e.music_title}
                  />
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
