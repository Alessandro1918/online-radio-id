import { RadioProps } from "../types/radio"
import { NowPlaying } from "./now-playing"
import ReactCountryFlag from "react-country-flag"

export function RadioItem(props: RadioProps) {

  return (
    <a href={`/radio/${props.id}`}>
      <div className="flex flex-col justify-center p-0.5">
        <div className="flex flex-row items-center gap-2">
          <img className="w-12 h-12" src={props.icon}/>
          <div className="flex flex-col w-full min-w-0">
            <div className="flex flex-row items-center justify-between">
              <span>{props.name}</span>
              <div className="flex flex-row gap-2">
                <span className="text-zinc-600 text-[10px]">
                  {`${props.city} - ${props.state}`}
                </span>
                <ReactCountryFlag countryCode={props.countrycode} />
              </div>
            </div>
            <NowPlaying {...props.playing}/>
          </div>
        </div>
        <div className="mt-2 w-full h-px bg-zinc-200"></div>
      </div>
    </a>
  )
}
