import * as React from 'react'
import './App.css'
import { SearchResult, Movie } from 'tmdb-typescript-api'
import { SearchService } from '../SearchService/SearchService'
import { MovieResults } from '../MovieResults/MovieResults';

interface IAppState {
  results: Movie[]
  apiError: boolean
  loading: boolean
  searchTerm: string
}

class App extends React.Component<{}, IAppState> {
  baseImageUrl: string
  posterSize: string
  searchService: SearchService

  constructor () {
    super()
    this.state = {
      results: [],
      apiError: false,
      loading: false,
      searchTerm: ''
    }
    this.searchService = new SearchService()
  }

  componentDidMount () {
    this.searchService.getResults()
      .subscribe(
        (m: SearchResult<Movie>) => {
          this.setState({
            results: m.results,
            loading: false
          })
        },
        error => this.setState({apiError: true})
      )
  }

  search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    this.setState({searchTerm})
    if (searchTerm.length >= 2) {
      this.setState({loading: true})
      this.searchService.search(event.target.value.trim())
    } else {
      this.setState({
        results: [],
        loading: false
      })
    }
  }

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Search the Movie Database</h2>
          <input type='text' onChange={this.search}></input>
        </div>
        {this.state.searchTerm.length ? 
          <MovieResults
            results={this.state.results}
            error={this.state.apiError}
            loading={this.state.loading}
          />
          :
          <p>Type in the search box to find movies</p>
        }
      </div>
    )
  }
}

export default App
