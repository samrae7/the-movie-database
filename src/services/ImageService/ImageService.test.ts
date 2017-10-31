import { ImageService } from './ImageService'

describe('imageService getPosterUrl', () => {
  const posterPath = 'loremipsum123'
  const baseImageUrl = 'base'
  const posterSize = 'posterSize500'
  let imageService: ImageService

  beforeEach(() => {
    imageService = new ImageService(baseImageUrl, posterSize)
  })

  it('should construct correct Url', () => {
    expect(imageService.getPosterUrl(posterPath)).toBe(baseImageUrl + posterSize + posterPath)
  })
})