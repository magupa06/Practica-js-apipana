export function mapToClima(data) {
  return {
    city: data.resolvedAddress,
    temperature: data.currentConditions.temp,
    feelsLike: data.currentConditions.feelslike,
    humidity: data.currentConditions.humidity,
    wind: data.currentConditions.windspeed,
    condition: data.currentConditions.conditions,
  };
}
