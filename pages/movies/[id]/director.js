import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MovieCard from '../../../components/MovieCard';
import styles from '../../../styles/Director.module.css';
import { getAllMovies, getMovieById, getDirectorById, getMoviesByDirector } from '../../../utils/helperFunctions';

export default function DirectorDetails({ director, movie }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{movie.title}</h1>
      <h2 className={styles.subtitle}>Directed by {director.name}</h2>
      
      <div className={styles.biography}>
        <h2 className={styles.biographyTitle}>Director Biography</h2>
        <p className={styles.biographyText}>{director.biography}</p>
      </div>

      <div>
        <h2 className={styles.moviesTitle}>Other Movies by {director.name}</h2>
        <div className={styles.movieGrid}>
          {
            // check is > 1 and not 0 , since this movie will always be present
            director.movies.length > 1 ? (director.movies.map((director_movie) => (director_movie.id != movie.id &&
              <MovieCard key={director_movie.id} movie={director_movie} />
           ))) 
            : <p>No other movies found</p> 
          }
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
    // not using true since it's possible that even after runtime demand, the data for director is not found, so I have to set notFound key
    // if I use true for fallback, then I will not be able to use notFound key
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  
  try {
    const movie = getMovieById(id);
    
    if (!movie) {
      return { notFound: true };
    }

    const director = getDirectorById(movie.directorId);
    
    if (!director) {
      return { notFound: true };
    }

    const directorMovies = getMoviesByDirector(director.id);

    return {
      props: {
        movie,
        director: {
          ...director,
          movies: directorMovies
        }
      },
      revalidate: 3600, // Since we are using ISR for movies and movies details page, therefore it seems valid that movie director can be updated , so used ISR for this also
    };
  } catch (error) {
    console.error('Error fetching director data:', error);
    return { notFound: true };
  }
}