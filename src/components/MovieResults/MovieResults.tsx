import * as React from 'react'
import { Movie } from 'tmdb-typescript-api'
import { MovieCard } from './MovieCard'
import './MovieResults.css'

export interface IMovieResultsProps {
  results: Movie[],
  apiError: boolean,
  loading: boolean
}

export const MovieResults: React.StatelessComponent<IMovieResultsProps> = (props: IMovieResultsProps): JSX.Element => {
  // TODO refactor as switch
  if (props.apiError) {
    return <p>Something went wrong fetching data</p>
  } else if (props.loading) {
    return <p>Fetching movies...</p>
  } else if (props.results.length > 0) {
    return (
      <ul className='movie-list'>
        {props.results.map((result: Movie) => 
          <MovieCard
            key={result.id}
              {...result}
            />
          )
        }
      </ul>
    )
  }
  return <p>No results</p>
}
MovieResults.displayName = 'MovieResults'