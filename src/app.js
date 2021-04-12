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

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();

	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(
							forecastDay.dt
						)}</div>
            <img
            src="http://openweathermap.org/img/wn/${
							forecastDay.weather[0].icon
						}@2x.png"
            alt=""
            width="35px"
            />
            <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max"
            ><strong>${Math.round(forecastDay.temp.max)}°</strong></span
            >
            <span class="weather-forecast-temp-min"> ${Math.round(
							forecastDay.temp.min
						)}°</span>
            </div>
          </div>
        `;
		}
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
	let apiKey = "b511e89f29c4deb143d80dc884ca0735";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
	let tempElement = document.querySelector("#current-temp");
	let descriptionElement = document.querySelector("#current-temp-description");
	let cityElement = document.querySelector("#city");
	let dateElement = document.querySelector("#current-date");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let iconElement = document.querySelector("#main-icon");

	celsiusTemperature = response.data.main.temp;

	tempElement.innerHTML = Math.round(response.data.main.temp);
	descriptionElement.innerHTML = response.data.weather[0].description;
	cityElement.innerHTML = response.data.name;
	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	dateElement.innerHTML = formatDate(response.data.dt * 1000);
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);

	getForecast(response.data.coord);
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

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	fahrenheitLink.classList.add("active");
	celsiusLink.classList.remove("active");
	let temperatureElement = document.querySelector("#current-temp");
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let temperatureElement = document.querySelector("#current-temp");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Montreal");
