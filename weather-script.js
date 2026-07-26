// API Key - Obtenha em: https://openweathermap.org/api
const API_KEY = 'b6fd4f1f8e4b1f8e5b6d7e8f9a0b1c2d'; // Substitua com sua chave
const API_BASE = 'https://api.openweathermap.org/data/2.5';
const GEO_API = 'https://api.openweathermap.org/geo/1.0';

let tempUnit = 'C'; // C ou F
let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
let currentCity = null;

// Inicializar
window.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadFavorites();
    
    // Tentar obter localização do usuário
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            error => {
                console.log('Localização não permitida, usando padrão');
                fetchWeather('São Paulo'); // Padrão
            }
        );
    } else {
        fetchWeather('São Paulo');
    }
});

// Setup de Eventos
function setupEventListeners() {
    document.getElementById('searchBtn').addEventListener('click', () => {
        const city = document.getElementById('searchInput').value;
        if (city) fetchWeather(city);
    });

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = document.getElementById('searchInput').value;
            if (city) fetchWeather(city);
        }
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.length > 2) {
            autocompleteCities(value);
        } else {
            document.getElementById('suggestionsList').classList.remove('active');
        }
    });

    document.getElementById('locationBtn').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoords(latitude, longitude);
                },
                error => showError('Erro ao obter localização')
            );
        }
    });

    document.getElementById('toggleUnit').addEventListener('click', (e) => {
        e.preventDefault();
        tempUnit = tempUnit === 'C' ? 'F' : 'C';
        if (currentCity) fetchWeather(currentCity);
    });
}

// Autocompletar cidades
async function autocompleteCities(query) {
    try {
        const response = await fetch(
            `${GEO_API}/direct?q=${query}&limit=5&appid=${API_KEY}`
        );
        const cities = await response.json();
        
        const suggestionsList = document.getElementById('suggestionsList');
        suggestionsList.innerHTML = '';
        
        cities.forEach(city => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = `${city.name}, ${city.country}`;
            item.addEventListener('click', () => {
                document.getElementById('searchInput').value = `${city.name}, ${city.country}`;
                fetchWeatherByCoords(city.lat, city.lon);
                suggestionsList.classList.remove('active');
            });
            suggestionsList.appendChild(item);
        });
        
        suggestionsList.classList.add('active');
    } catch (error) {
        console.error('Erro no autocomplete:', error);
    }
}

// Buscar clima por cidade
async function fetchWeather(city) {
    try {
        showLoader();
        hideError();
        
        // Primeiro obter coordenadas
        const geoResponse = await fetch(
            `${GEO_API}/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();
        
        if (!geoData.length) {
            showError(`Cidade "${city}" não encontrada`);
            hideLoader();
            return;
        }
        
        const { lat, lon, name, country } = geoData[0];
        currentCity = name;
        
        // Depois obter dados do clima
        await fetchWeatherByCoords(lat, lon, name, country);
    } catch (error) {
        showError('Erro ao buscar dados climáticos');
        console.error(error);
    }
}

// Buscar clima por coordenadas
async function fetchWeatherByCoords(lat, lon, cityName = null, countryName = null) {
    try {
        showLoader();
        hideError();
        
        const units = tempUnit === 'C' ? 'metric' : 'imperial';
        
        // Obter previsão (inclui clima atual)
        const forecastResponse = await fetch(
            `${API_BASE}/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=pt_br&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();
        
        // Obter dados atuais com mais detalhes
        const currentResponse = await fetch(
            `${API_BASE}/weather?lat=${lat}&lon=${lon}&units=${units}&lang=pt_br&appid=${API_KEY}`
        );
        const currentData = await currentResponse.json();
        
        // Obter UV Index
        const uvResponse = await fetch(
            `${API_BASE}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const uvData = await uvResponse.json();
        
        // Exibir dados
        displayCurrentWeather(currentData, uvData, cityName, countryName);
        displayForecast(forecastData);
        displayHourly(forecastData);
        displayMap(lat, lon, cityName);
        
        hideLoader();
    } catch (error) {
        showError('Erro ao buscar dados climáticos');
        console.error(error);
        hideLoader();
    }
}

// Exibir clima atual
function displayCurrentWeather(data, uvData, cityName, countryName) {
    const section = document.getElementById('currentWeather');
    const city = cityName || data.name;
    const country = countryName || '';
    const unit = tempUnit === 'C' ? '°C' : '°F';
    
    document.getElementById('cityName').textContent = `${city}${country ? ', ' + country : ''}`;
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}${unit}`;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    document.getElementById('weatherDescription').textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(data.wind.speed)} ${tempUnit === 'C' ? 'm/s' : 'mph'}`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}${unit}`;
    document.getElementById('uvIndex').textContent = `${Math.round(uvData.value)}`;
    
    section.style.display = 'block';
}

// Exibir previsão de 5 dias
function displayForecast(data) {
    const container = document.getElementById('forecastContainer');
    container.innerHTML = '';
    
    const forecasts = data.list.filter((item, index) => index % 8 === 0);
    
    forecasts.forEach(item => {
        const date = new Date(item.dt * 1000);
        const card = document.createElement('div');
        card.className = 'forecast-item';
        card.innerHTML = `
            <h4>${date.toLocaleDateString('pt-BR', { weekday: 'short', month: 'numeric', day: 'numeric' })}</h4>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" class="forecast-icon" alt="Ícone">
            <div class="temp-range">
                <span class="temp-max">${Math.round(item.main.temp_max)}°</span>
                <span class="temp-min">${Math.round(item.main.temp_min)}°</span>
            </div>
            <p class="forecast-description">${item.weather[0].description}</p>
        `;
        container.appendChild(card);
    });
    
    document.getElementById('forecastSection').style.display = 'block';
}

// Exibir previsão por hora
function displayHourly(data) {
    const container = document.getElementById('hourlyContainer');
    container.innerHTML = '';
    
    const hourly = data.list.slice(0, 8);
    
    hourly.forEach(item => {
        const date = new Date(item.dt * 1000);
        const card = document.createElement('div');
        card.className = 'hourly-item';
        card.innerHTML = `
            <div class="time">${date.getHours().toString().padStart(2, '0')}:00</div>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" class="icon" alt="Ícone">
            <div class="temp">${Math.round(item.main.temp)}°</div>
            <div class="condition">${item.weather[0].main}</div>
        `;
        container.appendChild(card);
    });
    
    document.getElementById('hourlySection').style.display = 'block';
}

// Exibir mapa
function displayMap(lat, lon, city) {
    const mapFrame = document.getElementById('mapFrame');
    mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.1},${lat - 0.1},${lon + 0.1},${lat + 0.1}&layer=mapnik&marker=${lat},${lon}`;
    document.getElementById('mapSection').style.display = 'block';
}

// Carregar favoritos
function loadFavorites() {
    const container = document.getElementById('favoritesContainer');
    
    if (favorites.length === 0) {
        document.getElementById('favoritesSection').style.display = 'none';
        return;
    }
    
    container.innerHTML = '';
    favorites.forEach(fav => {
        const card = document.createElement('div');
        card.className = 'favorite-card';
        card.innerHTML = `
            <button class="remove-btn" onclick="removeFavorite('${fav.name}', event)">
                <i class="fas fa-times"></i>
            </button>
            <div class="city-name">${fav.name}</div>
            <div class="temp">${fav.temp}°</div>
            <div class="condition">${fav.condition}</div>
        `;
        card.addEventListener('click', () => fetchWeather(fav.name));
        container.appendChild(card);
    });
    
    document.getElementById('favoritesSection').style.display = 'block';
}

// Adicionar aos favoritos
function addToFavorites(city, temp, condition) {
    const exists = favorites.find(f => f.name === city);
    if (!exists && favorites.length < 5) {
        favorites.push({ name: city, temp, condition });
        localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        loadFavorites();
    }
}

// Remover dos favoritos
function removeFavorite(city, event) {
    event.stopPropagation();
    favorites = favorites.filter(f => f.name !== city);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    loadFavorites();
}

// Mostrar/Esconder loader
function showLoader() {
    document.getElementById('loader').style.display = 'flex';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

// Mostrar/Esconder erro
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}