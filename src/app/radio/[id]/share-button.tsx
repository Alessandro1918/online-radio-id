"use client"
import { FiShare2 } from "react-icons/fi"
import toast, { Toaster } from "react-hot-toast"

type ShareProps = {
  title: string,
  text?: string,
  url: string
}

export function ShareButton({ title, text, url }: ShareProps) {

  // OBS: "navigator.share" and "navigator.clipboard" won't work on http, only https
  async function handleClick() {
    try {
      await navigator.share({ title, text, url })
    } catch (err: any) {
      console.error("Error sharing", err)
      if (err.name != "AbortError" && err.name == "NotAllowedError" ) {
        navigator.clipboard.writeText(url)
        // alert("Link copiado para a Área de Transferência!")
        toast("Link copiado para a Área de Transferência!", {duration: 2000})
      }
    }
  }

  return (
    <div>
      <FiShare2 
        onClick={handleClick}
        className="ml-4 size-5 cursor-pointer"
      />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            padding: "8px",
            color: "#ffffff",
            background: "#52525b",
            animation: "ease-in"
          },
        }}
      />
    </div>
  )
}
