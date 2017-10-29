import { getApiVars } from "./ApiVars";

// TODO rename PosterService ?
export class PosterHelper {
  baseImageUrl: string
  posterSize: string

  constructor() {
    // TODO decide whether to put all fetching in here OR to rewrite getApiVars as a service
    // or neither
    // also look up how make all services singletons
    getApiVars()
      .then((vars) => {
        this.baseImageUrl = vars.baseImageUrl
        this.posterSize = vars.posterSizes[2]
      })
  }

  // TODO rename getSrc ?
  getPosterUrl(posterPath: string) {
    return `${this.baseImageUrl}${this.posterSize}${posterPath}`
  }
}