import dayjs from "../libs/dayjs"

type NowPlayingProps = {
  timestamp: string,
  music_artist: string,
  music_title: string
}

export function NowPlaying(props: NowPlayingProps) {

  const now = dayjs()
  const timeDiffinMinutes = now.diff(dayjs.utc(props.timestamp), "minute")

  return (
    <div className="flex flex-row items-center gap-1">
      <div>
        {
          timeDiffinMinutes < 5
          ? <div className="size-3 rounded-full bg-radial-[at_75%_25%] from-green-200 to-green-600 to-50% border-2 border-green-800"></div>
          : timeDiffinMinutes < 5 * 30  //  minutes/query * "N" failures until cron job is disabled
          ? <div className="size-3 rounded-full bg-radial-[at_75%_25%] from-yellow-200 to-yellow-600 to-50% border-2 border-yellow-800"></div>
          : <div className="size-3 rounded-full bg-radial-[at_75%_25%] from-red-200 to-red-600 to-50% border-2 border-red-800"></div>
        }
      </div>
      <span className="text-zinc-600 text-sm font-extralight shrink-0 whitespace-nowrap">
        {
          timeDiffinMinutes < 1 
          ? "Agora" 
          : timeDiffinMinutes < 5 * 30  //  minutes/query * "N" failures until cron job is disabled 
          ? `Há ${timeDiffinMinutes} min` 
          : "Erro"
        }
      </span>
      <span className="text-zinc-600 text-sm font-normal truncate min-w-0 ml-1">
        {timeDiffinMinutes < 5 * 30 && `${props.music_artist} - ${props.music_title}`}
      </span>
    </div>
  )
}
