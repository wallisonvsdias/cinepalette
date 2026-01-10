export interface Vibe {
  id: string;
  label: string;
  genreId: number; // TMDB Genre ID
  color: string;   // Tailwind class for decoration
}

export const VIBES: Vibe[] = [
  { id: 'neon', label: 'Neon / Sci-Fi', genreId: 878, color: 'bg-purple-500' }, // Science Fiction
  { id: 'adrenaline', label: 'Adrenaline', genreId: 28, color: 'bg-red-600' },   // Action
  { id: 'dreamy', label: 'Dreamy / Fantasy', genreId: 14, color: 'bg-indigo-400' }, // Fantasy
  { id: 'noir', label: 'Noir / Crime', genreId: 80, color: 'bg-gray-500' },      // Crime
  { id: 'laughs', label: 'Feel Good', genreId: 35, color: 'bg-yellow-500' },     // Comedy
  { id: 'spooky', label: 'Spooky', genreId: 27, color: 'bg-orange-700' },       // Horror
];