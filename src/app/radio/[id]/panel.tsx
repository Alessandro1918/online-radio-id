"use client"
import { useState } from "react"
import { History } from "./history"
import { Stats } from "./stats"

export function Panel() {

  const [ panelIndex, setPanelIndex ] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-96 flex flex-row items-center justify-between gap-1">
        <button
          disabled={panelIndex == 0}
          onClick={() => setPanelIndex(0)}
          className="mx-auto p-2 rounded-sm font-medium disabled:font-bold text-black disabled:text-zinc-300 hover:enabled:text-black/80 cursor-pointer disabled:cursor-auto"
        >
          History
        </button>
        <button
          disabled={panelIndex == 1}
          onClick={() => setPanelIndex(1)}
          className="mx-auto p-2 rounded-sm font-medium disabled:font-bold text-black disabled:text-zinc-300 hover:enabled:text-black/80 cursor-pointer disabled:cursor-auto"
        >
          Stats
        </button>
      </div>

      {
        panelIndex == 0
          ? <History />
          : <Stats />
      }
    </div>
  )
}
