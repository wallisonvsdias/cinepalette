import { VIBES, type Vibe } from '../utils/vibes';

interface VibeSelectorProps {
  selectedVibeId: string | null;
  onSelect: (vibe: Vibe | null) => void;
}

export function VibeSelector({ selectedVibeId, onSelect }: VibeSelectorProps) {
  return (
    <div className="scrollbar-hide w-full overflow-x-auto pt-2 pb-4">
      {/* STRATEGY: We remove container padding (px-4/pl-4) completely.
         Instead, we add margins directly to the items. Browsers respect this.
      */}
      <div className="flex min-w-max gap-3">
        {/* First Button: Add 'ml-4' explicitly */}
        <button
          onClick={() => onSelect(null)}
          className={`ml-4 rounded-full border px-6 py-2 text-sm font-bold shadow-lg transition-all duration-300 ${
            selectedVibeId === null
              ? 'text-cine-dark scale-105 border-white bg-white shadow-white/20'
              : 'bg-cine-gray/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
          }`}
        >
          All Movies
        </button>

        {/* Vibe Buttons */}
        {VIBES.map((vibe, index) => {
          const isSelected = selectedVibeId === vibe.id;
          const isLast = index === VIBES.length - 1;

          return (
            <button
              key={vibe.id}
              onClick={() => onSelect(isSelected ? null : vibe)}
              // Logic: If it is the last item, add 'mr-4'. Otherwise nothing.
              className={`group relative overflow-hidden rounded-full border px-6 py-2 text-sm font-bold shadow-lg transition-all duration-300 ${isLast ? 'mr-4' : ''} ${
                isSelected
                  ? 'scale-105 border-transparent text-white ring-1 ring-white/30'
                  : 'bg-cine-gray/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
              }`}
            >
              <div
                className={`absolute inset-0 opacity-20 transition-opacity duration-300 ${vibe.color} ${isSelected ? 'opacity-80' : 'group-hover:opacity-40'}`}
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
