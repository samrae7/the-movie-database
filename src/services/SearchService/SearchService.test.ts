import { SearchService } from './SearchService'
import { TmdbApi } from 'tmdb-typescript-api'
import { Observable } from 'rxjs';

const mockApi = {
  search: {
    movies: (term: string) => Observable.of(`Here are results for ${term}`)
  }
}

describe('searchService', () => {
  let searchService: SearchService

  beforeEach(() => {
    searchService = new SearchService(mockApi as any as TmdbApi)
  })

  describe('search method', () => {
    let value: string = 'before'

    beforeEach(() => {
      searchService.searchTerm.subscribe((val) => value = val)
    })

    it('should push a value to the searchTerm subject', () => {
      searchService.search('after')
      expect(value).toBe('after')
    })
  })

  describe('getResults method', () => {
    let result: any 

    beforeEach(() => {
      searchService.getResults()
        .subscribe(res => result = res)
      searchService.search('The Exorcist')
    })

    it('should return search results from the api', () => {
      expect(result).toBe('Here are results for The Exorcist')
    })
  })
})
