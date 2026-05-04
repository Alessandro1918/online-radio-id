export function Footer() {
  return (
    <div className="mt-auto flex items-center justify-center w-full h-8 bg-linear-to-r from-zinc-400 from-15% via-zinc-200 via-50% to-zinc-400 to-85%">
      <span className="text-xs text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Design e desenvolvimento:{` `}
        <a 
          className="font-semibold"
          aria-label="author linkedin button"
          href="https://www.linkedin.com/in/alessandro-bentivegna-cesta-0058a785/"
        >
          Alessandro B. Cesta
        </a>
      </span>
    </div>
  )
}
