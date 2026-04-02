import { HistoryProps } from "../../types/history"
import dayjs from "../../libs/dayjs"

export function HistoryItem(props: HistoryProps) {
  return (
    <div className="flex flex-col justify-center p-0.5">
      <span>{
        `${dayjs(props.timestamp).format("HH:mm")}` + " " +
        props.music_artist + " - " + 
        props.music_title
      }</span>
      <div className="w-full h-px bg-zinc-200"></div>
    </div>
  )
}
