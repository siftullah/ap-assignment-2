import useSWR from 'swr';
import MovieCard from '../components/MovieCard';
import styles from '../styles/Directors.module.css';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Directors() {
  const { data: directors, error } = useSWR('/api/directors', fetcher);

  if (error) return <div className={styles.error}>Failed to load directors</div>;
  if (!directors) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Movie Directors</h1>
      
      <div className={styles.directorList}>
        {directors.map((director) => (
          <div key={director.id} className={styles.directorCard}>
            <h2 className={styles.directorName}>{director.name}</h2>
            <p className={styles.biography}>{director.biography}</p>
            
            <h3 className={styles.moviesTitle}>Movies Directed</h3>
            <div className={styles.movieGrid}>
              {director.movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 