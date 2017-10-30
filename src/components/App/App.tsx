import * as React from 'react'
import './App.css'
import { SearchResult, Movie } from 'tmdb-typescript-api'
import { SearchService } from '../../services/SearchService/SearchService'
import { MovieResults } from '../MovieResults/MovieResults'

export interface IAppProps {
  searchService: SearchService
}

export interface IAppState {
  results: Movie[]
  apiError: boolean
  loading: boolean
  searchTerm: string
}

class App extends React.Component<IAppProps, IAppState> {
  baseImageUrl: string
  posterSize: string

  constructor () {
    super()
    this.state = {
      results: [],
      apiError: false,
      loading: false,
      searchTerm: ''
    }
    this.search = this.search.bind(this)
  }

  componentDidMount () {
    this.props.searchService.getResults()
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

  search (searchTerm: string) {
    this.setState({searchTerm})
    if (searchTerm.length >= 2) {
      this.setState({loading: true})
      this.props.searchService.search(searchTerm.trim())
    } else {
      this.setState({
        results: [],
        loading: false
      })
    }
  }

  render () {
    return (
      <div className='app'>
        <div className='app-header'>
          <h2>Search the Movie Database</h2>
          <input
            type='text'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.search(e.target.value)}>
          </input>
        </div>
        {this.state.searchTerm.length ? 
          <MovieResults
            results={this.state.results}
            apiError={this.state.apiError}
            loading={this.state.loading}
          />
          :
          <p className='call-to-action'>Type in the search box to find movies</p>
        }
      </div>
    )
  }
}

export default App
