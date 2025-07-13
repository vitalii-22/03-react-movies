import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";

import { fetchCharacter } from "../services/movieService";
import type { Movie } from "../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleValue = async (data: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const newMovies = await fetchCharacter(data);

      if (newMovies.length === 0) {
        toast.error("No movies found for your request");

        return;
      }

      console.log(data);
      console.log(newMovies);
      setMovies(newMovies);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />;
      <SearchBar onSubmit={handleValue} />;{isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} />}
    </>
  );
}

export default App;
