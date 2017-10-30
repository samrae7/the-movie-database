import { Movie } from "tmdb-typescript-api";

export const mockMovieData: Movie[] = [
  {
    id: 123,
    title: 'Back To the Future',
    overview: 'The adventures of Doc Brown and Marty McFly',
    poster_path: 'foo123.jpg',
    original_title: 'bar',
    adult: false,
    release_date: new Date(),
    genre_ids: [],
    original_language: 'en',
    backdrop_path: '',
    popularity: 7,
    vote_count: 400,
    video: true,
    vote_average: 5
  },
  {
    id: 456,
    title: 'The Empire Strikes Back',
    overview: 'Star Ways part 5',
    poster_path: 'bar456.jpg',
    original_title: 'bar',
    adult: false,
    release_date: new Date(),
    genre_ids: [],
    original_language: 'en',
    backdrop_path: '',
    popularity: 7,
    vote_count: 400,
    video: true,
    vote_average: 5
  }
] 

