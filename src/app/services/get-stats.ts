import { StatsProps } from "../types/stats"

export async function getStats(radioId: string): Promise<StatsProps> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stats/${radioId}`)
  const data = await response.json()
  return data
}
