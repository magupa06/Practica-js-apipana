export async function fetchWeather(uri) {
  const response = await fetch(uri);

  if (response.status >= 400 && response.status < 500) {
    throw new Error(`City not found (${response.status})`);
  }

  if (response.status >= 500) {
    throw new Error(`Server error (${response.status})`);
  }

  return response.json();
}
