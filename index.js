let date = new Date();
let time = (`${date.getHours()} : ${date.getMinutes()}`)
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day = days[date.getDay()];
let newDate = (`${day}  ${time}`)
let newDay = document.querySelector("#date")
newDay.innerHTML = newDate


function search(city) {
    let apiKey = "c32ff44aa91230dc9751e2f7a519861d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);

}




function searchCity(event) {
    event.preventDefault()
    let city = document.querySelector("#exampleInputPassword1").value;
    search(city)

    // let h1 = document.querySelector("h1");
    // h1.innerHTML = city.value.charAt(0).toUpperCase() + city.value.slice(1);

}

function showTemperature(response) {
    document.querySelector("h1").innerHTML = response.data.name
    let temperatureNow = Math.round(response.data.main.temp)
    let newTemperature = document.querySelector("#temperature")
    newTemperature.innerHTML = temperatureNow
    let feels = response.data.main.feels_like
    let small = document.querySelector("small");
    small.innerHTML = `feels like ${feels}°C`
    let humidity = response.data.main.humidity
    document.querySelector("#humidity").innerHTML = `Humidity : ${humidity}%`;
    let wind = response.data.wind.speed
    document.querySelector("#wind").innerHTML = `Wind :  ${wind}km/h`
    let weather = response.data.weather[0].description
    document.querySelector("#weather").innerHTML = weather.charAt(0).toUpperCase() + weather.slice(1)

}
function currentCity(event) {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition(getCurrentCity)
}

function getCurrentCity(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // let city = document.querySelector("#exampleInputPassword1");
    let apiKey = "c32ff44aa91230dc9751e2f7a519861d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    console.log(apiUrl)
    axios.get(apiUrl).then(showTemperature);

    // let h1 = document.querySelector("h1");
    // h1.innerHTML = `${latitude}  ${longitude}`;
}

let form = document.querySelector("#form-search")
form.addEventListener("submit", searchCity);
document.querySelector("#current").addEventListener("click", currentCity);
search("new york")