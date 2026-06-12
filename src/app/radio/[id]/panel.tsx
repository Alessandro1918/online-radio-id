"use client"
import { useState } from "react"
import { History } from "./history"
import { Stats } from "./stats"

export function Panel() {

  const [ panelIndex, setPanelIndex ] = useState(0)

  return (
    <div className="w-96 flex flex-col items-center justify-center gap-2">
      <div className="w-full flex flex-row items-center justify-between gap-2">
        {/* <button 
          disabled={panelIndex == 0} 
          onClick={() => setPanelIndex(0)} 
        >
          History
        </button> */}
        <PanelButton 
          title="Histórico"
          index={0}
          isDisabled={panelIndex == 0}
          handleClick={setPanelIndex}
        />
        <PanelButton 
          title="Estatísticas"
          index={1}
          isDisabled={panelIndex == 1}
          handleClick={setPanelIndex}
        />
      </div>
      {
        panelIndex == 0
          ? <History />
          : <Stats />
      }
    </div>
  )
}

type PanelButtonProps = {
  title: string,
  index: number,
  isDisabled: boolean,
  handleClick: (index: number) => void
}

function PanelButton({ title, index, isDisabled, handleClick }: PanelButtonProps) {
  return (
    <button
      disabled={isDisabled}
      onClick={() => handleClick(index)}
      className={`
        mx-auto p-2 rounded-lg border-2 border-zinc-200 
        w-4/5 disabled:w-full 
        cursor-pointer disabled:cursor-auto
        text-black enabled:text-zinc-500 
      `}
    >
      {title}
    </button>
  )
}
