import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCityWeather } from './get-city-weather.js';
import { fetchWeather } from '../persistence/weather-client.js';

vi.mock('../persistence/weather-client.js');

describe('getCityWeather', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should throw an error when the API cannot be reached', async () => {
    fetchWeather.mockRejectedValue(new Error('Connection failed'));

    await expect(getCityWeather('Panama'))
      .rejects.toThrow('Connection failed');
  });

  it('should throw an error when the city does not exist', async () => {
    fetchWeather.mockRejectedValue(new Error('Unknown city'));

    await expect(getCityWeather('UnknownCity'))
      .rejects.toThrow('Unknown city');
  });

  it('should return weather when the city exists', async () => {
  fetchWeather.mockResolvedValue({
    resolvedAddress: 'Panama',
    currentConditions: {
      temp: 28,
      feelslike: 30,
      humidity: 80,
      conditions: 'clear sky'
    }
  });

  const result = await getCityWeather('Panama');

  expect(result).toMatchObject({
    city: 'Panama',
    temperature: 28,
    feelsLike: 30,
    humidity: 80
  });
});
});