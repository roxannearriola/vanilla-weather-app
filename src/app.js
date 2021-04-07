function formatDate(timestamp) {
	let today = new Date(timestamp);
	let hours = today.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = today.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[today.getDay()];
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let month = months[today.getMonth()];
	let date = today.getDate();
	return `${day}, ${month} ${date} ${hours}:${minutes}`;
}

function displayTemperature(response) {
	let tempElement = document.querySelector("#current-temp");
	let descriptionElement = document.querySelector("#current-temp-description");
	let cityElement = document.querySelector("#city");
	let dateElement = document.querySelector("#current-date");
	tempElement.innerHTML = Math.round(response.data.main.temp);
	descriptionElement.innerHTML = response.data.weather[0].description;
	cityElement.innerHTML = response.data.name;
	dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function search(city) {
	let apiKey = "b511e89f29c4deb143d80dc884ca0735";
	let units = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

	axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityElement = document.querySelector("#city-text-input");
	search(cityElement.value);
}

search("Montreal");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
