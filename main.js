/** Leaflet Map **/
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let latitude;
let longitude;

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
		console.log(data["iss_position"]["latitude"]);	
		console.log(data["iss_position"]["longitude"]);
		latitude =  data["iss_position"]["latitude"];
		longitude = data["iss_position"]["longitude"];
    // Aquí puedes realizar acciones adicionales con los datos
  })
  .catch(error => {
    // Manejar errores de red o errores en la API
    console.error('Error al obtener datos:', error);
  });


var marker = L.marker([51.5, -0.09]).addTo(map);
