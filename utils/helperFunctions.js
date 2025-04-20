import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'movies.json');

export function getAllMovies() {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.movies;
}

export function getAllGenres() {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.genres;
}

export function getAllDirectors() {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.directors;
}

export function getMovieById(id) {
  const movies = getAllMovies();
  return movies.find(movie => movie.id === id);
}

export function getGenreById(id) {
  const genres = getAllGenres();
  return genres.find(genre => genre.id === id);
}

export function getDirectorById(id) {
  const directors = getAllDirectors();
  return directors.find(director => director.id === id);
}

export function getMoviesByGenre(genreId) {
  const movies = getAllMovies();
  return movies.filter(movie => movie.genreId === genreId);
}

export function getMoviesByDirector(directorId) {
  const movies = getAllMovies();
  return movies.filter(movie => movie.directorId === directorId);
}

export function getTrendingMovies() {
  const movies = getAllMovies();
  return movies.sort((a, b) => b.rating - a.rating).slice(0, 4);
} 