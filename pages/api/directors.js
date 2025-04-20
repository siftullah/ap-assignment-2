import { getAllDirectors, getMoviesByDirector } from '../../utils/helperFunctions';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const directors = getAllDirectors();
  const directorsWithMovies = directors.map(director => ({
    ...director,
    movies: getMoviesByDirector(director.id)
  }));

  res.status(200).json(directorsWithMovies);
} 