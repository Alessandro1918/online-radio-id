export type RadioProps = {
  id: string,
  name: string,
  city: string,
  state: string,
  countrycode: string,
  stream: string,
  site: string,
  icon: string,
  frequency: string,
  query: string,
  last_played: {
    timestamp: string,
    music_artist: string,
    music_title: string
  }
}
