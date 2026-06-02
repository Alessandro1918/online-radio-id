export function Play(props: {src: string}) {
  return (
    <audio controls>
      <source 
        src={props.src}
        type="audio/mp3"
      />
    </audio>
  )
}
