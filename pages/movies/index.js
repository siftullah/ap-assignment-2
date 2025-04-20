import { useState } from 'react';
import { getAllMovies, getAllGenres } from '../../utils/helperFunctions';
import MovieCard from '../../components/MovieCard';
import styles from '../../styles/Movies.module.css';

export default function Movies({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredMovies = selectedGenre ? movies.filter(movie => movie.genreId === selectedGenre) : movies;

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>All Movies</h1>
      
      <div className={styles.filterContainer}>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className={styles.genreSelect}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.movieGrid}>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const movies = getAllMovies();
  const genres = getAllGenres();

  if (!movies || !genres || movies.length === 0 || genres.length === 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      movies,
      genres,
    },
    revalidate: 3600,
  };
}