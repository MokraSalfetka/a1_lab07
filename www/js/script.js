const API_KEY = '958882da531de30254ef5475302db190';

/*
document.getElementById("weatherButton").addEventListener("click", function () {
    const city = document.getElementById("cityInput").value.trim();
    const weatherOutputDiv = document.getElementById("weatherOutput");

    weatherOutputDiv.style.display = 'none';
    weatherOutputDiv.innerHTML = '';

    if (!city) {
        weatherOutputDiv.style.display = 'block';
        weatherOutputDiv.innerHTML = `<p>Proszę wprowadzić nazwę miasta.</p>`;
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            const forecastList = data.list.filter((_, index) => index % 8 === 0).slice(0, 4);
            let forecastHTML = `<h2>Pogoda w ${city.charAt(0).toUpperCase() + city.slice(1)}:</h2>`;

            forecastList.forEach(day => {
                const date = new Date(day.dt * 1000);
                const weatherDescription = day.weather[0].description;
                const temperature = day.main.temp;
                const humidity = day.main.humidity;
                const windSpeed = day.wind.speed;
                const iconCode = day.weather[0].icon;
                const pressure = day.main.pressure;

                const feelsLike = day.main.feels_like;

                const tempMin = day.main.temp_min;
                const tempMax = day.main.temp_max;
                const windDirection = day.wind.deg;
                
                const cloudiness = day.clouds.all;

                forecastHTML += `
                    <div class="forecast-day">
                        <h3>${date.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                        <img src="https://openweathermap.org/img/wn/${iconCode}@4x.png" alt="${weatherDescription}" class="weather-icon">
                        <p><strong>Opis:</strong> ${weatherDescription}</p>
                        <p><strong>Temperatura:</strong> ${temperature.toFixed(1)} &deg;C</p>
                        <p><strong>Temperatura odczuwalna:</strong> ${feelsLike.toFixed(1)} &deg;C</p>
                        <p><strong>Temp. min:</strong> ${tempMin.toFixed(1)} &deg;C, <strong>max:</strong> ${tempMax.toFixed(1)} &deg;C</p>
                        <p><strong>Wilgotność:</strong> ${humidity}%</p>
                        <p><strong>Prędkość wiatru:</strong> ${windSpeed} m/s. <strong>Kierunek wiatru:</strong> ${windDirection}°</p>
                        <p><strong>Ciśnienie:</strong> ${pressure} hPa</p>
                        <p><strong>Zachmurzenie:</strong> ${cloudiness}%</p>
                    </div>
                `;
            });

            weatherOutputDiv.style.display = 'block';
            weatherOutputDiv.innerHTML = forecastHTML;
            console.log(forecastHTML);
        } else {
            
            weatherOutputDiv.style.display = 'block';
            weatherOutputDiv.innerHTML = `<p>Nie udało się znaleźć pogody dla tego miasta.</p>`;
            console.log(`<p>Nie udało się znaleźć pogody dla tego miasta.</p>`);
        }
    };

    xhr.onerror = function () {
        weatherOutputDiv.style.display = 'block';
        weatherOutputDiv.innerHTML = `<p>Wystąpił błąd sieci. Spróbuj ponownie później.</p>`;
    };

    xhr.send();
});
*/

/*const API_KEY = '958882da531de30254ef5475302db190'; */

document.getElementById("weatherButton").addEventListener("click", function ()
{
    const city = document.getElementById("cityInput").value.trim();
    const weatherOutputDiv = document.getElementById("weatherOutput");

    weatherOutputDiv.style.display = 'none';

    if (!city) {
        weatherOutputDiv.innerHTML = `<p>Proszę podać nazwę miasta.</p>`;
        weatherOutputDiv.style.display = 'block';
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Nie udało się znaleźć pogody dla tego miasta.");
            }
            return response.json();
        })
        .then(data => {
            const forecastList = data.list.filter((_, index) => index % 8 === 0).slice(0, 4); // today + 3 dni
            let forecastHTML = `<h2>Pogoda w ${city.charAt(0).toUpperCase() + city.slice(1)}:</h2>`;

            forecastList.forEach(day => {
                const date = new Date(day.dt * 1000);
                const weatherDescription = day.weather[0].description;
                const temperature = day.main.temp;
                const humidity = day.main.humidity;
                const windSpeed = day.wind.speed;
                const iconCode = day.weather[0].icon;
                const pressure = day.main.pressure;

                const feelsLike = day.main.feels_like;

                const tempMin = day.main.temp_min;
                const tempMax = day.main.temp_max;
                const windDirection = day.wind.deg;
                
                const cloudiness = day.clouds.all;

                forecastHTML += `
                    <div class="forecast-day">
                        <h3>${date.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                        <img src="https://openweathermap.org/img/wn/${iconCode}@4x.png" alt="${weatherDescription}" class="weather-icon">
                        <p><strong>Opis:</strong> ${weatherDescription}</p>
                        <p><strong>Temperatura:</strong> ${temperature.toFixed(1)} &deg;C</p>
                        <p><strong>Temperatura odczuwalna:</strong> ${feelsLike.toFixed(1)} &deg;C</p>
                        <p><strong>Temp. min:</strong> ${tempMin.toFixed(1)} &deg;C, <strong>max:</strong> ${tempMax.toFixed(1)} &deg;C</p>
                        <p><strong>Wilgotność:</strong> ${humidity}%</p>
                        <p><strong>Prędkość wiatru:</strong> ${windSpeed} m/s. <strong>Kierunek wiatru:</strong> ${windDirection}°</p>
                        <p><strong>Ciśnienie:</strong> ${pressure} hPa</p>
                        <p><strong>Zachmurzenie:</strong> ${cloudiness}%</p>
                    </div>
                `;
            });

            weatherOutputDiv.style.display = 'block';
            weatherOutputDiv.innerHTML = forecastHTML;
            console.log(forecastHTML);
        })
        .catch(error => {

            weatherOutputDiv.style.display = 'block';
            weatherOutputDiv.innerHTML = `<p>${error.message}</p>`;
            console.log(error.message);
        });
});
