import { useEffect, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import api from '../services/api';
import type { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { SearchBar } from '../components/SearchBar';
import { VibeSelector } from '../components/VibeSelector';
import type { Vibe } from '../utils/vibes';
import { useDebounce } from '../hooks/useDebounce';
import { Footer } from '../components/Footer';

export function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedVibe, setSelectedVibe] = useState<Vibe | null>(null);

  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const getFetchConfig = useCallback(
    (pageNumber: number, search: string, vibe: Vibe | null) => {
      let endpoint = '/movie/popular';
      let params: Record<string, any> = {
        page: pageNumber,
        language: 'en-US',
        include_adult: false,
      };

      if (search) {
        endpoint = '/search/movie';
        params = { ...params, query: search };
      } else if (vibe) {
        endpoint = '/discover/movie';
        params = { ...params, ...vibe.params };
      }

      return { endpoint, params };
    },
    [],
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setPage(1);
      try {
        const { endpoint, params } = getFetchConfig(
          1,
          debouncedSearch,
          selectedVibe,
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
  }, [debouncedSearch, selectedVibe, getFetchConfig]);

  const handleLoadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const { endpoint, params } = getFetchConfig(
        nextPage,
        debouncedSearch,
        selectedVibe,
      );
      const response = await api.get(endpoint, { params });
      setMovies((prev) => [...prev, ...response.data.results]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="bg-cine-dark min-h-screen px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="mb-2 flex items-center justify-center gap-3 text-4xl font-extrabold text-white drop-shadow-md md:text-5xl">
            <img
              src="/favicon.jpg"
              alt="CinePalette Logo"
              className="h-10 w-10 rounded-md object-cover md:h-12 md:w-12"
            />
            <span>
              Cine<span className="text-cine-gold">Palette</span>
            </span>
          </h1>
          <p className="text-lg text-gray-400">
            Discover movies through aesthetics and vibes.
          </p>
        </header>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {!searchTerm && (
          <VibeSelector
            selectedVibeId={selectedVibe?.id || null}
            onSelect={(vibe) => {
              setSelectedVibe(vibe);
              // Opcional: Limpar busca se clicar numa vibe, embora o IF acima já esconda
              if (vibe) setSearchTerm('');
            }}
          />
        )}

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>

        {!isLoading && movies.length === 0 && (
          <div className="mt-20 text-center text-gray-500">
            <p className="text-xl">No movies found.</p>
          </div>
        )}

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
        <Footer />
      </div>
    </div>
  );
}
