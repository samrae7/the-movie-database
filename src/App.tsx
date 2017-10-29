import * as React from 'react'
import './App.css'
import { Context, SearchResult, Movie } from 'tmdb-typescript-api'
import { ApiVars } from './ApiVars'
import { SearchService } from './SearchService/SearchService';
import { MovieCard } from './MovieCard/MovieCard';

interface IAppProps {
  // TODO maybe don;t need these if searchService and url are factored out?
  apiVars: ApiVars
}

interface IAppState {
  results: Movie[]
  apiError: boolean
}

class App extends React.Component<IAppProps, IAppState> {

  baseImageUrl: string
  posterSize: string
  searchService: SearchService

  constructor (props: IAppProps) {
    super(props)
    this.state = {
      results: [],
      apiError: false
    }
    this.searchService = new SearchService()
    this.baseImageUrl = props.apiVars.baseImageUrl
    this.posterSize = props.apiVars.posterSizes[2]
  }

  componentDidMount () {
    this.searchService.getResults()
      .subscribe((m: SearchResult<Movie>) => {
        console.log(m.results)
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
    // add submit button
    console.log('baseurl', Context)
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
              baseImageUrl={this.baseImageUrl}
              posterSize={this.posterSize}
             />)
            )
          }
        </ul>}
      </div>
    )
  }
}

export default App
