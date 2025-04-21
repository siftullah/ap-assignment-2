import { getAllDirectors, getMoviesByDirector, getDirectorById } from '../../utils/helperFunctions';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  if (id) {
    const director = getDirectorById(id);
    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }
    const movies = getMoviesByDirector(director.id);
    return res.status(200).json({ ...director, movies });
  }

  const directors = getAllDirectors();
  const directorsWithMovies = directors.map(director => ({
    ...director,
    movies_count: getMoviesByDirector(director.id).length
  }));

  res.status(200).json(directorsWithMovies);
}
