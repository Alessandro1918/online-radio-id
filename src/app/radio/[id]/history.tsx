"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { IdProps } from "../../types/id"
import { getHistory } from "../../services/get-history"
import { HistoryItemSkeleton } from "./history-item-skeleton"
import { HistoryItem } from "./history-item"
import dayjs from "../../libs/dayjs"

export function History() {

  const { id } = useParams()  // http://localhost:3000/radio/8e3429cd-6340-4248-8371-6540f3e9f7fe

  // const today = new Date()
  const today = dayjs()

  const MAX_PAST_DAYS = 7     // enable history to go back from today + "n" past days

  const [ selectedDay, setSelectedDay ] = useState<dayjs.Dayjs>(today)

  const [ history, setHistory ] = useState<IdProps[]>([])
  
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
    <div className="flex flex-col items-center justify-center">
      {/* V1 */}
      {/* <pre>
        {JSON.stringify(history, null, 2)}
      </pre> */}

      {/* Date picker */}
      {/* <div className="flex items-center gap-8">
        <button 
          disabled={today.diff(selectedDay, "day") >= MAX_PAST_DAYS} // enabled for today + "n" past days
          onClick={() => setSelectedDay(selectedDay!.subtract(1, "day"))}
          className="text-4xl disabled:text-zinc-300 cursor-pointer disabled:cursor-default"
        >
          {"<"}
        </button>
        <span>{selectedDay?.format("DD/MMM (ddd)")}</span>
        <button 
          disabled={today.diff(selectedDay, "day") == 0} // enabled if selected day isn't today
          onClick={() => setSelectedDay(selectedDay!.add(1, "day"))}
          className="text-4xl disabled:text-zinc-300 cursor-pointer disabled:cursor-default"
        >
          {">"}
        </button>
      </div> */}
      <div className="w-96 flex items-baseline-last justify-between">
        <DayButton handleClick={setSelectedDay} isDisabled={selectedDay.isSame(today.subtract(6, "day"), "day")} day={today.subtract(6, "day")} />
        <DayButton handleClick={setSelectedDay} isDisabled={selectedDay.isSame(today.subtract(5, "day"), "day")} day={today.subtract(5, "day")} />
        <DayButton handleClick={setSelectedDay} isDisabled={selectedDay.isSame(today.subtract(4, "day"), "day")} day={today.subtract(4, "day")} />
        <DayButton handleClick={setSelectedDay} isDisabled={selectedDay.isSame(today.subtract(3, "day"), "day")} day={today.subtract(3, "day")} />
        <DayButton handleClick={setSelectedDay} isDisabled={selectedDay.isSame(today.subtract(2, "day"), "day")} day={today.subtract(2, "day")} />
        <DayButton handleClick={setSelectedDay} isDisabled={selectedDay.isSame(today.subtract(1, "day"), "day")} day={today.subtract(1, "day")} />
        <DayButton handleClick={setSelectedDay} isDisabled={selectedDay.isSame(today, "day")} day={today} />
      </div>

      {/* List of IDs */}
      <div className="w-96 flex flex-col gap-1 p-2 border-2 border-t-0 border-zinc-200 rounded-b-xl shadow-xl">
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
                  <HistoryItem key={i} {...e} />
                )
              })
            :
              <span className="mx-auto">Nada salvo nesse dia!</span>
        }
      </div>
    </div>
  )
}

type DayButtonProps = {
  day: dayjs.Dayjs,
  handleClick: (day: dayjs.Dayjs) => void
  isDisabled: boolean // selected day; high contrast, but disabled
}

function DayButton({day, handleClick, isDisabled}: DayButtonProps) {
  // dayjs format("DD/MMM (ddd)" => "02/mar (seg)"
  return (
    <button
      disabled={isDisabled}
      className={`
        w-full py-0.5 rounded-t-lg border-zinc-200 text-sm
        disabled:px-2
        enabled:text-zinc-500
        border-2 disabled:border-b-0 
        cursor-pointer disabled:cursor-auto
      `}
      onClick={() => handleClick(day)}

    > 
      {day.format("DD/MMM")}
    </button>
  )
}
