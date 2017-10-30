import * as React from 'react'
import Enzyme from '../../setupTests'
import App, { IAppState, IAppProps } from './App'
import { Subject } from 'rxjs'
import { TmdbApi, SearchResult, Movie } from 'tmdb-typescript-api'
import { Observable } from 'rxjs/Observable'

const apiKey = 'bar'

const mockMovieData = [
    {title: 'Back To the Future'},
    {title: 'The Empire Strikes Back'}
  ] as Movie[]

const mockSearchResult: SearchResult<Movie> = {
  page: 1,
  results: mockMovieData,
  total_results: 50,
  total_pages: 5
}

const defaultProps: IAppProps = {
  searchService: {
    searchTerm: new Subject(),
    api: new TmdbApi(apiKey),
    search: (term: string) => jest.fn(),
    getResults: () => Observable.from(Promise.resolve(mockSearchResult))
  } 
}

const shallowRenderComponent = (props = defaultProps): Enzyme.ShallowWrapper<IAppProps, IAppState> => {
  return Enzyme.shallow(<App {...props} />)
}

const mountComponent = (props = defaultProps): Enzyme.ReactWrapper<IAppProps, IAppState> => {
  return Enzyme.mount(<App {...props} />)
}

let component: Enzyme.ShallowWrapper<IAppProps, IAppState>

describe('App component render', () => {
  beforeEach(() => {
    component = shallowRenderComponent()
  })

  it('renders container', () => {
    expect(component.find('.app').exists()).toBe(true)
  })

  it('renders call-to-action', () => {
    expect(component.find('p.call-to-action').exists()).toBe(true)
  })

  it('does not render call-to-action once user has entered text', () => {
    component.setState({searchTerm: 'My Little Pony'})
    expect(component.find('p.call-to-action').exists()).not.toBe(true)
  })

  it('renders MovieResults once user has entered text', () => {
    component.setState({searchTerm: 'My Little Pony'})
    expect(component.find('MovieResults').exists()).toBe(true)
  })
})

describe('App component fetching data', () => {
  let component: Enzyme.ReactWrapper<IAppProps, IAppState>

  beforeEach(() => {
    component = mountComponent()
  })

  it('updates state after mounting', () => {
    expect(component.state('results')).toEqual(mockMovieData)
  })
})

describe('search term with > 2 chars', () => {
  let component: Enzyme.ShallowWrapper<IAppProps, IAppState>
  let searchSpy: jest.SpyInstance
  let setStateSpy: jest.SpyInstance
  let searchServiceSpy: jest.SpyInstance
  const searchTerm = 'Back To the Future'

  beforeAll(() => {
    searchSpy = jest.spyOn(App.prototype, 'search')
    setStateSpy = jest.spyOn(React.Component.prototype, 'setState')
    searchServiceSpy = jest.spyOn(defaultProps.searchService, 'search')
    component = shallowRenderComponent()
    component.find(`input[type='text']`).simulate('change', {target: {value: searchTerm}})
  })

  it('should set the serchTerm on component state', () => {
    expect(setStateSpy).toHaveBeenCalledWith({searchTerm})
  })

  it('changing searchTerm calls search with correct value', () => {
    expect(searchSpy).toHaveBeenCalledWith(searchTerm)
  })

  it('should not call searchService', () => {
    expect(searchServiceSpy).toHaveBeenCalledWith(searchTerm)
  })
  
  it('changing searchTerm sets state.loading to true', () => {
    expect(setStateSpy).toHaveBeenCalledWith({loading: true})
  })

  afterAll(() => {
    searchServiceSpy.mockReset()
  })
})

describe('search term < 2 chars', () => {
  let component: Enzyme.ShallowWrapper<IAppProps, IAppState>
  let searchSpy: jest.SpyInstance
  let setStateSpy: jest.SpyInstance
  let searchServiceSpy: jest.SpyInstance
  const searchTerm = 'I'

  beforeAll(() => {
    searchSpy = jest.spyOn(App.prototype, 'search')
    setStateSpy = jest.spyOn(React.Component.prototype, 'setState')
    searchServiceSpy = jest.spyOn(defaultProps.searchService, 'search')
    component = shallowRenderComponent()
    component.find(`input[type='text']`).simulate('change', {target: {value: searchTerm}})
  })

  it('should set the serchTerm on component state', () => {
    expect(setStateSpy).toHaveBeenCalledWith({searchTerm})
  })

  it('should call search with correct value', () => {
    expect(searchSpy).toHaveBeenCalledWith(searchTerm)
  })

  it('should not call searchService', () => {
    expect(searchServiceSpy).not.toHaveBeenCalled()
  })
  
  it('should set the state correctly', () => {
    expect(setStateSpy).toHaveBeenCalledWith({results: [], loading: false})
  })

  afterAll(() => {
    searchServiceSpy.mockReset()
  })
})



