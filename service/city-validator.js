export function validateCity(city) {
  if (!city || typeof city !== 'string') {
    throw new Error('City required');
  }

  const trimmed = city.trim();

  if (trimmed.length === 0) {
    throw new Error('City cannot be empty');
  }

  if (trimmed.length < 2) {
    throw new Error('Invalid city name');
  }

  return trimmed;
}
