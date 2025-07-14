import axios from "axios";
import type { Movie } from "../types/movie";
interface MoviesHttpResponse {
  results: Movie[];
}

const myToken = import.meta.env.VITE_TMDB_TOKEN;

export const fetchCharacter = async (movieTitle: string) => {
  const response = await axios.get<MoviesHttpResponse>(
    `https://api.themoviedb.org/3/search/movie?query=${movieTitle}`,
    {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data.results;
};
