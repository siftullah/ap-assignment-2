import Link from 'next/link';
import { getAllGenres, getAllMovies } from '../../utils/helperFunctions';
import styles from '../../styles/Genres.module.css';

export default function Genres({ genres, movies }) {
  const moviesByGenre = genres.map(genre => ({
    ...genre,
    movieCount: movies.filter(movie => movie.genreId === genre.id).length
  }));

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Movie Genres</h1>
      
      <div className={styles.genreGrid}>
        {moviesByGenre.map((genre) => (
          <Link 
            key={genre.id}
            href={`/genres/${genre.id}`}
            className={styles.genreCard}
          >
            <h2 className={styles.genreName}>{genre.name}</h2>
            <p className={styles.movieCount}>{genre.movieCount} movies</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const genres = getAllGenres();
  const movies = getAllMovies();

  return {
    props: {
      genres,
      movies,
    },
  };
} 