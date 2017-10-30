import * as React from 'react'
import Enzyme from '../../setupTests'
import * as Adapter from 'enzyme-adapter-react-16'
import { MovieResults, IMovieResultsProps } from './MovieResults'
import { mockMovieData } from '../../stubs/mockMovieResults'

Enzyme.configure({ adapter: new Adapter() })

const defaultProps: IMovieResultsProps = {
  results: mockMovieData,
  apiError: false,
  loading: false
}

const shallowRenderComponent = (props = defaultProps): Enzyme.ShallowWrapper<IMovieResultsProps, {}> => {
  return Enzyme.shallow(<MovieResults {...props} />)
}

let component: Enzyme.ShallowWrapper<IMovieResultsProps, {}>

describe('MovieResults component render', () => {
  beforeEach(() => {
    component = shallowRenderComponent()
  })

  it('renders container', () => {
    expect(component.find('ul.movie-results').exists()).toBe(true)
  })

  it('renders correct number of MovieCards', () => {
    expect(component.find('MovieCard').length).toBe(2)
  })
})

describe('MovieResults when loading', () => {
  beforeEach(() => {
    component = shallowRenderComponent({...defaultProps, loading: true})
  })

  it('renders loading text', () => {
    expect(component.find('p').text()).toBe('Fetching movies...')
  })
})

describe('MovieResults with apiError', () => {
  beforeEach(() => {
    component = shallowRenderComponent({...defaultProps, apiError: true})
  })

  it('renders error text', () => {
    expect(component.find('p').text()).toBe('Something went wrong fetching data')
  })
})

describe('MovieResults with zero results', () => {
  beforeEach(() => {
    component = shallowRenderComponent({...defaultProps, results: []})
  })

  it('renders error text', () => {
    expect(component.find('p').text()).toBe('No results')
  })
})






