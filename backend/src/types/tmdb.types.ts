export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  adult: boolean;
}

export interface MovieDetails extends Movie {
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TmdbGenreMap {
  [key: number]: string;
}

export const GenreMap: TmdbGenreMap = {
  28: 'action',
  12: 'adventure',
  16: 'animation',
  35: 'comedy',
  80: 'crime',
  99: 'documentary',
  18: 'drama',
  10751: 'family',
  14: 'fantasy',
  36: 'history',
  27: 'horror',
  10402: 'music',
  9648: 'mystery',
  10749: 'romance',
  878: 'science_fiction',
  10770: 'tv_movie',
  53: 'thriller',
  10752: 'war',
  37: 'western',
};

export const GenreIdMap: { [key: string]: number } = Object.entries(
  GenreMap
).reduce((acc, [id, name]) => ({ ...acc, [name]: parseInt(id) }), {});
