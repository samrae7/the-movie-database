import * as React from 'react'

export interface IMovieOverviewProps {
  overview: string
  toggleReadMore: () => void
  readMore: boolean
  title: string
}

export const MovieOverview: React.StatelessComponent<IMovieOverviewProps> = (props: IMovieOverviewProps) => {
  return (
    <div className='movie-overview'>
      <h3>{props.title}</h3>
      { props.overview.length <= 170 || props.readMore ?
        <p>
          {props.overview}
          {props.overview.length > 170 &&
            <a onClick={props.toggleReadMore}> Less</a>
          }
        </p>
        :
        <p>
          {props.overview.slice(0, 170)}
          <a onClick={props.toggleReadMore}>... More</a>
        </p>
      }
    </div>
  )
}

MovieOverview.displayName = 'MovieOverview'