import { RadioProps } from "../types/radio"

export async function getRadio(radioId: string): Promise<RadioProps> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/radio/${radioId}`)
  const data = await response.json()
  return data
}
