import * as React from 'react'
import Enzyme from '../../setupTests'
import { MoviePoster, IMoviePosterProps } from './MoviePoster'
import { ImageService } from '../../services/ImageService/ImageService'

const mockImageService: ImageService = {
    baseImageUrl: 'http://baseImageUrl',
    posterSize: 'w555',
    getPosterUrl: jest.fn().mockReturnValue('http://baseImageUrl/w55'),
    apiKey: 'jjj',
    baseUrlApi: 'https://api.v3/',
    fetchConfigurationVars: jest.fn()
  }
const placeholderPath = '/loremipsum.jpg'

const initialProps: IMoviePosterProps = {
  imageService: mockImageService,
  placeholderPath: placeholderPath,
  posterPath: '/foobar.jpg',
  title: 'Indiana Jones and the Tmple of Doom',
  imageLoading: true,
  onLoad: jest.fn()
}

const shallowRenderComponent = (props = initialProps): Enzyme.ShallowWrapper<IMoviePosterProps, {}> => {
  return Enzyme.shallow(<MoviePoster {...props} />)
}

let component: Enzyme.ShallowWrapper<IMoviePosterProps, {}>

describe('MoviePoster component render initial props (image loading)', () => {
  beforeEach(() => {
    component = shallowRenderComponent()
  })

  it('renders container', () => {
    expect(component.find('.poster-container').exists()).toBe(true)
  })

  it('renders spnner', () => {
    expect(component.find('.spinner').exists()).toBe(true)
  })
})

describe('MoviePoster component render image loaded', () => {
  beforeEach(() => {
    component = shallowRenderComponent({...initialProps, imageLoading: false})
  })

  it('renders container', () => {
    expect(component.find('.poster-container').exists()).toBe(true)
  })

  it('does NOT render spinner', () => {
    expect(component.find('.spinner').exists()).toBe(false)
  })
})

describe('MoviePoster component render with no posterPath', () => {
  beforeEach(() => {
    component = shallowRenderComponent({...initialProps, posterPath: null})
  })

  it('does not render container', () => {
    expect(component.find('.poster-container').exists()).toBe(false)
  })

  it('renders placeholder', () => {
    expect(component.find(`img[src='${placeholderPath}']`).exists()).toBe(true)
  })
})






