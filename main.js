/** Leaflet Map **/

let latitude;
let longitude;

let latitudeElement = document.querySelector("#latitude");
let longitudeElement = document.querySelector("#longitude");

/** Fetch API **/

// Definir la URL de la API
const apiUrl = 'http://api.open-notify.org/iss-now.json';

// Hacer una solicitud GET utilizando la Fetch API
fetch(apiUrl)
  .then(response => {
    // Verificar si la solicitud fue exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error de red - Código de estado: ${response.status}`);
    }
    // Convertir la respuesta a formato JSON
    return response.json();
  })
  .then(data => {
    // Manipular los datos obtenidos de la API
    console.log(data);
		latitude = parseFloat(data["iss_position"]["latitude"]);
		longitude = parseFloat(data["iss_position"]["longitude"]);
    // Aquí puedes realizar acciones adicionales con los datos
		latitudeElement.innerText = latitude;
		longitudeElement.innerText = longitude;
		var map = L.map('map').setView([latitude, longitude], 3);

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

		var marker = L.marker([latitude, longitude]).addTo(map);

  })
  .catch(error => {
    // Manejar errores de red o errores en la API
    console.error('Error al obtener datos:', error);
  });

