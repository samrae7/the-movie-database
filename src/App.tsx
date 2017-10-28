import * as React from 'react'
import './App.css'
import { Context, TmdbApi, SearchResult, Movie } from 'tmdb-typescript-api'
import { Subject } from 'rxjs'

const API_KEY = process.env.TMDB_API_KEY_V3 || ''
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
const POSTER_SIZE = 'w150'

interface IAppState {
  results: Movie[]
}

class App extends React.Component<{}, IAppState> {

  searchTerm: Subject<{}>
  api: TmdbApi

  constructor () {
    super()
    this.state = {
      results: []
    }
    this.searchTerm = new Subject()
    this.api = new TmdbApi(API_KEY)
  }

  componentDidMount () {
    // TODO catch error
    this.searchTerm
      .throttleTime(400)
      .switchMap((term: string) => this.api.search.movies(term))
      .subscribe((m: SearchResult<Movie>) => {
        console.log(m.results)
        this.setState({
        results: m.results
      })
    })
  }

  search = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 2) {
      this.setState({results: []})
    } else {
      this.searchTerm.next(event.target.value)
    }
  }

  render () {
    console.log('baseurl', Context)
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Search the Movie Database</h2>
          <input type='text' onChange={this.search}></input>
        </div>
        <ul>
          {this.state.results.map((result: Movie) => <MovieCard key={result.id} {...result}/>)}
        </ul>
    
      </div>
    )
  }
}

export const MovieCard = (props: Movie) => {
  return (
    <div key={props.id}>
      <li>{props.title}</li>
      <img src={`${BASE_IMAGE_URL}${POSTER_SIZE}${props.poster_path}`} alt={props.title} />
    </div>
  )
}

export default App
