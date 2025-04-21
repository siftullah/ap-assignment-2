import { useRouter } from 'next/router';
import useSWR from 'swr';
import MovieCard from '../../components/MovieCard';
import styles from '../../styles/Director.module.css';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function DirectorDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data: director, error } = useSWR(id ? `/api/directors?id=${id}` : null, fetcher);

  if (error) return <div className={styles.error}>Failed to load director</div>;
  if (!director) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{director.name}</h1>
      <div className={styles.biography}>
        <h2 className={styles.biographyTitle}>Biography</h2>
        <p className={styles.biographyText}>{director.biography}</p>
      </div>
      <div>
        <h2 className={styles.moviesTitle}>Movies by {director.name}</h2>
        <div className={styles.movieGrid}>
          {director.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
