const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export const getImageUrl = (path: string | null) => {
  if (!path) return '/placeholder-movie.png';
  return `${BASE_IMAGE_URL}${path}`;
};