import { useState } from "react";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import type { Movie } from "../../types/movie";

import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  const handleValue = async (data: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      const newMovies = await fetchMovies(data);
      console.log(newMovies);

      if (newMovies.length === 0) {
        toast.error("No movies found for your request");
        return;
      }
      setMovies(newMovies);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeMovieModal = () => {
    setMovie(null);
  };

  const handleClickCard = (objectMovie: Movie) => {
    setMovie(objectMovie);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleValue} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid onSelect={handleClickCard} movies={movies} />
      )}
      {movie !== null && <MovieModal movie={movie} onClose={closeMovieModal} />}
    </>
  );
}

export default App;
