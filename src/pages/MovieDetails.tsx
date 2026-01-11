import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Star } from 'lucide-react';
import { FastAverageColor } from 'fast-average-color';
import api from '../services/api';
import type { MovieDetails } from '../types/movie';
import { getImageUrl } from '../utils/imageHelper';

export function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [dominantColor, setDominantColor] = useState('#0d0d0d'); // Default dark

  // Ref for the color extractor
  const fac = useMemo(() => new FastAverageColor(), []);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await api.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to load movie details', error);
      }
    }
    fetchDetails();
  }, [id]);

  // Function to extract color once image loads
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    try {
      const color = fac.getColor(e.currentTarget);
      setDominantColor(color.hex);
    } catch (error) {
      console.warn('Could not extract color, using default.', error);
      setDominantColor('#0d0d0d'); // Fallback to black
    }
  };

  if (!movie)
    return <div className="mt-20 text-center text-white">Loading...</div>;

  return (
    <div
      className="min-h-screen text-white transition-colors duration-700"
      style={{
        background: `linear-gradient(to bottom, ${dominantColor} 0%, #0d0d0d 100%)`,
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-colors hover:bg-black/50"
      >
        <ArrowLeft className="h-6 w-6 text-white" />
      </button>

      {/* Hero Section */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 pt-20 pb-10 md:flex-row md:items-start">
        {/* Poster Image (Source of Color) */}
        <div className="relative w-64 shrink-0 rotate-3 transform overflow-hidden rounded-xl shadow-2xl shadow-black/50 transition-transform duration-500 hover:rotate-0 md:w-80">
          <img
            src={`${getImageUrl(movie.poster_path)}?param=cors`}
            alt={movie.title}
            crossOrigin="anonymous" // CRITICAL for color extraction
            onLoad={handleImageLoad}
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="mb-2 text-4xl font-extrabold drop-shadow-lg md:text-6xl">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-xl font-light text-white/80 italic">
                "{movie.tagline}"
              </p>
            )}
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap gap-4 text-sm font-medium text-white/90">
            <div className="flex items-center gap-1 rounded-full bg-black/20 px-3 py-1 backdrop-blur-md">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-black/20 px-3 py-1 backdrop-blur-md">
              <Clock className="h-4 w-4" />
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-black/20 px-3 py-1 backdrop-blur-md">
              <Calendar className="h-4 w-4" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="rounded-full border border-white/30 px-3 py-1 text-xs"
              >
                {g.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <div>
            <h3 className="mb-2 text-xl font-bold">Synopsis</h3>
            <p className="max-w-2xl text-lg leading-relaxed text-white/80">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
