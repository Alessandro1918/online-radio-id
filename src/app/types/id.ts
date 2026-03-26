export type IDResponseProps = {
  // Status 200 - OK:
  timestamp:string,
  track: {
    title: string,
    artist: string,
    album: {
      cover: string,
      title: string,
      year: number,
    }
  },
  radio: {
    id: string,
    name: string,
    state: string,
    countrycode: string,
    stream: string,
    site: string,
    icon: string
  }

  // Status != 200:
  message: string,
}
