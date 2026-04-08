import { Suspense } from "react"
import type { Metadata } from "next"
import { Details } from "./details"
import { History } from "./history"
import { getRadio } from "../../services/get-radio"

type Props = {
  params: Promise<{ id: string }>,                             //dynamic route parameters ("/shop/1" => { slug: '1'})
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }> //search params ("/shop?a=1" => { a: '1' })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const radio = await getRadio(String(id))
  return {
    title: `${radio.name} | Online Radio ID`,
    description: `${radio.name} | Programação 24h`,
    openGraph: {
      images: [{
        width: 256,
        height: 256,
        url: radio.icon
      }],
    },
  }
}

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 my-4">
      <Suspense>
        <Details />
      </Suspense>

      <Suspense>
        <History />
      </Suspense>
    </div>
  )
}
