import type { Movie } from "@/model/movie"

const apiUrl = 'https://api.themoviedb.org/3'
const apiKey = '462ee44dc8a26b200dbc1ef923305ae2'

const popularResource = '/movie/popular'
const configurationResource = '/configuration'

const popularQuery = apiUrl + popularResource + '?language=fr-FR&api_key=' + apiKey
const configurationQuery = apiUrl + configurationResource + '?api_key=' + apiKey

const convertMovie = (movie: any) => ({
  title: movie.title,
  overview: movie.overview,
  backdropPath: movie.backdrop_path,
})

export const getMostPopular = () => (
  fetch(popularQuery)
    .then(res => res.json())
    .then(data => new Promise<object>((resolve, _) => resolve(data.results[0])))
    .then(movie => new Promise<Movie>((resolve, _) => resolve(convertMovie(movie))))
)

export const getPopular = () => (
  fetch(popularQuery)
    .then(res => res.json())
    .then(data => new Promise<object[]>((resolve, _) => resolve(data.results.slice(1, 5))))
    .then(movies => new Promise<Movie[]>((resolve, _) => resolve(movies.map(convertMovie))))
)

export const getImageUrl = () => (
  fetch(configurationQuery)
    .then(res => res.json())
    .then(data => new Promise<string>((resolve, _) => resolve(data.images.secure_base_url)))
)
