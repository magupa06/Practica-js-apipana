import { validateCity } from './city-validator.js';
import { buildWeatherUri } from './weather-uri-builder.js';
import { mapToClima } from './city-clima-mapper.js';
import { fetchWeather } from '../persistence/weather-client.js';

export async function getCityWeather(city) {
  const validCity = validateCity(city);
  const uri = buildWeatherUri(validCity);
  const data = await fetchWeather(uri);
  return mapToClima(data);
}
