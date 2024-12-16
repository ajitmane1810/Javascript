const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityhide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  const APIKey = "6b5b749c90f1729a8907d16f6142f2d6";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  // Clear previous weather data
  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");

  // Reset to default values before new fetch
  image.src = ""; // Optionally set a default loading image
  temperature.innerHTML = "0<span>°C</span>";
  description.innerHTML = "Loading...";
  humidity.innerHTML = "0%";
  wind.innerHTML = "0km/h";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        cityhide.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      // Update weather information
      cityhide.textContent = city;
      container.style.height = "555px";
      container.classList.add("active");
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      // Set the weather image based on conditions
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Mist":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "images/cloud.png";
      }

      // Update displayed weather information
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed}km/h`;

      // Manage clones for animations
      const infoWeather = document.querySelector(".info-weather");
      const infoHumidity = document.querySelector(".info-humidity");
      const infoWind = document.querySelector(".info-wind");

      const elCloneInfoWeather = infoWeather.cloneNode(true);
      const elCloneInfoHumidity = infoHumidity.cloneNode(true);
      const elCloneInfoWind = infoWind.cloneNode(true);

      elCloneInfoWeather.id = "clone-info-weather";
      elCloneInfoWeather.classList.add("active-clone");
      elCloneInfoHumidity.id = "clone-info-humidity";
      elCloneInfoHumidity.classList.add("active-clone");
      elCloneInfoWind.id = "clone-info-wind";
      elCloneInfoWind.classList.add("active-clone");

      // Append clones after some delay
      setTimeout(() => {
        infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
        infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
        infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
      }, 2200);

      // Remove old clones if they exist
      const cloneInfoWeather = document.querySelectorAll(
        ".info-weather.active-clone"
      );
      const totalCloneInfoWeather = cloneInfoWeather.length;

      if (totalCloneInfoWeather > 0) {
        const cloneInfoWeatherFirst = cloneInfoWeather[0];
        const cloneInfoHumidityFirst = document.querySelectorAll(
          ".info-humidity.active-clone"
        )[0];
        const cloneInfoWindFirst = document.querySelectorAll(
          ".info-wind.active-clone"
        )[0];

        cloneInfoWeatherFirst.classList.remove("active-clone");
        cloneInfoHumidityFirst.classList.remove("active-clone");
        cloneInfoWindFirst.classList.remove("active-clone");

        setTimeout(() => {
          cloneInfoWeatherFirst.remove();
          cloneInfoHumidityFirst.remove();
          cloneInfoWindFirst.remove();
        }, 2200);
      }
    });
});
