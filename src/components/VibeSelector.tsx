import { VIBES, type Vibe } from '../utils/vibes';

interface VibeSelectorProps {
  selectedVibeId: string | null;
  onSelect: (vibe: Vibe | null) => void;
}

export function VibeSelector({ selectedVibeId, onSelect }: VibeSelectorProps) {
  return (
    <div className="group relative w-full">
      {/* Scrollable Container */}
      <div className="scrollbar-hide w-full overflow-x-auto pt-2 pb-4">
        <div className="inline-flex items-center gap-3 px-4">
          {/* Reset Button */}
          <button
            onClick={() => onSelect(null)}
            className={`shrink-0 rounded-full border px-6 py-2 text-sm font-bold shadow-lg transition-all duration-300 ${
              selectedVibeId === null
                ? 'text-cine-dark scale-105 border-white bg-white shadow-white/20'
                : 'bg-cine-gray/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
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
                className={`group/btn relative shrink-0 overflow-hidden rounded-full border px-6 py-2 text-sm font-bold shadow-lg transition-all duration-300 ${
                  isSelected
                    ? 'scale-105 border-transparent text-white ring-1 ring-white/30'
                    : 'bg-cine-gray/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                }`}
              >
                <div
                  className={`absolute inset-0 opacity-20 transition-opacity duration-300 ${vibe.color} ${isSelected ? 'opacity-80' : 'group-btn-hover:opacity-40'}`}
                />

                <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                  {vibe.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* LEFT SHADOW GRADIENT */}
      <div className="from-cine-dark via-cine-dark/60 pointer-events-none absolute top-0 left-0 h-full w-12 bg-linear-to-r to-transparent" />

      {/* RIGHT SHADOW GRADIENT */}
      <div className="from-cine-dark via-cine-dark/60 pointer-events-none absolute top-0 right-0 h-full w-24 bg-linear-to-l to-transparent" />
    </div>
  );
}
