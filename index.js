let now = new Date();

const days = [
    "Monday",
    "Monday",
    "Tusday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Suturday",
    "Sunday"
];
const weekDay = days[now.getDay()];

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const month = months[now.getMonth()];
const monthDay = now.getDate();

let date = document.getElementById("week-day");
date.innerHTML = `${weekDay}`;

let monthAndDay = document.getElementById("month-day");
monthAndDay.innerHTML = `${month} ${monthDay}`;

function displayCity(e) {
    e.preventDefault();
    const cityInput = document.getElementById("city-input");
    const currentCity = cityInput.value;

    const apiKey = "b40b135798f82a05aed08769f9275f50";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric`;

    function showWeather(response) {
        const typedCity = response.data.name;
        const temp = Math.round(response.data.main.temp);

        const city = document.getElementsByClassName("city")[0];
        city.innerHTML = typedCity;
        cityInput.value = "";

        const currentTemperature = document.getElementsByClassName(
            "current-temperature"
        )[0];
        currentTemperature.innerText = temp;
    }

    axios.get(`${url}&appid=${apiKey}`).then(showWeather);
}

const inputForm = document.getElementById("basic-addon2");
inputForm.addEventListener("click", displayCity);

const cityInput = document.getElementById("city-input");
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        inputForm.click();
    }
});

function handlePosition(position) {
    const lat = position.coords.latitude.toFixed(2);
    const lon = position.coords.longitude.toFixed(2);
    const apiKey = "b40b135798f82a05aed08769f9275f50";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
    axios.get(`${url}&appid=${apiKey}`).then(showCurrentWeather);
}

function showCurrentWeather(response) {
    const typedCity = response.data.name;
    const temp = Math.round(response.data.main.temp);

    const city = document.getElementsByClassName("city")[0];
    city.innerHTML = typedCity;

    const currentTemperature = document.getElementsByClassName(
        "current-temperature"
    )[0];
    currentTemperature.innerText = temp;
}

const showCurrentCity = document.getElementById("current-city");
if (showCurrentCity) {
    showCurrentCity.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition(handlePosition);
    });
}
