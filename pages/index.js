import { useRouter } from 'next/router';
import { getTrendingMovies } from '../utils/helperFunctions';
import MovieCard from '../components/MovieCard';
import styles from '../styles/Home.module.css';

export default function Home({ trendingMovies }) 
{
  const router = useRouter();

  return (
    <div className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>Movie House</h1>
        <button
          onClick={() => router.push('/genres')}
          className={styles.browseButton}
        >
          Browse Genres
        </button>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Trending Movies</h2>
        <div className={styles.movieGrid}>
          {
            trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          }
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {

  //since there is not trending key in movies.json therefore, I am sorting movies by ratings in descending order and selecting the top 4 as trending movies,
  //see the helper function for more details

  const trendingMovies = getTrendingMovies();
  
  if (!trendingMovies || trendingMovies.length === 0) {
    return {
      notFound: true
    };
  }
  
  return {
    props: {
      trendingMovies,
    },
    revalidate: 3600, // Revalidating after every hour so trending movies get refereshed every hour, ma'am didn't specify time in assignment document
  };
}
