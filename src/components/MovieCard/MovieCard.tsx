import * as React from 'react'
import imageService from '../../services/ImageService/ImageService'
import './MovieCard.css'
import { MovieOverview } from '../MovieOverview/MovieOverview'
import { MoviePoster } from '../MoviePoster/MoviePoster'

const placeholder = require('./noposter.jpg')

export interface IMovieCardProps {
  id: number,
  title: string,
  posterPath: string,
  overview: string
}

export interface IMovieCardState {
  imageLoading: boolean,
  readMore: boolean
}

export class MovieCard extends React.Component<IMovieCardProps, IMovieCardState> {
  constructor () {
    super()
    this.state = {
      imageLoading: true,
      readMore: false
    }
  }

  onLoad = () => {
    this.setState({imageLoading: false})
  }

  toggleReadMore = () => {
    const readMore = !this.state.readMore
    this.setState({ readMore })
  }

  render () {
    return (
      <li className='movie-card' key={this.props.id}>
        <MovieOverview
          overview={this.props.overview}
          toggleReadMore={this.toggleReadMore}
          readMore={this.state.readMore}
          title={this.props.title}
        />
        <MoviePoster
          imageService={imageService}
          placeholderPath={placeholder}
          posterPath={this.props.posterPath}
          onLoad={this.onLoad}
          imageLoading={this.state.imageLoading}
          title={this.props.title}
        />
      </li>
    )
  }
}
