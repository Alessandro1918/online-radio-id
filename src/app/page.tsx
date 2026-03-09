import { RadioList } from "./components/radio-list"

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8 p-4">
      <span>
        Confira online a programação de suas estações de rádio favoritas!
      </span>
      <RadioList />
    </div>
  )
}
