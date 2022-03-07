import type { ApiGenre } from '@/model/api/genre/genre'
import type { ApiGenreMovieList } from '@/model/api/genre/movie/list/genreMovieList'
import type { Genre } from '@/model/genre'
import { chain, fromNullable, Just, Nothing, type Maybe } from '@/util/maybe'
import { get, query } from '@/util/themoviedb'
import { defineStore } from 'pinia'

type GenreStore = {
  genres: Genre[],
  displayed: Maybe<number>,
}

const genreResource = '/genre/movie/list'

const convertGenre = (genre: ApiGenre): Genre => genre

const genreFromId = (genres: Genre[]) => (genreId: number): Maybe<Genre> => fromNullable(genres.find(genre => genreId === genre.id))

export const useGenresStore = defineStore({
  id: 'genres',
  state: () => ({
    genres: [],
    displayed: Nothing(),
  } as GenreStore),
  getters: {
    displayedGenre: (state: GenreStore): Maybe<Genre> => chain(genreFromId(state.genres))(state.displayed)
  },
  actions: {
    fetchGenres() {
      get(query(genreResource))
        .then((data: ApiGenreMovieList) => new Promise<ApiGenre[]>((resolve, _) => resolve(data.genres)))
        .then((genres: ApiGenre[]) => new Promise<Genre[]>((resolve, _) => resolve(genres.map(convertGenre))))
        .then(genres => this.genres = genres).catch(() => this.genres = [])
    },
    display(genreId: number) {
      if (this.genres.findIndex(genre => genreId === genre.id) === -1) {
        this.displayed = Nothing()
      } else {
        this.displayed = Just(genreId)
      }
    }
  }
})
