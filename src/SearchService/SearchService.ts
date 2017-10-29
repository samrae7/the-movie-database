import { Subject } from 'rxjs'
import { TmdbApi } from 'tmdb-typescript-api'

const apiKey = process.env.TMDB_API_KEY_V3 || ''

export class SearchService {
  searchTerm: Subject<string>
  api: TmdbApi

  constructor () {
    this.searchTerm = new Subject()
    this.api = new TmdbApi(apiKey)
  }

  search (term: string) {
    this.searchTerm.next(term) 
  }

  getResults() {
    return this.searchTerm
      .throttleTime(200)
      .distinctUntilChanged()
      .switchMap((term: string) => this.api.search.movies(term))
  }
}