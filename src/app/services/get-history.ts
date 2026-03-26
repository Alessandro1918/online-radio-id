import dayjs from "../libs/dayjs"
import { HistoryProps } from "../types/history"

export async function getHistory(radioId: string, selectedDay: dayjs.Dayjs): Promise<HistoryProps[]> {
  // const endTime = "2026-02-27T20:00:00.125Z"
  // const startTime = "2026-02-26T19:00:00.125Z"
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/history/radio=${id}&start=${startTime}&end=${endTime}`)
  // ...

  //                                      now: 2026-03-02T04:32:08.763Z (02/mar, 01h32)
  const endTime = selectedDay?.endOf("day") // 2026-03-03T02:59:59.999Z (02/mar, 23h59)
  const startTime = endTime?.startOf("day") // 2026-03-02T03:00:00.000Z (02/mar, 00h00)
  // console.log("startTime:", startTime?.toISOString(), "endTime: ", endTime?.toISOString())

  try {
    if (!radioId || !startTime || !endTime) throw new Error("Error: Missing params")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/history?radio=${radioId}&start=${startTime?.toISOString()}&end=${endTime?.toISOString()}`)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
    return []
  }
}
