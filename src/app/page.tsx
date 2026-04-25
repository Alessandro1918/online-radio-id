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
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <div className="flex flex-col w-96 gap-4">
        <p className="w-3/4 italic text-right ml-auto">
          "Nossa, que música legal essa rádio está tocando, vou querer ouvir ela novamente! Com certeza vou lembrar o nome dela depois!"
        </p>
        <p className="text-justify">
          Quem nunca passou por essa situação? Agora não mais!
          Acesse o <span className="font-bold">Online Radio ID</span> e consulte o histórico das músicas tocadas nas suas estações de rádio favoritas!
        </p>
      </div>
      <RadioList />
    </div>
  )
}
