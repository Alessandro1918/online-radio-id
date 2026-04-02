export function HistoryItemSkeleton() {
  return (
    <div className="flex flex-col justify-center p-0.5">
      <div className="my-1 mx-auto w-90 h-4 bg-zinc-300 rounded-lg animate-pulse"></div>
      <div className="w-full h-px bg-zinc-200"></div>
    </div>
  )
}
