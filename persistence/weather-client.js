export async function fetchWeather(uri) {
  const response = await fetch(uri);

  if (response.status >= 400 && response.status < 500) {
    throw new Error(`Ciudad no encontrada (${response.status})`);
  }

  if (response.status >= 500) {
    throw new Error(`Error del servidor (${response.status})`);
  }

  return response.json();
}
