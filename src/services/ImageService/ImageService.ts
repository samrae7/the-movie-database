export class ImageService {
  baseImageUrl: string
  posterSize: string

  constructor (
    baseImageUrl = 'https://image.tmdb.org/t/p/',
    posterSize = 'w154'
  ) {
    this.baseImageUrl = baseImageUrl
    this.posterSize = posterSize
    this.getPosterUrl = this.getPosterUrl.bind(this)
  }

  // example: https://image.tmdb.org/t/p/w154/6u1fYtxG5eqjhtCPDx04pJphQRW.jpg
  getPosterUrl (posterPath: string) {
    return `${this.baseImageUrl}${this.posterSize}${posterPath}`
  }

  // TODO: Was previously fetching image vars from the API and setting them in
  // in the constructore, which was slow and made this class impossible to test
  // Would still like to check API vars, so find a way to do this as part of the
  // webpack build
  //
  // fetchConfigurationVars = (): Promise<Config> => {
  //   return fetch(`${this.baseUrlApi}/configuration?api_key=${this.apiKey}`)
  //     .then((response: Response) => {
  //       return response.json()
  //     })
  //     .catch(e => console.log('error', e))
  // }
}

export default new ImageService()
