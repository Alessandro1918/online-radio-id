"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { StatsProps } from "../../types/stats"
import { getStats } from "../../services/get-stats"

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
    <pre>
      {JSON.stringify(stats, null, 2)}
    </pre>
  )
}
