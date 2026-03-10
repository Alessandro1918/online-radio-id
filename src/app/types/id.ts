export type IdProp = {
  uuid: string,
  timestamp: string,
  radio: string,
  music_artist: string,
  music_title: string,
}

// Since the query will filter by "radio + timestamp", a performance improvement is to create a compound index. 
// Run this command in the SQL editor of the deployed db:
// CREATE INDEX ids_radio_timestamp_idx ON ids (radio, timestamp DESC);
// This lets Postgres scan only the relevant rows instead of the full table, by jumping directly to radio and read rows already sorted by timestamp.
