"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { StatsProps } from "../../types/stats"
import { getStats } from "../../services/get-stats"
import { HistoryItemSkeleton } from "./history-item-skeleton"
import { StatsItem } from "./stats-item"

export function Stats() {

  const { id } = useParams()  // http://localhost:3000/radio/8e3429cd-6340-4248-8371-6540f3e9f7fe
  
  const [ isLoading, setIsLoading ] = useState(true)

  const [ stats, setStats ] = useState<StatsProps>()

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const data = await getStats(String(id))
      setStats(data)
      setIsLoading(false)
    })()
  }, [])
  
  return (
    // <pre>
    //   {JSON.stringify(stats, null, 2)}
    // </pre>
    <div className="flex flex-col gap-1 p-2 w-96 border-2 border-zinc-200 rounded-xl shadow-xl">
      {
        isLoading
        ?
          [...Array(5)].map((_, i) => {
            return (
              <HistoryItemSkeleton key={i} />
            )
          })
        :
          stats!.count > 1
          ?
            <>
              <StatsItem 
                name={"Músicas tocadas na semana:"} 
                value={String(stats!.count)} 
              />
              <StatsItem 
                name={"Média:"} 
                value={`${((stats!.count) / (24 * 7)).toFixed(2)} músicas/hora`} 
              />

              <StatsItem name={"\u00A0"} value={""} />  {/* No-break space */}

              <StatsItem 
                name={"Artistas mais tocados:"} 
                value={"Músicas:"} 
              />
              {
              stats!.most_played.map((e, i) => {
                  return (
                    <StatsItem 
                      key={i} 
                      ranking={i+1} 
                      name={e.artist} 
                      value={String(e.count)} 
                    />
                  )
                })
              }
            </>
          :
            <span className="mx-auto">Nada salvo nessa semana!</span>
      }
    </div>
  )
}
