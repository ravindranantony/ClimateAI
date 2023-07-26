function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();
  
    if (cityName === '') {
      alert('Please enter a city name.');
      return;
    }
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=799ad0f0186a50477cbdfa73e95e59bc`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === '404') {
          alert('City not found. Please enter a valid city name.');
          return;
        }
  
        const weatherData = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Weather: ${data.weather[0].description}</p>
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Humidity: ${data.main.humidity} %</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
  
        document.getElementById('weatherData').innerHTML = weatherData;
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }