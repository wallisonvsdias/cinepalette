import { VIBES } from '../utils/vibes';

interface VibeSelectorProps {
  selectedGenreId: number | null;
  onSelect: (genreId: number | null) => void;
}

export function VibeSelector({ selectedGenreId, onSelect }: VibeSelectorProps) {
  return (
    <div className="scrollbar-hide w-full overflow-x-auto pb-6">
      <div className="flex min-w-max justify-start gap-4 px-2 md:justify-center">
        {/* 'All' Button to clear filters */}
        <button
          onClick={() => onSelect(null)}
          className={`rounded-full border px-6 py-2 text-sm font-bold transition-all duration-300 ${
            selectedGenreId === null
              ? 'text-cine-dark border-white bg-white'
              : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-500'
          }`}
        >
          All Vibes
        </button>

        {/* Dynamic Vibe Buttons */}
        {VIBES.map((vibe) => {
          const isSelected = selectedGenreId === vibe.genreId;

          return (
            <button
              key={vibe.id}
              onClick={() => onSelect(isSelected ? null : vibe.genreId)}
              className={`group relative overflow-hidden rounded-full border px-6 py-2 text-sm font-bold transition-all duration-300 ${
                isSelected
                  ? 'border-transparent text-white'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-500 hover:text-white'
              }`}
            >
              {/* Background Color Animation */}
              <div
                className={`absolute inset-0 opacity-20 transition-opacity duration-300 ${vibe.color} ${isSelected ? 'opacity-100' : 'group-hover:opacity-40'}`}
              />

              {/* Text acts as a layer above the background */}
              <span className="relative z-10">{vibe.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
