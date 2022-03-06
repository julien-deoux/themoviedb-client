import type { Movie } from "@/model/movie";

export const buildBackdropUrl = (imageUrl: string, imageSize: string, movie: null | Movie) => imageUrl + imageSize + movie?.backdropPath
