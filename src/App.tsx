import * as React from 'react'
import './App.css'
import { SearchResult, Movie } from 'tmdb-typescript-api'
import { SearchService } from './SearchService/SearchService'
import { MovieCard } from './MovieCard/MovieCard'

interface IAppState {
  results: Movie[]
  apiError: boolean
}

class App extends React.Component<{}, IAppState> {

  baseImageUrl: string
  posterSize: string
  searchService: SearchService

  constructor () {
    super()
    this.state = {
      results: [],
      apiError: false
    }
    this.searchService = new SearchService()
  }

  componentDidMount () {
    this.searchService.getResults()
      .subscribe((m: SearchResult<Movie>) => {
        this.setState({
          results: m.results
        })
      },
      (error => this.setState({apiError: true})))
  }

  search = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 2) {
      this.setState({results: []})
    } else {
      this.searchService.search(event.target.value.trim())
    }
  }

  render () {
    // TODO extract out movie list as separate component and return message if zero results
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Search the Movie Database</h2>
          <input type='text' onChange={this.search}></input>
        </div>
        {this.state.apiError ? 
        <p>Something went wrong fetching data</p> :
        <ul>
          {this.state.results.map((result: Movie) => 
            (<MovieCard
              key={result.id}
              {...result}
             />)
            )
          }
        </ul>}
      </div>
    )
  }
}

export default App
