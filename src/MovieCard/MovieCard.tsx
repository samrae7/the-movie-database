import * as React from 'react'
import { Movie } from 'tmdb-typescript-api'
import { PosterHelper } from '../ImagesService'

//TODO resize placeholder image
const placeholder = require('./noposter.jpg')
const posterHelper = new PosterHelper()

// TODO default poster image when poster_path is null ( don't construct url in same way)
export const MovieCard: React.StatelessComponent<Movie> = (props: Movie): JSX.Element => {
  console.log('poster', props.poster_path)
  return (
    <div key={props.id}>
      <li>{props.title}</li>
      {props.poster_path ?
        <img src={posterHelper.getPosterUrl(props.poster_path)} alt={props.title} /> :
        <img src={placeholder} alt={props.title} />
      }
    </div>
  )
}
