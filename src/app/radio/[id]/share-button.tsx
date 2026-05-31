import { FiShare2 } from "react-icons/fi"

type ShareProps = {
  title: string,
  text: string,
  url: string
}

export function ShareButton({ title, text, url }: ShareProps) {

  // OBS: navigator.share and navigator.clipboard wouln't work on http, only https
  async function handleClick() {
    try {
      await navigator.share({ title, text, url })
    } catch (err) {
      console.error("Error sharing", err)
      alert("Link copiado para a Área de Transferência!")
      navigator.clipboard.writeText(url)
    }
  }

  return (
    <FiShare2 
      onClick={handleClick}
      className="ml-4 size-5 cursor-pointer"
    />
  )
}
