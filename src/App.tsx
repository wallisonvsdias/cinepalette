import { useEffect, useState } from 'react';
import api from './services/api';
import type { Movie } from './types/movie';
import { MovieCard } from './components/MovieCard';
import { SearchBar } from './components/SearchBar';
import { VibeSelector } from './components/VibeSelector'; // Import logic
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let endpoint = '/movie/popular';
        let params: Record<string, any> = {};

        // Priority 1: Search (Overrides filters)
        if (debouncedSearch) {
          endpoint = '/search/movie';
          params = { query: debouncedSearch };
        }
        // Priority 2: Vibe Filter (Discovery)
        else if (selectedGenreId) {
          endpoint = '/discover/movie';
          params = { with_genres: selectedGenreId };
        }

        const response = await api.get(endpoint, { params });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [debouncedSearch, selectedGenreId]); // Re-run when these change

  // Handler to clear search when selecting a vibe (optional UX improvement)
  const handleVibeSelect = (id: number | null) => {
    setSelectedGenreId(id);
    if (id) setSearchTerm(''); // Clear search if a vibe is clicked
  };

  return (
    <div className="bg-cine-dark min-h-screen px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-white drop-shadow-md md:text-5xl">
            Cine<span className="text-cine-gold">Palette</span>
          </h1>
          <p className="text-lg text-gray-400">
            Discover movies through aesthetics and vibes.
          </p>
        </header>

        {/* Search */}
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {/* Vibe Filter (Only show if not searching to keep UI clean) */}
        {!searchTerm && (
          <VibeSelector
            selectedGenreId={selectedGenreId}
            onSelect={handleVibeSelect}
          />
        )}

        {/* Results Grid */}
        {movies.length > 0 ? (
          <div className="animate-fade-in grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="mt-20 text-center text-gray-500">
            <p className="text-xl">No movies found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
