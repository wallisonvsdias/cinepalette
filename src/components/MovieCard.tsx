import { Star } from 'lucide-react';
import type { Movie } from '../types/movie';
import { getImageUrl } from '../utils/imageHelper';
import { Link } from 'react-router-dom'; // Import Link

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="group bg-cine-gray hover:shadow-cine-gold/20 relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="aspect-2/3 w-full overflow-hidden">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute right-0 bottom-0 left-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="line-clamp-2 text-lg font-bold text-white">
            {movie.title}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-300">
              {new Date(movie.release_date).getFullYear()}
            </span>

            <div className="text-cine-gold flex items-center gap-1">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-bold">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
