export function validateCity(city) {
  if (!city || typeof city !== 'string') {
    throw new Error('Ciudad requerida');
  }

  const trimmed = city.trim();

  if (trimmed.length === 0) {
    throw new Error('Ciudad no puede estar vacía');
  }

  if (trimmed.length < 2) {
    throw new Error('Nombre de ciudad inválido');
  }

  return trimmed;
}
