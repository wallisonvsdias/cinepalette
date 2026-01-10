import { useEffect, useState } from 'react';
import api from './services/api';
import type { Movie } from './types/movie';
import { MovieCard } from './components/MovieCard'; // Importe o componente

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movie/popular');
        setMovies(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-cine-dark min-h-screen px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-md md:text-5xl">
            Cine<span className="text-cine-gold">Palette</span>
          </h1>
          <p className="mt-2 text-gray-400">
            Descubra filmes através das cores e emoções.
          </p>
        </header>

        {/* Grid Responsivo: 2 colunas no celular, até 5 em telas grandes */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
