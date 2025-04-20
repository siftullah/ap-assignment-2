import { getGenreById, getMoviesByGenre } from '../../utils/helperFunctions';
import MovieCard from '../../components/MovieCard';
import styles from '../../styles/GenreDetail.module.css';

export default function GenreDetail({ genre, movies }) {
  if (!genre) {
    return <div>Genre not found</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{genre.name}</h1>
      
      <p className={styles.description}>
        Browse all {movies.length} movies in the {genre.name} genre.
      </p>

      <h2 className={styles.moviesTitle}>Movies in this Genre</h2>
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const genre = getGenreById(params.id);
  
  if (!genre) {
    return {
      notFound: true,
    };
  }

  const movies = getMoviesByGenre(params.id);

  return {
    props: {
      genre,
      movies,
    },
  };
} 