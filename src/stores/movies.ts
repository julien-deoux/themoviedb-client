import { defineStore } from 'pinia'
import { getMostPopular, getPopular } from '@/util/themoviedb'
import type { Movie } from '@/model/movie'

type MoviesStore = {
  mostPopular: null | Movie,
  popular: null | Movie[],
}

export const useMoviesStore = defineStore({
  id: 'movies',
  state: () => ({
    mostPopular: null,
    popular: null,
  } as MoviesStore),
  actions: {
    fetchMostPopular() {
      getMostPopular().then(movie => this.mostPopular = movie)
    },
    fetchPopular() {
      getPopular().then(movies => this.popular = movies)
    }
  }
})
