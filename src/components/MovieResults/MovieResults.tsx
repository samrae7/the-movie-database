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
      <ul className='movie-results'>
        {props.results.map((result: Movie) => 
        // TODO check if necessary to add key here as li has id prop as key anyway
          <MovieCard
            key={result.id}
            id={result.id}
            title={result.title}
            overview={result.overview}
            posterPath={result.poster_path}
          />
          )
        }
      </ul>
    )
  }
  return <p>No results</p>
}
MovieResults.displayName = 'MovieResults'