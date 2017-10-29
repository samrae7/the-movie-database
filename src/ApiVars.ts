import { Context } from "tmdb-typescript-api"

export interface Config {
  change_keys: string[],
  images: ImageVars
}

export interface ImageVars {
  backdrop_sizes: string[]
  base_url: string
  logo_sizes: string[]
  poster_sizes: string[]
  profiles_sizes: string[]
  secure_base_url: string
  still_sizes: string[]
}

export type ApiVars = {
  apiKey: string,
  baseUrlApi: string
  baseImageUrl: string
  posterSizes: string[]
}

export const apiKey = process.env.TMDB_API_KEY_V3 || ''
export const baseUrlApi = new Context().baseUrl

export const fetchConfigurationVars = (): Promise<Config> => {
  return fetch(`${baseUrlApi}/configuration?api_key=${apiKey}`)
    .then((response: Response) => {
      return response.json()
    })
}


export async function getApiVars(): Promise<ApiVars> {
  const config = await fetchConfigurationVars()

  const images = config.images

  return{
    apiKey,
    baseUrlApi,
    baseImageUrl: images.secure_base_url,
    posterSizes: images.poster_sizes
  }
}


