import { useEffect, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import api from '../services/api';
import type { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { SearchBar } from '../components/SearchBar';
import { VibeSelector } from '../components/VibeSelector';
import { useDebounce } from '../hooks/useDebounce';

export function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [page, setPage] = useState(1); // Track current page

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Helper function to determine Endpoint and Params
  const getFetchConfig = useCallback(
    (pageNumber: number, search: string, genre: number | null) => {
      let endpoint = '/movie/popular';
      let params: Record<string, any> = { page: pageNumber }; // Always send page

      if (search) {
        endpoint = '/search/movie';
        params = { ...params, query: search };
      } else if (genre) {
        endpoint = '/discover/movie';
        params = { ...params, with_genres: genre };
      }

      return { endpoint, params };
    },
    [],
  );

  // EFFECT 1: Handle Search or Filter Change (RESET list)
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setPage(1); // Reset page to 1
      try {
        const { endpoint, params } = getFetchConfig(
          1,
          debouncedSearch,
          selectedGenreId,
        );
        const response = await api.get(endpoint, { params });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching initial movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [debouncedSearch, selectedGenreId, getFetchConfig]);

  // FUNCTION: Handle "Load More" Click (APPEND to list)
  const handleLoadMore = async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const { endpoint, params } = getFetchConfig(
        nextPage,
        debouncedSearch,
        selectedGenreId,
      );
      const response = await api.get(endpoint, { params });

      // The Magic: Combine old movies + new movies
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setIsLoadingMore(false);
    }
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

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {!searchTerm && (
          <VibeSelector
            selectedGenreId={selectedGenreId}
            onSelect={(id) => {
              setSelectedGenreId(id);
              if (id) setSearchTerm('');
            }}
          />
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>

        {/* Empty State */}
        {!isLoading && movies.length === 0 && (
          <div className="mt-20 text-center text-gray-500">
            <p className="text-xl">No movies found.</p>
          </div>
        )}

        {/* LOAD MORE BUTTON */}
        {!isLoading && movies.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="bg-cine-gray hover:bg-cine-gold flex items-center gap-2 rounded-full px-8 py-3 font-bold text-white transition-all duration-300 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More Movies'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
