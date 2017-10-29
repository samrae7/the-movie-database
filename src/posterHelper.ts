import { getApiVars } from "./ApiVars";

export class PosterHelper {
  baseImageUrl: string
  posterSize: string

  constructor() {
    getApiVars()
      .then((vars) => {
        this.baseImageUrl = vars.baseImageUrl
        this.posterSize = vars.posterSizes[2]
      })
  }

  getPosterUrl(posterPath: string) {
    return `${this.baseImageUrl}${this.posterSize}${posterPath}`
  }
}