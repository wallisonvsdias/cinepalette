export interface Vibe {
  id: string;
  label: string;
  color: string;
  description: string;
  // These params map directly to TMDB API query parameters
  params: {
    with_genres?: string; // e.g., "878" or "18,35"
    'primary_release_date.lte'?: string; // "Less than or equal" (for old movies)
    without_genres?: string; // Exclude genres (e.g., no cartoons)
    sort_by?: string; // e.g., 'vote_average.desc'
    with_keywords?: string; // Advanced: Filter by specific themes
    [key: string]: string | undefined;
  };
}

export const VIBES: Vibe[] = [
  {
    id: 'neon',
    label: 'Neon / Sci-Fi',
    color: 'bg-fuchsia-500 shadow-fuchsia-500/50',
    description: 'Cyberpunk aesthetics, lasers, and futuristic worlds.',
    params: { with_genres: '878' }, // Science Fiction
  },
  {
    id: 'vintage',
    label: 'Vintage / B&W',
    color: 'bg-stone-500 shadow-stone-500/50',
    description: 'Golden age cinema and timeless classics.',
    params: {
      'primary_release_date.lte': '1965-12-31', // Movies before 1966
      sort_by: 'vote_average.desc',
      'vote_count.gte': '500', // Ensure they are popular classics
    },
  },
  {
    id: 'scorching',
    label: 'Scorching / Heat',
    color: 'bg-amber-500 shadow-amber-500/50',
    description: 'Deserts, westerns, and sweaty thrillers.',
    params: { with_genres: '37' }, // Westerns (often yellow/orange palettes)
  },
  {
    id: 'dreamy',
    label: 'Dreamy / Pastel',
    color: 'bg-pink-300 shadow-pink-300/50',
    description: 'Soft lighting, romance, and fantasy.',
    params: { with_genres: '10749,14' }, // Romance + Fantasy
  },
  {
    id: 'gritty',
    label: 'Gritty / Noir',
    color: 'bg-slate-700 shadow-slate-700/50',
    description: 'Dark alleys, crime, and high contrast.',
    params: { with_genres: '80,9648' }, // Crime + Mystery
  },
  {
    id: 'adrenaline',
    label: 'High Octane',
    color: 'bg-red-600 shadow-red-600/50',
    description: 'Explosions, speed, and red filters.',
    params: { with_genres: '28' }, // Action
  },
  {
    id: 'chill',
    label: 'Blue / Melancholy',
    color: 'bg-blue-600 shadow-blue-600/50',
    description: 'Rainy days, drama, and introspection.',
    params: { with_genres: '18' }, // Drama
  },
];
