import * as React from 'react'
import Enzyme from '../../setupTests'
import { MovieOverview, IMovieOverviewProps } from './MovieOverview'

const defaultProps: IMovieOverviewProps = {
  overview: 'ipsum ipsum',
  toggleReadMore: jest.fn(),
  readMore: false,
  title: 'Lorem'
}

const longText = `Hempen halter carouser topmast execution dock schooner jack hands
Pirate Round rigging Gold Road hornswaggle coffer starboard square-rigged case shot.
Flogging mutiny fluke spirits Pieces of Eight nipper fore dance the hempen jig Yellow
Jack Barbary Coast bring a spring upon her cable bilge water draft scurvy chase guns 
parley driver.`

const shallowRenderComponent = (props = defaultProps): Enzyme.ShallowWrapper<IMovieOverviewProps, {}> => {
  return Enzyme.shallow(<MovieOverview {...props} />)
}

let component: Enzyme.ShallowWrapper<IMovieOverviewProps, {}>

describe(`MovieOverview with default props
(overview text < 170 chars)`, () => {
  beforeEach(() => {
    component = shallowRenderComponent()
  })

  it('renders component', () => {
    expect(component.find('.movie-overview').exists()).toBe(true)
  })

  it(`does not render 'less/more' link`, () => {
    expect(component.find('a').exists()).toBe(false)
  })
})
  

describe('MovieOverview when text is > 170 chars', () => {
  beforeEach(() => {
    component = shallowRenderComponent({...defaultProps, overview: longText})
  })

  it(`renders 'more' link`, () => {
    expect(component.find('a').text()).toBe('... More')
  })
})

describe('MovieOverview when text is > 170 chars and overview is already expanded', () => {
  beforeEach(() => {
    component = shallowRenderComponent({
      ...defaultProps,
      overview: longText,
      readMore: true
    })
  })

  it(`renders 'less' link`, () => {
    expect(component.find('a').text()).toBe(' Less')
  })
})

describe('MovieOverview component onToggleReadMore', () => {
  let toggleReadMoreSpy: jest.SpyInstance

  beforeEach(() => {
    toggleReadMoreSpy = jest.spyOn(defaultProps, 'toggleReadMore')
    component = shallowRenderComponent({...defaultProps, overview: longText})
  })

  it(`Clicking less/more link calls toggleReadMore`, () => {
    component.find('a').simulate('click')
    expect(toggleReadMoreSpy).toHaveBeenCalled()
  })
})
