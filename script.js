function getWeather(){
    const apiKey = 'c3e78b81fc6001b1b677d4f17f505609';
    const city =document.getElementById('city').value


if (!city){
    alert('please enter the city name')
    return;
}

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


fetch(currentWeatherUrl)
      .then(response => response.json())
      .then(data => {
        displayWeather(data);
      })
      .catch(error =>{
        console.log('Error fecthing current weather data:',error);
        alert('Error fetching current weather data. please try again')
      })


      fetch(forecastUrl)
      .then(response => response.json())
      .then(data =>{
        dispalyHourlyForecast(data.list);
      })
      .catch(error => {
        console.error('Error Fetching hourly forecast data:',error)
        alert('Error fetching hourly forecast data.please try again.');
      });

}

function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info')
    const weatherIcon = document.getElementById('weather-icon')
    const hourlyForecaastDiv = document.getElementById('hourly-forecast')
   
    weatherInfoDiv.innerHTML='';
    hourlyForecaastDiv.innerHTML='';
    tempDivInfo.innerHTML='';



    if (data.cod === '404'){
        weatherInfoDiv.innerHTML =`<p>${data.message}</P>`;
    }else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp-273.15)
        const description = data.weather[0].description
        const iconCode =  data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
   
        const temperatureHTML =` <p>${temperature}C</p>`;
 
        const weatherHTML = `<p>${cityName}</p> 
        <p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src =  iconUrl;
        weatherIcon.alt = description;
        
        showImage()
    }
} 

 
function dispalyHourlyForecast(hourlyData) {
    console.log(hourlyData)
    const hourlyForecaastDiv = document.getElementById('hourly-forecast')
    const next24hours = hourlyData.slice(0, 8);
    next24hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
        <div class="hourly-item">
        <span>${hour}:00</span>
        <img src ="${iconUrl}" alt="hourly Weather Icon">
        <span>${temperature}C </span>
        </div>`;

        hourlyForecaastDiv.innerHTML += hourlyItemHTML;
    });
   
}


function showImage(){
    const weatherIcon = document.getElementById("weather-icon")
    weatherIcon.style.display ='block';

}