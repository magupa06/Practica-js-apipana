import { describe, it, expect, vi } from 'vitest';
import { fetchWeather } from './weather-client.js';

describe('fetchWeather', () => {

  it('returns weather data', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      json: async () => ({ temperature: 25 })
    });

    expect(await fetchWeather('url')).toEqual({ temperature: 25 });
  });

  it('throws a 404 error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 404
    });

    await expect(fetchWeather('url'))
      .rejects.toThrow('City not found (404)');
  });

  it('throws a 500 error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 500
    });

    await expect(fetchWeather('url'))
      .rejects.toThrow('Server error (500)');
  });

});