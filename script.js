$( document ).ready(function() {

  getLocation();
// 
const api = {
   key: "49f44633a22b64ed242a4f937e6ef855",
   base: "https://api.openweathermap.org/data/2.5/"
}

const currentDate = dayjs().format('MMMM, D, YYYY');
const currentDay = dayjs().format('dddd');
$(".date").text(currentDate);
$('.day').text(currentDay);
const searchBox = document.querySelector('.search-box');

//event listener listens for 'enter' or 'return' key to be pressed instead of button 
searchBox.addEventListener('keypress', setQuery)

function setQuery(event){
  if (event.keyCode == 13){
    getResults(searchBox.value)
    console.log(searchBox.value)
  }
}
// function for getting location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
  else {
    alert("Geolocation is not supported by this browser.");
  }
}
// takes about 20-30 seconds to load.. refactor this. 
function showPosition(position) {
  // Grab coordinates from the given object
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  redirect(lat, lon);
}

function redirect(lat, lon) {
  fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${api.key}`)
  .then (weather => {
    return weather.json();
  }).then(displayResults)
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults)
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`

    let weather_el = document.querySelector('.current .weather')
    weather_el.innerText = weather.weather[0].main;

    // let icon = `${weather.weather[0].icon}`
    // let iconImg = document.querySelector('.icon')
    // iconImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png"></img>`

    let hilow = document.querySelector('.hi-low')
    hilow.innerText = ` ${Math.round(weather.main.temp_min)}°F /  ${Math.round(weather.main.temp_max)}°F `;
     
}


// end script
});