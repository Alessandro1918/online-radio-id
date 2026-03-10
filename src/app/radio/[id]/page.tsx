import { Suspense } from "react"
import { RadioHistory } from "./history"

export default function Page() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <RadioHistory />
    </Suspense>
  )
}
