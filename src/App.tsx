import { useEffect, useState } from 'react';
import api from './services/api';
import type { Movie } from './types/movie';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movie/popular');
        setMovies(response.data.results);
        console.log('Dados recebidos:', response.data.results);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-cine-dark flex min-h-screen flex-col items-center p-10 text-white">
      <h1 className="text-cine-gold mb-8 text-4xl font-bold">
        CinePalette
      </h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {movies.map((movie) => (
          <li key={movie.id} className="bg-cine-gray rounded-lg p-4">
            <strong>{movie.title}</strong>
            <p className="text-sm text-gray-400">User score: {movie.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
