const API_KEY = 'c46ce8c0ec97439c9a3125353240511'; // Get your free API key from weatherapi.com

async function getWeatherData(latitude, longitude) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
        );
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

async function searchWeather() {
    const location = document.getElementById('locationInput').value;
    if (!location) return;

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
        );
        const data = await response.json();
        
        if (data.error) {
            alert('Location not found. Please try again.');
            return;
        }
        
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeatherData(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Error getting location. Please try searching manually.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser. Please try searching manually.');
    }
}

function displayWeatherData(data) {
    document.getElementById('location').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('temp').textContent = Math.round(data.current.temp_c);
    document.getElementById('description').textContent = data.current.condition.text;
    document.getElementById('humidity').textContent = data.current.humidity;
    document.getElementById('windSpeed').textContent = data.current.wind_kph;
    
    // Use the CDN URL format
    const iconCode = data.current.condition.icon.split('/').pop(); // Gets the icon code from the URL
    document.getElementById('weatherIcon').src = `https://cdn.weatherapi.com/weather/64x64/${iconCode}`;
} 