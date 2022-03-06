import type { ApiMovie } from './movie'

export type ApiMovieList = {
  page: number,
  total_results: number,
  total_pages: number,
  results: ApiMovie[],
}
