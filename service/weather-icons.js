import { getCityWeather } from './get-city-weather.js';
import { buscarCiudades } from './city-autocomplete.js';

const form = document.getElementById('form-busqueda');
const input = document.getElementById('ciudad');
const suggestions = document.getElementById('sugerencias');
const loading = document.getElementById('cargando');
const errorEl = document.getElementById('error');
const card = document.getElementById('tarjeta');
const cityName = document.getElementById('nombre-ciudad');
const tempEl = document.getElementById('temperatura');
const emojiEl = document.getElementById('emoji-clima');
const conditionEl = document.getElementById('condicion');
const humidityEl = document.getElementById('humedad');
const windEl = document.getElementById('viento');
const feelsLikeEl = document.getElementById('sensacion');
const unitBtn = document.getElementById('btn-unidad');

let currentTempC = null;
let inFahrenheit = false;
let abortController = null;

function getWeatherEmoji(condition) {
  const c = condition.toLowerCase();
  if (c.includes('rain')) return '🌧️';
  if (c.includes('snow')) return '❄️';
  if (c.includes('thunder') || c.includes('storm')) return '⛈️';
  if (c.includes('cloud') || c.includes('overcast')) return '☁️';
  if (c.includes('fog') || c.includes('mist')) return '🌫️';
  if (c.includes('wind')) return '💨';
  if (c.includes('clear') || c.includes('sun')) return '☀️';
  return '🌤️';
}

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = false;
  card.hidden = true;
  loading.hidden = true;
}

function renderWeather(data) {
  currentTempC = data.temperature;
  inFahrenheit = false;

  cityName.textContent = data.city;
  tempEl.textContent = `${data.temperature}°C`;
  emojiEl.textContent = getWeatherEmoji(data.condition);
  conditionEl.textContent = data.condition;
  humidityEl.textContent = `${data.humidity}%`;
  windEl.textContent = `${data.wind} km/h`;
  feelsLikeEl.textContent = `${data.feelsLike}°C`;

  card.hidden = false;
  loading.hidden = true;
  errorEl.hidden = true;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  suggestions.hidden = true;
  card.hidden = true;
  errorEl.hidden = true;
  loading.hidden = false;

  try {
    const data = await getCityWeather(city);
    renderWeather(data);
  } catch (err) {
    showError(err.message);
  }
});

unitBtn.addEventListener('click', () => {
  if (currentTempC === null) return;
  if (inFahrenheit) {
    tempEl.textContent = `${currentTempC}°C`;
    inFahrenheit = false;
  } else {
    const f = Math.round(currentTempC * 9 / 5 + 32);
    tempEl.textContent = `${f}°F`;
    inFahrenheit = true;
  }
});

input.addEventListener('input', async () => {
  const text = input.value.trim();
  if (text.length < 3) {
    suggestions.hidden = true;
    suggestions.innerHTML = '';
    return;
  }

  if (abortController) abortController.abort();
  abortController = new AbortController();

  try {
    const cities = await buscarCiudades(text, abortController.signal);
    if (!cities.length) {
      suggestions.hidden = true;
      return;
    }
    suggestions.innerHTML = cities
      .map(c => `<div class="sugerencia-item" data-name="${c.name}, ${c.country}">${c.name}${c.admin1 ? ', ' + c.admin1 : ''}, ${c.country}</div>`)
      .join('');
    suggestions.hidden = false;
  } catch {
  }
});

suggestions.addEventListener('click', (e) => {
  const item = e.target.closest('.sugerencia-item');
  if (!item) return;
  input.value = item.dataset.name;
  suggestions.hidden = true;
  suggestions.innerHTML = '';
  form.requestSubmit();
});

document.addEventListener('click', (e) => {
  if (!form.contains(e.target)) {
    suggestions.hidden = true;
  }
});