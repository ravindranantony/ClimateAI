const apiKey = 'e875ee8619bc4a688a3e105b822bfae5'; 
const searchButton = document.getElementById('search-button');
const currentLocationButton = document.getElementById('current-location-button');
 searchButton.addEventListener('click', () => {
  const locationInput = document.getElementById('location-input');
  const location = locationInput.value;
  getWeather(location);
  getForecast(location);
  locationInput.value = '';
});
 currentLocationButton.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getWeatherByCoordinates(latitude, longitude);
      getForecastByCoordinates(latitude, longitude);
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
});
 function getWeather(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
   fetch(url)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
 function getForecast(location) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
   fetch(url)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
 function getWeatherByCoordinates(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
   fetch(url)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
 function getForecastByCoordinates(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
   fetch(url)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function displayCurrentWeather(data) {
    const currentWeather = document.getElementById('current-weather');
    currentWeather.innerHTML = '';
     const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');
     const cityName = document.createElement('h3');
    cityName.textContent = data.name;
     const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
     const wind = document.createElement('p');
    wind.textContent = `Wind: ${data.wind.speed} m/s`;
     const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
     const weatherCondition = document.createElement('p');
    const weatherCode = data.weather[0].id;
    const weatherDescription = data.weather[0].description;
     if (weatherCode >= 200 && weatherCode < 300) {
      weatherCondition.textContent = 'Thunderstorm';
    } else if (weatherCode >= 300 && weatherCode < 400) {
      weatherCondition.textContent = 'Drizzle';
    } else if (weatherCode >= 500 && weatherCode < 600) {
      weatherCondition.textContent = 'Rain';
    } else if (weatherCode >= 600 && weatherCode < 700) {
      weatherCondition.textContent = 'Snow';
    } else if (weatherCode >= 700 && weatherCode < 800) {
      weatherCondition.textContent = 'Mist';
    } else if (weatherCode === 800) {
      weatherCondition.textContent = 'Clear Sky';
    } else if (weatherCode > 800 && weatherCode < 900) {
      weatherCondition.textContent = 'Cloudy';
    } else {
      weatherCondition.textContent = weatherDescription;
    }
     weatherCard.appendChild(cityName);
    weatherCard.appendChild(temperature);
    weatherCard.appendChild(wind);
    weatherCard.appendChild(humidity);
    weatherCard.appendChild(weatherCondition);
     currentWeather.appendChild(weatherCard);
  }
   function displayForecast(data) {
    const forecast = document.getElementById('forecast');
    forecast.innerHTML = '';
     for (let i = 1; i <= 3; i++) {
      const weatherCard = document.createElement('div');
      weatherCard.classList.add('weather-card');
       const date = document.createElement('h3');
      const forecastDate = new Date();
      forecastDate.setDate(forecastDate.getDate() + i);
      date.textContent = forecastDate.toDateString();
       const temperature = document.createElement('p');
      temperature.textContent = `Temperature: ${data.list[i].main.temp}°C`;
       const wind = document.createElement('p');
      wind.textContent = `Wind: ${data.list[i].wind.speed} m/s`;
       const humidity = document.createElement('p');
      humidity.textContent = `Humidity: ${data.list[i].main.humidity}%`;
       const weatherCondition = document.createElement('p');
      const weatherCode = data.list[i].weather[0].id;
       if (weatherCode >= 200 && weatherCode < 300) {
        weatherCondition.textContent = 'Thunderstorm';
      } else if (weatherCode >= 300 && weatherCode < 400) {
        weatherCondition.textContent = 'Drizzle';
      } else if (weatherCode >= 500 && weatherCode < 600) {
        weatherCondition.textContent = 'Rain';
      } else if (weatherCode >= 600 && weatherCode < 700) {
        weatherCondition.textContent = 'Snow';
      } else if (weatherCode >= 700 && weatherCode < 800) {
        weatherCondition.textContent = 'Mist';
      } else if (weatherCode === 800) {
        weatherCondition.textContent = 'Clear Sky';
      } else if (weatherCode > 800 && weatherCode < 900) {
        weatherCondition.textContent = 'Cloudy';
      } else {
        weatherCondition.textContent = data.list[i].weather[0].description;
      }
       weatherCard.appendChild(date);
      weatherCard.appendChild(temperature);
      weatherCard.appendChild(wind);
      weatherCard.appendChild(humidity);
      weatherCard.appendChild(weatherCondition);
       forecast.appendChild(weatherCard);
    }
  }