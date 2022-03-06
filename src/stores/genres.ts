import type { ApiGenre } from '@/model/api/genre/genre'
import type { ApiGenreMovieList } from '@/model/api/genre/movie/list/genreMovieList'
import type { Genre } from '@/model/genre'
import { get, query } from '@/util/themoviedb'
import { defineStore } from 'pinia'

type GenreStore = {
  genres: Genre[]
}

const genreResource = '/genre/movie/list'

const convertGenre = (genre: ApiGenre): Genre => genre

export const useGenresStore = defineStore({
  id: 'genres',
  state: () => ({
    genres: []
  } as GenreStore),
  actions: {
    fetchGenres() {
      get(query(genreResource))
        .then((data: ApiGenreMovieList) => new Promise<ApiGenre[]>((resolve, _) => resolve(data.genres)))
        .then((genres: ApiGenre[]) => new Promise<Genre[]>((resolve, _) => resolve(genres.map(convertGenre))))
        .then(genres => this.genres = genres).catch(() => this.genres = [])
    }
  }
})
