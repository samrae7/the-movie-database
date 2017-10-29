import * as React from 'react'
import { Movie } from 'tmdb-typescript-api'

// TODO extract out method to get image url
// TODO default poster image when poster_path is null ( don't construct url in same way)
export const MovieCard: React.StatelessComponent<Movie & {baseImageUrl: string, posterSize: string}> = (props: Movie & {baseImageUrl: string, posterSize: string}): JSX.Element => {
  return (
    <div key={props.id}>
      <li>{props.title}</li>
      <img src={`${props.baseImageUrl}${props.posterSize}${props.poster_path}`} alt={props.title} />
    </div>
  )
}