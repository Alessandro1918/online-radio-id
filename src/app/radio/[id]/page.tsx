"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { RadioProp } from "../../types/radio"
import { IdProp } from "../../types/id"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
dayjs.locale("pt-br")

type PageProps = {
   params: Promise<{ id: string }> 
}

export default function RadioHistory() {

  // const today = new Date()
  const today = dayjs()

  const MAX_PAST_DAYS = 3     // enable history to go back from today + "n" past days

  const { id } = useParams()  // http://localhost:3000/radio/8e3429cd-6340-4248-8371-6540f3e9f7fe
  console.log(id)

  async function getRadio(): Promise<RadioProp> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/radio/${id}`)
    const data = await response.json()
    return data
  }

  async function getHistory(): Promise<IdProp[]> {
    // const endTime = "2026-02-27T20:00:00.125Z"
    // const startTime = "2026-02-26T19:00:00.125Z"
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/history/radio=${id}&start=${startTime}&end=${endTime}`)
    // ...

    //                              now: 2026-03-02T04:32:08.763Z (02/mar, 01h32)
    const endTime = day?.endOf("day") // 2026-03-03T02:59:59.999Z (02/mar, 23h59)
    const startTime = 
      today.diff(day, "day") == 0     // selected day is today
      ? endTime?.startOf("day")                        // 2026-03-02T03:00:00.000Z (02/mar, 00h00)
      : endTime?.subtract(1, "day").add(1, "second")   // 2026-03-01T03:00:00.999Z (01/mar, 00h00), until 2026-03-02T02:59:59.999Z (01/mar, 23h59)
    // console.log("startTime:", startTime?.toISOString(), "endTime: ", endTime?.toISOString())

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/history/radio=${id}&start=${startTime?.toISOString()}&end=${endTime?.toISOString()}`)
      const data = await response.json()
      return data
    } catch (err) {
      console.log(err)
      return []
    }
  }

  const [ day, setDay ] = useState<dayjs.Dayjs | null>(null)  // The selected day to query its history
  useEffect(() => {
    setDay(today) // update state with time values only on client-side, to avoid hidratation errors
  }, [])

  const [ radio, setRadio ] = useState<RadioProp>()           // Selected radio details

  const [ history, setHistory ] = useState<IdProp[]>()        // List of musics played

  useEffect(() => {
    (async () => {
      setRadio(await getRadio())
      setHistory(await getHistory())  //Optimization oportunity here: instead of re-do the getHistory query for every new day selected, query the whole last week instead and paginate the result day-by-day on the client side
    })()
  }, [day])

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Radio detais */}
      <div className="flex flex-row items-center gap-2">
        <img className="w-12 h-12 bg-gray-500" src={radio ? radio.icon : "-"}/>
        <p className="text-green-500">{radio ? radio.name : "-"}</p>
      </div>

      {/* Date picker */}
      <div className="flex items-center gap-8">
        <button 
          disabled={today.diff(day, "day") > MAX_PAST_DAYS} // enabled for today + "n" past days
          onClick={() => setDay(day!.subtract(1, "day"))}
          className="text-4xl disabled:text-gray-300 dark:disabled:text-gray-700 cursor-pointer disabled:cursor-default"
        >
          {"<"}
        </button>
        <span>{day?.format("DD/MMM (ddd)")}</span>  {/* "02/mar (seg)" */}
        <button 
          disabled={today.diff(day, "day") == 0} // enabled if selected day isn't today
          onClick={() => setDay(day!.add(1, "day"))}
          className="text-4xl disabled:text-gray-300 dark:disabled:text-gray-700 cursor-pointer disabled:cursor-default"
        >
          {">"}
        </button>
      </div>

      {/* List of IDs */}
      <div className="flex flex-col gap-1 max-w-96">
      {
        history && history.length > 0 
        ?
        history?.map((e, i) => {
          return (
            <span key={i}>{
            `${dayjs(e.timestamp).format("HH:mm")}` + " " +
            e.music_artist + " - " + 
            e.music_title
            }</span>
          )
        })
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
