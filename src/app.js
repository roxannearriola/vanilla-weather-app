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

function displayForecast() {
	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
	days.forEach(function (day) {
		forecastHTML =
			forecastHTML +
			`
        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img
          src="http://openweathermap.org/img/wn/04n@2x.png"
          alt=""
          width="35px"
          />
          <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max"
          ><strong>20°</strong></span
          >
          <span class="weather-forecast-temp-min"> 9°</span>
          </div>
        </div>
      `;
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
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
displayForecast();
