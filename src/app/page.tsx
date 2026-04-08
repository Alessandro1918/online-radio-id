import type { Metadata } from "next"
import { RadioList } from "./components/radio-list"

export const metadata: Metadata = {
  title: "Online Radio ID",
  description: "Confira online a programação de suas estações de rádio favoritas!",
  openGraph: {
    title: "Online Radio ID",
    description: "Confira online a programação de suas estações de rádio favoritas!",
    images: [{
      width: 256,
      height: 256,
      url: "/assets/opengraph-image.png",
    }],
  }
}

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
