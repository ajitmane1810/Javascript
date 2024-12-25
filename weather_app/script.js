const container = document.querySelector(".container");
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const loading = document.querySelector(".loading");
const cityHide = document.getElementById("city-hide");

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") return;

  // Show loading message
  loading.classList.add("active");

  // Clear previous weather data
  weatherBox.classList.remove("active");
  weatherDetails.classList.remove("active");
  error404.classList.remove("active");
  cityHide.textContent = "";

  // Fetch weather data from OpenWeatherMap
  const APIKey = "6b5b749c90f1729a8907d16f6142f2d6";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        // Show not found message if city is not found
        cityHide.textContent = city;
        error404.classList.add("active");
        loading.classList.remove("active"); // Hide loading
        return;
      }

      // Hide loading and show weather data
      loading.classList.remove("active");
      cityHide.textContent = city;
      container.style.height = "555px";
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      // Update weather data
      document.querySelector(".weather-box .temperature").innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
      document.querySelector(".weather-box .description").innerHTML = data.weather[0].description;
      document.querySelector(".weather-details .humidity span").innerHTML = `${data.main.humidity}%`;
      document.querySelector(".weather-details .wind span").innerHTML = `${data.wind.speed} km/h`;

      // Set weather image based on weather conditions
      const weatherIcon = document.querySelector(".weather-box img");
      switch (data.weather[0].main) {
        case "Clear":
          weatherIcon.src = "images/clear.png";
          break;
        case "Rain":
          weatherIcon.src = "images/rain.png";
          break;
        case "Clouds":
          weatherIcon.src = "images/cloud.png";
          break;
        default:
          weatherIcon.src = "images/clear.png";
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data", error);
      loading.classList.remove("active"); // Hide loading in case of error
    });
});
