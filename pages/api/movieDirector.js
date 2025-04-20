import { getMovieById, getDirectorById, getMoviesByDirector } from '../../utils/helperFunctions';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { movieId } = req.query;

  if (!movieId) {
    return res.status(400).json({ message: 'Movie ID is required' });
  }

  const movie = getMovieById(movieId);
  
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const director = getDirectorById(movie.directorId);
  
  if (!director) {
    return res.status(404).json({ message: 'Director not found' });
  }

  const directorMovies = getMoviesByDirector(director.id);

  res.status(200).json({
    ...director,
    movies: directorMovies
  });
}