import { defineStore } from 'pinia'
import type { Movie } from '@/model/movie'
import { get, query } from '@/util/themoviedb'
import { type Maybe, Nothing, Just, caseOf, fromNullable, orDefault, maybeMap } from '@/util/maybe'
import type { ApiPopular } from '@/model/api/movie/popular/moviePopular'
import type { ApiMovie } from '@/model/api/movie/movie'
import { useApiConfigStore } from './apiConfig'
import type { ApiDiscoverMovie } from '@/model/api/discover/movie/discoverMovie'

type MoviesStore = {
  movies: Map<number, Movie>,
  popularIds: Maybe<number[]>,
  favouriteIds: Set<number>,
  discoverMap: {
    [key: number]: number[]
  },
}

/*
 * Utility functions
 */
const backdropUrl = (backdropPath: string | null) => (imageSize: string) => (imageUrl: string): string => backdropPath ? imageUrl + imageSize + backdropPath : ''
const safeBackdropUrl = (backdropPath: string | null) => (imageSize: string) => (maybeImageUrl: Maybe<string>): string => (
  caseOf(maybeImageUrl)({
    Nothing: () => '',
    Just: url => backdropUrl(backdropPath)(imageSize)(url)
  })
)
const convertMovie = (maybeImageUrl: Maybe<string>) => (movie: ApiMovie): Movie => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  smallBackdropUrl: safeBackdropUrl(movie.backdrop_path)('w780')(maybeImageUrl) || '',
  originalBackdropUrl: safeBackdropUrl(movie.backdrop_path)('original')(maybeImageUrl) || '',
})
const insertMovies = (movieMap: Map<number, Movie>) => (movies: Movie[]): void => movies.forEach(movie => movieMap.set(movie.id, movie))

/*
 * Getters
 */
const movieFromId = (state: MoviesStore) => (movieId: number): Maybe<Movie> => fromNullable(state.movies.get(movieId))
const moviesFromIds = (state: MoviesStore) => (movieIds: number[]): Movie[] => (
  movieIds
    .map(movieFromId(state))
    .reduce((prev: Movie[], curr: Maybe<Movie>): Movie[] => (
      caseOf(curr)({
        Nothing: () => prev,
        Just: value => [...prev, value],
      })
    ), [])
)
const popularMovies = (state: MoviesStore): Maybe<Movie[]> => maybeMap(moviesFromIds(state))(state.popularIds)
const mostPopular = (state: MoviesStore): Maybe<Movie> => maybeMap(<T>(arr: T[]) => arr[0])(popularMovies(state))
const idsFromGenre = (state: MoviesStore) => (genreId: number): Maybe<number[]> => fromNullable(state.discoverMap[genreId])
const discover = (state: MoviesStore) => (genreId: number): Maybe<Movie[]> => maybeMap(moviesFromIds(state))(idsFromGenre(state)(genreId))
const favourites = (state: MoviesStore): Maybe<Movie[]> => Just(moviesFromIds(state)(Array.from(state.favouriteIds)))

/*
 * Store definition
 */
export const useMoviesStore = defineStore({
  id: 'movies',
  state: () => ({
    movies: new Map(),
    popularIds: Nothing(),
    favouriteIds: new Set(),
    discoverMap: {},
  } as MoviesStore),
  getters: {
    movieFromId,
    moviesFromIds,
    popularMovies,
    mostPopular,
    discover,
    favourites,
  },
  actions: {
    fetchPopular() {
      const apiConfigStore = useApiConfigStore()
      get(query('/movie/popular'))
        .then((data: ApiPopular) => new Promise<ApiMovie[]>((resolve, _) => resolve(data.results.slice(0, 5))))
        .then((movies: ApiMovie[]) => new Promise<Movie[]>((resolve, _) => resolve(movies.map(convertMovie(apiConfigStore.imageUrl)))))
        .then(movies => {
          insertMovies(this.movies)(movies)
          this.popularIds = Just(movies.map(movie => movie.id))
        }).catch(() => this.popularIds = Nothing())
    },
    fetchDiscover(genreId: number) {
      const apiConfigStore = useApiConfigStore()
      get(query('/discover/movie') + '&with_genres=' + genreId)
        .then((data: ApiDiscoverMovie) => new Promise<ApiMovie[]>((resolve, _) => resolve(data.results)))
        .then((movies: ApiMovie[]) => new Promise<Movie[]>((resolve, _) => resolve(movies.map(convertMovie(apiConfigStore.imageUrl)))))
        .then(movies => {
          insertMovies(this.movies)(movies)
          this.discoverMap[genreId] = movies.map(movie => movie.id)
        }).catch(() => delete this.discoverMap[genreId])
    },
    addFavourite(movieId: number) {
      this.favouriteIds.add(movieId)
    },
    removeFavourite(movieId: number) {
      this.favouriteIds.delete(movieId)
    }
  }
})
