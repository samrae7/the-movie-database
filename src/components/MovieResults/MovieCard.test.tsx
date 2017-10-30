import * as React from 'react'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { MovieCard, IMovieCardProps, IMovieCardState } from './MovieCard'

Enzyme.configure({ adapter: new Adapter() })

const defaultProps: IMovieCardProps = {
  id: 123,
  title: 'Back To the Future',
  overview: 'The adventures of Doc Brown and Marty McFly',
  posterPath: 'foo123.jpg'
}

const shallowRenderComponent = (props = defaultProps): Enzyme.ShallowWrapper<IMovieCardProps, IMovieCardState> => {
  return Enzyme.shallow(<MovieCard {...props} />)
}

let component: Enzyme.ShallowWrapper<IMovieCardProps, IMovieCardState>

describe('MovieCard component render', () => {
  beforeEach(() => {
    component = shallowRenderComponent()
  })

  it('renders container', () => {
    expect(component.find('.movie-card').exists()).toBe(true)
  })

  it('renders MovieOverview', () => {
    expect(component.find('MovieOverview').exists()).toBe(true)
  })

  it('renders MoviePoster', () => {
    expect(component.find('MoviePoster').exists()).toBe(true)
  })
})

describe('MovieCard component toggleReadMore method', () => {
  beforeEach(() => {
    component = shallowRenderComponent()
  })

  it('sets the state when method is called', () => {
    component.instance().toggleReadMore()
    expect(component.state('readMore')).toBe(true)
  })
})

describe('MovieCard component onLoad method', () => {
  let setStateSpy: jest.SpyInstance

  beforeEach(() => {
    setStateSpy = jest.spyOn(React.Component.prototype, 'setState')
    component = shallowRenderComponent()
  })

  it('sets the state when method is called', () => {
    component.instance().onLoad()
    expect(setStateSpy).toHaveBeenCalledWith({imageLoading: false})
  })
})




