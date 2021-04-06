function displayTemperature(response) {
	console.log(response.data);
	let tempElement = document.querySelector("#current-temp");
	let descriptionElement = document.querySelector("#current-temp-description");
	let cityElement = document.querySelector("#city");
	tempElement.innerHTML = Math.round(response.data.main.temp);
	descriptionElement.innerHTML = response.data.weather[0].description;
	cityElement.innerHTML = response.data.name;
}

let city = "Montreal";
let apiKey = "b511e89f29c4deb143d80dc884ca0735";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
