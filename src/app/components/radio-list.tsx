"use client"
import { useState, useEffect } from "react"
import { RadioProps } from "../types/radio"
import dayjs from "../libs/dayjs"

// export async function RadioList() {
export function RadioList() {

  const [ radios, setRadios ] = useState<RadioProps[]>([])

  const [ isLoading, setIsLoading ] = useState(true)

  async function getRadios(): Promise<RadioProps[]> {
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
    <div className="flex flex-col gap-1 p-2 w-96 border-2 border-zinc-200 rounded-xl shadow-xl">
      {
        isLoading
        ?
          [...Array(4)].map((_, i) => {
            return (
              <div key={i} className="flex flex-col justify-center p-0.5 animate-pulse">
                <div className="flex flex-row items-center gap-2">
                  <div className="w-12 h-12 bg-zinc-300 rounded-lg"/>
                  <div className="w-30 h-6 bg-zinc-300 rounded-lg"></div>
                </div>
                <div className="mt-2 w-full h-px bg-zinc-200"></div>
              </div>
            )
          })
        :
          radios.map(e => {
            const now = dayjs()
            const timeDiffinMinutes = now.diff(dayjs.utc(e.playing.timestamp), "minute")
            return (
              <a key={e.id} href={`/radio/${e.id}`}>
                <div className="flex flex-col justify-center p-0.5">
                  <div className="flex flex-row items-center gap-2">
                    <img className="w-12 h-12" src={e.icon}/>
                    <div className="flex flex-col min-w-0">
                      <p>{e.name}</p>
                      <div className="flex flex-row items-center gap-1">
                        <div>
                          {
                            timeDiffinMinutes < 5
                            ? <div className="size-3 rounded-full bg-radial-[at_75%_25%] from-green-200 to-green-600 to-50% border-2 border-green-800"></div>
                            : timeDiffinMinutes < 5 * 30  //  minutes/query * n failures until cron job is disabled
                            ? <div className="size-3 rounded-full bg-radial-[at_75%_25%] from-yellow-200 to-yellow-600 to-50% border-2 border-yellow-800"></div>
                            : <div className="size-3 rounded-full bg-radial-[at_75%_25%] from-red-200 to-red-600 to-50% border-2 border-red-800"></div>
                          }
                        </div>
                        <span className="text-zinc-600 text-sm font-extralight shrink-0 whitespace-nowrap">
                          {
                            timeDiffinMinutes < 1 
                            ? "Agora" 
                            : timeDiffinMinutes < 5 * 30  //  minutes/query * n failures until cron job is disabled 
                            ? `Há ${timeDiffinMinutes} min` 
                            : "Erro"
                          }
                        </span>
                        <span className="text-zinc-600 text-sm font-normal truncate min-w-0 ml-1">
                          {timeDiffinMinutes < 30 && `${e.playing.music_artist} - ${e.playing.music_title}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 w-full h-px bg-zinc-200"></div>
                </div>
              </a>
            )
          })
      }
    </div>
  )
}
