import { RadioProps } from "../types/radio"

export async function getRadios(): Promise<RadioProps[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/radios`)
  const data = await response.json()
  return data
}
