import { VIBES, type Vibe } from '../utils/vibes';

interface VibeSelectorProps {
  selectedVibeId: string | null;
  onSelect: (vibe: Vibe | null) => void;
}

export function VibeSelector({ selectedVibeId, onSelect }: VibeSelectorProps) {
  return (
    <div className="scrollbar-hide w-full overflow-x-auto pb-6">
      <div className="flex min-w-max justify-start gap-4 px-2 md:justify-center">
        {/* Reset Button */}
        <button
          onClick={() => onSelect(null)}
          className={`rounded-full border px-6 py-2 text-sm font-bold transition-all duration-300 ${
            selectedVibeId === null
              ? 'text-cine-dark scale-105 border-white bg-white'
              : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-500'
          }`}
        >
          All Movies
        </button>

        {/* Vibe Buttons */}
        {VIBES.map((vibe) => {
          const isSelected = selectedVibeId === vibe.id;

          return (
            <button
              key={vibe.id}
              onClick={() => onSelect(isSelected ? null : vibe)}
              className={`group relative overflow-hidden rounded-full border px-6 py-2 text-sm font-bold transition-all duration-300 ${
                isSelected
                  ? 'scale-105 border-transparent text-white ring-2 ring-white/20'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-gray-500 hover:text-white'
              }`}
            >
              {/* Dynamic Background with Glow Effect */}
              <div
                className={`absolute inset-0 opacity-20 transition-opacity duration-300 ${vibe.color} ${isSelected ? 'opacity-100' : 'group-hover:opacity-40'}`}
              />

              <span className="relative z-10 flex items-center gap-2">
                {vibe.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
