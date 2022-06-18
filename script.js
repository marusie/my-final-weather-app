function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#cityCurrent").innerHTML = response.data.name;
  document.querySelector(".current-weather-degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed}`;
  document.querySelector(".currenttemp").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      `src`,
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}
function searchCity(city) {
  let apiKey = "9c0aa7b2c4f9f912a8741e09273f3cab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function searchLocation(position) {
  let apiKey = "9c0aa7b2c4f9f912a8741e09273f3cab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector(".current-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-current-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-submit");
currentLocationButton.addEventListener("click", getCurrentLocation);
