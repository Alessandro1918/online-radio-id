export function Header() {
  return (
    <div className="flex items-center justify-center w-full h-16 gap-8 bg-linear-to-r from-zinc-400 from-15% via-zinc-200 via-50% to-zinc-400 to-85%">
      <a href={"/"}>
        <img
          src="/assets/opengraph-image.png"
          className="size-12 rounded-full"
        />
      </a>

      <a href={"/"}>
        <span className="text-2xl font-extrabold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Online Radio ID
        </span>
      </a>
    </div>
  )
}
