type StatsItemProps = {
  ranking?: number,
  name: string,
  value: string
}

export function StatsItem(props: StatsItemProps) {
  return (
    <div className="flex flex-col justify-center p-0.5">
      <div className="flex flex-row gap-2 items-center justify-between">
        { props.ranking && <span>{props.ranking}º</span>}
        <span className="flex-1">{props.name}</span>
        <span>{props.value}</span>
      </div>
      <div className="w-full h-px bg-zinc-200"></div>
    </div>
  )
}