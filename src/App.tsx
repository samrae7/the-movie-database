import * as React from 'react'
import './App.css'
import { Context, TmdbApi, SearchResult, Movie } from 'tmdb-typescript-api'
import { Subject } from 'rxjs'
import { ApiVars } from './ApiVars'

interface IAppProps {
  apiVars: ApiVars
}

interface IAppState {
  results: Movie[]
  apiError: boolean
}

class App extends React.Component<IAppProps, IAppState> {

  searchTerm: Subject<{}>
  api: TmdbApi
  baseImageUrl: string
  posterSize: string

  constructor (props: IAppProps) {
    super(props)
    this.state = {
      results: [],
      apiError: false
    }
    this.searchTerm = new Subject()
    this.api = new TmdbApi(props.apiVars.apiKey)
    this.baseImageUrl = props.apiVars.baseImageUrl
    this.posterSize = props.apiVars.posterSizes[2]
  }

  componentDidMount () {
    this.searchTerm
      .throttleTime(400)
      // TODO extract out as search service ?
      .switchMap((term: string) => this.api.search.movies(term))
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
        {this.state.apiError ? 
        <p>Something went wrong fetching data</p> :
        <ul>
          {this.state.results.map((result: Movie) => {
            return (<MovieCard
                    key={result.id}
                    {...result}
                    baseImageUrl={this.baseImageUrl}
                    posterSize={this.posterSize}
                  />)
            })
          }
        </ul>}
      </div>
    )
  }
}

// TODO extract out method to get image url
// TODO default poster image when poster_path is null ( don't construct url in same way)
export const MovieCard = (props: Movie & {baseImageUrl: string, posterSize: string}) => {
  return (
    <div key={props.id}>
      <li>{props.title}</li>
      <img src={`${props.baseImageUrl}${props.posterSize}${props.poster_path}`} alt={props.title} />
    </div>
  )
}

export default App
