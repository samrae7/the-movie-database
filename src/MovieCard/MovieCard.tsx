import * as React from 'react'
import { Movie } from 'tmdb-typescript-api'
import imageService from '../ImagesService'
import './MovieCard.css'

//TODO resize placeholder image
const placeholder = require('./noposter.jpg')

// TODO look at sorting out props
export class MovieCard extends React.Component<Movie, {imageLoading: boolean}> {
  constructor() {
    super()
    this.state = {imageLoading: true}
  }

  onLoad = () => {
    this.setState({
      imageLoading: false
    })
  }

  render () {
  console.log('poster', this.props.poster_path)
    return (
      <li className='movie-card' key={this.props.id}>
        <div>
          <h3>{this.props.title}</h3>
          <p>{`${this.props.overview.slice(0, 160)}...`}</p>
        </div>
        {this.props.poster_path && this.state.imageLoading && <p>Loading...</p>}
        {this.props.poster_path ?
          <img onLoad={this.onLoad} src={imageService.getPosterUrl(this.props.poster_path)} alt={this.props.title} /> :
          <img src={placeholder} alt={this.props.title} />
        }
      </li>
    )
  }
}
