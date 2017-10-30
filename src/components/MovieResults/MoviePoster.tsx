import * as React from 'react'
import { ImageService } from '../../services/ImageService/ImageService';

export interface IMoviePosterProps {
  imageService: ImageService
  placeholderPath: string
  posterPath: string
  title: string
  imageLoading: boolean
  onLoad: () => void
}

export const MoviePoster: React.StatelessComponent<IMoviePosterProps> = (props: IMoviePosterProps): JSX.Element => {
  switch (true) {
    case !!props.posterPath:
      return (
        <div className='poster-container'>
          <img onLoad={props.onLoad} src={props.imageService.getPosterUrl(props.posterPath)} alt={props.title} />
           {props.imageLoading && <div className='loader'></div>}
        </div>
      )
    default:
      return <img src={props.placeholderPath} alt={props.title} />
  }
}

MoviePoster.displayName = 'MoviePoster'