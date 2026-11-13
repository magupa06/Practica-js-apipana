const API_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function buscarCiudades(texto, signal) {
  const busqueda = texto.trim();

  if (busqueda.length < 3) {
    return [];
  }

  const parametros = new URLSearchParams({
    name: busqueda,
    count: "10",
    language: "en",
    format: "json"
  });

  const respuesta = await fetch(
    `${API_URL}?${parametros}`,
    { signal }
  );

  if (!respuesta.ok) {
    throw new Error("Error searching for cities");
  }

  const datos = await respuesta.json();

  return datos.results ?? [];
}