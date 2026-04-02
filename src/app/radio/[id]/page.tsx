import { Suspense } from "react"
import { Details } from "./details"
import { History } from "./history"

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
