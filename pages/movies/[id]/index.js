import Link from 'next/link';
import { getAllMovies, getMovieById, getGenreById, getDirectorById } from '../../../utils/helperFunctions';
import styles from '../../../styles/MovieDetails.module.css';

export default function MovieDetails({ movie, genre, director }) {
  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{movie.title}</h1>
      
      <p className={styles.description}>{movie.description}</p>
      
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>Genre:</span>
          <span>{genre.name}</span>
        </div>
        
        <div className={styles.detailItem}>
          <span className={styles.label}>Director:</span>
          <Link 
            href={`/movies/${movie.id}/director`}
            className={styles.directorLink}
          >
            {director.name}
          </Link>
        </div>
        
        <div className={styles.detailItem}>
          <span className={styles.label}>Release Year:</span>
          <span>{movie.releaseYear}</span>
        </div>
        
        <div className={styles.detailItem}>
          <span className={styles.label}>Rating:</span>
          <span>{movie.rating}</span>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const movies = getAllMovies();
  
  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    // not using true since it's possible that even aftr runtime demand, the data for movie is not found, so I have to set notFound key
    // if I use true for fallback, then I will not be able to use notFound key
    fallback: 'blocking', 
  };
}

export async function getStaticProps({ params }) {
  const movie = getMovieById(params.id);
  
  if (!movie) {
    return {
      notFound: true,
    };
  }

  const genre = getGenreById(movie.genreId);
  const director = getDirectorById(movie.directorId);

  return {
    props: {
      movie,
      genre,
      director,
    },
    revalidate: 3600, //I was confused since it was not written clearly in document that wether to use ISR or not for this page, so I used it just to be safe
                      //also since we are using ISR for /movies, therefore there is the assumption that movies details can be updated, thus ISR also seems valid 
                      //for movie details page
  };
} 