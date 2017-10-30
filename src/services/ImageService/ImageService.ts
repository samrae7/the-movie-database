import { Context } from 'tmdb-typescript-api'

interface Config {
  change_keys: string[],
  images: ImageVars
}

interface ImageVars {
  backdrop_sizes: string[]
  base_url: string
  logo_sizes: string[]
  poster_sizes: string[]
  profiles_sizes: string[]
  secure_base_url: string
  still_sizes: string[]
}

export class ImageService {
  apiKey: string = process.env.TMDB_API_KEY_V3 || ''
  baseUrlApi: string = new Context().baseUrl
  baseImageUrl: string
  posterSize: string

  constructor() {
    this.fetchConfigurationVars()
      .then((config: Config) => {
        this.baseImageUrl = config.images.secure_base_url
        this.posterSize = config.images.poster_sizes[1]
        this.getPosterUrl = this.getPosterUrl.bind(this) 
      })
  }

  getPosterUrl(posterPath: string) {
    return `${this.baseImageUrl}${this.posterSize}${posterPath}`
  }

  fetchConfigurationVars = (): Promise<Config> => {
  return fetch(`${this.baseUrlApi}/configuration?api_key=${this.apiKey}`)
    .then((response: Response) => {
      return response.json()
    })
}
}

export default new ImageService()