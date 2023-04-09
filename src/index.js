let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
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
  "December"
];
let minutes = now.getMinutes();
let hours = now.getHours();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let year = now.getFullYear();
let localTime = document.querySelector(".text-center");
localTime.innerHTML = `${day}-----${hours}:${minutes}-----${month}-${year}`;

function displayCityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".serchcity");
  let search = document.querySelector("h1");
  search.innerHTML = `${searchInput.value}`;
}
let city = document.querySelector(".city-form");
city.addEventListener("submit", displayCityName);

function showTemp(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector(".temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchTemp(event) {
  event.preventDefault();
  let city = document.querySelector(".serchcity").value;
  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let celsiusTemperature = null;
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let searchForm = document.querySelector(".city-form");
searchForm.addEventListener("submit", searchTemp);

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
            <div class="row nextDay">
            <div class="col-4 weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
             <img class="col-3"
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class=" col-2 weather-forecast-temperature-max">
              ${Math.round(forecastDay.temp.max)}°/ 
              </div>
              <div class=" col-2 weather-forecast-temperature-min"> 
              ${Math.round(forecastDay.temp.min)}° </div>
              <hr />
            </div>
          </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
