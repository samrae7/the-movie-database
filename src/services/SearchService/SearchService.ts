import { Subject } from 'rxjs'
import { TmdbApi, SearchResult, Movie } from 'tmdb-typescript-api'
import { Observable } from 'rxjs/Observable'

const apiKey = process.env.TMDB_API_KEY_V3 || ''

export class SearchService {
  searchTerm: Subject<string>
  api: TmdbApi

  constructor (api: TmdbApi) {
    this.searchTerm = new Subject()
    this.api = api
  }

  search (term: string) {
    this.searchTerm.next(term)
  }

  getResults (): Observable<SearchResult<Movie>> {
    return this.searchTerm
      .distinctUntilChanged()
      .switchMap((term: string) => this.api.search.movies(term))
  }
}

export default new SearchService(new TmdbApi(apiKey))
