import Link from 'next/link';
import styles from '../styles/MovieCard.module.css';

export default function MovieCard({ movie }) {
  return (
    <div className={styles.card}>
      <Link className={styles.Link} href={`/movies/${movie.id}`}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.description}>{movie.description}</p>
        <div className={styles.meta}>
          <span className={styles.year}>{movie.releaseYear}</span>
          <span className={styles.rating}>Rating: {movie.rating}</span>
        </div>
      </Link>
    </div>
  );
} 