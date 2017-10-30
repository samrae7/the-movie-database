import * as React from 'react'
import { Movie } from 'tmdb-typescript-api'
import imageService from '../ImageService/ImageService'
import './MovieCard.css'

const placeholder = require('./noposter.jpg')

export interface IMovieCardState {
  imageLoading: boolean,
  readMore: boolean
}

export class MovieCard extends React.Component<Movie, IMovieCardState> {
  constructor() {
    super()
    this.state = {
      imageLoading: true,
      readMore: false
    }
  }

  onLoad = () => {
    this.setState({
      imageLoading: false
    })
  }

  toggleReadMore = () => {
    const readMore = !this.state.readMore
    this.setState({readMore})
  }

  render () {

    // TODO factor out overview, poster and spinner
    return (
      <li className='movie-card' key={this.props.id}>
        <div>
          <h3>{this.props.title}</h3>
          {
            this.props.overview.length <= 170 || this.state.readMore ?
              <p>
                {this.props.overview}
                {this.props.overview.length > 170 &&
                  <a onClick={this.toggleReadMore}> Less</a>
                }
              </p>
              :
              <p>
                {this.props.overview.slice(0, 170)}
                <a onClick={this.toggleReadMore}>... More</a>
              </p>
          }
      </div>
        {this.props.poster_path &&
        this.state.imageLoading &&
          <div className='loader-container'>
            <div className='loader'></div>
          </div>
        }
        {this.props.poster_path ?
          <img onLoad={this.onLoad} src={imageService.getPosterUrl(this.props.poster_path)} alt={this.props.title} /> :
          <img src={placeholder} alt={this.props.title} />
        }
      </li>
    )
  }
}
