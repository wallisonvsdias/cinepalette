import { useEffect, useState } from 'react';
import api from './services/api';
import type { Movie } from './types/movie';
import { MovieCard } from './components/MovieCard';
import { SearchBar } from './components/SearchBar';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Wait 500ms after user stops typing to trigger the effect
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Logic: If there is a search term, search. If not, show popular.
        const endpoint = debouncedSearch 
          ? '/search/movie' 
          : '/movie/popular';
          
        const params = debouncedSearch 
          ? { query: debouncedSearch } 
          : {};

        const response = await api.get(endpoint, { params });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [debouncedSearch]); // This effect runs every time the debounced value changes

  return (
    <div className="min-h-screen bg-cine-dark px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-md md:text-5xl mb-2">
            Cine<span className="text-cine-gold">Palette</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Discover movies through aesthetics and vibes.
          </p>
        </header>

        {/* Search Component */}
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        
        {/* Results Grid */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">No movies found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;