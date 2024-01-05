/** Leaflet Map **/

let latitude;
let longitude;
let timestamp;

let latitudeElement = document.querySelector("#latitude");
let longitudeElement = document.querySelector("#longitude");
let dateElement = document.querySelector("#date");

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
		timestamp = data["timestamp"];
    // Aquí puedes realizar acciones adicionales con los datos
		latitudeElement.innerText = latitude;
		longitudeElement.innerText = longitude;
		var map = L.map('map').setView([latitude, longitude], 3);

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

		var marker = L.marker([latitude, longitude]).addTo(map);

	// Crear un objeto Date con el timestamp (multiplicando por 1000 para convertir a milisegundos)
	const date = new Date(timestamp * 1000);
	console.log(timestamp);
	// Obtener las partes de la fecha
	const year = date.getFullYear();
	const month = ("0" + (date.getMonth() + 1)).slice(-2);  // Los meses van de 0 a 11, por eso se suma 1
	const day = ("0" + date.getDate()).slice(-2);
	const hours = ("0" + date.getHours()).slice(-2);
	const minutes = ("0" + date.getMinutes()).slice(-2);
	const seconds = ("0" + date.getSeconds()).slice(-2);

	// Formatear la fecha en un formato legible
	const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

	dateElement.innerText = formattedDate;

// Mostrar el resultado
console.log(formattedDate);	


		 })
  .catch(error => {
    // Manejar errores de red o errores en la API
    console.error('Error al obtener datos:', error);
  });

