const API_KEY = 'MQDXK2JTF5TQ29AMW4PGDTLB6';
const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export function buildWeatherUri(city) {
  return `${BASE_URL}/${encodeURIComponent(city)}?unitGroup=metric&key=${API_KEY}&contentType=json`;
}
