import type { Metadata } from "next"
import { Header } from "./components/header"
import { Intro } from "./components/intro"
import { RadioList } from "./components/radio-list"
import { Footer } from "./components/footer"

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
    <div className="flex flex-col gap-8 w-full min-h-screen items-center">
      <Header />
      <Intro />
      <RadioList />
      <Footer />
    </div>
  )
}
