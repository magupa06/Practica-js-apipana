import { describe, it, expect } from 'vitest';
import { validateCity } from './city-validator.js';

describe('City validator', () => {
  it('should throw City required when city is not present', () => {
    expect(() => validateCity(undefined)).toThrow(
      'City required'
    );
  });
  it('should throw City cannot be empty when city contains only spaces', () => {
    expect(() => validateCity('   ')).toThrow(
      'City cannot be empty'
    );
  });
  it('should throw an error when city name is too short', () => {
  expect(() => validateCity('A')).toThrow(
    'Invalid city name'
    );
  });
}); 