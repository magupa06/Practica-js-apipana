export function mapToClima(data) {
  return {
    ciudad: data.resolvedAddress,
    temperatura: data.currentConditions.temp,
    sensacion: data.currentConditions.feelslike,
    humedad: data.currentConditions.humidity,
    viento: data.currentConditions.windspeed,
    condicion: data.currentConditions.conditions,
  };
}
