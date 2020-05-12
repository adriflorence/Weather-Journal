// OpenWeatherApi config
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='; // zip search
const apiKey = '&appid=' + '555036a2bb84497ab0064c6bd52df011'; // TODO pull in from non-vc file

// Get values from HTML elements
let zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');

// Button to listen to click events
const generate = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();

function performAction(){
    fetchWeatherData(baseURL, zip, apiKey)
}

// Fetch Weather Data from OpenWeatherApi
const fetchWeatherData = async (baseURL, zip, apiKey) => {
    const url = baseURL + zip + apiKey;
    try {
        const request = await fetch(url);
        const data = await request.json();
        // destructuring of result
        const {
            main: { temp },
        } = data;
        return temp
    } catch (e) {
        console.log(e);
        throw e;
    }
}

const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
        throw error;
    }
}

// Update UI dynamically
const updateUI = async (temperature, newDate, feelings) => {
    date.innerText = newDate;
    temp.innerText = `${convertKelvinToCelsius(temperature)} °C`; // Temperature in Kelvin is used by default
    content.innerText = feelings;
}

function convertKelvinToCelsius(kelvin){
    return Math.floor(kelvin - 273);
}

// Event Listener
generate.addEventListener('click', () => {
    let zip_country = zip.value + ',us'; // Note: seach does not seem to work with UK postcodes
    fetchWeatherData(baseURL, zip_country, apiKey)
        .then(temp => {
            return {date: newDate, temp, content: feelings.value}
        })
        .then(data => {
            postData('/entry', data);
            return data;
        })
        // Promise that updates the UI dynamically
        .then(({temp, date, content}) => 
            updateUI(temp, date, content)
        )
        .catch(e => {
            console.error(e);
        })
})