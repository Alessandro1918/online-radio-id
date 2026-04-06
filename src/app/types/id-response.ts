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
    icon: string,
    // v2 (v1 + this):
    last_played?: {
      timestamp: string,
      music_title: string,
      music_artist: string
    }
  }

  // Status != 200:
  message: string,
}
