export function RadioItemSkeleton() {

  return (
    <div className="flex flex-col justify-center p-0.5 animate-pulse">
      <div className="flex flex-row items-center gap-2">
        <div className="w-12 h-12 bg-zinc-300 rounded-lg"/>
        <div className="w-30 h-6 bg-zinc-300 rounded-lg"></div>
      </div>
      <div className="mt-2 w-full h-px bg-zinc-200"></div>
    </div>
  )
}
