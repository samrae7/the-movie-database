import * as React from 'react'
import { ImageService } from '../../services/ImageService/ImageService'
import './MoviePoster.css'

export interface IMoviePosterProps {
  imageService: ImageService
  placeholderPath: string
  posterPath: string | null
  title: string
  imageLoading: boolean
  onLoad: () => void
}

export const MoviePoster: React.StatelessComponent<IMoviePosterProps> = (props: IMoviePosterProps): JSX.Element => {
  switch (true) {
    case !!props.posterPath:
      return (
        <div className='poster-container'>
          {props.posterPath && <img onLoad={props.onLoad} src={props.imageService.getPosterUrl(props.posterPath)} alt={props.title} />}
          {props.imageLoading && <div className='spinner'></div>}
        </div>
      )
    default:
      return <img src={props.placeholderPath} alt={props.title} />
  }
}

MoviePoster.displayName = 'MoviePoster'
