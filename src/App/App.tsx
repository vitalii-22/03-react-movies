import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";

import { fetchCharacter } from "../services/movieService";
import type { Movie } from "../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMovieModalOpen, setIsModalOpen] = useState(false);
  const [movie, setMovie] = useState<Movie | undefined>(undefined);

  const handleValue = async (data: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      const newMovies = await fetchCharacter(data);
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

  const openMovieModal = () => setIsModalOpen(true);

  const closeMovieModal = () => {
    setIsModalOpen(false);
    setMovie(undefined);
  };

  const handleClickCard = (objectMovie: Movie) => {
    setMovie(objectMovie);

    openMovieModal();
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
      {isMovieModalOpen && movie !== undefined && (
        <MovieModal movie={movie} onClose={closeMovieModal} />
      )}
    </>
  );
}

export default App;
