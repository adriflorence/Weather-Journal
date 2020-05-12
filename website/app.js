// OpenWeatherApi config
const baseURL = 'api.openweathermap.org/data/2.5/weather?zip='; // zip search
const zip = 'G117BE' + ',uk';
const apiKey = '&appid=' + '555036a2bb84497ab0064c6bd52df011'; // TODO pull in from non-vc file

// Get values from HTML elements
const zip = document.getElementById('zip').value;
const feel = document.getElementById('feelings').value;

// Button to listen to click events
const generate = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

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
            main: {temp},
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

// Event Listener
generate.addEventListener('click', () => {
    fetchWeatherData(baseURL, zip, apiKey)
        .then(temp => {
            return {date: newDate, temp, content: feel}
        })
})