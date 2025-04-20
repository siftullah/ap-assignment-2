import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MovieCard from '../../../components/MovieCard';
import styles from '../../../styles/Director.module.css';

export default function DirectorDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;

      try {
        const response = await fetch(`/api/movieDirector?movieId=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch director data');
        }
        const data = await response.json();
        setDirector(data);
      } catch (error) {
        console.error('Error fetching director:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!director) {
    return <div>Director not found</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{director.name}</h1>
      
      <div className={styles.biography}>
        <h2 className={styles.biographyTitle}>Biography</h2>
        <p className={styles.biographyText}>{director.biography}</p>
      </div>

      <div>
        <h2 className={styles.moviesTitle}>Movies Directed</h2>
        <div className={styles.movieGrid}>
          {director.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}