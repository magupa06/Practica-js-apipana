const API_KEY = 'TU_API_KEY_AQUI';

let tempC = 0;
let enCelsius = true;

async function buscar() {
  const ciudad = document.getElementById('ciudad').value;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${ciudad}?unitGroup=metric&key=${API_KEY}&contentType=json`;

  const respuesta = await fetch(url);
  const datos = await respuesta.json();

  tempC = datos.currentConditions.temp;
  const humedad = datos.currentConditions.humidity;
  const viento = datos.currentConditions.windspeed;
  const condicion = datos.currentConditions.conditions;

  document.getElementById('resultado').innerHTML = `
    <b>${ciudad}</b><br>
    Temperatura: ${tempC}°C<br>
    Condición: ${condicion}<br>
    Humedad: ${humedad}%<br>
    Viento: ${viento} km/h
  `;

  document.getElementById('toggle').style.display = 'inline';
}

function cambiarUnidad() {
  enCelsius = !enCelsius;
  const temp = enCelsius ? tempC : (tempC * 9/5) + 32;
  const unidad = enCelsius ? '°C' : '°F';
  document.getElementById('resultado').innerHTML = document.getElementById('resultado').innerHTML.replace(/Temperatura: .+<br>/, `Temperatura: ${Math.round(temp)}${unidad}<br>`);
}