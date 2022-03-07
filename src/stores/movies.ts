import { defineStore } from 'pinia'
import type { Movie } from '@/model/movie'
import { get, query } from '@/util/themoviedb'
import { type Maybe, Nothing, Just, caseOf, fromNullable } from '@/util/maybe'
import type { ApiPopular } from '@/model/api/movie/popular/moviePopular'
import type { ApiMovie } from '@/model/api/movie/movie'
import { useApiConfigStore } from './apiConfig'
import type { ApiDiscoverMovie } from '@/model/api/discover/movie/discoverMovie'

type MoviesStore = {
  mostPopular: Maybe<Movie>,
  popular: Maybe<Movie[]>,
  discoverMap: Map<number, Movie[]>,
}

const popularResource = '/movie/popular'
const discoverResource = '/discover/movie'

const backdropUrl = (backdropPath: string | null) => (imageSize: string) => (imageUrl: string): string => backdropPath ? imageUrl + imageSize + backdropPath : ''

const safeBackdropUrl = (backdropPath: string | null) => (imageSize: string) => (maybeImageUrl: Maybe<string>): string => (
  caseOf<string, string>(maybeImageUrl)({
    Nothing: () => '',
    Just: url => backdropUrl(backdropPath)(imageSize)(url)
  })
)

const convertMovie = (maybeImageUrl: Maybe<string>) => (movie: ApiMovie): Movie => ({
  title: movie.title,
  overview: movie.overview,
  smallBackdropUrl: safeBackdropUrl(movie.backdrop_path)('w780')(maybeImageUrl) || '',
  originalBackdropUrl: safeBackdropUrl(movie.backdrop_path)('original')(maybeImageUrl) || '',
})

export const useMoviesStore = defineStore({
  id: 'movies',
  state: () => ({
    mostPopular: Nothing(),
    popular: Nothing(),
    discoverMap: new Map(),
  } as MoviesStore),
  getters: {
    discover: (state: MoviesStore) => (genreId: number): Maybe<Movie[]> => fromNullable(state.discoverMap.get(genreId)),
  },
  actions: {
    fetchMostPopular() {
      const apiConfigStore = useApiConfigStore()
      get(query(popularResource))
        .then((data: ApiPopular) => new Promise<ApiMovie>((resolve, _) => resolve(data.results[0])))
        .then((movie: ApiMovie) => new Promise<Movie>((resolve, _) => resolve(convertMovie(apiConfigStore.imageUrl)(movie))))
        .then(movie => this.mostPopular = Just(movie)).catch(() => this.mostPopular = Nothing())
    },
    fetchPopular() {
      const apiConfigStore = useApiConfigStore()
      get(query(popularResource))
        .then((data: ApiPopular) => new Promise<ApiMovie[]>((resolve, _) => resolve(data.results.slice(1, 5))))
        .then((movies: ApiMovie[]) => new Promise<Movie[]>((resolve, _) => resolve(movies.map(convertMovie(apiConfigStore.imageUrl)))))
        .then(movies => this.popular = Just(movies)).catch(() => this.popular = Nothing())
    },
    fetchDiscover(genreId: number) {
      const apiConfigStore = useApiConfigStore()
      get(query(discoverResource) + '&with_genres=' + genreId)
        .then((data: ApiDiscoverMovie) => new Promise<ApiMovie[]>((resolve, _) => resolve(data.results)))
        .then((movies: ApiMovie[]) => new Promise<Movie[]>((resolve, _) => resolve(movies.map(convertMovie(apiConfigStore.imageUrl)))))
        .then(movies => this.discoverMap.set(genreId, movies)).catch(() => this.discoverMap.delete(genreId))
    }
  }
})
